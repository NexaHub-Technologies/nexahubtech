/* Brings the staff dashboard's copy of the curriculum up to date with
   src/lib/courses.ts: course titles and fees, and module titles. Run it after
   changing a course. It is safe to run any number of times.

     bun scripts/sync-courses.ts --print     write the SQL to stdout, to paste
                                             into the Neon Console's SQL Editor
     bun scripts/sync-courses.ts             apply it to DASH_DATABASE_OWNER_URL
                                             (the dashboard's owner connection)

   Uses Bun's built-in Postgres client, so the website takes on no database
   dependency. See src/lib/course-sync.ts for what the SQL does. */
import { SQL } from "bun";
import { syncSql, toRows } from "../src/lib/course-sync";
import { COURSES } from "../src/lib/courses";

const rows = toRows(COURSES);
const script = syncSql(rows);

if (process.argv.includes("--print")) {
	process.stdout.write(script);
	process.exit(0);
}

const url = process.env.DASH_DATABASE_OWNER_URL;
if (!url) {
	console.error(
		"DASH_DATABASE_OWNER_URL is not set. Set it, or use --print and paste the SQL into the Neon Console.",
	);
	process.exit(1);
}

// one connection: the script runs its own begin ... commit
const sql = new SQL(url, { max: 1 });
try {
	await sql.unsafe(script).simple();
	const onlyThere = await sql<{ slug: string }>`
		select slug from public.courses
		where slug <> all(${sql.array(
			rows.map((r) => r.slug),
			"text",
		)})
		order by slug`;
	const moduleCount = rows.reduce((n, r) => n + r.modules.length, 0);
	console.log(`synced ${rows.length} courses and ${moduleCount} modules`);
	if (onlyThere.length) {
		console.log(
			`kept, though no longer on the website: ${onlyThere.map((r) => r.slug).join(", ")}`,
		);
	}
} catch (e) {
	// closing the connection below rolls back whatever the script had begun
	console.error((e as Error).message);
	process.exitCode = 1;
} finally {
	await sql.close();
}
