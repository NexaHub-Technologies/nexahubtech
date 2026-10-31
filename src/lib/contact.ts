/* the one place our real company details live — imported by the site chrome,
   the contact page, and the enquiry composer. Sourced from the company
   profile (NexaHubTech, RC 9545130). */

/* the address in parts, for the schema knowledge graph; CONTACT.address is the
   same thing as one line, built from these so the two cannot disagree */
export const ADDRESS = {
	street: "F01 Market",
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


/* the registered company motto, exactly as it appears in the profile */
export const MOTTO = "Learn to build. Build for real.";
