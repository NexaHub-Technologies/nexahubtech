import { createFileRoute } from "@tanstack/react-router";
import {
	Approach,
	ClosingCTA,
	ForTeams,
	Hero,
	Numbers,
	StartingPoints,
	StudioProof,
	Tapes,
	TwoWays,
} from "../components/home";
import { useReveal } from "../components/site";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

/* NexaHubTech Academy's front page — the training division, kept apart from the
   company's front page at / */
export const Route = createFileRoute("/academy")({
	component: AcademyHome,
	head: () => pageMeta(PAGES.academy),
});

function AcademyHome() {
	useReveal();
	return (
		<>
			<Hero />
			<Tapes />
			<Numbers />
			<StartingPoints />
			<TwoWays />
			<Approach />
			<StudioProof />
			<ForTeams />
			<ClosingCTA />
		</>
	);
}
