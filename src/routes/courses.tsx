import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";

export const Route = createFileRoute("/courses")({
	component: Courses,
	head: () => ({
		meta: [
			{ title: "Courses — NexaHubTech" },
			{
				name: "description",
				content:
					"The NexaHubTech Frontend Track: learn HTML, CSS and JavaScript from first principles, with chunk-based teaching that builds real understanding before syntax.",
			},
		],
	}),
});

const CURRICULUM = [
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
];

const SESSION = [
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
		d: "A worked solution to compare against, so you learn what “good” looks like.",
	},
];

function Courses() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						The Frontend Track
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Learn the web from{" "}
						<span style={{ color: "var(--marigold-ink)" }}>
							first principles
						</span>
						.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						A frontend web development course in HTML, CSS and JavaScript — with
						fullstack ambitions ahead. It’s built for people who want to
						genuinely understand how things work, not memorize syntax and hope.
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link to="/contact" className="btn btn-primary">
							Join the next cohort
						</Link>
						<Link to="/about" className="btn btn-ghost">
							Why we teach this way
						</Link>
					</div>
				</div>
			</section>

			{/* what you'll learn */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow>What you’ll learn</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						A path that builds on itself.
					</h2>
					<p className="lead mt-4">
						Each step establishes the idea before the syntax, so the next one
						has something solid to stand on.
					</p>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{CURRICULUM.map((m, i) => (
						<div key={m.t} className="step-card reveal">
							<span
								className={`step-badge ${i % 2 ? "badge-build" : "badge-learn"}`}
							>
								{m.n}
							</span>
							<h3 className="display text-[1.2rem] mt-4">{m.t}</h3>
							<p className="lead mt-2 text-[0.95rem]">{m.d}</p>
						</div>
					))}
					<div className="card panel-learn reveal p-6 flex flex-col justify-center">
						<h3 className="display text-[1.2rem]">…and fullstack next</h3>
						<p className="lead mt-2 text-[0.95rem]">
							The track grows as you do. Fullstack foundations are on the
							roadmap.
						</p>
					</div>
				</div>
			</section>

			{/* what a session looks like */}
			<section className="wrap py-14">
				<div className="card reveal p-8 md:p-12">
					<div className="max-w-[40rem]">
						<Eyebrow variant="build">Inside a session</Eyebrow>
						<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
							Three parts, every time.
						</h2>
						<p className="lead mt-4">
							Our materials aren’t generic bootcamp slides. Each session is
							structured to build understanding, then prove it.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-5 mt-8">
						{SESSION.map((s) => (
							<div key={s.t} className="card panel-build p-6">
								<h3 className="display text-[1.15rem]">{s.t}</h3>
								<p className="lead mt-2 text-[0.95rem]">{s.d}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* logistics */}
			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
					<div>
						<Eyebrow variant="plain">Format</Eyebrow>
						<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
							Cohort-based, online, hands-on.
						</h2>
						<p className="lead mt-4 max-w-[34rem]">
							You learn alongside a cohort, with structured materials and real
							feedback. Content has been delivered to active cohorts over
							WhatsApp, keeping it close and accessible.
						</p>
						<p className="devnote mt-5">
							Add before launch: price · schedule · cohort length · next start
							date · how to enrol.
						</p>
					</div>
					<div className="card panel-learn p-8">
						<h3 className="display text-[1.3rem]">Ready to start?</h3>
						<p className="lead mt-2">
							Tell us a little about you and we’ll share the next cohort
							details.
						</p>
						<Link to="/contact" className="btn btn-primary mt-5">
							Join the next cohort
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
