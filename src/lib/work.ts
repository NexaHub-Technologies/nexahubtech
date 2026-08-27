/* Shipped work, for the studio arm. /services says what we do; this says what we
   have actually built, which is the part a client is really deciding on.

   Deliberately architectural rather than promotional: each entry states the
   problem and the decision that made it interesting, because the eleven steps on
   /approach are the pitch and these are the evidence. No metrics are quoted —
   none have been supplied, and inventing them would be worse than omitting them. */

export interface CaseStudy {
	slug: string;
	t: string;
	/* what kind of thing it is, in three or four words */
	kind: string;
	tagline: string;
	/* what was actually hard about it */
	problem: string;
	/* the decision worth reading about */
	approach: string;
	stack: string[];
}

export const WORK: CaseStudy[] = [
	{
		slug: "parkmate",
		t: "ParkMate",
		kind: "Two-sided marketplace",
		tagline:
			"Parking that can be found, booked and paid for before you set off.",
		problem:
			"Parking in a Nigerian city is found by driving around and asking. Space owners have capacity they cannot advertise, and drivers have no way of knowing what is free before they leave. Neither side of that is worth building for without the other.",
		approach:
			"Two-sided marketplaces fail at the cold start, so the design question was never the booking flow — it was what the product is worth to a space owner on a day with no drivers, and to a driver with few spaces. Payments settle through Paystack, and the app is built for the connection people actually have once they are already in the car.",
		stack: [
			"Expo / React Native",
			"TanStack Start",
			"Elysia on Bun",
			"Supabase",
			"Paystack",
			"Railway",
		],
	},
	{
		slug: "streamconf",
		t: "StreamConf",
		kind: "Real-time video platform",
		tagline:
			"Livestreaming and conferencing built for the bandwidth people actually have.",
		problem:
			"Video is the least forgiving thing to build. A page that loads slowly is an annoyance; a call that drops is a failure, and there is no way to hide it from the people who were on it.",
		approach:
			"Media transport is delegated to LiveKit rather than rebuilt, which leaves the genuinely interesting work: who is admitted to a room and on what authority, what the interface does as a participant's connection degrades rather than fails outright, and how state stays coherent between a server that knows the truth and clients that have each seen a different part of it.",
		stack: ["TanStack Start", "LiveKit", "Elysia on Bun", "Supabase"],
	},
	{
		slug: "domicop",
		t: "DOMICOP",
		kind: "Cooperative society platform",
		tagline:
			"Members, contributions and loans, with the society's own rules enforced by the database.",
		problem:
			"A cooperative runs on rules about who may see what and who may approve what, and those rules are the product rather than a feature of it. Software of this kind usually checks them in the interface — which means they hold right up until somebody addresses the API directly.",
		approach:
			"Roles travel as custom JWT claims and are enforced by row-level security in Postgres, so permissions are applied where the data lives instead of where it is displayed. A treasurer and an ordinary member issuing an identical query get different rows back, and no client can opt out of that. The mobile app is built on Expo Router, and the same policies serve it and the web without being written twice.",
		stack: [
			"Expo Router",
			"Supabase",
			"Postgres row-level security",
			"Custom JWT claims",
		],
	},
	{
		slug: "itc",
		t: "ITC",
		kind: "Cooperative society platform",
		tagline: "The same architecture, a second society, a different rulebook.",
		problem:
			"No two cooperatives run on the same rules. Contribution cycles, loan eligibility and who signs off on what all differ by society, and a platform hard-coded to one of them is a rewrite for the next one.",
		approach:
			"Built on the pattern DOMICOP established, which is the only real test of whether that pattern was a design or merely an implementation. The role model and the policies that enforce it carry over unchanged; what differs is the domain rules sitting on top — precisely the seam the original system design set out to create.",
		stack: [
			"Expo Router",
			"Supabase",
			"Postgres row-level security",
			"Custom JWT claims",
		],
	},
	{
		slug: "sign-me-out",
		t: "Sign Me Out",
		kind: "Social product",
		tagline:
			"The Nigerian university sign-out tradition, on a surface that never runs out.",
		problem:
			"Final-year students sign each other's shirts and folders on the last day. It is a tradition with a hard physical limit: the surface runs out, the ink fades, and anyone who was not there that afternoon is simply not on it.",
		approach:
			"A shared, infinite canvas where signatures are drawn rather than typed — which makes it a rendering and concurrency problem rather than a CRUD one. Many people mark one surface at once, and it has to stay readable, and still open quickly for somebody returning to it a year later.",
		stack: [
			"Konva.js",
			"TanStack Start",
			"Elysia on Bun",
			"Supabase",
			"Paystack",
		],
	},
];
