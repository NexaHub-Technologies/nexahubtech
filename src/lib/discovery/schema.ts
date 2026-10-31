/* The schema.org knowledge graph: the company, its website, every page, and the
   things those pages are about — courses, services, the CBT centre, the design
   process — as linked entities rather than isolated snippets.

   Every node has a stable @id (an absolute URL plus a fragment), and nodes refer
   to each other by that @id. That is what turns a pile of JSON-LD blocks into a
   graph: a search engine or AI agent reading the PC Basics page can follow
   `provider` to the same organisation node the contact page describes, and knows
   it is one company, at one address, rather than thirteen lookalikes.

   Each page's <head> carries the nodes that page is about (see pageGraph), and
   /schema.json carries the whole graph at once (see siteGraph). Both are built
   from the same content modules the pages render, so neither can drift. */

import { APPROACH } from "../approach";
import { CBT_DETAILS, CBT_FAQS, CBT_PACKAGES, CBT_PILLARS } from "../cbt";
import { SUMMARY } from "../company";
import { ADDRESS, CONTACT, MOTTO, SITE_URL } from "../contact";
import { COURSES, type Course, taughtInPerson } from "../courses";
import {
	coursePage,
	findPage,
	INDEXABLE_PAGES,
	PAGES,
	type Page,
	servicePage,
} from "../pages";
import { SERVICES, type ServiceLine } from "../services";
import { PRINCIPLES, SESSION } from "../teaching";

export type Node = { "@type": string | string[]; "@id"?: string } & Record<
	string,
	unknown
>;

export interface Graph {
	"@context": "https://schema.org";
	"@graph": Node[];
}

const abs = (path: string) => `${SITE_URL}${path}`;
const ref = (id: string) => ({ "@id": id });

/* ── stable identifiers ─────────────────────────────────────────── */

export const ID = {
	organization: `${SITE_URL}/#organization`,
	website: `${SITE_URL}/#website`,
	logo: `${SITE_URL}/#logo`,
	courseCatalog: `${abs(PAGES.courses.path)}#catalog`,
	serviceCatalog: `${abs(PAGES.services.path)}#catalog`,
	cbtCourse: `${abs(PAGES.cbt.path)}#course`,
	approach: `${abs(PAGES.approach.path)}#process`,
	session: `${abs(PAGES.teaching.path)}#session`,
	principles: `${abs(PAGES.teaching.path)}#principles`,
	webpage: (path: string) => `${abs(path)}#webpage`,
	breadcrumb: (path: string) => `${abs(path)}#breadcrumb`,
	course: (c: Course) => `${abs(coursePage(c).path)}#course`,
	service: (s: ServiceLine) => `${abs(servicePage(s).path)}#service`,
};

/* ── value helpers ──────────────────────────────────────────────── */

/* "₦80,000" → "80000". schema.org wants the number and the currency apart. */
export function naira(price: string): string {
	const n = price.replace(/[^\d.]/g, "");
	if (!n) throw new Error(`not a naira price: ${price}`);
	return n;
}

/* "6 Weeks" → "P6W", the ISO 8601 duration schema.org expects */
export function isoWeeks(duration: string): string | undefined {
	const m = duration.match(/^(\d+)\s+weeks?$/i);
	return m ? `P${m[1]}W` : undefined;
}

const offerBase = {
	"@type": "Offer",
	priceCurrency: "NGN",
	availability: "https://schema.org/InStock",
	category: "Paid",
	seller: ref(ID.organization),
};

/* ── the organisation and the website ───────────────────────────── */

function allPrices(): number[] {
	return [...COURSES.map((c) => c.price), ...CBT_PACKAGES.map((p) => p.price)]
		.map(naira)
		.map(Number);
}

