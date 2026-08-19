import { describe, expect, it } from "vitest";
import { CONTACT } from "./contact";
import { composeEnquiry } from "./enquiry";

const base = {
	name: "Chidi Okeke",
	email: "chidi@example.com",
	message: "I'm starting from scratch & want to build web apps.",
} as const;

describe("composeEnquiry", () => {
	it("labels the subject by intent", () => {
		expect(composeEnquiry({ ...base, intent: "learn" }).subject).toBe(
			"Course enquiry — Chidi Okeke",
		);
		expect(composeEnquiry({ ...base, intent: "build" }).subject).toBe(
			"Project enquiry — Chidi Okeke",
		);
	});

	it("carries name, email and message into the body", () => {
		const { body } = composeEnquiry({ ...base, intent: "learn" });
		expect(body).toContain("Name: Chidi Okeke");
		expect(body).toContain("Email: chidi@example.com");
		expect(body).toContain(base.message);
	});

	it("addresses the mailto to the real inbox", () => {
		const { mailto } = composeEnquiry({ ...base, intent: "learn" });
		expect(mailto.startsWith(`mailto:${CONTACT.email}?`)).toBe(true);
	});

	it("escapes characters that would otherwise break the URL", () => {
		const { mailto, whatsapp } = composeEnquiry({
			...base,
			intent: "build",
			message: "Budget? ~₦500,000 & a 6 week deadline #urgent",
		});
		// a raw & or # would truncate the body at the query/fragment boundary
		for (const url of [mailto, whatsapp]) {
			expect(url).not.toContain("& a 6 week");
			expect(url).not.toContain("#urgent");
			expect(decodeURIComponent(url)).toContain(
				"Budget? ~₦500,000 & a 6 week deadline #urgent",
			);
		}
	});

	it("round-trips the whole body through decoding", () => {
		const composed = composeEnquiry({ ...base, intent: "learn" });
		const body = new URL(composed.mailto).searchParams.get("body");
		expect(body).toBe(composed.body);
	});
});
