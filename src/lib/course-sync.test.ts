import { describe, expect, it } from "vitest";
import { priceToKobo, syncSql, toRows } from "./course-sync";
import { COURSES, type Course } from "./courses";

const course = (over: Partial<Course>): Course =>
	({
		...COURSES[0],
		slug: "test-course",
		t: "Test course",
		price: "₦80,000",
		modules: [
			{ n: "01", t: "First", d: "" },
			{ n: "02", t: "Second", d: "" },
		],
		...over,
	}) as Course;

describe("course sync", () => {
	it("reads naira prices as kobo", () => {
		expect(priceToKobo("₦80,000")).toBe(8_000_000);
		expect(priceToKobo("₦1,250,000")).toBe(125_000_000);
		expect(priceToKobo("₦500")).toBe(50_000);
	});

	it("refuses a price it can't read rather than guessing", () => {
		for (const p of ["80000", "₦80,00", "From ₦80,000", "₦", "₦80.000"]) {
			expect(() => priceToKobo(p)).toThrow(/can't read the price/);
		}
	});

	it("maps every real course, with modules numbered from 1", () => {
		const rows = toRows(COURSES);
		expect(rows).toHaveLength(COURSES.length);
		for (const r of rows) {
			expect(r.feeKobo).toBeGreaterThan(0);
			expect(r.modules.length).toBeGreaterThan(0);
			expect(r.modules.map((m) => m.n)).toEqual(r.modules.map((_, i) => i + 1));
		}
	});

	it("refuses duplicate courses and duplicate or malformed module numbers", () => {
		expect(() => toRows([course({}), course({})])).toThrow(/appears twice/);
		expect(() =>
			toRows([
				course({
					modules: [
						{ n: "01", t: "A", d: "" },
						{ n: "1", t: "B", d: "" },
					],
				}),
			]),
		).toThrow(/module 1 appears twice/);
		expect(() =>
			toRows([course({ modules: [{ n: "one", t: "A", d: "" }] })]),
		).toThrow(/positive whole number/);
	});

	it("quotes titles safely in the SQL", () => {
		const sql = syncSql(
			toRows([course({ t: "Learner's guide'; drop table x; --" })]),
		);
		expect(sql).toContain("'Learner''s guide''; drop table x; --'");
		expect(sql.match(/^begin;$/m)).not.toBeNull();
		expect(sql.trim().endsWith("commit;")).toBe(true);
	});

	it("never deletes courses, only modules the website dropped", () => {
		const sql = syncSql(toRows(COURSES));
		expect(sql).not.toMatch(/delete from public\.courses/);
		expect(sql).toMatch(/delete from public\.course_modules/);
	});
});
