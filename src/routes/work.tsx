import { createFileRoute, Link } from "@tanstack/react-router";
import { TextSlot } from "../components/evidence";
import { Figure } from "../components/figure";
import { ClientQuotes, ClosingCTA } from "../components/home";
import { PageHead } from "../components/site";
import { CASE_STUDY_MEDIA } from "../lib/evidence";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";
import { WORK } from "../lib/work";

/* What we have built: the evidence for everything /services and /approach
   claim. Each case study has a screenshot slot, an optional phone slot and a
   slot for one measurable result — all filled from src/lib/evidence.ts.

   Still noindex: confirm permission to name DOMICOOP and ITC publicly before
   dropping `noindex` from PAGES.work (see lib/pages.ts). */
export const Route = createFileRoute("/work")({
	component: Work,
	head: () => pageMeta(PAGES.work),
});

function Work() {
	return (
		<>
			<PageHead
				eyebrow="Our work"
				title="What we've built."
				intro="Cooperative platforms, a two-sided marketplace, real-time video and an infinite canvas. Each is described by the problem it had to solve and the decisions that shaped it — the part worth judging us on."
			>
				<nav className="mt-7 flex flex-wrap gap-2" aria-label="Case studies">
					{WORK.map((w) => (
						<a key={w.slug} href={`#${w.slug}`} className="tech-chip">
							{w.t}
						</a>
					))}
				</nav>
			</PageHead>

			<div className="wrap grid gap-16 pb-8">
				{WORK.map((w) => {
					const media = CASE_STUDY_MEDIA[w.slug];
					return (
						<article
							key={w.slug}
							id={w.slug}
							className="rule pt-12 scroll-mt-24"
						>
							<div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 items-start">
								<div>
									<span className="kicker">{w.kind}</span>
									<h2 className="h2 mt-2">{w.t}</h2>
									<p className="lead mt-3 text-[1.05rem]">{w.tagline}</p>

									<h3 className="kicker mt-8">The problem</h3>
									<p className="lead mt-2 text-[0.96rem]">{w.problem}</p>

									<h3 className="kicker mt-6">How it was built</h3>
									<p className="lead mt-2 text-[0.96rem]">{w.approach}</p>

									<h3 className="kicker mt-6">Result</h3>
									<p className="lead mt-2 text-[0.96rem]">
										{media?.result ?? (
											<TextSlot>
												One measurable outcome in the client's terms — e.g.
												members onboarded, hours saved, approvals per week.
											</TextSlot>
										)}
									</p>

									<div className="flex flex-wrap gap-2 mt-6">
										{w.stack.map((s) => (
											<span key={s} className="tech-chip">
												{s}
											</span>
										))}
									</div>
								</div>

								{media ? (
									<div
										className={
											media.phone
												? "grid grid-cols-[1fr_0.36fr] gap-4 items-end"
												: ""
										}
									>
										<Figure {...media.cover} />
										{media.phone ? <Figure {...media.phone} /> : null}
									</div>
								) : null}
							</div>
						</article>
					);
				})}
			</div>

			<ClientQuotes />

			<ClosingCTA
				title="Have something like this to build?"
				lead="Tell us the problem rather than the solution. The first steps of the process are a conversation, and they cost you nothing."
				primary={{ to: "/contact", label: "Start a project" }}
				secondary={{ to: "/approach", label: "How we work" }}
			/>

			<section className="wrap pb-4">
				<p className="muted-note">
					NexaHubTech Academy builds its curriculum from engineering problems
					like these.{" "}
					<Link to="/academy" className="underline">
						Visit the Academy
					</Link>
					.
				</p>
			</section>
		</>
	);
}
