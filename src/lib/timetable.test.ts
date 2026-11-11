import { describe, expect, it } from "vitest";
import { CBT_DETAILS } from "./cbt";
import { COURSES, deliveriesOf } from "./courses";
import {
	clock,
	daysLabel,
	INSTRUCTOR,
	minutes,
	type SessionSlot,
	SLOTS,
	slotsFor,
} from "./timetable";

const overlap = (a: SessionSlot, b: SessionSlot) =>
	a.days.some((d) => b.days.includes(d)) &&
	minutes(a.start) < minutes(b.end) &&
	minutes(b.start) < minutes(a.end);

const pairs = <T>(xs: T[]) =>
	xs.flatMap((a, i) => xs.slice(i + 1).map((b) => [a, b] as const));

describe("the weekly timetable", () => {
	it("gives every slot a real span of time", () => {
		for (const s of SLOTS) {
			expect(minutes(s.end), s.id).toBeGreaterThan(minutes(s.start));
			expect(s.days.length, s.id).toBeGreaterThan(0);
		}
		const ids = SLOTS.map((s) => s.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	/* the centre is one room */
	it("never books the room twice", () => {
		const room = SLOTS.filter((s) => s.delivery === "inhouse");
		for (const [a, b] of pairs(room))
			expect(overlap(a, b), `${a.id} and ${b.id}`).toBe(false);
	});

	/* and each family is one person */
	it("never puts an instructor in two places at once", () => {
		for (const [a, b] of pairs(SLOTS)) {
			if (INSTRUCTOR[a.family] !== INSTRUCTOR[b.family]) continue;
			expect(overlap(a, b), `${a.id} and ${b.id}`).toBe(false);
		}
	});

	it("keeps every session in the centre inside the hours it publishes", () => {
		const { days, opens, closes } = CBT_DETAILS.openingHours;
		for (const s of SLOTS.filter((x) => x.delivery === "inhouse")) {
			expect(minutes(s.start), s.id).toBeGreaterThanOrEqual(minutes(opens));
			expect(minutes(s.end), s.id).toBeLessThanOrEqual(minutes(closes));
			for (const d of s.days)
				expect(
					days.some((full) => full.startsWith(d)),
					`${s.id} on ${d}`,
				).toBe(true);
		}
	});

	/* a course on sale with nowhere to sit it is a promise the school cannot keep */
	it("has a slot for every way every course is sold", () => {
		for (const c of COURSES) {
			for (const d of deliveriesOf(c)) {
				expect(
					slotsFor(c).some((s) => s.delivery === d),
					`${c.slug} ${d}`,
				).toBe(true);
			}
		}
	});

	it("reads times and days the way people say them", () => {
		expect(clock("08:30")).toBe("8:30 AM");
		expect(clock("16:00")).toBe("4:00 PM");
		expect(daysLabel(["Mon", "Tue", "Wed", "Thu", "Fri"])).toBe("Mon – Fri");
		expect(daysLabel(["Mon", "Wed", "Fri"])).toBe("Mon, Wed, Fri");
		expect(daysLabel(["Tue", "Thu"])).toBe("Tue, Thu");
	});
});
