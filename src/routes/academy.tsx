import { createFileRoute } from "@tanstack/react-router";
import {
	ClosingCTA,
	Hero,
	HowItWorks,
	StudioProof,
	Tapes,
	Tracks,
} from "../components/home";
import { useReveal } from "../components/site";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

/* NexaHubTech Academy's front page — the training arm, kept apart from the
   company's front page at /. Deliberately short: choose a track, see how it
   works, and go. Everything else is one click away on the course pages. */
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
			<Tracks />
			<HowItWorks />
			<StudioProof />
			<ClosingCTA />
		</>
	);
}
