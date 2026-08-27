/* The studio's system design process, made public. It is the build arm's answer
   to the mental models on the course pages: the school says understand before you
   write syntax, and the studio says understand before you write software.

   Grouped into three phases because eleven flat items read as a checklist, and
   this is meant to read as an argument. */

export interface ApproachStep {
	n: string;
	t: string;
	d: string;
}

export interface ApproachPhase {
	t: string;
	/* why this phase exists at all — the case for spending time here */
	d: string;
	steps: ApproachStep[];
}

export const APPROACH: ApproachPhase[] = [
	{
		t: "Understand the problem",
		d: "Before anything is designed, we work out what is actually being asked. Most software that fails does so by solving a problem nobody had.",
		steps: [
			{
				n: "01",
				t: "Clarify the problem",
				d: "Separate what you asked for from what you need. We ask what happens today, who it fails, and what that failure costs you — because a brief is already a proposed solution, not the problem itself.",
			},
			{
				n: "02",
				t: "Name the constraints",
				d: "Budget, deadline, team, devices, network, regulation. In this market that usually means mobile-first, intermittent connectivity and local payment rails. Constraints decide architecture, so they go on the table before any architecture does.",
			},
			{
				n: "03",
				t: "Model the domain",
				d: "Name the entities and the rules that bind them before choosing a database. A cooperative's membership and contribution rules are the product; the schema only records them.",
			},
			{
				n: "04",
				t: "Map the critical flows",
				d: "Walk the two or three journeys the business actually runs on, end to end. An architecture that serves real paths beats one that serves an imagined feature list.",
			},
		],
	},
	{
		t: "Decide the architecture",
		d: "Only once the problem is pinned down do we choose a shape. Every decision here is written down together with the reason it was made, so it can be argued with later.",
		steps: [
			{
				n: "05",
				t: "Choose the shape",
				d: "Where state lives, what talks to what, what must happen now and what can wait. We pick the simplest arrangement that satisfies the constraints from step 02 — not the most impressive one.",
			},
			{
				n: "06",
				t: "Design the data layer",
				d: "Schema, relationships, indexes and access rules together, in one pass. Row-level security and role claims are part of the data design, not a layer bolted on once the tables already exist.",
			},
			{
				n: "07",
				t: "Draw the trust boundaries",
				d: "Decide what each kind of user can see and do, and where that is enforced. A permission checked only in the interface is decoration — it belongs where the data lives.",
			},
			{
				n: "08",
				t: "Plan for failure",
				d: "Assume the payment webhook never arrives and the connection dies mid-transaction. What the system does when things go wrong is designed here, deliberately, rather than discovered in production.",
			},
		],
	},
	{
		t: "Commit to it",
		d: "The last three steps turn a design into something you can hold us to — and something we can be measured against once the building starts.",
		steps: [
			{
				n: "09",
				t: "Cost it honestly",
				d: "Estimate infrastructure and effort before committing to either. We optimise for the least cost that meets the requirement, because a modest system you will never outgrow is worth more than a clever one you cannot afford to run.",
			},
			{
				n: "10",
				t: "Write the design document",
				d: "The design becomes an artifact you can read, question and disagree with — while disagreeing is still cheap. It is also the thing the finished build gets checked against.",
			},
			{
				n: "11",
				t: "Build to it, and revise out loud",
				d: "Implementation follows the document. When reality contradicts it — and occasionally it does — we change the document and say why, rather than letting the system quietly drift away from its own design.",
			},
		],
	},
];

export const APPROACH_STEP_COUNT = APPROACH.reduce(
	(n, phase) => n + phase.steps.length,
	0,
);
