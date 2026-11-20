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

test("the timeline lights up modules as they are scrolled to", async ({
	page,
}) => {
	await page.goto("/courses/pc-basics");
	const markers = page.locator(".timeline-marker");
	const last = markers.last();
	const lit = async () =>
		last.evaluate((el) => getComputedStyle(el).color === "rgb(255, 255, 255)");

	await page.evaluate(() => window.scrollTo(0, 0));
	await expect.poll(lit).toBe(false);

	await last.evaluate((el) => el.scrollIntoView({ block: "start" }));
	await expect.poll(lit).toBe(true);
});

test("the session loop moves on by itself and jumps when a part is clicked", async ({
	page,
}) => {
	const [first, second, third] = COURSES[0].session;
	await page.goto(`/courses/${COURSES[0].slug}`);
	const loop = page.getByRole("group", { name: "The parts of a session" });
	await loop.scrollIntoViewIfNeeded();
	await page.mouse.move(0, 0);

	const centre = loop.locator(".session-loop-centre > :not([hidden])");
	await expect(centre).toContainText(first.t);

	/* the sweep is running; rather than wait out its real duration, finish it
	   — the loop moves on when the animation ends */
	const arc = loop.locator(".session-loop-arc");
	await expect
		.poll(() => arc.evaluate((el) => el.getAnimations()[0]?.playState))
		.toBe("running");
	await arc.evaluate((el) => el.getAnimations()[0].finish());
	await expect(centre).toContainText(second.t);

	await loop.getByRole("button", { name: third.t }).click();
	await expect(centre).toContainText(third.t);
	await expect(loop.getByText(third.d)).toBeVisible();
	await expect(loop.getByText(first.d)).toBeHidden();
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
	["/centre", "where"],
	["/timetable", "where"],
] as const) {
	test(`${from} now lives on About the Academy`, async ({ page }) => {
		await page.goto(from);
		await expect(page).toHaveURL(new RegExp(`/academy/about#${hash}$`));
		await expect(page.getByRole("heading", { level: 1 })).toContainText(
			"Understand it first",
		);
	});
}
