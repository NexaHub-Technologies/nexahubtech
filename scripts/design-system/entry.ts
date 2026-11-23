/* What the design system's bundle exposes as window.NexaHub. courseBySlug lets
   the fee previews show a real course; WORK and TEAM give the evidence cards
   real entries to render. */

import {
	CaseStudyCard,
	LogoRow,
	PersonCard,
	Quote,
	TextSlot,
} from "../../src/components/evidence";
import { CourseCard, FeeLines, PriceBox } from "../../src/components/fees";
import { Figure } from "../../src/components/figure";
import {
	AcademyFacts,
	AcademyHero,
	AcademyPointer,
	ClientLogos,
	ClientQuotes,
	ClosingCTA,
	FeaturedWork,
	HowItWorks,
	InsideTheCentre,
	LearnerQuotes,
	LearnerWork,
	Services,
	StudioHero,
	StudioProcess,
	StudioProof,
	Tracks,
} from "../../src/components/home";
import {
	Eyebrow,
	Footer,
	Header,
	Logo,
	PageHead,
	SectionHead,
} from "../../src/components/site";
import { getCourseBySlug } from "../../src/lib/courses";
import { CLIENT_LOGOS, TEAM } from "../../src/lib/evidence";
import { WORK } from "../../src/lib/work";

declare global {
	interface Window {
		NexaHub: unknown;
	}
}

window.NexaHub = {
	Logo,
	Eyebrow,
	SectionHead,
	PageHead,
	Header,
	Footer,
	Figure,
	TextSlot,
	LogoRow,
	CaseStudyCard,
	Quote,
	PersonCard,
	StudioHero,
	ClientLogos,
	FeaturedWork,
	Services,
	StudioProcess,
	ClientQuotes,
	AcademyPointer,
	AcademyHero,
	AcademyFacts,
	Tracks,
	HowItWorks,
	InsideTheCentre,
	LearnerWork,
	LearnerQuotes,
	StudioProof,
	ClosingCTA,
	CourseCard,
	PriceBox,
	FeeLines,
	courseBySlug: getCourseBySlug,
	work: WORK,
	team: TEAM,
	clientLogos: CLIENT_LOGOS,
};
