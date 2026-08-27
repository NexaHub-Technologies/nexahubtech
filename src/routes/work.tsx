import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import { pageMeta } from "../lib/seo";
import { WORK } from "../lib/work";

/* Hidden for now: off the nav and out of the sitemap while permission to name
   DOMICOP and ITC publicly is unconfirmed. The page still renders for anyone with
   the URL, which makes it usable as a preview — noindex keeps it out of search in
   the meantime. To publish: drop `noindex`, restore the NAV entry in
   components/site.tsx, put "/work" back in scripts/generate-sitemap.ts and
   regenerate, and repoint the /approach hero link here. */
export const Route = createFileRoute("/work")({
	component: Work,
	ssr: false,
	head: () =>
		pageMeta({
			title: "Our Work — NexaHubTech",
			description:
				"Case studies from the NexaHubTech studio: cooperative society platforms, a two-sided parking marketplace, a real-time video platform, and an infinite-canvas social product.",
			path: "/work",
			image: "/og/work.jpg",
			noindex: true,
		}),
});

function Work() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Our work
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						What we've <span style={{ color: "var(--build-ink)" }}>built</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Cooperative platforms, a two-sided marketplace, real-time video and
						an infinite canvas. Each one is described by the problem it had to
						solve and the decision that made it interesting, because that is the
						part worth judging us on.
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link to="/contact" className="btn btn-teal">
							Start a project
						</Link>
						<Link to="/approach" className="btn btn-ghost">
							How we work
						</Link>
					</div>
				</div>
			</section>

			<section className="wrap pb-4">
				<div className="reveal card panel-studio p-7 md:p-8">
					<p className="lead text-[0.98rem]">
						Every one of these started the same way — with system design settled
						and written down before implementation.{" "}
						<Link to="/approach" className="underline">
							The eleven steps
						</Link>{" "}
						are what these projects are the evidence for.
					</p>
				</div>
			</section>

			<section className="wrap py-10">
				<div className="grid gap-6">
					{WORK.map((w) => (
						<article key={w.slug} className="reveal card p-8 md:p-10">
							<div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
								<h2 className="display text-[1.8rem] sm:text-[2.1rem]">
									{w.t}
								</h2>
								<span className="pill text-[0.75rem] !py-1 !px-2.5">
									{w.kind}
								</span>
							</div>
							<p className="lead mt-3 text-[1.05rem] max-w-[44rem]">
								{w.tagline}
							</p>

							<div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-8">
								<div>
									<span className="text-[0.78rem] text-mute font-semibold uppercase tracking-wider">
										The problem
									</span>
									<p className="lead mt-2 text-[0.95rem]">{w.problem}</p>
								</div>
								<div>
									<span className="text-[0.78rem] text-mute font-semibold uppercase tracking-wider">
										How it was built
									</span>
									<p className="lead mt-2 text-[0.95rem]">{w.approach}</p>
								</div>
							</div>

							<div className="mt-8 pt-6 border-t border-[var(--line-soft)]">
								<span className="text-[0.78rem] text-mute font-semibold uppercase tracking-wider">
									Stack
								</span>
								<div className="flex flex-wrap gap-2 mt-3">
									{w.stack.map((s) => (
										<span key={s} className="tech-chip">
											{s}
										</span>
									))}
								</div>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-studio p-9">
						<Eyebrow variant="build">For businesses</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">
							Have something like this to build?
						</h3>
						<p className="lead mt-3">
							Tell us the problem rather than the solution. The first steps of
							the process are a conversation, and they cost you nothing.
						</p>
						<Link to="/contact" className="btn btn-teal mt-5">
							Start a project
						</Link>
					</div>
					<div className="card card-lift panel-learn p-9">
						<Eyebrow>The other arm</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">
							These are what the school teaches from.
						</h3>
						<p className="lead mt-3">
							The curriculum is built out of real engineering problems, which is
							the whole reason the studio and the school sit in one company.
						</p>
						<Link to="/courses" className="btn btn-primary mt-5">
							See the courses
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
