import { defineConfig, devices } from "@playwright/test";

/* End-to-end tests run against a production build, in a desktop and a phone
   viewport — most visitors arrive on a phone. Unit tests stay in vitest
   (src/**\/*.test.ts); the specs here live in e2e/ so neither runner picks
   up the other's files. */
export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? "github" : "list",
	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
	},
	/* the installed Google Chrome rather than Playwright's own download, so
	   there is no browser to fetch first — GitHub's Ubuntu runners ship it too */
	projects: [
		{
			name: "desktop",
			use: { ...devices["Desktop Chrome"], channel: "chrome" },
		},
		{ name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
	],
	/* a production build, not the dev server: Vite's dev server compiles each
	   route on its first request, and with several browsers waiting on a cold
	   start, page loads timed out. A build takes seconds and is what visitors
	   actually get. */
	webServer: {
		command: "bun run build && bun run preview --port 3000",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
