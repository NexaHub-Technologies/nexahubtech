import { createFileRoute } from "@tanstack/react-router";
import {
	AcademyPointer,
	ClosingCTA,
	Hero,
	Numbers,
	Services,
	StudioProcess,
	Tapes,
	Thesis,
} from "../components/home";
import { useReveal } from "../components/site";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

/* the company's front page. The Academy has its own, at /academy. */
export const Route = createFileRoute("/")({
	component: Home,
	head: () => pageMeta(PAGES.home),
});

function Home() {
	useReveal();
	return (
		<>
			<Hero />
			<Tapes />
			<Numbers />
			<Thesis />
			<Services />
			<StudioProcess />
			<AcademyPointer />
			<ClosingCTA />
		</>
	);
}
