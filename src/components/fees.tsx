import { Link } from "@tanstack/react-router";
import {
	bundleSaving,
	bundlesContaining,
	CENTRE_SEATS,
	type Course,
	DELIVERY_LABEL,
	type Delivery,
	deliveriesOf,
	type Fee,
	formatNaira,
	getCourseBySlug,
	instalmentLabel,
	nextCourse,
	priceLabel,
} from "../lib/courses";
import { type SessionSlot, seatsLabel, slotLabel } from "../lib/timetable";

/* Every fee on the site renders through these, from the numbers in courses.ts —
   a card, a course page and the fees table cannot show three different prices. */

const DELIVERY_NOTE: Record<Delivery, string> = {
	online:
		"Live sessions from anywhere in Nigeria, with materials and feedback on WhatsApp.",
	inhouse: `A group of at most ${CENTRE_SEATS} at our Kubwa centre, with an instructor in the room.`,
};

/* the fee, as two lines a card can carry: each way to take the course, and its
   instalment plan underneath */
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

/* the full choice on a course page: each delivery as its own option */
export function FeeOptions({ course }: { course: Course }) {
	const ways = deliveriesOf(course);
	return (
		<div
			className={`grid gap-4 ${ways.length > 1 ? "sm:grid-cols-2" : "sm:max-w-[22rem]"}`}
		>
			{ways.map((d) => {
				const fee = course.fees[d] as Fee;
				return (
					<div key={d} className="fee-option" data-delivery={d}>
						<span className="fee-option-label">{DELIVERY_LABEL[d]}</span>
						<span className="display fee-option-price">
							{formatNaira(fee.upfront)}
						</span>
						<span className="fee-option-plan">
							or {instalmentLabel(fee)} in instalments
						</span>
						<p className="fee-option-note">{DELIVERY_NOTE[d]}</p>
					</div>
				);
			})}
		</div>
	);
}

/* the weekly sessions a course can be joined in */
export function SlotList({ slots }: { slots: SessionSlot[] }) {
	return (
		<ul className="slot-list">
			{slots.map((s) => (
				<li key={s.id} className="slot-row" data-delivery={s.delivery}>
					<span className="slot-when">{slotLabel(s)}</span>
					<span className="slot-where">
						{seatsLabel(s)}
						{s.note ? ` · ${s.note}` : ""}
					</span>
				</li>
			))}
		</ul>
	);
}

/* "where this leads": the next course, and any bundle this course is part of */
export function NextSteps({ course }: { course: Course }) {
	const next = nextCourse(course);
	const parentBundles = bundlesContaining(course.slug);
	const ownSaving = bundleSaving(course);
	if (!next && !parentBundles.length && !ownSaving) return null;

	return (
		<div className="grid md:grid-cols-2 gap-5">
			{ownSaving && course.bundle ? (
				<div className="card panel-learn p-7">
					<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
						One track, two courses
					</span>
					<p className="lead mt-2">
						This covers{" "}
						{course.bundle.parts
							.map((s) => getCourseBySlug(s)?.t ?? s)
							.join(" and ")}{" "}
						in one continuous course, for{" "}
						<strong>{formatNaira(ownSaving)} less</strong> than taking them
						separately.
					</p>
				</div>
			) : null}
			{parentBundles.map((b) => {
				const saving = bundleSaving(b);
				return (
					<Link
						key={b.slug}
						to="/courses/$slug"
						params={{ slug: b.slug }}
						className="card card-lift panel-learn p-7"
					>
						<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
							Want both halves?
						</span>
						<h3 className="display text-[1.2rem] mt-2">
							{b.t}
							{b.d ? ` (${b.d})` : ""}
						</h3>
						<p className="lead mt-1 text-[0.92rem]">
							{b.bundle?.parts
								.map((s) => getCourseBySlug(s)?.t ?? s)
								.join(" + ")}{" "}
							in one track
							{saving ? ` — ${formatNaira(saving)} less than both apart` : ""}.
						</p>
						<span className="view-link mt-3">
							See the track <i aria-hidden="true">→</i>
						</span>
					</Link>
				);
			})}
			{next ? (
				<Link
					to="/courses/$slug"
					params={{ slug: next.slug }}
					className="card card-lift p-7"
				>
					<span className="text-[0.8rem] text-mute font-semibold uppercase tracking-wider">
						{course.next?.upgrade ? "Carry on" : "Where this leads"}
					</span>
					<h3 className="display text-[1.2rem] mt-2">{next.t}</h3>
					<p className="lead mt-1 text-[0.92rem]">
						{course.next?.upgrade
							? `Continue into the full course for ${formatNaira(course.next.upgrade)} more — you pick up where you stopped.`
							: next.tagline}
					</p>
					{course.next?.upgrade ? null : (
						<p className="text-[0.85rem] text-mute mt-2 font-semibold">
							{priceLabel(next)} · {next.duration}
						</p>
					)}
					<span className="view-link mt-3">
						View course <i aria-hidden="true">→</i>
					</span>
				</Link>
			) : null}
		</div>
	);
}
