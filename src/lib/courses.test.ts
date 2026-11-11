import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
	bundleSaving,
	bundlesContaining,
	COURSE_COUNT,
	COURSE_COUNT_WORD,
	COURSES,
	coursesAt,
	deliveriesOf,
	type Fee,
	formatNaira,
	instalmentTotal,
	LEVELS,
	nextCourse,
	offeredInPerson,
} from "./courses";

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

/* The price list is data, and these are the rules it was written to. A new fee
   that breaks one is either a typo or a decision — and a decision should be
   made here, on purpose, not discovered on the live site. */
describe("course fees", () => {
	it("offers every course at least one way, with a whole-naira fee", () => {
		for (const c of COURSES) {
			const ways = deliveriesOf(c);
			expect(ways.length, c.slug).toBeGreaterThan(0);
			for (const d of ways) {
				const fee = c.fees[d] as Fee;
				expect(Number.isInteger(fee.upfront), c.slug).toBe(true);
				expect(fee.upfront % 5_000, `${c.slug} ${d} upfront`).toBe(0);
				expect(
					fee.instalments.amount % 2_500,
					`${c.slug} ${d} instalment`,
				).toBe(0);
			}
		}
	});

	/* instalments cost a little more than paying upfront — never less, which
	   would make paying in full the worse deal, and never so much more that
	   spreading the fee becomes a penalty */
	it("prices instalments slightly above paying in full", () => {
		for (const c of COURSES) {
			for (const d of deliveriesOf(c)) {
				const fee = c.fees[d] as Fee;
				const ratio = instalmentTotal(fee) / fee.upfront;
				expect(ratio, `${c.slug} ${d}`).toBeGreaterThanOrEqual(1.05);
				expect(ratio, `${c.slug} ${d}`).toBeLessThanOrEqual(1.13);
				expect(fee.instalments.count, `${c.slug} ${d}`).toBeGreaterThanOrEqual(
					2,
				);
				expect(fee.instalments.count, `${c.slug} ${d}`).toBeLessThanOrEqual(3);
			}
		}
	});

	/* a seat in the room costs more than a place online — the room holds six */
	it("prices a seat at the centre about a fifth above the same course online", () => {
		for (const c of COURSES) {
			const { online, inhouse } = c.fees;
			if (!online || !inhouse) continue;
			const ratio = inhouse.upfront / online.upfront;
			expect(ratio, c.slug).toBeGreaterThanOrEqual(1.15);
			expect(ratio, c.slug).toBeLessThanOrEqual(1.25);
		}
	});

	/* The course page says how a course is delivered, and the fee table says how
	   it can be bought. Offering a seat in the centre that the delivery text says
	   does not exist — or the reverse — is the PC Basics mistake again. */
	it("only sells a seat in the centre where the course says it is taught there", () => {
		const IN_PERSON = /in person|in the centre/i;
		for (const c of COURSES) {
			const says = IN_PERSON.test(`${c.format.t} ${c.format.d}`);
			expect(says, c.slug).toBe(offeredInPerson(c));
		}
	});

	it("writes naira the way the site always has", () => {
		expect(formatNaira(3_000)).toBe("₦3,000");
		expect(formatNaira(120_000)).toBe("₦120,000");
		expect(formatNaira(1_190_000)).toBe("₦1,190,000");
	});
});

describe("the catalogue's structure", () => {
	it("puts every course in a level that exists, in level order", () => {
		const order = LEVELS.map((l) => l.id);
		const seen = COURSES.map((c) => order.indexOf(c.level));
		expect(seen.every((i) => i >= 0)).toBe(true);
		expect(seen).toEqual([...seen].sort((a, b) => a - b));
		for (const l of LEVELS)
			expect(coursesAt(l.id).length, l.id).toBeGreaterThan(0);
	});

	it("points every next step at a real, different course", () => {
		for (const c of COURSES) {
			if (!c.next) continue;
			expect(nextCourse(c), c.slug).toBeDefined();
			expect(c.next.slug, c.slug).not.toBe(c.slug);
		}
	});

	/* a bundle that costs more than its parts is not a bundle */
	it("prices every bundle below its parts, in every delivery it shares with them", () => {
		const bundles = COURSES.filter((c) => c.bundle);
		expect(bundles.length).toBeGreaterThan(0);
		for (const c of bundles) {
			for (const p of c.bundle?.parts ?? [])
				expect(bundlesContaining(p), `${p} in ${c.slug}`).toContain(c);
			for (const d of deliveriesOf(c)) {
				const saving = bundleSaving(c, d);
				expect(saving, `${c.slug} ${d}`).toBeDefined();
				expect(saving ?? 0, `${c.slug} ${d}`).toBeGreaterThan(0);
			}
		}
	});

	it("opens on-request courses only on request", () => {
		for (const c of COURSES) {
			expect(c.admission === "on-request", c.slug).toBe(
				c.level === "on-request",
			);
		}
	});
});
