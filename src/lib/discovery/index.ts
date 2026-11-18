/* Every machine-readable file the site publishes under public/, keyed by its URL
   path. scripts/generate-discovery.ts writes them; discovery.test.ts fails when
   a committed file no longer matches what this would write. */

import { SITE_URL } from "../contact";
import { INDEXABLE_PAGES, markdownPath } from "../pages";
import { robotsTxt, sitemapXml } from "./crawlers";
import { llmsFullTxt, llmsTxt, pageMarkdown } from "./markdown";
import { siteGraph } from "./schema";

export function discoveryFiles(): Record<string, string> {
	return {
		"/robots.txt": robotsTxt(),
		"/sitemap.xml": sitemapXml(),
		"/llms.txt": llmsTxt(),
		"/llms-full.txt": llmsFullTxt(),
		"/schema.json": `${JSON.stringify(siteGraph(), null, 2)}\n`,
		...Object.fromEntries(
			INDEXABLE_PAGES.map((p) => [markdownPath(p.path), pageMarkdown(p)]),
		),
	};
}

/* HTTP headers for those files, applied as Nitro route rules (vite.config.ts).
   A markdown mirror repeats its page word for word, so Google would otherwise
   file it as a duplicate of the page or index it in the page's place. The Link
   header names the HTML page as canonical, which merges the two. The manifests
   aren't pages at all, so they stay out of search results; crawlers can still
   fetch them, because noindex doesn't block crawling. */
export function discoveryHeaders(): Record<
	string,
	{ headers: Record<string, string> }
> {
	const noindex = { headers: { "X-Robots-Tag": "noindex" } };
	return {
		"/llms.txt": noindex,
		"/llms-full.txt": noindex,
		"/schema.json": noindex,
		...Object.fromEntries(
			INDEXABLE_PAGES.map((p) => [
				markdownPath(p.path),
				{ headers: { Link: `<${SITE_URL}${p.path}>; rel="canonical"` } },
			]),
		),
	};
}
