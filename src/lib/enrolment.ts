import { CONTACT } from "./contact";
import { getCourseBySlug } from "./courses";

/* The enrolment form mirrors the sections of the school's registration form —
   personal details, course choice, technical background, commitment, and the
   agreement — so an application that arrives from the site is directly
   comparable to the ones collected before this page existed.

   Every option list is exported, because the form renders from it and the
   server validates against it. One list, so the two cannot drift. */

export const GENDERS = ["Male", "Female"] as const;
export const EMPLOYMENT = [
	"Student",
	"Employed",
	"Self-employed",
	"Unemployed",
] as const;
export const TRAINING_MODES = [
	"Online training",
	"In-home training",
	"Hybrid — online and in-home",
] as const;
export const REFERRALS = [
	"Social media",
	"Friend or referral",
	"Search engine",
	"Other",
] as const;
export const YES_NO = ["Yes", "No"] as const;

export type Gender = (typeof GENDERS)[number];
export type Employment = (typeof EMPLOYMENT)[number];
export type TrainingMode = (typeof TRAINING_MODES)[number];
export type Referral = (typeof REFERRALS)[number];
export type YesNo = (typeof YES_NO)[number];

export interface Enrolment {
	/* course slug — the page prefills it from the course the visitor came from */
	course: string;
	fullName: string;
	email: string;
	phone: string;
	gender: Gender;
	employment: Employment;
	mode: TrainingMode;
	experience: YesNo;
	experienceDetail: string;
	laptop: YesNo;
	heardFrom: Referral;
	commit: YesNo;
	comments: string;
	accurate: boolean;
}

export function isOneOf<T extends readonly string[]>(
	list: T,
	v: unknown,
): v is T[number] {
	return typeof v === "string" && (list as readonly string[]).includes(v);
}

/* an emailed application is a document, not a paragraph: labelled fields grouped
   into the same sections the form shows. Both the HTML mail and the plain-text
   fallback render from this one shape. */
export interface DocField {
	label: string;
	value: string;
	/* full-width row — for free text that would be squeezed in a two-up grid */
	wide?: boolean;
}

export interface DocSection {
	title: string;
	fields: DocField[];
}

export interface EmailDocument {
	eyebrow: string;
	heading: string;
	intro: string;
	/* the at-a-glance band under the heading */
	highlight: DocField[];
	sections: DocSection[];
	footNote: string;
}

export function courseLabel(slug: string): string {
	if (slug === "cbt" || slug === "cbt-training") {
		return "CBT Training (WAEC & JAMB)";
	}
	const course = getCourseBySlug(slug);
	if (!course) return slug;
	return course.d ? `${course.t} (${course.d})` : course.t;
}

export function enrolmentDocument(e: Enrolment): EmailDocument {
	const isCbt = e.course === "cbt" || e.course === "cbt-training";
	const course = getCourseBySlug(e.course);
	const courseFee = course?.price ?? (isCbt ? "From ₦15,000" : "—");
	const courseDuration = course?.duration ?? (isCbt ? "2–4 Weeks" : "—");
	const courseName = isCbt
		? "CBT Training (WAEC & JAMB)"
		: (course?.t ?? e.course);

	const background: DocField[] = [
		{ label: "Prior tech experience", value: e.experience },
	];
	if (e.experience === "Yes" && e.experienceDetail) {
		background.push({
			label: "Experience described",
			value: e.experienceDetail,
			wide: true,
		});
	}
	background.push({ label: "Suitable laptop", value: e.laptop });

	const sections: DocSection[] = [
		{
			title: "Personal information",
			fields: [
				{ label: "Full name", value: e.fullName },
				{ label: "Email", value: e.email },
				{ label: "Phone (WhatsApp)", value: e.phone },
				{ label: "Gender", value: e.gender },
				{ label: "Employment status", value: e.employment },
			],
		},
		{
			title: "Course selection",
			fields: [
				{ label: "Applying for", value: courseLabel(e.course) },
				{ label: "Training mode", value: e.mode },
				{ label: "Course fee", value: courseFee },
				{ label: "Duration", value: courseDuration },
			],
		},
		{ title: "Technical background", fields: background },
		{
			title: "Motivation & commitment",
			fields: [
				{ label: "Heard about us via", value: e.heardFrom },
				{ label: "Can give the hours a week", value: e.commit },
			],
		},
		{
			title: "Agreement",
			fields: [
				{
					label: "Information is accurate",
					value: e.accurate ? "Confirmed" : "Not confirmed",
				},
			],
		},
	];

	if (e.comments) {
		sections.push({
			title: "Additional comments",
			fields: [{ label: "From the applicant", value: e.comments, wide: true }],
		});
	}

	return {
		eyebrow: "Enrolment application",
		heading: e.fullName,
		intro: `${e.fullName} has applied for ${courseLabel(e.course)} via ${CONTACT.website}. Reply to this email to reach them directly.`,
		highlight: [
			{ label: "Course", value: courseName },
			{ label: "Fee", value: courseFee },
			{ label: "Duration", value: courseDuration },
			{ label: "Mode", value: e.mode },
		],
		sections,
		footNote:
			"Sent from the enrolment form. Nothing has been confirmed to the applicant beyond receipt.",
	};
}

export interface ComposedEnrolment {
	subject: string;
	body: string;
	mailto: string;
	whatsapp: string;
}

/* the plain-text twin of the HTML mail — also the body handed to the visitor's
   own mail app or WhatsApp when delivery fails, so an application is never lost */
export function composeEnrolment(e: Enrolment): ComposedEnrolment {
	const doc = enrolmentDocument(e);
	const subject = `Enrolment — ${courseLabel(e.course)} — ${e.fullName}`;

	const body = [
		doc.intro,
		"",
		...doc.sections.flatMap((s) => [
			s.title.toUpperCase(),
			...s.fields.map((f) => `${f.label}: ${f.value}`),
			"",
		]),
	]
		.join("\n")
		.trimEnd();

	return {
		subject,
		body,
		mailto: `mailto:${CONTACT.email}?subject=${encodeURIComponent(
			subject,
		)}&body=${encodeURIComponent(body)}`,
		whatsapp: `${CONTACT.whatsapp}?text=${encodeURIComponent(
			`${subject}\n\n${body}`,
		)}`,
	};
}