export function organization(): Node {
	const prices = allPrices();
	const { days, opens, closes } = CBT_DETAILS.openingHours;
	return {
		/* a school and a business with a door people walk through — both are true,
		   and both unlock properties the other type lacks */
		"@type": ["EducationalOrganization", "LocalBusiness"],
		"@id": ID.organization,
		name: "NexaHubTech",
		url: abs("/"),
		description: SUMMARY,
		slogan: MOTTO,
		logo: {
			"@type": "ImageObject",
			"@id": ID.logo,
			url: abs("/apple-touch-icon.png"),
			contentUrl: abs("/apple-touch-icon.png"),
			width: 180,
			height: 180,
			caption: "NexaHubTech",
		},
		image: abs("/og-image.png"),
		email: CONTACT.email,
		telephone: CONTACT.phone,
		address: {
			"@type": "PostalAddress",
			streetAddress: ADDRESS.street,
			addressLocality: ADDRESS.locality,
			addressRegion: ADDRESS.region,
			addressCountry: ADDRESS.country,
		},
		identifier: {
			"@type": "PropertyValue",
			propertyID: "CAC RC Number",
			value: CONTACT.rc,
		},
		areaServed: { "@type": "Country", name: "Nigeria" },
		contactPoint: [
			{
				"@type": "ContactPoint",
				contactType: "customer service",
				email: CONTACT.email,
				telephone: CONTACT.phone,
				url: CONTACT.whatsapp,
				availableLanguage: "English",
				areaServed: "NG",
			},
		],
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: days.map((d) => `https://schema.org/${d}`),
				opens,
				closes,
			},
		],
		currenciesAccepted: "NGN",
		priceRange: `₦${Math.min(...prices).toLocaleString("en-NG")} – ₦${Math.max(...prices).toLocaleString("en-NG")}`,
		knowsAbout: [
			...COURSES.map((c) => c.t),
			...SERVICES.flatMap((s) => s.items.map((i) => i.t)),
		],
		hasOfferCatalog: [ref(ID.courseCatalog), ref(ID.serviceCatalog)],
	};
}

export function website(): Node {
	return {
		"@type": "WebSite",
		"@id": ID.website,
		url: abs("/"),
		name: "NexaHubTech",
		description: PAGES.home.description,
		inLanguage: "en-NG",
		publisher: ref(ID.organization),
	};
}

/* ── the school ─────────────────────────────────────────────────── */

export function course(c: Course): Node {
	const page = coursePage(c);
	const inPerson = taughtInPerson(c);
	return {
		"@type": "Course",
		"@id": ID.course(c),
		url: abs(page.path),
		name: c.t,
		description: c.tagline,
		about: c.d || undefined,
		image: abs(page.image),
		inLanguage: "en",
		provider: ref(ID.organization),
		educationalLevel: c.requirements.level,
		coursePrerequisites: c.requirements.know,
		/* the course's one big idea, then what it lets you do */
		teaches: [c.mentalModel.t, ...c.mentalModel.unlocks],
		timeRequired: isoWeeks(c.duration),
		syllabusSections: c.modules.map((m, i) => ({
			"@type": "Syllabus",
			position: i + 1,
			name: m.t,
			description: m.d,
		})),
		hasPart: c.projects
			.filter((p) => p.t)
			.map((p) => ({
				"@type": "CreativeWork",
				name: p.t,
				description: p.d,
				learningResourceType: p.capstone ? "Capstone project" : "Project",
			})),
		isAccessibleForFree: false,
		offers: {
			...offerBase,
			price: naira(c.price),
			url: abs(`${PAGES.enrol.path}?course=${c.slug}`),
		},
		hasCourseInstance: {
			"@type": "CourseInstance",
			courseMode: inPerson ? "Onsite" : "Online",
			description: `${c.format.t} ${c.format.d}`,
			duration: isoWeeks(c.duration),
			location: inPerson ? ref(ID.organization) : undefined,
		},
	};
}

