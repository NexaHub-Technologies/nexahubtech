/* What the design system's bundle exposes as window.NexaHub. ModeProvider and
   useMode get no card of their own; previews of the mode-aware components wrap
   them in ModeProvider. */
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
	ModeProvider,
	useMode,
};
