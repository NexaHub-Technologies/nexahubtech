import { describe, expect, it } from "vitest";
import { CONTACT } from "./contact";
import { getCourseBySlug } from "./courses";
import { renderEmailDocument } from "./email-template";
import {
	composeEnrolment,
	type Enrolment,
	enrolmentDocument,
	toApplicationRow,
} from "./enrolment";

/* the course the fixture applies for — its fee and length are read rather than
   repeated, so changing the price list is not a test failure */
const course = getCourseBySlug("react-development");
if (!course) throw new Error("fixture course is missing from COURSES");

const base: Enrolment = {
	course: "react-development",
	fullName: "Chidi Okeke",
	email: "chidi@example.com",
	phone: "0913 451 3173",
	gender: "Male",
	employment: "Student",
	mode: "Online training",
	experience: "Yes",
	experienceDetail: "Two years of HTML & CSS at work.",
	laptop: "Yes",
	heardFrom: "Friend or referral",
	commit: "Yes",
	comments: "",
	accurate: true,
	updates: true,
};

function allValues(doc: ReturnType<typeof enrolmentDocument>) {
	return doc.sections.flatMap((s) => s.fields.map((f) => f.value));
}

describe("enrolmentDocument", () => {
	it("carries every answer into a labelled section", () => {
		const values = allValues(enrolmentDocument(base));
		for (const v of [
			"Chidi Okeke",
			"chidi@example.com",
			"0913 451 3173",
			"Male",
			"Student",
			"Online training",
			"Two years of HTML & CSS at work.",
			"Friend or referral",
		]) {
			expect(values).toContain(v);
		}
	});

	it("resolves the slug to the course's real name, fee and length", () => {
		const doc = enrolmentDocument(base);
		expect(doc.highlight.map((f) => f.value)).toEqual([
			"React",
			course.price,
			course.duration,
			"Online training",
		]);
	});

	it("resolves CBT training slugs correctly with fee and duration", () => {
		const doc = enrolmentDocument({ ...base, course: "cbt-training" });
		expect(doc.highlight.map((f) => f.value)).toEqual([
			"CBT Training (WAEC & JAMB)",
			"From ₦3,000",
			"1 session – 4 weeks",
			"Online training",
		]);
	});

	it("drops the experience detail when there is no experience to describe", () => {
		const doc = enrolmentDocument({
			...base,
			experience: "No",
			experienceDetail: "stale text left in state",
		});
		expect(allValues(doc)).not.toContain("stale text left in state");
	});

	it("omits the comments section entirely when nothing was written", () => {
		const titles = enrolmentDocument(base).sections.map((s) => s.title);
		expect(titles).not.toContain("Additional comments");
		const withComment = enrolmentDocument({
			...base,
			comments: "Night shifts.",
		});
		expect(withComment.sections.map((s) => s.title)).toContain(
			"Additional comments",
		);
	});

	it("says so plainly when the accuracy check was not given", () => {
		const doc = enrolmentDocument({ ...base, accurate: false });
		expect(allValues(doc)).toContain("Not confirmed");
	});
});

describe("composeEnrolment", () => {
	it("names the course and the applicant in the subject", () => {
		expect(composeEnrolment(base).subject).toBe(
			"Enrolment — React (Intermediate to Advanced) — Chidi Okeke",
		);
	});

	it("writes a plain-text twin of the emailed document", () => {
		const { body } = composeEnrolment(base);
		expect(body).toContain("PERSONAL INFORMATION");
		expect(body).toContain("Full name: Chidi Okeke");
		expect(body).toContain("Applying for: React (Intermediate to Advanced)");
		expect(body).toContain(`Course fee: ${course.price}`);
	});

	it("addresses the fallback mailto to the real inbox", () => {
		expect(
			composeEnrolment(base).mailto.startsWith(`mailto:${CONTACT.email}?`),
		).toBe(true);
	});

	it("escapes characters that would otherwise truncate the URL", () => {
		const { mailto, whatsapp } = composeEnrolment({
			...base,
			comments: "Budget? ~₦140,000 & evenings only #please",
		});
		for (const url of [mailto, whatsapp]) {
			expect(url).not.toContain("& evenings");
			expect(url).not.toContain("#please");
			expect(decodeURIComponent(url)).toContain("& evenings only #please");
		}
	});
});

describe("renderEmailDocument", () => {
	it("renders the answers into the branded document", () => {
		const html = renderEmailDocument(enrolmentDocument(base));
		expect(html).toContain("NexaHubTech");
		expect(html).toContain("Enrolment application");
		expect(html).toContain("Chidi Okeke");
		expect(html).toContain(course.price);
		expect(html).toContain(CONTACT.website);
	});

	it("escapes applicant input rather than letting it become markup", () => {
		const html = renderEmailDocument(
			enrolmentDocument({
				...base,
				fullName: '<script>alert("x")</script>',
				comments: "Tom & Jerry <b>bold</b>",
			}),
		);
		expect(html).not.toContain("<script>");
		expect(html).toContain("&lt;script&gt;");
		expect(html).toContain("Tom &amp; Jerry &lt;b&gt;bold&lt;/b&gt;");
	});

	it("keeps the line breaks a visitor typed into a textarea", () => {
		const html = renderEmailDocument(
			enrolmentDocument({ ...base, comments: "First line\nSecond line" }),
		);
		expect(html).toContain("First line<br />Second line");
	});
});

describe("wide fields", () => {
	it("span both columns, so free text isn't squeezed into the label column", () => {
		const html = renderEmailDocument(
			enrolmentDocument({ ...base, comments: "Evenings only, please." }),
		);
		expect(html).toContain('colspan="2"');
	});
});

describe("the application as the staff console stores it", () => {
	it("turns the form's answers into the console's columns", () => {
		expect(toApplicationRow({ ...base, email: "Ada@Example.com" })).toEqual({
			course_slug: base.course,
			full_name: base.fullName,
			email: "ada@example.com",
			phone: base.phone,
			gender: base.gender,
			employment: base.employment,
			mode: base.mode,
			has_experience: true,
			experience_detail: base.experienceDetail,
			has_laptop: true,
			heard_from: base.heardFrom,
			can_commit: true,
			comments: base.comments,
			notify_consent: true,
		});
	});

	it("drops experience detail when there's no experience, and carries a refusal of updates", () => {
		const row = toApplicationRow({
			...base,
			experience: "No",
			experienceDetail: "left over from a changed answer",
			laptop: "No",
			commit: "No",
			updates: false,
		});
		expect(row.has_experience).toBe(false);
		expect(row.experience_detail).toBe("");
		expect(row.has_laptop).toBe(false);
		expect(row.can_commit).toBe(false);
		expect(row.notify_consent).toBe(false);
	});

	it("shows the update choice in the emailed application", () => {
		const doc = enrolmentDocument({ ...base, updates: false });
		const agreement = doc.sections.find((s) => s.title === "Agreement");
		expect(agreement?.fields).toContainEqual({
			label: "Class and payment updates",
			value: "No",
		});
	});
});
