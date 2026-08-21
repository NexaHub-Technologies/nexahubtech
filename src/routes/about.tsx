import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/about")({
	component: About,
	ssr: false,
	head: () =>
		pageMeta({
			title: "About — NexaHubTech",
			description:
				"NexaHubTech is a Nigeria-based skills-to-service company — a tech school and a software studio built on one idea: learning should be tied to real work.",
			path: "/about",
			image: "/og/about.jpg",
		}),
});

/* the company's six core values, from the company profile */
const VALUES = [
	{
		t: "Innovation",
		d: "We continuously explore new ideas, tools, and approaches to deliver smarter solutions.",
	},
	{
		t: "Integrity",
		d: "We conduct our business with honesty, transparency, and accountability in every engagement.",
	},
	{
		t: "Excellence",
		d: "We hold ourselves to the highest standards of quality in everything we build and deliver.",
	},
	{
		t: "Collaboration",
		d: "We strongly believe the best results come from working closely with our clients and one another.",
	},
	{
		t: "Customer-Centricity",
		d: "Our clients’ goals and success are at the heart of every solution we design.",
	},
	{
		t: "Adaptability",
		d: "We stay agile and responsive to the evolving needs of technology and business.",
	},
];

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
						We closed the gap between{" "}
						<span style={{ color: "var(--learn-ink)" }}>learning</span> and{" "}
						<span style={{ color: "var(--build-ink)" }}>building</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						NexaHubTech is a Nigeria-based skills-to-service company: a tech
						school and a software studio under one roof. We teach real,
						in-demand skills — and then put them to work on real client
						products.
					</p>
				</div>
			</section>

			{/* the thesis */}
			<section className="wrap py-14">
				<div className="card reveal p-8 md:p-12">
					<div className="grid md:grid-cols-2 gap-10">
						<div>
							<Eyebrow>Our story</Eyebrow>
							<h2 className="display mt-4 text-[1.9rem]">Built on one idea.</h2>
							<p className="lead mt-4">
								We grew into something with a clear purpose: not just building
								software, and not just teaching it, but wiring the two together.
							</p>
							{/* TODO: founding story & rebrand year — awaiting copy */}
						</div>
						<div>
							<Eyebrow variant="build">Skills-to-service</Eyebrow>
							<h2 className="display mt-4 text-[1.9rem]">
								One connected loop.
							</h2>
							<p className="lead mt-4">
								The studio meets real engineering problems. Those problems shape
								what we teach. The school grows people who go on to help build —
								and the loop continues. Nobody learns in a vacuum, and nobody
								ships without principles.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* vision & mission */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="plain">Where we’re going</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Vision & mission.
					</h2>
				</div>
				<div className="grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-learn reveal p-8">
						<Eyebrow>Vision</Eyebrow>
						<p className="lead mt-4 text-[1.02rem]">
							To become a global leading technology ecosystem where learning,
							innovation, and digital transformation create world-class talent
							and impactful digital solutions.
						</p>
					</div>
					<div className="card card-lift panel-studio reveal p-8">
						<Eyebrow variant="build">Mission</Eyebrow>
						<p className="lead mt-4 text-[1.02rem]">
							To design and deliver cutting-edge technology solutions that solve
							practical problems, drive efficiency, and create sustainable
							growth for our clients — combining innovation, integrity, and
							technical excellence to turn bold ideas into impactful digital
							realities.
						</p>
					</div>
				</div>
			</section>

			{/* values */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="plain">What we believe</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Our core values.
					</h2>
					<p className="lead mt-4">
						The principles behind both arms — the school and the studio alike.
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
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						The co-founders.
					</h2>
					<p className="lead mt-4">
						NexaHub Technologies — the school and the studio, run as one thing.
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
							Eight tracks, from frontend to cybersecurity.
						</p>
						<Link to="/courses" className="btn btn-primary mt-5">
							Explore the courses
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
