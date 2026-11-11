import { createFileRoute, Link } from "@tanstack/react-router";
import { SlotList } from "../components/fees";
import { Eyebrow, useReveal } from "../components/site";
import { CBT_DETAILS } from "../lib/cbt";
import { CENTRE_SEATS, COURSES, type Family } from "../lib/courses";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";
import {
	clock,
	FAMILY_LABEL,
	minutes,
	SLOTS,
	slotsIn,
	WEEKDAYS,
} from "../lib/timetable";

export const Route = createFileRoute("/timetable")({
	component: TimetablePage,
	ssr: false,
	head: () => pageMeta(PAGES.timetable),
});

const FAMILIES: Family[] = ["digital", "development", "video"];

/* the room, day by day: what is on, in order */
function RoomWeek() {
	const room = slotsIn("inhouse");
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{WEEKDAYS.map((day) => {
				const today = room
					.filter((s) => s.days.includes(day))
					.sort((a, b) => minutes(a.start) - minutes(b.start));
				return (
					<div key={day} className="card reveal p-5">
						<h3 className="display text-[1.1rem]">{day}</h3>
						<ul className="mt-3 grid gap-2">
							{today.map((s) => (
								<li
									key={s.id}
									className="flex items-baseline justify-between gap-3 text-[0.9rem]"
								>
									<span className="font-semibold">
										{FAMILY_LABEL[s.family]}
									</span>
									<span className="text-mute whitespace-nowrap">
										{clock(s.start)} – {clock(s.end)}
									</span>
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</div>
	);
}

function TimetablePage() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Session times
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Start any day.{" "}
						<span style={{ color: "var(--learn-ink)" }}>Pick your session</span>
						.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						There are no intakes to wait for. You join one of these standing
						weekly sessions on the day you start. People at different points in
						the same course share a session — the notes, exercise briefs and
						model answers carry each person at their own pace, and the live time
						goes on explaining, reviewing and getting you unstuck.
					</p>
					<p className="rise rise-4 mt-4 text-[0.95rem] text-mute">
						Times are West Africa Time. The centre is open {CBT_DETAILS.hours}.
					</p>
				</div>
			</section>

			<section className="wrap py-10">
				<div className="reveal max-w-[42rem] mb-7">
					<Eyebrow>In the centre</Eyebrow>
					<h2 className="shout shout-md mt-4">
						One room, at most {CENTRE_SEATS} people.
					</h2>
					<p className="lead mt-3">
						Everything taught in person happens in the same room in Kubwa, so
						this is its week.
					</p>
				</div>
				<RoomWeek />
			</section>

			<section className="wrap py-10">
				<div className="reveal max-w-[42rem] mb-7">
					<Eyebrow>Which session is mine?</Eyebrow>
					<h2 className="shout shout-md mt-4">Each course, its sessions.</h2>
				</div>
				<div className="grid lg:grid-cols-3 gap-6 items-start">
					{FAMILIES.map((f) => (
						<div key={f} className="reveal">
							<h3 className="display text-[1.25rem]">{FAMILY_LABEL[f]}</h3>
							<p className="text-[0.88rem] text-mute mt-1">
								{COURSES.filter((c) => c.family === f)
									.map((c) => c.t)
									.join(" · ")}
							</p>
							<div className="mt-4">
								<SlotList slots={SLOTS.filter((s) => s.family === f)} />
							</div>
						</div>
					))}
				</div>
				<p className="reveal text-[0.9rem] text-mute mt-8">
					CBT exam practice runs in the centre on weekday afternoons, with timed
					mock exams on Saturday.{" "}
					<Link to="/cbt" className="underline font-semibold">
						CBT training
					</Link>
				</p>
			</section>

			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
					<div className="max-w-[36rem]">
						<h2 className="display text-[1.6rem]">
							None of these work for you?
						</h2>
						<p className="lead text-[0.97rem] mt-2">
							Tell us when you can attend when you apply. Where enough people
							ask for the same time, we add a session.
						</p>
					</div>
					<div className="flex flex-wrap gap-3 shrink-0">
						<Link
							to="/enrol"
							search={{ course: undefined }}
							className="btn btn-primary"
						>
							Enrol now
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
