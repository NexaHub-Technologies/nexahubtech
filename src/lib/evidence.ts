/* The evidence the site is built around, in one place.

   Every photo, screenshot, logo, quote and result the site shows is listed here.
   An entry with no `src` (or no `quote`, no `name`, no `result`) renders as a
   labelled placeholder, so the layout is finished and only the material is
   missing. Filling a slot is a one-line change in this file:

     1. Put the image under public/images/ (JPG or WebP, about 1600px wide for
        photos and screenshots; SVG or PNG for logos).
     2. Set `src` on its entry below, and correct `alt` if needed.

   Rules worth keeping:
   - Only real material. A stock photo of strangers, a mocked-up screenshot or an
     invented quote is worse than the placeholder — it is the one thing a careful
     client can catch you out on.
   - Name a client, or show their logo, only with their written permission.
   - Photograph learners only with their consent (a parent's, for under-18s). */

import type { FigureSpec } from "../components/figure";

/* ── the studio ─────────────────────────────────────────────────── */

/* the front page's main image: the best screen of the best shipped product */
export const HOME_HERO: FigureSpec = {
	kind: "screenshot",
	alt: "A shipped product's main screen, e.g. the DOMICOOP admin dashboard",
};

/* logos of organisations we have built for (with permission) */
export const CLIENT_LOGOS: FigureSpec[] = [
	{ kind: "logo", alt: "Client logo" },
	{ kind: "logo", alt: "Client logo" },
	{ kind: "logo", alt: "Client logo" },
	{ kind: "logo", alt: "Client logo" },
];

/* What each case study on /work (and the front page) shows. Keyed by the slug
   in lib/work.ts. `result` is one measurable outcome, in the client's terms —
   "members onboarded in the first month", "loan approvals now take a day" —
   and is left empty until there is a real number to put in it. */
export interface CaseStudyMedia {
	cover: FigureSpec;
	phone?: FigureSpec;
	result?: string;
}

export const CASE_STUDY_MEDIA: Record<string, CaseStudyMedia> = {
	domicop: {
		cover: {
			kind: "screenshot",
			alt: "DOMICOOP admin portal — members and contributions",
		},
		phone: { kind: "phone", alt: "DOMICOOP member app — savings balance" },
	},
	itc: {
		cover: { kind: "screenshot", alt: "ITC platform — main dashboard" },
	},
	parkmate: {
		cover: { kind: "screenshot", alt: "ParkMate — space owner dashboard" },
		phone: { kind: "phone", alt: "ParkMate driver app — finding a space" },
	},
	streamconf: {
		cover: { kind: "screenshot", alt: "StreamConf — a live room" },
	},
	"sign-me-out": {
		cover: { kind: "screenshot", alt: "Sign Me Out — a signing board" },
		phone: { kind: "phone", alt: "Sign Me Out — signing on a phone" },
	},
};

/* which case studies the front page features, in order */
export const FEATURED_WORK = ["domicop", "parkmate"];

/* What clients say. Fill one in only with the client's words and permission to
   quote them; an empty entry shows a placeholder card. */
export interface Testimonial {
	quote?: string;
	name?: string;
	role?: string;
	org?: string;
	photo?: FigureSpec;
}

export const CLIENT_TESTIMONIALS: Testimonial[] = [{}, {}];

/* ── the Academy ────────────────────────────────────────────────── */

export const ACADEMY_PHOTOS = {
	hero: {
		kind: "photo",
		alt: "A session in progress at the learning centre",
		ratio: "4 / 3",
	},
	room: {
		kind: "photo",
		alt: "The learning centre: the six seats and the screen",
		ratio: "4 / 3",
	},
	instructor: {
		kind: "photo",
		alt: "An instructor working through an exercise with a learner",
		ratio: "4 / 3",
	},
	online: {
		kind: "screenshot",
		alt: "A live online session, seen from a learner's laptop",
	},
} satisfies Record<string, FigureSpec>;

/* what learners have built — a project, a site, an edit — with permission */
export interface LearnerWork {
	image: FigureSpec;
	title?: string;
	by?: string;
	course?: string;
}

export const LEARNER_WORK: LearnerWork[] = [
	{ image: { kind: "screenshot", alt: "A learner's website project" } },
	{ image: { kind: "screenshot", alt: "A learner's data dashboard" } },
	{ image: { kind: "photo", alt: "A still from a learner's edited video" } },
];

export const LEARNER_TESTIMONIALS: Testimonial[] = [{}, {}, {}];

/* ── the company ────────────────────────────────────────────────── */

/* The people. Founders first. `bio` is two sentences in plain words: what they
   do here and what they did before. */
export interface Person {
	name?: string;
	role: string;
	bio?: string;
	photo: FigureSpec;
	founder?: boolean;
}

export const TEAM: Person[] = [
	{
		name: "Divine O. Agbo",
		role: "Co-founder & Chief Executive Officer",
		founder: true,
		photo: { kind: "portrait", alt: "Portrait of Divine O. Agbo" },
	},
	{
		name: "Michael Onuoha",
		role: "Co-founder & Chief Technology Officer, Lead Technical Architect",
		founder: true,
		photo: { kind: "portrait", alt: "Portrait of Michael Onuoha" },
	},
	{
		role: "Instructor — Software & data",
		photo: {
			kind: "portrait",
			alt: "Portrait of the software & data instructor",
		},
	},
	{
		role: "Instructor — Video",
		photo: { kind: "portrait", alt: "Portrait of the video instructor" },
	},
	{
		role: "Instructor — Digital skills",
		photo: {
			kind: "portrait",
			alt: "Portrait of the digital skills instructor",
		},
	},
];

/* the office and learning centre, for About and Contact */
export const OFFICE_PHOTO: FigureSpec = {
	kind: "photo",
	alt: "The NexaHubTech office and learning centre in Kubwa, from outside",
	ratio: "21 / 9",
};
