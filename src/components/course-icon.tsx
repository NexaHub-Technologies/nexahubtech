import type { Family } from "../lib/courses";
import { DOODLES, type DoodleName } from "../lib/doodles";

/* Course, track and studio icons, drawn with the NexaHubTech code doodles —
   the same outlined drawings as the Academy's background pattern — on a soft
   tinted square, in the accent colour. They follow light and dark mode
   through the accent tokens. */

/* which doodle stands for each course */
const COURSE_DOODLE: Record<string, DoodleName> = {
	"computer-essentials": "laptop",
	"pc-basics": "laptop",
	"office-essentials": "book",
	"microsoft-office": "book",
	"ai-for-office-use": "idea",
	"python-programming": "prompt",
	"javascript-programming": "braces",
	"frontend-development": "code-tag",
	"backend-development": "server",
	"web-development-fullstack": "network",
	"react-development": "cube",
	"nextjs-fullstack": "globe",
	"mobile-development": "phone",
	"data-analysis": "chart",
	"mobile-videography": "pipe",
	"videography-video-editing": "video",
	cybersecurity: "lock",
};

const TRACK_DOODLE: Record<Family, DoodleName> = {
	digital: "keyboard",
	development: "code",
	video: "video",
};

/* the bare drawing, for anywhere an outline icon is wanted */
export function Doodle({
	name,
	className = "w-8 h-8",
}: {
	name: DoodleName;
	className?: string;
}) {
	const p = DOODLES[name];
	return (
		<svg
			viewBox="0 0 128 128"
			className={className}
			aria-hidden="true"
			focusable="false"
		>
			<path
				transform={p.transform}
				d={p.d}
				fill="none"
				stroke="currentColor"
				strokeWidth={p.strokeWidth}
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/* a doodle on its tinted square */
export function DoodleTile({
	name,
	className = "w-14 h-14",
}: {
	name: DoodleName;
	className?: string;
}) {
	return (
		<span className={`doodle-tile ${className}`} aria-hidden="true">
			<Doodle name={name} className="doodle-tile-art" />
		</span>
	);
}

export function CourseIcon({
	slug,
	className = "w-14 h-14",
}: {
	slug: string;
	className?: string;
}) {
	return (
		<DoodleTile
			name={COURSE_DOODLE[slug] ?? "graduate"}
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
	return <DoodleTile name={TRACK_DOODLE[track]} className={className} />;
}
