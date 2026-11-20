import { createFileRoute, redirect } from "@tanstack/react-router";

/* merged into About the Academy — kept so old links and search results land */
export const Route = createFileRoute("/teaching")({
	beforeLoad: () => {
		throw redirect({ to: "/academy/about", hash: "teaching", statusCode: 301 });
	},
});
