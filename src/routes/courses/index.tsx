import { createFileRoute, Link } from "@tanstack/react-router";
import { FeeLines } from "../../components/fees";
import { Eyebrow, useReveal } from "../../components/site";
import {
	bundleSaving,
	CENTRE_SEATS,
	COURSE_COUNT_WORD_CAP,
	COURSES,
	coursesAt,
	formatNaira,
	getCourseBySlug,
	LEVELS,
} from "../../lib/courses";
import { PAGES } from "../../lib/pages";
import { pageMeta } from "../../lib/seo";

export const Route = createFileRoute("/courses/")({
	component: CoursesIndex,
	ssr: false,
	head: () => pageMeta(PAGES.courses),
});

/* one sensible route through the catalogue, for somebody who has not chosen
   yet. Every stop is a real course — an unknown slug fails the build. */
const PATH = [
	"computer-essentials",
	"pc-basics",
	"frontend-development",
	"backend-development",
	"react-development",
	"nextjs-fullstack",
].map((slug) => {
	const c = getCourseBySlug(slug);
	if (!c) throw new Error(`courses/index: ${slug} is not a course`);
	return c;
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
						understand first, then build. Every one is taught live by an
						instructor — online, or in a group of at most {CENTRE_SEATS} at our
						Kubwa centre — and starts whenever you are ready.
					</p>
					<p className="rise rise-4 mt-4 text-[0.95rem] text-mute">
						Every fee can be paid in full or in instalments.{" "}
						<Link to="/fees" className="underline font-semibold">
							All fees on one page
						</Link>{" "}
						·{" "}
						<Link to="/timetable" className="underline font-semibold">
							Session times
						</Link>
					</p>
				</div>
			</section>

			<section className="wrap pt-4 pb-6">
				<div className="reveal card p-6 md:p-7">
					<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
						Not sure where to start? One route through
					</span>
					<div className="path-row mt-3">
						{PATH.map((c, i) => (
							<span key={c.slug} className="contents">
								{i > 0 && (
									<span className="path-arrow" aria-hidden="true">
										→
									</span>
								)}
								<Link
									to="/courses/$slug"
									params={{ slug: c.slug }}
									className="path-chip"
								>
									{c.t}
								</Link>
							</span>
						))}
					</div>
				</div>
			</section>

			{LEVELS.map((level) => (
				<section key={level.id} className="wrap py-10" id={level.id}>
					<div className="reveal max-w-[42rem] mb-7">
						<Eyebrow>{level.t}</Eyebrow>
						<p className="lead mt-3">{level.d}</p>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{coursesAt(level.id).map((c) => {
							const saving = bundleSaving(c);
							return (
								<Link
									key={c.slug}
									to="/courses/$slug"
									params={{ slug: c.slug }}
									className="card card-lift reveal panel-learn p-7 flex flex-col"
								>
									<div className="flex items-center gap-3 mb-4">
										<span className="step-badge badge-learn">
											{String(COURSES.indexOf(c) + 1).padStart(2, "0")}
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
									{saving && c.bundle ? (
										<span className="course-level">
											{c.bundle.parts
												.map((s) => getCourseBySlug(s)?.t ?? s)
												.join(" + ")}{" "}
											in one track — save {formatNaira(saving)}
										</span>
									) : null}
									<div className="mt-4 pt-4 border-t border-[var(--line-soft)]">
										<FeeLines course={c} />
									</div>
									<div className="flex items-center justify-between mt-3">
										<span className="text-[0.85rem] text-mute font-semibold">
											{c.duration} ·{" "}
											{c.admission === "rolling"
												? "start any day"
												: "on request"}
										</span>
										<span className="view-link">
											View <i aria-hidden="true">→</i>
										</span>
									</div>
								</Link>
							);
						})}
					</div>
				</section>
			))}

			{/* CBT Training Banner */}
			<section className="wrap py-8">
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
							<h2 className="shout shout-md mt-4">
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
								start date and which weekly session you join.
							</p>
							<div className="mt-5 flex flex-wrap gap-3">
								<Link
									to="/enrol"
									search={{ course: undefined }}
									className="btn btn-primary"
								>
									Enrol now
								</Link>
								<Link to="/for-business" className="btn btn-ghost">
									Training a team?
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
