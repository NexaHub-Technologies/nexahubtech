import { createFileRoute, redirect } from "@tanstack/react-router";

/* merged into the one About page — kept so old links and search results land */
export const Route = createFileRoute("/teaching")({
	beforeLoad: () => {
		throw redirect({ to: "/about", hash: "teaching", statusCode: 301 });
	},
});
