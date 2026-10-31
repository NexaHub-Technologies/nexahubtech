/* the one place our real company details live — imported by the site chrome,
   the contact page, and the enquiry composer. Sourced from the company
   profile (NexaHubTech, RC 9545130). */
export const CONTACT = {
	email: "nexahubt@gmail.com",
	phoneDisplay: "+234 913 451 3173",
	whatsapp: "https://wa.me/2349134513173",
	website: "www.nexahubtech.company",
	websiteHref: "https://www.nexahubtech.company",
	address: "F01 Market, Kubwa, FCT-Abuja",
	rc: "9545130",
} as const;

/* absolute origin — Open Graph and canonical links must not be relative */
export const SITE_URL = "https://www.nexahubtech.company";

/* the registered company motto, exactly as it appears in the profile */
export const MOTTO = "Learn to build. Build for real.";
