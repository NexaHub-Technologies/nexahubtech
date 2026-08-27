/* Node 26 ships an experimental `localStorage` global that reads as `undefined`
   unless the process was started with --localstorage-file. Vitest's jsdom
   environment copies jsdom's globals onto the existing global object but skips any
   key that is already defined there — so Node's broken one wins and jsdom's real
   Storage never lands. Every test touching localStorage then dies on
   "Cannot read properties of undefined".

   Hand the real implementation back. jsdom refuses Storage on an opaque origin, so
   the instance we borrow it from needs a URL, same as the one vitest builds. */
import { JSDOM } from "jsdom";

if (typeof document !== "undefined" && !globalThis.localStorage) {
	const { window } = new JSDOM("", { url: "http://localhost:3000/" });
	for (const key of ["localStorage", "sessionStorage"] as const) {
		Object.defineProperty(globalThis, key, {
			value: window[key],
			configurable: true,
			writable: true,
		});
	}
}
