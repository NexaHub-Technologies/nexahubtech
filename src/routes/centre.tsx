import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT, Eyebrow, useReveal } from "../components/site";
import { CBT_DETAILS } from "../lib/cbt";
import {
	CENTRE_SEATS,
	COURSES,
	offeredInPerson,
	offeredOnline,
} from "../lib/courses";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/centre")({
	component: CentrePage,
	ssr: false,
	head: () => pageMeta(PAGES.centre),
});

const VISIT_LINK = `${CONTACT.whatsapp}?text=${encodeURIComponent(
	"Hello NexaHubTech! I would like to visit the centre before I enrol. When is a good time?",
)}`;

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
	`NexaHubTech, ${CONTACT.address}`,
)}`;

const FACTS = [
	{
		n: String(CENTRE_SEATS),
		l: "seats in the room — so nobody is at the back",
	},
	{ n: "1", l: "instructor in the room, beside you, not on a screen" },
	{ n: "6", l: "days a week open, Monday to Saturday" },
];

function CentrePage() {
	useReveal();
	const here = COURSES.filter(offeredInPerson);
	const onlyHere = here.filter((c) => !offeredOnline(c));
	const either = here.filter(offeredOnline);
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						The centre
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Classes of {CENTRE_SEATS}.{" "}
						<span style={{ color: "var(--learn-ink)" }}>
							Somebody beside you
						</span>
						.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Our centre in Kubwa is one room, set up for small groups: a machine
						for each person where the course needs one, an instructor who can
						see every screen, and power that does not decide when the lesson
						ends.
					</p>
				</div>
			</section>

			<section className="wrap py-10">
				<div className="numbers">
					{FACTS.map((f) => (
						<div key={f.l} className="number reveal">
							<span className="number-n hot-text">{f.n}</span>
							<span className="number-l">{f.l}</span>
						</div>
					))}
				</div>
			</section>

			<section className="wrap py-10 grid md:grid-cols-2 gap-6 items-start">
				<div className="card reveal p-8">
					<Eyebrow>Find us</Eyebrow>
					<h2 className="display text-[1.5rem] mt-3">{CONTACT.address}</h2>
					<p className="lead mt-2">Open {CBT_DETAILS.hours}.</p>
					<p className="lead mt-4 text-[0.95rem]">
						Come and see the room before you pay. Walk in during opening hours,
						or message us and we will expect you. CBT candidates can take a
						short free placement test on the day.
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
				<div className="card panel-learn reveal p-8">
					<Eyebrow>Taught here</Eyebrow>
					<h3 className="display text-[1.2rem] mt-3">Only at the centre</h3>
					<ul className="mt-2">
						{onlyHere.map((c) => (
							<li key={c.slug} className="feat">
								<span className="mk mk-learn" aria-hidden="true">
									✓
								</span>
								<Link
									to="/courses/$slug"
									params={{ slug: c.slug }}
									className="hover:underline"
								>
									{c.t}
								</Link>
							</li>
						))}
						<li className="feat">
							<span className="mk mk-learn" aria-hidden="true">
								✓
							</span>
							<Link to="/cbt" className="hover:underline">
								CBT exam practice
							</Link>
						</li>
					</ul>
					<h3 className="display text-[1.2rem] mt-6">Here or online</h3>
					<p className="text-[0.92rem] text-mute mt-2">
						{either.map((c) => c.t).join(" · ")}
					</p>
					<Link to="/timetable" className="view-link mt-5">
						When the room is in use <i aria-hidden="true">→</i>
					</Link>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal card p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
					<div className="max-w-[36rem]">
						<h2 className="display text-[1.6rem]">Too far from Kubwa?</h2>
						<p className="lead text-[0.97rem] mt-2">
							Most courses are also taught live online, from anywhere in
							Nigeria, with the same materials and the same instructor.
						</p>
					</div>
					<div className="flex flex-wrap gap-3 shrink-0">
						<Link to="/courses" className="btn btn-primary">
							See the courses
						</Link>
						<Link to="/fees" className="btn btn-ghost">
							Fees
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
