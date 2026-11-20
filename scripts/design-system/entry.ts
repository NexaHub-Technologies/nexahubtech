/* What the design system's bundle exposes as window.NexaHub. ModeProvider and
   useMode get no card of their own; previews of the mode-aware components wrap
   them in ModeProvider. courseBySlug lets the fee previews show a real course. */
import { CourseCard, FeeLines, PriceBox } from "../../src/components/fees";
import {
	AcademyPointer,
	ClosingCTA,
	Hero,
	HowItWorks,
	Numbers,
	Services,
	StudioProcess,
	StudioProof,
	Tapes,
	Thesis,
	Tracks,
} from "../../src/components/home";
import { ModeProvider, useMode } from "../../src/components/mode";
import { Preloader } from "../../src/components/preloader";
import { SessionLoop } from "../../src/components/session-loop";
import {
	Eyebrow,
	Footer,
	Header,
	Logo,
	ModeSwitch,
} from "../../src/components/site";
import { getCourseBySlug } from "../../src/lib/courses";

declare global {
	interface Window {
		NexaHub: unknown;
	}
}

window.NexaHub = {
	Logo,
	Eyebrow,
	ModeSwitch,
	Header,
	Footer,
	Preloader,
	SessionLoop,
	Hero,
	Tapes,
	Numbers,
	Thesis,
	HowItWorks,
	Tracks,
	StudioProof,
	Services,
	ClosingCTA,
	StudioProcess,
	AcademyPointer,
	CourseCard,
	PriceBox,
	FeeLines,
	ModeProvider,
	useMode,
	courseBySlug: getCourseBySlug,
};
