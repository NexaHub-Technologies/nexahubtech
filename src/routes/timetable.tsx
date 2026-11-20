import { createFileRoute, redirect } from "@tanstack/react-router";

/* merged into About the Academy — kept so old links and search results land */
export const Route = createFileRoute("/timetable")({
	beforeLoad: () => {
		throw redirect({ to: "/academy/about", hash: "where", statusCode: 301 });
	},
});
