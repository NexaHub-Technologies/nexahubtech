import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import { BUSINESS_OFFERS } from "../lib/business";
import { CBT_PACKAGES } from "../lib/cbt";
import {
	bundleSaving,
	CENTRE_SEATS,
	type Course,
	coursesAt,
	DELIVERY_LABEL,
	type Fee,
	formatNaira,
	instalmentLabel,
	LEVELS,
} from "../lib/courses";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/fees")({
	component: FeesPage,
	ssr: false,
	head: () => pageMeta(PAGES.fees),
});

function FeeCell({ fee }: { fee: Fee | undefined }) {
	if (!fee) return <td className="is-none">Not offered</td>;
	return (
		<td>
			<span className="display text-[1.02rem]">{formatNaira(fee.upfront)}</span>
			<small>or {instalmentLabel(fee)}</small>
		</td>
	);
}

function CourseRow({ c }: { c: Course }) {
	const saving = bundleSaving(c);
	return (
		<tr>
			<th scope="row">
				<Link
					to="/courses/$slug"
					params={{ slug: c.slug }}
					className="hover:underline"
				>
					{c.t}
				</Link>
				{c.d ? <small className="font-normal text-mute">{c.d}</small> : null}
				{saving ? (
					<small className="font-normal text-mute">
						Saves {formatNaira(saving)} against its parts
					</small>
				) : null}
			</th>
			<td>{c.duration}</td>
			<FeeCell fee={c.fees.online} />
			<FeeCell fee={c.fees.inhouse} />
		</tr>
	);
}

const RULES = [
	{
		t: "The fee covers the whole course",
		d: "Sessions, materials, exercise briefs, model answers and feedback. Nothing is sold to you halfway through.",
	},
	{
		t: "Pay in full, or in instalments",
		d: "Pay the whole fee before your first session, or split it into equal instalments across the course. Instalments cost a little more in total, because we carry the wait.",
	},
	{
		t: `A seat in the centre costs more`,
		d: `The room holds ${CENTRE_SEATS}, so a seat in it is priced above a place online. Same course, same materials, same instructor — with them in the room.`,
	},
	{
		t: "See before you pay",
		d: "Walk into the centre during opening hours, look around, and ask anything. Not sure a course fits? Tell us where you are starting from and we will say honestly.",
	},
];

function FeesPage() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Fees
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						What it costs,{" "}
						<span style={{ color: "var(--learn-ink)" }}>on one page</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Every course, both ways it can be taken, and how to spread the fee.
						Prices are in naira and cover the whole course.
					</p>
				</div>
			</section>

			<section className="wrap py-8">
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{RULES.map((r) => (
						<div key={r.t} className="card reveal p-6">
							<h2 className="display text-[1.08rem]">{r.t}</h2>
							<p className="lead mt-2 text-[0.92rem]">{r.d}</p>
						</div>
					))}
				</div>
			</section>

			<section className="wrap py-8 grid gap-6">
				{LEVELS.map((level) => (
					<div key={level.id} className="reveal fee-table-wrap">
						<table className="fee-table">
							<caption>{level.t}</caption>
							<colgroup>
								<col style={{ width: "40%" }} />
								<col style={{ width: "14%" }} />
								<col style={{ width: "23%" }} />
								<col style={{ width: "23%" }} />
							</colgroup>
							<thead>
								<tr>
									<th scope="col">Course</th>
									<th scope="col">Length</th>
									<th scope="col">{DELIVERY_LABEL.online}</th>
									<th scope="col">{DELIVERY_LABEL.inhouse}</th>
								</tr>
							</thead>
							<tbody>
								{coursesAt(level.id).map((c) => (
									<CourseRow key={c.slug} c={c} />
								))}
							</tbody>
						</table>
					</div>
				))}
			</section>

			<section className="wrap py-8 grid lg:grid-cols-2 gap-6 items-start">
				<div className="reveal fee-table-wrap">
					<table className="fee-table !min-w-0">
						<caption>CBT exam practice · in Kubwa</caption>
						<colgroup>
							<col style={{ width: "72%" }} />
							<col style={{ width: "28%" }} />
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Package</th>
								<th scope="col">Fee</th>
							</tr>
						</thead>
						<tbody>
							{CBT_PACKAGES.map((p) => (
								<tr key={p.id}>
									<th scope="row">
										{p.name}
										<small className="font-normal text-mute">
											{p.duration}
										</small>
									</th>
									<td>
										<span className="display text-[1.02rem]">{p.price}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="reveal fee-table-wrap">
					<table className="fee-table !min-w-0">
						<caption>For organisations</caption>
						<colgroup>
							<col style={{ width: "72%" }} />
							<col style={{ width: "28%" }} />
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Offer</th>
								<th scope="col">Rate</th>
							</tr>
						</thead>
						<tbody>
							{BUSINESS_OFFERS.map((o) => (
								<tr key={o.id}>
									<th scope="row">
										{o.t}
										<small className="font-normal text-mute">{o.unit}</small>
									</th>
									<td>
										<span className="display text-[1.02rem]">{o.price}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
					<div className="max-w-[36rem]">
						<Eyebrow>Next</Eyebrow>
						<h2 className="display text-[1.6rem] mt-3">
							Found the course? Pick a session.
						</h2>
						<p className="lead text-[0.97rem] mt-2">
							There are no intakes to wait for — you start any day, in a weekly
							session that suits you.
						</p>
					</div>
					<div className="flex flex-wrap gap-3 shrink-0">
						<Link to="/timetable" className="btn btn-primary">
							Session times
						</Link>
						<Link
							to="/enrol"
							search={{ course: undefined }}
							className="btn btn-ghost"
						>
							Enrol now
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
