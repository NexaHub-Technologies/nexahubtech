import postgres from "postgres";
import { expect, test } from "./fixtures";

/* An application sent from the enrol form lands in the staff console
   (nexahub-dash) as a new application. The site saves it as the console's
   website_app role, which can't read it back, so the check reads as the
   owner. Both default to the console's local Docker database
   (`docker compose up -d` in nexahub-dash); the test is skipped when it isn't
   running. No email is sent: playwright.config.ts starts the site without
   RESEND_API_KEY. */
const OWNER_URL =
	process.env.DASH_DATABASE_OWNER_URL ??
	"postgres://postgres:postgres@127.0.0.1:54322/nexahub";
const sql = postgres(OWNER_URL, { max: 1, connect_timeout: 5 });
const emails: string[] = [];

test.beforeAll(async () => {
	const up = await sql`select 1`.then(
		() => true,
		() => false,
	);
	test.skip(
		!up && !process.env.CI,
		"the console's database isn't running (docker compose up -d in nexahub-dash)",
	);
});

test.afterAll(async () => {
	if (emails.length)
		await sql`delete from public.applications where email = any(${emails})`.catch(
			() => {},
		);
	await sql.end();
});

test("an application reaches the staff console", async ({
	page,
}, testInfo) => {
	// per project and run, so desktop and mobile don't find each other's row
	const email = `enrol.${testInfo.project.name}.${Date.now()}@tests.invalid`;
	emails.push(email);

	await page.goto("/enrol?course=mobile-development");
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		"Mobile Development",
	);

	const field = (name: string) =>
		page.getByRole("textbox", { name, exact: true });
	await field("Full name").fill("Ada E2E Applicant");
	// upper case, to check the console gets it lowered
	await field("Email").fill(email.toUpperCase());
	await field("Phone (WhatsApp preferred)").fill("0913 451 3173");

	/* the radios are hidden inside pill labels, which is what a visitor
	   clicks; the 1px input itself can sit under a neighbouring pill */
	const choose = async (group: string, option: string) => {
		const set = page.getByRole("group", { name: group });
		await set.getByText(option, { exact: true }).click();
		await expect(
			set.getByRole("radio", { name: option, exact: true }),
		).toBeChecked();
	};
	await choose("Gender", "Female");
	await choose("Employment status", "Student");
	await choose("Training mode", "Hybrid — online and in-home");
	await choose("Do you have prior experience in tech?", "Yes");
	await field("Briefly describe your experience").fill(
		"Built a small Flutter app.",
	);
	await choose("Do you own a laptop suitable for training?", "Yes");
	await choose("How did you hear about NexaHubTech?", "Friend or referral");
	await choose("Can you give the hours a week this course asks for?", "No");
	await field("Additional comments").fill("Sent by the e2e suite.");
	await page.getByLabel(/all the information I've given is accurate/).check();
	await page.getByLabel(/class reminders and payment updates/).check();

	await page.getByRole("button", { name: "Submit application" }).click();
	await expect(
		page.getByRole("heading", { name: "Application sent." }),
	).toBeVisible({ timeout: 20_000 });

	const [row] = await sql`
		select a.course_slug, c.title as course, a.full_name, a.email, a.phone,
		       a.gender, a.employment, a.mode, a.has_experience,
		       a.experience_detail, a.has_laptop, a.heard_from, a.can_commit,
		       a.comments, a.notify_consent, a.status::text
		from public.applications a join public.courses c on c.slug = a.course_slug
		where a.email = ${email}`;
	expect(row).toEqual({
		course_slug: "mobile-development",
		course: expect.any(String),
		full_name: "Ada E2E Applicant",
		email,
		phone: "0913 451 3173",
		gender: "Female",
		employment: "Student",
		mode: "Hybrid — online and in-home",
		has_experience: true,
		experience_detail: "Built a small Flutter app.",
		has_laptop: true,
		heard_from: "Friend or referral",
		can_commit: false,
		comments: "Sent by the e2e suite.",
		notify_consent: true,
		status: "new",
	});
});
