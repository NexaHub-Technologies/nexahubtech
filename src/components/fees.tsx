import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
	bundleSaving,
	CENTRE_SEATS,
	type Course,
	DELIVERY_LABEL,
	type Delivery,
	deliveriesOf,
	type Fee,
	formatNaira,
	getCourseBySlug,
	instalmentLabel,
	priceLabel,
} from "../lib/courses";
import { type SessionSlot, slotLabel, slotsFor } from "../lib/timetable";

/* Every fee on the site renders through these, from the numbers in courses.ts.
   The rule they follow: show one price at a time. A card shows where a course
   starts; a course page shows one way of taking it, and lets the visitor switch.
   Instalments are a single quiet line, never a second headline figure. */

const DELIVERY_NOTE: Record<Delivery, string> = {
	online:
		"Real-time sessions from anywhere, with materials and feedback on WhatsApp.",
	inhouse: `A small class of no more than ${CENTRE_SEATS}, with your instructor in the room.`,
};

/* "or pay in 2 parts of ₦65,000" */
export function partsLine(fee: Fee): string {
	return `or pay in ${fee.instalments.count} parts of ${formatNaira(fee.instalments.amount)}`;
}

/* a course in a list: what it is, how long, where its price starts */
export function CourseCard({ course }: { course: Course }) {
	return (
		<Link
			to="/courses/$slug"
			params={{ slug: course.slug }}
			className="card card-lift p-6 flex flex-col"
		>
			<h3 className="display text-[1.2rem]">{course.t}</h3>
			<p className="lead mt-2 text-[0.93rem] flex-1">{course.tagline}</p>
			<div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-[var(--line-soft)]">
				<span className="text-[0.85rem] text-mute font-semibold">
					{course.duration} · {priceLabel(course)}
				</span>
				<span className="view-link" aria-hidden="true">
					<i>→</i>
				</span>
			</div>
		</Link>
	);
}

/* the price on a course page: one way of taking it at a time, with a switch
   where there are two. Session times sit behind a disclosure — they matter when
   someone is deciding, not while they are reading. */
export function PriceBox({
	course,
	slots = slotsFor(course),
}: {
	course: Course;
	slots?: SessionSlot[];
}) {
	const ways = deliveriesOf(course);
	const [way, setWay] = useState<Delivery>(ways[0]);
	const fee = course.fees[way] as Fee;
	const saving = bundleSaving(course, way);
	const onRequest = course.admission === "on-request";
	const times = slots.filter((s) => s.delivery === way);

	return (
		<div className="price-box">
			{ways.length > 1 ? (
				<fieldset className="price-switch">
					<legend className="sr-only">How would you like to learn?</legend>
					{ways.map((d) => (
						<button
							key={d}
							type="button"
							aria-pressed={d === way}
							data-on={d === way}
							onClick={() => setWay(d)}
						>
							{DELIVERY_LABEL[d]}
						</button>
					))}
				</fieldset>
			) : (
				<span className="price-only">{DELIVERY_LABEL[way]} only</span>
			)}

			<p className="mt-5">
				<span className="display price-figure">{formatNaira(fee.upfront)}</span>
				<span className="block text-[0.9rem] text-mute mt-1">
					for the whole course · {partsLine(fee)}
				</span>
			</p>
			<p className="lead mt-4 text-[0.93rem]">{DELIVERY_NOTE[way]}</p>
			{saving && course.bundle ? (
				<p className="text-[0.88rem] text-mute mt-3">
					Covers{" "}
					{course.bundle.parts
						.map((s) => getCourseBySlug(s)?.t ?? s)
						.join(" and ")}{" "}
					in one track — {formatNaira(saving)} less than taking both.
				</p>
			) : null}

			{times.length ? (
				<details className="price-times mt-5">
					<summary>
						{onRequest ? "When it would run" : "See session times"}
					</summary>
					<ul className="mt-3 grid gap-1.5">
						{times.map((s) => (
							<li key={s.id} className="text-[0.9rem]">
								{slotLabel(s)}
								{s.note ? <span className="text-mute"> · {s.note}</span> : null}
							</li>
						))}
					</ul>
					<p className="text-[0.82rem] text-mute mt-3">
						Start any day. We agree your session when you enrol.
					</p>
				</details>
			) : null}

			<Link
				to="/enrol"
				search={{ course: course.slug }}
				className="btn btn-primary w-full mt-6 justify-center"
			>
				{onRequest ? "Register your interest" : "Enrol"}
			</Link>
		</div>
	);
}

/* both prices as two compact lines — used where a visitor is already committing
   (the enrol summary), and nowhere they are still browsing */
export function FeeLines({ course }: { course: Course }) {
	return (
		<div className="fee-lines">
			{deliveriesOf(course).map((d) => {
				const fee = course.fees[d] as Fee;
				return (
					<div key={d} className="fee-line">
						<span className="fee-line-label">{DELIVERY_LABEL[d]}</span>
						<span className="fee-line-price">
							<span className="display">{formatNaira(fee.upfront)}</span>
							<span className="fee-line-plan">or {instalmentLabel(fee)}</span>
						</span>
					</div>
				);
			})}
		</div>
	);
}
