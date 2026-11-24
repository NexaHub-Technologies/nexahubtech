import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect, useRef } from "react";

import { Footer, Header } from "../components/site";
import { DEFINITION, ONE_LINER } from "../lib/company";
import { MOTTO, SITE_URL } from "../lib/contact";
import { PAGES } from "../lib/pages";
import { followPointerGlow, fullBleedOrigin } from "../lib/pointer-glow";
import { inAcademy } from "../lib/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: PAGES.home.title,
			},
			{
				name: "description",
				content: DEFINITION,
			},
			{ name: "theme-color", content: "#ffffff" },
			{
				property: "og:title",
				content: PAGES.home.title,
			},
			{
				property: "og:description",
				content: ONE_LINER,
			},
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "NexaHubTech" },
			{ property: "og:locale", content: "en_NG" },
			{ property: "og:url", content: `${SITE_URL}/` },
			{ property: "og:image", content: `${SITE_URL}/og-image.png` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content: `NexaHubTech — ${MOTTO} ${ONE_LINER}`,
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:image", content: `${SITE_URL}/og-image.png` },
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/logo-main.svg",
			},
			/* SVG for modern browsers, .ico for old ones, and a PNG for iOS —
			   which ignores SVG when bookmarking to the home screen */
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootLayout,
	shellComponent: RootDocument,
});

function RootLayout() {
	/* the Academy's pages carry its doodle pattern behind their opening
	   section, with a soft glow that follows the mouse across it */
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const academy = inAcademy(pathname);
	const mainRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const main = mainRef.current;
		if (!academy || !main) return;
		/* the opening section is looked up on every move rather than once:
		   after a click through to another page it is a different element,
		   and the new page may not have rendered yet when this runs */
		const opening = () => {
			const el = main.firstElementChild;
			return el instanceof HTMLElement ? el : null;
		};
		return followPointerGlow({
			area: main,
			layers: [{ el: opening, origin: fullBleedOrigin }],
			// the pattern only covers the opening, edge to edge
			isInside: (_x, y) => {
				const box = opening()?.getBoundingClientRect();
				return !!box && y >= box.top && y <= box.bottom;
			},
		});
	}, [academy]);
	return (
		<>
			<Header />
			<main ref={mainRef} data-section={academy ? "academy" : undefined}>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script>{`(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`}</script>
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
