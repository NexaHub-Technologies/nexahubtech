import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../../components/site";
import { pageMeta } from "../../lib/seo";
import { SERVICES } from "../../lib/services";

export const Route = createFileRoute("/services/")({
	component: ServicesIndex,
	ssr: false,
	head: () =>
		pageMeta({
			title: "Services — NexaHubTech",
			description:
				"What the NexaHubTech studio builds — custom software, websites, mobile apps, enterprise systems and API work, plus strategy, automation, cloud and support.",
			path: "/services",
			image: "/og/services.jpg",
		}),
});

function ServicesIndex() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Our Services
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Software, built{" "}
						<span style={{ color: "var(--build-ink)" }}>properly</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						The studio takes on the full range of client work — from a first
						product to the systems and support that keep it running. Same rigor
						we teach in the classroom, applied to your business.
					</p>
					<p className="rise rise-4 mt-4 text-[0.95rem] text-mute">
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
							className="card card-lift reveal panel-studio p-8 flex flex-col"
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
						className="card card-lift reveal panel-studio p-8 flex flex-col"
					>
						<Eyebrow variant="build">Before we build</Eyebrow>
						<h2 className="display text-[1.6rem] mt-3">
							Eleven steps come first.
						</h2>
						<p className="lead mt-3 text-[0.97rem] flex-1">
							Every project starts with system design — what should be built,
							and why — settled and written down before implementation.
						</p>
						<span className="view-link is-build mt-5">
							See how we work <i aria-hidden="true">→</i>
						</span>
					</Link>
					<Link
						to="/courses"
						className="card card-lift reveal panel-learn p-8 flex flex-col"
					>
						<Eyebrow>Looking to learn instead?</Eyebrow>
						<h2 className="display text-[1.6rem] mt-3">
							The school runs ten courses.
						</h2>
						<p className="lead mt-3 text-[0.97rem] flex-1">
							Frontend, React, Next.js, backend, fullstack, mobile,
							cybersecurity, Python, data and video — all cohort-based and
							hands-on.
						</p>
						<span className="view-link mt-5">
							Explore the courses <i aria-hidden="true">→</i>
						</span>
					</Link>

					<div className="card reveal p-8 flex flex-col">
						<Eyebrow variant="plain">Not sure which you need?</Eyebrow>
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
		</>
	);
}
