import { describe, expect, it } from "vitest";
import { SITE_URL } from "./contact";
import { pageMeta } from "./seo";

const base = {
	title: "Our Work — NexaHubTech",
	description: "Case studies from the studio.",
	path: "/work",
};

const robots = (m: ReturnType<typeof pageMeta>) =>
	m.meta.find((t) => "name" in t && t.name === "robots");

describe("pageMeta", () => {
	it("leaves pages indexable by default", () => {
		expect(robots(pageMeta(base))).toBeUndefined();
	});

	/* /work is reachable by URL while it is hidden, so the tag is the only thing
	   keeping it out of search results */
	it("marks a page noindex when asked", () => {
		expect(robots(pageMeta({ ...base, noindex: true }))).toEqual({
			name: "robots",
			content: "noindex, nofollow",
		});
	});

	it("still emits an absolute canonical for a hidden page", () => {
		expect(pageMeta({ ...base, noindex: true }).links).toEqual([
			{ rel: "canonical", href: `${SITE_URL}/work` },
		]);
	});
});
