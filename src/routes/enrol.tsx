import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT, Eyebrow, useReveal } from "../components/site";
import { COURSES, getCourseBySlug } from "../lib/courses";
import {
	type ComposedEnrolment,
	composeEnrolment,
	EMPLOYMENT,
	type Employment,
	type Enrolment,
	GENDERS,
	type Gender,
	REFERRALS,
	type Referral,
	TRAINING_MODES,
	type TrainingMode,
	YES_NO,
	type YesNo,
} from "../lib/enrolment";
import { sendEnrolment } from "../lib/send-enrolment";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/enrol")({
	component: Enrol,
	ssr: false,
	/* ?course=<slug> is how a course page hands its course over. An unknown or
	   missing slug is not an error — the form just starts on no course chosen. */
	validateSearch: (search: Record<string, unknown>) => ({
		course: typeof search.course === "string" ? search.course : undefined,
	}),
	head: () =>
		pageMeta({
			title: "Enrol — NexaHubTech",
			description:
				"Apply for a place on a NexaHubTech cohort. Tell us about you, pick your course and training mode, and we'll be in touch about the next intake.",
			path: "/enrol",
			image: "/og/enrol.jpg",
		}),
});

const legendStyle = {
	fontWeight: 600,
	fontSize: "0.9rem",
	marginBottom: "0.4rem",
} as const;

const fieldsetStyle = {
	border: 0,
	padding: 0,
	margin: "0 0 1.1rem",
} as const;

/* the site's pill-shaped choices, driving real radio inputs. The input is the
   control — it brings required-ness, arrow-key navigation and the correct
   announcement for free — and the label carries the existing `.choice` styling. */
function ChoiceGroup<T extends string>({
	name,
	label,
	options,
	value,
	onChange,
}: {
	name: string;
	label: string;
	options: readonly T[];
	value: T | "";
	onChange: (v: T) => void;
}) {
	return (
		<fieldset className="field" style={fieldsetStyle}>
			<legend style={legendStyle}>{label}</legend>
			<div className="choice-row">
				{options.map((o) => (
					<label key={o} className="choice" data-on={value === o}>
						<input
							type="radio"
							name={name}
							value={o}
							checked={value === o}
							onChange={() => onChange(o)}
						/>
						{o}
					</label>
				))}
			</div>
		</fieldset>
	);
}

function SectionHead({ title, note }: { title: string; note: string }) {
	return (
		<div className="mt-9 mb-5 pt-7 border-t border-[var(--line-soft)] first:mt-0 first:pt-0 first:border-t-0">
			<h2 className="display text-[1.2rem]">{title}</h2>
			<p className="text-[0.88rem] text-mute mt-1">{note}</p>
		</div>
	);
}

function CourseSummary({ slug }: { slug: string }) {
	const course = getCourseBySlug(slug);
	if (!course) {
		return (
			<div className="card p-7">
				<Eyebrow variant="plain">No course chosen yet</Eyebrow>
				<p className="lead mt-3 text-[0.97rem]">
					Pick a track in the form and its fee, length and outline will appear
					here.
				</p>
				<Link to="/courses" className="view-link mt-4">
					Browse the courses <i aria-hidden="true">→</i>
				</Link>
			</div>
		);
	}
	return (
		<div className="card panel-learn p-7">
			<Eyebrow>You're applying for</Eyebrow>
			<h2 className="display text-[1.4rem] mt-3">{course.t}</h2>
			<p className="lead mt-2 text-[0.95rem]">{course.tagline}</p>
			<div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--line-soft)]">
				<span className="display text-[1.15rem]">{course.price}</span>
				<span className="text-[0.85rem] text-mute font-semibold">
					{course.duration}
				</span>
			</div>
			<p className="text-[0.85rem] text-mute mt-4">
				{course.modules.length} modules · cohort-based · online
			</p>
			<Link
				to="/courses/$slug"
				params={{ slug: course.slug }}
				className="view-link mt-3"
			>
				See the full outline <i aria-hidden="true">→</i>
			</Link>
		</div>
	);
}

