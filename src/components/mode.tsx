import { useRouter, useRouterState } from "@tanstack/react-router";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useSyncExternalStore,
} from "react";
import {
	applyModeAttribute,
	DEFAULT_MODE,
	destinationForModeSwitch,
	modeForPath,
	persistMode,
	readStoredMode,
	type SiteMode,
} from "../lib/mode";

/* A tiny external store rather than useState: /contact is server-rendered, so React's
   first client render must agree with the server's. useSyncExternalStore lets us hand
   the server DEFAULT_MODE while the client reads what was actually stored — no
   hydration mismatch, and no flash, because the inline head script already painted
   the right mode. */
let current: SiteMode | null = null;
const listeners = new Set<() => void>();

function subscribe(fn: () => void) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}

function getSnapshot(): SiteMode {
	if (current === null) current = readStoredMode() ?? DEFAULT_MODE;
	return current;
}

function getServerSnapshot(): SiteMode {
	return DEFAULT_MODE;
}

function setMode(mode: SiteMode) {
	if (current === mode) return;
	current = mode;
	applyModeAttribute(mode);
	persistMode(mode);
	for (const fn of listeners) fn();
}

interface ModeContextValue {
	mode: SiteMode;
	setMode: (mode: SiteMode) => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
	const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const router = useRouter();

	/* arriving on a route that belongs to one arm switches to it; shared routes
	   return null and leave the visitor's own choice intact */
	useEffect(() => {
		const routeMode = modeForPath(pathname);
		if (routeMode) setMode(routeMode);
	}, [pathname]);

	/* keep the attribute in step if the head script never ran */
	useEffect(() => {
		applyModeAttribute(mode);
	}, [mode]);

	/* choosing an arm is a request to see that arm, not just to restyle the page
	   you are on — so if the current page belongs to the arm being left behind,
	   follow the choice through instead of leaving the visitor on a page the new
	   nav no longer lists */
	const update = useCallback(
		(next: SiteMode) => {
			setMode(next);
			const to = destinationForModeSwitch(pathname, next);
			if (to) router.navigate({ to });
		},
		[pathname, router],
	);

	return (
		<ModeContext.Provider value={{ mode, setMode: update }}>
			{children}
		</ModeContext.Provider>
	);
}

export function useMode(): ModeContextValue {
	const ctx = useContext(ModeContext);
	if (!ctx) throw new Error("useMode must be used inside <ModeProvider>");
	return ctx;
}
