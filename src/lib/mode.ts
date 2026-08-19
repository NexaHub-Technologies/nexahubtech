/* which arm of the company the visitor is currently looking at. The mode sets the
   frame — chrome accent, emphasis, and which side leads on the shared pages — while
   every page stays reachable from both. */

export type SiteMode = "learn" | "build";

export const MODE_STORAGE_KEY = "nht-mode";
export const DEFAULT_MODE: SiteMode = "learn";

export function isSiteMode(value: unknown): value is SiteMode {
	return value === "learn" || value === "build";
}

/* routes that belong to one arm set the mode on arrival. Shared routes return null
   so they never override a choice the visitor made deliberately. */
export function modeForPath(pathname: string): SiteMode | null {
	if (pathname === "/courses" || pathname.startsWith("/courses/"))
		return "learn";
	if (pathname === "/services" || pathname.startsWith("/services/"))
		return "build";
	return null;
}

function readCookie(): SiteMode | null {
	if (typeof document === "undefined") return null;
	for (const part of document.cookie.split(";")) {
		const [k, v] = part.split("=");
		if (k?.trim() === MODE_STORAGE_KEY && isSiteMode(v?.trim())) {
			return v.trim() as SiteMode;
		}
	}
	return null;
}

/* the cookie wins: it is what the no-flash script in the document head reads, so
   preferring it here keeps React's first render agreeing with the painted page */
export function readStoredMode(): SiteMode | null {
	const fromCookie = readCookie();
	if (fromCookie) return fromCookie;
	try {
		const stored = localStorage.getItem(MODE_STORAGE_KEY);
		return isSiteMode(stored) ? stored : null;
	} catch {
		return null;
	}
}

export function persistMode(mode: SiteMode): void {
	if (typeof document === "undefined") return;
	/* The Cookie Store API that Biome prefers is async, and is not supported across all
	   target browsers. This cookie must land synchronously so MODE_INIT_SCRIPT can read
	   it on the very next paint. */
	// biome-ignore lint/suspicious/noDocumentCookie: must be written synchronously
	document.cookie = `${MODE_STORAGE_KEY}=${mode};path=/;max-age=31536000;samesite=lax`;
	try {
		localStorage.setItem(MODE_STORAGE_KEY, mode);
	} catch {
		/* private mode or storage disabled — the cookie is enough */
	}
}

/* stamped on <html> so the whole token layer can respond without prop-drilling */
export function applyModeAttribute(mode: SiteMode): void {
	if (typeof document === "undefined") return;
	document.documentElement.dataset.mode = mode;
}

/* runs before first paint, inlined into <head>. Kept tiny and dependency-free —
   it is render-blocking on purpose, to stop /contact flashing the wrong mode. */
export const MODE_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)${MODE_STORAGE_KEY}=(learn|build)/);document.documentElement.dataset.mode=m?m[1]:(localStorage.getItem("${MODE_STORAGE_KEY}")==="build"?"build":"${DEFAULT_MODE}")}catch(e){document.documentElement.dataset.mode="${DEFAULT_MODE}"}})()`;
