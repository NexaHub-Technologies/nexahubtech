import { createFileRoute, Link } from "@tanstack/react-router";
import { useMode } from "../components/mode";
import { Eyebrow, useReveal } from "../components/site";
import { COURSE_COUNT_WORD_CAP } from "../lib/courses";
import { pageMeta } from "../lib/seo";
import { SERVICES } from "../lib/services";

export const Route = createFileRoute("/")({
	component: Home,
	ssr: false,
	head: () =>
		pageMeta({
			title: "NexaHubTech — Learn to build. Build for real.",
			description:
				"NexaHubTech is a Nigeria-based skills-to-service company: a tech school and a software studio. We teach people to become developers, then put those skills to work building real products for real clients.",
			path: "/",
			image: "/og/home.jpg",
		}),
});

/* ── hero visual : the learn → build journey, rendered warmly ───── */

function HeroStage() {
	return (
		<div className="hero-stage rise rise-3" aria-hidden="true">
			<div className="softblob s-marigold" />
			<div className="softblob s-teal" />

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

function Hero() {
	const { mode } = useMode();
	const h = HERO_BY_MODE[mode];
	return (
		<section className="wrap pt-12 md:pt-16 pb-16">
			<div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
				<div>
					<span className="pill rise rise-1">
						<span className="spark" />
						{h.pill}
					</span>
					<h1
						className="display rise rise-2 mt-6 text-[2.8rem] sm:text-[3.6rem] lg:text-[4.1rem]"
						style={{ textWrap: "balance" }}
					>
						{h.headA}
						<br />
						{h.headB}
						<span style={{ color: h.accentVar }}>{h.headAccent}</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 max-w-[34rem] text-[1.12rem]">
						{h.lead}
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link to={h.primary.to} className="btn btn-primary">
							{h.primary.label}
						</Link>
						<Link to={h.secondary.to} className="btn btn-ghost">
							{h.secondary.label}
						</Link>
					</div>
					<p className="rise rise-5 mt-7 text-[0.92rem] text-mute">
						Based in Nigeria · teaching and building for Africa and beyond.
					</p>
				</div>

				<HeroStage />
			</div>
		</section>
	);
}

function Thesis() {
	return (
		<section className="wrap py-16">
			<div className="card reveal px-7 py-10 md:px-12 md:py-12 text-center">
				<span className="eyebrow is-plain text-mute justify-center">
					The idea
				</span>
				<p className="display mt-4 text-[1.7rem] sm:text-[2.2rem] max-w-[44rem] mx-auto leading-[1.25]">
					Most schools teach in a vacuum. We teach the skills{" "}
					<span style={{ color: "var(--learn-ink)" }}>and</span> use them on
					live work — so what you learn is what the world actually pays for.
				</p>
				<p className="lead mt-5 max-w-[36rem] mx-auto">
					One company, two connected arms. The studio's real problems shape the
					lessons; the school grows the people who help build what comes next.
				</p>
			</div>
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
				<h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
					Two arms, one mission.
				</h2>
				<p className="lead mt-4">
					Teaching people to build, and building real things — each one makes
					the other better.
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="card card-lift panel-learn reveal p-8">
					<Eyebrow>Learn · the school</Eyebrow>
					<h3 className="display mt-3 text-[1.7rem]">
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

				<div className="card card-lift panel-studio reveal p-8">
					<Eyebrow variant="build">Build · the studio</Eyebrow>
					<h3 className="display mt-3 text-[1.7rem]">
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
				<h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
					Beyond the classroom.
				</h2>
				<p className="lead mt-4">
					The studio takes on the full range of client work — from a first
					product to the systems and support that keep it running.
				</p>
			</div>
			<div className="grid md:grid-cols-2 gap-5">
				{SERVICES.map((s) => (
					<Link
						key={s.slug}
						to="/services/$slug"
						params={{ slug: s.slug }}
						className="card card-lift reveal panel-studio p-8 flex flex-col"
					>
						<h3 className="display text-[1.5rem]">{s.t}</h3>
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
				<h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
					Mental model first. Syntax second.
				</h2>
				<p className="lead mt-4">
					Most courses start with code and hope understanding catches up. We do
					it the other way around — and it’s why our learners actually get it.
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-5">
				{APPROACH.map((s, i) => (
					<div key={s.t} className="step-card reveal">
						<span
							className={`step-badge ${i === 2 ? "badge-build" : "badge-learn"}`}
						>
							{s.n}
						</span>
						<h3 className="display text-[1.3rem] mt-4">{s.t}</h3>
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
				<h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
					Built for people who want to build.
				</h2>
			</div>
			<div className="grid md:grid-cols-3 gap-5">
				{AUDIENCE.map((a) => (
					<div key={a.t} className="card card-lift reveal p-7">
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
	if (mode === "build") {
		return (
			<section className="wrap py-16">
				<div className="reveal card card-lift panel-studio p-9 md:p-12">
					<Eyebrow variant="build">For businesses</Eyebrow>
					<h3 className="display text-[1.9rem] mt-3">Build with us.</h3>
					<p className="lead mt-3 max-w-[40rem]">
						Tell us about the product you need. We’ll help you scope it, design
						it well, and build it right — then keep it running.
					</p>
					<Link to="/contact" className="btn btn-teal mt-6">
						Start a project
					</Link>
				</div>
			</section>
		);
	}
	return (
		<section className="wrap py-16">
			<div className="reveal card card-lift panel-learn p-9 md:p-12">
				<Eyebrow>For learners</Eyebrow>
				<h3 className="display text-[1.9rem] mt-3">Start your journey.</h3>
				<p className="lead mt-3 max-w-[40rem]">
					Start whenever you are ready and learn to build — the right way,
					taught live by people who do it every day. Or prepare for your WAEC
					and JAMB CBT exams at our Kubwa centre.
				</p>
				<div className="mt-6 flex flex-wrap gap-3">
					<Link to="/courses" className="btn btn-primary">
						Explore the courses
					</Link>
					<Link to="/cbt" className="btn btn-ghost">
						CBT Training for WAEC & JAMB
					</Link>
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
				<h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
					Understand first, then build.
				</h2>
				<p className="lead mt-4">
					The same principle the school is built on, applied to client work.
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-5">
				{STUDIO_PROCESS.map((step) => (
					<div key={step.t} className="step-card reveal">
						<span className="step-badge badge-build">{step.n}</span>
						<h3 className="display text-[1.3rem] mt-4">{step.t}</h3>
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
			<Thesis />
			<WhatWeDo />
			<Approach />
			<Audience />
			<ClosingCTA />
		</>
	);
}
