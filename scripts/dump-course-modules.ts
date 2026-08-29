/* Dumps the course metadata the project-spec generator needs, so the generated
   specs take their module titles and levels from COURSES rather than restating
   them. Run with: bun run scripts/dump-course-modules.ts > .cache/modules.json */
import { COURSES } from "../src/lib/courses";

const out: Record<string, unknown> = {};
for (const c of COURSES) {
	out[c.slug] = {
		t: c.t,
		price: c.price,
		duration: c.duration,
		level: c.requirements.level,
		modules: c.modules.map((m) => ({ n: m.n, t: m.t, d: m.d })),
	};
}
console.log(JSON.stringify(out));
