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

export interface Course {
	slug: string;
	t: string;
	d: string;
	tagline: string;
	price: string;
	duration: string;
	category: "learn" | "build";
	format: Format;
	mentalModel: MentalModel;
	requirements: Requirements;
	projects: CourseProject[];
	modules: CourseModule[];
	session: { t: string; d: string }[];
	features: string[];
}

/* Twelve of the thirteen courses are delivered identically. They share one
   object rather than carrying thirteen copies of the same paragraph, which is
   how a single course quietly ends up describing itself wrongly. */
const ONLINE: Format = {
	t: "Taught live, online, hands-on.",
	d: "An instructor teaches you live, with structured materials and real feedback, and you start whenever you are ready rather than waiting for an intake. Sessions and materials run over WhatsApp, keeping it close and accessible.",
};

export const COURSES: Course[] = [
	{
		slug: "pc-basics",
		t: "PC Basics",
		d: "Digital Literacy",
		tagline:
			"Start at the very beginning — the computer itself, and the confidence to use one without being afraid of breaking it.",
		price: "₦80,000",
		duration: "6 Weeks",
		category: "learn",
		format: {
			t: "Taught in the centre, in person.",
			d: "Every other course here is taught live online. This one cannot be: the first thing a beginner needs is somebody beside them saying that one, on the left. Sitting a person who has never used a computer in front of a video call asks them to use the very skill the course exists to teach. Machines are provided, and you start whenever you are ready.",
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
		slug: "microsoft-office",
		t: "Microsoft Office",
		d: "Word, Excel, PowerPoint & Access",
		tagline:
			"The four programs an office actually runs on, taught to the standard the work deserves.",
		price: "₦110,000",
		duration: "10 Weeks",
		category: "learn",
		format: ONLINE,
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
		slug: "web-development-fullstack",
		t: "Web Development",
		d: "Fullstack",
		tagline:
			"Learn frontend and backend in one complete path — from first principles to full applications.",
		price: "₦160,000",
		duration: "10 Weeks",
		category: "learn",
		format: ONLINE,
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
				"10–12 hours a week outside sessions — this track moves fast",
			],
		},
		projects: [
			{
				n: "1",
				t: "Ajo",
				d: "a savings club's site, correct before it is styled",
				weeks: "1–3",
			},
			{
				n: "2",
				t: "Òjò",
				d: "a rain check across Nigerian towns",
				weeks: "4–6",
			},
			{
				n: "3",
				t: "Slot",
				d: "a booking API with no browser side at all",
				weeks: "7–8",
			},
			{
				n: "4",
				t: "Found",
				d: "a deployed lost-and-found board",
				weeks: "9–10",
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
			"Frontend and backend in one track",
			"HTML, CSS, JavaScript, and Node.js",
			"Database integration and API design",
			"Capstone fullstack project",
			"Taught live with structured materials — start any time",
		],
	},
	{
		slug: "frontend-development",
		t: "Frontend Development",
		d: "",
		tagline:
			"Learn the web from first principles — HTML, CSS, and JavaScript done properly.",
		price: "₦120,000",
		duration: "10 Weeks",
		category: "learn",
		format: ONLINE,
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
		slug: "javascript-programming",
		t: "JavaScript Programming",
		d: "Browser & Node.js",
		tagline:
			"Learn JavaScript as a language — the same core that runs in a browser and on a server.",
		price: "₦100,000",
		duration: "8 Weeks",
		category: "learn",
		format: ONLINE,
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
		slug: "react-development",
		t: "React",
		d: "Intermediate to Advanced",
		tagline:
			"Go beyond the basics — build React applications that stay understandable as they grow.",
		price: "₦120,000",
		duration: "8 Weeks",
		category: "learn",
		format: ONLINE,
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
		price: "₦160,000",
		duration: "10 Weeks",
		category: "learn",
		format: ONLINE,
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
		slug: "backend-development",
		t: "Backend Development",
		d: "",
		tagline:
			"Build the engine behind applications — APIs, databases, and server-side logic.",
		price: "₦100,000",
		duration: "8 Weeks",
		category: "learn",
		format: ONLINE,
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
		slug: "mobile-development",
		t: "Mobile Development",
		d: "",
		tagline: "Build real mobile applications — from concept to the app store.",
		price: "₦190,000",
		duration: "12 Weeks",
		category: "build",
		format: ONLINE,
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
		slug: "cybersecurity",
		t: "Cybersecurity",
		d: "",
		tagline: "Understand how systems are attacked — and how to defend them.",
		price: "₦230,000",
		duration: "16 Weeks",
		category: "build",
		format: ONLINE,
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
	{
		slug: "python-programming",
		t: "Python Programming",
		d: "",
		tagline:
			"Learn programming from scratch with Python — the language that powers everything from scripts to AI.",
		price: "₦100,000",
		duration: "6 Weeks",
		category: "learn",
		format: ONLINE,
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
		slug: "data-analysis",
		t: "Data Analysis",
		d: "",
		tagline:
			"Turn raw data into clear insights — with Python, SQL, and real analytical thinking.",
		price: "₦120,000",
		duration: "12 Weeks",
		category: "learn",
		format: ONLINE,
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
				weeks: "1–5",
			},
			{
				n: "2",
				t: "Basket",
				d: "an NBS food-price release cleaned, with the decisions logged",
				weeks: "6–8",
			},
			{
				n: "3",
				t: "Second Opinion",
				d: "one finding, two honest charts",
				weeks: "9–10",
			},
			{
				n: "4",
				t: "Budget Line, Ward or Grid",
				d: "your choice of three",
				weeks: "11–12",
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
		slug: "videography-video-editing",
		t: "Videography & Video Editing",
		d: "",
		tagline:
			"Capture and craft video content that communicates — from shooting to final cut.",
		price: "₦120,000",
		duration: "8 Weeks",
		category: "build",
		format: ONLINE,
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
