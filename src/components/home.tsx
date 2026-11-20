import { Link } from "@tanstack/react-router";
import { BUSINESS_OFFERS } from "../lib/business";
import {
	CENTRE_SEATS,
	COURSE_COUNT,
	coursesAt,
	formatNaira,
	LEVELS,
	type Level,
	lowestFee,
} from "../lib/courses";
import { SERVICES } from "../lib/services";
import { useMode } from "./mode";
import { Eyebrow } from "./site";

/* The sections of the two front pages. NexaHubTech, the software company, opens
   at / and NexaHubTech Academy at /academy; each route owns its arm, so the
   mode-aware sections below always render the right side for the page they are
   on. Sections that belong to one arm only are used by that arm's page only. */

/* ── hero visual : the learn → build journey, rendered warmly ───── */

/* the cards behind the hero headline: a lesson and a shipped product on the
   Academy's page, the company's own process on its page */
const STAGE = {
	learn: {
		a: {
			label: "In the classroom",
			t: "How the browser actually thinks",
			d: "Build the mental model first — the code comes easily after that.",
			foot: "Understand → practice → build.",
		},
		tag: "skills → service ↻",
		b: {
			label: "In production",
			t: "Taught by engineers who ship for clients",
			foot: "The same rigor, in every lesson.",
		},
	},
	build: {
		a: {
			label: "Before we build",
			t: "Scope, data and edge cases, agreed in writing",
			d: "You know what is being built, and why, before a line is written.",
			foot: "Understand → design → build.",
		},
		tag: "design → ship → support ↻",
		b: {
			label: "In production",
			t: "Shipped in working increments, then supported",
			foot: "Updates, fixes and someone to call.",
		},
	},
} as const;

function HeroStage() {
	const { mode } = useMode();
	const st = STAGE[mode];
	return (
		<div className="hero-stage rise rise-3" aria-hidden="true">
			<div className="jcard j-learn">
				<span className="jlabel" style={{ color: "var(--learn-ink)" }}>
					<span className="jdot jdot-learn" />
					{st.a.label}
				</span>
				<p className="display text-[1.15rem] mt-2.5">{st.a.t}</p>
				<p className="text-[0.9rem] text-mute mt-1.5">{st.a.d}</p>
				<p className="text-[0.85rem] text-mute mt-4">{st.a.foot}</p>
			</div>

			<span className="loop-tag">{st.tag}</span>

			<div className="jcard j-build">
				<span className="jlabel" style={{ color: "var(--build-ink)" }}>
					<span className="jdot jdot-build" />
					{st.b.label}
				</span>
				<p className="display text-[1.15rem] mt-2.5">{st.b.t}</p>
				<p className="text-[0.85rem] text-mute mt-4">{st.b.foot}</p>
			</div>
		</div>
	);
}

/* the hero speaks to whichever arm the visitor is in. Same company, same page —
   the mode decides who gets addressed first. */
const HERO_BY_MODE = {
	learn: {
		pill: "NexaHubTech Academy",
		headA: "Learn tech properly.",
		headB: "On your ",
		headAccent: "terms",
		accentVar: "var(--learn-ink)",
		lead: "Practical courses in software development, data, office productivity and video — taught live by people who build real software every day. Learn online from anywhere or in person in a small class, start any day, and spread your fee across the course.",
		primary: { to: "/courses", label: "Explore courses" },
		secondary: { to: "/fees", label: "Compare fees" },
	},
	build: {
		pill: "Software development company",
		headA: "Software, built",
		headB: "",
		headAccent: "properly",
		accentVar: "var(--build-ink)",
		lead: "NexaHubTech designs, builds and maintains production software for businesses and founders — scoped carefully, built properly, and supported long after launch.",
		primary: { to: "/contact", label: "Start a project" },
		secondary: { to: "/services", label: "See our services" },
	},
} as const;

/* fixed spots for the sparks around the burst — positions as percentages of
   the stage, with staggered delays so they never twinkle together */
