export interface CbtModule {
	n: string;
	title: string;
	description: string;
	outcomes: string[];
}

export interface CbtPackage {
	id: string;
	name: string;
	tagline: string;
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
	title: "WAEC & JAMB CBT Training Centre",
	headline: "Master the Computer-Based Exam Before Day One",
	tagline:
		"Intensive, hands-on Computer-Based Test (CBT) training for WAEC (CB-WASSCE) and JAMB (UTME) candidates. Real exam simulator software, keyboard 8-key navigation mastery, timed mock sessions, and diagnostic performance reviews at our Kubwa, Abuja centre.",
	location: "F01 Market, Kubwa, FCT-Abuja",
	targetExams: ["JAMB UTME (100% CBT)", "WAEC CB-WASSCE (Computer-Based)"],
} as const;

export const CBT_PILLARS: CbtModule[] = [
	{
		n: "01",
		title: "The 8-Key System Mastery",
		description:
			"JAMB exam centres often provide worn, unresponsive mice that slow candidates down. We drill candidates until mouse-free navigation (A, B, C, D for answers, N for Next, P for Previous, S for Submit, R for Return) becomes pure muscle memory.",
		outcomes: [
			"Navigate all 180 questions without touching a mouse",
			"Save 8–10 minutes overall compared to mouse-clicking",
			"Eliminate panic when facing faulty or sticky peripherals",
		],
	},
	{
		n: "02",
		title: "Time & Speed Budgeting (120 Mins · 180 Qs)",
		description:
			"Answering 180 questions in 120 minutes means you have exactly 40 seconds per question. We train students in rapid question triage: answering instant recall questions first, flagging calculation problems, and pacing their clock per subject.",
		outcomes: [
			"Subject-by-subject time allocation strategy",
			"Eliminate the 'ran out of time with 30 questions left' trap",
			"Master the question palette: answered, unanswered, and flagged questions",
		],
	},
	{
		n: "03",
		title: "On-Screen Calculator Speed Drills",
		description:
			"JAMB forbids physical scientific calculators; candidates must use the onscreen basic calculator. We teach science and commercial candidates how to compute quickly with keyboard number pads without interface friction.",
		outcomes: [
			"Instant onscreen calculator access and keyboard entry",
			"Shortcut calculations for Physics, Chemistry, and Mathematics",
			"Avoid rounding errors and calculator interface stalls",
		],
	},
	{
		n: "04",
		title: "15+ Years Past Questions & Novel Drills",
		description:
			"Rigorous practice using an updated question database spanning over a decade of authentic JAMB and WAEC past questions. Detailed breakdown of compulsory Literature texts and comprehension strategies for Use of English.",
		outcomes: [
			"Comprehensive coverage of all 4 registered subject combinations",
			"Mastery of the prescribed JAMB English novel and literary devices",
			"Step-by-step rationales behind model answers and examiner traps",
		],
	},
	{
		n: "05",
		title: "Full-Scale Timed Mock Hall Simulations",
		description:
			"Weekly full-length mock examinations under authentic exam hall conditions in our Kubwa lab — strict timing, zero cell phones, real interface layout, and instant diagnostic score reports highlighting weak topics.",
		outcomes: [
			"Overcome computer phobia and exam-day anxiety",
			"Detailed topic-by-topic diagnostic breakdown of scores",
			"Track weekly score progression from baseline to 280+ target",
		],
	},
];

export const CBT_PACKAGES: CbtPackage[] = [
	{
		id: "masterclass",
		name: "Full CBT Masterclass",
		tagline:
			"Comprehensive preparation from foundational computer literacy to exam day excellence.",
		price: "₦25,000",
		duration: "4 Weeks (Mon – Fri)",
		badge: "Most Popular",
		features: [
			"Daily 2-hour instructor-led lab practice",
			"Complete 8-key keyboard navigation drill",
			"15+ years JAMB & WAEC past questions database",
			"Use of English & prescribed novel breakdown",
			"4 full-scale timed mock exams with printed diagnostics",
			"Dedicated desktop PC workstation with uninterrupted power",
			"Personalized review of weak topics and time leaks",
		],
		idealFor:
			"Candidates wanting maximum confidence, higher UTME scores (280+), and complete test conditioning.",
	},
	{
		id: "intensive-crash",
		name: "Intensive Speed & Mock Drill",
		tagline:
			"High-intensity simulation for candidates nearing their exam date.",
		price: "₦15,000",
		duration: "2 Weeks (Mon – Fri)",
		badge: "Fast Track",
		features: [
			"Daily timed mock exams & rapid question triage",
			"8-key system speed drills & calculator workshops",
			"Immediate post-mock error review and corrections",
			"2 full-length simulated hall exams under strict invigilation",
			"Uninterrupted generator & inverter backed power",
		],
		idealFor:
			"Students who know their subjects but need CBT speed, accuracy, and mock pressure testing.",
	},
	{
		id: "weekend-cohort",
		name: "Weekend Candidate Cohort",
		tagline:
			"Designed for secondary school students attending weekday classes.",
		price: "₦12,000",
		duration: "3 Weeks (Sat & Sun)",
		features: [
			"Weekend intensive morning or afternoon sessions",
			"Targeted mock practice across 4 registered subjects",
			"8-key system mastery and onscreen tool guidance",
			"2 full mock exams with performance diagnostics",
		],
		idealFor:
			"SS3 students currently in secondary school preparing for the upcoming WAEC and JAMB exams.",
	},
	{
		id: "walkin-mock",
		name: "Single Walk-in Mock Exam",
		tagline:
			"Test your readiness today with instant scoring and complete answer breakdown.",
		price: "₦3,000",
		duration: "Single Session (2 Hours)",
		features: [
			"Full 180-question / 120-minute timed simulation",
			"Instant result slip with subject breakdown",
			"Access to detailed answer explanations",
			"Instructor feedback on time management",
		],
		idealFor:
			"Any candidate looking for a benchmark score to measure current readiness.",
	},
];