function EnrolForm({
	course,
	setCourse,
}: {
	course: string;
	setCourse: (slug: string) => void;
}) {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState<Gender | "">("");
	const [employment, setEmployment] = useState<Employment | "">("");
	const [mode, setMode] = useState<TrainingMode | "">("");
	const [experience, setExperience] = useState<YesNo | "">("");
	const [experienceDetail, setExperienceDetail] = useState("");
	const [laptop, setLaptop] = useState<YesNo | "">("");
	const [heardFrom, setHeardFrom] = useState<Referral | "">("");
	const [commit, setCommit] = useState<YesNo | "">("");
	const [comments, setComments] = useState("");
	const [accurate, setAccurate] = useState(false);

	const [error, setError] = useState("");
	const [handoff, setHandoff] = useState<ComposedEnrolment | null>(null);
	const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

	if (status === "sent") {
		return (
			<div className="card panel-learn p-8 text-center">
				<div
					className="w-14 h-14 rounded-2xl grid place-items-center mx-auto"
					style={{ background: "var(--marigold)", color: "#ffffff" }}
					aria-hidden="true"
				>
					<span className="text-2xl">✓</span>
				</div>
				<h3 className="display text-[1.5rem] mt-4">Application sent.</h3>
				<p className="lead mt-2 max-w-[30rem] mx-auto">
					Thanks, {fullName.split(" ")[0]} — your application for{" "}
					<strong>{getCourseBySlug(course)?.t}</strong> has landed in our inbox.
					We'll reply to <strong>{email}</strong> with the next cohort details.
					Submitting doesn't guarantee a place; we may reach out first for a
					short screening chat.
				</p>
				<div className="mt-6 flex flex-wrap gap-3 justify-center">
					<a
						href={CONTACT.whatsapp}
						target="_blank"
						rel="noreferrer"
						className="btn btn-teal"
					>
						Message on WhatsApp
					</a>
					<Link to="/courses" className="btn btn-ghost">
						Back to courses
					</Link>
				</div>
			</div>
		);
	}

	if (handoff) {
		return (
			<div className="card panel-learn p-8 text-center">
				<div
					className="w-14 h-14 rounded-2xl grid place-items-center mx-auto"
					style={{ background: "var(--marigold)", color: "#ffffff" }}
					aria-hidden="true"
				>
					<span className="text-2xl">✉</span>
				</div>
				<h3 className="display text-[1.5rem] mt-4">
					Couldn't send that automatically.
				</h3>
				<p className="lead mt-2 max-w-[30rem] mx-auto">
					Something went wrong on our side, so nothing was lost — your full
					application is ready to send from your own mail app or WhatsApp
					instead.
				</p>
				<div className="mt-6 flex flex-wrap gap-3 justify-center">
					<a href={handoff.mailto} className="btn btn-primary">
						Open in mail app
					</a>
					<a
						href={handoff.whatsapp}
						target="_blank"
						rel="noreferrer"
						className="btn btn-teal"
					>
						Send on WhatsApp
					</a>
				</div>
				<button
					type="button"
					className="btn btn-ghost mt-4"
					onClick={() => setHandoff(null)}
				>
					Back to the form
				</button>
			</div>
		);
	}

	/* clears the error as soon as the missing answer is given, so the message
	   never sits there contradicting the form */
	function pick<T>(set: (v: T) => void) {
		return (v: T) => {
			setError("");
			set(v);
		};
	}

	/* the pill choices are radios in a fieldset, which the browser won't enforce
	   as a group, so required-ness is checked here */
	function missing(): string | null {
		if (!course) return "Choose the course you're applying for.";
		if (!gender) return "Choose a gender option.";
		if (!employment) return "Choose your employment status.";
		if (!mode) return "Choose a training mode.";
		if (!experience) return "Tell us whether you have prior tech experience.";
		if (!laptop) return "Tell us whether you have a suitable laptop.";
		if (!heardFrom) return "Tell us how you heard about us.";
		if (!commit) return "Tell us whether you can commit to the schedule.";
		return null;
	}

	return (
		<form
			className="card p-7 md:p-8"
			onSubmit={async (e) => {
				e.preventDefault();
				if (status === "sending") return;
				const gap = missing();
				if (gap) {
					setError(gap);
					return;
				}
				setError("");
				setStatus("sending");
				const data = {
					course,
					fullName,
					email,
					phone,
					gender,
					employment,
					mode,
					experience,
					experienceDetail,
					laptop,
					heardFrom,
					commit,
					comments,
					accurate,
				} as Enrolment;
				try {
					await sendEnrolment({ data });
					setStatus("sent");
				} catch {
					/* delivery failed — hand the application to the visitor's own mail
					   client rather than losing everything they just typed */
					setStatus("idle");
					setHandoff(composeEnrolment(data));
				}
			}}
		>
			<SectionHead
				title="Personal information"
				note="How we identify you and reach you about your application."
			/>

			<label className="field" htmlFor="fullName">
				<span>Full name</span>
				<input
					id="fullName"
					name="fullName"
					className="input"
					required
					maxLength={120}
					autoComplete="name"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
			</label>

			<div className="grid sm:grid-cols-2 gap-x-5">
				<label className="field" htmlFor="email">
					<span>Email</span>
					<input
						id="email"
						name="email"
						type="email"
						className="input"
						required
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>

				<label className="field" htmlFor="phone">
					<span>Phone (WhatsApp preferred)</span>
					<input
						id="phone"
						name="phone"
						type="tel"
						className="input"
						required
						maxLength={40}
						autoComplete="tel"
						placeholder="0913 451 3173"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</label>
			</div>

			<ChoiceGroup
				name="gender"
				label="Gender"
				options={GENDERS}
				value={gender}
				onChange={pick(setGender)}
			/>
			<ChoiceGroup
				name="employment"
				label="Employment status"
				options={EMPLOYMENT}
				value={employment}
				onChange={pick(setEmployment)}
			/>

			<SectionHead
				title="Course selection"
				note="The track and format that match your goals and availability."
			/>

			<label className="field" htmlFor="course">
				<span>Course you're applying for</span>
				<select
					id="course"
					name="course"
					className="select"
					required
					value={course}
					onChange={(e) => setCourse(e.target.value)}
				>
					<option value="" disabled>
						Choose a course…
					</option>
					{COURSES.map((c) => (
						<option key={c.slug} value={c.slug}>
							{c.t}
							{c.d ? ` — ${c.d}` : ""} · {c.price} · {c.duration}
						</option>
					))}
				</select>
			</label>

			<ChoiceGroup
				name="mode"
				label="Training mode"
				options={TRAINING_MODES}
				value={mode}
				onChange={pick(setMode)}
			/>

			<SectionHead
				title="Technical background"
				note="Where you're starting from, and whether you have the tools to take part."
			/>

			<ChoiceGroup
				name="experience"
				label="Do you have prior experience in tech?"
				options={YES_NO}
				value={experience}
				onChange={pick(setExperience)}
			/>

			{experience === "Yes" && (
				<label className="field" htmlFor="experienceDetail">
					<span>Briefly describe your experience</span>
					<textarea
						id="experienceDetail"
						name="experienceDetail"
						className="textarea"
						maxLength={2000}
						value={experienceDetail}
						onChange={(e) => setExperienceDetail(e.target.value)}
						placeholder="What have you built or studied so far?"
					/>
				</label>
			)}

			<ChoiceGroup
				name="laptop"
				label="Do you own a laptop suitable for training?"
				options={YES_NO}
				value={laptop}
				onChange={pick(setLaptop)}
			/>

			<SectionHead
				title="Motivation & commitment"
				note="How you found us, and whether the schedule works for you."
			/>

			<ChoiceGroup
				name="heardFrom"
				label="How did you hear about NexaHubTech?"
				options={REFERRALS}
				value={heardFrom}
				onChange={pick(setHeardFrom)}
			/>
			<ChoiceGroup
				name="commit"
				label="Can you commit fully to the training schedule?"
				options={YES_NO}
				value={commit}
				onChange={pick(setCommit)}
			/>

			<SectionHead
				title="Anything else"
				note="Optional — anything you'd like us to know before we review this."
			/>

			<label className="field" htmlFor="comments">
				<span>Additional comments</span>
				<textarea
					id="comments"
					name="comments"
					className="textarea"
					maxLength={2000}
					value={comments}
					onChange={(e) => setComments(e.target.value)}
					placeholder="Optional"
				/>
			</label>

			<SectionHead
				title="Agreement"
				note="One last check before your application goes over."
			/>

			<label className="check" htmlFor="accurate">
				<input
					id="accurate"
					name="accurate"
					type="checkbox"
					required
					checked={accurate}
					onChange={(e) => setAccurate(e.target.checked)}
				/>
				<span>I confirm that all the information I've given is accurate.</span>
			</label>

			{error && (
				<p className="form-error" role="alert">
					{error}
				</p>
			)}

			<button
				type="submit"
				className="btn btn-primary w-full mt-6"
				disabled={status === "sending"}
			>
				{status === "sending" ? "Sending…" : "Submit application"}
			</button>
			<p className="text-[0.82rem] text-mute mt-3 text-center">
				Goes straight to our inbox. Submitting doesn't guarantee a place — we
				may contact you for a short screening chat first.
			</p>
		</form>
	);
}

