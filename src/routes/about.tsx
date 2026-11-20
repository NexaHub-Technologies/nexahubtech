import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import {
	ACADEMY_SUMMARY,
	DEFINITION,
	MISSION,
	SUMMARY,
	THESIS,
	VALUES,
	VISION,
} from "../lib/company";
import { COURSE_COUNT_WORD_CAP } from "../lib/courses";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/about")({
	component: About,
	head: () => pageMeta(PAGES.about),
});

/* Founders section is hidden for now. To restore it, uncomment this data and
   the matching {/* founders *\/} block inside About().

   Real roles from the company profile PDF, to use when the copy is ready:
     Agbo Divine    — Chief Executive Officer & Co-Founder
     Onuoha Michael — Chief Technology Officer, Lead Technical Architect
                      & Co-Founder

const FOUNDERS = [
	{
		initials: "AD",
		name: "Agbo Divine",
		role: "Co-founder",
		panel: "panel-learn",
		tile: "linear-gradient(150deg, var(--marigold), var(--teal))",
	},
	{
		initials: "OM",
		name: "Onuoha Michael",
		role: "Co-founder",
		panel: "panel-build",
		tile: "linear-gradient(150deg, var(--teal), var(--marigold))",
	},
];
*/

function About() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Who we are
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						A software company,{" "}
						<span style={{ color: "var(--build-ink)" }}>built properly</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						{DEFINITION}
					</p>
				</div>
			</section>

			{/* the company and its training division */}
			<section className="wrap py-14">
				<div className="grid md:grid-cols-2 gap-5">
					<div className="card panel-studio reveal p-8 md:p-10">
						<Eyebrow variant="build">NexaHubTech</Eyebrow>
						<h2 className="shout shout-md mt-4">The company.</h2>
						<p className="lead mt-4">{SUMMARY}</p>
						<Link to="/services" className="view-link is-build mt-5">
							What we build <i aria-hidden="true">→</i>
						</Link>
					</div>
					<div className="card panel-learn reveal p-8 md:p-10">
						<Eyebrow>NexaHubTech Academy</Eyebrow>
						<h2 className="shout shout-md mt-4">The training division.</h2>
						<p className="lead mt-4">{ACADEMY_SUMMARY}</p>
						<Link to="/academy" className="view-link mt-5">
							Visit the Academy <i aria-hidden="true">→</i>
						</Link>
					</div>
				</div>
				<div className="card reveal p-8 md:p-10 mt-5">
					<Eyebrow variant="plain">How they relate</Eyebrow>
					<p className="lead mt-4 max-w-[46rem]">{THESIS}</p>
					{/* TODO: founding story & rebrand year — awaiting copy */}
				</div>
			</section>

			{/* vision & mission */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="plain">Where we’re going</Eyebrow>
					<h2 className="shout shout-md mt-4">Vision & mission.</h2>
				</div>
				<div className="grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-learn reveal p-8">
						<Eyebrow>Vision</Eyebrow>
						<p className="lead mt-4 text-[1.02rem]">{VISION}</p>
					</div>
					<div className="card card-lift panel-studio reveal p-8">
						<Eyebrow variant="build">Mission</Eyebrow>
						<p className="lead mt-4 text-[1.02rem]">{MISSION}</p>
					</div>
				</div>
			</section>

			{/* values */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="plain">What we believe</Eyebrow>
					<h2 className="shout shout-md mt-4">Our core values.</h2>
					<p className="lead mt-4">
						The principles behind the company and the Academy alike.
					</p>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{VALUES.map((v) => (
						<div key={v.t} className="card card-lift reveal p-7">
							<h3 className="display text-[1.2rem]">{v.t}</h3>
							<p className="lead mt-2 text-[0.97rem]">{v.d}</p>
						</div>
					))}
				</div>
			</section>

			{/* founders — hidden for now; restore with the FOUNDERS data above
						<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="plain">Who’s behind it</Eyebrow>
					<h2 className="shout shout-md mt-4">
						The co-founders.
					</h2>
					<p className="lead mt-4">
						NexaHubTech and NexaHubTech Academy.
					</p>
				</div>
				<div className="grid sm:grid-cols-2 gap-5">
					{FOUNDERS.map((f) => (
						<div
							key={f.name}
							className={`card card-lift reveal p-7 ${f.panel}`}
						>
							<div
								className="w-16 h-16 rounded-2xl grid place-items-center"
								style={{ background: f.tile, boxShadow: "var(--shadow)" }}
								aria-hidden="true"
							>
								<span className="display text-white text-xl">{f.initials}</span>
							</div>
							<h3 className="display text-[1.35rem] mt-5">{f.name}</h3>
							<p className="lead mt-1 text-[0.97rem]">{f.role}</p>
						</div>
					))}
				</div>
				
			</section>
			*/}

			{/* cta */}
			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-learn p-9">
						<h3 className="display text-[1.6rem]">Want to learn with us?</h3>
						<p className="lead mt-3">
							NexaHubTech Academy runs {COURSE_COUNT_WORD_CAP} courses, from
							switching a computer on to cybersecurity.
						</p>
						<Link to="/academy" className="btn btn-primary mt-5">
							Visit the Academy
						</Link>
					</div>
					<div className="card card-lift panel-studio p-9">
						<h3 className="display text-[1.6rem]">Have a product in mind?</h3>
						<p className="lead mt-3">Let’s build it right.</p>
						<Link to="/contact" className="btn btn-teal mt-5">
							Start a project
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
