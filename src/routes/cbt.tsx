import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
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
			title: "WAEC & JAMB CBT Training Centre in Kubwa, Abuja — NexaHubTech",
			description:
				"Master the CBT exam before day one. Intensive Computer-Based Test training for WAEC and JAMB (UTME) candidates at NexaHubTech, F01 Market, Kubwa. 8-key system drills, speed budgeting, 15+ years past questions, and timed mock simulations.",
			path: "/cbt",
			image: "/og/cbt.jpg",
		}),
});

/* Interactive 8-Key CBT simulator component */
function KeySimulator() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<number, "A" | "B" | "C" | "D">
	>({});
	const [showSubmitModal, setShowSubmitModal] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [activeKey, setActiveKey] = useState<string | null>(null);

	const q = SAMPLE_CBT_QUESTIONS[currentIndex];
	const totalQuestions = SAMPLE_CBT_QUESTIONS.length;
	const currentAnswer = selectedAnswers[q.id];

	const handleAnswer = useCallback(
		(choice: "A" | "B" | "C" | "D") => {
			if (isSubmitted) return;
			const targetId = SAMPLE_CBT_QUESTIONS[currentIndex]?.id;
			if (targetId) {
				setSelectedAnswers((prev) => ({ ...prev, [targetId]: choice }));
			}
		},
		[currentIndex, isSubmitted],
	);

	const handleNext = useCallback(() => {
		setCurrentIndex((i) => (i < SAMPLE_CBT_QUESTIONS.length - 1 ? i + 1 : i));
	}, []);

	const handlePrev = useCallback(() => {
		setCurrentIndex((i) => (i > 0 ? i - 1 : i));
	}, []);

	const handlePromptSubmit = useCallback(() => {
		setShowSubmitModal(true);
	}, []);

	const handleReturn = useCallback(() => {
		setShowSubmitModal(false);
	}, []);

	const handleConfirmSubmit = useCallback(() => {
		setShowSubmitModal(false);
		setIsSubmitted(true);
	}, []);

	const handleReset = () => {
		setSelectedAnswers({});
		setCurrentIndex(0);
		setIsSubmitted(false);
		setShowSubmitModal(false);
	};

	/* listen for physical keyboard presses of A, B, C, D, N, P, S, R */
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			/* ignore when user is typing in form inputs */
			const target = e.target as HTMLElement;
			if (
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.tagName === "SELECT"
			) {
				return;
			}

			const key = e.key.toUpperCase();
			if (["A", "B", "C", "D", "N", "P", "S", "R"].includes(key)) {
				setActiveKey(key);
				setTimeout(() => setActiveKey(null), 250);
			}

			if (showSubmitModal) {
				if (key === "R") {
					e.preventDefault();
					handleReturn();
				} else if (key === "S") {
					e.preventDefault();
					handleConfirmSubmit();
				}
				return;
			}

			if (isSubmitted) return;

			if (key === "A" || key === "B" || key === "C" || key === "D") {
				e.preventDefault();
				handleAnswer(key);
			} else if (key === "N") {
				e.preventDefault();
				handleNext();
			} else if (key === "P") {
				e.preventDefault();
				handlePrev();
			} else if (key === "S") {
				e.preventDefault();
				handlePromptSubmit();
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [
		handleAnswer,
		handleConfirmSubmit,
		handleNext,
		handlePrev,
		handlePromptSubmit,
		handleReturn,
		isSubmitted,
		showSubmitModal,
	]);

	const answeredCount = Object.keys(selectedAnswers).length;
	const correctCount = SAMPLE_CBT_QUESTIONS.filter(
		(item) => selectedAnswers[item.id] === item.correct,
	).length;

	return (
		<div className="card panel-learn p-6 sm:p-8 relative overflow-hidden">
			{/* Simulator Header */}
			<div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--line-soft)]">
				<div className="flex items-center gap-3">
					<span
						className="inline-block w-3 h-3 rounded-full animate-pulse"
						style={{ background: "var(--marigold)" }}
						aria-hidden="true"
					/>
					<span className="text-[0.82rem] font-bold uppercase tracking-wider text-[var(--marigold-ink)]">
						Live JAMB 8-Key Simulator
					</span>
				</div>
				<div className="flex items-center gap-4 text-[0.85rem] text-mute">
					<span>
						Answered:{" "}
						<strong className="text-[var(--ink)]">
							{answeredCount} / {totalQuestions}
						</strong>
					</span>
					<span className="hidden sm:inline">·</span>
					<span className="hidden sm:inline font-mono text-[var(--marigold-ink)]">
						Simulated Timer: 01:54:12
					</span>
				</div>
			</div>

			{/* Interactive Instructions note */}
			<div className="mt-4 p-3 rounded-lg bg-[rgba(106,44,173,0.06)] border border-[rgba(106,44,173,0.12)] text-[0.86rem] text-[var(--ink-soft)] flex items-center justify-between gap-3">
				<span>
					💡 <strong>Try your keyboard!</strong> Press{" "}
					<strong>A, B, C, D</strong> to pick answers, <strong>N</strong> for
					Next, <strong>P</strong> for Previous, <strong>S</strong> to Submit,
					and <strong>R</strong> to Reverse.
				</span>
				<span className="hidden md:inline-block text-[0.78rem] text-mute font-medium shrink-0">
					Mouse-free exam navigation
				</span>
			</div>

			{/* Question Box */}
			{!isSubmitted ? (
				<div className="mt-6">
					<div className="flex items-center justify-between gap-2 mb-3">
						<span className="pill text-[0.8rem] !py-1 !px-3 font-semibold">
							Question {currentIndex + 1} of {totalQuestions}
						</span>
						<span className="text-[0.82rem] text-mute font-semibold">
							Subject: {q.subject}
						</span>
					</div>

					<p className="display text-[1.12rem] sm:text-[1.25rem] text-[var(--ink)] leading-snug whitespace-pre-line mt-4">
						{q.question}
					</p>

					{/* Options */}
					<div className="mt-6 grid gap-3">
						{q.options.map((opt) => {
							const isSelected = currentAnswer === opt.key;
							return (
								<button
									key={opt.key}
									type="button"
									onClick={() => handleAnswer(opt.key)}
									className={`text-left p-3.5 sm:p-4 rounded-xl transition-all border flex items-start gap-3.5 ${
										isSelected
											? "bg-[rgba(106,44,173,0.12)] border-[var(--marigold)] font-semibold text-[var(--ink)] shadow-sm"
											: "bg-[var(--card)] hover:bg-[var(--paper-2)] border-[var(--line)] text-[var(--ink-soft)]"
									}`}
								>
									<span
										className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[0.85rem] font-bold shrink-0 transition-colors ${
											isSelected
												? "bg-[var(--marigold)] text-white"
												: "bg-[var(--paper-2)] text-[var(--ink)]"
										}`}
									>
										{opt.key}
									</span>
									<span className="text-[0.95rem] pt-0.5">{opt.text}</span>
								</button>
							);
						})}
					</div>

					{/* 8-Key Controls Bar */}
					<div className="mt-8 pt-5 border-t border-[var(--line-soft)] flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={handlePrev}
								disabled={currentIndex === 0}
								className={`btn !py-2 !px-4 text-[0.86rem] ${
									currentIndex === 0
										? "opacity-40 cursor-not-allowed btn-ghost"
										: "btn-ghost"
								} ${activeKey === "P" ? "ring-2 ring-[var(--marigold)]" : ""}`}
							>
								<kbd className="px-1.5 py-0.5 mr-1.5 text-[0.75rem] rounded bg-[var(--paper-2)] font-mono border">
									P
								</kbd>
								Previous
							</button>

							<button
								type="button"
								onClick={handleNext}
								disabled={currentIndex === totalQuestions - 1}
								className={`btn !py-2 !px-4 text-[0.86rem] ${
									currentIndex === totalQuestions - 1
										? "opacity-40 cursor-not-allowed btn-ghost"
										: "btn-ghost"
								} ${activeKey === "N" ? "ring-2 ring-[var(--marigold)]" : ""}`}
							>
								Next
								<kbd className="px-1.5 py-0.5 ml-1.5 text-[0.75rem] rounded bg-[var(--paper-2)] font-mono border">
									N
								</kbd>
							</button>
						</div>

						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={handlePromptSubmit}
								className={`btn btn-primary !py-2 !px-5 text-[0.86rem] ${
									activeKey === "S" ? "ring-2 ring-white" : ""
								}`}
							>
								Submit Exam
								<kbd className="px-1.5 py-0.5 ml-1.5 text-[0.75rem] rounded bg-[rgba(255,255,255,0.25)] font-mono">
									S
								</kbd>
							</button>
						</div>
					</div>

					{/* Keyboard indicator strip */}
					<div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[0.78rem] text-mute">
						<span className="font-medium mr-1">Active Keys:</span>
						{["A", "B", "C", "D", "N", "P", "S", "R"].map((k) => (
							<span
								key={k}
								className={`px-2 py-0.5 rounded font-mono border transition-all ${
									activeKey === k
										? "bg-[var(--marigold)] text-white border-[var(--marigold)] scale-110 shadow"
										: "bg-[var(--paper-2)] border-[var(--line)] text-[var(--ink)]"
								}`}
							>
								{k}
							</span>
						))}
					</div>
				</div>
			) : (
				/* Submitted Results view */
				<div className="mt-6 py-6 text-center">
					<div
						className="w-14 h-14 rounded-2xl grid place-items-center mx-auto"
						style={{ background: "var(--marigold)", color: "#ffffff" }}
						aria-hidden="true"
					>
						<span className="text-2xl">✓</span>
					</div>
					<h3 className="display text-[1.6rem] mt-4">Simulation Complete</h3>
					<p className="lead mt-2 text-[1rem]">
						You answered <strong>{answeredCount}</strong> out of{" "}
						{totalQuestions} questions.
					</p>
					<div className="inline-block mt-4 px-6 py-3 rounded-2xl bg-[rgba(106,44,173,0.08)] border border-[rgba(106,44,173,0.18)]">
						<span className="text-mute text-[0.88rem]">Your Score:</span>
						<p className="display text-[2rem] text-[var(--marigold-ink)]">
							{correctCount} / {totalQuestions}
						</p>
					</div>

					{/* Explanation breakdown */}
					<div className="mt-8 text-left grid gap-4">
						<h4 className="display text-[1.1rem]">
							Question Review & Rationale
						</h4>
						{SAMPLE_CBT_QUESTIONS.map((item, idx) => {
							const userAns = selectedAnswers[item.id];
							const isRight = userAns === item.correct;
							return (
								<div
									key={item.id}
									className="p-4 rounded-xl border bg-[var(--card)] border-[var(--line)]"
								>
									<div className="flex items-center justify-between text-[0.85rem] mb-1">
										<span className="font-semibold text-[var(--ink)]">
											Question {idx + 1} ({item.subject})
										</span>
										<span
											className={`font-bold ${isRight ? "text-green-700" : "text-rose-700"}`}
										>
											{isRight
												? "✓ Correct"
												: userAns
													? `✕ Picked ${userAns} (Answer: ${item.correct})`
													: `— Unanswered (Answer: ${item.correct})`}
										</span>
									</div>
									<p className="text-[0.92rem] text-[var(--ink-soft)] mt-1">
										{item.question}
									</p>
									<p className="text-[0.84rem] text-mute mt-2 pt-2 border-t border-[var(--line-soft)]">
										<strong>Why:</strong> {item.explanation}
									</p>
								</div>
							);
						})}
					</div>

					<button
						type="button"
						onClick={handleReset}
						className="btn btn-ghost mt-6 text-[0.9rem]"
					>
						Restart Practice Simulation
					</button>
				</div>
			)}

			{/* Submission Confirmation Modal Overlay */}
			{showSubmitModal && (
				<div className="absolute inset-0 z-20 bg-[rgba(49,16,73,0.85)] backdrop-blur-xs flex items-center justify-center p-6 text-center animate-in fade-in">
					<div className="bg-[var(--card)] p-6 sm:p-8 rounded-2xl max-w-[28rem] shadow-xl border border-[var(--line)]">
						<span className="text-3xl">⚠️</span>
						<h4 className="display text-[1.4rem] mt-3">
							Confirm Exam Submission
						</h4>
						<p className="text-[0.93rem] text-mute mt-2">
							You have answered <strong>{answeredCount}</strong> of{" "}
							{totalQuestions} questions. Are you sure you want to finish and
							submit your test?
						</p>
						<p className="text-[0.82rem] text-[var(--marigold-ink)] font-medium mt-3 bg-[rgba(106,44,173,0.08)] py-1.5 px-3 rounded-lg">
							CBT Shortcut: Press <strong>'R'</strong> to return, or{" "}
							<strong>'S'</strong> to submit.
						</p>
						<div className="mt-6 flex flex-wrap gap-3 justify-center">
							<button
								type="button"
								onClick={handleReturn}
								className="btn btn-ghost !py-2 !px-4 text-[0.88rem]"
							>
								Return to Exam (R)
							</button>
							<button
								type="button"
								onClick={handleConfirmSubmit}
								className="btn btn-primary !py-2 !px-5 text-[0.88rem]"
							>
								Yes, Submit Now (S)
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function CbtPage() {
	useReveal();

	return (
		<>
			{/* Page Hero */}
			<section className="wrap page-head">
				<div className="max-w-[48rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						WAEC & JAMB (UTME) Preparation · Kubwa Centre
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.5rem] lg:text-[4rem]">
						Master the CBT exam.{" "}
						<span style={{ color: "var(--learn-ink)" }}>Before exam day</span>.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.12rem] max-w-[40rem]">
						Most candidates fail or drop marks in JAMB and WAEC not because they
						didn't study, but because of slow mouse navigation, calculator
						confusion, panic against the countdown clock, and computer anxiety.
						We train you in the exact exam software, the 8-key shortcut system,
						and timed simulation until speed and calm become second nature.
					</p>
					<div className="rise rise-4 mt-8 flex flex-wrap gap-3">
						<Link
							to="/enrol"
							search={{ course: "cbt-training" }}
							className="btn btn-primary"
						>
							Register for CBT Training
						</Link>
						<a
							href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
								"Hello NexaHubTech! I want to enquire about CBT training for WAEC and JAMB at your Kubwa centre.",
							)}`}
							target="_blank"
							rel="noreferrer"
							className="btn btn-teal"
						>
							Book via WhatsApp
						</a>
						<a href="#simulator" className="btn btn-ghost">
							Try 8-Key Simulator ↓
						</a>
					</div>
					<div className="rise rise-5 mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.92rem] text-mute">
						<span>📍 F01 Market, Kubwa, Abuja</span>
						<span>⚡ Uninterrupted Power Guaranteed</span>
						<span>⌨️ Official 8-Key System</span>
					</div>
				</div>
			</section>

			{/* Highlights Strip */}
			<section className="wrap py-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{[
						{ label: "Exam Format", value: "100% CBT Simulation" },
						{ label: "Target Exams", value: "JAMB UTME & WAEC" },
						{ label: "Navigation Drill", value: "Official 8-Key System" },
						{ label: "Mock Exam Lab", value: "F01 Market, Kubwa" },
					].map((item) => (
						<div
							key={item.label}
							className="card p-5 text-center flex flex-col justify-center"
						>
							<span className="text-[0.78rem] text-mute uppercase font-bold tracking-wider">
								{item.label}
							</span>
							<span className="display text-[1.15rem] mt-1 text-[var(--ink)]">
								{item.value}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* Interactive 8-Key Practice Tool Section */}
			<section id="simulator" className="wrap py-14">
				<div className="reveal max-w-[42rem] mb-8">
					<Eyebrow>Interactive demo</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Experience the 8-key system.
					</h2>
					<p className="lead mt-3">
						Why waste 3 seconds per question struggling with a sticky centre
						mouse? Test how fast you can answer and navigate using only keyboard
						keys.
					</p>
				</div>
				<div className="reveal">
					<KeySimulator />
				</div>
			</section>

			{/* Why Students Struggle Section */}
			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-12">
					<div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-start">
						<div>
							<Eyebrow>The real hurdle</Eyebrow>
							<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
								Why brilliant students lose marks in CBT.
							</h2>
							<p className="lead mt-4">
								In Nigerian universities and polytechnics, admission cut-off
								marks are fiercely competitive. A difference of 15 marks is the
								line between studying Medicine or Engineering and staying home
								another year.
							</p>
							<p className="lead mt-3">
								Over 60% of lost marks on exam day come from interface friction:
								faulty mice, accidental early submissions, spending 4 minutes on
								a single math calculation, or panic when the 120-minute
								countdown timer flashes red.
							</p>
							<div className="mt-6 flex flex-wrap gap-4">
								<div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--line)] flex-1 min-w-[12rem]">
									<span className="display text-[1.4rem] text-[var(--marigold-ink)]">
										40 Seconds
									</span>
									<p className="text-[0.82rem] text-mute mt-1">
										Average time allowed per question (180 questions in 120
										minutes).
									</p>
								</div>
								<div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--line)] flex-1 min-w-[12rem]">
									<span className="display text-[1.4rem] text-[var(--marigold-ink)]">
										8–10 Minutes
									</span>
									<p className="text-[0.82rem] text-mute mt-1">
										Raw exam time saved by switching from mouse-clicking to
										keyboard keys.
									</p>
								</div>
							</div>
						</div>

						<div className="bg-[var(--card)] p-6 sm:p-7 rounded-2xl border border-[var(--line)] shadow-sm">
							<span className="text-[0.82rem] text-mute font-bold uppercase tracking-wider">
								What our training fixes
							</span>
							<div className="mt-4 space-y-3.5">
								{[
									{
										issue: "Mouse failure in the hall",
										fix: "8-Key keyboard fluency — navigate without touching a mouse.",
									},
									{
										issue: "Running out of time",
										fix: "Question triage strategy: immediate wins first, calculation budgeting.",
									},
									{
										issue: "Onscreen calculator lag",
										fix: "Numeric keypad drills for Physics, Chemistry, & Mathematics.",
									},
									{
										issue: "Accidental test submission",
										fix: "Muscle memory on prompt confirmation keys ('R' vs 'S').",
									},
									{
										issue: "First-time computer fear",
										fix: "Dedicated personal workstations in our Kubwa lab with gentle coaching.",
									},
								].map((item) => (
									<div
										key={item.issue}
										className="text-[0.9rem] flex items-start gap-3"
									>
										<span
											className="mk mk-learn shrink-0 mt-0.5"
											aria-hidden="true"
										>
											✓
										</span>
										<div>
											<strong className="text-[var(--ink)] block">
												{item.issue}
											</strong>
											<span className="text-mute text-[0.86rem]">
												{item.fix}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* The 5 Training Pillars */}
			<section className="wrap py-14">
				<div className="reveal max-w-[42rem] mb-10">
					<Eyebrow variant="plain">Training curriculum</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Five pillars of CBT exam mastery.
					</h2>
					<p className="lead mt-4">
						We take you step-by-step from foundational digital confidence to
						full-scale, timed exam simulations that mirror the exact conditions
						of accredited centres.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{CBT_PILLARS.map((p) => (
						<div
							key={p.n}
							className="card card-lift reveal p-7 flex flex-col justify-between"
						>
							<div>
								<span className="step-badge badge-learn">{p.n}</span>
								<h3 className="display text-[1.3rem] mt-4">{p.title}</h3>
								<p className="lead mt-3 text-[0.94rem]">{p.description}</p>
							</div>
							<div className="mt-6 pt-4 border-t border-[var(--line-soft)]">
								<span className="text-[0.78rem] text-mute font-bold uppercase tracking-wider block mb-2">
									Key Outcomes
								</span>
								<ul className="space-y-1.5">
									{p.outcomes.map((o) => (
										<li
											key={o}
											className="text-[0.84rem] text-[var(--ink-soft)] flex items-start gap-2"
										>
											<span className="text-[var(--marigold)] shrink-0">→</span>
											<span>{o}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}

					{/* Centre Facility Card */}
					<div className="card card-lift reveal panel-learn p-7 flex flex-col justify-between">
						<div>
							<span className="pill text-[0.75rem] !py-1 !px-2.5">
								Centre Facilities
							</span>
							<h3 className="display text-[1.3rem] mt-4">
								Modern Lab at F01 Market, Kubwa
							</h3>
							<p className="lead mt-3 text-[0.94rem]">
								No power failure, no shared keyboards, and no noisy
								distractions. Practice on dedicated desktop workstations powered
								by solar and generator backup.
							</p>
						</div>
						<div className="mt-6 pt-4 border-t border-[var(--line-soft)]">
							<a
								href={CONTACT.whatsapp}
								target="_blank"
								rel="noreferrer"
								className="view-link"
							>
								Inquire about lab visits <i aria-hidden="true">→</i>
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Packages & Pricing Section */}
			<section className="wrap py-14">
				<div className="reveal max-w-[42rem] mb-10">
					<Eyebrow>Training packages</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Clear options. Transparent fees.
					</h2>
					<p className="lead mt-4">
						Choose the schedule and intensity that suits your timeline before
						the UTME or WAEC dates. Start whenever you are ready.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
					{CBT_PACKAGES.map((pkg) => (
						<div
							key={pkg.id}
							className={`card card-lift reveal p-6 sm:p-7 flex flex-col justify-between ${
								pkg.badge ? "panel-learn border-[var(--marigold)]" : ""
							}`}
						>
							<div>
								{pkg.badge && (
									<span className="pill text-[0.72rem] !py-0.5 !px-2 mb-3 inline-block">
										{pkg.badge}
									</span>
								)}
								<h3 className="display text-[1.25rem]">{pkg.name}</h3>
								<p className="text-[0.88rem] text-mute mt-2 min-h-[2.8rem]">
									{pkg.tagline}
								</p>
								<div className="mt-5 pb-4 border-b border-[var(--line-soft)]">
									<span className="display text-[1.5rem] text-[var(--ink)] block">
										{pkg.price}
									</span>
									<span className="text-[0.84rem] text-mute font-semibold">
										{pkg.duration}
									</span>
								</div>
								<ul className="mt-5 space-y-2.5">
									{pkg.features.map((f) => (
										<li key={f} className="feat !text-[0.85rem] !gap-2">
											<span className="mk mk-learn shrink-0" aria-hidden="true">
												✓
											</span>
											<span>{f}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="mt-6 pt-4 border-t border-[var(--line-soft)]">
								<p className="text-[0.78rem] text-mute mb-4">
									<strong>Ideal for:</strong> {pkg.idealFor}
								</p>
								<Link
									to="/enrol"
									search={{ course: "cbt-training" }}
									className="btn btn-primary w-full text-center !py-2 text-[0.86rem]"
								>
									Select Package
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Location & Directions Card */}
			<section className="wrap py-14">
				<div className="reveal card panel-learn p-8 md:p-12">
					<div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
						<div>
							<Eyebrow>Where we are</Eyebrow>
							<h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
								Located right in Kubwa, Abuja.
							</h2>
							<p className="lead mt-4">
								You don't need to travel into town to practice in an
								accredited-grade CBT lab. Our centre is located at F01 Market in
								Kubwa, easily accessible for students in Kubwa, Bwari, Dei-Dei,
								Dutse, and Gwarinpa.
							</p>
							<div className="mt-6 space-y-2 text-[0.95rem]">
								<p>
									<strong>Centre Address:</strong> {CBT_DETAILS.location}
								</p>
								<p>
									<strong>Phone / WhatsApp:</strong> {CONTACT.phoneDisplay}
								</p>
								<p>
									<strong>Practice Hours:</strong> Monday – Saturday, 8:00 AM –
									6:00 PM
								</p>
							</div>
						</div>

						<div className="card p-6 bg-[var(--card)] border border-[var(--line)]">
							<h3 className="display text-[1.25rem]">
								Walk In or Book a Batch
							</h3>
							<p className="lead text-[0.92rem] mt-2">
								Parents and candidates are welcome to visit our lab, inspect the
								computer setup, and take a free 10-question placement test
								before enrolling.
							</p>
							<div className="mt-6 flex flex-col gap-3">
								<a
									href={CONTACT.whatsapp}
									target="_blank"
									rel="noreferrer"
									className="btn btn-teal text-center"
								>
									Chat with an Instructor on WhatsApp
								</a>
								<Link
									to="/enrol"
									search={{ course: "cbt-training" }}
									className="btn btn-ghost text-center"
								>
									Enrol Online
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Frequently Asked Questions */}
			<section className="wrap py-14">
				<div className="reveal max-w-[42rem] mb-10">
					<Eyebrow variant="plain">Got questions?</Eyebrow>
					<h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
						Frequently asked questions.
					</h2>
					<p className="lead mt-4">
						Everything you need to know about our CBT training sessions,
						equipment, and mock exams.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					{CBT_FAQS.map((faq) => (
						<div key={faq.question} className="card reveal p-7">
							<h3 className="display text-[1.15rem]">{faq.question}</h3>
							<p className="lead mt-3 text-[0.94rem]">{faq.answer}</p>
						</div>
					))}
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="wrap py-16">
				<div className="reveal card card-lift panel-learn p-9 md:p-12 text-center max-w-[48rem] mx-auto">
					<Eyebrow>Ready to score higher?</Eyebrow>
					<h3 className="display text-[2rem] sm:text-[2.5rem] mt-3">
						Don't gamble on exam day.
					</h3>
					<p className="lead mt-4 max-w-[36rem] mx-auto">
						Walk into your JAMB or WAEC exam hall knowing exactly what to do
						from the first click to the final question. Join our next CBT
						practice cohort at Kubwa today.
					</p>
					<div className="mt-8 flex flex-wrap gap-3 justify-center">
						<Link
							to="/enrol"
							search={{ course: "cbt-training" }}
							className="btn btn-primary"
						>
							Register for CBT Training
						</Link>
						<a
							href={CONTACT.whatsapp}
							target="_blank"
							rel="noreferrer"
							className="btn btn-teal"
						>
							WhatsApp Admissions
						</a>
						<Link to="/courses" className="btn btn-ghost">
							Explore Tech Courses
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
