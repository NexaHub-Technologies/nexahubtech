import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "light";
	try {
		const stored = localStorage.getItem("theme");
		if (stored === "dark" || stored === "light") return stored;
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
	} catch {
		/* localStorage or matchMedia unavailable */
	}
	return "light";
}

export function applyTheme(theme: Theme) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (theme === "dark") {
		root.classList.add("dark");
	} else {
		root.classList.remove("dark");
	}
	try {
		localStorage.setItem("theme", theme);
	} catch {
		/* localStorage unavailable */
	}
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const initial = getInitialTheme();
		setThemeState(initial);
		applyTheme(initial);
		setMounted(true);

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const listener = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem("theme")) {
				const next = e.matches ? "dark" : "light";
				setThemeState(next);
				applyTheme(next);
			}
		};
		media.addEventListener("change", listener);
		return () => media.removeEventListener("change", listener);
	}, []);

	const toggleTheme = () => {
		const next: Theme = theme === "dark" ? "light" : "dark";
		setThemeState(next);
		applyTheme(next);
	};

	const setTheme = (next: Theme) => {
		setThemeState(next);
		applyTheme(next);
	};

	return { theme, toggleTheme, setTheme, mounted };
}