export function cbtCourse(): Node {
	return {
		"@type": "Course",
		"@id": ID.cbtCourse,
		url: abs(PAGES.cbt.path),
		name: CBT_DETAILS.title,
		description: PAGES.cbt.description,
		image: abs(PAGES.cbt.image),
		inLanguage: "en",
		provider: ref(ID.organization),
		about: CBT_DETAILS.targetExams.map((name) => ({ "@type": "Thing", name })),
		teaches: CBT_PILLARS.map((p) => p.title),
		syllabusSections: CBT_PILLARS.map((p, i) => ({
			"@type": "Syllabus",
			position: i + 1,
			name: p.title,
			description: p.description,
		})),
		isAccessibleForFree: false,
		offers: CBT_PACKAGES.map((p) => ({
			...offerBase,
			"@id": `${abs(PAGES.cbt.path)}#${p.id}`,
			name: p.name,
			description: `${p.duration}. ${p.idealFor}. Includes: ${p.features.join("; ")}.`,
			price: naira(p.price),
			url: abs(PAGES.cbt.path),
		})),
		hasCourseInstance: {
			"@type": "CourseInstance",
			courseMode: "Onsite",
			location: ref(ID.organization),
		},
	};
}

export function courseCatalog(): Node {
	return {
		"@type": "OfferCatalog",
		"@id": ID.courseCatalog,
		name: "NexaHubTech courses",
		url: abs(PAGES.courses.path),
		numberOfItems: COURSES.length + 1,
		itemListElement: [...COURSES.map(ID.course), ID.cbtCourse].map((id, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: ref(id),
		})),
	};
}

export function teachingPrinciples(): Node {
	return {
		"@type": "ItemList",
		"@id": ID.principles,
		name: "How NexaHubTech teaches",
		itemListOrder: "https://schema.org/ItemListOrderAscending",
		itemListElement: PRINCIPLES.map((p, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: p.t,
			description: p.d,
		})),
	};
}

export function sessionHowTo(): Node {
	return {
		"@type": "HowTo",
		"@id": ID.session,
		name: "How a NexaHubTech teaching session runs",
		description:
			"Every session on every course is built in the same three parts.",
		step: SESSION.map((s, i) => ({
			"@type": "HowToStep",
			position: i + 1,
			name: s.t,
			text: `${s.d} ${s.why}`,
		})),
	};
}

/* ── the studio ─────────────────────────────────────────────────── */

export function service(s: ServiceLine): Node {
	const page = servicePage(s);
	return {
		"@type": "Service",
		"@id": ID.service(s),
		url: abs(page.path),
		name: s.t,
		serviceType: s.t,
		description: `${s.tagline} ${s.d}`,
		image: abs(page.image),
		provider: ref(ID.organization),
		areaServed: { "@type": "Country", name: "Nigeria" },
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: s.t,
			itemListElement: s.items.map((item) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: item.t,
					description: item.d,
					provider: ref(ID.organization),
				},
			})),
		},
	};
}

export function serviceCatalog(): Node {
	return {
		"@type": "OfferCatalog",
		"@id": ID.serviceCatalog,
		name: "NexaHubTech studio services",
		url: abs(PAGES.services.path),
		numberOfItems: SERVICES.length,
		itemListElement: SERVICES.map((s, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: ref(ID.service(s)),
		})),
	};
}

export function approachHowTo(): Node {
	let position = 0;
	return {
		"@type": "HowTo",
		"@id": ID.approach,
		name: "How NexaHubTech designs software before building it",
		description: PAGES.approach.description,
		step: APPROACH.map((phase, i) => ({
			"@type": "HowToSection",
			position: i + 1,
			name: phase.t,
			description: `${phase.d} What you do: ${phase.you.does} What you get: ${phase.you.gets}`,
			itemListElement: phase.steps.map((s) => ({
				"@type": "HowToStep",
				position: ++position,
				name: s.t,
				text: s.d,
			})),
		})),
	};
}

/* ── pages ──────────────────────────────────────────────────────── */

/* Home › Courses › PC Basics, from the path. Every ancestor is a real page. */
export function breadcrumb(page: Page): Node | undefined {
	if (page.path === "/") return undefined;
	const segments = page.path.split("/").filter(Boolean);
	const trail = [
		PAGES.home,
		...segments.map((_, i) => {
			const path = `/${segments.slice(0, i + 1).join("/")}`;
			const found = findPage(path);
			if (!found) throw new Error(`breadcrumb ancestor ${path} is not a page`);
			return found;
		}),
	];
	return {
		"@type": "BreadcrumbList",
		"@id": ID.breadcrumb(page.path),
		itemListElement: trail.map((p, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: p.name,
			item: abs(p.path),
		})),
	};
}

