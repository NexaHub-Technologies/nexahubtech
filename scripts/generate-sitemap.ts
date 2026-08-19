/* Generates public/sitemap.xml from the real content modules, so the file cannot
   drift from the routes. Run with: bun run generate-sitemap */
import { writeFileSync } from "node:fs";
import { SITE_URL } from "../src/lib/contact";
import { COURSES } from "../src/lib/courses";
import { SERVICES } from "../src/lib/services";

const staticPaths = ["/", "/courses", "/services", "/about", "/contact"];
const paths = [
	...staticPaths,
	...COURSES.map((c) => `/courses/${c.slug}`),
	...SERVICES.map((s) => `/services/${s.slug}`),
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
	.map(
		(p) =>
			`  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
	)
	.join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml written with ${paths.length} URLs`);
