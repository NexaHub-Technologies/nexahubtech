interface CourseIconProps {
	slug: string;
	className?: string;
	filled?: boolean;
}

export function CourseIcon({
	slug,
	className = "w-full h-full",
	filled = false,
}: CourseIconProps) {
	const fillClass = filled
		? "fill-[var(--accent-tint)] stroke-[var(--accent)]"
		: "fill-transparent stroke-current group-hover:fill-[var(--accent-tint)] group-hover:stroke-[var(--accent)]";

	switch (slug) {
		case "computer-essentials":
		case "pc-basics":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Monitor frame */}
					<rect x="6" y="8" width="36" height="24" rx="3" strokeWidth="2" />
					{/* Screen inner / wallpaper bar */}
					<line x1="6" y1="26" x2="42" y2="26" strokeWidth="1.5" />
					<rect
						x="10"
						y="12"
						width="10"
						height="6"
						rx="1.5"
						strokeWidth="1.5"
					/>
					{/* Stand */}
					<path d="M24 32v6M16 38h16" strokeWidth="2" strokeLinecap="round" />
					{/* Mouse */}
					<rect x="36" y="36" width="6" height="4" rx="1.5" strokeWidth="1.5" />
				</svg>
			);

		case "office-essentials":
		case "microsoft-office":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Back sheet / Presentation */}
					<rect
						x="14"
						y="6"
						width="26"
						height="30"
						rx="2"
						strokeWidth="1.5"
						strokeDasharray="3 3"
					/>
					{/* Front sheet / Document */}
					<rect x="8" y="12" width="26" height="30" rx="2" strokeWidth="2" />
					{/* Spreadsheet grid lines */}
					<line x1="8" y1="20" x2="34" y2="20" strokeWidth="1.5" />
					<line x1="8" y1="28" x2="34" y2="28" strokeWidth="1.5" />
					<line x1="18" y1="20" x2="18" y2="42" strokeWidth="1.5" />
					{/* Document header lines */}
					<line
						x1="13"
						y1="16"
						x2="29"
						y2="16"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			);

		case "ai-for-office-use":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Main Sparkle */}
					<path
						d="M24 6c0 8-6 14-14 14 8 0 14 6 14 14 0-8 6-14 14-14-8 0-14-6-14-14z"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
					{/* Secondary Sparkle */}
					<path
						d="M37 28c0 4-3 7-7 7 4 0 7 3 7 7 0-4 3-7 7-7-4 0-7-3-7-7z"
						strokeWidth="1.75"
						strokeLinejoin="round"
					/>
					{/* Small Sparkle */}
					<circle cx="12" cy="38" r="2.5" strokeWidth="1.5" />
				</svg>
			);

		case "python-programming":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Python Top Half */}
					<path
						d="M23.5 6C15 6 15 10 15 10v4h9v2H10s-4 0-4 8 3 8 3 8h3v-4s0-4 4-4h9s4 0 4-4V10s0-4-5.5-4z"
						strokeWidth="2"
					/>
					<circle cx="19" cy="10" r="1.5" fill="currentColor" />
					{/* Python Bottom Half */}
					<path
						d="M24.5 42c8.5 0 8.5-4 8.5-4v-4h-9v-2h14s4 0 4-8-3-8-3-8h-3v4s0 4-4 4h-9s-4 0-4 4v6s0 4 5.5 4z"
						strokeWidth="2"
					/>
					<circle cx="29" cy="38" r="1.5" fill="currentColor" />
				</svg>
			);

		case "web-development-fullstack":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Browser Window */}
					<rect x="6" y="8" width="36" height="26" rx="3" strokeWidth="2" />
					<line x1="6" y1="16" x2="42" y2="16" strokeWidth="1.5" />
					<circle cx="11" cy="12" r="1.5" fill="currentColor" />
					<circle cx="16" cy="12" r="1.5" fill="currentColor" />
					{/* Code brackets inside */}
					<path
						d="M16 26l-4-4 4-4M22 26l4-4-4-4M32 38l6-6-6-6"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					{/* Underlying Stack Layer */}
					<path d="M12 38h24" strokeWidth="2" strokeLinecap="round" />
					<path d="M16 42h16" strokeWidth="2" strokeLinecap="round" />
				</svg>
			);

		case "frontend-development":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Desktop layout frame */}
					<rect x="6" y="8" width="36" height="28" rx="2.5" strokeWidth="2" />
					<line x1="6" y1="16" x2="42" y2="16" strokeWidth="1.5" />
					<line x1="18" y1="16" x2="18" y2="36" strokeWidth="1.5" />
					{/* Wireframe components */}
					<rect x="22" y="20" width="16" height="5" rx="1" strokeWidth="1.5" />
					<rect x="22" y="28" width="16" height="4" rx="1" strokeWidth="1.5" />
					{/* Stand */}
					<path d="M18 40h12" strokeWidth="2" strokeLinecap="round" />
					<path d="M24 36v4" strokeWidth="2" />
				</svg>
			);

		case "backend-development":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Server Unit 1 */}
					<rect x="8" y="8" width="32" height="12" rx="2" strokeWidth="2" />
					<circle cx="14" cy="14" r="1.5" fill="currentColor" />
					<circle cx="19" cy="14" r="1.5" fill="currentColor" />
					<line
						x1="28"
						y1="14"
						x2="34"
						y2="14"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					{/* Server Unit 2 */}
					<rect x="8" y="24" width="32" height="12" rx="2" strokeWidth="2" />
					<circle cx="14" cy="30" r="1.5" fill="currentColor" />
					<circle cx="19" cy="30" r="1.5" fill="currentColor" />
					<line
						x1="28"
						y1="30"
						x2="34"
						y2="30"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					{/* Network connector */}
					<path
						d="M24 20v4M24 36v4M16 40h16"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			);

		case "javascript-programming":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* JS Badge Frame */}
					<rect x="8" y="8" width="32" height="32" rx="4" strokeWidth="2" />
					{/* Curly braces */}
					<path
						d="M19 16c-2 0-3 1.5-3 3.5v2c0 1.5-1 2.5-2 2.5 1 0 2 1 2 2.5v2c0 2 1 3.5 3 3.5M29 16c2 0 3 1.5 3 3.5v2c0 1.5 1 2.5 2 2.5-1 0-2 1-2 2.5v2c0 2-1 3.5-3 3.5"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
				</svg>
			);

		case "react-development":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Nucleus */}
					<circle cx="24" cy="24" r="3.5" fill="currentColor" />
					{/* Orbits */}
					<ellipse cx="24" cy="24" rx="19" ry="7.5" strokeWidth="2" />
					<ellipse
						cx="24"
						cy="24"
						rx="19"
						ry="7.5"
						transform="rotate(60 24 24)"
						strokeWidth="2"
					/>
					<ellipse
						cx="24"
						cy="24"
						rx="19"
						ry="7.5"
						transform="rotate(120 24 24)"
						strokeWidth="2"
					/>
				</svg>
			);

		case "nextjs-fullstack":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Circle badge */}
					<circle cx="24" cy="24" r="18" strokeWidth="2" />
					{/* Stylized N and arrow */}
					<path
						d="M17 15v18M17 16l14 18M31 15v9"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);

		case "data-analysis":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Chart axes */}
					<path
						d="M8 8v30a2 2 0 0 0 2 2h30"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					{/* Bars */}
					<rect x="14" y="24" width="5" height="12" rx="1" strokeWidth="1.5" />
					<rect x="23" y="16" width="5" height="20" rx="1" strokeWidth="1.5" />
					<rect x="32" y="10" width="5" height="26" rx="1" strokeWidth="1.5" />
					{/* Trend Line with points */}
					<path d="M16 22l8-7 9-4" strokeWidth="2" strokeLinecap="round" />
					<circle cx="16" cy="22" r="1.5" fill="currentColor" />
					<circle cx="24" cy="15" r="1.5" fill="currentColor" />
					<circle cx="33" cy="11" r="1.5" fill="currentColor" />
				</svg>
			);

		case "mobile-development":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Phone Body */}
					<rect x="13" y="6" width="22" height="36" rx="4" strokeWidth="2" />
					{/* Speaker / Camera */}
					<line
						x1="21"
						y1="10"
						x2="27"
						y2="10"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					{/* Home Indicator / Touch point */}
					<circle cx="24" cy="37" r="1.5" fill="currentColor" />
					{/* Screen UI cards */}
					<rect
						x="17"
						y="15"
						width="14"
						height="6"
						rx="1.5"
						strokeWidth="1.5"
					/>
					<rect x="17" y="24" width="6" height="6" rx="1.5" strokeWidth="1.5" />
					<rect x="25" y="24" width="6" height="6" rx="1.5" strokeWidth="1.5" />
				</svg>
			);

		case "videography-video-editing":
		case "mobile-videography":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Camera body */}
					<rect x="6" y="14" width="24" height="22" rx="3" strokeWidth="2" />
					{/* Camera lens funnel */}
					<path
						d="M30 20l12-6v20l-12-6v-8z"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
					{/* Film reel rolls */}
					<circle cx="13" cy="10" r="3.5" strokeWidth="1.75" />
					<circle cx="23" cy="10" r="3.5" strokeWidth="1.75" />
					{/* Record indicator */}
					<circle cx="12" cy="20" r="1.5" fill="currentColor" />
				</svg>
			);

		case "cybersecurity":
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					{/* Shield */}
					<path
						d="M24 6l14 5v11c0 10-6 17-14 20-8-3-14-10-14-20V11l14-5z"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
					{/* Padlock keyhole */}
					<circle cx="24" cy="22" r="3" strokeWidth="1.5" />
					<path d="M24 25v5" strokeWidth="2" strokeLinecap="round" />
				</svg>
			);

		default:
			return (
				<svg
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${className} ${fillClass} transition-all duration-300`}
					aria-hidden="true"
				>
					<circle cx="24" cy="24" r="18" strokeWidth="2" />
					<path
						d="M18 24l4 4 8-8"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
	}
}
