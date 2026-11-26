import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { AVAILABLE_FOR_PROJECTS, BOOK_A_CALL } from "../lib/contact";
import {
	CENTRE_SEATS,
	coursesIn,
	formatNaira,
	lowestFee,
	TRACKS,
} from "../lib/courses";
import {
	ACADEMY_PHOTOS,
	CLIENT_LOGOS,
	CLIENT_TESTIMONIALS,
	FEATURED_WORK,
	HOME_HERO,
	LEARNER_TESTIMONIALS,
	LEARNER_WORK,
} from "../lib/evidence";
import { followPointerGlow } from "../lib/pointer-glow";
import { SERVICES } from "../lib/services";
import { WORK } from "../lib/work";
import { DoodleTile, TrackIcon } from "./course-icon";
import { CaseStudyCard, LogoRow, Quote, TextSlot } from "./evidence";
import { Figure } from "./figure";
import { Eyebrow, SectionHead } from "./site";

/* The sections of the two front pages: the company's at / and the Academy's at
   /academy. Calm by design — a headline, the evidence, and a way to act. Every
   image is a slot that shows a labelled placeholder until real material is
   added in src/lib/evidence.ts. */

/* ── shared ─────────────────────────────────────────────────────── */

export function Hero({
	eyebrow,
	title,
	lead,
	primary,
	secondary,
	figure,
	note,
}: {
	eyebrow: string;
	title: React.ReactNode;
	lead: string;
	primary: { to: string; label: string };
	secondary: { to: string; label: string };
	figure: React.ReactNode;
	note?: string;
}) {
	return (
		<section className="wrap pt-12 pb-14 md:pt-16 md:pb-20">
			<div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
				<div>
					<Eyebrow>{eyebrow}</Eyebrow>
					<h1 className="h1 mt-4">{title}</h1>
					<p className="lead mt-5 text-[1.12rem] max-w-[34rem]">{lead}</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link to={primary.to} className="btn btn-primary">
							{primary.label}
						</Link>
						<Link to={secondary.to} className="btn btn-ghost">
							{secondary.label}
						</Link>
					</div>
					{note ? <p className="muted-note mt-6">{note}</p> : null}
				</div>
				<div>{figure}</div>
			</div>
		</section>
	);
}

export function ClosingCTA({
	title,
	lead,
	primary,
	secondary,
}: {
	title: string;
	lead: string;
	primary: { to: string; label: string };
	secondary?: { to: string; label: string };
}) {
	return (
		<section className="wrap section">
			<div className="cta-stage p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center justify-between">
				<div className="max-w-[36rem]">
					<h2 className="h2">{title}</h2>
					<p className="lead mt-3">{lead}</p>
				</div>
				<div className="flex flex-wrap gap-3 shrink-0">
					<Link to={primary.to} className="btn btn-primary">
						{primary.label}
					</Link>
					{secondary ? (
						<Link to={secondary.to} className="btn btn-ghost">
							{secondary.label}
						</Link>
					) : null}
				</div>
			</div>
		</section>
	);
}

/* ── the company's front page ───────────────────────────────────── */

/* The front page's opening. One confident headline in the site's own type,
   framed by four tiles for the kinds of software the studio builds — the
   brand's code doodles, as on the course icons — then the pitch, the two
   actions, and the company's motto as the shape of every project. */

const WORK_TILES = [
	{ doodle: "globe", t: "Web apps", pos: "is-tl" },
	{ doodle: "phone", t: "Mobile apps", pos: "is-bl" },
	{ doodle: "server", t: "Backends & APIs", pos: "is-tr" },
	{ doodle: "chart", t: "Dashboards & data", pos: "is-br" },
] as const;

const MOTTO_STEPS = [
	{ t: "Design.", d: "The problem first, then a plan you sign off." },
	{ t: "Ship.", d: "Working software, in increments you can use." },
	{ t: "Support.", d: "Fixes, updates and someone to call, after launch." },
];

/* The NHT mark, drawn as the outline from the code-doodle pack (the logo's
   own geometry), set large and faint behind the hero with a soft glow. It is
   decoration: hidden from screen readers and behind the content. */
const MARK_PATH =
	"M0,0L385.6,0L385.6,100L100,100L100,578.4L0,578.4ZM485.6,1156.8L771.2,1156.8L771.2,1256.8L485.6,1256.8ZM1256.8,1253.2L871.2,1253.2L871.2,1153.2L1156.8,1153.2L1156.8,674.8L1256.8,674.8ZM1256.8,3.6L1256.8,582L1156.8,582L1156.8,103.6L871.2,103.6L871.2,3.6ZM485.6,0L771.2,0L771.2,100L485.6,100ZM100,678.4L100,1156.8L385.6,1156.8L385.6,1256.8L0,1256.8L0,678.4ZM192.8,192.8H1064V1064H192.8Z";

