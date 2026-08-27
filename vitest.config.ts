import { defineConfig } from "vitest/config";

/* The app's vite.config.ts loads the full TanStack Start / Nitro / Tailwind plugin
   stack. The unit tests don't need any of it — they exercise plain TypeScript
   modules — and loading it drags React's CommonJS entry through Vite's ESM
   evaluator, which logs `ReferenceError: module is not defined` on every run.
   So the test runner gets a config of its own.

   Files that need a DOM opt in with a `@vitest-environment jsdom` docblock. */
export default defineConfig({
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
		setupFiles: ["./src/test-setup.ts"],
		environmentOptions: {
			/* jsdom defaults the document to about:blank, which is an opaque origin —
			   and it refuses both localStorage and real cookie behaviour there
			   ("SecurityError: localStorage is not available for opaque origins").
			   Giving it an origin is what makes the storage tests meaningful. */
			jsdom: { url: "http://localhost:3000/" },
		},
	},
});
