/* The site as plain markdown — one file per page, plus llms.txt (the index an AI
   agent reads first) and llms-full.txt (everything in one fetch).

   Every route renders client-side, so an agent that fetches a page without running
   JavaScript gets an empty body. These files are the text of those pages, built
   from the same content modules the components render, so an answer engine
   quoting the site quotes what a visitor would actually read. They follow the
   llms.txt proposal (https://llmstxt.org): a page's markdown lives at its URL plus
   `.md`, and llms.txt links to those rather than to the HTML. */

import { APPROACH } from "../approach";
import { BUSINESS_OFFERS } from "../business";
import {
	CBT_DETAILS,
	CBT_FAQS,
	CBT_FROM_PRICE,
	CBT_PACKAGES,
	CBT_PILLARS,
} from "../cbt";
import {
	ACADEMY_SUMMARY,
	DEFINITION,
	MISSION,
	STUDIO_SUMMARY,
	THESIS,
	VALUES,
	VISION,
} from "../company";
import { CONTACT, MOTTO, SITE_URL, TAGLINE } from "../contact";
import {
	bundleSaving,
	CENTRE_SEATS,
	COURSES,
	type Course,
	coursesIn,
	DELIVERY_LABEL,
	deliveriesOf,
	deliveryPhrase,
	type Fee,
	feeSummary,
	formatNaira,
	instalmentLabel,
	nextCourse,
	offeredInPerson,
	offeredOnline,
	priceLabel,
	TRACKS,
} from "../courses";
import { ARM_NAME, modeForPath } from "../mode";
import {
	coursePage,
	INDEXABLE_PAGES,
	markdownPath,
	PAGES,
	type Page,
	servicePage,
} from "../pages";
import { SERVICES, type ServiceLine } from "../services";
import { ANTIPATTERNS, PRINCIPLES, SESSION } from "../teaching";
import { FAMILY_LABEL, SLOTS, slotLabel, slotsFor } from "../timetable";

const abs = (path: string) => `${SITE_URL}${path}`;
/* links between mirrors point at other mirrors, so an agent can keep walking
   the markdown without bouncing off an empty HTML shell */
const mdLink = (page: Page) =>
	`[${page.name}](${abs(markdownPath(page.path))})`;
const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");
const enrolUrl = (slug: string) => abs(`${PAGES.enrol.path}?course=${slug}`);

const CONTACT_BLOCK = `## Contact

- Email: ${CONTACT.email}
- Phone: ${CONTACT.phoneDisplay}
- WhatsApp: ${CONTACT.whatsapp}
- Address: ${CONTACT.address}, Nigeria
- Company registration: RC ${CONTACT.rc}`;

function courseLine(c: Course): string {
	return `- ${mdLink(coursePage(c))} — ${c.d ? `${c.d}. ` : ""}${priceLabel(c)} · ${c.duration} · ${deliveryPhrase(c)}. ${c.tagline}`;
}

const cbtLine = () =>
	`- ${mdLink(PAGES.cbt)} — from ${CBT_FROM_PRICE} · in person, Kubwa. Practice on the computer-based exam for ${CBT_DETAILS.targetExams.join(" and ")}.`;

const feeRow = (c: Course) => {
	const cell = (fee: Fee | undefined) =>
		fee ? `${formatNaira(fee.upfront)} (or ${instalmentLabel(fee)})` : "—";
	return `| ${c.t} | ${c.duration} | ${cell(c.fees.online)} | ${cell(c.fees.inhouse)} |`;
};

const serviceLine = (s: ServiceLine) =>
	`- ${mdLink(servicePage(s))} — ${s.tagline} (${s.items.map((i) => i.t).join(", ")})`;

/* ── page bodies ────────────────────────────────────────────────── */

function home(): string {
	return `${STUDIO_SUMMARY}

Tagline: *${MOTTO}*

## What we build

${SERVICES.map(serviceLine).join("\n")}

How a project runs: ${mdLink(PAGES.approach)}. To start one: ${mdLink(PAGES.contact)}.

## NexaHubTech Academy

${ACADEMY_SUMMARY} It has its own pages: ${mdLink(PAGES.academy)}.`;
}

function academy(): string {
	return `${ACADEMY_SUMMARY}

Tagline: *${TAGLINE.learn}*

## ${COURSES.length} live courses, online or in person, start any day

Every course but PC Basics can be taken live online or in person, in a class of no more than ${CENTRE_SEATS}. Fees can be paid in full or in instalments: ${mdLink(PAGES.fees)}. How we teach, where and when: ${mdLink(PAGES.academyAbout)}.

${COURSES.map(courseLine).join("\n")}
${cbtLine()}

Training for organisations: ${mdLink(PAGES.forBusiness)}. To apply: ${mdLink(PAGES.enrol)}.

## Backed by NexaHubTech

${THESIS} The parent company: ${mdLink(PAGES.home)}.`;
}

