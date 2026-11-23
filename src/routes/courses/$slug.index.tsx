import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { CourseIcon } from "../../components/course-icon";
import { PriceBox } from "../../components/fees";
import { Figure } from "../../components/figure";
import { CONTACT, Eyebrow } from "../../components/site";
import {
	deliveryPhrase,
	getCourseBySlug,
	isPaused,
	priceLabel,
	TRACKS,
} from "../../lib/courses";
import { coursePage } from "../../lib/pages";
import { pageMeta } from "../../lib/seo";

export const Route = createFileRoute("/courses/$slug/")({
	/* a paused course's old address lands on the catalogue, not a dead end.
	   302, because the course is coming back.
	   Legacy merged slugs redirect 301 to their new consolidated courses. */
	beforeLoad: ({ params }) => {
		if (params.slug === "pc-basics") {
			throw redirect({
				to: "/courses/$slug",
				params: { slug: "computer-essentials" },
				statusCode: 301,
			});
		}
		if (params.slug === "microsoft-office") {
			throw redirect({
				to: "/courses/$slug",
				params: { slug: "office-essentials" },
				statusCode: 301,
			});
		}
		if (isPaused(params.slug))
			throw redirect({ to: "/courses", statusCode: 302 });
	},
	component: CourseDetail,
	head: ({ params }) => {
		const course = getCourseBySlug(params.slug);
		return pageMeta(
			course
				? coursePage(course)
				: {
						title: "Course not found — NexaHubTech Academy",
						description: "",
						path: `/courses/${params.slug}`,
						noindex: true,
					},
		);
	},
});

/* A course page answers four questions, in the order a visitor asks them: what
   will I learn, what does it cost, is it for me, and how is it taught. The price
   sits beside the syllabus on a wide screen (and first on a phone), so it is
   always one glance away without being shouted. */
function CourseDetail() {
	const { slug } = Route.useParams();
	const course = getCourseBySlug(slug);

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

	const track = TRACKS.find((t) => t.id === course.family);
	const onRequest = course.admission === "on-request";

	return (
		<>
			<section className="wrap page-head">
				<div className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-6 relative">
					<div className="max-w-[46rem]">
						<Link to="/courses" hash={course.family} className="pill">
							{track?.t ?? "Course"}
							{course.d ? ` · ${course.d}` : ""}
						</Link>
						<h1 className="h1 mt-3">{course.t}</h1>
						<p className="lead mt-6 text-[1.1rem] max-w-[38rem]">
							{course.tagline}
						</p>
						<p className="mt-6 text-mute font-semibold">
							{course.duration} · {deliveryPhrase(course)} ·{" "}
							{onRequest ? "opens on request" : "start any day"} ·{" "}
							{priceLabel(course)}
						</p>
					</div>

					<CourseIcon
						slug={course.slug}
						className="w-16 h-16 md:w-28 md:h-28 shrink-0"
					/>
				</div>
			</section>

			{/* what you'll learn, with the price beside it. The timeline items
			    are a plain numbered list. */}
			<section className="wrap py-10">
				<div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14 items-start">
					<div>
						<Eyebrow>What you'll learn</Eyebrow>
						<h2 className="shout shout-md mt-4">
							{course.modules.length} modules, in order.
						</h2>
						<p className="lead mt-4 max-w-[36rem]">
							Each one establishes the idea before the syntax, so the next has
							something solid to stand on.
						</p>
						<ol className="timeline mt-8">
							{course.modules.map((m) => (
								<li key={m.t} className="timeline-item">
									<span className="timeline-marker" aria-hidden="true">
										{m.n}
									</span>
									<div className="timeline-body">
										<span className="text-[0.78rem] text-mute font-semibold uppercase tracking-wider">
											Module {m.n}
										</span>
										<h3 className="display text-[1.2rem] mt-1">{m.t}</h3>
										<p className="lead mt-2 text-[0.95rem]">{m.d}</p>
									</div>
								</li>
							))}
						</ol>
					</div>
					<aside
						id="price"
						className="order-first lg:order-none lg:sticky lg:top-28"
						aria-label="Price and enrolment"
					>
						<PriceBox course={course} />
					</aside>
				</div>
			</section>

			{/* the honest check — so nobody signs up for a course they can't take
			    part in */}
			<section className="wrap py-14">
				<div className="card p-8 md:p-12">
					<div className="max-w-[42rem]">
						<Eyebrow>Is it for me?</Eyebrow>
						<h2 className="shout shout-md mt-4">
							{course.requirements.level}.
						</h2>
					</div>
					<div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-8">
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
						Not sure? Tell us where you are starting from and we will say
						honestly whether this is the right course for you.
					</p>
				</div>
			</section>

			{/* how it is taught: the one idea the course hangs on, then the parts of
			    every session, in order */}
			<section className="wrap py-14">
				<div className="grid md:grid-cols-2 gap-6 items-stretch">
					<div className="card panel-learn p-8 md:p-10">
						<Eyebrow>The idea at its heart</Eyebrow>
						<h2 className="shout shout-md mt-4">{course.mentalModel.t}</h2>
						<p className="lead mt-4">{course.mentalModel.d}</p>
					</div>
					<div className="card p-8 md:p-10">
						<Eyebrow>How it's taught</Eyebrow>
						<h2 className="display text-[1.4rem] mt-4">{course.format.t}</h2>
						<p className="lead mt-3 text-[0.95rem]">{course.format.d}</p>
						<h3 className="kicker mt-6">The parts of a session</h3>
						<ol className="steps mt-4" aria-label="The parts of a session">
							{course.session.map((part) => (
								<li key={part.t}>
									<h4 className="font-bold text-ink">{part.t}</h4>
									<p className="lead mt-1 text-[0.93rem]">{part.d}</p>
								</li>
							))}
						</ol>
					</div>
				</div>
			</section>

			{/* what a learner made on it — from src/lib/evidence.ts */}
			<section className="wrap py-14">
				<div className="max-w-[52rem]">
					<Eyebrow>Made on this course</Eyebrow>
					<div className="mt-4">
						<Figure
							kind={course.family === "video" ? "photo" : "screenshot"}
							alt={`A learner's project from ${course.t}`}
							ratio="16 / 10"
						/>
					</div>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="card panel-learn p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
					<div className="max-w-[36rem]">
						<h2 className="display text-[1.6rem]">
							{onRequest ? "Interested?" : "Ready to start?"}
						</h2>
						<p className="lead text-[0.97rem] mt-2">
							{onRequest
								? "Register your interest and we will be in touch as soon as it opens."
								: "Enrol in a couple of minutes. We'll agree your start date and session with you."}
						</p>
					</div>
					<div className="flex flex-wrap gap-3 shrink-0">
						<Link
							to="/enrol"
							search={{ course: course.slug }}
							className="btn btn-primary"
						>
							{onRequest ? "Register your interest" : "Enrol"}
						</Link>
						<a
							href={CONTACT.whatsapp}
							target="_blank"
							rel="noreferrer"
							className="btn btn-ghost"
						>
							Ask on WhatsApp
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
