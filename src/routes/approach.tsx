import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import { APPROACH, APPROACH_STEP_COUNT } from "../lib/approach";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/approach")({
	component: Approach,
	ssr: false,
	head: () =>
		pageMeta({
			title: "Our Approach — NexaHubTech",
			description:
				"The system design process behind every NexaHubTech build: eleven steps that settle what should be built, and why, before any of it gets written.",
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
						Eleven steps before{" "}
						<span style={{ color: "var(--build-ink)" }}>a line of code</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Every project we take on starts the same way — by settling what
						should be built and why, before any of it gets written. It is slower
						to start with, and considerably cheaper to finish.
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link to="/contact" className="btn btn-teal">
							Start a project
						</Link>
						<Link to="/work" className="btn btn-ghost">
							See the work
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
						{APPROACH_STEP_COUNT} steps, in three movements.
					</h2>
					<p className="lead mt-4">
						Understand the problem. Decide the architecture. Commit to it. Each
						step exists because skipping it has cost somebody a rebuild.
					</p>
				</div>

				{APPROACH.map((phase, i) => (
					<div key={phase.t} className={i > 0 ? "mt-14" : ""}>
						<div className="reveal grid md:grid-cols-[0.8fr_1.2fr] gap-4 md:gap-10 items-baseline pb-6 mb-6 border-b border-[var(--line-soft)]">
							<h3 className="display text-[1.5rem] sm:text-[1.7rem]">
								{phase.t}
							</h3>
							<p className="lead text-[0.97rem]">{phase.d}</p>
						</div>
						<div className="grid sm:grid-cols-2 gap-5">
							{phase.steps.map((s) => (
								<div key={s.n} className="step-card reveal">
									<span className="step-badge badge-build">{s.n}</span>
									<h4 className="display text-[1.2rem] mt-4">{s.t}</h4>
									<p className="lead mt-2 text-[0.95rem]">{s.d}</p>
								</div>
							))}
						</div>
					</div>
				))}
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
