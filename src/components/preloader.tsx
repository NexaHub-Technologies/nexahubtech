import { useEffect, useState } from "react";

/* The brand mark taken apart, in its own 1257-unit square: four corner
   brackets, the two bars between them, and the centre square. Drawn from
   public/logo-main.svg with its transforms folded in, so each piece can be
   animated on its own. */
const PIECES = [
	{ id: "tl", d: "M0,0H385.6V100H100V578.4H0Z" },
	{ id: "tr", d: "M1256.8,3.6V582H1156.8V103.6H871.2V3.6Z" },
	{ id: "br", d: "M1256.8,1253.2H871.2V1153.2H1156.8V674.8H1256.8Z" },
	{ id: "bl", d: "M100,678.4V1156.8H385.6V1256.8H0V678.4Z" },
	{ id: "top", d: "M485.6,0H771.2V100H485.6Z" },
	{ id: "bottom", d: "M485.6,1156.8H771.2V1256.8H485.6Z" },
] as const;

const WORD = "NexaHubTech";

/* it stays at least this long after navigation began, so the mark finishes
   assembling instead of flashing; and never longer than the cap, however
   slow the network, because the page underneath is already readable */
const MIN_MS = 1100;
const MAX_MS = 4000;

/* The first-load screen: the mark assembles, the name rises under it, and
   the whole thing lifts away once the fonts and the page are ready. It is in
   the server's HTML, so it covers the first paint before any JavaScript
   runs, and it only ever shows on a full page load: client navigations never
   re-mount the document shell.

   It never takes clicks (pointer-events: none) and is hidden from assistive
   tech, because the real page is underneath it the whole time. Without
   JavaScript a <noscript> style hides it, and if the script fails a CSS
   failsafe fades it out on its own. */
export function Preloader() {
	const [phase, setPhase] = useState<"show" | "leaving" | "gone">("show");

	useEffect(() => {
		let cancelled = false;
		const loaded = new Promise<void>((resolve) => {
			if (document.readyState === "complete") resolve();
			else window.addEventListener("load", () => resolve(), { once: true });
		});
		const minimum = new Promise<void>((resolve) =>
			setTimeout(resolve, Math.max(0, MIN_MS - performance.now())),
		);
		const cap = new Promise<void>((resolve) =>
			setTimeout(resolve, Math.max(0, MAX_MS - performance.now())),
		);
		Promise.race([
			Promise.all([loaded, document.fonts.ready, minimum]),
			cap,
		]).then(() => {
			if (!cancelled) setPhase("leaving");
		});
		return () => {
			cancelled = true;
		};
	}, []);

	if (phase === "gone") return null;

	return (
		<div
			className="preloader"
			data-phase={phase}
			aria-hidden="true"
			onAnimationEnd={(e) => {
				if (e.target === e.currentTarget && phase === "leaving") {
					setPhase("gone");
				}
			}}
		>
			<noscript>
				<style>{".preloader{display:none}"}</style>
			</noscript>
			<div className="preloader-glow" />
			<div className="preloader-inner">
				<svg
					className="preloader-mark"
					viewBox="-80 -80 1417 1417"
					role="presentation"
				>
					<defs>
						<linearGradient id="preloader-hot" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0" stopColor="#f06ba8" />
							<stop offset="0.55" stopColor="#ff9a62" />
							<stop offset="1" stopColor="#ffd25a" />
						</linearGradient>
					</defs>
					{PIECES.map((p) => (
						<path key={p.id} className={`pl-piece pl-${p.id}`} d={p.d} />
					))}
					<path
						className="pl-core"
						d="M192.8,192.8H1064V1064H192.8Z"
						fill="url(#preloader-hot)"
					/>
				</svg>
				<p className="preloader-word">
					{[...WORD].map((ch, i) => (
						<span
							// the letters never reorder
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed string
							key={i}
							style={{ animationDelay: `${0.55 + i * 0.035}s` }}
						>
							{ch}
						</span>
					))}
				</p>
				<span className="preloader-bar" />
			</div>
		</div>
	);
}
