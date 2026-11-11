import { CBT_GROUP_PACKAGE } from "./cbt";
import { formatNaira, getCourseBySlug } from "./courses";

/* Training sold to an organisation rather than a person: staff taught at their
   own office, a school's candidates through CBT, or a team on any course. The
   courses themselves are the same ones the catalogue lists — only who pays,
   where it happens and how it is priced changes. */

export interface BusinessOffer {
	id: string;
	t: string;
	/* who it is for, as a short phrase */
	for: string;
	d: string;
	/* the rate as a visitor reads it */
	price: string;
	unit: string;
	points: string[];
	/* where "find out more" goes — a course, or the CBT page */
	link?: { to: string; label: string };
}

const office = getCourseBySlug("microsoft-office");
if (!office) throw new Error("business.ts: microsoft-office is not a course");

/* per staff member, and the smallest group worth sending an instructor out for */
export const OFFICE_ONSITE_RATE = 85_000;
export const OFFICE_ONSITE_MINIMUM = 4;

export const BUSINESS_OFFERS: BusinessOffer[] = [
	{
		id: "office-onsite",
		t: "Microsoft Office for your staff",
		for: "Offices, shops and organisations",
		d: `The full ${office.t} course — ${office.d} — taught at your office, on your own machines, around the working day. Built on your team's real files and tasks, so the hours it saves start in week one.`,
		price: formatNaira(OFFICE_ONSITE_RATE),
		unit: `per staff member · minimum ${OFFICE_ONSITE_MINIMUM} · ${office.duration.toLowerCase()}`,
		points: [
			"Taught at your premises, at times your team can actually attend",
			"Windows machines with Microsoft Office installed — yours, so the skills land where the work is",
			"Exercises built from the documents and sheets your team already uses",
			"One invoice for the whole group",
		],
		link: { to: `/courses/${office.slug}`, label: "See the course outline" },
	},
	{
		id: "cbt-schools",
		t: "CBT practice for schools",
		for: "Secondary schools, tutorial centres and study groups",
		d: "Your candidates practise the computer-based exam on real desktops at our Kubwa lab — keyboard shortcuts, pacing, past questions and full timed mocks — in sessions set aside for your group.",
		price: CBT_GROUP_PACKAGE.price,
		unit: CBT_GROUP_PACKAGE.duration,
		points: CBT_GROUP_PACKAGE.features,
		link: { to: "/cbt", label: "See CBT training" },
	},
	{
		id: "team-training",
		t: "Training for a team",
		for: "Companies, agencies and NGOs",
		d: "Any course in the catalogue — development, data, video or office skills — for a group from one organisation, live online or at the centre, scheduled around your team. Tell us who needs to learn what, and we will send a proposal.",
		price: "On proposal",
		unit: "priced per group",
		points: [
			"The same curriculum, mental model and model answers as the public course",
			"Sessions scheduled around your team, online or at the centre",
			"Examples and exercises taken from your own work where it helps",
			"A short report on each person's progress, if you want one",
		],
		link: { to: "/courses", label: "Browse the courses" },
	},
];
