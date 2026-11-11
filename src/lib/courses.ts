export interface CourseModule {
	n: string;
	t: string;
	d: string;
}

/* the one idea a course is really teaching. The three-part session structure is
   deliberately the same everywhere — that is the pedagogy — but the concept each
   track is trying to install is not, so it lives here rather than in a template. */
export interface MentalModel {
	/* the idea, named — short enough to carry around in your head */
	t: string;
	/* the idea, explained without jargon */
	d: string;
	/* what it lets you do once it lands */
	unlocks: string[];
}

/* what a visitor needs before day one, split the way the question actually gets
   asked: what do I need to know, and what do I need to have? Stated plainly so
   nobody pays for a course they can't take part in. */
export interface Requirements {
	/* who the course is pitched at, as a phrase that can finish a sentence */
	level: string;
	/* prior knowledge assumed — including, where it applies, that none is */
	know: string[];
	/* kit, accounts and the time it takes each week */
	have: string[];
}

/* how the course is actually delivered. This lives on the course record rather
   than as fixed copy in the route because it is not fixed: PC Basics is taught
   in person, and the course page told visitors it was online until somebody read
   the curriculum document and the page side by side. The document states the same
   thing in its Format row, and `src/lib/course-docs.test.ts` fails if the two
   disagree about whether a course is taught in person. */
export interface Format {
	/* the headline — how it is delivered, as a sentence */
	t: string;
	/* what that means in practice */
	d: string;
}

/* the projects a student builds, in summary. The full brief for each lives in
   docs/<course>/<project>.md — the course page shows only enough to know what you
   would come away having built. */
export interface CourseProject {
	n: string;
	/* the product's name. Empty where a course's projects are not yet named. */
	t: string;
	/* one line: what it is */
	d: string;
	weeks: string;
	capstone?: boolean;
}

/* The two ways a course can be taken. "inhouse" is a small group of at most
   six, in person at the Kubwa centre — the room seats six, so that number is a
   fact about the building, not a marketing figure. */
export type Delivery = "online" | "inhouse";
export const DELIVERIES: readonly Delivery[] = ["online", "inhouse"];

export const CENTRE_SEATS = 6;

export const DELIVERY_LABEL: Record<Delivery, string> = {
	online: "Live online",
	inhouse: `In Kubwa, max ${CENTRE_SEATS}`,
};

/* A fee is paid in full before the first session, or in equal instalments —
   which cost slightly more in total, because the school carries the wait.
   courses.test.ts holds every instalment plan inside that band. */
export interface Fee {
	upfront: number;
	instalments: { count: number; amount: number };
}

/* How the catalogue is grouped, in the order a learner climbs it. */
export type Level =
	| "start-here"
	| "developer"
	| "level-up"
	| "create"
	| "on-request";

export const LEVELS: { id: Level; t: string; d: string }[] = [
	{
		id: "start-here",
		t: "Start here",
		d: "For anyone new to computers or office software. Taught in person at the centre, where somebody can sit beside you.",
	},
	{
		id: "developer",
		t: "Become a developer",
		d: "From your first line of code to working applications. Live online, or in a small group at the centre.",
	},
	{
		id: "level-up",
		t: "Level up",
		d: "For people who already write code and want the frameworks, mobile and data work built on it.",
	},
	{
		id: "create",
		t: "Create",
		d: "Video, from the phone in your pocket to a piece properly shot, lit and edited.",
	},
	{
		id: "on-request",
		t: "On request",
		d: "Specialist courses that open when enough people have asked, so each one gets the instructor time it needs. Tell us you are interested and we will be in touch when it opens.",
	},
];

/* Which instructor teaches it, and so which of the weekly session slots it
   runs in. The school has one instructor per family. */
export type Family = "digital" | "development" | "video";

export interface Course {
	slug: string;
	t: string;
	d: string;
	tagline: string;
	duration: string;
	category: "learn" | "build";
	level: Level;
	family: Family;
	/* rolling: start any day, in an existing session slot. on-request: the
	   course opens once enough people have asked for it. */
	admission: "rolling" | "on-request";
	/* a course is offered in exactly the deliveries it has a fee for */
	fees: Partial<Record<Delivery, Fee>>;
	/* the natural next course. `upgrade` is what moving on costs when the next
	   course continues this one rather than starting fresh. */
	next?: { slug: string; upgrade?: number };
	/* a course that covers others in one track, priced below taking them apart */
	bundle?: { parts: string[] };
	format: Format;
	mentalModel: MentalModel;
	requirements: Requirements;
	projects: CourseProject[];
	modules: CourseModule[];
	session: { t: string; d: string }[];
	features: string[];
}

/* Most of the development courses are delivered identically, online or at the
   centre. They share one object rather than carrying a copy of the same
   paragraph each, which is how a single course quietly ends up describing
   itself wrongly. */
const ONLINE_OR_CENTRE: Format = {
	t: "Taught live — online, or in person at the centre.",
	d: `Take it live online from anywhere in Nigeria, with sessions and materials on WhatsApp — or in person at our Kubwa centre, in a group of at most ${CENTRE_SEATS}. Either way an instructor teaches you live, with structured materials and real feedback, and you start the day you are ready.`,
};

