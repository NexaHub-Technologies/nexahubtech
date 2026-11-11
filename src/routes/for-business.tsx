import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT, Eyebrow, useReveal } from "../components/site";
import { BUSINESS_OFFERS } from "../lib/business";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/for-business")({
	component: ForBusinessPage,
	ssr: false,
	head: () => pageMeta(PAGES.forBusiness),
});

const proposalLink = (offer: string) =>
	`${CONTACT.whatsapp}?text=${encodeURIComponent(
		`Hello NexaHubTech! I would like a proposal for: ${offer}. We are…`,
	)}`;

const STEPS = [
	{
		n: "01",
		t: "Tell us who and what",
		d: "How many people, what they need to be able to do, and when they can attend. A few lines on WhatsApp is enough.",
	},
	{
		n: "02",
		t: "We send a proposal",
		d: "The course, the schedule, where it happens, and one price for the group — in writing, before anybody commits.",
	},
	{
		n: "03",
		t: "We teach, you see progress",
		d: "Same curriculum and materials as the public courses, built around your work where it helps.",
	},
];

function ForBusinessPage() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						For organisations
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Train your team,{" "}
						<span style={{ color: "var(--learn-ink)" }}>properly</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Staff who lose hours to Word and Excel. Candidates who have never
						sat a computer-based exam. A team that needs to learn to build. We
						teach them where it suits you — at your office, at our Kubwa centre,
						or live online.
					</p>
				</div>
			</section>

			<section className="wrap py-10 grid gap-6">
				{BUSINESS_OFFERS.map((o) => (
					<article key={o.id} className="card reveal p-8 md:p-10">
						<div className="grid md:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
							<div>
								<Eyebrow>{o.for}</Eyebrow>
								<h2 className="shout shout-md mt-4">{o.t}</h2>
								<p className="lead mt-4">{o.d}</p>
								<ul className="mt-5">
									{o.points.map((p) => (
										<li key={p} className="feat">
											<span className="mk mk-learn" aria-hidden="true">
												✓
											</span>
											<span>{p}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="card panel-learn p-7">
								<span className="display text-[2rem]">{o.price}</span>
								<p className="text-[0.88rem] text-mute mt-1">{o.unit}</p>
								<div className="mt-6 flex flex-col gap-3">
									<a
										href={proposalLink(o.t)}
										target="_blank"
										rel="noreferrer"
										className="btn btn-primary"
									>
										Ask for a proposal
									</a>
									{o.link ? (
										<a href={o.link.to} className="view-link justify-center">
											{o.link.label} <i aria-hidden="true">→</i>
										</a>
									) : null}
								</div>
							</div>
						</div>
					</article>
				))}
			</section>

			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="plain">How it works</Eyebrow>
					<h2 className="shout shout-md mt-4">Three steps, in writing.</h2>
				</div>
				<div className="grid md:grid-cols-3 gap-5">
					{STEPS.map((s) => (
						<div key={s.n} className="step-card reveal">
							<span className="step-num">{s.n}</span>
							<h3 className="display text-[1.35rem] mt-2">{s.t}</h3>
							<p className="lead mt-2 text-[0.95rem]">{s.d}</p>
						</div>
					))}
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal card p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
					<div className="max-w-[36rem]">
						<Eyebrow variant="build">Need software, not training?</Eyebrow>
						<h2 className="display text-[1.5rem] mt-3">
							The studio builds it for you.
						</h2>
						<p className="lead text-[0.97rem] mt-2">
							The same people who teach here build production software for
							businesses — designed before it is built, and maintained after.
						</p>
					</div>
					<div className="flex flex-wrap gap-3 shrink-0">
						<Link to="/services" className="btn btn-teal">
							See the studio
						</Link>
						<a href={`mailto:${CONTACT.email}`} className="btn btn-ghost">
							{CONTACT.email}
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
