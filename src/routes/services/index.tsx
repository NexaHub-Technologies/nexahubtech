import { createFileRoute, Link } from "@tanstack/react-router";
import { FeaturedWork } from "../../components/home";
import { Eyebrow } from "../../components/site";
import { COURSE_COUNT_WORD } from "../../lib/courses";
import { PAGES } from "../../lib/pages";
import { pageMeta } from "../../lib/seo";
import { SERVICES } from "../../lib/services";

export const Route = createFileRoute("/services/")({
	component: ServicesIndex,
	head: () => pageMeta(PAGES.services),
});

function ServicesIndex() {
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill">Our Services</span>
					<h1 className="h1 mt-3">
						Software, built{" "}
						<span style={{ color: "var(--build-ink)" }}>properly</span>.
					</h1>
					<p className="lead mt-6 text-[1.1rem] max-w-[38rem]">
						We take on the full range of client work — from a first product to
						the systems and support that keep it running.
					</p>
					<p className="mt-4 text-[0.95rem] text-mute">
						Select a service to see what it covers in detail.
					</p>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="grid md:grid-cols-2 gap-5">
					{SERVICES.map((s) => (
						<Link
							key={s.slug}
							to="/services/$slug"
							params={{ slug: s.slug }}
							className="card card-lift panel-studio p-8 flex flex-col"
						>
							<h2 className="display text-[1.6rem]">{s.t}</h2>
							<p className="lead mt-3 text-[0.97rem] flex-1">{s.tagline}</p>
							<p className="text-[0.85rem] text-mute font-semibold mt-5 pt-4 border-t border-[var(--line-soft)]">
								{s.items.length} services
							</p>
							<span className="view-link mt-3">
								View services <i aria-hidden="true">→</i>
							</span>
						</Link>
					))}
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
					<Link
						to="/approach"
						className="card card-lift panel-studio p-8 flex flex-col"
					>
						<Eyebrow>Before we build</Eyebrow>
						<h2 className="display text-[1.6rem] mt-3">Design comes first.</h2>
						<p className="lead mt-3 text-[0.97rem] flex-1">
							Every project starts by settling what should be built and why,
							written down and agreed with you, before implementation begins.
						</p>
						<span className="view-link is-build mt-5">
							See how we work <i aria-hidden="true">→</i>
						</span>
					</Link>
					<Link
						to="/academy"
						className="card card-lift panel-learn p-8 flex flex-col"
					>
						<Eyebrow arm="academy">Looking to learn instead?</Eyebrow>
						<h2 className="display text-[1.6rem] mt-3">
							NexaHubTech Academy runs {COURSE_COUNT_WORD} courses.
						</h2>
						<p className="lead mt-3 text-[0.97rem] flex-1">
							Our Academy teaches software development, data, office
							productivity and video — live, online or in person, starting
							whenever you are ready.
						</p>
						<span className="view-link mt-5">
							Visit the Academy <i aria-hidden="true">→</i>
						</span>
					</Link>

					<div className="card p-8 flex flex-col">
						<Eyebrow>Not sure which you need?</Eyebrow>
						<h2 className="display text-[1.6rem] mt-3">Tell us the problem.</h2>
						<p className="lead mt-3 text-[0.97rem] flex-1">
							Describe what you're trying to solve and we'll tell you honestly
							what it would take — including when the answer is "less than you
							think".
						</p>
						<Link to="/contact" className="btn btn-teal mt-6 self-start">
							Start a project
						</Link>
					</div>
				</div>
			</section>
			<FeaturedWork />
		</>
	);
}
