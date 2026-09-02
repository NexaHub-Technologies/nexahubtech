import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSE_COUNT, COURSE_COUNT_WORD, COURSES } from "./courses";

/* every course carries a mental model, and the type makes that non-negotiable —
   these cover what the compiler can't: that each one is actually filled in, and
   that no two courses were handed the same idea. */
describe("course mental models", () => {
	it("gives each course a named idea, an explanation and what it unlocks", () => {
		for (const c of COURSES) {
			const { t, d, unlocks } = c.mentalModel;
			expect(t.length, c.slug).toBeGreaterThan(8);
			expect(d.length, c.slug).toBeGreaterThan(120);
			expect(unlocks, c.slug).toHaveLength(3);
			for (const u of unlocks) expect(u.trim(), c.slug).not.toBe("");
		}
	});

	it("does not reuse one course's idea on another", () => {
		const ideas = COURSES.map((c) => c.mentalModel.t);
		expect(new Set(ideas).size).toBe(ideas.length);
	});
});

describe("course requirements", () => {
	it("tells every visitor what to know and what to have", () => {
		for (const c of COURSES) {
			const { level, know, have } = c.requirements;
			expect(level.trim(), c.slug).not.toBe("");
			expect(know.length, c.slug).toBeGreaterThanOrEqual(2);
			expect(have.length, c.slug).toBeGreaterThanOrEqual(2);
			for (const r of [...know, ...have]) expect(r.trim(), c.slug).not.toBe("");
		}
	});

	/* the level phrase is dropped into a sentence on the course page, so a
	   trailing full stop would read as a stutter before the dash that follows */
	it("keeps the level a phrase that can finish a sentence", () => {
		for (const c of COURSES) {
			expect(c.requirements.level.endsWith("."), c.slug).toBe(false);
		}
	});

	it("says what each course costs in hours, not only in naira", () => {
		for (const c of COURSES) {
			const hours = c.requirements.have.some((r) => /hours a week/.test(r));
			expect(hours, c.slug).toBe(true);
		}
	});
});

/* The site says how many courses there are, in words, in five separate
   sentences. When a twelfth course was added every one of them still said
   "eleven": a number spelled out in prose is invisible to the compiler, to the
   other tests, and to anyone not hunting for it. They render from
   COURSE_COUNT_WORD now, and this stops the literal creeping back. */
describe("the course count in prose", () => {
	const WORDS = [
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"eleven",
		"twelve",
		"thirteen",
		"fourteen",
		"fifteen",
		"sixteen",
		"seventeen",
		"eighteen",
		"nineteen",
		"twenty",
	];

	const tsx = (dir: string): string[] =>
		readdirSync(dir).flatMap((entry) => {
			const path = join(dir, entry);
			if (statSync(path).isDirectory()) return tsx(path);
			return path.endsWith(".tsx") ? [path] : [];
		});

	it("is never spelled out by hand in a route", () => {
		/* "tracks" is the marketing word for the same thing, so it counts.
		   "Eleven steps" on the approach pages is a different eleven and is
		   deliberately not matched. */
		const pattern = new RegExp(
			`\\b(${WORDS.join("|")})\\s+(courses|tracks)\\b`,
			"i",
		);

		for (const file of tsx("src/routes")) {
			/* JSX wraps prose across lines, so match against it flattened */
			const flat = readFileSync(file, "utf8").replace(/\s+/g, " ");
			const hit = flat.match(pattern);
			expect(
				hit?.[0],
				`${file} spells out a course count — render COURSE_COUNT_WORD instead`,
			).toBeUndefined();
		}
	});

	it("has a word for however many courses there are", () => {
		expect(COURSE_COUNT_WORD).not.toBe(String(COURSE_COUNT));
		expect(COURSE_COUNT).toBe(COURSES.length);
	});
});
