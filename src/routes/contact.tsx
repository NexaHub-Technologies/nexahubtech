import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT, Eyebrow, SOCIALS, useReveal } from "../components/site";
import {
	type ComposedEnquiry,
	composeEnquiry,
	type Intent,
} from "../lib/enquiry";
import { sendEnquiry } from "../lib/send-enquiry";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/contact")({
	component: Contact,
	head: () =>
		pageMeta({
			title: "Contact — NexaHubTech",
			description:
				"Get in touch with NexaHubTech — join a cohort to learn web development, or start a project with the studio.",
			path: "/contact",
			image: "/og/contact.jpg",
		}),
});

function ContactForm() {
	const [intent, setIntent] = useState<Intent>("learn");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [handoff, setHandoff] = useState<ComposedEnquiry | null>(null);
	const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
		"idle",
	);

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
				<h3 className="display text-[1.5rem] mt-4">Message sent.</h3>
				<p className="lead mt-2 max-w-[28rem] mx-auto">
					Thanks — it's landed in our inbox and we'll reply to{" "}
					<strong>{email}</strong>. If it's urgent, WhatsApp is faster.
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
					<button
						type="button"
						className="btn btn-ghost"
						onClick={() => {
							setStatus("idle");
							setName("");
							setEmail("");
							setMessage("");
						}}
					>
						Send another
					</button>
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
				<p className="lead mt-2 max-w-[28rem] mx-auto">
					Something went wrong on our side, so nothing was lost — your message
					is ready to go from your own mail app or WhatsApp instead.
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

	return (
		<form
			className="card p-7 md:p-8"
			onSubmit={async (e) => {
				e.preventDefault();
				if (status === "sending") return;
				setStatus("sending");
				try {
					await sendEnquiry({ data: { intent, name, email, message } });
					setStatus("sent");
				} catch {
					/* delivery failed — fall back to the visitor's own mail client
					   rather than losing the enquiry */
					setStatus("failed");
					setHandoff(composeEnquiry({ intent, name, email, message }));
				}
			}}
		>
			<fieldset
				className="field"
				style={{ border: 0, padding: 0, margin: "0 0 1.1rem" }}
			>
				<legend
					style={{
						fontWeight: 600,
						fontSize: "0.9rem",
						marginBottom: "0.4rem",
					}}
				>
					I want to…
				</legend>
				<div className="choice-row">
					<button
						type="button"
						className="choice"
						data-on={intent === "learn"}
						onClick={() => setIntent("learn")}
					>
						Learn with you
					</button>
					<button
						type="button"
						className="choice"
						data-on={intent === "build"}
						onClick={() => setIntent("build")}
					>
						Build a product
					</button>
				</div>
			</fieldset>

			<label className="field" htmlFor="name">
				<span>Your name</span>
				<input
					id="name"
					name="name"
					className="input"
					required
					autoComplete="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>

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

			<label className="field" htmlFor="message">
				<span>
					{intent === "learn"
						? "Tell us about your goals"
						: "Tell us about your project"}
				</span>
				<textarea
					id="message"
					name="message"
					className="textarea"
					required
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder={
						intent === "learn"
							? "Where are you starting from, and what do you want to build?"
							: "What are you building, and what would success look like?"
					}
				/>
			</label>

			<button
				type="submit"
				className="btn btn-primary w-full"
				disabled={status === "sending"}
			>
				{status === "sending" ? "Sending…" : "Send message"}
			</button>
			<p className="text-[0.82rem] text-mute mt-3 text-center">
				Goes straight to our inbox. We usually reply within a day.
			</p>
		</form>
	);
}

function Contact() {
	useReveal();
	return (
		<>
			<section className="wrap page-head">
				<div className="max-w-[44rem]">
					<span className="pill rise rise-1">
						<span className="spark" />
						Two ways in
					</span>
					<h1 className="display rise rise-2 mt-6 text-[2.6rem] sm:text-[3.4rem]">
						Let’s talk.
					</h1>
					<p className="lead rise rise-3 mt-6 text-[1.1rem] max-w-[36rem]">
						Whether you want to learn to build or need something built, you’re
						in the right place. Tell us a little about what you’re after.
					</p>
				</div>
			</section>

			<section className="wrap py-12">
				<div className="reveal grid lg:grid-cols-[1fr_0.85fr] gap-6 items-start">
					<ContactForm />

					<div className="grid gap-5">
						<div className="card panel-learn p-7">
							<Eyebrow>For learners</Eyebrow>
							<p className="lead mt-3">
								Ask about any of the ten courses, the next cohort, or whether a
								track is right for where you’re starting from.
							</p>
						</div>
						<div className="card panel-studio p-7">
							<Eyebrow variant="build">For businesses</Eyebrow>
							<p className="lead mt-3">
								Tell us about the product you need. We’ll help you scope it,
								design it well, and build it right.
							</p>
						</div>
						<div className="card p-7">
							<Eyebrow variant="plain">Reach us directly</Eyebrow>
							<div className="mt-3">
								<a className="contact-detail" href={`mailto:${CONTACT.email}`}>
									<span className="ic" aria-hidden="true">
										✉
									</span>
									<span>{CONTACT.email}</span>
								</a>
								<a
									className="contact-detail"
									href={CONTACT.whatsapp}
									target="_blank"
									rel="noreferrer"
								>
									<span className="ic" aria-hidden="true">
										◎
									</span>
									<span>
										{CONTACT.phoneDisplay}{" "}
										<span className="text-mute">· WhatsApp</span>
									</span>
								</a>
								<a
									className="contact-detail"
									href={CONTACT.websiteHref}
									target="_blank"
									rel="noreferrer"
								>
									<span className="ic" aria-hidden="true">
										⬡
									</span>
									<span>{CONTACT.website}</span>
								</a>
								<div className="contact-detail">
									<span className="ic" aria-hidden="true">
										⌂
									</span>
									<span>{CONTACT.address}</span>
								</div>
								<div
									className="contact-detail"
									style={{ borderBottom: "none" }}
								>
									<span className="ic" aria-hidden="true">
										☆
									</span>
									<span>
										{SOCIALS.map((s, i) => (
											<span key={s.label}>
												{i > 0 && <span className="text-mute"> · </span>}
												<a
													href={s.href}
													target="_blank"
													rel="noreferrer"
													className="hover:underline"
												>
													{s.label}
												</a>
											</span>
										))}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
