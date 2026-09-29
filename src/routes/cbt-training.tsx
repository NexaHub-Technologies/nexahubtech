import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cbt-training")({
	beforeLoad: () => {
		throw redirect({ to: "/cbt" });
	},
});
