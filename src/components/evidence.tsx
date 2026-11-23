import { Link } from "@tanstack/react-router";
import {
	CASE_STUDY_MEDIA,
	type Person,
	type Testimonial,
} from "../lib/evidence";
import type { CaseStudy } from "../lib/work";
import { Figure, type FigureSpec } from "./figure";

/* The pieces that show evidence. Each one renders real material when
   src/lib/evidence.ts has it, and an honest placeholder when it does not. */

/* text that has not been written yet: shown in place, and obviously unfinished */
export function TextSlot({ children }: { children: React.ReactNode }) {
	return <span className="text-slot">{children}</span>;
}

export function LogoRow({ logos }: { logos: FigureSpec[] }) {
	return (
		<div className="logo-row">
			{logos.map((l, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: fixed slots, never reordered
				<Figure key={i} {...l} />
			))}
		</div>
	);
}

/* A case study as a card: the screenshot first, then what it is. */
export function CaseStudyCard({ work }: { work: CaseStudy }) {
	const media = CASE_STUDY_MEDIA[work.slug];
	return (
		<Link
			to="/work"
			hash={work.slug}
			className="card overflow-hidden flex flex-col"
		>
			{media ? <Figure {...media.cover} className="case-cover" /> : null}
			<div className="p-6 flex flex-col gap-2 flex-1">
				<span className="kicker">{work.kind}</span>
				<h3 className="h3">{work.t}</h3>
				<p className="lead text-[0.95rem] flex-1">{work.tagline}</p>
				<span className="view-link mt-2">
					Read the case study <i aria-hidden="true">→</i>
				</span>
			</div>
		</Link>
	);
}

export function Quote({
	t,
	who = "client",
}: {
	t: Testimonial;
	who?: "client" | "learner";
}) {
	const filled = Boolean(t.quote);
	return (
		<figure className="card quote m-0">
			<blockquote>
				{filled ? (
					<>“{t.quote}”</>
				) : (
					<TextSlot>
						{who === "client"
							? "A client's words about working with us — one or two sentences, with their permission to quote."
							: "A learner's words about their course — one or two sentences, with their permission to quote."}
					</TextSlot>
				)}
			</blockquote>
			<figcaption className="quote-by">
				<Figure
					{...(t.photo ?? {
						kind: "portrait",
						alt: "Photo of the person quoted",
					})}
					ratio="1 / 1"
				/>
				<span>
					<span className="block font-semibold text-ink">
						{t.name ?? <TextSlot>Name</TextSlot>}
					</span>
					<span className="block text-mute text-[0.85rem]">
						{t.role || t.org ? (
							[t.role, t.org].filter(Boolean).join(", ")
						) : (
							<TextSlot>
								{who === "client" ? "Role, organisation" : "Course, year"}
							</TextSlot>
						)}
					</span>
				</span>
			</figcaption>
		</figure>
	);
}

export function PersonCard({ p }: { p: Person }) {
	return (
		<article className="person">
			<Figure {...p.photo} />
			<h3 className="h3 mt-4">{p.name ?? <TextSlot>Name</TextSlot>}</h3>
			<p className="text-[0.9rem] text-accent-ink font-semibold mt-1">
				{p.role}
			</p>
			<p className="lead text-[0.92rem] mt-2">
				{p.bio ?? (
					<TextSlot>
						Two sentences: what they do here, and what they did before.
					</TextSlot>
				)}
			</p>
		</article>
	);
}
