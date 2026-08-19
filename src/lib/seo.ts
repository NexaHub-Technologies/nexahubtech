import { SITE_URL } from "./contact";

/* Without per-route og:* tags every shared link renders with the homepage's title
   and description. This also emits a canonical, since the same page is reachable
   in either site mode. */
export function pageMeta({
	title,
	description,
	path,
}: {
	title: string;
	description: string;
	path: string;
}) {
	const url = `${SITE_URL}${path}`;
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
		],
		links: [{ rel: "canonical", href: url }],
	};
}