function courses(): string {
	return `Every course is taught live by an instructor, with structured materials and real feedback — online, or in person in a class of no more than ${CENTRE_SEATS} — and starts whenever you are ready. Every course is offered both ways except PC Basics, which is taught in person only. Prices are in Nigerian naira, cover the whole course, and can be paid in instalments: ${mdLink(PAGES.fees)}.

${TRACKS.map(
	(t) => `## ${t.t}

${t.d} For: ${t.who.toLowerCase()}.

${coursesIn(t.id).map(courseLine).join("\n")}`,
).join("\n\n")}

## Also offered

${cbtLine()}

Apply for any course at ${abs(PAGES.enrol.path)}.`;
}

function courseDetail(c: Course): string {
	const named = c.projects.filter((p) => p.t);
	return `| | |
|---|---|
| Subject | ${c.d || c.t} |
${deliveriesOf(c)
	.map((d) => {
		const fee = c.fees[d] as Fee;
		return `| Fee — ${DELIVERY_LABEL[d].toLowerCase()} | ${formatNaira(fee.upfront)}, or ${instalmentLabel(fee)} |`;
	})
	.join("\n")}
| Duration | ${c.duration} |
| Format | ${c.format.t} |
| Level | ${c.requirements.level} |
| Start | ${c.admission === "rolling" ? "Any day" : "When enough people have asked — register your interest"} |
| Session times | ${slotsFor(c)
		.map((s) => `${slotLabel(s)} (${DELIVERY_LABEL[s.delivery].toLowerCase()})`)
		.join("; ")} |

${c.format.d}

## The idea this course installs: ${c.mentalModel.t}

${c.mentalModel.d}

Once it lands, you can:

${bullets(c.mentalModel.unlocks)}

## Before you start

What you need to know:

${bullets(c.requirements.know)}

What you need to have:

${bullets(c.requirements.have)}

## Modules

${c.modules.map((m) => `${m.n}. **${m.t}** — ${m.d}`).join("\n")}
${
	named.length
		? `
## What you build

${named.map((p) => `- **${p.t}**${p.capstone ? " (capstone)" : ""} — ${p.d} *Weeks ${p.weeks}*`).join("\n")}
`
		: ""
}
## Every session

${c.session.map((s, i) => `${i + 1}. **${s.t}** — ${s.d}`).join("\n")}

## Included

${bullets(c.features)}
${courseNext(c)}
## Enrol

Apply at ${enrolUrl(c.slug)} — or ask a question on WhatsApp: ${CONTACT.whatsapp}`;
}

function courseNext(c: Course): string {
	const lines: string[] = [];
	const saving = bundleSaving(c);
	if (c.bundle && saving)
		lines.push(
			`This one track covers ${c.bundle.parts.map((s) => COURSES.find((x) => x.slug === s)?.t ?? s).join(" and ")}, for ${formatNaira(saving)} less than taking them separately.`,
		);
	const next = nextCourse(c);
	if (next)
		lines.push(
			`Next: ${mdLink(coursePage(next))}${c.next?.upgrade ? ` — carry on for ${formatNaira(c.next.upgrade)} more` : ""}.`,
		);
	return lines.length ? `\n## Where it leads\n\n${lines.join("\n\n")}\n` : "";
}

function fees(): string {
	return `Every fee covers the whole course. Pay in full before your first session, or in equal instalments — which cost a little more in total. Almost every course is offered online and in person; in-person places cost more because classes are capped at ${CENTRE_SEATS}.

${TRACKS.map(
	(t) => `## ${t.t}

| Course | Length | ${DELIVERY_LABEL.online} | ${DELIVERY_LABEL.inhouse} |
|---|---|---|---|
${coursesIn(t.id).map(feeRow).join("\n")}`,
).join("\n\n")}

## CBT exam practice

${CBT_PACKAGES.map((p) => `- **${p.name}** — ${p.price}. ${p.duration}.`).join("\n")}

## For organisations

${BUSINESS_OFFERS.map((o) => `- **${o.t}** — ${o.price} ${o.unit}.`).join("\n")}

Details: ${mdLink(PAGES.forBusiness)}.`;
}

