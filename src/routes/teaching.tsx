import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import { COURSES } from "../lib/courses";
import { pageMeta } from "../lib/seo";
import { ANTIPATTERNS, PRINCIPLES, SESSION } from "../lib/teaching";

export const Route = createFileRoute("/teaching")({
	component: Teaching,
	ssr: false,
	head: () =>
		pageMeta({
			title: "How We Teach — NexaHubTech",
			description:
				"The pedagogy behind every NexaHubTech course: the mental model before the syntax, one idea at a time, and a session built in three parts.",
			path: "/teaching",
			image: "/og/teaching.jpg",
		}),
});

function Teaching() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						How we teach
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Understand it first.{" "}
						<span style={{ color: "var(--learn-ink)" }}>
							Then build with it
						</span>
						.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Every course here is built on the same method, and it is not the one
						most bootcamps use. It is slower through the first weeks, and it is
						why people finish able to work on things nobody showed them.
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link to="/courses" className="btn btn-primary">
							See the courses
						</Link>
						<Link
							to="/enrol"
							search={{ course: undefined }}
							className="btn btn-ghost"
						>
							Enrol
						</Link>
					</div>
				</div>
			</section>

			{/* the argument */}
			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-12">
					<div className="grid md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-start">
						<div>
							<Eyebrow>Why it works this way</Eyebrow>
							<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
								Most people are taught the syntax and never given the idea.
							</h2>
							<p className="lead mt-4">
								That is why so many people finish a course able to rebuild the
								project they were shown and nothing else. They were given the
								steps without the reason, so the moment the problem changes
								shape there is nothing to reason from.
							</p>
							<p className="lead mt-4">
								We teach the reason first. It feels slower for a fortnight and
								then it compounds, because every new thing you meet attaches to
								something you already understand.
							</p>
						</div>
						<div className="md:pt-2">
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								What that changes
							</span>
							<div className="mt-3">
								{[
									"You can read code that nobody wrote for a lesson",
									"You debug by reasoning, not by trying things",
									"A new framework is a variation, not a new subject",
									"You can explain your own work to someone else",
								].map((x) => (
									<div key={x} className="feat">
										<span className="mk mk-learn" aria-hidden="true">
											✓
										</span>
										<span>{x}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* the principles */}
			<section className="wrap py-14">
				<div className="reveal max-w-[42rem] mb-9">
					<Eyebrow variant="plain">The method</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Four rules we don't bend.
					</h2>
					<p className="lead mt-4">
						They shape how every session is written, how exercises are pitched,
						and what we refuse to do to keep a syllabus looking impressive.
					</p>
				</div>
				<div className="grid sm:grid-cols-2 gap-5">
					{PRINCIPLES.map((p) => (
						<div key={p.n} className="step-card reveal">
							<span className="step-badge badge-learn">{p.n}</span>
							<h3 className="display text-[1.2rem] mt-4">{p.t}</h3>
							<p className="lead mt-2 text-[0.95rem]">{p.d}</p>
						</div>
					))}
				</div>
			</section>

			{/* the session shape */}
			<section className="wrap py-14">
				<div className="reveal card p-8 md:p-12">
					<div className="max-w-[42rem]">
						<Eyebrow variant="build">Inside a session</Eyebrow>
						<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
							Three parts, every time.
						</h2>
						<p className="lead mt-4">
							The same shape across all {COURSES.length} courses, because the
							order is the point: the idea, then your attempt, then something to
							measure it against.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-5 mt-9">
						{SESSION.map((s) => (
							<div key={s.n} className="card panel-learn p-7 flex flex-col">
								<span className="step-badge badge-learn">{s.n}</span>
								<h3 className="display text-[1.2rem] mt-4">{s.t}</h3>
								<p className="lead mt-2 text-[0.95rem] flex-1">{s.d}</p>
								<p className="mt-4 pt-4 border-t border-[var(--line-soft)] text-[0.88rem] text-mute italic">
									{s.why}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* what we refuse to do */}
			<section className="wrap py-14">
				<div className="reveal max-w-[42rem] mb-9">
					<Eyebrow variant="plain">Just as important</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						What you won't find here.
					</h2>
					<p className="lead mt-4">
						A teaching method is defined as much by what it leaves out. These
						are the four things we have decided not to do, and why.
					</p>
				</div>
				<div className="grid sm:grid-cols-2 gap-5">
					{ANTIPATTERNS.map((a) => (
						<div key={a.t} className="card reveal p-7">
							<div className="flex items-start gap-3">
								<span
									className="mk"
									aria-hidden="true"
									style={{
										background: "rgba(240, 107, 168, 0.16)",
										color: "#9d1b48",
									}}
								>
									✕
								</span>
								<div>
									<h3 className="display text-[1.15rem]">{a.t}</h3>
									<p className="lead mt-2 text-[0.95rem]">{a.d}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* the same idea, on the studio side */}
			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-learn p-9">
						<Eyebrow>Ready to start</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">
							Pick a track and see the outline.
						</h3>
						<p className="lead mt-3">
							Every course page opens with the one idea it exists to teach, then
							what you need to know and have before day one.
						</p>
						<Link to="/courses" className="btn btn-primary mt-5">
							Explore the courses
						</Link>
					</div>
					<div className="card card-lift panel-studio p-9">
						<Eyebrow variant="build">The same idea, applied</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">
							It is how the studio works too.
						</h3>
						<p className="lead mt-3">
							Understand before you build is not only a teaching method here —
							it is eleven steps of system design before any client project gets
							written.
						</p>
						<Link to="/approach" className="btn btn-teal mt-5">
							See how we build
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