function Enrol() {
	const { course: fromUrl } = Route.useSearch();
	/* prefilled from the course page the visitor clicked "Enrol" on; an unknown
	   slug falls through to an empty select rather than a wrong course */
	const [course, setCourse] = useState(
		fromUrl && getCourseBySlug(fromUrl) ? fromUrl : "",
	);
	const chosen = getCourseBySlug(course);
	useReveal();

	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[46rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Enrolment
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						{chosen ? (
							<>
								Enrol in{" "}
								<span style={{ color: "var(--learn-ink)" }}>{chosen.t}</span>.
							</>
						) : (
							<>
								Apply for a{" "}
								<span style={{ color: "var(--learn-ink)" }}>place</span>.
							</>
						)}
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[38rem]">
						Tell us a little about you and where you're starting from. It takes
						a couple of minutes, and it helps us place you in the right cohort.
					</p>
				</div>
			</section>

			<section className="wrap py-12">
				<div className="reveal grid lg:grid-cols-[1fr_0.7fr] gap-6 items-start">
					<EnrolForm course={course} setCourse={setCourse} />

					<div className="grid gap-5">
						<CourseSummary slug={course} />
						<div className="card p-7">
							<Eyebrow variant="build">What happens next</Eyebrow>
							<ol className="mt-3 grid gap-3">
								<li className="feat">
									<span className="mk mk-learn">1</span>
									<span>
										Your application lands in our inbox straight away.
									</span>
								</li>
								<li className="feat">
									<span className="mk mk-learn">2</span>
									<span>
										We reply by email — usually within a day — with the next
										cohort dates.
									</span>
								</li>
								<li className="feat">
									<span className="mk mk-learn">3</span>
									<span>
										A short chat if we need it, then you're onboarded.
									</span>
								</li>
							</ol>
						</div>
						<div className="card p-7">
							<Eyebrow variant="plain">Rather just ask a question?</Eyebrow>
							<p className="lead mt-3 text-[0.97rem]">
								If you're not sure which track fits, tell us where you're
								starting from and we'll point you at the right one.
							</p>
							<Link to="/contact" className="view-link mt-4">
								Contact us instead <i aria-hidden="true">→</i>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
