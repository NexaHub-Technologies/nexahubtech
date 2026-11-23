/* the one place our real company details live — imported by the site chrome,
   the contact page, and the enquiry composer. Sourced from the company
   profile (NexaHubTech, RC 9545130). */

/* the address in parts, for the schema knowledge graph; CONTACT.address is the
   same thing as one line, built from these so the two cannot disagree */
export const ADDRESS = {
	street: "Phase 2, F01 Building Materials Market",
	locality: "Kubwa",
	region: "FCT-Abuja",
	country: "NG",
} as const;

/* Absolute origin — Open Graph and canonical links must not be relative. It must
   be the host that actually serves the site: the bare domain. www redirects to
   it, and a canonical URL that redirects tells search engines and AI crawlers two
   different things about where the page lives. */
export const SITE_URL = "https://nexahubtech.company";

export const CONTACT = {
	email: "nexahubt@gmail.com",
	phoneDisplay: "+234 913 451 3173",
	/* E.164 — the form tel: links and structured data expect */
	phone: "+2349134513173",
	whatsapp: "https://wa.me/2349134513173",
	website: "nexahubtech.company",
	websiteHref: SITE_URL,
	address: `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region}`,
	rc: "9545130",
} as const;

/* Each business has its own motto, in the same three-beat shape. The company's
   is the work it does for a client, in order; the Academy's is the path a
   learner takes — ending where the company's middle begins. */
export const TAGLINE = {
	build: "Design. Ship. Support.",
	learn: "Learn. Build. Ship.",
} as const;

/* the company's line — what the domain, the emails and the schema carry */
export const MOTTO = TAGLINE.build;

/* Shown on the front page as "Available for new projects". Set to false when
   the studio is fully booked, and the badge says so instead. */
export const AVAILABLE_FOR_PROJECTS = true;

/* where "Book a call" goes: WhatsApp, with the message started for them */
export const BOOK_A_CALL = `${CONTACT.whatsapp}?text=${encodeURIComponent(
	"Hello NexaHubTech! I'd like to book a call about a project.",
)}`;