export const COURSES: Course[] = [
	{
		slug: "computer-essentials",
		t: "Computer Essentials",
		d: "Digital Literacy",
		tagline:
			"Three weeks from never having used a computer to saving, finding and printing your own work — with somebody beside you the whole way.",
		duration: "3 Weeks",
		category: "learn",
		level: "start-here",
		family: "digital",
		admission: "rolling",
		fees: {
			inhouse: { upfront: 45_000, instalments: { count: 2, amount: 25_000 } },
		},
		next: { slug: "pc-basics", upgrade: 35_000 },
		format: {
			t: "Taught in the centre, in person.",
			d: "The first three modules of PC Basics, on their own. Like PC Basics it is only taught in person at our Kubwa centre: a beginner needs somebody beside them saying that one, on the left, not a video call. Machines are provided, and you start whenever you are ready.",
		},
		mentalModel: {
			t: "Every screen is asking you something",
			d: "Nothing on a computer happens by itself. Every window, box and message is the machine asking a question and waiting for an answer — where to save this, whether to keep that, which of these you meant. Beginners click past the question to make it go away, and then believe the computer did something to them. Read the question first and the machine stops being unpredictable: it does what you told it, every time, and almost everything it did can be undone.",
			unlocks: [
				"Read a box before clicking it, and know what you are agreeing to",
				"Undo, close and recover without panicking",
				"Save your work where you meant to, and open it again tomorrow",
			],
		},
		requirements: {
			level: "The shortest way in if a computer still feels risky",
			know: [
				"Nothing about computers — this course assumes none",
				"How to read and write in English",
			],
			have: [
				"Nothing to buy — a machine is provided at every session",
				"A USB drive of any size, to take your work home",
				"3–4 hours a week outside sessions to practise",
			],
		},
		projects: [],
		modules: [
			{
				n: "01",
				t: "The machine, and what it is doing",
				d: "The parts, the desktop, the mouse and the keyboard — and why nothing you click can break it.",
			},
			{
				n: "02",
				t: "Files, folders and where things go",
				d: "Paths, saving, naming and copying — so your work is always somewhere you can find it.",
			},
			{
				n: "03",
				t: "Documents, numbers and slides",
				d: "A letter, a sum and a slide: enough of each to do real work, and to see what to learn next.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before anything is clicked.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just watch it being done.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"No computer experience assumed at all",
			"A machine provided at every session",
			"Files and folders taught properly, not guessed at",
			"A letter, a spreadsheet and a slide of your own",
			"Carry on into the full PC Basics course whenever you are ready",
		],
	},
	{
		slug: "pc-basics",
		t: "PC Basics",
		d: "Digital Literacy",
		tagline:
			"Start at the very beginning — the computer itself, and the confidence to use one without being afraid of breaking it.",
		duration: "6 Weeks",
		category: "learn",
		level: "start-here",
		family: "digital",
		admission: "rolling",
		fees: {
			inhouse: { upfront: 75_000, instalments: { count: 2, amount: 40_000 } },
		},
		next: { slug: "office-essentials" },
		format: {
			t: "Taught in the centre, in person.",
			d: "This course is only taught in person, and cannot be taught any other way: the first thing a beginner needs is somebody beside them saying that one, on the left. Sitting a person who has never used a computer in front of a video call asks them to use the very skill the course exists to teach. Machines are provided, and you start whenever you are ready.",
		},
		mentalModel: {
			t: "Everything lives somewhere",
			d: "A computer never puts anything nowhere. Every document you save, every photo you copy, every app you install goes to a place that has a name — and that name is a path you can read out loud. Beginners lose work because they believe the machine decides where things go. It does not: it asks, and the answer is usually a box that got clicked past. Once you can say where a thing is, you can find it again, copy it, back it up and share it — and the fear goes with the not knowing.",
			unlocks: [
				"Find any file you have saved, on any computer, without hunting",
				"Say what went wrong instead of starting the whole thing again",
				"Move your work between a laptop, a phone and the cloud without losing it",
			],
		},
		requirements: {
			level: "The place to begin if a computer still feels risky",
			know: [
				"Nothing about computers — this is the course that assumes none",
				"How to read and write in English",
				"If you can already use a smartphone, you are further ahead than you think",
			],
			have: [
				"A laptop running Windows, macOS or Linux — or use one of ours in the centre",
				"A phone that can receive SMS, for setting up accounts safely",
				"A USB drive of any size, for the backup you will actually restore from",
				"4–5 hours a week outside sessions to practise",
			],
		},
		projects: [],
		modules: [
			{
				n: "01",
				t: "The machine, and what it is doing",
				d: "The parts, the desktop, the mouse and the keyboard — and why nothing you click can break it.",
			},
			{
				n: "02",
				t: "Files, folders and where things go",
				d: "Paths, saving, naming, copying and backing up. The module the whole course is built on.",
			},
			{
				n: "03",
				t: "Documents, numbers and slides",
				d: "Write a letter properly, make a spreadsheet do the arithmetic, and build a deck worth showing.",
			},
			{
				n: "04",
				t: "The internet, email and accounts",
				d: "Browse, search well, judge what you find, and set up an account you can get back into.",
			},
			{
				n: "05",
				t: "Staying safe, and getting unstuck",
				d: "Scams, passwords and privacy — plus how to describe a problem well enough to be helped.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before anything is clicked.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just watch it being done.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"No computer experience assumed at all",
			"Files and folders taught properly, not guessed at",
			"Word processing, spreadsheets and slides",
			"Email, accounts and staying safe from scams",
			"Machines available in the centre if you do not own one",
		],
	},
	{
		slug: "office-essentials",
		t: "Office Essentials",
		d: "Word & Excel",
		tagline:
			"The two programs most office work actually happens in — Word and Excel — in four weeks, taught properly.",
		duration: "4 Weeks",
		category: "learn",
		level: "start-here",
		family: "digital",
		admission: "rolling",
		fees: {
			inhouse: { upfront: 55_000, instalments: { count: 2, amount: 30_000 } },
		},
		next: { slug: "microsoft-office" },
		format: {
			t: "Taught in the centre, in person.",
			d: `Taught in person at our Kubwa centre, in a group of at most ${CENTRE_SEATS}, on licensed Windows machines — with work from your own desk open in front of you. You start the day you are ready. Teams can also be trained at their own office.`,
		},
		mentalModel: {
			t: "Type it once",
			d: "Almost every slow afternoon in an office comes from typing the same thing twice: the heading reformatted by hand on every page, the letter retyped for every name, the total worked out on a calculator and keyed into a cell. Word and Excel are both built to stop that. Say once what a heading looks like, and every heading follows. Write a formula once, and it answers every time the numbers change. The skill is noticing the moment you are about to repeat yourself — and handing the repetition to the program.",
			unlocks: [
				"Restyle a whole document with one change",
				"Send one letter to a hundred people without retyping it",
				"Build a sheet whose totals are still right after the numbers change",
			],
		},
		requirements: {
			level:
				"Built for office staff who use Word and Excel but were never shown how",
			know: [
				"How to use a computer — files, folders, saving, email",
				"You have opened Word and Excel before, even if nobody showed you how",
			],
			have: [
				"Nothing to buy — licensed Windows machines are provided in the centre",
				"Work from your own desk to bring, or use the sample desk we supply",
				"3–4 hours a week outside sessions to practise",
			],
		},
		projects: [],
		modules: [
			{
				n: "01",
				t: "Word: styles, not formatting",
				d: "Headings, templates and long documents built so that one change restyles all of them.",
			},
			{
				n: "02",
				t: "Word: one letter, many people",
				d: "Mail merge from a list — including the rows where the list is not clean.",
			},
			{
				n: "03",
				t: "Excel: a clean table that does the arithmetic",
				d: "One row per thing, one column per fact, and every total a formula.",
			},
			{
				n: "04",
				t: "Excel: lookups and a summary that updates",
				d: "Join two lists, summarise many rows, and chart one answer.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before anything is clicked.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just watch it being done.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Word and Excel only — the two programs most office work happens in",
			"Styles, templates and mail merge",
			"Clean tables, formulas and lookups",
			"Built around real work from your own desk",
			"Licensed machines provided in the centre",
		],
	},
	{
		slug: "microsoft-office",
		t: "Microsoft Office",
		d: "Word, Excel, PowerPoint & Access",
		tagline:
			"The four programs an office actually runs on, taught to the standard the work deserves.",
		duration: "8 Weeks",
		category: "learn",
		level: "start-here",
		family: "digital",
		admission: "rolling",
		fees: {
			inhouse: { upfront: 95_000, instalments: { count: 2, amount: 52_500 } },
		},
		next: { slug: "data-analysis" },
		format: {
			t: "Taught in the centre, in person.",
			d: `Office work is learnt at a real desk, on a real machine, with your own files open — so this course is taught in person at our Kubwa centre, in a group of at most ${CENTRE_SEATS}, on licensed Windows machines. Bring work from your own desk, start the day you are ready, and leave each session with something that already runs better. Teams can also be trained at their own office.`,
		},
		mentalModel: {
			t: "The data is not the document",
			d: "Each of these four programs keeps two things apart, and nearly every hour a self-taught office worker loses comes from mixing them up. There is the information — names, amounts, dates, records — and there is the way it happens to be laid out today. A style, a formula, a slide master and a query are all the same move: describe the presentation once, point it at the data, and let the program redraw it. Type the answer in by hand instead and you have made something that is correct exactly once, and wrong the first time anything changes.",
			unlocks: [
				"Change a hundred pages, or ten thousand rows, with one edit",
				"Hand over a file a colleague can safely change without breaking it",
				"Know which of the four programs a job actually belongs in",
			],
		},
		requirements: {
			level: "Built for clerical and office staff already doing the work",
			know: [
				"How to use a computer confidently — files, folders, saving, email",
				"You have opened Word and Excel before, even if nobody showed you how",
				"No formulas, no databases and no macros are assumed",
			],
			have: [
				"A Windows PC — Access is not made for macOS, and module 05 is Access",
				"A Microsoft 365 or Office licence, or use a licensed machine in the centre",
				"Real work from your own desk to bring, or use the sample desk we supply",
				"4–6 hours a week outside sessions to practise",
			],
		},
		projects: [],
		modules: [
			{
				n: "01",
				t: "Word, properly",
				d: "Styles, templates, long documents and mail merge — the difference between typing and producing.",
			},
			{
				n: "02",
				t: "PowerPoint that carries a decision",
				d: "Slide masters, and a deck that still works when it is read without you in the room.",
			},
			{
				n: "03",
				t: "Excel: the data table and its formulas",
				d: "One clean table, honest columns, and every figure a formula that recalculates.",
			},
			{
				n: "04",
				t: "Excel: lookups, pivots and reporting",
				d: "Joining two sheets, summarising thousands of rows, and charts that answer one question.",
			},
			{
				n: "05",
				t: "Access: tables, relationships and queries",
				d: "When a spreadsheet stops being the right answer, and what a database does instead.",
			},
			{
				n: "06",
				t: "Choosing the right tool, and handing over",
				d: "Which of the four a job belongs in, and how to leave work a colleague can run.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before anything is clicked.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just watch it being done.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Word, Excel, PowerPoint and Access in one path",
			"Mail merge, lookups, pivot tables and relational queries",
			"Built around real clerical work, not invented exercises",
			"When to stop using a spreadsheet and start using a database",
			"Licensed machines available in the centre",
		],
	},
	{
		slug: "python-programming",
		t: "Python Programming",
		d: "",
		tagline:
			"Learn programming from scratch with Python — the language that powers everything from scripts to AI.",
		duration: "6 Weeks",
		category: "learn",
		level: "developer",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 95_000, instalments: { count: 2, amount: 52_500 } },
			inhouse: { upfront: 115_000, instalments: { count: 2, amount: 62_500 } },
		},
		next: { slug: "data-analysis" },
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "Names are labels, not boxes",
			d: "A variable in Python is a name tied to an object, not a container holding one. Two names can point at the same list. Passing a value to a function passes the label, not a copy. This one idea explains almost every surprise a beginner runs into — mutation, identity, default arguments — and turns programming into watching data change shape rather than memorising syntax.",
			unlocks: [
				"Predict when a change is shared and when it is copied",
				"Read an error as a question about types and identity",
				"Reason about what code does before you run it",
			],
		},
		requirements: {
			level: "The right place to start if you have never coded",
			know: [
				"How to use a computer — files, folders, installing software",
				"No programming experience of any kind",
			],
			have: [
				"A laptop with 4GB of RAM or more (Windows, macOS or Linux)",
				"A stable internet connection for live sessions",
				"5–7 hours a week outside sessions for exercises",
			],
		},
		projects: [
			{
				n: "1",
				t: "Rent Book",
				d: "a landlord's rent report, rebuilt from a messy script",
				weeks: "1–2",
			},
			{
				n: "2",
				t: "Rate Watch",
				d: "a daily exchange-rate recorder that survives interruption",
				weeks: "3–4",
			},
			{
				n: "3",
				t: "Errand, Meter or Fare",
				d: "your choice of three",
				weeks: "5–6",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "How programming works",
				d: "Variables, logic, and control flow — the universal building blocks of code.",
			},
			{
				n: "02",
				t: "Functions & data structures",
				d: "Organize your code and your data. Lists, dictionaries, and clean function design.",
			},
			{
				n: "03",
				t: "Working with files & APIs",
				d: "Read, write, and fetch data. Connect your scripts to the real world.",
			},
			{
				n: "04",
				t: "Object-oriented Python",
				d: "Classes, objects, and when OOP actually helps — not just when it adds noise.",
			},
			{
				n: "05",
				t: "Building a project",
				d: "Put it all together into something real you can show and explain.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Python from first principles",
			"Data structures, functions, and OOP",
			"File handling and API integration",
			"Real-world project at the end",
			"No prior coding experience required",
		],
	},
	{
		slug: "javascript-programming",
		t: "JavaScript Programming",
		d: "Browser & Node.js",
		tagline:
			"Learn JavaScript as a language — the same core that runs in a browser and on a server.",
		duration: "8 Weeks",
		category: "learn",
		level: "developer",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 95_000, instalments: { count: 2, amount: 52_500 } },
			inhouse: { upfront: 115_000, instalments: { count: 2, amount: 62_500 } },
		},
		next: { slug: "react-development" },
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "The language is small; the runtime is the rest",
			d: "Most of what people call JavaScript is not JavaScript. Values, functions, objects and the event loop are the language, and they are identical everywhere it runs. The DOM, fetch, the file system, timers — those are whatever the host happens to hand you. Once you can tell the two apart, moving between a browser and Node stops being a new language to learn and becomes a new set of tools around one you already have.",
			unlocks: [
				"Tell a language feature from something the host handed you",
				"Move the same code between a browser and Node deliberately",
				"Read an unfamiliar API as a runtime detail rather than a mystery",
			],
		},
		requirements: {
			level:
				"For beginners, and for anyone who has only ever copied JavaScript",
			know: [
				"How to use a computer confidently — files, folders, installing software",
				"No prior JavaScript; the course starts at values and builds up",
				"A little HTML helps with the browser exercises, but is not assumed",
			],
			have: [
				"A laptop with 4GB of RAM or more (Windows, macOS or Linux)",
				"Node.js installed — the first session covers it if you haven't",
				"6–8 hours a week outside sessions for exercises and the project",
			],
		},
		projects: [
			{
				n: "1",
				t: "Tender",
				d: "a money library with no host APIs anywhere in it",
				weeks: "1–3",
			},
			{
				n: "2",
				t: "Steady and Digits",
				d: "async utilities, and one core in two runtimes",
				weeks: "4–6",
			},
			{
				n: "3",
				t: "Roster",
				d: "a duty rota with a Node half and a browser half",
				weeks: "7–8",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "Values and how JavaScript thinks",
				d: "Primitives, objects and coercion. Why == surprises people and === does not — from the rules themselves rather than a list of things to avoid.",
			},
			{
				n: "02",
				t: "Functions, scope & closures",
				d: "Functions as values, scope as nested boxes, and the closure — the single idea holding up callbacks, modules and most of the language.",
			},
			{
				n: "03",
				t: "Objects, arrays & the prototype chain",
				d: "How a property lookup actually resolves. Prototypes as a chain you can follow, and the array methods that replace most of the loops you would have written.",
			},
			{
				n: "04",
				t: "Asynchrony & the event loop",
				d: "One thread and a queue. Callbacks, promises and async/await turn out to be three views of the same machinery, which is why mixing them goes wrong.",
			},
			{
				n: "05",
				t: "Modules and the two runtimes",
				d: "The same language in a browser and in Node. What each host provides, what it withholds, and how to write code that does not care which one it lands in.",
			},
			{
				n: "06",
				t: "Building on both sides",
				d: "One project with a Node half and a browser half, so the split between language and runtime stops being theory and becomes something you have used.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"JavaScript as a language, not as a framework",
			"Closures, prototypes and the event loop from first principles",
			"The same core code running in the browser and on Node.js",
			"Callbacks, promises and async/await, and when each belongs",
			"A capstone using Node core modules and real browser APIs",
		],
	},
	{
		slug: "frontend-development",
		t: "Frontend Development",
		d: "",
		tagline:
			"Learn the web from first principles — HTML, CSS, and JavaScript done properly.",
		duration: "10 Weeks",
		category: "learn",
		level: "developer",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 120_000, instalments: { count: 2, amount: 65_000 } },
			inhouse: { upfront: 145_000, instalments: { count: 2, amount: 77_500 } },
		},
		next: { slug: "backend-development" },
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "You describe; the browser draws",
			d: "You never place a pixel yourself. You hand the browser a document and a set of rules, and it computes the result — structure first, then layout, then paint. Once CSS reads as constraints you hand a layout engine rather than positions you set by hand, “why is it doing that?” stops being a mystery and becomes a question you can reason your way to.",
			unlocks: [
				"Predict a layout instead of nudging numbers until it looks right",
				"Explain why a rule lost, rather than reaching for !important",
				"Build pages that hold up on screens you have never seen",
			],
		},
		requirements: {
			level: "Built for complete beginners",
			know: [
				"Basic computer literacy — files, folders, installing software",
				"No HTML, CSS or JavaScript; every one of them starts from zero here",
			],
			have: [
				"A laptop with 4GB of RAM or more (8GB is far more comfortable)",
				"A stable internet connection for live sessions",
				"6–8 hours a week outside sessions for exercises",
			],
		},
		projects: [
			{
				n: "1",
				t: "Stitch",
				d: "a tailor's shop site, from a supplied design",
				weeks: "1–4",
			},
			{
				n: "2",
				t: "Shelf",
				d: "a book finder over a real, incomplete catalogue",
				weeks: "5–8",
			},
			{
				n: "3",
				t: "Signboard",
				d: "a business site with a quote builder",
				weeks: "9–10",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "How the web works",
				d: "The mental model first — what a browser is really doing before you write a single tag.",
			},
			{
				n: "02",
				t: "HTML, structurally",
				d: "Markup as meaning. Build pages that are readable to people, browsers, and assistive tech.",
			},
			{
				n: "03",
				t: "CSS & layout",
				d: "From the box model to modern layout — styling with intent instead of guesswork.",
			},
			{
				n: "04",
				t: "JavaScript foundations",
				d: "Values, logic, and the DOM. How to make a page think, step by careful step.",
			},
			{
				n: "05",
				t: "Building something real",
				d: "Put it together into a project you understand end to end — and can explain.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"HTML, CSS, and JavaScript from scratch",
			"Chunk-based teaching that builds understanding",
			"Structured session notes and exercise briefs",
			"Real project at the end of the track",
			"Built to grow real engineering intuition",
		],
	},
	{
		slug: "backend-development",
		t: "Backend Development",
		d: "",
		tagline:
			"Build the engine behind applications — APIs, databases, and server-side logic.",
		duration: "8 Weeks",
		category: "learn",
		level: "developer",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 110_000, instalments: { count: 2, amount: 60_000 } },
			inhouse: { upfront: 135_000, instalments: { count: 2, amount: 72_500 } },
		},
		next: { slug: "nextjs-fullstack" },
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "A server is a function you can call over a wire",
			d: "Strip away the frameworks and a backend does one thing: it takes a request and returns a response. What makes it hard is that it does this for many people at once, and it remembers things between calls. Hold those two apart — the translation, and the state it touches — and routing, middleware, databases and auth each drop into place.",
			unlocks: [
				"Design an API by its contract before writing its code",
				"Separate what a request returns from what it changes",
				"See where two users at the same moment would break your logic",
			],
		},
		requirements: {
			level: "Open to beginners; smoother with some programming",
			know: [
				"Basic programming in any language — variables, loops, functions",
				"Comfort with the terminal, or the willingness to learn it in week one",
				"No server, API or database experience needed",
			],
			have: [
				"A laptop with 8GB of RAM or more (Windows, macOS or Linux)",
				"A stable internet connection for live sessions",
				"6–8 hours a week outside sessions for exercises",
			],
		},
		projects: [
			{
				n: "1",
				t: "Alafia",
				d: "a pharmacy API whose rules live in the database",
				weeks: "1–4",
			},
			{
				n: "2",
				t: "Gatepass",
				d: "a visitor-pass API, then attacked by its own author",
				weeks: "5–6",
			},
			{
				n: "3",
				t: "Buka",
				d: "a canteen ordering API, deployed",
				weeks: "7–8",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "How servers work",
				d: "Requests, responses, and the HTTP lifecycle — the foundation everything else sits on.",
			},
			{
				n: "02",
				t: "Node.js & Express",
				d: "Build your first API. Routes, middleware, and the patterns that make backends tick.",
			},
			{
				n: "03",
				t: "Databases & data modeling",
				d: "Store, query, and relate data. SQL or NoSQL — understanding the tradeoffs.",
			},
			{
				n: "04",
				t: "Authentication & security",
				d: "Sessions, tokens, and the basics of keeping users and data safe.",
			},
			{
				n: "05",
				t: "Deploying your API",
				d: "Ship it. Get your backend running in the real world, not just on your machine.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Node.js and Express from first principles",
			"RESTful API design and database integration",
			"Authentication, security, and deployment",
			"Real-world backend architecture patterns",
			"Taught live with hands-on exercises — start any time",
		],
	},
	{
		slug: "web-development-fullstack",
		t: "Web Development",
		d: "Fullstack",
		tagline:
			"Learn frontend and backend in one complete path — from first principles to full applications.",
		duration: "18 Weeks",
		category: "learn",
		level: "developer",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 200_000, instalments: { count: 3, amount: 75_000 } },
			inhouse: { upfront: 240_000, instalments: { count: 3, amount: 87_500 } },
		},
		next: { slug: "react-development" },
		bundle: { parts: ["frontend-development", "backend-development"] },
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "Two computers, one conversation",
			d: "A browser and a server are separate machines that only ever pass text between them. One asks; the other answers. Every framework, database and deployment step you will ever meet is a refinement of that single exchange — so when something breaks, you always have a first question worth asking: which side is this happening on, and what did it actually send?",
			unlocks: [
				"Locate a bug on the right side of the wire before touching code",
				"Read any new framework as a variation on request and response",
				"Decide where a piece of data should live, and say why",
			],
		},
		requirements: {
			level: "Built for complete beginners",
			know: [
				"How to use a computer confidently — files, folders, installing software",
				"Enough English to read technical writing without a struggle",
				"No coding at all; the first module starts at how the web works",
			],
			have: [
				"A laptop with 8GB of RAM or more (Windows, macOS or Linux)",
				"A stable internet connection for live sessions",
				"6–8 hours a week outside sessions for exercises and projects",
			],
		},
		projects: [
			{
				n: "1",
				t: "Ajo",
				d: "a savings club's site, correct before it is styled",
				weeks: "1–5",
			},
			{
				n: "2",
				t: "Òjò",
				d: "a rain check across Nigerian towns",
				weeks: "6–9",
			},
			{
				n: "3",
				t: "Slot",
				d: "a booking API with no browser side at all",
				weeks: "10–14",
			},
			{
				n: "4",
				t: "Found",
				d: "a deployed lost-and-found board",
				weeks: "15–18",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "How the web works",
				d: "The mental model first — what a browser and server are really doing before you write a single line of code.",
			},
			{
				n: "02",
				t: "HTML & structure",
				d: "Markup as meaning. Build pages that are readable to people, browsers, and assistive tech.",
			},
			{
				n: "03",
				t: "CSS & layout",
				d: "From the box model to modern layout — styling with intent instead of guesswork.",
			},
			{
				n: "04",
				t: "JavaScript foundations",
				d: "Values, logic, and the DOM. How to make a page think, step by careful step.",
			},
			{
				n: "05",
				t: "Backend with Node.js",
				d: "Servers, routes, and databases. Build an API that powers your frontend.",
			},
			{
				n: "06",
				t: "Fullstack project",
				d: "Put it all together into a complete application you understand end to end.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Frontend and Backend in one 18-week track",
			"HTML, CSS, JavaScript, and Node.js",
			"Database integration and API design",
			"Capstone fullstack project",
			"Taught live with structured materials — start any time",
		],
	},
	{
		slug: "react-development",
		t: "React",
		d: "Intermediate to Advanced",
		tagline:
			"Go beyond the basics — build React applications that stay understandable as they grow.",
		duration: "8 Weeks",
		category: "learn",
		level: "level-up",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 130_000, instalments: { count: 2, amount: 70_000 } },
			inhouse: { upfront: 160_000, instalments: { count: 2, amount: 87_500 } },
		},
		next: { slug: "nextjs-fullstack" },
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "The screen is a function of state",
			d: "You don't update the page. You change state, describe what the page should look like for any given state, and let React work out the difference. Every stale value, surprise re-render and “why didn't it update?” dissolves once you stop listing the steps to change the screen and start describing what the screen is for the data you hold.",
			unlocks: [
				"Put state in the right place the first time",
				"Read a re-render as a consequence, not a mystery",
				"Delete the effects you never needed",
			],
		},
		requirements: {
			level: "Assumes you already write JavaScript",
			know: [
				"JavaScript to a working standard — functions, arrays, promises, modules",
				"HTML and CSS well enough to build a page without a framework",
				"The basics of React, even shakily: components, props, useState",
				"The terminal and git for everyday work",
			],
			have: [
				"A laptop with 8GB of RAM or more, with Node.js installed",
				"A code editor you are already comfortable in",
				"6–8 hours a week outside sessions for exercises and a project",
			],
		},
		projects: [
			{
				n: "1",
				t: "Roll Call",
				d: "an attendance register whose state is in the right places",
				weeks: "1–3",
			},
			{
				n: "2",
				t: "Cashbook and Ticker",
				d: "supplied code, refactored and profiled",
				weeks: "4–6",
			},
			{
				n: "3",
				t: "Waybill",
				d: "a dispatch job board with tested logic",
				weeks: "7–8",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "How React actually works",
				d: "Rendering, reconciliation, and why the screen updates when it does — the model behind the API.",
			},
			{
				n: "02",
				t: "State, placed properly",
				d: "Where state belongs, when to lift it, and how to design it so whole classes of bugs stop existing.",
			},
			{
				n: "03",
				t: "Effects & the outside world",
				d: "Data fetching, subscriptions, and cleanup — plus learning when you don't need an effect at all.",
			},
			{
				n: "04",
				t: "Composition & custom hooks",
				d: "The patterns that keep components small and share logic without tangling a codebase.",
			},
			{
				n: "05",
				t: "Performance, measured",
				d: "Memoisation, list rendering, and profiling. Making it fast on evidence rather than on instinct.",
			},
			{
				n: "06",
				t: "Architecture at scale",
				d: "Structure, data layers, and testing — the decisions that decide whether an app ages well.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"For developers already comfortable with JavaScript",
			"Hooks, composition, and custom hook design",
			"Rendering behaviour, reconciliation, and profiling",
			"State management and data-fetching patterns",
			"An advanced project built to production standards",
		],
	},
	{
		slug: "nextjs-fullstack",
		t: "Next.js",
		d: "Fullstack React",
		tagline:
			"Build fullstack applications on the React metaframework — routing, rendering, and data in one stack.",
		duration: "10 Weeks",
		category: "learn",
		level: "level-up",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 160_000, instalments: { count: 2, amount: 87_500 } },
			inhouse: { upfront: 195_000, instalments: { count: 2, amount: 105_000 } },
		},
		next: { slug: "mobile-development" },
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "One codebase, two machines",
			d: "Your code runs in two places — a server you control and a browser you don't — and Next.js lets you write both in one file tree. Nearly every decision it asks of you is the same question wearing different clothes: which machine should this run on, and what has to travel between them? Server or client, where to fetch, what to cache.",
			unlocks: [
				"Choose server or client deliberately, not by trial and error",
				"See at once why a secret must never cross the boundary",
				"Read caching and revalidation as questions about that line",
			],
		},
		requirements: {
			level: "Assumes you already write React",
			know: [
				"React in practice — components, state, hooks and composition",
				"JavaScript's async model: promises and async/await",
				"Enough HTTP to know what a request, a response and a status code are",
				"The terminal and git for everyday work",
			],
			have: [
				"A laptop with 8GB of RAM or more, with Node.js installed",
				"A GitHub account, for deploying the capstone",
				"8–10 hours a week outside sessions for the fullstack project",
			],
		},
		projects: [
			{
				n: "1",
				t: "Danfo",
				d: "a bus-route directory, rebuilt off the client",
				weeks: "1–3",
			},
			{
				n: "2",
				t: "Pump",
				d: "a price board that stays fresh on purpose",
				weeks: "4–6",
			},
			{
				n: "3",
				t: "Marksheet",
				d: "a results portal where roles actually hold",
				weeks: "7–8",
			},
			{
				n: "4",
				t: "Owambe",
				d: "an event page, shipped to production",
				weeks: "9–10",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "Why a metaframework",
				d: "What Next.js adds on top of React, and which problems it exists to solve for you.",
			},
			{
				n: "02",
				t: "Routing & layouts",
				d: "File-based routing, nested layouts, and loading states that appear in the right order.",
			},
			{
				n: "03",
				t: "Server & client components",
				d: "Where your code runs, why it matters, and how to draw the boundary deliberately.",
			},
			{
				n: "04",
				t: "Data, caching & mutations",
				d: "Server actions, caching, and revalidation — keeping data fresh without guesswork.",
			},
			{
				n: "05",
				t: "Auth, databases & APIs",
				d: "Sessions, route handlers, and wiring a real backend into the same codebase.",
			},
			{
				n: "06",
				t: "Rendering & deployment",
				d: "Static, dynamic, and streaming — then shipping the whole thing to production.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"The App Router taught from first principles",
			"Server components, server actions, and caching",
			"Database, authentication, and APIs in one project",
			"Rendering strategies, SEO, and performance",
			"Fullstack capstone deployed to production",
		],
	},
	{
		slug: "mobile-development",
		t: "Mobile Development",
		d: "",
		tagline: "Build real mobile applications — from concept to the app store.",
		duration: "12 Weeks",
		category: "build",
		level: "level-up",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 190_000, instalments: { count: 2, amount: 102_500 } },
			inhouse: { upfront: 230_000, instalments: { count: 2, amount: 125_000 } },
		},
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "Your app is a guest, not the host",
			d: "A phone interrupts you. A call arrives, the user switches away, the system reclaims your memory, the network vanishes halfway through a tap. A mobile app isn't a program that runs from start to finish — it is something that has to survive being paused, resumed and quietly destroyed, and still look to the person holding it as though it never left.",
			unlocks: [
				"Treat state as something that must survive being killed",
				"Design for a slow or absent network as the normal case",
				"Work with the platform lifecycle instead of against it",
			],
		},
		requirements: {
			level: "Assumes you can already program",
			know: [
				"JavaScript, or another modern language, to a working standard",
				"What an API call is — sending a request and handling the reply",
				"The terminal and git for everyday work",
			],
			have: [
				"A laptop with 8GB of RAM or more; macOS if you intend to build for iOS",
				"An Android or iOS phone to test on",
				"8–10 hours a week outside sessions for building",
			],
		},
		projects: [
			{
				n: "1",
				t: "Lineup",
				d: "an event app that survives the operating system",
				weeks: "1–4",
			},
			{
				n: "2",
				t: "Tally",
				d: "a shop log that works with no network at all",
				weeks: "5–8",
			},
			{
				n: "3",
				t: "Kiosk",
				d: "classifieds, tested and submitted",
				weeks: "9–12",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "Mobile development foundations",
				d: "How mobile platforms work — native vs cross-platform, and choosing your path.",
			},
			{
				n: "02",
				t: "UI components & navigation",
				d: "Build screens that feel right. Layouts, gestures, and moving between views.",
			},
			{
				n: "03",
				t: "State & data management",
				d: "Keep your app responsive as complexity grows — local state, global state, and syncing.",
			},
			{
				n: "04",
				t: "APIs and backend integration",
				d: "Connect your app to real data. Fetching, caching, and handling offline.",
			},
			{
				n: "05",
				t: "Testing & publishing",
				d: "Make it reliable, then ship it. Testing strategies and app store deployment.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Cross-platform mobile development",
			"UI/UX best practices for mobile",
			"State management and API integration",
			"Testing and app store deployment",
			"Capstone mobile project",
		],
	},
	{
		slug: "data-analysis",
		t: "Data Analysis",
		d: "",
		tagline:
			"Turn raw data into clear insights — with Python, SQL, and real analytical thinking.",
		duration: "10 Weeks",
		category: "learn",
		level: "level-up",
		family: "development",
		admission: "rolling",
		fees: {
			online: { upfront: 130_000, instalments: { count: 2, amount: 70_000 } },
			inhouse: { upfront: 160_000, instalments: { count: 2, amount: 87_500 } },
		},
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "Data answers the question you actually asked",
			d: "Every number in a dataset is the residue of a decision somebody made — what to record, what to leave out, how to count it. Analysis is less about tools than about keeping the question, the data and the claim honestly aligned. The real skill is noticing the gap between what you want to know and what this data can actually tell you.",
			unlocks: [
				"Spot a misleading chart — including one of your own",
				"Tell a real result from noise, and say which it is",
				"State plainly what a finding does and does not support",
			],
		},
		requirements: {
			level: "Open to beginners who enjoy a question",
			know: [
				"Secondary-school maths — percentages, averages, reading a chart",
				"Basic spreadsheet use, even if only the fundamentals",
				"No Python or SQL; both are taught here from the ground up",
			],
			have: [
				"A laptop with 8GB of RAM or more, for working with real datasets",
				"A stable internet connection for live sessions",
				"6–8 hours a week outside sessions for exercises",
			],
		},
		projects: [
			{
				n: "1",
				t: "Kasuwa Eight",
				d: "eight questions answered in SQL, and checked",
				weeks: "1–3",
			},
			{
				n: "2",
				t: "Basket",
				d: "an NBS food-price release cleaned, with the decisions logged",
				weeks: "4–6",
			},
			{
				n: "3",
				t: "Second Opinion",
				d: "one finding, two honest charts",
				weeks: "7–8",
			},
			{
				n: "4",
				t: "Budget Line, Ward or Grid",
				d: "your choice of three",
				weeks: "9–10",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "Thinking with data",
				d: "Asking the right questions. What data can tell you — and what it can't.",
			},
			{
				n: "02",
				t: "SQL for analysis",
				d: "Query, filter, and join data. Get comfortable pulling insights from real databases.",
			},
			{
				n: "03",
				t: "Python for data",
				d: "Pandas, NumPy, and Jupyter. Clean, transform, and explore datasets efficiently.",
			},
			{
				n: "04",
				t: "Visualization & storytelling",
				d: "Charts, dashboards, and narratives. Make your findings clear and compelling.",
			},
			{
				n: "05",
				t: "A real analysis project",
				d: "Take a dataset from question to insight to presentation.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"SQL and Python for data work",
			"Data cleaning and transformation",
			"Visualization with real datasets",
			"Analytical thinking and storytelling",
			"Capstone analysis project",
		],
	},
	{
		slug: "mobile-videography",
		t: "Mobile Videography",
		d: "Phone video & editing",
		tagline:
			"Shoot, light, record and edit video worth watching — on the phone you already own.",
		duration: "4 Weeks",
		category: "build",
		level: "create",
		family: "video",
		admission: "rolling",
		fees: {
			online: { upfront: 50_000, instalments: { count: 2, amount: 27_500 } },
		},
		next: { slug: "videography-video-editing" },
		format: {
			t: "Taught live, online.",
			d: "Everything here is done on a phone, so it is taught live online — from anywhere in Nigeria, with sessions and materials on WhatsApp and your clips reviewed between sessions. You start the day you are ready. When you want cameras, lights and an edit suite, Videography & Video Editing is the next step.",
		},
		mentalModel: {
			t: "The edit starts when you press record",
			d: "On a phone, the camera is never the limit — the decisions are. Where you stand, what is in the frame, where the light comes from and how close the microphone is are all settled before you press record, and no editing app can fix them afterwards. Shoot as if you are already in the edit: hold each shot long enough to cut, get the sound clean, and film the moment before and after. Then editing stops being rescue work and becomes what it should be — choosing.",
			unlocks: [
				"Shoot clips that cut together, instead of clips you have to rescue",
				"Get clean sound from a phone without buying anything",
				"Edit a short piece for a real purpose and export it properly",
			],
		},
		requirements: {
			level: "Built for complete beginners with a phone",
			know: [
				"No filming or editing experience",
				"How to install an app and move files on your phone",
			],
			have: [
				"A phone that records at 1080p or better, with 10GB free",
				"A free phone editing app — we say which in the first session",
				"A stable internet connection for live sessions",
				"3–4 hours a week for shooting and editing assignments",
			],
		},
		projects: [],
		modules: [
			{
				n: "01",
				t: "The phone as a camera",
				d: "Framing, focus and exposure lock, holding it steady, and shooting so the clips will cut.",
			},
			{
				n: "02",
				t: "Light and sound you already have",
				d: "Windows, shade and a quiet room: clean light and clean audio without buying kit.",
			},
			{
				n: "03",
				t: "Editing on the phone",
				d: "Cutting, pacing, captions and music in a free editing app — and the decisions behind them.",
			},
			{
				n: "04",
				t: "A short for a real purpose",
				d: "Plan, shoot, edit and export a finished short for a business, a church or an event.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before anything is filmed.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked example to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Everything done on the phone you already own",
			"Framing, light and sound without buying kit",
			"Editing in a free phone app",
			"A finished short for a real purpose",
			"Taught live online — start any day",
		],
	},
	{
		slug: "videography-video-editing",
		t: "Videography & Video Editing",
		d: "",
		tagline:
			"Capture and craft video content that communicates — from shooting to final cut.",
		duration: "8 Weeks",
		category: "build",
		level: "create",
		family: "video",
		admission: "rolling",
		fees: {
			inhouse: { upfront: 120_000, instalments: { count: 2, amount: 65_000 } },
		},
		format: {
			t: "Taught in the centre, in person, with shoots on location.",
			d: `Cameras, lights and an edit suite are learnt with your hands on them, so this course is taught in person at our Kubwa centre, in a group of at most ${CENTRE_SEATS} — with shooting assignments out on location between sessions. You start the day you are ready. New to video, with only a phone? Mobile Videography is the online way in.`,
		},
		mentalModel: {
			t: "You are directing attention, not recording events",
			d: "A camera doesn't capture a scene — it excludes everything outside the frame. A light doesn't only brighten; it tells the eye where to go. A cut moves attention from one thing to the next. Once framing, lighting and editing read as three ways of answering the same question — what should the viewer be looking at, and when — technique stops being a list of settings and becomes a set of decisions.",
			unlocks: [
				"Frame a shot by what you leave out, not only what you include",
				"Cut on the moment attention is ready to move",
				"Light and grade to lead the eye, not just to look expensive",
			],
		},
		requirements: {
			level: "Built for complete beginners",
			know: [
				"No filming, lighting or editing experience",
				"Basic computer skills — files, folders, moving large files around",
			],
			have: [
				"A camera, or a phone that records at 1080p or better",
				"A laptop that can edit video — 8GB of RAM and 100GB free",
				"6–8 hours a week for shooting and editing assignments",
			],
		},
		projects: [
			{
				n: "1",
				t: "",
				d: "A piece made in-camera, lit and recorded properly",
				weeks: "1–4",
			},
			{
				n: "2",
				t: "",
				d: "Two cuts from one set of rushes",
				weeks: "5–6",
			},
			{
				n: "3",
				t: "",
				d: "Shot, cut, graded, delivered",
				weeks: "7–8",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "Camera fundamentals",
				d: "Exposure, framing, and movement. How to use a camera with intention, not guesswork.",
			},
			{
				n: "02",
				t: "Lighting & audio",
				d: "The invisible elements that make or break a video. Sound and light, controlled.",
			},
			{
				n: "03",
				t: "Editing with purpose",
				d: "Cuts, pacing, and flow. Software skills plus the editorial thinking behind them.",
			},
			{
				n: "04",
				t: "Color & finishing",
				d: "Color grading, titles, and export. Polishing your work to a professional standard.",
			},
			{
				n: "05",
				t: "A complete project",
				d: "Shoot, edit, and deliver a finished piece from concept to export.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Camera operation and composition",
			"Lighting and audio techniques",
			"Professional editing workflows",
			"Color grading and post-production",
			"Complete video project delivery",
		],
	},
	{
		slug: "cybersecurity",
		t: "Cybersecurity",
		d: "",
		tagline: "Understand how systems are attacked — and how to defend them.",
		duration: "16 Weeks",
		category: "build",
		level: "on-request",
		family: "development",
		admission: "on-request",
		fees: {
			online: { upfront: 230_000, instalments: { count: 3, amount: 82_500 } },
			inhouse: { upfront: 280_000, instalments: { count: 3, amount: 100_000 } },
		},
		format: ONLINE_OR_CENTRE,
		mentalModel: {
			t: "Every system has a boundary, and attacks cross it",
			d: "Security isn't a feature you bolt on; it is a property of where you place trust. Draw the line between what you control and what you don't, and every vulnerability turns out to have the same shape: something crossed that line and was trusted on the far side. Injection, XSS, broken authentication — each is trust granted where it was never earned.",
			unlocks: [
				"Find the trust boundary in a system you have never seen",
				"Recognise a new class of vulnerability as a familiar pattern",
				"Defend by design rather than by a checklist of patches",
			],
		},
		requirements: {
			level: "Assumes general technical confidence",
			know: [
				"How networks and the web work at a basic level — IPs, ports, HTTP",
				"The command line, and enough code-reading to follow a script",
				"No prior security experience needed",
			],
			have: [
				"A laptop with 8GB of RAM or more and room for virtual machines",
				"A stable internet connection for the hands-on labs",
				"8–10 hours a week outside sessions for lab work",
			],
		},
		projects: [
			{
				n: "1",
				t: "Mambilla Range",
				d: "threat model, then map and segment",
				weeks: "1–5",
			},
			{
				n: "2",
				t: "NexaRide Tickets",
				d: "a web app broken, then fixed properly",
				weeks: "6–8",
			},
			{
				n: "3",
				t: "Gurara Vault",
				d: "a crypto review and a breach reconstructed",
				weeks: "9–12",
			},
			{
				n: "4",
				t: "Idanre Range",
				d: "a full assessment and report",
				weeks: "13–16",
				capstone: true,
			},
		],
		modules: [
			{
				n: "01",
				t: "Security foundations",
				d: "The principles of confidentiality, integrity, and availability — and why they matter.",
			},
			{
				n: "02",
				t: "Network security",
				d: "How networks are attacked and defended. Firewalls, intrusion detection, and monitoring.",
			},
			{
				n: "03",
				t: "Web application security",
				d: "OWASP Top 10, injection attacks, XSS — learn to find and fix vulnerabilities.",
			},
			{
				n: "04",
				t: "Cryptography basics",
				d: "Encryption, hashing, and key management — the tools that protect data.",
			},
			{
				n: "05",
				t: "Incident response",
				d: "What to do when things go wrong. Detection, containment, and recovery.",
			},
			{
				n: "06",
				t: "Security in practice",
				d: "Hands-on labs and real-world scenarios that put your skills to the test.",
			},
		],
		session: [
			{
				t: "A mental model",
				d: "Every session opens with the idea, explained plainly, before any code appears.",
			},
			{
				t: "An exercise brief",
				d: "A focused task that makes you use the concept — not just read about it.",
			},
			{
				t: "A model answer",
				d: "A worked solution to compare against, so you learn what good looks like.",
			},
		],
		features: [
			"Network and application security",
			"Ethical hacking and penetration testing",
			"Cryptography and data protection",
			"Incident response and recovery",
			"Hands-on security labs",
		],
	},
];

const NUMBER_WORDS = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen",
	"seventeen",
	"eighteen",
	"nineteen",
	"twenty",
];