export const CBT_FAQS: CbtFaq[] = [
	{
		question:
			"I have rarely used a computer before. Can I still join this CBT training?",
		answer:
			"Yes, absolutely. Many students in Nigeria have little daily access to desktop PCs. We start by showing you how a desktop works, how to sit comfortably, how to read questions clearly on the monitor, and how to navigate using keyboard keys without being intimidated. By week two, you will be faster than students using a mouse.",
	},
	{
		question: "What is the JAMB 8-key system, and why is it taught here?",
		answer:
			"The 8-key system allows candidates to take the entire JAMB UTME exam using only 8 keyboard keys: A, B, C, D (to pick an option), N (Next question), P (Previous question), S (Submit exam), and R (Return/Cancel accidental submit). At many external CBT centres, mice are stiff, broken, or jittery. Keyboard keys never fail, and typing a key takes 0.4 seconds compared to 3+ seconds hunting with a mouse cursor.",
	},
	{
		question: "Where is the CBT training centre located?",
		answer:
			"The training takes place at NexaHub Technologies, F01 Market, Kubwa, FCT-Abuja. We have a dedicated, air-conditioned computer laboratory with desktop workstations, high-speed local network, and solar/generator backup power so sessions never cut out.",
	},
	{
		question:
			"Can secondary schools or tutorial centres register their students in batches?",
		answer:
			"Yes. We offer institutional partnership packages for secondary schools and tutorial centres in Kubwa, Bwari, and greater Abuja. We can schedule dedicated morning or weekend mock batches for your entire class with group analytics.",
	},
	{
		question: "Do I need to bring my own laptop?",
		answer:
			"No. All practice takes place on our desktop computers equipped with standard full-sized keyboards — identical to the hardware you will meet on exam day at accredited JAMB and WAEC centres.",
	},
	{
		question: "Which subject combinations are available in the question bank?",
		answer:
			"All major WAEC and JAMB subjects are supported: Use of English, Mathematics, Physics, Chemistry, Biology, Economics, Commerce, Government, Literature in English, Financial Accounting, CRK, IRS, Geography, and Agricultural Science.",
	},
];

export const SAMPLE_CBT_QUESTIONS: CbtSampleQuestion[] = [
	{
		id: 1,
		subject: "Use of English",
		question:
			"From the words lettered A to D, choose the word that is nearest in meaning to the underlined word:\n\n'The principal's speech was remarkably concise and left no room for ambiguity.'",
		options: [
			{ key: "A", text: "Elaborate and comprehensive" },
			{ key: "B", text: "Brief and to the point" },
			{ key: "C", text: "Vague and perplexing" },
			{ key: "D", text: "Emotional and moving" },
		],
		correct: "B",
		explanation:
			"'Concise' means giving a lot of information clearly and in a few words; brief and comprehensive. Therefore, 'Brief and to the point' is nearest in meaning.",
	},
	{
		id: 2,
		subject: "Mathematics",
		question: "If 3^(2x - 1) = 81, find the value of x.",
		options: [
			{ key: "A", text: "x = 2" },
			{ key: "B", text: "x = 2.5" },
			{ key: "C", text: "x = 3" },
			{ key: "D", text: "x = 5" },
		],
		correct: "B",
		explanation:
			"Express 81 as a power of 3: 81 = 3^4. Therefore, 3^(2x - 1) = 3^4. Equating exponents: 2x - 1 = 4 => 2x = 5 => x = 2.5.",
	},
	{
		id: 3,
		subject: "Physics",
		question:
			"A body of mass 5 kg is pulled from rest with a constant force of 20 N on a smooth horizontal surface. What is the velocity of the body after 4 seconds?",
		options: [
			{ key: "A", text: "8 m/s" },
			{ key: "B", text: "12 m/s" },
			{ key: "C", text: "16 m/s" },
			{ key: "D", text: "20 m/s" },
		],
		correct: "C",
		explanation:
			"Acceleration a = F / m = 20 / 5 = 4 m/s^2. Using v = u + at with u = 0: v = 0 + (4 * 4) = 16 m/s.",
	},
	{
		id: 4,
		subject: "General Knowledge / CBT Strategy",
		question:
			"In the official JAMB 8-key system, which key allows you to return to the exam after mistakenly pressing the submit ('S') key?",
		options: [
			{ key: "A", text: "Key 'N' (Next)" },
			{ key: "B", text: "Key 'R' (Reverse / Return)" },
			{ key: "C", text: "Key 'Esc' (Escape)" },
			{ key: "D", text: "Key 'B' (Back)" },
		],
		correct: "B",
		explanation:
			"In JAMB CBT navigation, 'S' prompts for submission confirmation, and 'R' cancels the prompt and returns to the exam questions safely without submitting.",
	},
];
