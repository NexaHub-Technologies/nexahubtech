import { createServerFn } from "@tanstack/react-start";
import { CONTACT } from "./contact";
import { composeEnquiry, type Enquiry, isIntent } from "./enquiry";

/* Runs on the server only, so RESEND_API_KEY is never bundled for the client.
   Do not rename it to VITE_* — that prefix would inline the secret into the
   browser bundle. */

const FROM = "NexaHubTech <enquiries@nexahubtech.company>";

function validate(data: unknown): Enquiry {
	if (typeof data !== "object" || data === null) throw new Error("Bad request");
	const d = data as Record<string, unknown>;
	const str = (v: unknown, field: string, max: number) => {
		if (typeof v !== "string" || !v.trim()) throw new Error(`Missing ${field}`);
		if (v.length > max) throw new Error(`${field} is too long`);
		return v.trim();
	};
	if (!isIntent(d.intent)) throw new Error("Bad intent");
	const email = str(d.email, "email", 320);
	if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email))
		throw new Error("That email address doesn't look right");
	return {
		intent: d.intent,
		name: str(d.name, "name", 120),
		email,
		message: str(d.message, "message", 5000),
	};
}

export const sendEnquiry = createServerFn({ method: "POST" })
	.validator(validate)
	.handler(async ({ data }) => {
		const key = process.env.RESEND_API_KEY;
		if (!key) throw new Error("Email is not configured");

		const { subject, body } = composeEnquiry(data);

		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${key}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: FROM,
				to: [process.env.ENQUIRY_TO ?? CONTACT.email],
				/* so a reply from the inbox goes straight back to the enquirer */
				reply_to: data.email,
				subject,
				text: body,
			}),
		});

		if (!res.ok) {
			const detail = await res.text();
			console.error("Resend rejected the enquiry:", res.status, detail);
			throw new Error("Could not send right now");
		}

		return { ok: true as const };
	});
