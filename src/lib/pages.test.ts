import { describe, expect, it } from "vitest";
import { COURSES } from "./courses";
import { coursePage, PAGES, servicePage } from "./pages";
import { SERVICES } from "./services";
import { ACADEMY_NAME, COMPANY_NAME, inAcademy } from "./site";

/* One website, two arms. Every page's title says which name it is published
   under — a search result or a browser tab should never leave a visitor
   guessing whether they are looking at the studio or the Academy. */
describe("page titles name the arm the page belongs to", () => {
	const pages = [
		...Object.values(PAGES),
		...COURSES.map(coursePage),
		...SERVICES.map(servicePage),
	];

	it("puts the Academy's name on every page in the Academy's section", () => {
		for (const p of pages.filter((x) => inAcademy(x.path))) {
			expect(p.title, p.path).toMatch(/NexaHubTech Academy/);
		}
	});

	it("never puts the Academy's name on the company's own pages", () => {
		for (const p of pages.filter((x) => !inAcademy(x.path))) {
			expect(p.title, p.path).not.toMatch(/Academy/);
			expect(p.title, p.path).toMatch(/NexaHubTech/);
		}
	});

	it("gives the company and the Academy each a front page", () => {
		expect(inAcademy(PAGES.home.path)).toBe(false);
		expect(inAcademy(PAGES.academy.path)).toBe(true);
		expect(PAGES.academy.title.startsWith(ACADEMY_NAME)).toBe(true);
		expect(PAGES.home.title.startsWith(COMPANY_NAME)).toBe(true);
	});
});
