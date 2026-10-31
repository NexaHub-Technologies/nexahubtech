/* The site as plain markdown — one file per page, plus llms.txt (the index an AI
   agent reads first) and llms-full.txt (everything in one fetch).

   Every route renders client-side, so an agent that fetches a page without running
   JavaScript gets an empty body. These files are the text of those pages, built
   from the same content modules the components render, so an answer engine
   quoting the site quotes what a visitor would actually read. They follow the
   llms.txt proposal (https://llmstxt.org): a page's markdown lives at its URL plus
   `.md`, and llms.txt links to those rather than to the HTML. */

import { APPROACH } from "../approach";
import { CBT_DETAILS, CBT_FAQS, CBT_PACKAGES, CBT_PILLARS } from "../cbt";
import { MISSION, SUMMARY, THESIS, VALUES, VISION } from "../company";
import { CONTACT, MOTTO, SITE_URL } from "../contact";
import { COURSES, type Course } from "../courses";
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
import { taughtInPerson } from "./schema";

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
	const delivery = taughtInPerson(c) ? "in person, Kubwa" : "live online";
	return `- ${mdLink(coursePage(c))} — ${c.d ? `${c.d}. ` : ""}${c.price} · ${c.duration} · ${delivery}. ${c.tagline}`;
}

const cbtLine = () =>
	`- ${mdLink(PAGES.cbt)} — from ${CBT_PACKAGES[CBT_PACKAGES.length - 1].price} · in person, Kubwa. Practice on the computer-based exam for ${CBT_DETAILS.targetExams.join(" and ")}.`;

const serviceLine = (s: ServiceLine) =>
	`- ${mdLink(servicePage(s))} — ${s.tagline} (${s.items.map((i) => i.t).join(", ")})`;

/* ── page bodies ────────────────────────────────────────────────── */

function home(): string {
	return `${SUMMARY}

Motto: *${MOTTO}*

## How it works

${THESIS}

## The school — ${COURSES.length} courses, taught live, start any time

${COURSES.map(courseLine).join("\n")}
${cbtLine()}

How the teaching works: ${mdLink(PAGES.teaching)}. To apply: ${mdLink(PAGES.enrol)}.

## The studio — software built properly

${SERVICES.map(serviceLine).join("\n")}

How a project runs: ${mdLink(PAGES.approach)}.`;
}

function courses(): string {
	return `Every course is taught live by an instructor, with structured materials and real feedback, and starts whenever you are ready. Prices are in Nigerian naira and cover the whole course.

${COURSES.map(courseLine).join("\n")}

## Also offered

${cbtLine()}

Apply for any course at ${abs(PAGES.enrol.path)}.`;
}

function courseDetail(c: Course): string {
	const named = c.projects.filter((p) => p.t);
	return `| | |
|---|---|
| Subject | ${c.d || c.t} |
| Price | ${c.price} |
| Duration | ${c.duration} |
| Format | ${c.format.t} |
| Level | ${c.requirements.level} |
| Start | Any time |

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

## Enrol

Apply at ${enrolUrl(c.slug)} — or ask a question on WhatsApp: ${CONTACT.whatsapp}`;
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

function teaching(): string {
	return `## Principles

${PRINCIPLES.map((p) => `${p.n}. **${p.t}** — ${p.d}`).join("\n")}

## Every session, in three parts

${SESSION.map((s) => `${s.n}. **${s.t}** — ${s.d} *Why:* ${s.why}`).join("\n")}

## What we deliberately do not do

${ANTIPATTERNS.map((a) => `- **${a.t}** — ${a.d}`).join("\n")}`;
}

function enrol(): string {
	return `Applying takes a few minutes: tell us about yourself, choose your course and how you want to train, and we will be in touch about your start date. You start when you are ready.

The application form is at ${abs(PAGES.enrol.path)}. To open it with a course already chosen, add \`?course=<slug>\`:

${COURSES.map((c) => `- ${c.t} (${c.price}): ${enrolUrl(c.slug)}`).join("\n")}

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
	return `${SUMMARY}

## Skills-to-service

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
		[PAGES.courses.path]: courses,
		[PAGES.cbt.path]: cbt,
		[PAGES.teaching.path]: teaching,
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
	const title =
		page.path === "/" ? "NexaHubTech" : `${page.name} — NexaHubTech`;
	return `# ${title}

> ${page.description}

Canonical page: ${abs(page.path)}

${body(page)}

${CONTACT_BLOCK}
`;
}

/* ── llms.txt ───────────────────────────────────────────────────── */

const school = [PAGES.courses, PAGES.cbt, PAGES.teaching, PAGES.enrol];
const studio = [PAGES.services, PAGES.approach];
const company = [PAGES.about, PAGES.contact];

const entry = (page: Page, note = page.description) =>
	`- ${mdLink(page)}: ${note}`;

const inPersonNames = () =>
	[...COURSES.filter(taughtInPerson).map((c) => c.t), "CBT training"].join(
		" and ",
	);

export function llmsTxt(): string {
	return `# NexaHubTech

> ${SUMMARY}

Motto: "${MOTTO}" Based at ${CONTACT.address}, Nigeria (CAC RC ${CONTACT.rc}). Every course is taught live — online, except ${inPersonNames()}, taught in person at the centre — and starts whenever the student is ready. Prices are in Nigerian naira (NGN). Contact: ${CONTACT.email}, ${CONTACT.phoneDisplay}, WhatsApp ${CONTACT.whatsapp}.

Each link below is the markdown version of a page on ${SITE_URL}; drop the \`.md\` suffix for the HTML page.

## Start here

${entry(PAGES.home)}

## The school

${school.map((p) => entry(p)).join("\n")}

## Courses

${COURSES.map((c) => entry(coursePage(c), `${c.d ? `${c.d}. ` : ""}${c.price}, ${c.duration}. ${c.tagline}`)).join("\n")}

## The studio

${studio.map((p) => entry(p)).join("\n")}
${SERVICES.map((s) => entry(servicePage(s))).join("\n")}

## The company

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
