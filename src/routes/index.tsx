import { createFileRoute, Link } from "@tanstack/react-router";
import { useMode } from "../components/mode";
import { Eyebrow, useReveal } from "../components/site";
import { COURSE_COUNT, COURSE_COUNT_WORD_CAP } from "../lib/courses";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";
import { SERVICES } from "../lib/services";

export const Route = createFileRoute("/")({
	component: Home,
	ssr: false,
	head: () => pageMeta(PAGES.home),
});

/* ── hero visual : the learn → build journey, rendered warmly ───── */

function HeroStage() {
	return (
		<div className="hero-stage rise rise-3" aria-hidden="true">
			<div className="jcard j-learn">
				<span className="jlabel" style={{ color: "var(--learn-ink)" }}>
					<span className="jdot jdot-learn" />
					In the classroom
				</span>
				<p className="display text-[1.15rem] mt-2.5">
					How the browser actually thinks
				</p>
				<p className="text-[0.9rem] text-mute mt-1.5">
					Build the mental model first — the code comes easily after that.
				</p>
				<p className="text-[0.85rem] text-mute mt-4">
					Understand → practice → build.
				</p>
			</div>

			<span className="loop-tag">skills → service ↻</span>

			<div className="jcard j-build">
				<span className="jlabel" style={{ color: "var(--build-ink)" }}>
					<span className="jdot jdot-build" />
					In production
				</span>
				<p className="display text-[1.15rem] mt-2.5">
					A real product, shipped for a real client
				</p>
				<p className="text-[0.85rem] text-mute mt-4">
					Designed before it’s built — the same rigor we teach.
				</p>
			</div>
		</div>
	);
}

/* the hero speaks to whichever arm the visitor is in. Same company, same page —
   the mode decides who gets addressed first. */