const SPARKS = [
	{ top: "14%", left: "58%", delay: "0s", size: 14 },
	{ top: "72%", left: "54%", delay: "1.1s", size: 10 },
	{ top: "22%", left: "93%", delay: "0.6s", size: 18 },
	{ top: "84%", left: "88%", delay: "1.7s", size: 12 },
	{ top: "8%", left: "30%", delay: "2.3s", size: 9 },
];

/* The opening is a dark stage with a slow-turning burst of rays behind the
   journey cards: the one place on the page that is loud on purpose. It stays
   dark in both modes, so its colours are fixed rather than mode tokens. */
export function Hero() {
	const { mode } = useMode();
	const h = HERO_BY_MODE[mode];
	return (
		<section className="wrap pt-4 md:pt-6 pb-6">
			<div className="blast rise rise-1">
				<div className="blast-rays" aria-hidden="true" />
				<div className="blast-core" aria-hidden="true" />
				{SPARKS.map((p) => (
					<span
						key={p.top + p.left}
						className="blast-spark"
						aria-hidden="true"
						style={{
							top: p.top,
							left: p.left,
							width: p.size,
							height: p.size,
							animationDelay: p.delay,
						}}
					/>
				))}

				<div className="relative z-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 xl:gap-14 items-center">
					<div>
						<span className="pill rise rise-1">
							<span className="spark" />
							{h.pill}
						</span>
						<h1
							className="blast-title slam mt-6"
							style={{ textWrap: "balance" }}
						>
							{h.headA}
							<br />
							{h.headB}
							<span className="hot-text">{h.headAccent}</span>.
						</h1>
						<p className="blast-lead rise rise-3 mt-6 max-w-[34rem]">
							{h.lead}
						</p>
						<div className="rise rise-4 mt-9 flex flex-wrap gap-3">
							<Link to={h.primary.to} className="btn btn-blast">
								{h.primary.label} <i aria-hidden="true">→</i>
							</Link>
							<Link to={h.secondary.to} className="btn btn-ghost">
								{h.secondary.label}
							</Link>
						</div>
						<p className="rise rise-5 mt-7 text-[0.92rem] text-[#bfaecb]">
							{mode === "build"
								? "Based in Abuja, Nigeria · building for Africa and beyond."
								: "The training division of NexaHubTech · online and in Abuja."}
						</p>
					</div>

					<HeroStage />
				</div>
			</div>
		</section>
	);
}

/* two strips of tape crossing under the hero, each running the other way.
   Decorative: every phrase on them is said in full elsewhere on the page. */
const TAPE_BY_MODE = {
	learn: [
		"Online or in person",
		"Live, instructor-led",
		"Start any day",
		"Flexible payment plans",
		"Mental model first",
	],
	build: [
		"Software, built properly",
		"Designed before it's built",
		"Maintained after",
		"Shipped in increments",
		"Someone to call",
	],
} as const;

export function Tapes() {
	const { mode } = useMode();
	const words = TAPE_BY_MODE[mode];
	const run = (key: string) => (
		<div className="tape-track" key={key}>
			{[0, 1].map((copy) =>
				words.map((w) => (
					<span key={`${copy}-${w}`} className="tape-item">
						{w}
						<span className="tape-star">✦</span>
					</span>
				)),
			)}
		</div>
	);
	return (
		<div className="tapes" aria-hidden="true">
			<div className="tape tape-back">{run("back")}</div>
			<div className="tape tape-front">{run("front")}</div>
		</div>
	);
}

