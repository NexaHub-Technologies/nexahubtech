import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TrackIcon } from "../../components/course-icon";
import { CourseCard } from "../../components/fees";
import { Eyebrow } from "../../components/site";
import {
	COURSE_COUNT_WORD_CAP,
	coursesIn,
	type Family,
	TRACKS,
} from "../../lib/courses";
import { PAGES } from "../../lib/pages";
import { pageMeta } from "../../lib/seo";

export const Route = createFileRoute("/courses/")({
	component: CoursesIndex,
	head: () => pageMeta(PAGES.courses),
});

type Filter = Family | "all";

/* The catalogue, grouped into the tracks a visitor recognises themselves in. Every
   card says the same three things — what it is, how long, where its price
   starts — and the full price lives on the course page, one way at a time. */
function CoursesIndex() {
	const [filter, setFilter] = useState<Filter>("all");

	/* /courses#video (from the Academy home and course pages) opens on that
	   track. Read after mount, so the server render always shows every course. */
	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (TRACKS.some((t) => t.id === hash)) setFilter(hash as Family);
	}, []);

	const choose = (f: Filter) => {
		setFilter(f);
		const url = f === "all" ? window.location.pathname : `#${f}`;
		window.history.replaceState(null, "", url);
	};

	const shown = TRACKS.filter((t) => filter === "all" || t.id === filter);

	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill">NexaHubTech Academy</span>
					<h1 className="h1 mt-3">
						Find your <span className="hot-text">course</span>.
					</h1>
					<p className="lead mt-6 text-[1.1rem] max-w-[38rem]">
						{COURSE_COUNT_WORD_CAP} courses, grouped by what you want to do.
						Every one is taught live by an instructor, online or in person, and
						you can start any day.
					</p>
				</div>
				<fieldset className="track-filter mt-8">
					<legend className="sr-only">Show courses in</legend>
					<button
						type="button"
						aria-pressed={filter === "all"}
						onClick={() => choose("all")}
					>
						All courses
					</button>
					{TRACKS.map((t) => (
						<button
							key={t.id}
							type="button"
							aria-pressed={filter === t.id}
							onClick={() => choose(t.id)}
						>
							{t.t}
						</button>
					))}
				</fieldset>
			</section>

			{shown.map((t) => (
				<section key={t.id} id={t.id} className="wrap py-8 scroll-mt-28">
					<div className="flex items-start gap-4 max-w-[46rem] mb-6">
						<TrackIcon track={t.id} className="w-12 h-12 shrink-0" />
						<div>
							<Eyebrow>{t.t}</Eyebrow>
							<p className="lead mt-1.5">{t.d}</p>
							<p className="text-[0.88rem] text-mute mt-1">For: {t.who}</p>
						</div>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{coursesIn(t.id).map((c) => (
							<CourseCard key={c.slug} course={c} />
						))}
					</div>
				</section>
			))}

			<section className="wrap py-14">
				<div className="grid md:grid-cols-2 gap-5">
					<div className="card panel-learn p-8">
						<h2 className="display text-[1.4rem]">Sitting WAEC or JAMB?</h2>
						<p className="lead mt-2 text-[0.95rem]">
							Short, practical CBT preparation on real exam-style software —
							from a single walk-in mock to a full masterclass.
						</p>
						<Link to="/cbt" className="view-link mt-5">
							CBT prep <i aria-hidden="true">→</i>
						</Link>
					</div>
					<div className="card p-8">
						<h2 className="display text-[1.4rem]">Not sure where to start?</h2>
						<p className="lead mt-2 text-[0.95rem]">
							Tell us what you want to be able to do. We'll point you to the
							right first course — honestly, even if it's the cheapest one.
						</p>
						<Link to="/contact" className="view-link mt-5">
							Ask us <i aria-hidden="true">→</i>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
