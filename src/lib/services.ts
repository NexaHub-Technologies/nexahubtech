/* what the studio arm sells. Category names and the individual service names come
   from the company profile; the descriptions are written for the site. The school
   arm's offering lives in COURSES (src/lib/courses.ts) and is surfaced at /courses,
   so it is deliberately not repeated here. */

export interface ServiceItem {
	t: string;
	d: string;
}

export interface ServiceLine {
	slug: string;
	t: string;
	tagline: string;
	d: string;
	items: ServiceItem[];
}

export const SERVICES: ServiceLine[] = [
	{
		slug: "software-development",
		t: "Software Development",
		tagline:
			"Products built to last — thought through before they’re built, then kept running.",
		d: "We take on software from the first conversation to long after launch. Every project starts with understanding the problem properly, because the cost of building the wrong thing well is higher than the cost of thinking first.",
		items: [
			{
				t: "Custom software development",
				d: "Systems shaped around how you actually work, rather than a template bent to fit.",
			},
			{
				t: "Website design & development",
				d: "Sites that load fast, read clearly, and hold up on the devices your customers really use.",
			},
			{
				t: "Mobile application development",
				d: "Apps for Android and iOS, built to feel native rather than like a website in a shell.",
			},
			{
				t: "Enterprise solutions",
				d: "Internal tools and platforms for organisations where reliability matters more than novelty.",
			},
			{
				t: "API development & integration",
				d: "Getting your systems talking to each other — cleanly, and without a rewrite.",
			},
			{
				t: "Software maintenance & support",
				d: "The unglamorous part done properly: updates, fixes, and someone to call when it breaks.",
			},
		],
	},
	{
		slug: "digital-solutions",
		t: "Digital Solutions",
		tagline:
			"The work around the product that decides whether it actually lands.",
		d: "Good software rarely fails for technical reasons alone. This is the work that surrounds it — how it’s positioned, how it fits your operations, and what it runs on.",
		items: [
			{
				t: "Branding & digital strategy",
				d: "Working out what you’re saying and who you’re saying it to, before deciding where to say it.",
			},
			{
				t: "Business process automation",
				d: "Finding the repetitive work that quietly costs you hours, and handing it to software.",
			},
			{
				t: "IT consulting",
				d: "A straight answer on what to build, what to buy, and what to leave alone for now.",
			},
			{
				t: "Cloud solutions",
				d: "Hosting and infrastructure sized to what you need today, with room to grow into.",
			},
			{
				t: "Technical support",
				d: "Practical help for your team, so problems get solved instead of worked around.",
			},
		],
	},
];

export function getServiceBySlug(slug: string): ServiceLine | undefined {
	return SERVICES.find((s) => s.slug === slug);
}