/* real figures only: what the catalogue and the services list actually hold */
export function Numbers() {
	const { mode } = useMode();
	const stats =
		mode === "build"
			? [
					{
						n: String(SERVICES.length),
						l: "service lines, from first build to support",
					},
					{ n: "3", l: "steps: understand, design, build & keep" },
					{ n: "1", l: "team from first scope to long-term support" },
				]
			: [
					{ n: String(COURSE_COUNT), l: "live, instructor-led courses" },
					{ n: "2", l: "ways to learn — online or in person" },
					{
						n: String(CENTRE_SEATS),
						l: "learners at most in an in-person class",
					},
				];
	return (
		<section className="wrap py-14">
			<div className="numbers">
				{stats.map((s) => (
					<div key={s.l} className="number reveal">
						<span className="number-n hot-text">{s.n}</span>
						<span className="number-l">{s.l}</span>
					</div>
				))}
			</div>
		</section>
	);
}

export function Thesis() {
	return (
		<section className="wrap py-16 md:py-24">
			<span className="eyebrow is-plain text-mute">Our view</span>
			<p className="manifesto reveal mt-5">
				Most software goes wrong before it is written. We{" "}
				<mark>design first</mark>, build in working increments, and{" "}
				<mark>stay for what comes after.</mark>
			</p>
			<p className="lead reveal mt-7 max-w-[38rem] text-[1.1rem]">
				Clear scope, honest estimates and software that keeps running — for
				businesses that cannot afford to build the same thing twice.
			</p>
		</section>
	);
}

/* ── learn-side sections ─────────────────────────────────────────── */

const STARTING_POINTS: { level: Level; who: string }[] = [
	{ level: "start-here", who: "New to computers or office work" },
	{ level: "developer", who: "Ready to learn to code" },
	{ level: "level-up", who: "Already writing code" },
];

export function StartingPoints() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[40rem] mb-10">
				<Eyebrow>Choose your starting point</Eyebrow>
				<h2 className="shout mt-4">Wherever you are, there is a next step.</h2>
			</div>
			<div className="grid md:grid-cols-3 gap-5">
				{STARTING_POINTS.map(({ level, who }) => {
					const meta = LEVELS.find((l) => l.id === level);
					const courses = coursesAt(level);
					const from = formatNaira(Math.min(...courses.map(lowestFee)));
					return (
						<Link
							key={level}
							to="/courses"
							hash={level}
							className="card card-lift panel-learn reveal p-7 flex flex-col"
						>
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								{who}
							</span>
							<h3 className="display text-[1.5rem] mt-2">{meta?.t}</h3>
							<p className="lead mt-2 text-[0.95rem] flex-1">
								{courses.map((c) => c.t).join(" · ")}
							</p>
							<div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--line-soft)]">
								<span className="display text-[1.05rem]">From {from}</span>
								<span className="view-link">
									See courses <i aria-hidden="true">→</i>
								</span>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

const LIVE_ONLINE = [
	"Real-time sessions with your instructor — never pre-recorded",
	"Materials, exercises and feedback shared on WhatsApp",
	"Evening sessions that fit around work or study",
	"Our most affordable way to learn",
];

const IN_PERSON = [
	"Your instructor in the room, able to see your screen",
	"Machines provided for computer and office courses",
	"Weekday and Saturday sessions",
	"Our learning centre in Kubwa, Abuja",
];

export function TwoWays() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[40rem] mb-10">
				<Eyebrow>Your choice</Eyebrow>
				<h2 className="shout mt-4">Learn online or in person.</h2>
				<p className="lead mt-4">
					Same curriculum, same instructors, same standard. Almost every course
					is offered both ways, so you choose the format that fits your
					schedule.
				</p>
			</div>
			<div className="grid md:grid-cols-2 gap-6">
				<div className="card panel-learn reveal p-8">
					<Eyebrow>Live online</Eyebrow>
					<h3 className="display text-[1.7rem] mt-3">
						Learn from anywhere, in real time.
					</h3>
					<ul className="mt-5">
						{LIVE_ONLINE.map((x) => (
							<li key={x} className="feat">
								<span className="mk mk-learn">✓</span>
								{x}
							</li>
						))}
					</ul>
					<Link to="/timetable" className="view-link mt-6">
						See session times <i aria-hidden="true">→</i>
					</Link>
				</div>
				<div className="card reveal p-8">
					<Eyebrow variant="build">In person</Eyebrow>
					<h3 className="display text-[1.7rem] mt-3">
						Small classes of no more than {CENTRE_SEATS}.
					</h3>
					<ul className="mt-5">
						{IN_PERSON.map((x) => (
							<li key={x} className="feat">
								<span className="mk mk-build">✓</span>
								{x}
							</li>
						))}
					</ul>
					<Link to="/centre" className="view-link mt-6">
						Visit the learning centre <i aria-hidden="true">→</i>
					</Link>
				</div>
			</div>
		</section>
	);
}

