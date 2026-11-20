import { APPROACH } from "./approach";
import { BUSINESS_OFFERS } from "./business";
import { CBT_FROM_PRICE } from "./cbt";
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
		title: "NexaHubTech — Software Development Company in Abuja, Nigeria",
		description:
			"NexaHubTech designs, builds and maintains production software for businesses and founders — scoped carefully, built properly, and supported long after launch. Based in Abuja, Nigeria.",
		image: "/og/home.jpg",
		card: {
			eyebrow: "Software development company",
			headline: "Software, built",
			accent: "properly.",
			sub: `${SERVICES.map((s) => s.t).join(" · ")} · ${CONTACT.website}`,
		},
		kind: "WebPage",
	},
	academy: {
		path: "/academy",
		name: "NexaHubTech Academy",
		title: "NexaHubTech Academy — Live Tech Courses, Online or In Person",
		description:
			"NexaHubTech Academy, the training arm of NexaHubTech, offers live, instructor-led courses in software development, data, office productivity and video. Learn online or in person, start any day, and pay in instalments.",
		image: "/og/academy.jpg",
		card: {
			eyebrow: "Live, instructor-led courses",
			headline: "Learn tech,",
			accent: "the right way.",
			sub: `Online or in person · courses from ${cheapestCourse} · ${CONTACT.website}/academy`,
		},
		kind: "WebPage",
	},
	courses: {
		path: "/courses",
		name: "Courses",
		title: "Courses — NexaHubTech Academy",
		description:
			"Every NexaHubTech Academy course, from first steps on a computer to React, data analysis and video — taught live, online or in person, with flexible payment plans. Start any day.",
		image: "/og/courses.jpg",
		card: {
			eyebrow: "Our courses",
			headline: "Real skills,",
			accent: "taught properly.",
			sub: `${COURSE_COUNT_WORD_CAP} courses · online or in person · start any day`,
		},
		kind: "CollectionPage",
	},
	cbt: {
		path: "/cbt",
		name: "WAEC & JAMB CBT Training",
		title: "WAEC & JAMB CBT Training in Kubwa, Abuja — NexaHubTech Academy",
		description:
			"Get comfortable with the computer-based exam before the day. CBT practice for JAMB and WAEC candidates at NexaHubTech Academy, Phase 2, F01 Building Materials Market, Kubwa: keyboard shortcuts, pacing, past questions and timed mock exams.",
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
		name: "Pricing",
		title: "Pricing — NexaHubTech Academy",
		description:
			"Simple, all-inclusive pricing for every NexaHubTech Academy course: one fee for the whole course, online or in person, paid in full or in parts — plus CBT practice and rates for organisations.",
		image: "/og/fees.jpg",
		card: {
			eyebrow: "Pricing",
			headline: "Simple pricing,",
			accent: "no surprises.",
			sub: `Courses from ${cheapestCourse} · pay in full or in instalments`,
		},
		kind: "WebPage",
	},
	forBusiness: {
		path: "/for-business",
		name: "Organisations",
		title: "Training for Organisations — NexaHubTech Academy",
		description:
			"Train your staff, your students or your team with NexaHubTech Academy: Microsoft Office taught at your office, CBT exam practice for schools, and any course for a group — online, in person or at your office.",
		image: "/og/for-business.jpg",
		card: {
			eyebrow: "For organisations",
			headline: "Train your team,",
			accent: "properly.",
			sub: BUSINESS_OFFERS.map((o) => o.t).join(" · "),
		},
		kind: "WebPage",
	},
	academyAbout: {
		path: "/academy/about",
		name: "About the Academy",
		title: "About NexaHubTech Academy — How We Teach, Where and When",
		description: `How NexaHubTech Academy teaches — the idea before the syntax, every session in three parts — and where and when it happens: live online in the evenings, or in person in classes of no more than ${CENTRE_SEATS} at our learning centre in Kubwa, Abuja.`,
		image: "/og/academy-about.jpg",
		card: {
			eyebrow: "About the Academy",
			headline: "Understand it first.",
			accent: "Then build with it.",
			sub: `Online or in person · classes of up to ${CENTRE_SEATS}`,
		},
		kind: "AboutPage",
	},
	enrol: {
		path: "/enrol",
		name: "Enrol",
		title: "Enrol — NexaHubTech Academy",
		description:
			"Apply for a place at NexaHubTech Academy — taught live, online or in person, and started whenever you are ready. Tell us about you, pick your course and how you want to learn, and we'll agree your start date and session times.",
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
			"What NexaHubTech builds — custom software, websites, mobile apps, enterprise systems and API work, plus strategy, automation, cloud and support.",
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
			"NexaHubTech is a Nigeria-based software company with two arms: a software studio that builds for businesses, and NexaHubTech Academy, which teaches the skills the studio practises — in live courses, online or in person.",
		image: "/og/about.jpg",
		card: {
			eyebrow: "Who we are",
			headline: "We closed the gap between",
			accent: "learning and building.",
			sub: "A software studio · and an Academy",
		},
		kind: "AboutPage",
	},
	contact: {
		path: "/contact",
		name: "Contact",
		title: "Contact — NexaHubTech",
		description:
			"Get in touch with NexaHubTech — start a software project with the studio, or ask NexaHubTech Academy about a course.",
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
			"Case studies from NexaHubTech: cooperative society platforms, a two-sided parking marketplace, a real-time video platform, and an infinite-canvas social product.",
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
		title: `${course.t} — NexaHubTech Academy`,
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
			eyebrow: "Services",
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
		PAGES.academy,
		PAGES.courses,
		PAGES.cbt,
		PAGES.academyAbout,
		PAGES.fees,
		PAGES.forBusiness,
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