/* A brighter copy of the mark sits on top, shown only in a soft circle around
   the mouse, so the glow drifts after the pointer and lights the lines it
   passes (see lib/pointer-glow.ts). The hero carries the moving halo; the
   mark carries the brighter lines. */
function useGlowFollowsPointer() {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const mark = ref.current;
		const hero = mark?.parentElement;
		if (!mark || !hero) return;
		return followPointerGlow({
			area: hero,
			layers: [{ el: hero }, { el: mark }],
		});
	}, []);
	return ref;
}

function HeroMark() {
	const ref = useGlowFollowsPointer();
	return (
		<div ref={ref} className="hero-mark" aria-hidden="true">
			<svg viewBox="-40 -40 1337 1337" focusable="false" aria-hidden="true">
				<path className="hero-mark-glow" d={MARK_PATH} />
				<path className="hero-mark-line" d={MARK_PATH} />
			</svg>
			<div className="hero-mark-spot">
				<svg viewBox="-40 -40 1337 1337" focusable="false" aria-hidden="true">
					<path className="hero-mark-glow" d={MARK_PATH} />
					<path className="hero-mark-line" d={MARK_PATH} />
				</svg>
			</div>
		</div>
	);
}

export function StudioHero() {
	return (
		<section className="studio-hero">
			<HeroMark />
			<div className="wrap relative z-[1] flex flex-col items-center text-center">
				<p className="hero-status">
					<span
						className={`avail-dot${AVAILABLE_FOR_PROJECTS ? "" : " is-busy"}`}
						aria-hidden="true"
					/>
					<span>
						<span className="hidden sm:inline">Software studio · Abuja · </span>
						{AVAILABLE_FOR_PROJECTS
							? "taking on new projects"
							: "booked up, taking enquiries"}
					</span>
				</p>

				<div className="hero-stage">
					<h1 className="hero-title">
						Software,
						<br />
						built <span className="hot-text">properly.</span>
					</h1>
					<ul className="hero-tiles" aria-label="What we build">
						{WORK_TILES.map((w) => (
							<li key={w.t} className={`hero-tile ${w.pos}`}>
								<DoodleTile
									name={w.doodle}
									className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem]"
								/>
								<span>{w.t}</span>
							</li>
						))}
					</ul>
				</div>

				<p className="lead mt-8 text-[1.12rem] max-w-[38rem]">
					We design, build and maintain production software for businesses and
					founders — scoped carefully, built properly, and supported long after
					launch.
				</p>
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					<Link to="/contact" className="btn btn-primary">
						Start a project
					</Link>
					<a
						href={BOOK_A_CALL}
						target="_blank"
						rel="noreferrer"
						className="btn btn-ghost"
					>
						Book a call
					</a>
				</div>

				<ol className="motto-strip" aria-label="How every project runs">
					{MOTTO_STEPS.map((m) => (
						<li key={m.t}>
							<span className="motto-word">{m.t}</span>
							<span className="motto-note">{m.d}</span>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}

/* the logos of organisations we have built for */
export function ClientLogos() {
	return (
		<section className="wrap pb-10">
			<p className="kicker mb-4 text-center">Organisations we have built for</p>
			<LogoRow logos={CLIENT_LOGOS} />
		</section>
	);
}

/* the best screen of the best shipped product, wide, under the opening */
export function ProductShowcase() {
	return (
		<section className="wrap pb-6">
			<Figure {...HOME_HERO} ratio="16 / 8" />
		</section>
	);
}

export function FeaturedWork() {
	const featured = FEATURED_WORK.map((slug) =>
		WORK.find((w) => w.slug === slug),
	).filter((w) => w !== undefined);
	return (
		<section className="wrap section">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
				<SectionHead
					eyebrow="Selected work"
					title="What we have built."
					intro="Each project is written up as the problem it had to solve and the decisions that shaped it."
				/>
				<Link to="/work" className="view-link shrink-0">
					All work <i aria-hidden="true">→</i>
				</Link>
			</div>
			<div className="grid md:grid-cols-2 gap-6">
				{featured.map((w) => (
					<CaseStudyCard key={w.slug} work={w} />
				))}
			</div>
		</section>
	);
}

export function Services() {
	return (
		<section className="band">
			<div className="wrap section">
				<SectionHead
					eyebrow="What we do"
					title="From a first product to long-term support."
					intro="We take on the full range of client work — the product, the systems around it, and the support that keeps it running."
					className="mb-10"
				/>
				<div className="grid md:grid-cols-2 gap-6">
					{SERVICES.map((s) => (
						<Link
							key={s.slug}
							to="/services/$slug"
							params={{ slug: s.slug }}
							className="card p-7 flex flex-col"
						>
							<h3 className="h3 text-[1.35rem]">{s.t}</h3>
							<p className="lead mt-2 text-[0.97rem]">{s.tagline}</p>
							<ul className="mt-5 grid gap-1.5 flex-1">
								{s.items.slice(0, 4).map((i) => (
									<li key={i.t} className="text-[0.93rem] text-ink-soft">
										· {i.t}
									</li>
								))}
							</ul>
							<span className="view-link mt-6">
								{s.items.length} services <i aria-hidden="true">→</i>
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

const STUDIO_PROCESS = [
	{
		t: "Understand",
		d: "We start with the problem, not the feature list. You will know what we are building and why before we write a line.",
	},
	{
		t: "Design",
		d: "Structure, data and edge cases worked out up front — because the expensive mistakes are the ones you build well.",
	},
	{
		t: "Build and keep",
		d: "Shipped in working increments, then maintained. Updates, fixes, and someone to call when it breaks.",
	},
];

export function StudioProcess() {
	return (
		<section className="wrap section">
			<div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
				<div>
					<SectionHead
						eyebrow="How we work"
						title="Understand first, then build."
						intro="Most software goes wrong before it is written. A disciplined process keeps scope, budget and quality under control."
					/>
					<Link to="/approach" className="view-link mt-6">
						The full process <i aria-hidden="true">→</i>
					</Link>
				</div>
				<ol className="steps">
					{STUDIO_PROCESS.map((s) => (
						<li key={s.t}>
							<h3 className="h3">{s.t}</h3>
							<p className="lead mt-1 text-[0.97rem]">{s.d}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}

export function ClientQuotes() {
	return (
		<section className="wrap section pt-0">
			<SectionHead
				eyebrow="In their words"
				title="What clients say."
				className="mb-8"
			/>
			<div className="grid md:grid-cols-2 gap-6">
				{CLIENT_TESTIMONIALS.map((t, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed slots
					<Quote key={i} t={t} />
				))}
			</div>
		</section>
	);
}

/* the company's front page points to its Academy once — enough to find it */
export function AcademyPointer() {
	return (
		<section className="band">
			<div className="wrap section grid lg:grid-cols-2 gap-10 items-center">
				<Figure {...ACADEMY_PHOTOS.hero} />
				<div>
					<SectionHead
						eyebrow="NexaHubTech Academy"
						arm="academy"
						title="We also teach what we practise."
						intro="Our Academy runs live courses in computers, coding, data and video — online, or in person at our centre in Kubwa, in classes of no more than six."
					/>
					<div className="mt-7 flex flex-wrap gap-3">
						<Link to="/academy" className="btn btn-ghost">
							Visit the Academy
						</Link>
						<Link to="/courses" className="view-link self-center">
							See the courses <i aria-hidden="true">→</i>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ── the Academy's front page ───────────────────────────────────── */

export function AcademyHero() {
	return (
		<Hero
			eyebrow="NexaHubTech Academy"
			title="Learn tech, the right way."
			lead="Practical courses in computers, coding, data and video — taught live by people who build real software every day. Online or in person, and you can start any day."
			primary={{ to: "/courses", label: "Explore courses" }}
			secondary={{ to: "/enrol", label: "Enrol" }}
			figure={<Figure {...ACADEMY_PHOTOS.hero} />}
			note="The training arm of NexaHubTech · online, and in person in Kubwa, Abuja."
		/>
	);
}

const FACTS = [
	{
		t: "Live and instructor-led",
		d: "Every session is taught by a person, not a video.",
	},
	{
		t: "Online or in person",
		d: "Same instructor, same materials, either way.",
	},
	{
		t: `At most ${CENTRE_SEATS} in a class`,
		d: "Small enough that nobody gets left behind.",
	},
	{ t: "Start any day", d: "No intakes to wait for. Pay in full or in parts." },
];

export function AcademyFacts() {
	return (
		<section className="wrap pb-6">
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 rule pt-8">
				{FACTS.map((f) => (
					<div key={f.t}>
						<h3 className="font-bold text-ink">{f.t}</h3>
						<p className="text-[0.92rem] text-mute mt-1">{f.d}</p>
					</div>
				))}
			</div>
		</section>
	);
}

/* the three tracks, each with where its prices start */
export function Tracks() {
	return (
		<section className="wrap section">
			<SectionHead
				eyebrow="Choose a track"
				title="Wherever you are, there is a next step."
				className="mb-10"
			/>
			<div className="grid md:grid-cols-3 gap-6">
				{TRACKS.map((t) => {
					const courses = coursesIn(t.id);
					const from = formatNaira(Math.min(...courses.map(lowestFee)));
					return (
						<Link
							key={t.id}
							to="/courses"
							hash={t.id}
							className="card card-lift p-7 flex flex-col"
						>
							<TrackIcon track={t.id} className="w-14 h-14" />
							<span className="kicker mt-5">{t.who}</span>
							<h3 className="h3 text-[1.35rem] mt-2">{t.t}</h3>
							<p className="lead mt-2 text-[0.95rem] flex-1">{t.d}</p>
							<p className="mt-5 pt-4 rule text-[0.92rem] font-semibold text-ink">
								{courses.length} courses · from {from}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

const HOW_IT_WORKS = [
	{
		t: "Choose a course",
		d: "Every course page says who it is for, what you need before day one, and what each module covers.",
	},
	{
		t: "Pick how you learn",
		d: `Live online from anywhere, or in person in a class of no more than ${CENTRE_SEATS}. One price per course, payable in parts.`,
	},
	{
		t: "Start any day",
		d: "Enrol, and we agree your start date and weekly session with you.",
	},
];

export function HowItWorks() {
	return (
		<section className="band">
			<div className="wrap section grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
				<SectionHead
					eyebrow="How it works"
					title="Three steps to your first session."
				/>
				<ol className="steps">
					{HOW_IT_WORKS.map((s) => (
						<li key={s.t}>
							<h3 className="h3">{s.t}</h3>
							<p className="lead mt-1 text-[0.97rem]">{s.d}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}

export function InsideTheCentre() {
	return (
		<section className="wrap section">
			<SectionHead
				eyebrow="Where you learn"
				title="A small room, and a live session online."
				intro={`In person, you learn at our centre in Kubwa with no more than ${CENTRE_SEATS} others and a machine if you need one. Online, you join the same live session from wherever you are.`}
				className="mb-10"
			/>
			<div className="grid md:grid-cols-3 gap-6">
				<Figure {...ACADEMY_PHOTOS.room} caption="The learning centre" />
				<Figure
					{...ACADEMY_PHOTOS.instructor}
					caption="Working through an exercise"
				/>
				<Figure
					{...ACADEMY_PHOTOS.online}
					ratio="4 / 3"
					caption="Learning online"
				/>
			</div>
			<Link to="/about" hash="visit" className="view-link mt-8">
				Visit the centre <i aria-hidden="true">→</i>
			</Link>
		</section>
	);
}

export function LearnerWork() {
	return (
		<section className="band">
			<div className="wrap section">
				<SectionHead
					eyebrow="Learner work"
					title="What our learners have built."
					intro="Every course ends with something real — a site, a dashboard, an edit — made by the learner, not copied from a tutorial."
					className="mb-10"
				/>
				<div className="grid md:grid-cols-3 gap-6">
					{LEARNER_WORK.map((w, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed slots
						<article key={i}>
							<Figure {...w.image} ratio="16 / 10" />
							<h3 className="font-bold text-ink mt-3">
								{w.title ?? <TextSlot>Project title</TextSlot>}
							</h3>
							<p className="text-[0.88rem] text-mute mt-0.5">
								{w.by && w.course ? (
									`${w.by} · ${w.course}`
								) : (
									<TextSlot>Learner · course</TextSlot>
								)}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

export function LearnerQuotes() {
	return (
		<section className="wrap section">
			<SectionHead
				eyebrow="In their words"
				title="What learners say."
				className="mb-8"
			/>
			<div className="grid md:grid-cols-3 gap-6">
				{LEARNER_TESTIMONIALS.map((t, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed slots
					<Quote key={i} t={t} who="learner" />
				))}
			</div>
		</section>
	);
}

/* the Academy's link back to the studio — why the teaching is credible */
export function StudioProof() {
	return (
		<section className="wrap section pt-0">
			<div className="grid md:grid-cols-2 gap-6">
				<div className="card panel-learn p-8">
					<Eyebrow>Taught by builders</Eyebrow>
					<h3 className="h3 text-[1.35rem] mt-3">
						The people who teach also ship software for clients.
					</h3>
					<p className="lead mt-3 text-[0.97rem]">
						The problems NexaHubTech's studio solves for clients shape our
						lessons, and our strongest learners get to work on real projects.
					</p>
					<Link to="/work" className="view-link mt-5">
						See the studio's work <i aria-hidden="true">→</i>
					</Link>
				</div>
				<div className="card panel-learn p-8">
					<Eyebrow>Also at the Academy</Eyebrow>
					<h3 className="h3 text-[1.35rem] mt-3">
						CBT prep, and training for organisations.
					</h3>
					<p className="lead mt-3 text-[0.97rem]">
						WAEC and JAMB practice on exam-style software, and training for
						teams, schools and church media units at our centre or yours.
					</p>
					<div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
						<Link to="/cbt" className="view-link">
							CBT prep <i aria-hidden="true">→</i>
						</Link>
						<Link to="/for-business" className="view-link">
							Organisations <i aria-hidden="true">→</i>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
