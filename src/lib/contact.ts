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

export const CONTACT = {
	email: "nexahubt@gmail.com",
	phoneDisplay: "+234 913 451 3173",
	/* E.164 — the form tel: links and structured data expect */
	phone: "+2349134513173",
	whatsapp: "https://wa.me/2349134513173",
	website: "www.nexahubtech.company",
	websiteHref: "https://www.nexahubtech.company",
	address: `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region}`,
	rc: "9545130",
} as const;

/* absolute origin — Open Graph and canonical links must not be relative */
export const SITE_URL = "https://www.nexahubtech.company";

/* the registered company motto, exactly as it appears in the profile */
export const MOTTO = "Learn to build. Build for real.";
