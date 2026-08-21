import { CONTACT } from "./contact";

export type Intent = "learn" | "build";

export function isIntent(v: unknown): v is Intent {
	return v === "learn" || v === "build";
}

export interface Enquiry {
	intent: Intent;
	name: string;
	email: string;
	message: string;
}

export interface ComposedEnquiry {
	subject: string;
	body: string;
	mailto: string;
	whatsapp: string;
}

/* the contact form has no backend by design — it composes the enquiry and
   hands it to the visitor's own mail client or WhatsApp, so nothing depends
   on a service we don't run */
export function composeEnquiry({
	intent,
	name,
	email,
	message,
}: Enquiry): ComposedEnquiry {
	const subject =
		intent === "learn"
			? `Course enquiry — ${name}`
			: `Project enquiry — ${name}`;

	const body = [
		intent === "learn"
			? "I'd like to learn with NexaHubTech."
			: "I'd like NexaHubTech to build something.",
		"",
		`Name: ${name}`,
		`Email: ${email}`,
		"",
		message,
	].join("\n");

	return {
		subject,
		body,
		mailto: `mailto:${CONTACT.email}?subject=${encodeURIComponent(
			subject,
		)}&body=${encodeURIComponent(body)}`,
		whatsapp: `${CONTACT.whatsapp}?text=${encodeURIComponent(
			`${subject}\n\n${body}`,
		)}`,
	};
}
