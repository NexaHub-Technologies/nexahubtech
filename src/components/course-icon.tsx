import { useId } from "react";
import type { Family } from "../lib/courses";

/* Course and track icons: a rounded tile in the track's colour with a bold,
   flat illustration on it. The tile colours come from the brand — the violet,
   and the rose → peach → yellow of the buttons — so a track reads at a glance:

     Digital skills    violet
     Software & data   rose → peach
     Video             peach → yellow

   The drawings use white, the brand's plum ink and its accents, never anyone's
   logo (no Python snakes, React atoms or JS squares). They are the same in
   light and dark mode: the tile carries its own colour. */

const TILES: Record<Family, [string, string]> = {
	digital: ["#5a22a6", "#a865ee"],
	development: ["#e5569a", "#ff9a62"],
	video: ["#ff8156", "#ffcd47"],
};

/* the colours drawn on top of the tile */
const W = "#ffffff";
const INK = "#2a0f3f";
const VIOLET = "#6a2cad";
const LILAC = "#ecdffb";
const PINK = "#f06ba8";
const YELLOW = "#ffd25a";

/* which track each course belongs to, for its tile colour */
const FAMILY_OF: Record<string, Family> = {
	"computer-essentials": "digital",
	"pc-basics": "digital",
	"office-essentials": "digital",
	"microsoft-office": "digital",
	"ai-for-office-use": "digital",
	"python-programming": "development",
	"javascript-programming": "development",
	"frontend-development": "development",
	"backend-development": "development",
	"web-development-fullstack": "development",
	"react-development": "development",
	"nextjs-fullstack": "development",
	"mobile-development": "development",
	"data-analysis": "development",
	cybersecurity: "development",
	"mobile-videography": "video",
	"videography-video-editing": "video",
};

