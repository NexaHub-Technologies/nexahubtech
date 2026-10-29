import { expect, test } from "./fixtures";
import { COURSES } from "../src/lib/courses";

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
