/* NexaHubTech is one website. The company is a software company with two arms:
   its software studio, which carries the company's own name, and NexaHubTech
   Academy, which lives in its own section of the site. There is no switch
   between them — the Academy is a part of the site you navigate into, like any
   other.

   This module says which routes make up the Academy's section. They get the
   Academy's sub-navigation, and the Academy's name in their titles and share
   cards. */

export const COMPANY_NAME = "NexaHubTech";
export const ACADEMY_NAME = "NexaHubTech Academy";

/* the section's front page */
export const ACADEMY_HOME = "/academy";

/* A route owns itself and everything beneath it, never a sibling that merely
   starts with the same letters. The old /teaching, /centre, /timetable and
   /cbt-training addresses redirect elsewhere and are not listed. */
export const ACADEMY_ROUTES: readonly string[] = [
	"/academy",
	"/courses",
	"/fees",
	"/cbt",
	"/enrol",
	"/for-business",
];

const owns = (root: string, pathname: string) =>
	pathname === root || pathname.startsWith(`${root}/`);

export function inAcademy(pathname: string): boolean {
	return ACADEMY_ROUTES.some((root) => owns(root, pathname));
}

/* the name a page is published under */
export function brandFor(pathname: string): string {
	return inAcademy(pathname) ? ACADEMY_NAME : COMPANY_NAME;
}
