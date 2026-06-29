import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../../components/site";
import { COURSES } from "../../lib/courses";

export const Route = createFileRoute("/courses/")({
	component: CoursesIndex,
	ssr: false,
	head: () => ({
		meta: [
			{ title: "Courses — NexaHubTech" },
			{
				name: "description",
				content:
					"Explore all courses at NexaHubTech — from web development and cybersecurity to data analysis and videography. Learn real skills with cohort-based, hands-on teaching.",
			},
		],
	}),
});

function CoursesIndex() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Our Courses
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Real skills,{" "}
						<span style={{ color: "var(--marigold-ink)" }}>
							taught properly
						</span>
						.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Eight courses built on the same principle: understand first, then
						build. Every track is cohort-based, hands-on, and designed to grow
						real capability — not just familiarity.
					</p>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{COURSES.map((c, i) => (
						<Link
							key={c.slug}
							to="/courses/$slug"
							params={{ slug: c.slug }}
							className={`card card-lift reveal p-7 flex flex-col ${i % 2 ? "panel-build" : "panel-learn"}`}
						>
							<div className="flex items-center gap-3 mb-4">
								<span
									className={`step-badge ${c.category === "build" ? "badge-build" : "badge-learn"}`}
								>
									{String(i + 1).padStart(2, "0")}
								</span>
								{c.d && (
									<span
										className={`pill text-[0.75rem] !py-1 !px-2.5 ${c.category === "build" ? "!border-[rgba(74,16,99,0.2)]" : ""}`}
									>
										{c.d}
									</span>
								)}
							</div>
							<h2 className="display text-[1.3rem]">{c.t}</h2>
							<p className="lead mt-2 text-[0.95rem] flex-1">{c.tagline}</p>
							<div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--line-soft)]">
								<span className="display text-[1.05rem]">{c.price}</span>
								<span className="text-[0.85rem] text-mute font-semibold">
									{c.duration}
								</span>
							</div>
						</Link>
					))}
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal card p-8 md:p-12">
					<div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
						<div>
							<Eyebrow>How we teach</Eyebrow>
							<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
								Every course, same approach.
							</h2>
							<p className="lead mt-4 max-w-[34rem]">
								Mental model first, then practice, then a model answer. No
								slides-to-death. No copy-paste tutorials. Every session is
								structured to build understanding, then prove it.
							</p>
						</div>
						<div className="card panel-learn p-8">
							<h3 className="display text-[1.3rem]">Ready to start?</h3>
							<p className="lead mt-2">
								Pick a course and tell us a little about you. We'll share the
								next cohort details.
							</p>
							<Link to="/contact" className="btn btn-primary mt-5">
								Enrol now
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