export function StudioProof() {
	return (
		<section className="wrap py-16">
			<div className="slab slab-build panel-studio reveal">
				<span className="slab-word" aria-hidden="true">
					Build
				</span>
				<div className="max-w-[40rem]">
					<Eyebrow variant="build">Backed by NexaHubTech</Eyebrow>
					<h2 className="display mt-3 text-[2rem] sm:text-[2.3rem]">
						Taught by a team that ships real software.
					</h2>
					<p className="lead mt-3">
						NexaHubTech Academy is the training division of NexaHubTech, a
						software development company. The problems its engineers solve for
						clients shape our lessons, and our strongest learners get to work on
						real projects.
					</p>
					<div className="mt-7 flex flex-wrap items-center gap-4">
						<Link to="/" className="btn btn-teal">
							Visit NexaHubTech
						</Link>
						<Link to="/teaching" className="view-link is-build">
							How we teach <i aria-hidden="true">→</i>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export function ForTeams() {
	return (
		<section className="wrap py-10">
			<div className="reveal card p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
				<div className="max-w-[38rem]">
					<Eyebrow variant="plain">For organisations</Eyebrow>
					<h2 className="display text-[1.6rem] mt-3">
						Training a team, or a school's candidates?
					</h2>
					<p className="lead text-[0.97rem] mt-2">
						{BUSINESS_OFFERS.map((o) => o.t).join(" · ")}.
					</p>
				</div>
				<Link to="/for-business" className="btn btn-primary shrink-0">
					For business
				</Link>
			</div>
		</section>
	);
}

export function Services() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[42rem] mb-10">
				<Eyebrow variant="build">What we build</Eyebrow>
				<h2 className="shout mt-4">From first product to long-term support.</h2>
				<p className="lead mt-4">
					We take on the full range of client work — a first product, the
					systems around it, and the support that keeps it running.
				</p>
			</div>
			<div className="grid md:grid-cols-2 gap-5">
				{SERVICES.map((s, i) => (
					<Link
						key={s.slug}
						to="/services/$slug"
						params={{ slug: s.slug }}
						className="slab slab-build panel-studio reveal flex flex-col"
					>
						<span className="slab-word" aria-hidden="true">
							{String(i + 1).padStart(2, "0")}
						</span>
						<h3 className="display text-[1.7rem]">{s.t}</h3>
						<p className="lead mt-3 text-[0.97rem] flex-1">{s.tagline}</p>
						<span className="view-link mt-5">
							View services <i aria-hidden="true">→</i>
						</span>
					</Link>
				))}
			</div>
			<div className="reveal mt-7">
				<Link to="/services" className="btn btn-teal">
					View all services
				</Link>
			</div>
		</section>
	);
}

const APPROACH = [
	{
		n: "1",
		t: "Understand",
		d: "We start with the idea, not the keyword. Before any syntax, you build a clear mental model of what’s really happening.",
	},
	{
		n: "2",
		t: "Practice",
		d: "Short, focused exercises with model answers. You try, compare, and adjust — until the concept genuinely clicks.",
	},
	{
		n: "3",
		t: "Build",
		d: "You apply it to something real. The strongest learners go on to build alongside the studio on actual client work.",
	},
];

