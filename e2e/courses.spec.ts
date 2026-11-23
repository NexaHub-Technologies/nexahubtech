import { expect, test } from "./fixtures";
import { COURSES, formatNaira } from "../src/lib/courses";

/* every course page renders from one template, so check them all */
for (const course of COURSES) {
	test(`${course.slug}: modules render as a timeline`, async ({ page }) => {
		await page.goto(`/courses/${course.slug}`);
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			course.t,
		);

		const items = page.locator(".timeline .timeline-item");
		await expect(items).toHaveCount(course.modules.length);
		for (const [i, m] of course.modules.entries()) {
			await expect(items.nth(i)).toContainText(m.t);
		}

		await expect(page.getByText("What you build")).toHaveCount(0);
	});
}

test("a course page lists the parts of a session, in order", async ({
	page,
}) => {
	const course = COURSES[0];
	await page.goto(`/courses/${course.slug}`);
	const parts = page
		.getByRole("list", { name: "The parts of a session" })
		.getByRole("listitem");
	await expect(parts).toHaveCount(course.session.length);
	for (const [i, part] of course.session.entries()) {
		await expect(parts.nth(i)).toContainText(part.t);
	}
});

test("a course page shows one price at a time, and the switch changes it", async ({
	page,
}) => {
	const course = COURSES.find((c) => c.fees.online && c.fees.inhouse);
	if (!course?.fees.online || !course.fees.inhouse)
		throw new Error("no course is offered both ways");
	await page.goto(`/courses/${course.slug}`);
	const box = page.locator(".price-box");
	const figure = box.locator(".price-figure");

	await expect(figure).toHaveText(formatNaira(course.fees.online.upfront));
	await box.getByRole("button", { name: "In person" }).click();
	await expect(figure).toHaveText(formatNaira(course.fees.inhouse.upfront));
	await expect(box.getByRole("button", { name: "In person" })).toHaveAttribute(
		"aria-pressed",
		"true",
	);
});

test("the catalogue opens on the track named in the address", async ({
	page,
}) => {
	const video = COURSES.filter((c) => c.family === "video");
	await page.goto("/courses#video");
	await expect(page.getByRole("button", { name: "Video" })).toHaveAttribute(
		"aria-pressed",
		"true",
	);
	await expect(page.locator(".card-lift h3")).toHaveCount(video.length);

	await page.getByRole("button", { name: "All courses" }).click();
	await expect(page.locator(".card-lift h3")).toHaveCount(COURSES.length);
});

for (const [from, hash] of [
	["/teaching", "teaching"],
	["/centre", "visit"],
	["/timetable", "visit"],
	["/academy/about", "teaching"],
] as const) {
	test(`${from} now lives on the one About page`, async ({ page }) => {
		await page.goto(from);
		await expect(page).toHaveURL(new RegExp(`/about#${hash}$`));
		await expect(page.getByRole("heading", { level: 1 })).toContainText(
			"A software company",
		);
	});
}

test("a paused course is nowhere on the site, and its address lands on the catalogue", async ({
	page,
}) => {
	await page.goto("/courses/cybersecurity");
	await expect(page).toHaveURL(/\/courses\/?$/);
	await expect(page.getByText("Cybersecurity")).toHaveCount(0);
	await page.goto("/fees");
	await expect(page.getByText("Cybersecurity")).toHaveCount(0);
});
