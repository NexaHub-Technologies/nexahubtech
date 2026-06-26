import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, useReveal } from "../components/site";

export const Route = createFileRoute("/contact")({
	component: Contact,
	head: () => ({
		meta: [
			{ title: "Contact — NexaHubTech" },
			{
				name: "description",
				content:
					"Get in touch with NexaHubTech — join a cohort to learn web development, or start a project with the studio.",
			},
		],
	}),
});

function ContactForm() {
	const [intent, setIntent] = useState<"learn" | "build">("learn");
	const [sent, setSent] = useState(false);

	if (sent) {
		return (
			<div className="card panel-learn p-8 text-center">
				<div
					className="w-14 h-14 rounded-2xl grid place-items-center mx-auto"
					style={{ background: "var(--marigold)", color: "#2a1c06" }}
					aria-hidden="true"
				>
					<span className="text-2xl">✓</span>
				</div>
				<h3 className="display text-[1.5rem] mt-4">Thanks — message ready.</h3>
				<p className="lead mt-2 max-w-[26rem] mx-auto">
					We’d love to hear from you. Once the form is connected, we’ll get back
					to you soon.
				</p>
				<button
					type="button"
					className="btn btn-ghost mt-5"
					onClick={() => setSent(false)}
				>
					Send another
				</button>
				<p className="devnote mt-5">
					Demo only — connect this form to email or Supabase before launch.
				</p>
			</div>
		);
	}

	return (
		<form
			className="card p-7 md:p-8"
			onSubmit={(e) => {
				e.preventDefault();
				setSent(true);
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
					placeholder="Ada Obi"
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
					placeholder="you@example.com"
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
					placeholder={
						intent === "learn"
							? "Where are you starting from, and what do you want to build?"
							: "What are you building, and what would success look like?"
					}
				/>
			</label>

			<button type="submit" className="btn btn-primary w-full">
				Send message
			</button>
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
								Ask about the Frontend Track, the next cohort, or whether it’s
								right for where you’re starting from.
							</p>
						</div>
						<div className="card panel-build p-7">
							<Eyebrow variant="build">For businesses</Eyebrow>
							<p className="lead mt-3">
								Tell us about the product you need. We’ll help you scope it,
								design it well, and build it right.
							</p>
						</div>
						<div className="card p-7">
							<Eyebrow variant="plain">Reach us directly</Eyebrow>
							<div className="mt-3">
								<div className="contact-detail">
									<span className="ic" aria-hidden="true">
										✉
									</span>
									<span className="devnote">
										Add contact email before launch
									</span>
								</div>
								<div className="contact-detail">
									<span className="ic" aria-hidden="true">
										◎
									</span>
									<span className="devnote">
										Add WhatsApp number before launch
									</span>
								</div>
								<div
									className="contact-detail"
									style={{ borderBottom: "none" }}
								>
									<span className="ic" aria-hidden="true">
										☆
									</span>
									<span className="devnote">
										Add X · LinkedIn · Instagram before launch
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