export function Approach() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[42rem] mb-10">
				<Eyebrow>Our approach</Eyebrow>
				<h2 className="shout mt-4">Mental model first. Syntax second.</h2>
				<p className="lead mt-4">
					Most courses start with code and hope understanding catches up. We do
					it the other way around — and it’s why our learners actually get it.
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-5">
				{APPROACH.map((s, i) => (
					<div key={s.t} className="step-card reveal">
						<span className={`step-num ${i === 2 ? "is-build" : ""}`}>
							0{s.n}
						</span>
						<h3 className="display text-[1.5rem] mt-2">{s.t}</h3>
						<p className="lead mt-2 text-[0.97rem]">{s.d}</p>
					</div>
				))}
			</div>
		</section>
	);
}

export function ClosingCTA() {
	const { mode } = useMode();
	const build = mode === "build";
	return (
		<section className="wrap py-16">
			<div className="blast blast-cta reveal">
				<div className="blast-rays" aria-hidden="true" />
				<div className="blast-core" aria-hidden="true" />
				<div className="relative z-10 max-w-[46rem]">
					<span className="eyebrow">
						{build ? "For businesses" : "For learners"}
					</span>
					<h2 className="blast-title mt-4">
						{build ? (
							<>
								Build <span className="hot-text">with us</span>.
							</>
						) : (
							<>
								Start your <span className="hot-text">journey</span>.
							</>
						)}
					</h2>
					<p className="blast-lead mt-5">
						{build
							? "Tell us about the product you need. We’ll help you scope it, design it well, and build it right — then keep it running."
							: "Start any day, online or in person, with a payment plan that suits you — taught live by people who build software every day. Preparing for WAEC or JAMB? Our CBT training gets you exam-ready."}
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						{build ? (
							<Link to="/contact" className="btn btn-blast">
								Start a project <i aria-hidden="true">→</i>
							</Link>
						) : (
							<>
								<Link to="/courses" className="btn btn-blast">
									See courses & fees <i aria-hidden="true">→</i>
								</Link>
								<Link to="/cbt" className="btn btn-ghost">
									CBT Training for WAEC & JAMB
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

const STUDIO_PROCESS = [
	{
		n: "1",
		t: "Understand",
		d: "We start with the problem, not the feature list. You will know what we are building and why before we write a line.",
	},
	{
		n: "2",
		t: "Design",
		d: "Structure, data and edge cases worked out up front — because the expensive mistakes are the ones you build well.",
	},
	{
		n: "3",
		t: "Build & keep",
		d: "Shipped in working increments, then maintained. Updates, fixes, and someone to call when it breaks.",
	},
];

export function StudioProcess() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[42rem] mb-10">
				<Eyebrow variant="build">How we work</Eyebrow>
				<h2 className="shout mt-4">Understand first, then build.</h2>
				<p className="lead mt-4">
					A disciplined process that keeps scope, budget and quality under
					control.
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-5">
				{STUDIO_PROCESS.map((step) => (
					<div key={step.t} className="step-card reveal">
						<span className="step-num is-build">0{step.n}</span>
						<h3 className="display text-[1.5rem] mt-2">{step.t}</h3>
						<p className="lead mt-2 text-[0.97rem]">{step.d}</p>
					</div>
				))}
			</div>
		</section>
	);
}

/* the company's front page points to its training division once, quietly —
   enough to find it, not enough to blur the two */
export function AcademyPointer() {
	return (
		<section className="wrap py-10">
			<div className="reveal card p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
				<div className="max-w-[38rem]">
					<Eyebrow variant="plain">NexaHubTech Academy</Eyebrow>
					<h2 className="display text-[1.6rem] mt-3">
						Looking to learn rather than build?
					</h2>
					<p className="lead text-[0.97rem] mt-2">
						Our training division teaches software development, data, office
						productivity and video in live courses, online or in person.
					</p>
				</div>
				<Link to="/academy" className="btn btn-ghost shrink-0">
					Visit the Academy
				</Link>
			</div>
		</section>
	);
}
