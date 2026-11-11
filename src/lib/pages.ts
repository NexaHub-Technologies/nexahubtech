import { APPROACH } from "./approach";
import { BUSINESS_OFFERS } from "./business";
import { CBT_DETAILS, CBT_FROM_PRICE } from "./cbt";
import { CONTACT } from "./contact";
import {
	CENTRE_SEATS,
	COURSE_COUNT_WORD_CAP,
	COURSES,
	type Course,
	deliveryPhrase,
	formatNaira,
	lowestFee,
	priceLabel,
} from "./courses";
import { SERVICES, type ServiceLine } from "./services";

/* Every page the site serves, described once. A route's <head>, the sitemap, the
   schema knowledge graph, llms.txt and the markdown mirrors all read from here,
   so a page cannot be retitled in one of them and left behind in the others.

   Every route renders client-side only (ssr: false), so a crawler that does not
   run JavaScript sees the <head> and an empty body. What is declared here is
   therefore most of what a search engine or an AI agent will ever read about a
   page — which is why it is data, and not strings scattered across routes. */

export interface Page {
	path: string;
	/* the short name — used for breadcrumbs and as the link text in llms.txt */
	name: string;
	title: string;
	description: string;
	/* per-route share card from public/og/, generated from `card` by
	   scripts/generate-og-images.ts */
	image: string;
	card: Card;
	/* the schema.org WebPage subtype that says what kind of page this is */
	kind: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
	/* reachable but kept out of search results and every discovery file */
	noindex?: boolean;
}

/* What the share card says. The headline and accent are the page's own <h1>, so
   a shared link previews with the words the visitor then lands on; counts and
   prices are read from the content modules so the card cannot go stale. */
export interface Card {
	eyebrow: string;
	headline: string;
	/* the highlighted second half of the headline, if the page has one */
	accent?: string;
	sub: string;
}

/* the cheapest course, read from the price list so the share card cannot go stale */
const cheapestCourse = formatNaira(Math.min(...COURSES.map(lowestFee)));

