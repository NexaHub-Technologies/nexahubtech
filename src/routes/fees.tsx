import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";
import { CBT_FROM_PRICE } from "../lib/cbt";
import {
	CENTRE_SEATS,
	type Course,
	coursesIn,
	DELIVERY_LABEL,
	type Fee,
	formatNaira,
	TRACKS,
} from "../lib/courses";
import { PAGES } from "../lib/pages";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/fees")({
	component: PricingPage,
	head: () => pageMeta(PAGES.fees),
});

/* Pricing, made scannable: three rules said once, then one number per cell.
   Instalment amounts live on each course page, beside the price they split —
   repeating them here doubled every figure on the page. */

const RULES = [
	{
		t: "One price, the whole course",
		d: "Sessions, materials, exercises, model answers and feedback. Nothing is sold to you halfway through.",
	},
	{
		t: "Pay in full, or in parts",
		d: "Pay before your first session, or split the fee into equal parts across the course for a little more in total. Each course page shows the exact parts.",
	},
	{
		t: "Online costs less",
		d: `Same instructor, same materials either way. In person costs more because classes are capped at ${CENTRE_SEATS}.`,
	},
];

function Price({ fee }: { fee: Fee | undefined }) {
	if (!fee) return <td className="is-none">—</td>;
	return (
		<td>
			<span className="display text-[1.02rem]">{formatNaira(fee.upfront)}</span>
		</td>
	);
}

function Row({ c }: { c: Course }) {
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
			</th>
			<td>{c.duration}</td>
			<Price fee={c.fees.online} />
			<Price fee={c.fees.inhouse} />
		</tr>
	);
}

function PricingPage() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Pricing
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Simple pricing,{" "}
						<span style={{ color: "var(--learn-ink)" }}>no surprises</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Every course, both ways it can be taken. Prices are in naira and
						cover the whole course.
					</p>
				</div>
			</section>

			<section className="wrap py-6">
				<div className="grid md:grid-cols-3 gap-4">
					{RULES.map((r, i) => (
						<div key={r.t} className="card reveal p-6">
							<span className="step-badge badge-learn">{i + 1}</span>
							<h2 className="display text-[1.1rem] mt-3">{r.t}</h2>
							<p className="lead mt-2 text-[0.92rem]">{r.d}</p>
						</div>
					))}
				</div>
			</section>

			<section className="wrap py-8 grid gap-6">
				{TRACKS.map((t) => (
					<div key={t.id} className="reveal fee-table-wrap">
						<table className="fee-table">
							<caption>{t.t}</caption>
							<colgroup>
								<col style={{ width: "46%" }} />
								<col style={{ width: "18%" }} />
								<col style={{ width: "18%" }} />
								<col style={{ width: "18%" }} />
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
								{coursesIn(t.id).map((c) => (
									<Row key={c.slug} c={c} />
								))}
							</tbody>
						</table>
					</div>
				))}
				<p className="reveal text-[0.9rem] text-mute">
					— means the course is taught one way only. PC Basics is in person,
					because it starts before you can use a computer on your own.
				</p>
			</section>

			<section className="wrap py-8 grid md:grid-cols-2 gap-5">
				<div className="reveal card panel-learn p-8">
					<h2 className="display text-[1.3rem]">CBT exam prep</h2>
					<p className="lead mt-2 text-[0.95rem]">
						WAEC and JAMB practice on exam-style software, in person. From{" "}
						{CBT_FROM_PRICE} for a single timed mock.
					</p>
					<Link to="/cbt" className="view-link mt-5">
						CBT prep <i aria-hidden="true">→</i>
					</Link>
				</div>
				<div className="reveal card p-8">
					<h2 className="display text-[1.3rem]">Organisations</h2>
					<p className="lead mt-2 text-[0.95rem]">
						Training a team, a school or a church media unit? We quote per
						group, at our centre or at yours.
					</p>
					<Link to="/for-business" className="view-link mt-5">
						Organisations <i aria-hidden="true">→</i>
					</Link>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
					<div className="max-w-[36rem]">
						<Eyebrow>Next</Eyebrow>
						<h2 className="display text-[1.6rem] mt-3">Found your course?</h2>
						<p className="lead text-[0.97rem] mt-2">
							Start any day. We agree your session and payment plan when you
							enrol.
						</p>
					</div>
					<div className="flex flex-wrap gap-3 shrink-0">
						<Link
							to="/enrol"
							search={{ course: undefined }}
							className="btn btn-primary"
						>
							Enrol
						</Link>
						<Link to="/courses" className="btn btn-ghost">
							See the courses
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
