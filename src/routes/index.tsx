import { createFileRoute } from "@tanstack/react-router";
import {
	AcademyPointer,
	ClientLogos,
	ClientQuotes,
	ClosingCTA,
	FeaturedWork,
	ProductShowcase,
	Services,
	StudioHero,
	StudioProcess,
} from "../components/home";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/")({
	component: App,
	head: () => pageMeta(PAGES.home),
});

/* The company's front page: what we do, the proof, how we work, and a way to
   start. The Academy has its own front page at /academy. */
function App() {
	return (
		<>
			<StudioHero />
			<ProductShowcase />
			<ClientLogos />
			<FeaturedWork />
			<Services />
			<StudioProcess />
			<ClientQuotes />
			<AcademyPointer />
			<ClosingCTA
				title="Have a product in mind?"
				lead="Tell us the problem rather than the solution. The first conversation costs you nothing, and you will leave it knowing what it would take."
				primary={{ to: "/contact", label: "Start a project" }}
				secondary={{ to: "/approach", label: "How we work" }}
			/>
		</>
	);
}
