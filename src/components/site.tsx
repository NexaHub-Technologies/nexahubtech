import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT, MOTTO, TAGLINE } from "../lib/contact";
import { inAcademy } from "../lib/site";
import { useTheme } from "../lib/theme";

export { CONTACT, MOTTO };

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggleTheme, mounted } = useTheme();
	const isDark = mounted && theme === "dark";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={`theme-toggle ${className ?? ""}`}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			title={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDark ? (
				<Sun className="w-[18px] h-[18px]" aria-hidden="true" />
			) : (
				<Moon className="w-[18px] h-[18px]" aria-hidden="true" />
			)}
		</button>
	);
}

/* The site's chrome: one header and one footer for the whole site. The
   Academy is a section of the site, reached from the main navigation; on its
   pages a second row lists the Academy's own pages. */

export function Logo({
	height = 26,
	wordmark = "1.12rem",
}: {
	height?: number;
	wordmark?: string;
}) {
	return (
		<span className="flex items-center gap-2.5">
			<img
				src="/logo-main.svg"
				alt=""
				height={height}
				style={{ height, width: "auto" }}
				className="site-logo"
			/>
			<span className="display site-wordmark" style={{ fontSize: wordmark }}>
				NexaHubTech
			</span>
		</span>
	);
}

/* the main navigation — the same on every page */
export const NAV = [
	{ to: "/services", label: "Services" },
	{ to: "/work", label: "Work" },
	{ to: "/approach", label: "Approach" },
	{ to: "/academy", label: "Academy", section: true },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
] as const satisfies readonly {
	to: string;
	label: string;
	/* the Academy link stays active across the whole section */
	section?: boolean;
}[];

/* the Academy's own pages, shown as a second row inside the section */
export const ACADEMY_NAV = [
	{ to: "/academy", label: "Overview", exact: true },
	{ to: "/courses", label: "Courses" },
	{ to: "/fees", label: "Pricing" },
	{ to: "/cbt", label: "CBT prep" },
	{ to: "/for-business", label: "Organisations" },
] as const satisfies readonly { to: string; label: string; exact?: boolean }[];

function XIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="15"
			height="15"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
		</svg>
	);
}

function InstagramIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			aria-hidden="true"
		>
			<rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
			<circle cx="12" cy="12" r="4.2" />
			<circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
		</svg>
	);
}

function TikTokIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="15"
			height="15"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
		</svg>
	);
}

export const SOCIALS = [
	{ label: "X", href: "https://x.com/nexahubtech", icon: XIcon },
	{
		label: "Instagram",
		href: "https://www.instagram.com/nexahubtech",
		icon: InstagramIcon,
	},
	{
		label: "TikTok",
		href: "https://www.tiktok.com/@nexahubtech",
		icon: TikTokIcon,
	},
] as const;

function usePathname() {
	return useRouterState({ select: (s) => s.location.pathname });
}

export function Header() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const academy = inAcademy(pathname);
	/* inside the Academy the header's action is enrolling; everywhere else it is
	   starting a project */
	const cta = academy
		? ({ to: "/enrol", label: "Enrol" } as const)
		: ({ to: "/contact", label: "Start a project" } as const);

	/* while the mobile menu is open: lock scroll, close on Escape or on
	   resize up to the desktop breakpoint */
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		const onResize = () => {
			if (window.innerWidth >= 1024) setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		window.addEventListener("resize", onResize);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			window.removeEventListener("resize", onResize);
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="site-header" id="site-header" data-menu-open={open}>
			<div className="wrap flex items-center justify-between gap-4 h-[68px]">
				<Link
					to="/"
					className="flex items-center shrink-0"
					aria-label="NexaHubTech home"
					onClick={() => setOpen(false)}
				>
					<Logo height={26} />
				</Link>

				<nav className="hidden lg:flex items-center gap-1" aria-label="Main">
					{NAV.map((n) => (
						<Link
							key={n.to}
							to={n.to}
							className={`nav-link${"section" in n && academy ? " is-active" : ""}`}
							activeProps={{ className: "nav-link is-active" }}
						>
							{n.label}
						</Link>
					))}
				</nav>

				<div className="hidden lg:flex items-center gap-3">
					<ThemeToggle />
					<Link to={cta.to} className="btn btn-primary whitespace-nowrap">
						{cta.label}
					</Link>
				</div>

				<div className="flex items-center gap-2 lg:hidden">
					<ThemeToggle />
					<button
						type="button"
						className="menu-btn"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						aria-controls="mobile-menu"
						data-open={open}
						onClick={() => setOpen((v) => !v)}
					>
						<span />
						<span />
						<span />
					</button>
				</div>
			</div>

			{academy ? <AcademyBar /> : null}

			<div className="mobile-menu lg:hidden" id="mobile-menu" hidden={!open}>
				<nav className="wrap flex flex-col py-3" aria-label="Main">
					{NAV.map((n) => (
						<Link
							key={n.to}
							to={n.to}
							className="mobile-link"
							activeProps={{ className: "mobile-link is-active" }}
							onClick={() => setOpen(false)}
						>
							{n.label}
						</Link>
					))}
					<Link
						to={cta.to}
						className="btn btn-primary mt-4"
						onClick={() => setOpen(false)}
					>
						{cta.label}
					</Link>
				</nav>
			</div>
		</header>
	);
}

