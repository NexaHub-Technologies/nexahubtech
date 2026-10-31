import { CONTACT } from "./contact";

export interface CbtModule {
	n: string;
	title: string;
	description: string;
}

export interface CbtPackage {
	id: string;
	name: string;
	price: string;
	duration: string;
	badge?: string;
	features: string[];
	idealFor: string;
}

export interface CbtFaq {
	question: string;
	answer: string;
}

export interface CbtSampleQuestion {
	id: number;
	subject: string;
	question: string;
	options: {
		key: "A" | "B" | "C" | "D";
		text: string;
	}[];
	correct: "A" | "B" | "C" | "D";
	explanation: string;
}

export const CBT_DETAILS = {
	title: "WAEC & JAMB CBT Training",
	location: CONTACT.address,
	hours: "Monday – Saturday, 8:00 AM – 6:00 PM",
	/* the same hours for machines: the schema knowledge graph publishes these, and
	   cbt.test.ts fails if they stop agreeing with the line above */
	openingHours: {
		days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		opens: "08:00",
		closes: "18:00",
	},
	targetExams: ["JAMB UTME", "WAEC CB-WASSCE"],
} as const;

/* what a candidate practises, in the order the training gets to it */
export const CBT_PILLARS: CbtModule[] = [
	{
		n: "01",
		title: "Getting comfortable on a computer",
		description:
			"If you have rarely used a desktop, we start there: sitting, reading the screen, and moving around the exam software without fear.",
	},
	{
		n: "02",
		title: "The keyboard shortcuts",
		description:
			"A, B, C, D to answer, N and P to move, S to submit, R to go back. Keys keep working when a centre's mouse does not.",
	},
	{
		n: "03",
		title: "Pacing the clock",
		description:
			"How to split your time across four subjects, skip and return to hard questions, and use the on-screen calculator quickly.",
	},
	{
		n: "04",
		title: "Past questions and timed mocks",
		description:
			"Practice with past JAMB and WAEC questions, then full mock exams under exam conditions, with a review of what you got wrong.",
	},
];

export const CBT_PACKAGES: CbtPackage[] = [
	{
		id: "masterclass",
		name: "Full Training",
		price: "₦25,000",
		duration: "4 weeks · Mon – Fri",
		badge: "Most popular",
		features: [
			"2 hours of guided practice each day",
			"Keyboard shortcuts and on-screen calculator",
			"Past questions across your four subjects",
			"4 full mock exams with a review",
		],
		idealFor: "Candidates who want to be fully ready",
	},
	{
		id: "intensive-crash",
		name: "Crash Course",
		price: "₦15,000",
		duration: "2 weeks · Mon – Fri",
		features: [
			"Daily timed practice",
			"Speed drills on the keyboard and calculator",
			"2 full mock exams with a review",
		],
		idealFor: "Candidates whose exam is close",
	},
	{
		id: "walkin-mock",
		name: "One Mock Exam",
		price: "₦3,000",
		duration: "One 2-hour session",
		features: [
			"A full timed mock exam",
			"Your score by subject",
			"Feedback on your timing",
		],
		idealFor: "Anyone who wants to check where they stand",
	},
];

export const CBT_FAQS: CbtFaq[] = [
	{
		question: "I have rarely used a computer. Can I still join?",
		answer:
			"Yes. Many of our students start that way. We begin with the basics and move at your pace until the exam software feels familiar.",
	},
	{
		question: "Do I need to bring a laptop?",
		answer:
			"No. You practise on our desktop computers with full-size keyboards, the same kind of setup you will meet at the exam centre.",
	},
	{
		question: "Which subjects can I practise?",
		answer:
			"Use of English, Mathematics, Physics, Chemistry, Biology, Economics, Commerce, Government, Literature in English, Financial Accounting, CRS, IRS, Geography and Agricultural Science.",
	},
	{
		question: "Can a school or tutorial centre register a group?",
		answer:
			"Yes. Groups of friends, schools and study centres can all register as a group, and we can set aside morning or weekend sessions for them. Message us on WhatsApp to arrange it.",
	},
	{
		question: "Can I see the centre before I pay?",
		answer:
			"Yes. Walk in during opening hours, look at the lab, and take a short free placement test.",
	},
];

export const SAMPLE_CBT_QUESTIONS: CbtSampleQuestion[] = [
	{
		id: 1,
		subject: "Use of English",
		question:
			"Choose the option nearest in meaning to the word in quotes: The principal's speech was 'concise' and left no room for doubt.",
		options: [
			{ key: "A", text: "Long and detailed" },
			{ key: "B", text: "Brief and to the point" },
			{ key: "C", text: "Vague and confusing" },
			{ key: "D", text: "Emotional and moving" },
		],
		correct: "B",
		explanation: "'Concise' means saying a lot clearly in few words.",
	},
	{
		id: 2,
		subject: "Mathematics",
		question: "If 3^(2x − 1) = 81, find x.",
		options: [
			{ key: "A", text: "2" },
			{ key: "B", text: "2.5" },
			{ key: "C", text: "3" },
			{ key: "D", text: "5" },
		],
		correct: "B",
		explanation: "81 = 3⁴, so 2x − 1 = 4, which gives x = 2.5.",
	},
	{
		id: 3,
		subject: "Physics",
		question:
			"A 5 kg body at rest is pulled by a constant 20 N force on a smooth surface. What is its velocity after 4 seconds?",
		options: [
			{ key: "A", text: "8 m/s" },
			{ key: "B", text: "12 m/s" },
			{ key: "C", text: "16 m/s" },
			{ key: "D", text: "20 m/s" },
		],
		correct: "C",
		explanation: "a = F ÷ m = 4 m/s², and v = u + at = 0 + 4 × 4 = 16 m/s.",
	},
];
