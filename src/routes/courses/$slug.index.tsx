import { createFileRoute, Link } from "@tanstack/react-router";
import { SessionLoop } from "../../components/session-loop";
import { Eyebrow, useReveal } from "../../components/site";
import { COURSES, getCourseBySlug } from "../../lib/courses";
import { coursePage } from "../../lib/pages";
import { pageMeta } from "../../lib/seo";

export const Route = createFileRoute("/courses/$slug/")({
	component: CourseDetail,
	ssr: false,
	head: ({ params }) => {
		const course = getCourseBySlug(params.slug);
		return pageMeta(
			course
				? coursePage(course)
				: {
						title: "Course not found — NexaHubTech",
						description: "",
						path: `/courses/${params.slug}`,
						noindex: true,
					},
		);
	},
});

function CourseDetail() {
	const { slug } = Route.useParams();
	const course = getCourseBySlug(slug);
	useReveal();

	if (!course) {
		return (
			<section className="wrap page-head">
				<h1 className="display text-[2.6rem]">Course not found</h1>
				<p className="lead mt-4">
					The course you're looking for doesn't exist.
				</p>
				<Link to="/courses" className="btn btn-primary mt-6">
					View all courses
				</Link>
			</section>
		);
	}

	const currentIndex = COURSES.findIndex((c) => c.slug === slug);
	const prev = currentIndex > 0 ? COURSES[currentIndex - 1] : null;
	const next =
		currentIndex < COURSES.length - 1 ? COURSES[currentIndex + 1] : null;

	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						{course.d || "Course"}
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						{course.t}
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						{course.tagline}
					</p>
					<div className="rise rise-4 mt-6 flex flex-wrap items-center gap-4">
						<span className="display text-[1.4rem]">{course.price}</span>
						<span className="text-mute font-semibold">{course.duration}</span>
					</div>
					<div className="rise rise-5 mt-8 flex flex-wrap gap-3">
						<Link
							to="/enrol"
							search={{ course: course.slug }}
							className="btn btn-primary"
						>
							Enrol now
						</Link>
						<Link to="/courses" className="btn btn-ghost">
							All courses
						</Link>
					</div>
				</div>
			</section>

			{/* the idea the whole course hangs on — before any of the syllabus,
			    because that is the order we teach it in */}
			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-12">
					<div className="grid md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-start">
						<div>
							<Eyebrow>The mental model</Eyebrow>
							<h2 className="shout shout-md mt-4">{course.mentalModel.t}</h2>
							<p className="lead mt-4">{course.mentalModel.d}</p>
						</div>
						<div className="md:pt-2">
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								Once it lands
							</span>
							<div className="mt-3">
								{course.mentalModel.unlocks.map((u) => (
									<div key={u} className="feat">
										<span className="mk mk-learn" aria-hidden="true">
											→
										</span>
										<span>{u}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* what you'll learn, as a timeline the reader scrolls down. The items
			    animate on their own scroll timeline (styles.css), so they stay off
			    .reveal — its transform would fight the timeline's. */}
			<section className="wrap py-14">
				<div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14 items-start">
					<div className="reveal md:sticky md:top-28">
						<Eyebrow>What you'll learn</Eyebrow>
						<h2 className="shout shout-md mt-4">
							A path that builds on itself.
						</h2>
						<p className="lead mt-4">
							{course.modules.length} modules, in order. Each establishes the
							idea before the syntax, so the next one has something solid to
							stand on.
						</p>
					</div>
					<ol className="timeline">
						{course.modules.map((m) => (
							<li key={m.t} className="timeline-item">
								<span className="timeline-marker" aria-hidden="true">
									{m.n}
								</span>
								<div className="timeline-body">
									<span className="text-[0.78rem] text-mute font-semibold uppercase tracking-wider">
										Module {m.n}
									</span>
									<h3 className="display text-[1.25rem] mt-1">{m.t}</h3>
									<p className="lead mt-2 text-[0.95rem]">{m.d}</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</section>

			{/* features */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="build">Why this course</Eyebrow>
					<h2 className="shout shout-md mt-4">Built for real understanding.</h2>
				</div>
				<div className="grid sm:grid-cols-2 gap-4">
					{course.features.map((f) => (
						<div key={f} className="feat reveal">
							<span className="mk mk-learn">✓</span>
							<span>{f}</span>
						</div>
					))}
				</div>
			</section>

			{/* what a session looks like — drawn as a loop, because it is one:
			    the same three parts, every session */}
			<section className="wrap py-14">
				<div className="card reveal p-8 md:p-12">
					<div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-center">
						<div>
							<Eyebrow variant="build">Inside a session</Eyebrow>
							<h2 className="shout shout-md mt-4">Three parts, every time.</h2>
							<p className="lead mt-4">
								Our materials aren't generic bootcamp slides. Each session is
								structured to build understanding, then prove it — and the next
								one starts the loop again.
							</p>
						</div>
						<SessionLoop parts={course.session} />
					</div>
				</div>
			</section>

			{/* the honest check, immediately before the fee and the enrol button —
			    so nobody signs up for a course they can't take part in */}
			<section className="wrap py-14">
				<div className="reveal card p-8 md:p-12">
					<div className="max-w-[42rem]">
						<Eyebrow variant="plain">Before you start</Eyebrow>
						<h2 className="shout shout-md mt-4">
							What you need to take this course.
						</h2>
						<p className="lead mt-4">
							{course.requirements.level} — here is what to have ready before
							your first session, so nothing gets in the way once you start.
						</p>
					</div>
					<div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-9">
						<div>
							<h3 className="display text-[1.15rem]">What you need to know</h3>
							<div className="mt-3">
								{course.requirements.know.map((r) => (
									<div key={r} className="feat">
										<span className="mk mk-learn" aria-hidden="true">
											✓
										</span>
										<span>{r}</span>
									</div>
								))}
							</div>
						</div>
						<div>
							<h3 className="display text-[1.15rem]">What you need to have</h3>
							<div className="mt-3">
								{course.requirements.have.map((r) => (
									<div key={r} className="feat">
										<span className="mk mk-build" aria-hidden="true">
											✓
										</span>
										<span>{r}</span>
									</div>
								))}
							</div>
						</div>
					</div>
					<p className="text-[0.88rem] text-mute mt-8 pt-6 border-t border-[var(--line-soft)]">
						Not sure whether you meet these? Tell us where you are starting from
						and we will say honestly whether this is the right track for you.
					</p>
				</div>
			</section>

			{/* logistics */}
			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
					<div>
						<Eyebrow variant="plain">Format</Eyebrow>
						<h2 className="shout shout-md mt-4">{course.format.t}</h2>
						<p className="lead mt-4 max-w-[34rem]">{course.format.d}</p>
						<div className="flex items-center gap-6 mt-6">
							<div>
								<span className="display text-[1.6rem]">{course.price}</span>
								<p className="text-[0.85rem] text-mute mt-0.5">Course fee</p>
							</div>
							<div className="w-px h-10 bg-[var(--line)]" />
							<div>
								<span className="display text-[1.6rem]">{course.duration}</span>
								<p className="text-[0.85rem] text-mute mt-0.5">Duration</p>
							</div>
						</div>
					</div>
					<div className="card panel-learn p-8">
						<h3 className="display text-[1.3rem]">Ready to start?</h3>
						<p className="lead mt-2">
							Tell us a little about you and we'll agree your start date and
							session times.
						</p>
						<Link
							to="/enrol"
							search={{ course: course.slug }}
							className="btn btn-primary mt-5"
						>
							Enrol now
						</Link>
					</div>
				</div>
			</section>

			{/* navigation between courses */}
			<section className="wrap py-14">
				<div className="reveal grid sm:grid-cols-2 gap-5">
					{prev ? (
						<Link
							to="/courses/$slug"
							params={{ slug: prev.slug }}
							className="card card-lift p-7"
						>
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								← Previous
							</span>
							<h3 className="display text-[1.2rem] mt-2">{prev.t}</h3>
							<p className="lead mt-1 text-[0.9rem]">
								{prev.price} · {prev.duration}
							</p>
						</Link>
					) : (
						<div />
					)}
					{next ? (
						<Link
							to="/courses/$slug"
							params={{ slug: next.slug }}
							className="card card-lift p-7 text-right"
						>
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								Next →
							</span>
							<h3 className="display text-[1.2rem] mt-2">{next.t}</h3>
							<p className="lead mt-1 text-[0.9rem]">
								{next.price} · {next.duration}
							</p>
						</Link>
					) : (
						<div />
					)}
				</div>
			</section>
		</>
	);
}
