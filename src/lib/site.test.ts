import { describe, expect, it } from "vitest";
import { brandFor, inAcademy } from "./site";

describe("the Academy section", () => {
	it("owns its routes and everything below them", () => {
		for (const p of [
			"/academy",
			"/courses",
			"/courses/frontend-development",
			"/fees",
			"/cbt",
			"/enrol",
			"/for-business",
		])
			expect(inAcademy(p), p).toBe(true);
	});

	it("does not own the company's pages, or lookalike siblings", () => {
		for (const p of [
			"/",
			"/services",
			"/work",
			"/approach",
			"/about",
			"/contact",
			"/coursework",
			"/academy-news",
		])
			expect(inAcademy(p), p).toBe(false);
	});

	it("publishes Academy pages under the Academy's name", () => {
		expect(brandFor("/courses")).toBe("NexaHubTech Academy");
		expect(brandFor("/about")).toBe("NexaHubTech");
	});
});
