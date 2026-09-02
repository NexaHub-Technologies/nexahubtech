import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import { APPROACH, SCALING } from "../lib/approach";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/approach")({
	component: Approach,
	ssr: false,
	head: () =>
		pageMeta({
			title: "Our Approach — NexaHubTech",
			description:
				"How NexaHubTech works: we settle what should be built, and why, before any of it gets written — for company websites and for the software your members sign into.",
			path: "/approach",
			image: "/og/approach.jpg",
		}),
});

function Approach() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						How we work
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						We settle what should be built{" "}
						<span style={{ color: "var(--build-ink)" }}>
							before we build it
						</span>
						.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Whether it is a site that makes your company findable, or software
						your members sign into every week from a phone, the work starts the
						same way — with what should exist and why, settled and written down.
						It is slower to start with, and considerably cheaper to finish.
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link to="/contact" className="btn btn-teal">
							Start a project
						</Link>
						<Link to="/services" className="btn btn-ghost">
							What we build
						</Link>
					</div>
				</div>
			</section>

			{/* the argument for spending time here at all */}
			<section className="wrap py-14">
				<div className="reveal card panel-studio p-8 md:p-12">
					<div className="grid md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-start">
						<div>
							<Eyebrow variant="build">Why it works this way</Eyebrow>
							<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
								The expensive mistake is building the wrong thing well.
							</h2>
							<p className="lead mt-4">
								Software rarely fails because the code was poor. It fails
								because the wrong system was built carefully — the wrong data
								model, the wrong assumptions about who does what, the wrong
								guess about scale. Every one of those is cheap to change on
								paper and ruinous to change in production.
							</p>
							<p className="lead mt-4">
								So we do the thinking first, in the open, and write it down. You
								see the reasoning before you pay for the implementation.
							</p>
						</div>
						<div className="md:pt-2">
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								What that buys you
							</span>
							<div className="mt-3">
								{[
									"A written design you can read and disagree with",
									"A cost estimate grounded in decisions, not optimism",
									"Fewer surprises once the building has started",
									"A system whose shape someone can still explain in a year",
								].map((x) => (
									<div key={x} className="feat">
										<span className="mk mk-build" aria-hidden="true">
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

			{/* the process itself */}
			<section className="wrap py-14">
				<div className="reveal max-w-[42rem] mb-10">
					<Eyebrow variant="plain">The process</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Three phases, and what you hold at the end of each.
					</h2>
					<p className="lead mt-4">
						Understand the problem. Decide the architecture. Commit to it. Each
						phase ends with something written that you can read and disagree
						with, which is the only reason any of it is worth doing.
					</p>
				</div>

				{APPROACH.map((phase, i) => (
					<div key={phase.t} className={i > 0 ? "mt-14" : ""}>
						<div className="reveal grid md:grid-cols-[0.8fr_1.2fr] gap-4 md:gap-10 items-baseline pb-6 mb-6 border-b border-[var(--line-soft)]">
							<h3 className="display text-[1.5rem] sm:text-[1.7rem]">
								<span className="text-mute text-[0.95rem] font-semibold tracking-wider block mb-1">
									Phase {i + 1}
								</span>
								{phase.t}
							</h3>
							<p className="lead text-[0.97rem]">{phase.d}</p>
						</div>

						{/* the client's half. This is what a buyer is on the page to find
						    out, so it sits above the engineering detail rather than under
						    it. */}
						<div className="reveal card panel-studio p-7 md:p-8 grid md:grid-cols-2 gap-6 md:gap-9 mb-7">
							<div>
								<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
									What you do
								</span>
								<p className="lead mt-2 text-[0.95rem]">{phase.you.does}</p>
							</div>
							<div>
								<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
									What you have at the end
								</span>
								<p className="lead mt-2 text-[0.95rem]">{phase.you.gets}</p>
							</div>
						</div>

						<details className="reveal approach-detail">
							<summary>
								What we are doing in this phase
								<span className="text-mute"> · {phase.steps.length} steps</span>
							</summary>
							<div className="grid sm:grid-cols-2 gap-5 mt-5">
								{phase.steps.map((s) => (
									<div key={s.n} className="step-card">
										<span className="step-badge badge-build">{s.n}</span>
										<h4 className="display text-[1.2rem] mt-4">{s.t}</h4>
										<p className="lead mt-2 text-[0.95rem]">{s.d}</p>
									</div>
								))}
							</div>
						</details>
					</div>
				))}
			</section>

			{/* the objection a buyer has by now, answered before they leave */}
			<section className="wrap pb-4">
				<div className="reveal card p-8 md:p-10 max-w-[46rem]">
					<Eyebrow variant="build">Does every job get all of this?</Eyebrow>
					<p className="lead mt-4">{SCALING}</p>
				</div>
			</section>

			{/* it is the same idea the school teaches */}
			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-studio p-9">
						<Eyebrow variant="build">For businesses</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">
							Have something to build?
						</h3>
						<p className="lead mt-3">
							Tell us the problem rather than the solution. The first steps
							above are a conversation, and they cost you nothing.
						</p>
						<Link to="/contact" className="btn btn-teal mt-5">
							Start a project
						</Link>
					</div>
					<div className="card card-lift panel-learn p-9">
						<Eyebrow>The same idea, taught</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">
							This is what the school teaches.
						</h3>
						<p className="lead mt-3">
							Understand the model before the syntax — the pedagogy on every
							course is the process on this page, at a smaller scale.
						</p>
						<Link to="/courses" className="btn btn-primary mt-5">
							See the courses
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
