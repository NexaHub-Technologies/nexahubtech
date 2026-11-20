import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT, Eyebrow, useReveal } from "../components/site";
import { CBT_DETAILS } from "../lib/cbt";
import { CENTRE_SEATS, type Family, TRACKS } from "../lib/courses";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";
import { ANTIPATTERNS, PRINCIPLES, SESSION } from "../lib/teaching";
import { SLOTS, slotLabel } from "../lib/timetable";

/* About the Academy: how we teach, where, and when — the three pages a curious
   visitor used to have to find separately, now read top to bottom. The old
   /teaching, /centre and /timetable addresses redirect to the anchors here. */
export const Route = createFileRoute("/academy_/about")({
	component: AcademyAbout,
	head: () => pageMeta(PAGES.academyAbout),
});

const VISIT_LINK = `${CONTACT.whatsapp}?text=${encodeURIComponent(
	"Hello NexaHubTech Academy! I would like to visit the learning centre before I enrol. When is a good time?",
)}`;

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
	`NexaHubTech, ${CONTACT.address}`,
)}`;

const WAYS = [
	{
		t: "Online",
		d: "Live sessions with your instructor from wherever you are, with notes, exercises and feedback shared on WhatsApp between sessions. The lower fee of the two.",
		points: [
			"Same instructor, same materials",
			"A laptop and a steady connection",
		],
	},
	{
		t: "In person",
		d: `At our learning centre in Kubwa, Abuja, in a class of no more than ${CENTRE_SEATS}. A machine for everyone who needs one, and backup power so sessions run to time.`,
		points: [
			`At most ${CENTRE_SEATS} learners in the room`,
			"Your instructor can see every screen",
		],
	},
];

function timesFor(family: Family) {
	return SLOTS.filter((s) => s.family === family);
}

function AcademyAbout() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						About the Academy
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Understand it first.{" "}
						<span style={{ color: "var(--learn-ink)" }}>
							Then build with it
						</span>
						.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						NexaHubTech Academy is the training division of NexaHubTech. Every
						course is taught live, online or in person, on the same method — and
						you can start any day.
					</p>
					<nav
						className="rise rise-4 mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] font-semibold"
						aria-label="On this page"
					>
						<a href="#teaching" className="underline">
							How we teach
						</a>
						<a href="#where" className="underline">
							Where and when
						</a>
					</nav>
				</div>
			</section>

			{/* the argument */}
			<section id="teaching" className="wrap py-14 scroll-mt-28">
				<div className="reveal card panel-learn p-8 md:p-12">
					<div className="grid md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-start">
						<div>
							<Eyebrow>How we teach</Eyebrow>
							<h2 className="shout shout-md mt-4">
								Most people are taught the syntax and never given the idea.
							</h2>
							<p className="lead mt-4">
								So they finish able to rebuild the project they were shown and
								nothing else. We teach the reason first. It feels slower for a
								fortnight, then it compounds — every new thing attaches to
								something you already understand.
							</p>
						</div>
						<div className="md:pt-2">
							<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
								What that changes
							</span>
							<div className="mt-3">
								{[
									"You can read code that nobody wrote for a lesson",
									"You debug by reasoning, not by trying things",
									"A new framework is a variation, not a new subject",
									"You can explain your own work to someone else",
								].map((x) => (
									<div key={x} className="feat">
										<span className="mk mk-learn" aria-hidden="true">
											✓
										</span>
										<span>{x}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* the principles */}
			<section className="wrap py-10">
				<div className="reveal max-w-[42rem] mb-8">
					<Eyebrow variant="plain">The method</Eyebrow>
					<h2 className="shout shout-md mt-4">Four rules we don't bend.</h2>
				</div>
				<div className="grid sm:grid-cols-2 gap-5">
					{PRINCIPLES.map((p) => (
						<div key={p.n} className="step-card reveal">
							<span className="step-badge badge-learn">{p.n}</span>
							<h3 className="display text-[1.2rem] mt-4">{p.t}</h3>
							<p className="lead mt-2 text-[0.95rem]">{p.d}</p>
						</div>
					))}
				</div>
			</section>

			{/* the session shape */}
			<section className="wrap py-10">
				<div className="reveal card p-8 md:p-12">
					<div className="max-w-[42rem]">
						<Eyebrow variant="build">Inside a session</Eyebrow>
						<h2 className="shout shout-md mt-4">Three parts, every time.</h2>
						<p className="lead mt-4">
							The order is the point: the idea, then your attempt, then
							something to measure it against.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-5 mt-8">
						{SESSION.map((s) => (
							<div key={s.n} className="card panel-learn p-7 flex flex-col">
								<span className="step-badge badge-learn">{s.n}</span>
								<h3 className="display text-[1.2rem] mt-4">{s.t}</h3>
								<p className="lead mt-2 text-[0.95rem] flex-1">{s.d}</p>
								<p className="mt-4 pt-4 border-t border-[var(--line-soft)] text-[0.88rem] text-mute italic">
									{s.why}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* rolling enrolment makes the stated length a pace, not a deadline, and
			    what we leave out defines the method as much as what we put in */}
			<section className="wrap py-10">
				<div className="grid md:grid-cols-2 gap-5 items-start">
					<div className="reveal card panel-learn p-8 md:p-10">
						<Eyebrow>How long a course takes</Eyebrow>
						<h2 className="display text-[1.5rem] mt-4">
							A week is a pace, not a deadline.
						</h2>
						<p className="lead mt-3 text-[0.97rem]">
							Every course states a length. That is what it takes at the hours
							the course asks for, not a term you have to keep up with. Give it
							more hours and you finish sooner; give it fewer and it takes
							longer. The order of the material and the teaching stay the same.
						</p>
					</div>
					<div className="reveal card p-8 md:p-10">
						<Eyebrow variant="plain">What you won't find here</Eyebrow>
						<div className="mt-4 grid gap-4">
							{ANTIPATTERNS.map((a) => (
								<div key={a.t}>
									<h3 className="display text-[1.05rem]">{a.t}</h3>
									<p className="lead mt-1 text-[0.92rem]">{a.d}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* where and when */}
			<section id="where" className="wrap py-14 scroll-mt-28">
				<div className="reveal max-w-[42rem] mb-8">
					<Eyebrow>Where and when</Eyebrow>
					<h2 className="shout shout-md mt-4">Two ways to learn. Your pick.</h2>
					<p className="lead mt-4">
						Every course except PC Basics runs both ways. There are no intakes
						to wait for: start any day and join a standing weekly session.
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-5">
					{WAYS.map((w) => (
						<div key={w.t} className="reveal card panel-learn p-8">
							<h3 className="display text-[1.4rem]">{w.t}</h3>
							<p className="lead mt-2 text-[0.95rem]">{w.d}</p>
							<div className="mt-4">
								{w.points.map((p) => (
									<div key={p} className="feat">
										<span className="mk mk-learn" aria-hidden="true">
											✓
										</span>
										<span>{p}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="grid md:grid-cols-[0.9fr_1.1fr] gap-5 mt-5 items-start">
					<div className="reveal card p-8">
						<h3 className="display text-[1.3rem]">The learning centre</h3>
						<p className="lead mt-2">{CONTACT.address}</p>
						<p className="text-[0.92rem] text-mute mt-1">
							Open {CBT_DETAILS.hours}.
						</p>
						<p className="lead mt-4 text-[0.95rem]">
							You are welcome to visit before you enrol — walk in during opening
							hours, or message us and we will expect you.
						</p>
						<div className="mt-6 flex flex-wrap gap-3">
							<a
								href={VISIT_LINK}
								target="_blank"
								rel="noreferrer"
								className="btn btn-primary"
							>
								Arrange a visit
							</a>
							<a
								href={MAPS_LINK}
								target="_blank"
								rel="noreferrer"
								className="btn btn-ghost"
							>
								Open in Maps
							</a>
						</div>
					</div>
					<div className="reveal card p-8">
						<h3 className="display text-[1.3rem]">Session times</h3>
						<p className="text-[0.92rem] text-mute mt-1">
							West Africa Time. We agree your session when you enrol.
						</p>
						<div className="mt-4 grid gap-1">
							{TRACKS.map((t) => (
								<details key={t.id} className="price-times">
									<summary>{t.t}</summary>
									<ul className="mt-2 mb-3 grid gap-1.5">
										{timesFor(t.id).map((s) => (
											<li key={s.id} className="text-[0.9rem]">
												<span className="font-semibold">
													{s.delivery === "online" ? "Online" : "In person"}
												</span>{" "}
												· {slotLabel(s)}
											</li>
										))}
									</ul>
								</details>
							))}
						</div>
						<p className="text-[0.88rem] text-mute mt-4">
							None of these work? Tell us when you can attend. Where enough
							people ask for the same time, we add a session.
						</p>
					</div>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal grid md:grid-cols-2 gap-5">
					<div className="card card-lift panel-learn p-9">
						<Eyebrow>Ready to start</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">Find your course.</h3>
						<p className="lead mt-3">
							Choose a track, then one price per course — online or in person.
						</p>
						<Link to="/courses" className="btn btn-primary mt-5">
							See the courses
						</Link>
					</div>
					<div className="card card-lift panel-studio p-9">
						<Eyebrow variant="build">At NexaHubTech</Eyebrow>
						<h3 className="display text-[1.6rem] mt-3">
							It is how NexaHubTech builds, too.
						</h3>
						<p className="lead mt-3">
							Understand before you build is how our parent company works on
							every client project — eleven steps of system design before any
							code gets written.
						</p>
						<Link to="/approach" className="btn btn-teal mt-5">
							See how we build
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