/* what each page is about: the entities it carries in full, and which of them
   is the page's main subject */
function subjectOf(page: Page): { main?: string; nodes: Node[] } {
	const c = COURSES.find((x) => coursePage(x).path === page.path);
	if (c) return { main: ID.course(c), nodes: [course(c)] };
	const s = SERVICES.find((x) => servicePage(x).path === page.path);
	if (s) return { main: ID.service(s), nodes: [service(s)] };

	switch (page.path) {
		case PAGES.courses.path:
			return { main: ID.courseCatalog, nodes: [courseCatalog()] };
		case PAGES.services.path:
			return { main: ID.serviceCatalog, nodes: [serviceCatalog()] };
		case PAGES.cbt.path:
			return { nodes: [cbtCourse()] };
		case PAGES.teaching.path:
			return {
				main: ID.principles,
				nodes: [teachingPrinciples(), sessionHowTo()],
			};
		case PAGES.approach.path:
			return { main: ID.approach, nodes: [approachHowTo()] };
		case PAGES.enrol.path:
			return { main: ID.courseCatalog, nodes: [courseCatalog()] };
		default:
			/* home, about, contact: the page is about the company itself */
			return { main: ID.organization, nodes: [] };
	}
}

export function webpage(page: Page): Node {
	const { main } = subjectOf(page);
	const crumbs = breadcrumb(page);
	return {
		"@type": page.kind,
		"@id": ID.webpage(page.path),
		url: abs(page.path),
		name: page.title,
		description: page.description,
		inLanguage: "en-NG",
		isPartOf: ref(ID.website),
		publisher: ref(ID.organization),
		primaryImageOfPage: { "@type": "ImageObject", url: abs(page.image) },
		breadcrumb: crumbs ? ref(crumbs["@id"] as string) : undefined,
		mainEntity: main ? ref(main) : undefined,
		/* an FAQPage's questions are its main entity, per schema.org */
		...(page.path === PAGES.cbt.path
			? {
					about: ref(ID.cbtCourse),
					mainEntity: CBT_FAQS.map((f) => ({
						"@type": "Question",
						name: f.question,
						acceptedAnswer: { "@type": "Answer", text: f.answer },
					})),
				}
			: {}),
	};
}

/* JSON.stringify drops undefined values, but a deep copy without them keeps the
   graph honest in tests too, where it is compared as an object */
function prune<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}

function dedupe(nodes: Node[]): Node[] {
	const seen = new Set<string>();
	return nodes.filter((n) => {
		if (!n["@id"]) return true;
		if (seen.has(n["@id"])) return false;
		seen.add(n["@id"]);
		return true;
	});
}

/* the graph a single page carries in its <head>: the company and the website
   every page belongs to, the page itself, and what it is about */
export function pageGraph(page: Page): Graph {
	const crumbs = breadcrumb(page);
	return prune({
		"@context": "https://schema.org",
		"@graph": dedupe([
			organization(),
			website(),
			webpage(page),
			...(crumbs ? [crumbs] : []),
			...subjectOf(page).nodes,
		]),
	});
}

/* every node, every page — published at /schema.json */
export function siteGraph(): Graph {
	return prune({
		"@context": "https://schema.org",
		"@graph": dedupe([
			organization(),
			website(),
			courseCatalog(),
			...COURSES.map(course),
			cbtCourse(),
			serviceCatalog(),
			...SERVICES.map(service),
			teachingPrinciples(),
			sessionHowTo(),
			approachHowTo(),
			...INDEXABLE_PAGES.flatMap((p) => {
				const crumbs = breadcrumb(p);
				return [webpage(p), ...(crumbs ? [crumbs] : [])];
			}),
		]),
	});
}
