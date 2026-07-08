import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/* shared site chrome + small hooks, used by the root layout and pages */

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
			<span className="display" style={{ fontSize: wordmark }}>
				NexaHubTech
			</span>
		</span>
	);
}

export const NAV = [
	{ to: "/", label: "Home" },
	{ to: "/courses", label: "Courses" },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
] as const;

export const CONTACT = {
	email: "nexahubt@gmail.com",
	phoneDisplay: "+234 913 451 3173",
	whatsapp: "https://wa.me/2349134513173",
} as const;

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
	{ label: "X", href: "https://x.com/NexaHubTech", icon: XIcon },
	{
		label: "Instagram",
		href: "https://www.instagram.com/nexahub_tech",
		icon: InstagramIcon,
	},
	{
		label: "TikTok",
		href: "https://www.tiktok.com/@nexahub.tech",
		icon: TikTokIcon,
	},
] as const;

export function Header() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		document.documentElement.classList.add("js");
		const header = document.getElementById("site-header");
		const onScroll = () =>
			header?.classList.toggle("scrolled", window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	/* while the mobile menu is open: lock scroll, close on Escape or on
	   resize up to the desktop breakpoint */
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		const onResize = () => {
			if (window.innerWidth >= 768) setOpen(false);
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
			<div className="wrap flex items-center justify-between h-[76px]">
				<Link
					to="/"
					className="flex items-center"
					aria-label="NexaHubTech home"
					onClick={() => setOpen(false)}
				>
					<Logo height={26} />
				</Link>

				<nav className="hidden md:flex items-center gap-8">
					{NAV.map((n) => (
						<Link
							key={n.to}
							to={n.to}
							className="nav-link"
							activeProps={{ className: "nav-link is-active" }}
						>
							{n.label}
						</Link>
					))}
				</nav>

				<div className="hidden md:block">
					<Link
						to="/contact"
						className="btn btn-primary !py-2.5 !px-5 text-[0.9rem]"
					>
						Get started
					</Link>
				</div>

				<button
					type="button"
					className="menu-btn md:hidden"
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

			<div className="mobile-menu md:hidden" id="mobile-menu" hidden={!open}>
				<nav className="wrap flex flex-col py-3">
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
						to="/contact"
						className="btn btn-primary mt-4"
						onClick={() => setOpen(false)}
					>
						Get started
					</Link>
				</nav>
			</div>
		</header>
	);
}

export function Footer() {
	return (
		<footer className="footer mt-10">
			<div className="wrap py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
				<div>
					<Link
						to="/"
						className="flex items-center"
						aria-label="NexaHubTech home"
					>
						<Logo height={24} />
					</Link>
					<p className="text-[0.9rem] text-mute mt-2">
						Learn to build. Then build for real.
					</p>
				</div>
				<nav className="flex flex-wrap gap-6">
					{NAV.map((n) => (
						<Link key={n.to} to={n.to} className="nav-link">
							{n.label}
						</Link>
					))}
				</nav>
				<div className="flex flex-col items-start md:items-end gap-3">
					<div className="flex gap-2.5">
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
					<p className="text-[0.85rem] text-mute">© 2026 NexaHubTech</p>
				</div>
			</div>
		</footer>
	);
}

/* reveal-on-scroll — call once per page; re-runs on client navigation */
export function useReveal() {
	useEffect(() => {
		document.documentElement.classList.add("js");
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add("in-view");
						io.unobserve(e.target);
					}
				}
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
		);

		const observe = () => {
			for (const el of document.querySelectorAll(".reveal:not(.in-view)")) {
				io.observe(el);
			}
		};

		observe();

		const mo = new MutationObserver(observe);
		mo.observe(document.body, { childList: true, subtree: true });

		return () => {
			mo.disconnect();
			io.disconnect();
		};
	}, []);
}

/* small shared building blocks */

export function Eyebrow({
	children,
	variant = "learn",
}: {
	children: React.ReactNode;
	variant?: "learn" | "build" | "plain";
}) {
	const cls =
		variant === "build"
			? "eyebrow is-build"
			: variant === "plain"
				? "eyebrow is-plain"
				: "eyebrow";
	return <span className={cls}>{children}</span>;
}
