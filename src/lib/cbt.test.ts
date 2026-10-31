import { describe, expect, it } from "vitest";
import {
	CBT_DETAILS,
	CBT_FAQS,
	CBT_PACKAGES,
	CBT_PILLARS,
	SAMPLE_CBT_QUESTIONS,
} from "./cbt";

describe("CBT training data", () => {
	it("has complete details and venue address", () => {
		expect(CBT_DETAILS.title).toContain("WAEC & JAMB");
		expect(CBT_DETAILS.location).toContain("Kubwa");
		expect(CBT_DETAILS.targetExams.length).toBeGreaterThanOrEqual(2);
	});

	/* the display line is what visitors read; openingHours is what search engines
	   and AI agents read. Two copies of one fact, so they are checked against each other. */
	it("publishes the same opening hours it displays", () => {
		const { hours, openingHours } = CBT_DETAILS;
		const days = openingHours.days;
		expect(hours).toContain(`${days[0]} – ${days[days.length - 1]}`);
		const clock = (hhmm: string) => {
			const [h, m] = hhmm.split(":").map(Number);
			return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
		};
		expect(hours).toContain(
			`${clock(openingHours.opens)} – ${clock(openingHours.closes)}`,
		);
	});

	it("covers core training pillars", () => {
		expect(CBT_PILLARS.length).toBeGreaterThanOrEqual(4);
		for (const p of CBT_PILLARS) {
			expect(p.title.length).toBeGreaterThan(5);
			expect(p.description.length).toBeGreaterThan(50);
		}
	});

	it("has clear packages with prices and durations", () => {
		expect(CBT_PACKAGES.length).toBeGreaterThanOrEqual(3);
		for (const pkg of CBT_PACKAGES) {
			expect(pkg.price).toMatch(/^₦[\d,]+/);
			expect(pkg.features.length).toBeGreaterThanOrEqual(3);
			expect(pkg.idealFor.length).toBeGreaterThan(10);
		}
	});

	it("provides comprehensive FAQs for candidates and parents", () => {
		expect(CBT_FAQS.length).toBeGreaterThanOrEqual(4);
		for (const faq of CBT_FAQS) {
			expect(faq.question).toMatch(/\?$/);
			expect(faq.answer.length).toBeGreaterThan(40);
		}
	});

	it("provides valid sample interactive questions with all options", () => {
		expect(SAMPLE_CBT_QUESTIONS.length).toBeGreaterThanOrEqual(3);
		for (const q of SAMPLE_CBT_QUESTIONS) {
			expect(q.options.map((o) => o.key)).toEqual(["A", "B", "C", "D"]);
			expect(["A", "B", "C", "D"]).toContain(q.correct);
			expect(q.explanation.length).toBeGreaterThan(10);
		}
	});
});
