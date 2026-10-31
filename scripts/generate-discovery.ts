/* Writes every discovery file — robots.txt, sitemap.xml, llms.txt, llms-full.txt,
   schema.json and the per-page markdown mirrors — into public/ from the real
   content modules. Run with: bun run generate-discovery

   src/lib/discovery/discovery.test.ts fails when a committed file is out of
   date, so a content change that forgets this step does not get through CI. */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { discoveryFiles } from "../src/lib/discovery";

const files = discoveryFiles();
for (const [path, content] of Object.entries(files)) {
	const out = `public${path}`;
	mkdirSync(dirname(out), { recursive: true });
	writeFileSync(out, content);
}
console.log(`${Object.keys(files).length} discovery files written to public/`);
