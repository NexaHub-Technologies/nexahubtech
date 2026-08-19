/* cookie + localStorage need a DOM; jsdom is already a devDependency */
// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import {
	DEFAULT_MODE,
	isSiteMode,
	MODE_STORAGE_KEY,
	modeForPath,
	persistMode,
	readStoredMode,
} from "./mode";

function clearStores() {
	for (const c of document.cookie.split(";")) {
		const k = c.split("=")[0]?.trim();
		// biome-ignore lint/suspicious/noDocumentCookie: clearing test fixtures
		if (k) document.cookie = `${k}=;path=/;max-age=0`;
	}
	localStorage.clear();
}

describe("modeForPath", () => {
	it("claims the school routes for learn", () => {
		expect(modeForPath("/courses")).toBe("learn");
		expect(modeForPath("/courses/frontend-development")).toBe("learn");
	});

	it("claims the studio routes for build", () => {
		expect(modeForPath("/services")).toBe("build");
		expect(modeForPath("/services/digital-solutions")).toBe("build");
	});

	it("leaves shared routes alone so an explicit choice survives", () => {
		for (const p of ["/", "/about", "/contact"]) {
			expect(modeForPath(p)).toBeNull();
		}
	});

	it("does not match routes that merely start with the same letters", () => {
		expect(modeForPath("/coursework")).toBeNull();
		expect(modeForPath("/services-agreement")).toBeNull();
	});
});

describe("isSiteMode", () => {
	it("accepts the two real modes", () => {
		expect(isSiteMode("learn")).toBe(true);
		expect(isSiteMode("build")).toBe(true);
	});

	it("rejects anything else, including a tampered cookie value", () => {
		for (const v of ["", "LEARN", "studio", null, undefined, 0, {}]) {
			expect(isSiteMode(v)).toBe(false);
		}
	});
});

describe("readStoredMode", () => {
	beforeEach(clearStores);

	it("returns null when nothing has been stored", () => {
		expect(readStoredMode()).toBeNull();
	});

	it("round-trips through persistMode", () => {
		persistMode("build");
		expect(readStoredMode()).toBe("build");
	});

	it("prefers the cookie, which is what the pre-paint script reads", () => {
		localStorage.setItem(MODE_STORAGE_KEY, "learn");
		// biome-ignore lint/suspicious/noDocumentCookie: seeding the case under test
		document.cookie = `${MODE_STORAGE_KEY}=build;path=/`;
		expect(readStoredMode()).toBe("build");
	});

	it("ignores a junk value rather than trusting it", () => {
		localStorage.setItem(MODE_STORAGE_KEY, "not-a-mode");
		expect(readStoredMode()).toBeNull();
	});

	it("defaults to learn", () => {
		expect(DEFAULT_MODE).toBe("learn");
	});
});
