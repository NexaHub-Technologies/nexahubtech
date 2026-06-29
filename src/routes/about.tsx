import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";

export const Route = createFileRoute("/about")({
	component: About,
	ssr: false,
	head: () => ({
		meta: [
			{ title: "About — NexaHubTech" },
			{
				name: "description",
				content:
					"NexaHubTech is a Nigeria-based skills-to-service company — a tech school and a software studio built on one idea: learning should be tied to real work.",
			},
		],
	}),
});

const VALUES = [
	{
		t: "Understand before you write",
		d: "First principles over memorization. We’d rather you grasp the idea than recite the syntax.",
	},
	{
		t: "Design before you build",
		d: "Good software is thought through first. We treat every project as a problem worth understanding.",
	},
	{
		t: "Grow people, not just products",
		d: "Good engineers are grown. The school and the studio exist to do exactly that, together.",
	},
	{
		t: "Keep it least-cost",
		d: "Solve the real problem with the simplest thing that works — in the classroom and in production.",
	},
];

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
						<span style={{ color: "var(--marigold-ink)" }}>learning</span> and{" "}
						<span style={{ color: "var(--teal-deep)" }}>building</span>.
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
							<p className="devnote mt-4">
								Add your founding story & year when you’re ready.
							</p>
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

			{/* values */}
			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-9">
					<Eyebrow variant="plain">What we believe</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						The principles behind both arms.
					</h2>
				</div>
				<div className="grid sm:grid-cols-2 gap-5">
					{VALUES.map((v) => (
						<div key={v.t} className="card card-lift reveal p-7">
							<h3 className="display text-[1.2rem]">{v.t}</h3>
							<p className="lead mt-2 text-[0.97rem]">{v.d}</p>
						</div>
					))}
				</div>
			</section>

			{/* founder */}
			<section className="wrap py-14">
				<div className="card reveal p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-8 items-start">
					<div className="flex shrink-0" aria-hidden="true">
						<div
							className="w-20 h-20 rounded-3xl grid place-items-center"
							style={{
								background:
									"linear-gradient(150deg, var(--marigold), var(--teal))",
								boxShadow: "var(--shadow)",
							}}
						>
							<span className="display text-white text-2xl">AD</span>
						</div>
						<div
							className="w-20 h-20 rounded-3xl grid place-items-center -ml-5"
							style={{
								background:
									"linear-gradient(150deg, var(--teal), var(--marigold))",
								boxShadow: "var(--shadow)",
								border: "3px solid var(--card)",
							}}
						>
							<span className="display text-white text-2xl">OM</span>
						</div>
					</div>
					<div>
						<Eyebrow variant="plain">From the co-founders</Eyebrow>
						<p className="display text-[1.5rem] sm:text-[1.85rem] mt-3 max-w-[46rem] leading-[1.25]">
							“The fastest way to become a good developer is to learn next to
							real problems...”
						</p>
						<p className="lead mt-5 max-w-[44rem]">
							Agbo Divine and Onuoha Michael co-founders of NexaHub
							Technologies.
						</p>
						<p className="devnote mt-5">
							Co-founder photos & a personal note — to add before launch.
						</p>
					</div>
				</div>
			</section>

			{/* cta */}
			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-learn p-9">
						<h3 className="display text-[1.6rem]">Want to learn with us?</h3>
						<p className="lead mt-3">Start with the Frontend Track.</p>
						<Link to="/courses" className="btn btn-primary mt-5">
							Explore the course
						</Link>
					</div>
					<div className="card card-lift panel-build p-9">
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
