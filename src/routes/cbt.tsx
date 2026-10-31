import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT, Eyebrow, useReveal } from "../components/site";
import {
	CBT_DETAILS,
	CBT_FAQS,
	CBT_PACKAGES,
	CBT_PILLARS,
	SAMPLE_CBT_QUESTIONS,
} from "../lib/cbt";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/cbt")({
	component: CbtPage,
	ssr: false,
	head: () =>
		pageMeta({
			title: "WAEC & JAMB CBT Training in Kubwa, Abuja — NexaHubTech",
			description:
				"Get comfortable with the computer-based exam before the day. CBT practice for JAMB and WAEC candidates at NexaHubTech, F01 Market, Kubwa: keyboard shortcuts, pacing, past questions and timed mock exams.",
			path: "/cbt",
			image: "/og/cbt.jpg",
		}),
});

const WHATSAPP_ENQUIRY = `${CONTACT.whatsapp}?text=${encodeURIComponent(
	"Hello NexaHubTech! I want to ask about CBT training for WAEC and JAMB.",
)}`;

type Choice = "A" | "B" | "C" | "D";

/* a few sample questions that answer with the same keys the exam uses.
   The keys only work once focus is inside the card, so typing elsewhere on
   the page is never hijacked. */
function PracticeQuestions() {
	const [index, setIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<number, Choice>>({});

	const q = SAMPLE_CBT_QUESTIONS[index];
	const total = SAMPLE_CBT_QUESTIONS.length;
	const picked = answers[q.id];
	const answered = Object.keys(answers).length;
	const correct = SAMPLE_CBT_QUESTIONS.filter(
		(item) => answers[item.id] === item.correct,
	).length;

	const pick = (choice: Choice) => {
		if (picked) return;
		setAnswers((prev) => ({ ...prev, [q.id]: choice }));
	};
	const next = () => setIndex((i) => Math.min(i + 1, total - 1));
	const prev = () => setIndex((i) => Math.max(i - 1, 0));
	const restart = () => {
		setAnswers({});
		setIndex(0);
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		const key = e.key.toUpperCase();
		if (key === "A" || key === "B" || key === "C" || key === "D") {
			e.preventDefault();
			pick(key);
		} else if (key === "N") {
			e.preventDefault();
			next();
		} else if (key === "P") {
			e.preventDefault();
			prev();
		}
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: shortcuts for the buttons inside, which stay clickable
		<div className="card p-6 sm:p-8" onKeyDown={onKeyDown}>
			<div className="flex flex-wrap items-center justify-between gap-2 text-[0.85rem] text-mute">
				<span className="font-semibold text-[var(--ink)]">
					Question {index + 1} of {total} · {q.subject}
				</span>
				{answered > 0 && (
					<span>
						{correct} of {answered} correct
					</span>
				)}
			</div>

			<p className="display text-[1.15rem] sm:text-[1.25rem] leading-snug mt-5">
				{q.question}
			</p>

			<div className="mt-6 grid gap-2.5">
				{q.options.map((opt) => {
					const isPicked = picked === opt.key;
					const isAnswer = picked && opt.key === q.correct;
					const state = isAnswer
						? "border-green-600 bg-green-50 text-[var(--ink)]"
						: isPicked
							? "border-rose-500 bg-rose-50 text-[var(--ink)]"
							: "border-[var(--line)] bg-[var(--card)] text-[var(--ink-soft)]";
					return (
						<button
							key={opt.key}
							type="button"
							onClick={() => pick(opt.key)}
							aria-disabled={Boolean(picked)}
							className={`text-left p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${state} ${
								picked ? "cursor-default" : "hover:bg-[var(--paper-2)]"
							}`}
						>
							<kbd className="inline-grid place-items-center w-7 h-7 rounded-lg text-[0.85rem] font-bold font-mono bg-[var(--paper-2)] text-[var(--ink)] shrink-0">
								{opt.key}
							</kbd>
							<span className="text-[0.95rem]">{opt.text}</span>
						</button>
					);
				})}
			</div>

			{picked && (
				<p
					className="text-[0.9rem] text-[var(--ink-soft)] mt-4"
					aria-live="polite"
				>
					<strong>
						{picked === q.correct ? "Correct." : `The answer is ${q.correct}.`}
					</strong>{" "}
					{q.explanation}
				</p>
			)}

			<div className="mt-6 pt-5 border-t border-[var(--line-soft)] flex flex-wrap items-center justify-between gap-3">
				<div className="flex gap-2">
					<button
						type="button"
						onClick={prev}
						disabled={index === 0}
						className="btn btn-ghost !py-2 !px-4 text-[0.86rem] disabled:opacity-40"
					>
						<kbd className="font-mono mr-1.5">P</kbd> Previous
					</button>
					{index < total - 1 ? (
						<button
							type="button"
							onClick={next}
							className="btn btn-ghost !py-2 !px-4 text-[0.86rem]"
						>
							Next <kbd className="font-mono ml-1.5">N</kbd>
						</button>
					) : (
						answered === total && (
							<button
								type="button"
								onClick={restart}
								className="btn btn-ghost !py-2 !px-4 text-[0.86rem]"
							>
								Try again
							</button>
						)
					)}
				</div>
				<span className="text-[0.82rem] text-mute">
					Click an answer, then try the keys.
				</span>
			</div>
		</div>
	);
}

function CbtPage() {
	useReveal();

	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						JAMB & WAEC · Kubwa centre
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.5rem]">
						Walk into your CBT exam{" "}
						<span style={{ color: "var(--learn-ink)" }}>already at ease</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Knowing your subjects is half of it. The other half is the computer:
						the keys, the clock and the screen. We help you practise both, on
						real desktops, until exam day feels familiar.
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link
							to="/enrol"
							search={{ course: "cbt-training" }}
							className="btn btn-primary"
						>
							Register for CBT training
						</Link>
						<a
							href={WHATSAPP_ENQUIRY}
							target="_blank"
							rel="noreferrer"
							className="btn btn-ghost"
						>
							Ask on WhatsApp
						</a>
					</div>
				</div>
			</section>

			<section id="practice" className="wrap py-14">
				<div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start">
					<div className="reveal">
						<Eyebrow>Try a few questions</Eyebrow>
						<h2 className="shout shout-md mt-4">Answer with the keyboard.</h2>
						<p className="lead mt-4">
							In the JAMB exam you can answer every question without a mouse.
							Press <kbd className="font-mono">A</kbd>–
							<kbd className="font-mono">D</kbd> to choose,{" "}
							<kbd className="font-mono">N</kbd> and{" "}
							<kbd className="font-mono">P</kbd> to move between questions.
						</p>
						<p className="lead mt-3">
							In the real exam, <kbd className="font-mono">S</kbd> submits and{" "}
							<kbd className="font-mono">R</kbd> takes you back if you pressed
							it by mistake. We practise all of these until you don't have to
							think about them.
						</p>
					</div>
					<div className="reveal">
						<PracticeQuestions />
					</div>
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-10">
					<Eyebrow variant="plain">What we practise</Eyebrow>
					<h2 className="shout shout-md mt-4">
						From first click to final mock.
					</h2>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
					{CBT_PILLARS.map((p) => (
						<div key={p.n} className="card reveal p-6">
							<span className="step-badge badge-learn">{p.n}</span>
							<h3 className="display text-[1.2rem] mt-4">{p.title}</h3>
							<p className="lead mt-2 text-[0.93rem]">{p.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="wrap py-14">
				<div className="reveal max-w-[40rem] mb-10">
					<Eyebrow>Packages</Eyebrow>
					<h2 className="shout shout-md mt-4">Pick what fits your timeline.</h2>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{CBT_PACKAGES.map((pkg) => (
						<div
							key={pkg.id}
							className={`card card-lift reveal p-6 flex flex-col ${
								pkg.badge ? "panel-learn" : ""
							}`}
						>
							<div className="flex items-center justify-between gap-2">
								<h3 className="display text-[1.2rem]">{pkg.name}</h3>
								{pkg.badge && (
									<span className="pill text-[0.72rem] !py-0.5 !px-2">
										{pkg.badge}
									</span>
								)}
							</div>
							<p className="text-[0.85rem] text-mute mt-1">{pkg.idealFor}</p>
							<p className="mt-4">
								<span className="display text-[1.5rem]">{pkg.price}</span>
								<span className="block text-[0.84rem] text-mute">
									{pkg.duration}
								</span>
							</p>
							<ul className="mt-5 space-y-2 flex-1">
								{pkg.features.map((f) => (
									<li key={f} className="feat !text-[0.88rem] !gap-2">
										<span className="mk mk-learn" aria-hidden="true">
											✓
										</span>
										<span>{f}</span>
									</li>
								))}
							</ul>
							<Link
								to="/enrol"
								search={{ course: "cbt-training" }}
								className={`btn ${pkg.badge ? "btn-primary" : "btn-ghost"} w-full mt-6 !py-2 text-[0.88rem]`}
							>
								Choose this
							</Link>
						</div>
					))}
				</div>
			</section>

			<section className="wrap py-14">
				<div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12 items-start">
					<div className="reveal">
						<Eyebrow variant="plain">Questions</Eyebrow>
						<h2 className="shout shout-md mt-4">Before you register.</h2>
						<p className="lead mt-4">
							Anything else, ask us on{" "}
							<a
								href={WHATSAPP_ENQUIRY}
								target="_blank"
								rel="noreferrer"
								className="underline"
							>
								WhatsApp
							</a>
							.
						</p>
					</div>
					<div className="reveal grid gap-3">
						{CBT_FAQS.map((faq) => (
							<details key={faq.question} className="approach-detail">
								<summary>{faq.question}</summary>
								<div>
									<p className="lead text-[0.95rem]">{faq.answer}</p>
								</div>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="wrap py-16">
				<div className="reveal card panel-learn p-9 md:p-12 text-center max-w-[46rem] mx-auto">
					<Eyebrow>Come and see the lab</Eyebrow>
					<h2 className="shout shout-md mt-3">
						Start with a free placement test.
					</h2>
					<p className="lead mt-4 max-w-[34rem] mx-auto">
						Visit us at {CBT_DETAILS.location}. We are open {CBT_DETAILS.hours}.
						Bring a parent if you like.
					</p>
					<div className="mt-8 flex flex-wrap gap-3 justify-center">
						<Link
							to="/enrol"
							search={{ course: "cbt-training" }}
							className="btn btn-primary"
						>
							Register for CBT training
						</Link>
						<a
							href={WHATSAPP_ENQUIRY}
							target="_blank"
							rel="noreferrer"
							className="btn btn-teal"
						>
							Chat on WhatsApp
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
