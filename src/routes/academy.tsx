import { createFileRoute } from "@tanstack/react-router";
import {
	AcademyFacts,
	AcademyHero,
	ClosingCTA,
	HowItWorks,
	InsideTheCentre,
	LearnerQuotes,
	LearnerWork,
	StudioProof,
	Tracks,
} from "../components/home";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/academy")({
	component: Academy,
	head: () => pageMeta(PAGES.academy),
});

/* NexaHubTech Academy's front page, a section of the one site. Choose a
   track, see how it works and where you would learn, see what learners have
   made, and go. */
function Academy() {
	return (
		<>
			<AcademyHero />
			<AcademyFacts />
			<Tracks />
			<HowItWorks />
			<InsideTheCentre />
			<LearnerWork />
			<LearnerQuotes />
			<StudioProof />
			<ClosingCTA
				title="Ready to start?"
				lead="Start any day, online or in person, and pay in parts if you prefer."
				primary={{ to: "/courses", label: "Find your course" }}
				secondary={{ to: "/enrol", label: "Enrol" }}
			/>
		</>
	);
}