/* Five sentences across the site say how many courses there are, in words. On
   the day a twelfth course was added every one of them still said "eleven" —
   a number spelled out in prose is invisible to the compiler, to the tests and
   to anyone not looking for it. Derived here so they cannot drift again, and
   `src/lib/courses.test.ts` fails if a route spells one out by hand. */
export const COURSE_COUNT = COURSES.length;
export const COURSE_COUNT_WORD =
	NUMBER_WORDS[COURSE_COUNT] ?? String(COURSE_COUNT);
export const COURSE_COUNT_WORD_CAP =
	COURSE_COUNT_WORD.charAt(0).toUpperCase() + COURSE_COUNT_WORD.slice(1);

export function getCourseBySlug(slug: string): Course | undefined {
	return COURSES.find((c) => c.slug === slug);
}

/* ── fees ─────────────────────────────────────────────────────────
   Every naira figure on the site is rendered from the numbers above, through
   these, so a price is changed in exactly one place. */

/* 120000 → "₦120,000". Grouped by hand rather than with toLocaleString, so the
   output does not depend on which ICU data the runtime happens to ship. */
export function formatNaira(amount: number): string {
	return `₦${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/* the deliveries a course is offered in, online first */
export function deliveriesOf(c: Course): Delivery[] {
	return DELIVERIES.filter((d) => c.fees[d]);
}

export const offeredInPerson = (c: Course) => Boolean(c.fees.inhouse);
export const offeredOnline = (c: Course) => Boolean(c.fees.online);

/* "live online", "in person, Kubwa" or both — for one-line summaries */
export function deliveryPhrase(c: Course): string {
	const parts = deliveriesOf(c).map((d) =>
		d === "online" ? "live online" : "in person, Kubwa",
	);
	return parts.join(" or ");
}

export function lowestFee(c: Course): number {
	return Math.min(...deliveriesOf(c).map((d) => c.fees[d]?.upfront ?? 0));
}

/* the headline figure on a card: the fee, or where there are two, where they start */
export function priceLabel(c: Course): string {
	const lowest = formatNaira(lowestFee(c));
	return deliveriesOf(c).length > 1 ? `From ${lowest}` : lowest;
}

/* "2 × ₦65,000" */
export function instalmentLabel(fee: Fee): string {
	return `${fee.instalments.count} × ${formatNaira(fee.instalments.amount)}`;
}

export function instalmentTotal(fee: Fee): number {
	return fee.instalments.count * fee.instalments.amount;
}

/* "Live online ₦120,000 (or 2 × ₦65,000) · In Kubwa, max 6 ₦145,000 (or 2 × ₦77,500)" */
export function feeSummary(c: Course): string {
	return deliveriesOf(c)
		.map((d) => {
			const fee = c.fees[d] as Fee;
			return `${DELIVERY_LABEL[d]} ${formatNaira(fee.upfront)} (or ${instalmentLabel(fee)})`;
		})
		.join(" · ");
}

/* ── how the catalogue hangs together ─────────────────────────── */

export function coursesAt(level: Level): Course[] {
	return COURSES.filter((c) => c.level === level);
}

export function nextCourse(c: Course): Course | undefined {
	return c.next ? getCourseBySlug(c.next.slug) : undefined;
}

/* what a bundle saves against buying its parts one at a time, for one delivery.
   Undefined where a part is not offered that way, so nothing is claimed that
   could not actually be bought. */
export function bundleSaving(
	c: Course,
	delivery: Delivery = "online",
): number | undefined {
	if (!c.bundle) return undefined;
	const own = c.fees[delivery]?.upfront;
	const parts = c.bundle.parts.map((s) => getCourseBySlug(s)?.fees[delivery]);
	if (own === undefined || parts.some((f) => !f)) return undefined;
	return parts.reduce((sum, f) => sum + (f?.upfront ?? 0), 0) - own;
}

/* the bundles a course is one part of — Frontend and Backend both point here
   at the Fullstack path */
export function bundlesContaining(slug: string): Course[] {
	return COURSES.filter((c) => c.bundle?.parts.includes(slug));
}