export const PAGES = {
	home: {
		path: "/",
		name: "Home",
		title: "NexaHubTech — Learn tech properly, in Kubwa or online",
		description:
			"NexaHubTech is a tech school in Kubwa, FCT-Abuja, with a software studio behind it. Learn computer skills, Microsoft Office, coding, data and video — in small classes of six at the centre, or live online from anywhere in Nigeria — and start whenever you are ready.",
		image: "/og/home.jpg",
		card: {
			eyebrow: "A tech school in Kubwa, FCT-Abuja",
			headline: "Learn tech properly.",
			accent: "In Kubwa or online.",
			sub: `Classes of ${CENTRE_SEATS} · courses from ${cheapestCourse} · ${CONTACT.website}`,
		},
		kind: "WebPage",
	},
	courses: {
		path: "/courses",
		name: "Courses",
		title: "Courses — NexaHubTech",
		description:
			"Every course at NexaHubTech, from your first time on a computer to React, data analysis and video — taught live online or in small groups at our Kubwa centre, with fees you can pay in instalments. Start any day.",
		image: "/og/courses.jpg",
		card: {
			eyebrow: "Our courses",
			headline: "Real skills,",
			accent: "taught properly.",
			sub: `${COURSE_COUNT_WORD_CAP} courses · online or in Kubwa · start any day`,
		},
		kind: "CollectionPage",
	},
	cbt: {
		path: "/cbt",
		name: "WAEC & JAMB CBT Training",
		title: "WAEC & JAMB CBT Training in Kubwa, Abuja — NexaHubTech",
		description:
			"Get comfortable with the computer-based exam before the day. CBT practice for JAMB and WAEC candidates at NexaHubTech, Phase 2, F01 Building Materials Market, Kubwa: keyboard shortcuts, pacing, past questions and timed mock exams.",
		image: "/og/cbt.jpg",
		card: {
			eyebrow: "WAEC & JAMB CBT training",
			headline: "Walk into your CBT exam",
			accent: "already at ease.",
			sub: `Phase 2, F01 Building Materials Market, Kubwa · mock exams from ${CBT_FROM_PRICE}`,
		},
		kind: "FAQPage",
	},
	fees: {
		path: "/fees",
		name: "Fees",
		title: "Course Fees — NexaHubTech",
		description:
			"Every NexaHubTech fee on one page: each course live online and in person at the Kubwa centre, paid in full or in instalments, plus CBT practice and rates for organisations.",
		image: "/og/fees.jpg",
		card: {
			eyebrow: "Fees",
			headline: "What it costs,",
			accent: "on one page.",
			sub: `Courses from ${cheapestCourse} · pay in full or in instalments`,
		},
		kind: "WebPage",
	},
	timetable: {
		path: "/timetable",
		name: "Timetable",
		title: "Session Times — NexaHubTech",
		description:
			"When NexaHubTech classes run each week — at the Kubwa centre and live online. There are no fixed intakes: you start any day and join a standing session that suits you.",
		image: "/og/timetable.jpg",
		card: {
			eyebrow: "Session times",
			headline: "Start any day.",
			accent: "Pick your session.",
			sub: `${CBT_DETAILS.hours} at the centre · evenings online`,
		},
		kind: "WebPage",
	},
	forBusiness: {
		path: "/for-business",
		name: "For Business",
		title: "Training for Organisations — NexaHubTech",
		description:
			"Train your staff, your students or your team with NexaHubTech: Microsoft Office taught at your office, CBT exam practice for schools, and any course for a group — online or at our Kubwa centre.",
		image: "/og/for-business.jpg",
		card: {
			eyebrow: "For organisations",
			headline: "Train your team,",
			accent: "properly.",
			sub: BUSINESS_OFFERS.map((o) => o.t).join(" · "),
		},
		kind: "WebPage",
	},
	centre: {
		path: "/centre",
		name: "The Centre",
		title: "Our Kubwa Centre — NexaHubTech",
		description: `Visit the NexaHubTech centre at ${CONTACT.address}: one room, classes of at most ${CENTRE_SEATS}, machines provided, open ${CBT_DETAILS.hours}. Come and see it before you pay.`,
		image: "/og/centre.jpg",
		card: {
			eyebrow: "The centre",
			headline: `Classes of ${CENTRE_SEATS}.`,
			accent: "Somebody beside you.",
			sub: `${CONTACT.address}`,
		},
		kind: "WebPage",
	},
	teaching: {
		path: "/teaching",
		name: "How We Teach",
		title: "How We Teach — NexaHubTech",
		description:
			"The pedagogy behind every NexaHubTech course: the mental model before the syntax, one idea at a time, and a session built in three parts.",
		image: "/og/teaching.jpg",
		card: {
			eyebrow: "How we teach",
			headline: "Understand it first.",
			accent: "Then build with it.",
			sub: "The method behind every course",
		},
		kind: "WebPage",
	},
	enrol: {
		path: "/enrol",
		name: "Enrol",
		title: "Enrol — NexaHubTech",
		description:
			"Apply for a place at NexaHubTech — taught live, online or at our Kubwa centre, and started whenever you are ready. Tell us about you, pick your course and how you want to learn, and we'll agree your start date and session times.",
		image: "/og/enrol.jpg",
		card: {
			eyebrow: "Enrolment",
			headline: "Apply for a",
			accent: "place.",
			sub: "Pick a course · tell us about you · start any time",
		},
		kind: "WebPage",
	},
	services: {
		path: "/services",
		name: "Services",
		title: "Services — NexaHubTech",
		description:
			"What the NexaHubTech studio builds — custom software, websites, mobile apps, enterprise systems and API work, plus strategy, automation, cloud and support.",
		image: "/og/services.jpg",
		card: {
			eyebrow: "Our services",
			headline: "Software, built",
			accent: "properly.",
			sub: SERVICES.map((s) => s.t).join(" · "),
		},
		kind: "CollectionPage",
	},
	approach: {
		path: "/approach",
		name: "Our Approach",
		title: "Our Approach — NexaHubTech",
		description:
			"How NexaHubTech works: we settle what should be built, and why, before any of it gets written — for company websites and for the software your members sign into.",
		image: "/og/approach.jpg",
		card: {
			eyebrow: "How we work",
			headline: "We settle what should be built",
			accent: "before we build it.",
			sub: APPROACH.map((p) => p.t).join(" → "),
		},
		kind: "WebPage",
	},
	about: {
		path: "/about",
		name: "About",
		title: "About — NexaHubTech",
		description:
			"NexaHubTech is a Nigeria-based skills-to-service company — a tech school and a software studio built on one idea: learning should be tied to real work.",
		image: "/og/about.jpg",
		card: {
			eyebrow: "Who we are",
			headline: "We closed the gap between",
			accent: "learning and building.",
			sub: "A tech school and a software studio",
		},
		kind: "AboutPage",
	},
	contact: {
		path: "/contact",
		name: "Contact",
		title: "Contact — NexaHubTech",
		description:
			"Get in touch with NexaHubTech — ask about a course, taught live and started whenever you like, or start a project with the studio.",
		image: "/og/contact.jpg",
		card: {
			eyebrow: "Two ways in",
			headline: "Let’s talk.",
			sub: `${CONTACT.email} · ${CONTACT.phoneDisplay}`,
		},
		kind: "ContactPage",
	},
	work: {
		path: "/work",
		name: "Our Work",
		title: "Our Work — NexaHubTech",
		description:
			"Case studies from the NexaHubTech studio: cooperative society platforms, a two-sided parking marketplace, a real-time video platform, and an infinite-canvas social product.",
		image: "/og/work.jpg",
		card: {
			eyebrow: "Our work",
			headline: "What we’ve",
			accent: "built.",
			sub: "Marketplaces · real-time video · platforms",
		},
		kind: "WebPage",
		/* /work is reachable by URL while it is hidden */
		noindex: true,
	},
} satisfies Record<string, Page>;

