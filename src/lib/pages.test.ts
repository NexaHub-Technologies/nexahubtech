import { describe, expect, it } from "vitest";
import { COURSES } from "./courses";
import { ARM_NAME, modeForPath } from "./mode";
import { coursePage, PAGES, servicePage } from "./pages";
import { SERVICES } from "./services";

/* The company and its Academy are separate businesses. Every page says which
   one it belongs to in its title — a search result or a browser tab should
   never leave a visitor guessing whether they are looking at the software
   company or the training division. */
describe("page titles name the business the page belongs to", () => {
	const pages = [
		...Object.values(PAGES),
		...COURSES.map(coursePage),
		...SERVICES.map(servicePage),
	];

	it("ends every Academy page title with the Academy's name", () => {
		for (const p of pages.filter((x) => modeForPath(x.path) === "learn")) {
			expect(p.title, p.path).toMatch(/NexaHubTech Academy/);
		}
	});

	it("never puts the Academy's name on the company's own pages", () => {
		for (const p of pages.filter((x) => modeForPath(x.path) !== "learn")) {
			expect(p.title, p.path).not.toMatch(/Academy/);
			expect(p.title, p.path).toMatch(/NexaHubTech/);
		}
	});

	it("gives each business its own front page", () => {
		expect(modeForPath(PAGES.home.path)).toBe("build");
		expect(modeForPath(PAGES.academy.path)).toBe("learn");
		expect(PAGES.academy.title.startsWith(ARM_NAME.learn)).toBe(true);
		expect(PAGES.home.title.startsWith(ARM_NAME.build)).toBe(true);
	});
});
