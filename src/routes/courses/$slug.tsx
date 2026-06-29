import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../../components/site";
import { COURSES, getCourseBySlug } from "../../lib/courses";

export const Route = createFileRoute("/courses/$slug")({
	component: CourseDetail,
	ssr: false,
	head: ({ params }) => {
		const course = getCourseBySlug(params.slug);
		return {
			meta: [
				{
					title: course ? `${course.t} — NexaHubTech` : "Course — NexaHubTech",
				},
				{
					name: "description",
					content: course?.tagline ?? "",
				},
			],
		};
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
						<Link to="/contact" className="btn btn-primary">
							Enrol now
						</Link>
						<Link to="/courses" className="btn btn-ghost">
							All courses
						</Link>
					</div>
				</div>
			</section>

			{/* what you'll learn */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow>What you'll learn</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						A path that builds on itself.
					</h2>
					<p className="lead mt-4">
						Each step establishes the idea before the syntax, so the next one
						has something solid to stand on.
					</p>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{course.modules.map((m, i) => (
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
				</div>
			</section>

			{/* features */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="build">Why this course</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Built for real understanding.
					</h2>
				</div>
				<div className="grid sm:grid-cols-2 gap-4">
					{course.features.map((f) => (
						<div key={f} className="feat reveal">
							<span
								className={`mk ${course.category === "build" ? "mk-build" : "mk-learn"}`}
							>
								✓
							</span>
							<span>{f}</span>
						</div>
					))}
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
							Our materials aren't generic bootcamp slides. Each session is
							structured to build understanding, then prove it.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-5 mt-8">
						{course.session.map((s) => (
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
					<div
						className={`card p-8 ${course.category === "build" ? "panel-build" : "panel-learn"}`}
					>
						<h3 className="display text-[1.3rem]">Ready to start?</h3>
						<p className="lead mt-2">
							Tell us a little about you and we'll share the next cohort
							details.
						</p>
						<Link to="/contact" className="btn btn-primary mt-5">
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