function forBusiness(): string {
	return `${BUSINESS_OFFERS.map(
		(o) => `## ${o.t}

For: ${o.for}. **${o.price}** ${o.unit}.

${o.d}

${bullets(o.points)}`,
	).join("\n\n")}

To arrange any of these, email ${CONTACT.email} or message ${CONTACT.whatsapp}.`;
}

function cbt(): string {
	return `- Exams covered: ${CBT_DETAILS.targetExams.join(", ")}
- Where: ${CBT_DETAILS.location}, Nigeria — taught in person, on the centre's desktop computers
- Hours: ${CBT_DETAILS.hours}

## What you practise

${CBT_PILLARS.map((p) => `${p.n}. **${p.title}** — ${p.description}`).join("\n")}

## Packages

${CBT_PACKAGES.map(
	(p) =>
		`### ${p.name} — ${p.price}${p.badge ? ` (${p.badge})` : ""}

${p.duration}. Ideal for: ${p.idealFor.toLowerCase()}.

${bullets(p.features)}`,
).join("\n\n")}

## Questions

${CBT_FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}`;
}

function academyAbout(): string {
	const group = (inhouse: boolean) =>
		SLOTS.filter((s) => (s.delivery === "inhouse") === inhouse)
			.map(
				(s) =>
					`- **${FAMILY_LABEL[s.family]}** — ${slotLabel(s)}${s.note ? `. ${s.note}` : ""}`,
			)
			.join("\n");
	return `${ACADEMY_SUMMARY}

## How we teach

We teach the idea before the syntax. It feels slower for a fortnight, then it compounds — every new thing attaches to something the learner already understands.

### Principles

${PRINCIPLES.map((p) => `${p.n}. **${p.t}** — ${p.d}`).join("\n")}

### Every session, in three parts

${SESSION.map((s) => `${s.n}. **${s.t}** — ${s.d} *Why:* ${s.why}`).join("\n")}

### How long a course takes

Every course states a length: what it takes at the hours the course asks for, not a term to keep up with. More hours finishes sooner; fewer takes longer.

### What we deliberately do not do

${ANTIPATTERNS.map((a) => `- **${a.t}** — ${a.d}`).join("\n")}

## Where and when

Every course except PC Basics can be taken live online or in person. There are no fixed intakes: start any day and join a standing weekly session. People at different points in the same course share a session, and the materials carry each person at their own pace.

- Learning centre: ${CONTACT.address}, Nigeria
- Open: ${CBT_DETAILS.hours}
- In-person classes of no more than ${CENTRE_SEATS}; machines provided for the computer-skills, office and CBT sessions
- Visitors are welcome before enrolling

### Session times — in person (West Africa Time)

${group(true)}

### Session times — live online (West Africa Time)

${group(false)}`;
}

function enrol(): string {
	return `Applying takes a few minutes: tell us about yourself, choose your course and how you want to train, and we will be in touch about your start date. You start when you are ready.

The application form is at ${abs(PAGES.enrol.path)}. To open it with a course already chosen, add \`?course=<slug>\`:

${COURSES.map((c) => `- ${c.t} (${priceLabel(c)}): ${enrolUrl(c.slug)}`).join("\n")}

For WAEC & JAMB CBT training, see ${mdLink(PAGES.cbt)}, or walk in during opening hours.`;
}

function services(): string {
	return `${SERVICES.map(
		(s) => `## ${mdLink(servicePage(s))}

${s.tagline}

${s.items.map((i) => `- **${i.t}** — ${i.d}`).join("\n")}`,
	).join("\n\n")}

How a project runs: ${mdLink(PAGES.approach)}. To start one: ${mdLink(PAGES.contact)}.`;
}

function serviceDetail(s: ServiceLine): string {
	return `${s.d}

## What this covers

${s.items.map((i) => `- **${i.t}** — ${i.d}`).join("\n")}

How a project runs: ${mdLink(PAGES.approach)}. To start one, email ${CONTACT.email} or message ${CONTACT.whatsapp}.`;
}

function approach(): string {
	return `${APPROACH.map(
		(phase) => `## ${phase.t}

${phase.d}

- **What you do:** ${phase.you.does}
- **What you get:** ${phase.you.gets}

${phase.steps.map((s) => `${s.n}. **${s.t}** — ${s.d}`).join("\n")}`,
	).join("\n\n")}`;
}

function about(): string {
	return `${DEFINITION}

## The studio

${STUDIO_SUMMARY}

## NexaHubTech Academy

${ACADEMY_SUMMARY} ${mdLink(PAGES.academy)}

## How they relate

${THESIS}

## Vision

${VISION}

## Mission

${MISSION}

## Core values

${VALUES.map((v) => `- **${v.t}** — ${v.d}`).join("\n")}`;
}

