import { APPROACH } from "./approach";
import { CBT_PACKAGES } from "./cbt";
import { CONTACT } from "./contact";
import {
	COURSE_COUNT_WORD_CAP,
	COURSES,
	type Course,
	taughtInPerson,
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

const cheapestCbt = CBT_PACKAGES.map((p) => p.price).sort(
	(a, b) => Number(a.replace(/\D/g, "")) - Number(b.replace(/\D/g, "")),
)[0];

export const PAGES = {
	home: {
		path: "/",
		name: "Home",
		title: "NexaHubTech — Learn to build. Build for real.",
		description:
			"NexaHubTech is a Nigeria-based skills-to-service company: a tech school and a software studio. We teach people to become developers, then put those skills to work building real products for real clients.",
		image: "/og/home.jpg",
		card: {
			eyebrow: "A tech school + a software studio",
			headline: "Learn to build.",
			accent: "Build for real.",
			sub: `Kubwa, FCT-Abuja · ${CONTACT.website}`,
		},
		kind: "WebPage",
	},
	courses: {
		path: "/courses",
		name: "Courses",
		title: "Courses — NexaHubTech",
		description:
			"Explore all courses at NexaHubTech — from web development, JavaScript, React and Next.js to cybersecurity, data analysis and videography. Learn real skills with live, hands-on teaching you can start at any time.",
		image: "/og/courses.jpg",
		card: {
			eyebrow: "Our courses",
			headline: "Real skills,",
			accent: "taught properly.",
			sub: `${COURSE_COUNT_WORD_CAP} courses · taught live · start any time`,
		},
		kind: "CollectionPage",
	},
	cbt: {
		path: "/cbt",
		name: "WAEC & JAMB CBT Training",
		title: "WAEC & JAMB CBT Training in Kubwa, Abuja — NexaHubTech",
		description:
			"Get comfortable with the computer-based exam before the day. CBT practice for JAMB and WAEC candidates at NexaHubTech, F01 Market, Kubwa: keyboard shortcuts, pacing, past questions and timed mock exams.",
		image: "/og/cbt.jpg",
		card: {
			eyebrow: "WAEC & JAMB CBT training",
			headline: "Walk into your CBT exam",
			accent: "already at ease.",
			sub: `F01 Market, Kubwa · mock exams from ${cheapestCbt}`,
		},
		kind: "FAQPage",
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
			"Apply for a place at NexaHubTech — taught live, start any time. Tell us about you, pick your course and training mode, and we'll be in touch about your start date.",
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
			sub: `${course.price} · ${course.duration} · ${taughtInPerson(course) ? "in person, Kubwa" : "taught live online"}`,
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
		PAGES.cbt,
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