const HERO_BY_MODE = {
	learn: {
		pill: "A tech school + a software studio",
		headA: "Learn to build.",
		headB: "Build ",
		headAccent: "for real",
		accentVar: "var(--learn-ink)",
		lead: "NexaHubTech teaches people the skills to become developers — then puts those skills to work building real products for real clients. Learning that's tied to actual work, not theory.",
		primary: { to: "/courses", label: "Explore the courses" },
		secondary: { to: "/contact", label: "Work with us" },
	},
	build: {
		pill: "A software studio + a tech school",
		headA: "Software, built",
		headB: "",
		headAccent: "properly",
		accentVar: "var(--build-ink)",
		lead: "NexaHubTech builds production software for businesses and founders — designed before it's built, and maintained after. The same rigor we teach in the classroom, applied to your product.",
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
function Hero() {
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
							Based in Nigeria · teaching and building for Africa and beyond.
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
		"Learn to build",
		"Build for real",
		"Taught live",
		"Mental model first",
		"Start when you're ready",
	],
	build: [
		"Software, built properly",
		"Designed before it's built",
		"Maintained after",
		"Shipped in increments",
		"Someone to call",
	],
} as const;

function Tapes() {
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
function Numbers() {
	const { mode } = useMode();
	const stats =
		mode === "build"
			? [
					{
						n: String(SERVICES.length),
						l: "service lines, from first build to support",
					},
					{ n: "3", l: "steps: understand, design, build & keep" },
					{ n: "1", l: "team that teaches what it ships" },
				]
			: [
					{ n: String(COURSE_COUNT), l: "tracks, taught live" },
					{ n: "3", l: "steps: understand, practice, build" },
					{ n: "1", l: "studio where the best learners ship real work" },
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

function Thesis() {
	return (
		<section className="wrap py-16 md:py-24">
			<span className="eyebrow is-plain text-mute">The idea</span>
			<p className="manifesto reveal mt-5">
				Most schools teach in a vacuum. We teach the skills{" "}
				<mark>and use them on live work</mark> — so what you learn is what the
				world <mark>actually pays for.</mark>
			</p>
			<p className="lead reveal mt-7 max-w-[38rem] text-[1.1rem]">
				One company, two connected arms. The studio's real problems shape the
				lessons; the school grows the people who help build what comes next.
			</p>
		</section>
	);
}

const LEARN_FEATS = [
	"Frontend foundations — HTML, CSS & JavaScript done properly",
	"Chunk-based teaching: the mental model first, then the syntax",
	"Structured session notes, exercise briefs & model answers",
	"Built to grow real engineering intuition — not copy-paste habits",
];
const BUILD_FEATS = [
	"Production software built for real businesses and founders",
	"Thoughtful, reliable products — designed before they’re built",
	"A studio that treats every project as a problem worth understanding",
	"Where our best learners get to work on the real thing",
];

function WhatWeDo() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[40rem] mb-10">
				<Eyebrow variant="plain">What we do</Eyebrow>
				<h2 className="shout mt-4">Two arms, one mission.</h2>
				<p className="lead mt-4">
					Teaching people to build, and building real things — each one makes
					the other better.
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="slab slab-learn panel-studio reveal">
					<span className="slab-word" aria-hidden="true">
						Learn
					</span>
					<Eyebrow>Learn · the school</Eyebrow>
					<h3 className="display mt-3 text-[2rem] sm:text-[2.3rem]">
						Become a developer, properly.
					</h3>
					<p className="lead mt-3">
						{COURSE_COUNT_WORD_CAP} tracks taught live, started whenever you are
						ready — PC basics, Microsoft Office, frontend, JavaScript, React,
						Next.js, backend, fullstack, mobile, cybersecurity, Python, data and
						video — for people who want to truly understand how things work.
					</p>
					<ul className="mt-5">
						{LEARN_FEATS.map((x) => (
							<li key={x} className="feat">
								<span className="mk mk-learn">✓</span>
								{x}
							</li>
						))}
					</ul>
					<div className="mt-7 flex flex-wrap items-center gap-4">
						<Link to="/courses" className="btn btn-primary">
							Explore the courses
						</Link>
						<Link to="/cbt" className="view-link">
							CBT for WAEC & JAMB <i aria-hidden="true">→</i>
						</Link>
					</div>
				</div>

				<div className="slab slab-build panel-studio reveal">
					<span className="slab-word" aria-hidden="true">
						Build
					</span>
					<Eyebrow variant="build">Build · the studio</Eyebrow>
					<h3 className="display mt-3 text-[2rem] sm:text-[2.3rem]">
						Get your product built right.
					</h3>
					<p className="lead mt-3">
						A software studio that builds production systems for clients — with
						the same care and rigor we teach in the classroom.
					</p>
					<ul className="mt-5">
						{BUILD_FEATS.map((x) => (
							<li key={x} className="feat">
								<span className="mk mk-build">✓</span>
								{x}
							</li>
						))}
					</ul>
					<div className="mt-7 flex flex-wrap items-center gap-4">
						<Link to="/services" className="btn btn-teal">
							See what we build
						</Link>
						<Link to="/contact" className="view-link is-build">
							Start a project <i aria-hidden="true">→</i>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

function Services() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[42rem] mb-10">
				<Eyebrow variant="build">What the studio builds</Eyebrow>
				<h2 className="shout mt-4">Beyond the classroom.</h2>
				<p className="lead mt-4">
					The studio takes on the full range of client work — from a first
					product to the systems and support that keep it running.
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

function Approach() {
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

const AUDIENCE = [
	{
		t: "Aspiring developers",
		d: "Whether you're just starting out or changing careers, we provide a clear path into web development with practical, hands-on learning from people who build software every day.",
	},
	{
		t: "Founders & businesses",
		d: "Need a reliable technology partner? We work closely with you to understand your goals and build software that supports your business as it grows.",
	},
	{
		t: "Our graduates",
		d: "Learning doesn't stop at graduation. We continue to support our alumni as they gain experience, work on real projects, and grow in their careers.",
	},
];

function Audience() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[40rem] mb-10">
				<Eyebrow variant="plain">Who it’s for</Eyebrow>
				<h2 className="shout mt-4">Built for people who want to build.</h2>
			</div>
			<div className="grid md:grid-cols-3 gap-5">
				{AUDIENCE.map((a) => (
					<div key={a.t} className="card card-lift audience-card reveal p-7">
						<h3 className="display text-[1.25rem]">{a.t}</h3>
						<p className="lead mt-3 text-[0.97rem]">{a.d}</p>
					</div>
				))}
			</div>
		</section>
	);
}

function ClosingCTA() {
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
							: "Start whenever you are ready and learn to build — the right way, taught live by people who do it every day. Or prepare for your WAEC and JAMB CBT exams at our Kubwa centre."}
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						{build ? (
							<Link to="/contact" className="btn btn-blast">
								Start a project <i aria-hidden="true">→</i>
							</Link>
						) : (
							<>
								<Link to="/courses" className="btn btn-blast">
									Explore the courses <i aria-hidden="true">→</i>
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

function StudioProcess() {
	return (
		<section className="wrap py-16">
			<div className="reveal max-w-[42rem] mb-10">
				<Eyebrow variant="build">How we work</Eyebrow>
				<h2 className="shout mt-4">Understand first, then build.</h2>
				<p className="lead mt-4">
					The same principle the school is built on, applied to client work.
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

function Home() {
	const { mode } = useMode();
	useReveal();

	/* the two sides are separate pages sharing a hero slot and a thesis — the studio
	   never shows the classroom's sections, and vice versa */
	if (mode === "build") {
		return (
			<>
				<Hero />
				<Tapes />
				<Numbers />
				<Thesis />
				<Services />
				<StudioProcess />
				<ClosingCTA />
			</>
		);
	}
	return (
		<>
			<Hero />
			<Tapes />
			<Numbers />
			<Thesis />
			<WhatWeDo />
			<Approach />
			<Audience />
			<ClosingCTA />
		</>
	);
}
