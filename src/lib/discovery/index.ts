/* Every machine-readable file the site publishes under public/, keyed by its URL
   path. scripts/generate-discovery.ts writes them; discovery.test.ts fails when
   a committed file no longer matches what this would write. */

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