function contact(): string {
	return `WhatsApp is the fastest way to reach us. To ask about a course, say which one; to start a project, a few lines on what it needs to do is enough — no specification required.

The centre at ${CBT_DETAILS.location} is open ${CBT_DETAILS.hours}.`;
}

function body(page: Page): string {
	const c = COURSES.find((x) => coursePage(x).path === page.path);
	if (c) return courseDetail(c);
	const s = SERVICES.find((x) => servicePage(x).path === page.path);
	if (s) return serviceDetail(s);
	const bodies: Record<string, () => string> = {
		[PAGES.home.path]: home,
		[PAGES.academy.path]: academy,
		[PAGES.courses.path]: courses,
		[PAGES.fees.path]: fees,
		[PAGES.forBusiness.path]: forBusiness,
		[PAGES.cbt.path]: cbt,
		[PAGES.academyAbout.path]: academyAbout,
		[PAGES.enrol.path]: enrol,
		[PAGES.services.path]: services,
		[PAGES.approach.path]: approach,
		[PAGES.about.path]: about,
		[PAGES.contact.path]: contact,
	};
	const render = bodies[page.path];
	if (!render) throw new Error(`no markdown body for ${page.path}`);
	return render();
}

/* one page as markdown. The header repeats the page's own title, summary and
   canonical URL, so a file that is fetched alone still says what it is. */
export function pageMarkdown(page: Page): string {
	/* each page is titled with the business it belongs to; the shared pages
	   (about, contact) belong to the parent company */
	const brand = ARM_NAME[modeForPath(page.path) ?? "build"];
	const title =
		page.path === "/" || page.name === brand
			? brand
			: `${page.name} — ${brand}`;
	return `# ${title}

> ${page.description}

Canonical page: ${abs(page.path)}

${body(page)}

${CONTACT_BLOCK}
`;
}

/* ── llms.txt ───────────────────────────────────────────────────── */

const school = [
	PAGES.academy,
	PAGES.courses,
	PAGES.cbt,
	PAGES.academyAbout,
	PAGES.fees,
	PAGES.forBusiness,
	PAGES.enrol,
];
const studio = [PAGES.services, PAGES.approach];
const company = [PAGES.about, PAGES.contact];

const entry = (page: Page, note = page.description) =>
	`- ${mdLink(page)}: ${note}`;

const names = (cs: Course[]) => cs.map((c) => c.t).join(", ");

export function llmsTxt(): string {
	return `# NexaHubTech

> ${DEFINITION}

Tagline: "${MOTTO}" Based at ${CONTACT.address}, Nigeria (CAC RC ${CONTACT.rc}). Its two arms each have their own pages: the software studio, under the NexaHubTech name, and NexaHubTech Academy. Every Academy course is taught live and starts whenever the student is ready, online or in person (no more than ${CENTRE_SEATS} per in-person class, priced above a place online). ${names(COURSES.filter((c) => offeredInPerson(c) && !offeredOnline(c)))} and CBT training are taught in person only. Fees can be paid in instalments. Prices are in Nigerian naira (NGN). Contact: ${CONTACT.email}, ${CONTACT.phoneDisplay}, WhatsApp ${CONTACT.whatsapp}.

Each link below is the markdown version of a page on ${SITE_URL}; drop the \`.md\` suffix for the HTML page.

## Start here

${entry(PAGES.home)}

## NexaHubTech Academy

${ACADEMY_SUMMARY}

${school.map((p) => entry(p)).join("\n")}

## Courses

${COURSES.map((c) => entry(coursePage(c), `${c.d ? `${c.d}. ` : ""}${feeSummary(c)}. ${c.duration}. ${c.tagline}`)).join("\n")}

## The studio — software for businesses

${studio.map((p) => entry(p)).join("\n")}
${SERVICES.map((s) => entry(servicePage(s))).join("\n")}

## About NexaHubTech

${company.map((p) => entry(p)).join("\n")}

## Optional

- [Full text](${abs("/llms-full.txt")}): every page above in one file
- [Knowledge graph](${abs("/schema.json")}): the schema.org JSON-LD graph of the company, its courses, services and pages
- [Sitemap](${abs("/sitemap.xml")}): every indexable URL
`;
}

export function llmsFullTxt(): string {
	return `${llmsTxt()}
${INDEXABLE_PAGES.map(pageMarkdown).join("\n---\n\n")}`;
}
