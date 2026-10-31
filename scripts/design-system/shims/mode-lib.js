/* src/lib/mode with its storage swapped for the preview frame: the mode starts
   from the frame's theme, and switching it sets the theme, as data-mode does on
   the site. Nothing is persisted. */
export * from "REAL_MODE";

export function readStoredMode() {
	const theme = document.documentElement.getAttribute("data-theme");
	return theme === "learn" || theme === "build" ? theme : null;
}

export function persistMode() {}

export function applyModeAttribute(mode) {
	document.documentElement.setAttribute("data-theme", mode);
	document.documentElement.setAttribute("data-mode", mode);
}
