import postgres from "postgres";
import { type Enrolment, toApplicationRow } from "./enrolment";

/* Saves an application into the staff console (nexahub-dash), where it is
   reviewed under Applications. DASH_DATABASE_URL is the console's
   website_app role, which may only add applications and cannot read them
   back. Never throws: the application is also emailed, so a console outage
   costs nothing but this copy. */

let sql: ReturnType<typeof postgres> | undefined;

export async function saveApplication(e: Enrolment): Promise<boolean> {
	const url = process.env.DASH_DATABASE_URL;
	if (!url) {
		console.error(
			"DASH_DATABASE_URL is not set; the application was only emailed",
		);
		return false;
	}
	try {
		// prepare: false because the console's pooled endpoint runs PgBouncer
		// in transaction mode, where named prepared statements don't survive
		sql ??= postgres(url, { max: 1, prepare: false, connect_timeout: 10 });
		const row = toApplicationRow(e);
		await sql`insert into public.applications ${sql(row)}`;
		return true;
	} catch (err) {
		console.error("Could not save the application to the console:", err);
		return false;
	}
}
