import { createFileRoute, Link } from "@tanstack/react-router";
import { PriceBox } from "../../components/fees";
import { SessionLoop } from "../../components/session-loop";
import { CONTACT, Eyebrow, useReveal } from "../../components/site";
import {
	deliveryPhrase,
	getCourseBySlug,
	priceLabel,
	TRACKS,
} from "../../lib/courses";
import { coursePage } from "../../lib/pages";
import { pageMeta } from "../../lib/seo";

export const Route = createFileRoute("/courses/$slug/")({
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

	const track = TRACKS.find((t) => t.id === course.family);
	const onRequest = course.admission === "on-request";

	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<Link to="/courses" hash={course.family} className="pill rise rise-1">
						<span className="spark" />
						{track?.t ?? "Course"}
						{course.d ? ` · ${course.d}` : ""}
					</Link>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						{course.t}
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						{course.tagline}
					</p>
					<p className="rise rise-4 mt-6 text-mute font-semibold">
						{course.duration} · {deliveryPhrase(course)} ·{" "}
						{onRequest ? "opens on request" : "start any day"} ·{" "}
						{priceLabel(course)}
					</p>
				</div>
			</section>

			{/* what you'll learn, with the price beside it. The timeline items
			    animate on their own scroll timeline (styles.css), so they stay off
			    .reveal — its transform would fight the timeline's. */}
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
				<div className="reveal card p-8 md:p-12">
					<div className="max-w-[42rem]">
						<Eyebrow variant="plain">Is it for me?</Eyebrow>
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

			{/* how it is taught: the one idea the course hangs on, then the shape of
			    every session — drawn as a loop, because it is one */}
			<section className="wrap py-14">
				<div className="grid md:grid-cols-2 gap-6 items-stretch">
					<div className="reveal card panel-learn p-8 md:p-10">
						<Eyebrow>The idea at its heart</Eyebrow>
						<h2 className="shout shout-md mt-4">{course.mentalModel.t}</h2>
						<p className="lead mt-4">{course.mentalModel.d}</p>
					</div>
					<div className="reveal card p-8 md:p-10">
						<Eyebrow variant="build">How it's taught</Eyebrow>
						<h2 className="display text-[1.4rem] mt-4">{course.format.t}</h2>
						<p className="lead mt-3 text-[0.95rem]">{course.format.d}</p>
						<div className="mt-6">
							<SessionLoop parts={course.session} />
						</div>
					</div>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
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