/* The Academy's second row. It scrolls sideways on a phone rather than
   wrapping, so it never takes more than one line. */
function AcademyBar() {
	return (
		<div className="academy-bar">
			<nav
				className="wrap flex items-center gap-1 overflow-x-auto"
				aria-label="NexaHubTech Academy"
			>
				<span className="academy-bar-name">Academy</span>
				{ACADEMY_NAV.map((n) => (
					<Link
						key={n.to}
						to={n.to}
						className="sub-link"
						activeProps={{ className: "sub-link is-active" }}
						activeOptions={{ exact: "exact" in n && n.exact }}
					>
						{n.label}
					</Link>
				))}
			</nav>
		</div>
	);
}

const FOOTER_COLUMNS = [
	{
		t: "Studio",
		links: [
			{ to: "/services", label: "Services" },
			{ to: "/work", label: "Work" },
			{ to: "/approach", label: "How we work" },
			{ to: "/contact", label: "Start a project" },
		],
	},
	{
		t: "Academy",
		links: [
			{ to: "/academy", label: "Overview" },
			{ to: "/courses", label: "Courses" },
			{ to: "/fees", label: "Pricing" },
			{ to: "/cbt", label: "CBT prep" },
			{ to: "/for-business", label: "Organisations" },
			{ to: "/enrol", label: "Enrol" },
		],
	},
	{
		t: "Company",
		links: [
			{ to: "/about", label: "About" },
			{ to: "/about", hash: "team", label: "Team" },
			{ to: "/contact", label: "Contact" },
		],
	},
] as const;

export function Footer() {
	return (
		<footer className="footer">
			<div className="wrap py-14 grid gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)]">
				<div>
					<Link to="/" className="inline-flex" aria-label="NexaHubTech home">
						<Logo height={24} />
					</Link>
					<p className="text-[0.92rem] text-ink-soft mt-4 max-w-[18rem]">
						A software company in Abuja. We build software for businesses, and
						teach through NexaHubTech Academy.
					</p>
					<p className="text-[0.85rem] text-mute mt-4">{CONTACT.address}</p>
					<p className="text-[0.85rem] text-mute mt-1">
						<a href={`mailto:${CONTACT.email}`} className="hover:underline">
							{CONTACT.email}
						</a>{" "}
						·{" "}
						<a href={`tel:${CONTACT.phone}`} className="hover:underline">
							{CONTACT.phoneDisplay}
						</a>
					</p>
					<div className="flex gap-2 mt-5">
						{SOCIALS.map((s) => (
							<a
								key={s.label}
								href={s.href}
								target="_blank"
								rel="noreferrer"
								className="social-btn"
								aria-label={`NexaHubTech on ${s.label}`}
							>
								<s.icon />
							</a>
						))}
					</div>
				</div>
				{FOOTER_COLUMNS.map((col) => (
					<nav key={col.t} aria-label={col.t}>
						<h2 className="footer-heading">{col.t}</h2>
						<ul className="mt-3 grid gap-2">
							{col.links.map((l) => (
								<li key={`${l.to}${"hash" in l ? l.hash : ""}`}>
									<Link
										to={l.to}
										hash={"hash" in l ? l.hash : undefined}
										className="footer-link"
									>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				))}
			</div>
			<div className="wrap py-6 border-t border-[var(--line)] flex flex-col sm:flex-row gap-2 justify-between text-[0.82rem] text-mute">
				<span>© 2026 NexaHubTech Limited · RC {CONTACT.rc}</span>
				<span>
					Studio: {TAGLINE.build} · Academy: {TAGLINE.learn}
				</span>
			</div>
		</footer>
	);
}

/* small shared building blocks */

export function Eyebrow({ children }: { children: React.ReactNode }) {
	return <span className="eyebrow">{children}</span>;
}

/* a section's heading block: label, heading, optional intro */
export function SectionHead({
	eyebrow,
	title,
	intro,
	className = "",
}: {
	eyebrow?: string;
	title: React.ReactNode;
	intro?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`max-w-[42rem] ${className}`}>
			{eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
			<h2 className="h2 mt-3">{title}</h2>
			{intro ? <p className="lead mt-4">{intro}</p> : null}
		</div>
	);
}

/* the page title block every inner page opens with */
export function PageHead({
	eyebrow,
	title,
	intro,
	children,
}: {
	eyebrow?: string;
	title: React.ReactNode;
	intro?: React.ReactNode;
	children?: React.ReactNode;
}) {
	return (
		<section className="wrap page-head">
			<div className="max-w-[46rem]">
				{eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
				<h1 className="h1 mt-3">{title}</h1>
				{intro ? <p className="lead mt-5 text-[1.1rem]">{intro}</p> : null}
				{children}
			</div>
		</section>
	);
}
