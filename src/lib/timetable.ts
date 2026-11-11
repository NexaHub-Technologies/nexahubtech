import { CBT_DETAILS } from "./cbt";
import {
	CENTRE_SEATS,
	type Course,
	type Delivery,
	type Family,
} from "./courses";

/* The week, as the school actually runs it. There are no cohorts: a learner
   starts any day and joins one of these standing slots, and people at different
   points in the same course share a slot — the session notes, exercise briefs
   and model answers carry each person at their own pace, and the live time goes
   on explaining, reviewing and unsticking.

   The centre has one room. Every in-person slot below is in it, so no two may
   overlap, and each family is one instructor, who cannot be in two slots at
   once. timetable.test.ts holds both, and holds every in-person slot inside the
   opening hours the site publishes. */

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export const WEEKDAYS: readonly Weekday[] = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
];

/* CBT practice is not a course, but it uses the same room and the same
   instructor as the digital-skills courses, so it sits on the same timetable */
export type SlotFamily = Family | "cbt";

export const FAMILY_LABEL: Record<SlotFamily, string> = {
	digital: "Computer & office skills",
	development: "Development & data",
	video: "Video",
	cbt: "CBT exam practice",
};

/* who teaches each family. CBT shares the digital-skills instructor. */
export const INSTRUCTOR: Record<SlotFamily, string> = {
	digital: "digital",
	development: "development",
	video: "video",
	cbt: "digital",
};

export interface SessionSlot {
	id: string;
	family: SlotFamily;
	delivery: Delivery;
	days: Weekday[];
	/* 24-hour "HH:MM", Africa/Lagos */
	start: string;
	end: string;
	note?: string;
}

export const SLOTS: SessionSlot[] = [
	/* ── in the centre ── */
	{
		id: "development-mwf-morning",
		family: "development",
		delivery: "inhouse",
		days: ["Mon", "Wed", "Fri"],
		start: "08:30",
		end: "11:00",
	},
	{
		id: "digital-tt-morning",
		family: "digital",
		delivery: "inhouse",
		days: ["Tue", "Thu"],
		start: "08:30",
		end: "11:00",
	},
	{
		id: "digital-mwf-midday",
		family: "digital",
		delivery: "inhouse",
		days: ["Mon", "Wed", "Fri"],
		start: "11:30",
		end: "14:00",
	},
	{
		id: "video-tt-midday",
		family: "video",
		delivery: "inhouse",
		days: ["Tue", "Thu"],
		start: "11:30",
		end: "14:00",
		note: "Editing and theory in the centre; shoots on location are arranged on top",
	},
	{
		id: "development-tt-afternoon",
		family: "development",
		delivery: "inhouse",
		days: ["Tue", "Thu"],
		start: "14:00",
		end: "16:00",
	},
	{
		id: "cbt-weekday",
		family: "cbt",
		delivery: "inhouse",
		days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
		start: "16:00",
		end: "18:00",
		note: "Full Training and Crash Course",
	},
	{
		id: "digital-sat",
		family: "digital",
		delivery: "inhouse",
		days: ["Sat"],
		start: "09:00",
		end: "12:00",
		note: "For people who work on weekdays",
	},
	{
		id: "development-sat",
		family: "development",
		delivery: "inhouse",
		days: ["Sat"],
		start: "12:30",
		end: "15:30",
		note: "For people who work on weekdays",
	},
	{
		id: "cbt-sat",
		family: "cbt",
		delivery: "inhouse",
		days: ["Sat"],
		start: "15:30",
		end: "17:30",
		note: "Timed mock exams",
	},

	/* ── live online ── */
	{
		id: "development-mwf-evening",
		family: "development",
		delivery: "online",
		days: ["Mon", "Wed", "Fri"],
		start: "19:00",
		end: "21:00",
	},
	{
		id: "development-tt-evening",
		family: "development",
		delivery: "online",
		days: ["Tue", "Thu"],
		start: "19:00",
		end: "21:00",
	},
	{
		id: "video-mw-evening",
		family: "video",
		delivery: "online",
		days: ["Mon", "Wed"],
		start: "18:30",
		end: "20:00",
	},
];

/* the slots a course can be taken in: its own family, in a delivery it is
   actually offered in */
export function slotsFor(c: Course): SessionSlot[] {
	return SLOTS.filter((s) => s.family === c.family && c.fees[s.delivery]);
}

export function slotsIn(delivery: Delivery): SessionSlot[] {
	return SLOTS.filter((s) => s.delivery === delivery);
}

/* "16:00" → "4:00 PM", the same clock CBT_DETAILS.hours is written in */
export function clock(hhmm: string): string {
	const [h, m] = hhmm.split(":").map(Number);
	return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/* ["Mon","Tue","Wed","Thu","Fri"] → "Mon – Fri"; ["Mon","Wed","Fri"] → "Mon, Wed, Fri" */
export function daysLabel(days: Weekday[]): string {
	const idx = days.map((d) => WEEKDAYS.indexOf(d));
	const consecutive = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
	if (days.length > 2 && consecutive) return `${days[0]} – ${days.at(-1)}`;
	return days.join(", ");
}

export function slotLabel(s: SessionSlot): string {
	return `${daysLabel(s.days)} · ${clock(s.start)} – ${clock(s.end)}`;
}

export function seatsLabel(s: SessionSlot): string {
	return s.delivery === "inhouse"
		? `Up to ${CENTRE_SEATS} people, in the centre`
		: "Live online";
}

/* minutes since midnight, for overlap checks */
export const minutes = (hhmm: string) => {
	const [h, m] = hhmm.split(":").map(Number);
	return h * 60 + m;
};

export const CENTRE_HOURS = CBT_DETAILS.openingHours;
