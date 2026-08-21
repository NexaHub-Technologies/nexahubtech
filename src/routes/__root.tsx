import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { ModeProvider } from "../components/mode";
import { Footer, Header } from "../components/site";
import { SITE_URL } from "../lib/contact";
import { DEFAULT_MODE, MODE_INIT_SCRIPT } from "../lib/mode";
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
				title: "NexaHubTech — Learn to build. Build for real.",
			},
			{
				name: "description",
				content:
					"NexaHubTech is a Nigeria-based skills-to-service company: a tech school and a software studio. We teach people to become developers, then put those skills to work building real products for real clients.",
			},
			{ name: "theme-color", content: "#f6eff4" },
			{
				property: "og:title",
				content: "NexaHubTech — Learn to build. Build for real.",
			},
			{
				property: "og:description",
				content:
					"A tech school + a software studio. We teach the skills to become a developer, then use them on real client work — so learning is tied to actual engineering, not theory.",
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
				content:
					"NexaHubTech — Learn to build. Build for real. A tech school + a software studio.",
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
			   which ignores SVG when adding to the home screen */
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
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
	return (
		<ModeProvider>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</ModeProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	/* MODE_INIT_SCRIPT stamps data-mode on <html> before React hydrates, so the
	   client DOM legitimately differs from the server markup here. Rendering the
	   default keeps the served HTML honest for non-JS visitors; the suppression
	   covers this element's attributes only, which is exactly the divergence. */
	return (
		<html lang="en" data-mode={DEFAULT_MODE} suppressHydrationWarning>
			<head>
				{/* stamps data-mode before first paint so the server-rendered
				    /contact route never flashes the wrong side */}
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static, self-authored constant
					dangerouslySetInnerHTML={{ __html: MODE_INIT_SCRIPT }}
				/>
				<HeadContent />
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
