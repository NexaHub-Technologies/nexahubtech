/* How the school teaches, made public — the learn arm's counterpart to the
   studio's system design process in approach.ts. Same underlying claim, at a
   different scale: understand the thing before you build with it.

   The three-part session already appears in shortened form on every course page;
   here it is stated with the reason each part exists. */

export interface Principle {
	n: string;
	t: string;
	d: string;
}

export interface SessionPart {
	n: string;
	t: string;
	d: string;
	/* the reason this part is in every session, not just what it is */
	why: string;
}

export interface Antipattern {
	t: string;
	d: string;
}

export const PRINCIPLES: Principle[] = [
	{
		n: "01",
		t: "The model before the syntax",
		d: "Syntax is the cheapest part of programming and the first thing you forget. We spend the time on the idea underneath — what the machine is actually doing — because that is what survives, and what lets you pick up a language nobody taught you.",
	},
	{
		n: "02",
		t: "One idea at a time",
		d: "Chunk-based teaching: a session introduces a single concept, uses it, and stops. Four ideas in an hour feels productive and teaches none of them, because there is no room left to be usefully confused about any one of them.",
	},
	{
		n: "03",
		t: "Being stuck is the lesson",
		d: "Exercises are pitched just past what you already know, which means you will get stuck. That is the part where the learning happens, so sessions leave room to be wrong out loud before the answer turns up.",
	},
	{
		n: "04",
		t: "You should be able to explain it",
		d: "Code runs by accident all the time, so the test of understanding is never that it works. It is whether you can say why it works. Every module ends with something you could defend to another person.",
	},
];

export const SESSION: SessionPart[] = [
	{
		n: "01",
		t: "A mental model",
		d: "The session opens with the idea in plain language, before a line of code appears — usually as a picture of what the machine is doing, or an analogy that holds up under pressure.",
		why: "Syntax attached to an idea is memorable. Syntax attached to nothing is a list.",
	},
	{
		n: "02",
		t: "An exercise brief",
		d: "A focused task you cannot finish by pattern-matching the example. It forces you to use the concept, which is how you find out whether you actually hold it.",
		why: "Reading code you understand feels identical to reading code you don't.",
	},
	{
		n: "03",
		t: "A model answer",
		d: "A worked solution written the way we would write it, with the reasoning left in. It is there to compare against yours, not to replace the attempt.",
		why: "Nobody learns what good looks like from a blank page and a passing test.",
	},
];

export const ANTIPATTERNS: Antipattern[] = [
	{
		t: "Slides, read aloud",
		d: "If a session could have been a document, it should have been a document. Time together is for working through the hard part, not narrating bullet points at people.",
	},
	{
		t: "Copy-along tutorials",
		d: "Typing what somebody else typed produces a working app and no transferable skill. You will build things here that you have to think your way through.",
	},
	{
		t: "Twelve tools in six weeks",
		d: "A tour of frameworks looks impressive on a syllabus and leaves you unable to use any of them. We go slower, over fewer things, deliberately.",
	},
	{
		t: "Frameworks before foundations",
		d: "React before JavaScript, or a CSS framework before layout, produces developers who are fluent right up until something breaks. The course order is not an accident.",
	},
];
