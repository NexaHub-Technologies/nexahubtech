/* cookie + localStorage need a DOM; jsdom is already a devDependency */
// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import {
	ARM_HOME,
	DEFAULT_MODE,
	destinationForModeSwitch,
	isSiteMode,
	MODE_INIT_SCRIPT,
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
	it("claims the Academy's routes for learn", () => {
		expect(modeForPath("/academy")).toBe("learn");
		expect(modeForPath("/courses")).toBe("learn");
		expect(modeForPath("/courses/frontend-development")).toBe("learn");
		expect(modeForPath("/enrol")).toBe("learn");
		expect(modeForPath("/teaching")).toBe("learn");
		expect(modeForPath("/cbt")).toBe("learn");
		expect(modeForPath("/cbt-training")).toBe("learn");
		expect(modeForPath("/fees")).toBe("learn");
		expect(modeForPath("/timetable")).toBe("learn");
		expect(modeForPath("/centre")).toBe("learn");
		expect(modeForPath("/for-business")).toBe("learn");
	});

	/* the domain's front page is the software company's, not a shared page */
	it("claims the front page and the studio routes for build", () => {
		expect(modeForPath("/")).toBe("build");
		expect(modeForPath("/services")).toBe("build");
		expect(modeForPath("/services/digital-solutions")).toBe("build");
		expect(modeForPath("/approach")).toBe("build");
		expect(modeForPath("/work")).toBe("build");
	});

	it("leaves shared routes alone so an explicit choice survives", () => {
		for (const p of ["/about", "/contact"]) {
			expect(modeForPath(p)).toBeNull();
		}
	});

	it("does not match routes that merely start with the same letters", () => {
		expect(modeForPath("/coursework")).toBeNull();
		expect(modeForPath("/services-agreement")).toBeNull();
		expect(modeForPath("/academy-awards")).toBeNull();
	});
});

describe("destinationForModeSwitch", () => {
	/* the bug this exists to stop: switching to learn on /services rebuilt the nav
	   around the school while leaving a studio page on screen */
	it("moves you off a page owned by the arm you are leaving", () => {
		for (const p of [
			"/",
			"/services",
			"/services/digital-solutions",
			"/approach",
		]) {
			expect(destinationForModeSwitch(p, "learn")).toBe(ARM_HOME.learn);
		}
		for (const p of [
			"/academy",
			"/courses",
			"/courses/react-development",
			"/teaching",
			"/cbt",
			"/cbt-training",
		]) {
			expect(destinationForModeSwitch(p, "build")).toBe(ARM_HOME.build);
		}
	});

	it("stays put when the page already belongs to the arm you chose", () => {
		expect(destinationForModeSwitch("/services", "build")).toBeNull();
		expect(destinationForModeSwitch("/courses", "learn")).toBeNull();
		expect(destinationForModeSwitch("/cbt", "learn")).toBeNull();
		expect(destinationForModeSwitch("/cbt-training", "learn")).toBeNull();
	});

	it("leaves shared pages alone — they belong to both arms", () => {
		for (const p of ["/about", "/contact"]) {
			expect(destinationForModeSwitch(p, "learn")).toBeNull();
			expect(destinationForModeSwitch(p, "build")).toBeNull();
		}
	});

	it("lands on each arm's index, never deeper", () => {
		expect(ARM_HOME.learn).toBe("/academy");
		expect(ARM_HOME.build).toBe("/");
		expect(modeForPath(ARM_HOME.learn)).toBe("learn");
		expect(modeForPath(ARM_HOME.build)).toBe("build");
	});
});

/* The head script has to make the same call as modeForPath before React exists,
   or a page paints as one arm and then snaps to the other. */
describe("MODE_INIT_SCRIPT", () => {
	beforeEach(clearStores);

	const run = (path: string) => {
		window.history.replaceState(null, "", path);
		delete document.documentElement.dataset.mode;
		new Function(MODE_INIT_SCRIPT)();
		return document.documentElement.dataset.mode;
	};

	it("gives every owned route its own arm, whatever was stored", () => {
		persistMode("learn");
		for (const p of ["/", "/services", "/approach", "/work"])
			expect(run(p), p).toBe("build");
		persistMode("build");
		for (const p of ["/academy", "/courses/pc-basics", "/fees", "/cbt"])
			expect(run(p), p).toBe("learn");
	});

	it("lets a shared page keep the visitor's choice", () => {
		persistMode("learn");
		expect(run("/about")).toBe("learn");
		persistMode("build");
		expect(run("/contact")).toBe("build");
	});

	it("falls back to the company on a shared page with nothing stored", () => {
		expect(run("/about")).toBe(DEFAULT_MODE);
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

	/* the other cases here would pass vacuously if localStorage were unavailable —
	   readStoredMode swallows the failure and returns null either way. This one
	   only passes when storage genuinely works, so the environment cannot silently
	   break again. */
	it("falls back to localStorage when no cookie was written", () => {
		localStorage.setItem(MODE_STORAGE_KEY, "build");
		expect(document.cookie).not.toContain(MODE_STORAGE_KEY);
		expect(readStoredMode()).toBe("build");
	});

	it("ignores a junk value rather than trusting it", () => {
		localStorage.setItem(MODE_STORAGE_KEY, "not-a-mode");
		expect(readStoredMode()).toBeNull();
	});

	/* the company leads; the Academy is one of its divisions */
	it("defaults to the company", () => {
		expect(DEFAULT_MODE).toBe("build");
	});
});
