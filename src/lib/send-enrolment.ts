import { createServerFn } from "@tanstack/react-start";
import { CONTACT } from "./contact";
import { getCourseBySlug } from "./courses";
import { renderEmailDocument } from "./email-template";
import {
	composeEnrolment,
	EMPLOYMENT,
	type Enrolment,
	enrolmentDocument,
	GENDERS,
	isOneOf,
	REFERRALS,
	TRAINING_MODES,
	YES_NO,
} from "./enrolment";
import { saveApplication } from "./save-application.server";

/* Runs on the server only, so RESEND_API_KEY is never bundled for the client.
   Do not rename it to VITE_* — that prefix would inline the secret into the
   browser bundle. */

const FROM = "NexaHubTech <enquiries@nexahubtech.company>";

/* the browser already enforces required/pattern, but nothing stops a direct POST
   to the server function, so every field is re-checked here */
function validate(data: unknown): Enrolment {
	if (typeof data !== "object" || data === null) throw new Error("Bad request");
	const d = data as Record<string, unknown>;

	const str = (v: unknown, field: string, max: number) => {
		if (typeof v !== "string" || !v.trim()) throw new Error(`Missing ${field}`);
		if (v.length > max) throw new Error(`${field} is too long`);
		return v.trim();
	};
	const optional = (v: unknown, field: string, max: number) => {
		if (v === undefined || v === null || v === "") return "";
		if (typeof v !== "string") throw new Error(`Bad ${field}`);
		if (v.length > max) throw new Error(`${field} is too long`);
		return v.trim();
	};
	const oneOf = <T extends readonly string[]>(
		list: T,
		v: unknown,
		field: string,
	): T[number] => {
		if (!isOneOf(list, v)) throw new Error(`Choose a ${field}`);
		return v;
	};

	if (typeof d.course !== "string" || !getCourseBySlug(d.course))
		throw new Error("Choose a course");

	const email = str(d.email, "email", 320);
	if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email))
		throw new Error("That email address doesn't look right");

	if (d.accurate !== true)
		throw new Error("Please confirm your details are accurate");

	const experience = oneOf(YES_NO, d.experience, "answer");

	return {
		course: d.course,
		fullName: str(d.fullName, "name", 120),
		email,
		phone: str(d.phone, "phone number", 40),
		gender: oneOf(GENDERS, d.gender, "gender"),
		employment: oneOf(EMPLOYMENT, d.employment, "employment status"),
		mode: oneOf(TRAINING_MODES, d.mode, "training mode"),
		experience,
		/* only carried when it means something — the form hides the box on "No" */
		experienceDetail:
			experience === "Yes"
				? optional(d.experienceDetail, "experience", 2000)
				: "",
		laptop: oneOf(YES_NO, d.laptop, "answer"),
		heardFrom: oneOf(REFERRALS, d.heardFrom, "answer"),
		commit: oneOf(YES_NO, d.commit, "answer"),
		comments: optional(d.comments, "comments", 2000),
		accurate: true,
		updates: d.updates === true,
	};
}

export const sendEnrolment = createServerFn({ method: "POST" })
	.validator(validate)
	.handler(async ({ data }) => {
		/* into the staff console first, then by email. Either is enough to keep
		   the application, so the visitor is only told it failed if both did. */
		const saved = await saveApplication(data);

		const key = process.env.RESEND_API_KEY;
		if (!key) {
			if (saved) return { ok: true as const };
			throw new Error("Email is not configured");
		}

		const composed = composeEnrolment(data);
		const note = saved
			? "Saved in the staff console: review it under Applications."
			: "Not saved in the staff console. Add it there by hand.";
		const subject = composed.subject;
		const body = `${composed.body}\n\n${note}`;
		const document = enrolmentDocument(data);
		document.sections.push({
			title: "Staff console",
			fields: [{ label: "Status", value: note, wide: true }],
		});

		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${key}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: FROM,
				to: [
					process.env.ENROLMENT_TO ?? process.env.ENQUIRY_TO ?? CONTACT.email,
				],
				/* so a reply from the inbox goes straight back to the applicant */
				reply_to: data.email,
				subject,
				html: renderEmailDocument(document),
				/* text twin for clients that refuse HTML, and for search in the inbox */
				text: body,
			}),
		});

		if (!res.ok) {
			const detail = await res.text();
			console.error("Resend rejected the enrolment:", res.status, detail);
			if (!saved) throw new Error("Could not send right now");
		}

		return { ok: true as const };
	});
