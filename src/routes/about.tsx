import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ExternalLink, FileText } from "lucide-react";
import { PersonCard } from "../components/evidence";
import { Figure } from "../components/figure";
import { ClosingCTA } from "../components/home";
import { CONTACT, Eyebrow, PageHead, SectionHead } from "../components/site";
import { CBT_DETAILS } from "../lib/cbt";
import {
	ACADEMY_SUMMARY,
	DEFINITION,
	MISSION,
	STUDIO_SUMMARY,
	THESIS,
	VALUES,
	VISION,
} from "../lib/company";
import { CENTRE_SEATS, TRACKS } from "../lib/courses";
import { ACADEMY_PHOTOS, OFFICE_PHOTO, TEAM } from "../lib/evidence";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";
import { PRINCIPLES, SESSION } from "../lib/teaching";
import { SLOTS, slotLabel } from "../lib/timetable";

/* One About page for the whole company: who we are, the two arms, the people,
   how we work and teach, what we believe, and where to find us. The Academy's
   old About page and the /teaching, /centre and /timetable addresses redirect
   to anchors here (#teaching, #visit). */
export const Route = createFileRoute("/about")({
	component: About,
	head: () => pageMeta(PAGES.about),
});

const VISIT_LINK = `${CONTACT.whatsapp}?text=${encodeURIComponent(
	"Hello NexaHubTech! I would like to visit the office and learning centre. When is a good time?",
)}`;

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
	`NexaHubTech, ${CONTACT.address}`,
)}`;

function About() {
	const founders = TEAM.filter((p) => p.founder);
	const team = TEAM.filter((p) => !p.founder);
	return (
		<>
			<PageHead
				eyebrow="About NexaHubTech"
				title="A software company, built properly."
				intro={DEFINITION}
			>
				<nav
					className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-semibold"
					aria-label="On this page"
				>
					<a href="#team" className="view-link">
						Team
					</a>
					<a href="#teaching" className="view-link">
						How we teach
					</a>
					<a href="#values" className="view-link">
						What we believe
					</a>
					<a href="#partners" className="view-link">
						Partners
					</a>
					<a href="#profile" className="view-link">
						Company profile
					</a>
					<a href="#visit" className="view-link">
						Visit us
					</a>
				</nav>
			</PageHead>

			<section className="wrap pb-4">
				<Figure {...OFFICE_PHOTO} />
			</section>

			{/* the two arms */}
			<section className="wrap section">
				<div className="grid md:grid-cols-2 gap-6">
					<div className="card p-8">
						<Eyebrow>The studio</Eyebrow>
						<h2 className="h3 text-[1.45rem] mt-3">Software for businesses.</h2>
						<p className="lead mt-3">{STUDIO_SUMMARY}</p>
						<div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
							<Link to="/services" className="view-link">
								Services <i aria-hidden="true">→</i>
							</Link>
							<Link to="/work" className="view-link">
								Our work <i aria-hidden="true">→</i>
							</Link>
						</div>
					</div>
					<div className="card p-8">
						<Eyebrow arm="academy">NexaHubTech Academy</Eyebrow>
						<h2 className="h3 text-[1.45rem] mt-3">
							Live courses in tech skills.
						</h2>
						<p className="lead mt-3">{ACADEMY_SUMMARY}</p>
						<div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
							<Link to="/academy" className="view-link">
								The Academy <i aria-hidden="true">→</i>
							</Link>
							<Link to="/courses" className="view-link">
								Courses <i aria-hidden="true">→</i>
							</Link>
						</div>
					</div>
				</div>
				<p className="lead mt-8 max-w-[46rem]">{THESIS}</p>
			</section>

			{/* the people */}
			<section id="team" className="band scroll-mt-24">
				<div className="wrap section">
					<SectionHead
						eyebrow="The team"
						title="The people behind NexaHubTech."
						intro="A small team that designs and builds the software, and teaches the courses."
						className="mb-10"
					/>
					<h3 className="kicker mb-5">Founders</h3>
					<div className="grid grid-cols-2 gap-5 sm:gap-8 max-w-[46rem]">
						{founders.map((p) => (
							<PersonCard key={p.role} p={p} />
						))}
					</div>
					<h3 className="kicker mt-14 mb-5">Instructors and team</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{team.map((p) => (
							<PersonCard key={p.role} p={p} />
						))}
					</div>
				</div>
			</section>

			{/* how we work and how we teach */}
			<section id="teaching" className="wrap section scroll-mt-24">
				<div className="grid lg:grid-cols-2 gap-12">
					<div>
						<SectionHead
							eyebrow="How we work"
							title="Understand first, then build."
							intro="Every studio project starts with the problem, not the feature list: scope, data and edge cases are agreed in writing before a line of code is written. Then we ship in working increments and stay for what comes after."
						/>
						<Link to="/approach" className="view-link mt-6">
							The full process <i aria-hidden="true">→</i>
						</Link>
					</div>
					<div>
						<SectionHead
							eyebrow="How we teach"
							arm="academy"
							title="The idea before the syntax."
							intro="Most people are taught the syntax and never given the idea, so they can rebuild the project they were shown and nothing else. We teach the reason first. It feels slower for a fortnight, then it compounds."
						/>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6 mt-12">
					{PRINCIPLES.map((p) => (
						<div key={p.n} className="card p-6">
							<span className="step-badge">{p.n}</span>
							<h3 className="h3 mt-4">{p.t}</h3>
							<p className="lead mt-2 text-[0.95rem]">{p.d}</p>
						</div>
					))}
				</div>

				<div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 mt-14 items-start">
					<div>
						<h3 className="h3 text-[1.35rem]">
							Every session, in three parts.
						</h3>
						<ol className="steps mt-6">
							{SESSION.map((s) => (
								<li key={s.n}>
									<h4 className="font-bold text-ink">{s.t}</h4>
									<p className="lead mt-1 text-[0.95rem]">{s.d}</p>
								</li>
							))}
						</ol>
						<p className="muted-note mt-6">
							A course's stated length is a pace, not a deadline: give it more
							hours and you finish sooner.
						</p>
					</div>
					<Figure {...ACADEMY_PHOTOS.instructor} />
				</div>
			</section>

			{/* vision, mission, values */}
			<section id="values" className="band scroll-mt-24">
				<div className="wrap section">
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<Eyebrow>Vision</Eyebrow>
							<p className="lead mt-3 text-[1.02rem]">{VISION}</p>
						</div>
						<div>
							<Eyebrow>Mission</Eyebrow>
							<p className="lead mt-3 text-[1.02rem]">{MISSION}</p>
						</div>
					</div>
					<h2 className="h2 mt-14">Our values.</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-8">
						{VALUES.map((v) => (
							<div key={v.t} className="rule pt-4">
								<h3 className="font-bold text-ink">{v.t}</h3>
								<p className="text-[0.95rem] text-ink-soft mt-1">{v.d}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* partners and collaborators */}
			<section id="partners" className="wrap section scroll-mt-24">
				<SectionHead
					eyebrow="Partners & Collaborators"
					title="Working with trusted industry partners."
					intro="We collaborate with established technology firms and infrastructure providers to deliver reliable enterprise solutions and world-class digital learning."
				/>
				<div className="grid md:grid-cols-2 gap-6 mt-10">
					<div className="card card-lift p-8 flex flex-col justify-between">
						<div>
							<div className="flex items-center justify-between gap-4">
								<span className="pill">Technology Partner</span>
								<ExternalLink
									className="w-4 h-4 text-mute"
									aria-hidden="true"
								/>
							</div>
							<h3 className="h3 text-[1.4rem] mt-4">Coresys Technologies</h3>
							<p className="lead mt-3 text-[0.95rem]">
								Enterprise software development, digital transformation
								consultancy, and core systems infrastructure solutions across
								Nigeria.
							</p>
						</div>
						<div className="mt-6 pt-5 border-t border-[var(--line-soft)]">
							<a
								href="https://coresystech.ng/"
								target="_blank"
								rel="noreferrer"
								className="view-link"
							>
								Visit coresystech.ng <i aria-hidden="true">→</i>
							</a>
						</div>
					</div>

					<div className="card card-lift p-8 flex flex-col justify-between">
						<div>
							<div className="flex items-center justify-between gap-4">
								<span className="pill">Hardware & Systems</span>
								<ExternalLink
									className="w-4 h-4 text-mute"
									aria-hidden="true"
								/>
							</div>
							<h3 className="h3 text-[1.4rem] mt-4">Gateway Computers</h3>
							<p className="lead mt-3 text-[0.95rem]">
								Computing hardware, enterprise systems integration, learning
								centre equipment, and dependable IT equipment support.
							</p>
						</div>
						<div className="mt-6 pt-5 border-t border-[var(--line-soft)]">
							<a
								href="https://gateway-computers.com/"
								target="_blank"
								rel="noreferrer"
								className="view-link"
							>
								Visit gateway-computers.com <i aria-hidden="true">→</i>
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* company profile */}
			<section id="profile" className="band scroll-mt-24">
				<div className="wrap section">
					<div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
						<div>
							<Eyebrow>Company Profile</Eyebrow>
							<h2 className="h2 mt-3">Download our corporate profile.</h2>
							<p className="lead mt-4 text-[1.02rem] max-w-[38rem]">
								Get an in-depth view of NexaHubTech Limited: our engineering
								studio capabilities, our Academy curriculum tracks, company
								structure, governance, and how we work with clients and
								organisations.
							</p>
							<div className="mt-7 flex flex-wrap items-center gap-4">
								<a
									href="/nexahubtech-company-profile.pdf"
									download="NexaHubTech-Company-Profile.pdf"
									target="_blank"
									rel="noreferrer"
									className="btn btn-primary"
								>
									<Download className="w-4 h-4" aria-hidden="true" />
									Download company profile (PDF)
								</a>
								<span className="text-[0.88rem] text-mute font-medium">
									PDF document · Official overview
								</span>
							</div>
						</div>

						<div className="card p-6 border-dashed flex items-center gap-5">
							<div className="w-14 h-14 rounded-xl bg-[var(--accent-tint)] text-[var(--accent-ink)] flex items-center justify-center shrink-0">
								<FileText className="w-7 h-7" aria-hidden="true" />
							</div>
							<div>
								<h3 className="font-bold text-ink">NexaHubTech Profile</h3>
								<p className="text-[0.85rem] text-mute mt-0.5">
									Capability statement, studio services & Academy tracks
								</p>
								<a
									href="/nexahubtech-company-profile.pdf"
									target="_blank"
									rel="noreferrer"
									className="view-link text-[0.88rem] mt-2 inline-flex"
								>
									Open PDF in new tab <i aria-hidden="true">→</i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* where to find us */}
			<section id="visit" className="wrap section scroll-mt-24">
				<div className="grid lg:grid-cols-2 gap-10 items-start">
					<div>
						<SectionHead
							eyebrow="Visit us"
							title="Our office and learning centre."
							intro={`One address for both: the studio works from here, and in-person Academy classes of no more than ${CENTRE_SEATS} meet here. You are welcome to visit before you enrol or start a project.`}
						/>
						<dl className="mt-7 grid gap-3 text-[0.97rem]">
							<div>
								<dt className="kicker">Address</dt>
								<dd className="text-ink mt-1">{CONTACT.address}</dd>
							</div>
							<div>
								<dt className="kicker">Open</dt>
								<dd className="text-ink mt-1">{CBT_DETAILS.hours}</dd>
							</div>
						</dl>
						<div className="mt-7 flex flex-wrap gap-3">
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

						<div className="mt-10">
							<h3 className="font-bold text-ink">Academy session times</h3>
							<p className="muted-note mt-1">
								West Africa Time. Online and in person. We agree your session
								when you enrol.
							</p>
							<div className="mt-3 grid gap-1">
								{TRACKS.map((t) => (
									<details key={t.id} className="price-times">
										<summary>{t.t}</summary>
										<ul className="mt-2 mb-3 grid gap-1.5">
											{SLOTS.filter((s) => s.family === t.id).map((s) => (
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
						</div>
					</div>
					<Figure {...ACADEMY_PHOTOS.room} />
				</div>
			</section>

			<ClosingCTA
				title="Work with us, or learn with us."
				lead="Have a product in mind? Tell us the problem. Want to learn? Find your course and start any day."
				primary={{ to: "/contact", label: "Start a project" }}
				secondary={{ to: "/courses", label: "Find a course" }}
			/>
		</>
	);
}
