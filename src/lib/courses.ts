export interface CourseModule {
	n: string;
	t: string;
	d: string;
}

export interface Course {
	slug: string;
	t: string;
	d: string;
	tagline: string;
	price: string;
	duration: string;
	category: "learn" | "build";
	modules: CourseModule[];
	session: { t: string; d: string }[];
	features: string[];
}

export const COURSES: Course[] = [
	{
		slug: "web-development-fullstack",
		t: "Web Development",
		d: "Fullstack",
		tagline:
			"Learn frontend and backend in one complete path — from first principles to full applications.",
		price: "₦180,000",
		duration: "16 Weeks",
		category: "learn",
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
			"Cohort-based with structured materials",
		],
	},
	{
		slug: "frontend-development",
		t: "Frontend Development",
		d: "",
		tagline:
			"Learn the web from first principles — HTML, CSS, and JavaScript done properly.",
		price: "₦80,000",
		duration: "12 Weeks",
		category: "learn",
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
		price: "₦100,000",
		duration: "12 Weeks",
		category: "learn",
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
			"Cohort-based with hands-on exercises",
		],
	},
	{
		slug: "mobile-development",
		t: "Mobile Development",
		d: "",
		tagline: "Build real mobile applications — from concept to the app store.",
		price: "₦200,000",
		duration: "12 Weeks",
		category: "build",
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
		price: "₦80,000",
		duration: "8 Weeks",
		category: "learn",
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

export function getCourseBySlug(slug: string): Course | undefined {
	return COURSES.find((c) => c.slug === slug);
}
