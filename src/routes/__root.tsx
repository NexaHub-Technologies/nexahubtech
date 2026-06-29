import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Footer, Header } from "../components/site";
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
				title: "NexaHubTech — Learn to build. Then build for real.",
			},
			{
				name: "description",
				content:
					"NexaHubTech is a Nigeria-based skills-to-service company: a tech school and a software studio. We teach people to become developers, then put those skills to work building real products for real clients.",
			},
			{ name: "theme-color", content: "#f6eff4" },
			{
				property: "og:title",
				content: "NexaHubTech — Learn to build. Then build for real.",
			},
			{
				property: "og:description",
				content:
					"A tech school + a software studio. We teach the skills to become a developer, then use them on real client work — so learning is tied to actual engineering, not theory.",
			},
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/logo-main.svg",
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
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
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
