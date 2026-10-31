import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CONTACT, SITE_URL } from "../contact";
import { COURSES } from "../courses";
import { INDEXABLE_PAGES, markdownPath, PAGES } from "../pages";
import { pageMeta } from "../seo";
import { AI_CRAWLERS, robotsTxt } from "./crawlers";
import { discoveryFiles } from "./index";
import { llmsTxt } from "./markdown";
import { type Graph, isoWeeks, naira, pageGraph, siteGraph } from "./schema";

const files = discoveryFiles();

/* every { "@id": ... } reference in a graph, as opposed to a node declaring one */
function references(value: unknown, out: string[] = []): string[] {
	if (Array.isArray(value)) for (const v of value) references(v, out);
	else if (value && typeof value === "object") {
		const keys = Object.keys(value);
		if (keys.length === 1 && keys[0] === "@id")
			out.push((value as { "@id": string })["@id"]);
		else for (const v of Object.values(value)) references(v, out);
	}
	return out;
}

const declared = (g: Graph) => g["@graph"].map((n) => n["@id"]).filter(Boolean);

describe("published discovery files", () => {
	/* the files are generated, then committed, so they can be served statically.
	   This is what stops a content edit from leaving them saying the old thing. */
	it.each(Object.keys(files))("public%s is up to date", (path) => {
		const committed = `public${path}`;
		expect(
			existsSync(committed),
			`${committed} is missing — run bun run generate-discovery`,
		).toBe(true);
		expect(
			readFileSync(committed, "utf8"),
			`${committed} is stale — run bun run generate-discovery`,
		).toBe(files[path]);
	});

	it("leaves no markdown mirror behind for a page that no longer exists", () => {
		const walk = (dir: string): string[] =>
			readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
				e.isDirectory()
					? walk(join(dir, e.name))
					: e.name.endsWith(".md")
						? [join(dir, e.name).slice("public".length)]
						: [],
			);
		expect(walk("public").sort()).toEqual(
			INDEXABLE_PAGES.map((p) => markdownPath(p.path)).sort(),
		);
	});

	/* Vercel serves any public/index.* as the directory index, so a file named
	   that way shadows the homepage route — which is how / once served markdown */
	it("publishes nothing that would replace the homepage", () => {
		for (const path of Object.keys(files))
			expect(path, path).not.toMatch(/^\/index\./);
		expect(readdirSync("public").filter((f) => f.startsWith("index."))).toEqual(
			[],
		);
	});

	it("lists every indexable page in the sitemap, and nothing hidden", () => {
		const locs = [...files["/sitemap.xml"].matchAll(/<loc>(.*?)<\/loc>/g)].map(
			(m) => m[1],
		);
		expect(locs).toEqual(INDEXABLE_PAGES.map((p) => `${SITE_URL}${p.path}`));
		expect(locs).not.toContain(`${SITE_URL}${PAGES.work.path}`);
	});

	it("links llms.txt only to files that are actually published", () => {
		const links = [...llmsTxt().matchAll(/\]\((.*?)\)/g)].map((m) =>
			m[1].slice(SITE_URL.length),
		);
		expect(links.length).toBeGreaterThan(INDEXABLE_PAGES.length);
		for (const link of links) expect(Object.keys(files)).toContain(link);
	});

	it("has a share image on disk for every page it describes", () => {
		for (const p of INDEXABLE_PAGES)
			expect(existsSync(`public${p.image}`), p.image).toBe(true);
	});
});

describe("schema knowledge graph", () => {
	const site = siteGraph();

	it("declares each @id once", () => {
		const ids = declared(site);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("resolves every reference across the whole site", () => {
		const ids = new Set(declared(site));
		for (const r of references(site)) expect(ids, r).toContain(r);
	});

	/* A page's JSON-LD is read on its own, so the page node must find what it
	   points at — its site, publisher, breadcrumb and main subject — in the same
	   block. Deeper links (a catalog to its courses) may lead off the page: they
	   are absolute URLs, and resolve in /schema.json. */
	it.each(
		INDEXABLE_PAGES.map((p) => [p.path, p] as const),
	)("%s carries what its page node points at", (path, page) => {
		const g = pageGraph(page);
		const ids = new Set(declared(g));
		const node = g["@graph"].find(
			(n) => n["@id"] === `${SITE_URL}${path}#webpage`,
		);
		expect(node).toBeDefined();
		for (const r of references(node)) expect(ids, r).toContain(r);
	});

	it("describes each entity the same way on its page as in /schema.json", () => {
		const byId = new Map(site["@graph"].map((n) => [n["@id"], n]));
		for (const page of INDEXABLE_PAGES)
			for (const n of pageGraph(page)["@graph"])
				expect(n, String(n["@id"])).toEqual(byId.get(n["@id"]));
	});

	it("prices and times every course in machine-readable form", () => {
		for (const c of COURSES) {
			expect(Number(naira(c.price)), c.slug).toBeGreaterThan(0);
			expect(isoWeeks(c.duration), c.slug).toMatch(/^P\d+W$/);
		}
	});

	it("publishes contact details that match what visitors see", () => {
		const digits = (s: string) => s.replace(/\D/g, "");
		expect(digits(CONTACT.phone)).toBe(digits(CONTACT.phoneDisplay));
		expect(CONTACT.whatsapp).toContain(digits(CONTACT.phone));
		expect(CONTACT.phone).toMatch(/^\+\d{10,15}$/);
	});
});

describe("pageMeta", () => {
	const ldJson = (m: ReturnType<typeof pageMeta>) =>
		m.meta.filter((t) => "script:ld+json" in t);
	const alternate = (m: ReturnType<typeof pageMeta>) =>
		m.links.find((l) => l.rel === "alternate");

	it("puts the page's slice of the graph and its markdown mirror in the head", () => {
		const m = pageMeta(PAGES.courses);
		expect(ldJson(m)).toHaveLength(1);
		expect(alternate(m)).toEqual({
			rel: "alternate",
			type: "text/markdown",
			href: `${SITE_URL}/courses.md`,
		});
	});

	it("describes each page's own share card in its alt text", () => {
		const alt = (m: ReturnType<typeof pageMeta>) =>
			m.meta.find((t) => "property" in t && t.property === "og:image:alt");
		expect(alt(pageMeta(PAGES.cbt))?.content).toContain(
			PAGES.cbt.card.headline,
		);
		expect(alt(pageMeta(PAGES.home))?.content).not.toBe(
			alt(pageMeta(PAGES.cbt))?.content,
		);
	});

	it("keeps a hidden page out of the graph and the mirrors", () => {
		const m = pageMeta(PAGES.work);
		expect(ldJson(m)).toHaveLength(0);
		expect(alternate(m)).toBeUndefined();
	});
});

describe("robots.txt", () => {
	const robots = robotsTxt();
	const groups = robots
		.split(/\n\n+/)
		.filter((block) => /^User-agent:/m.test(block));

	it("names every AI crawler explicitly", () => {
		for (const c of AI_CRAWLERS)
			expect(robots).toContain(`User-agent: ${c.agent}\n`);
	});

	/* a crawler that matches a named group ignores the * group, so a rule left
	   only in * would silently not apply to it */
	it("repeats the server-function block in every group", () => {
		expect(groups.length).toBeGreaterThan(1);
		for (const g of groups) expect(g).toContain("Disallow: /_serverFn/");
	});

	it("points at the sitemap", () => {
		expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
	});
});
