import { describe, expect, it } from "vitest";
import { COURSES } from "./courses";

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
