import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../../components/site";
import { pageMeta } from "../../lib/seo";
import { getServiceBySlug, SERVICES } from "../../lib/services";

export const Route = createFileRoute("/services/$slug")({
	component: ServiceDetail,
	ssr: false,
	head: ({ params }) => {
		const service = getServiceBySlug(params.slug);
		return pageMeta({
			title: service ? `${service.t} — NexaHubTech` : "Service — NexaHubTech",
			description: service?.tagline ?? "",
			path: `/services/${params.slug}`,
			image: `/og/service-${params.slug}.jpg`,
		});
	},
});

function ServiceDetail() {
	const { slug } = Route.useParams();
	const service = getServiceBySlug(slug);
	useReveal();

	if (!service) {
		return (
			<section className="wrap page-head">
				<h1 className="display text-[2.6rem]">Service not found</h1>
				<p className="lead mt-4">
					The service you're looking for doesn't exist.
				</p>
				<Link to="/services" className="btn btn-primary mt-6">
					View all services
				</Link>
			</section>
		);
	}

	const currentIndex = SERVICES.findIndex((s) => s.slug === slug);
	const prev = currentIndex > 0 ? SERVICES[currentIndex - 1] : null;
	const next =
		currentIndex < SERVICES.length - 1 ? SERVICES[currentIndex + 1] : null;

	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						The studio
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						{service.t}
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						{service.tagline}
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link to="/contact" className="btn btn-teal">
							Start a project
						</Link>
						<Link to="/services" className="btn btn-ghost">
							All services
						</Link>
					</div>
				</div>
			</section>

			{/* what it covers */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="build">What it covers</Eyebrow>
					<h2 className="shout shout-md mt-4">The work, specifically.</h2>
					<p className="lead mt-4">{service.d}</p>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{service.items.map((item, i) => (
						<div key={item.t} className="step-card reveal">
							<span className="step-badge badge-build">
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="display text-[1.2rem] mt-4">{item.t}</h3>
							<p className="lead mt-2 text-[0.95rem]">{item.d}</p>
						</div>
					))}
				</div>
			</section>

			{/* how we work */}
			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
					<div>
						<Eyebrow variant="plain">How we work</Eyebrow>
						<h2 className="shout shout-md mt-4">
							Understand first, then build.
						</h2>
						<p className="lead mt-4 max-w-[34rem]">
							We treat every project as a problem worth understanding before
							it's a thing worth building — the same principle the school is
							built on. You'll know what we're building and why before we write
							the first line.
						</p>
					</div>
					<div className="card panel-studio p-8">
						<h3 className="display text-[1.3rem]">Ready to talk?</h3>
						<p className="lead mt-2">
							Tell us what you're trying to solve and we'll come back with an
							honest scope.
						</p>
						<Link to="/contact" className="btn btn-teal mt-5">
							Start a project
						</Link>
					</div>
				</div>
			</section>

			{/* navigation between services */}
			<section className="wrap py-14">
				<div className="reveal grid sm:grid-cols-2 gap-5">
					{prev ? (
						<Link
							to="/services/$slug"
							params={{ slug: prev.slug }}
							className="card card-lift p-7"
						>
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								← Previous
							</span>
							<h3 className="display text-[1.2rem] mt-2">{prev.t}</h3>
							<p className="lead mt-1 text-[0.9rem]">{prev.tagline}</p>
						</Link>
					) : (
						<div />
					)}
					{next ? (
						<Link
							to="/services/$slug"
							params={{ slug: next.slug }}
							className="card card-lift p-7 text-right"
						>
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								Next →
							</span>
							<h3 className="display text-[1.2rem] mt-2">{next.t}</h3>
							<p className="lead mt-1 text-[0.9rem]">{next.tagline}</p>
						</Link>
					) : (
						<div />
					)}
				</div>
			</section>
		</>
	);
}