export function coursePage(course: Course): Page {
	return {
		path: `/courses/${course.slug}`,
		name: course.t,
		title: `${course.t} — NexaHubTech`,
		description: course.tagline,
		image: `/og/course-${course.slug}.jpg`,
		card: {
			eyebrow: course.d ? `Course · ${course.d}` : "Course",
			headline: course.t,
			sub: `${priceLabel(course)} · ${course.duration} · ${deliveryPhrase(course)}`,
		},
		kind: "WebPage",
	};
}

export function servicePage(service: ServiceLine): Page {
	return {
		path: `/services/${service.slug}`,
		name: service.t,
		title: `${service.t} — NexaHubTech`,
		description: service.tagline,
		image: `/og/service-${service.slug}.jpg`,
		card: {
			eyebrow: "The studio",
			headline: service.t,
			sub: `${service.items.length} services · NexaHubTech`,
		},
		kind: "WebPage",
	};
}

/* every page that should be found, in the order the sitemap and llms.txt list them */
export const INDEXABLE_PAGES: Page[] = [
	...[
		PAGES.home,
		PAGES.courses,
		PAGES.fees,
		PAGES.timetable,
		PAGES.cbt,
		PAGES.forBusiness,
		PAGES.centre,
		PAGES.teaching,
		PAGES.enrol,
		PAGES.services,
		PAGES.approach,
		PAGES.about,
		PAGES.contact,
	],
	...COURSES.map(coursePage),
	...SERVICES.map(servicePage),
];

export function findPage(path: string): Page | undefined {
	return INDEXABLE_PAGES.find((p) => p.path === path);
}

/* the markdown mirror of a page: /courses/pc-basics → /courses/pc-basics.md. This
   is the convention llms.txt describes for offering a page's text without its
   markup. The homepage has no segment to hang a suffix on, so it gets /home.md —
   never public/index.*: Vercel serves any index file as the directory index, and
   an index.md there replaced the live homepage with its own markdown. */
export const HOME_MARKDOWN = "/home.md";

export function markdownPath(path: string): string {
	return path === "/" ? HOME_MARKDOWN : `${path}.md`;
}
