import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

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
				src="/logo.svg"
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
	{ to: "/courses", label: "Courses" },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
] as const;

export function Header() {
	useEffect(() => {
		document.documentElement.classList.add("js");
		const header = document.getElementById("site-header");
		const onScroll = () =>
			header?.classList.toggle("scrolled", window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className="site-header" id="site-header">
			<div className="wrap flex items-center justify-between h-[76px]">
				<Link
					to="/"
					className="flex items-center"
					aria-label="NexaHubTech home"
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
				<Link
					to="/contact"
					className="btn btn-primary !py-2.5 !px-5 text-[0.9rem]"
				>
					Get started
				</Link>
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
				<p className="text-[0.85rem] text-mute">
					© 2026 NexaHubTech · formerly Codex Technologies
				</p>
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
		for (const el of document.querySelectorAll(".reveal")) io.observe(el);
		return () => io.disconnect();
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
