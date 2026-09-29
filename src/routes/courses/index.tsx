import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../../components/site";
import { COURSE_COUNT_WORD_CAP, COURSES } from "../../lib/courses";
import { pageMeta } from "../../lib/seo";

export const Route = createFileRoute("/courses/")({
	component: CoursesIndex,
	ssr: false,
	head: () =>
		pageMeta({
			title: "Courses — NexaHubTech",
			description:
				"Explore all courses at NexaHubTech — from web development, JavaScript, React and Next.js to cybersecurity, data analysis and videography. Learn real skills with live, hands-on teaching you can start at any time.",
			path: "/courses",
			image: "/og/courses.jpg",
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
						<span style={{ color: "var(--learn-ink)" }}>taught properly</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						{COURSE_COUNT_WORD_CAP} courses built on the same principle:
						understand first, then build. Every track is taught live by an
						instructor, starts whenever you are ready, and is designed to grow
						real capability — not just familiarity.
					</p>
					<p className="rise rise-4 mt-4 text-[0.95rem] text-mute">
						Select a course to see its modules, what a session looks like, and
						how to enrol.
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
							className="card card-lift reveal panel-learn p-7 flex flex-col"
						>
							<div className="flex items-center gap-3 mb-4">
								<span className="step-badge badge-learn">
									{String(i + 1).padStart(2, "0")}
								</span>
								{c.d && (
									<span className="pill text-[0.75rem] !py-1 !px-2.5">
										{c.d}
									</span>
								)}
							</div>
							<h2 className="display text-[1.3rem]">{c.t}</h2>
							<p className="lead mt-2 text-[0.95rem] flex-1">{c.tagline}</p>
							<span className="course-level">{c.requirements.level}</span>
							<div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--line-soft)]">
								<span className="display text-[1.05rem]">{c.price}</span>
								<span className="text-[0.85rem] text-mute font-semibold">
									{c.duration}
								</span>
							</div>
							<span className="view-link mt-3">
								View course <i aria-hidden="true">→</i>
							</span>
						</Link>
					))}
				</div>
			</section>

			{/* CBT Training Banner */}
			<section className="wrap pb-8">
				<div className="reveal card panel-learn p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
					<div className="max-w-[36rem]">
						<span className="pill text-[0.78rem] !py-1 !px-2.5">
							Exam Preparation · In-Person in Kubwa
						</span>
						<h2 className="display text-[1.6rem] mt-3">
							Preparing for WAEC or JAMB CBT?
						</h2>
						<p className="lead text-[0.97rem] mt-2">
							We run dedicated Computer-Based Test training at our Kubwa lab —
							covering the JAMB 8-key system, on-screen calculator drills, time
							management, and full-length timed mock exams.
						</p>
					</div>
					<div className="flex flex-wrap gap-3 shrink-0">
						<Link to="/cbt" className="btn btn-primary">
							View CBT training
						</Link>
						<Link
							to="/enrol"
							search={{ course: "cbt-training" }}
							className="btn btn-ghost"
						>
							Register now
						</Link>
					</div>
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
							<Link to="/teaching" className="view-link mt-5">
								How we teach, in full <i aria-hidden="true">→</i>
							</Link>
						</div>
						<div className="card panel-learn p-8">
							<h3 className="display text-[1.3rem]">Ready to start?</h3>
							<p className="lead mt-2">
								Pick a course and tell us a little about you. We'll agree your
								start date and session times.
							</p>
							<Link
								to="/enrol"
								search={{ course: undefined }}
								className="btn btn-primary mt-5"
							>
								Enrol now
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
