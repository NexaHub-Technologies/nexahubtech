import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { COURSES } from "./courses";

/* courses.ts is the source of truth. The commercial facts are no longer copied
   into these documents at all — the course page renders them from the course
   record — so what follows guards the parts that are still written twice, plus
   the structure the curriculum promises. */

const DIR = "docs/courses";
const doc = (slug: string) => readFileSync(`${DIR}/${slug}.md`, "utf8");

describe("course curriculum docs", () => {
	it("has one document per course, and no orphans", () => {
		const files = readdirSync(DIR)
			/* README.md is the index; NAMES.md is the name register — neither is a course */
			.filter((f) => f.endsWith(".md") && f !== "README.md" && f !== "NAMES.md")
			.map((f) => f.replace(/\.md$/, ""))
			.sort();
		expect(files).toEqual(COURSES.map((c) => c.slug).sort());
	});

	it("covers every module, by its real title", () => {
		for (const c of COURSES) {
			const md = doc(c.slug);
			for (const m of c.modules) {
				expect(md, `${c.slug} module ${m.n}`).toContain(m.t);
			}
		}
	});

	it("carries the course's mental model", () => {
		for (const c of COURSES) {
			expect(doc(c.slug), `${c.slug}`).toContain(c.mentalModel.t);
		}
	});

	/* the three-part session is the pedagogy; a module with no brief is an outline
	   rather than a curriculum */
	it("gives every module an exercise brief", () => {
		for (const c of COURSES) {
			const briefs = doc(c.slug).match(/\*\*Exercise brief/g) ?? [];
			/* every module but the last, whose work is the course capstone and now
			   lives in the Projects section rather than in the module */
			expect(briefs.length, `${c.slug}`).toBeGreaterThanOrEqual(
				c.modules.length - 1,
			);
		}
	});

	/* Projects replaced a per-week deliverable: a major piece after every two or
	   three modules, so a learner finishes with three or four independent things
	   rather than a pile of weekly fragments. The blocks have to tile the course
	   exactly — every module in one project, every week accounted for — or the
	   schedule has a hole in it that nobody would notice by reading. */
	it("covers every course in three or four projects", () => {
		const span = (text: string): number[] => {
			const [a, b] = text.replace(/–/g, "-").split("-").map(Number);
			return b === undefined
				? [a]
				: Array.from({ length: b - a + 1 }, (_, i) => a + i);
		};

		for (const c of COURSES) {
			const md = doc(c.slug);
			const section = md.split("## Projects")[1] ?? "";
			const blocks = [
				...section.matchAll(
					/^### Project (\d+) — .+\n\*Modules? ([\d–-]+) · Weeks? ([\d–-]+)\*/gm,
				),
			];

			expect(blocks.length, `${c.slug} project count`).toBeGreaterThanOrEqual(
				3,
			);
			expect(blocks.length, `${c.slug} project count`).toBeLessThanOrEqual(4);

			/* numbered 1..n in order */
			expect(
				blocks.map((b) => Number(b[1])),
				`${c.slug} project numbering`,
			).toEqual(blocks.map((_, i) => i + 1));

			/* every module lands in exactly one project, in order */
			const mods = blocks.flatMap((b) => span(b[2] as string));
			expect(mods, `${c.slug} module coverage`).toEqual(
				c.modules.map((_, i) => i + 1),
			);

			/* every week accounted for, with no gaps */
			const weeks = blocks.flatMap((b) => span(b[3] as string));
			expect(weeks, `${c.slug} week coverage`).toEqual(
				Array.from(
					{ length: Number(c.duration.replace(/\D/g, "")) },
					(_, i) => i + 1,
				),
			);

			/* the last project is the capstone */
			const last = section.slice(blocks.at(-1)?.index ?? 0);
			expect(last, `${c.slug} final project is the capstone`).toContain(
				"**Course capstone.**",
			);
		}
	});

	it("ends every course on a capstone", () => {
		for (const c of COURSES) {
			expect(doc(c.slug), `${c.slug}`).toContain("**Course capstone.**");
		}
	});

	/* Three places state the schedule — the week plan table, each module's own
	   *Week n* marker, and the projects section — and nothing stopped them
	   drifting apart. Merging two modules into one week is exactly the edit that
	   breaks them silently, so the agreement is checked rather than eyeballed. */
	it("keeps the week plan, the module markers and the duration in agreement", () => {
		const span = (text: string): number[] => {
			const [a, b] = text.replace(/–/g, "-").split("-").map(Number);
			return b === undefined
				? [a]
				: Array.from({ length: b - a + 1 }, (_, i) => a + i);
		};

		for (const c of COURSES) {
			const md = doc(c.slug);
			const plan = md.split("## Week plan")[1]?.split("## Projects")[0];
			expect(plan, `${c.slug} has a week plan`).toBeTruthy();

			const rows = [
				...(plan ?? "").matchAll(/^\| ([\d–-]+) \| ([\d–-]+) \| /gm),
			];
			expect(rows.length, `${c.slug} plan rows`).toBeGreaterThan(0);

			/* the plan must cover every week of the course exactly once */
			const covered = rows
				.flatMap((r) => span(r[1] as string))
				.sort((a, b) => a - b);
			const weeks = Number(c.duration.replace(/\D/g, ""));
			expect(covered, `${c.slug} week coverage`).toEqual(
				Array.from({ length: weeks }, (_, i) => i + 1),
			);

			/* a row may carry several modules; each module's own marker must sit
			   inside that row, and together they must account for all of it */
			const markers = new Map(
				[...md.matchAll(/^## Module (\d+) — .+\n\*Weeks? ([\d–-]+)\*/gm)].map(
					(m) => [m[1] as string, span(m[2] as string)],
				),
			);

			let planned = 0;
			for (const row of rows) {
				const rowWeeks = span(row[1] as string);
				const mods = span(row[2] as string).map((n) =>
					String(n).padStart(2, "0"),
				);
				const union = new Set<number>();
				for (const mod of mods) {
					const marker = markers.get(mod);
					expect(
						marker,
						`${c.slug} module ${mod} has a week marker`,
					).toBeTruthy();
					for (const w of marker ?? []) {
						expect(rowWeeks, `${c.slug} module ${mod} week ${w}`).toContain(w);
						union.add(w);
					}
					planned++;
				}
				expect(
					[...union].sort((a, b) => a - b),
					`${c.slug} row ${row[1]}`,
				).toEqual(rowWeeks);
			}

			expect(planned, `${c.slug} modules in the plan`).toBe(c.modules.length);
			expect(markers.size, `${c.slug} module markers`).toBe(c.modules.length);
		}
	});

	/* Names are the whole point of naming: a student must finish with distinct
	   artefacts. The first attempt at this was done by three people in parallel who
	   could not see each other's lists, and produced Bukka and Buka — two canteen
	   projects one letter apart, in two courses somebody might take both of. No
	   amount of care holds this; a test does. */
	it("gives every project a name unique across all courses", () => {
		const seen = new Map<string, string>();
		for (const c of COURSES) {
			const titles = [
				...doc(c.slug).matchAll(/^### Project \d+ — (.+)$/gm),
			].map((m) => (m[1] as string).trim());

			expect(titles.length, `${c.slug} project titles`).toBe(
				c.modules.length > 0 ? titles.length : 0,
			);

			for (const title of titles) {
				/* "Steady and Digits" and "Errand, Meter or Fare" are single projects
				   shipping more than one artefact — split so each name is checked */
				for (const name of title.split(/,| and | or /).map((x) => x.trim())) {
					if (!name) continue;
					const owner = seen.get(name.toLowerCase());
					expect(
						owner,
						`"${name}" is used by both ${owner} and ${c.slug}`,
					).toBeUndefined();
					seen.set(name.toLowerCase(), c.slug);
				}
			}
		}
	});

	/* docs/<course>/<project>.md is generated from the project blocks above, so an
	   the spec an instructor builds from cannot drift from the curriculum document
	   it came out of. This catches the generator not having been re-run. */
	it("has a spec file for every project, and no orphaned specs", () => {
		const slugify = (name: string) =>
			name
				.normalize("NFKD")
				.replace(/[\u0300-\u036f]/g, "")
				.toLowerCase()
				.replace(/&/g, "and")
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-|-$/g, "");

		for (const c of COURSES) {
			const titles = [
				...doc(c.slug).matchAll(/^### Project \d+ — (.+)$/gm),
			].map((m) => slugify((m[1] as string).trim()));

			/* videography's projects are not named yet — its specs are coming from
			   the videography instructor */
			if (c.slug === "videography-video-editing") {
				expect(
					existsSync(`docs/${c.slug}`),
					`${c.slug} has no spec dir yet`,
				).toBe(false);
				continue;
			}

			const specs = readdirSync(`docs/${c.slug}`)
				.filter((f) => f.endsWith(".md") && f !== "README.md")
				.map((f) => f.replace(/\.md$/, ""))
				.sort();

			expect(specs, `${c.slug} specs`).toEqual([...titles].sort());
		}
	});

	it("links every course from the index", () => {
		const readme = readFileSync(`${DIR}/README.md`, "utf8");
		for (const c of COURSES) {
			expect(readme, c.slug).toContain(`(${c.slug}.md)`);
		}
	});
});