/* a four-point sparkle */
function sparkle(cx: number, cy: number, r: number) {
	return `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;
}

/* a window's title bar with three dots */
function TitleBar({ x, y, w }: { x: number; y: number; w: number }) {
	return (
		<>
			<path
				d={`M${x} ${y + 4}a4 4 0 0 1 4-4h${w - 8}a4 4 0 0 1 4 4v3h-${w}z`}
				fill={INK}
			/>
			<circle cx={x + 4.5} cy={y + 3.6} r="1.3" fill={PINK} />
			<circle cx={x + 8.5} cy={y + 3.6} r="1.3" fill={YELLOW} />
			<circle cx={x + 12.5} cy={y + 3.6} r="1.3" fill={W} />
		</>
	);
}

const DRAWINGS: Record<string, () => React.ReactNode> = {
	/* a monitor showing a window and the pointer */
	"computer-essentials": () => (
		<>
			<rect x="11" y="13" width="42" height="29" rx="4" fill={W} />
			<rect x="14.5" y="16.5" width="35" height="22" rx="2" fill={INK} />
			<rect x="18" y="20" width="16" height="11" rx="1.5" fill={LILAC} />
			<rect x="18" y="20" width="16" height="3" rx="1.2" fill={YELLOW} />
			<rect x="20" y="26" width="8" height="2" rx="1" fill={VIOLET} />
			<path
				d="M37 25v10.5l2.6-2.4 2 4 1.9-.9-2-4 3.4-.3z"
				fill={W}
				stroke={INK}
				strokeWidth="0.8"
				strokeLinejoin="round"
			/>
			<path d="M28 42h8l1.4 5h-10.8z" fill={W} />
			<rect x="21" y="46.5" width="22" height="3.5" rx="1.75" fill={W} />
		</>
	),

	/* a spreadsheet in front of a document */
	"office-essentials": () => (
		<>
			<rect
				x="25"
				y="10"
				width="25"
				height="33"
				rx="3"
				fill={YELLOW}
				transform="rotate(8 37 26)"
			/>
			<rect x="14" y="15" width="28" height="37" rx="3" fill={W} />
			<rect x="18" y="20" width="20" height="5" rx="1.5" fill={VIOLET} />
			{[28, 34, 40].map((y) => (
				<g key={y}>
					<rect x="18" y={y} width="7" height="4" rx="1" fill={LILAC} />
					<rect x="27" y={y} width="11" height="4" rx="1" fill={LILAC} />
				</g>
			))}
			<rect x="27" y="40" width="11" height="4" rx="1" fill={PINK} />
			<rect x="18" y="46" width="12" height="2.4" rx="1.2" fill={LILAC} />
		</>
	),

	/* a document, and the sparkles of an assistant */
	"ai-for-office-use": () => (
		<>
			<rect x="12" y="14" width="27" height="37" rx="3" fill={W} />
			<rect x="16" y="20" width="15" height="3" rx="1.5" fill={VIOLET} />
			{[27, 32, 37, 42].map((y, i) => (
				<rect
					key={y}
					x="16"
					y={y}
					width={[19, 15, 18, 11][i]}
					height="2.6"
					rx="1.3"
					fill={LILAC}
				/>
			))}
			<path d={sparkle(44, 21, 9)} fill={YELLOW} />
			<path d={sparkle(49, 36, 5)} fill={W} />
			<path d={sparkle(40.5, 46, 3.5)} fill={PINK} />
		</>
	),

	/* a terminal with the >>> prompt */
	"python-programming": () => (
		<>
			<rect x="10" y="14" width="44" height="36" rx="4" fill={W} />
			<TitleBar x={10} y={14} w={44} />
			{[16, 22, 28].map((x) => (
				<path
					key={x}
					d={`M${x} 27l4.5 3.5-4.5 3.5`}
					stroke={VIOLET}
					strokeWidth="2.6"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				/>
			))}
			<rect x="36" y="28.5" width="11" height="3" rx="1.5" fill={PINK} />
			<rect x="16" y="39" width="22" height="3" rx="1.5" fill={LILAC} />
			<rect x="40" y="38" width="3" height="5" rx="1" fill={YELLOW} />
		</>
	),

	/* curly braces around an expression */
	"javascript-programming": () => (
		<>
			{[
				"M26 15c-4 0-5.5 2-5.5 6v5c0 3.3-1.5 5.3-4.5 6 3 .7 4.5 2.7 4.5 6v5c0 4 1.5 6 5.5 6",
				"M38 15c4 0 5.5 2 5.5 6v5c0 3.3 1.5 5.3 4.5 6-3 .7-4.5 2.7-4.5 6v5c0 4-1.5 6-5.5 6",
			].map((d) => (
				<path
					key={d}
					d={d}
					stroke={W}
					strokeWidth="5"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				/>
			))}
			<circle cx="27.5" cy="32" r="2.6" fill={YELLOW} />
			<circle cx="32" cy="32" r="2.6" fill={W} />
			<circle cx="36.5" cy="32" r="2.6" fill={INK} />
		</>
	),

	/* a browser window with a page layout */
	"frontend-development": () => (
		<>
			<rect x="9" y="13" width="46" height="38" rx="4" fill={W} />
			<TitleBar x={9} y={13} w={46} />
			<rect x="13.5" y="24.5" width="21" height="11" rx="2" fill={VIOLET} />
			<rect x="16.5" y="28" width="11" height="2.2" rx="1.1" fill={W} />
			<rect x="37.5" y="24.5" width="13" height="11" rx="2" fill={YELLOW} />
			<rect x="13.5" y="39" width="11" height="8" rx="1.6" fill={LILAC} />
			<rect x="26.5" y="39" width="11" height="8" rx="1.6" fill={LILAC} />
			<rect x="39.5" y="39" width="11" height="8" rx="1.6" fill={PINK} />
		</>
	),

	/* a rack of servers with status lights */
	"backend-development": () => (
		<>
			{[12, 25.5, 39].map((y, i) => (
				<g key={y}>
					<rect x="12" y={y} width="40" height="11" rx="3" fill={W} />
					<circle
						cx="18.5"
						cy={y + 5.5}
						r="2.2"
						fill={[YELLOW, PINK, VIOLET][i]}
					/>
					<circle cx="24.5" cy={y + 5.5} r="2.2" fill={LILAC} />
					<rect x="32" y={y + 3} width="15" height="2" rx="1" fill={LILAC} />
					<rect x="32" y={y + 6.5} width="10" height="2" rx="1" fill={LILAC} />
				</g>
			))}
		</>
	),

	/* a browser in front, its server behind */
	"web-development-fullstack": () => (
		<>
			<rect x="31" y="31" width="23" height="9" rx="2.5" fill={INK} />
			<rect x="31" y="42" width="23" height="9" rx="2.5" fill={INK} />
			<circle cx="36" cy="35.5" r="1.8" fill={YELLOW} />
			<circle cx="36" cy="46.5" r="1.8" fill={PINK} />
			<rect x="41" y="34.5" width="9" height="2" rx="1" fill={LILAC} />
			<rect x="41" y="45.5" width="9" height="2" rx="1" fill={LILAC} />
			<rect x="10" y="12" width="34" height="27" rx="4" fill={W} />
			<TitleBar x={10} y={12} w={34} />
			<rect x="14" y="23" width="15" height="9" rx="1.8" fill={VIOLET} />
			<rect x="31.5" y="23" width="8.5" height="9" rx="1.8" fill={YELLOW} />
		</>
	),

	/* a tree of components */
	"react-development": () => (
		<>
			<path
				d="M32 22v6M20 28h24M20 28v6M44 28v6"
				stroke={W}
				strokeWidth="2.6"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
			<rect
				x="23"
				y="11"
				width="18"
				height="12"
				rx="3.5"
				fill={VIOLET}
				stroke={W}
				strokeWidth="2"
			/>
			<rect x="11" y="33" width="18" height="11" rx="3" fill={W} />
			<rect x="35" y="33" width="18" height="11" rx="3" fill={W} />
			<rect x="14.5" y="37" width="11" height="3" rx="1.5" fill={LILAC} />
			<rect x="38.5" y="37" width="11" height="3" rx="1.5" fill={LILAC} />
			<rect x="15" y="47" width="10" height="7" rx="2" fill={YELLOW} />
			<rect x="39" y="47" width="10" height="7" rx="2" fill={INK} />
		</>
	),

	/* pages, routed */
	"nextjs-fullstack": () => (
		<>
			<rect x="24" y="9" width="28" height="32" rx="3" fill={YELLOW} />
			<rect x="18" y="15" width="28" height="32" rx="3" fill={LILAC} />
			<rect x="12" y="21" width="28" height="33" rx="3" fill={W} />
			<path
				d="M19 44l6-14"
				stroke={VIOLET}
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<path
				d="M28 37.5h6.5M31.5 34l3.5 3.5-3.5 3.5"
				stroke={PINK}
				strokeWidth="2.6"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</>
	),

	/* a phone with an app grid */
	"mobile-development": () => (
		<>
			<rect x="19" y="8" width="26" height="48" rx="6" fill={W} />
			<rect x="22.5" y="14" width="19" height="35" rx="2.5" fill={INK} />
			<rect x="28.5" y="10.4" width="7" height="1.8" rx="0.9" fill={LILAC} />
			{[
				[25, 17, VIOLET],
				[33.5, 17, YELLOW],
				[25, 25.5, PINK],
				[33.5, 25.5, W],
				[25, 34, W],
				[33.5, 34, VIOLET],
			].map(([x, y, c]) => (
				<rect
					key={`${x}-${y}`}
					x={x as number}
					y={y as number}
					width="6.5"
					height="6.5"
					rx="1.8"
					fill={c as string}
				/>
			))}
			<rect x="28" y="51.5" width="8" height="2" rx="1" fill={LILAC} />
		</>
	),

	/* a chart with bars and a trend */
	"data-analysis": () => (
		<>
			<rect x="10" y="12" width="44" height="40" rx="4" fill={W} />
			{[
				[16, 11],
				[24, 17],
				[32, 13],
				[40, 22],
			].map(([x, h]) => (
				<rect
					key={x}
					x={x}
					y={46 - h}
					width="6"
					height={h}
					rx="1.5"
					fill={VIOLET}
				/>
			))}
			<rect x="15" y="46" width="34" height="2" rx="1" fill={LILAC} />
			<path
				d="M17 30l8-6 8 3 9-9"
				stroke={PINK}
				strokeWidth="2.6"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
			<circle
				cx="42"
				cy="18"
				r="2.8"
				fill={YELLOW}
				stroke={INK}
				strokeWidth="1"
			/>
		</>
	),

	/* a phone recording */
	"mobile-videography": () => (
		<>
			<rect x="7" y="17" width="50" height="30" rx="7" fill={W} />
			<rect x="10.5" y="20.5" width="38" height="23" rx="2.5" fill={INK} />
			<path
				d="M10.5 38l8-7 6 5 6-4 10 8v1a2.5 2.5 0 0 1-2.5 2.5h-25a2.5 2.5 0 0 1-2.5-2.5z"
				fill={VIOLET}
			/>
			<circle cx="41" cy="27" r="3" fill={YELLOW} />
			<circle
				cx="16"
				cy="25.5"
				r="2.6"
				fill={PINK}
				stroke={W}
				strokeWidth="1"
			/>
			<circle
				cx="53"
				cy="32"
				r="3.2"
				fill={W}
				stroke={LILAC}
				strokeWidth="1.5"
			/>
			<circle cx="53" cy="32" r="1.3" fill={PINK} />
		</>
	),

	/* a video camera */
	"videography-video-editing": () => (
		<>
			<rect x="8" y="19" width="34" height="26" rx="5" fill={W} />
			<path d="M42 28.5l13-6.5v20l-13-6.5z" fill={W} />
			<circle cx="24" cy="32" r="8.5" fill={INK} />
			<circle cx="24" cy="32" r="4.5" fill={VIOLET} />
			<circle cx="22.2" cy="30.2" r="1.6" fill={W} />
			<circle cx="13.5" cy="24" r="2" fill={PINK} />
			<rect
				x="10"
				y="48"
				width="44"
				height="5"
				rx="2.5"
				fill={INK}
				opacity="0.35"
			/>
			<rect x="10" y="48" width="18" height="5" rx="2.5" fill={W} />
		</>
	),

	/* a shield and lock */
	cybersecurity: () => (
		<>
			<path
				d="M32 9l17 6v13c0 12-7.5 20-17 25-9.5-5-17-13-17-25V15z"
				fill={W}
			/>
			<path
				d="M32 15l11.5 4v9c0 8.5-5 14-11.5 17.5C25.5 42 20.5 36.5 20.5 28v-9z"
				fill={VIOLET}
			/>
			<rect x="26.5" y="29" width="11" height="9" rx="2" fill={YELLOW} />
			<path
				d="M28.8 29v-2.5a3.2 3.2 0 0 1 6.4 0V29"
				stroke={YELLOW}
				strokeWidth="2.2"
				fill="none"
			/>
		</>
	),

	/* a graduation cap, for anything without its own drawing */
	default: () => (
		<>
			<path d="M32 15l22 10-22 10-22-10z" fill={W} />
			<path
				d="M20 30v9c0 3.5 5.5 6.5 12 6.5s12-3 12-6.5v-9l-12 5.5z"
				fill={INK}
			/>
			<path
				d="M51 26.5v12"
				stroke={YELLOW}
				strokeWidth="2.4"
				strokeLinecap="round"
			/>
			<circle cx="51" cy="41" r="3" fill={YELLOW} />
		</>
	),
};

/* the same drawing under another course's name */
DRAWINGS["pc-basics"] = DRAWINGS["computer-essentials"];
DRAWINGS["microsoft-office"] = DRAWINGS["office-essentials"];

/* which drawing stands for a whole track */
const TRACK_DRAWING: Record<Family, string> = {
	digital: "computer-essentials",
	development: "javascript-programming",
	video: "videography-video-editing",
};

function Tile({
	family,
	drawing,
	className,
	title,
}: {
	family: Family;
	drawing: () => React.ReactNode;
	className: string;
	title?: string;
}) {
	/* ids must be unique per icon on the page (React's ids contain colons). The
	   track is part of the id too, so that even icons rendered in separate
	   React roots — where useId can repeat — never borrow another track's
	   colours. */
	const id = `nx-${family}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
	const [from, to] = TILES[family];
	return (
		<svg
			viewBox="0 0 64 64"
			xmlns="http://www.w3.org/2000/svg"
			className={`course-icon ${className}`}
			role={title ? "img" : undefined}
			aria-label={title}
			aria-hidden={title ? undefined : true}
		>
			<defs>
				<linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor={from} />
					<stop offset="1" stopColor={to} />
				</linearGradient>
				<linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#fff" stopOpacity="0.28" />
					<stop offset="0.55" stopColor="#fff" stopOpacity="0" />
				</linearGradient>
				<filter id={`${id}d`} x="-20%" y="-20%" width="140%" height="140%">
					<feDropShadow
						dx="0"
						dy="1.6"
						stdDeviation="1.3"
						floodColor="#2a0f3f"
						floodOpacity="0.3"
					/>
				</filter>
			</defs>
			<rect width="64" height="64" rx="16" fill={`url(#${id}t)`} />
			<rect width="64" height="64" rx="16" fill={`url(#${id}s)`} />
			<g filter={`url(#${id}d)`}>{drawing()}</g>
		</svg>
	);
}

export function CourseIcon({
	slug,
	className = "w-14 h-14",
}: {
	slug: string;
	className?: string;
	/* kept for older call sites; every icon is now in full colour */
	filled?: boolean;
}) {
	return (
		<Tile
			family={FAMILY_OF[slug] ?? "digital"}
			drawing={DRAWINGS[slug] ?? DRAWINGS.default}
			className={className}
		/>
	);
}

export function TrackIcon({
	track,
	className = "w-14 h-14",
}: {
	track: Family;
	className?: string;
}) {
	return (
		<Tile
			family={track}
			drawing={DRAWINGS[TRACK_DRAWING[track]]}
			className={className}
		/>
	);
}
