/* which arm of NexaHubTech the visitor is looking at. NexaHubTech is a
   software company with two arms: its software studio ("build"), which carries
   the company's own name, and NexaHubTech Academy ("learn"). Every page belongs to
   one of them, except /about and /contact, which describe both and take the
   frame of whichever the visitor came from. */

export type SiteMode = "learn" | "build";

export const MODE_STORAGE_KEY = "nht-mode";
/* the studio leads: a first-time visitor to the domain meets the software company's studio */
export const DEFAULT_MODE: SiteMode = "build";

export const ARM_NAME: Record<SiteMode, string> = {
	build: "NexaHubTech",
	learn: "NexaHubTech Academy",
};

/* what the switch calls each arm */
export const ARM_LABEL: Record<SiteMode, string> = {
	build: "Studio",
	learn: "Academy",
};

export function isSiteMode(value: unknown): value is SiteMode {
	return value === "learn" || value === "build";
}

/* Which arm owns which routes. A route owns itself and everything beneath it,
   never a sibling that merely starts with the same letters. Kept as plain data
   so the inline head script can apply the same rule before first paint. */
export const ARM_ROUTES: Record<SiteMode, readonly string[]> = {
	learn: [
		"/academy",
		"/courses",
		"/enrol",
		"/teaching",
		"/fees",
		"/timetable",
		"/centre",
		"/for-business",
		"/cbt",
		"/cbt-training",
	],
	build: ["/services", "/approach", "/work"],
};

const owns = (root: string, pathname: string) =>
	pathname === root || pathname.startsWith(`${root}/`);

/* routes that belong to one arm set the mode on arrival. Shared routes return null
   so they never override a choice the visitor made deliberately. */
export function modeForPath(pathname: string): SiteMode | null {
	/* the domain's front page is the studio's */
	if (pathname === "/") return "build";
	for (const mode of ["learn", "build"] as const) {
		if (ARM_ROUTES[mode].some((root) => owns(root, pathname))) return mode;
	}
	return null;
}

/* where each arm begins. Switching arms lands here, and nowhere deeper — the
   visitor asked for the other side of the company, not for a specific page. */
export const ARM_HOME = {
	learn: "/academy",
	build: "/",
} as const;

/* Switching arms while standing on a page owned by the arm you are leaving would
   strand you: the nav rebuilds around the other side and disowns the page still
   on screen. So that case navigates. Shared routes return null — they belong to
   both arms, so the frame changes and the visitor stays where they were. */
export function destinationForModeSwitch(
	pathname: string,
	next: SiteMode,
): (typeof ARM_HOME)[SiteMode] | null {
	const owner = modeForPath(pathname);
	return owner && owner !== next ? ARM_HOME[next] : null;
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
   it is render-blocking on purpose, to stop a page flashing the wrong arm. A page
   that belongs to an arm takes that arm; a shared page takes the stored choice. */
export const MODE_INIT_SCRIPT = `(function(){try{var p=location.pathname,r=${JSON.stringify(ARM_ROUTES)},m=p==="/"?"build":null;for(var k in r)for(var i=0;i<r[k].length;i++){var x=r[k][i];if(p===x||p.indexOf(x+"/")===0)m=k}if(!m){var c=document.cookie.match(/(?:^|;\\s*)${MODE_STORAGE_KEY}=(learn|build)/);m=c?c[1]:(localStorage.getItem("${MODE_STORAGE_KEY}")==="learn"?"learn":"${DEFAULT_MODE}")}document.documentElement.dataset.mode=m}catch(e){document.documentElement.dataset.mode="${DEFAULT_MODE}"}})()`;
