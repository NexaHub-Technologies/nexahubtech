import { expect, test } from "./fixtures";

/* One website: one header everywhere, the Academy as a section of it. */

test("there is no Studio/Academy switch, and the main menu reaches both arms", async ({
	page,
}) => {
	await page.goto("/");
	await expect(page.getByRole("button", { name: "Studio" })).toHaveCount(0);
	/* on a phone the main menu sits behind the menu button */
	const menu = page.getByRole("button", { name: "Open menu" });
	if (await menu.isVisible()) await menu.click();
	const nav = page.locator("nav[aria-label='Main']:visible");
	for (const label of ["Services", "Work", "Approach", "Academy", "About", "Contact"])
		await expect(nav.getByRole("link", { name: label })).toBeVisible();
	await expect(
		page.getByRole("navigation", { name: "NexaHubTech Academy" }),
	).toHaveCount(0);
});

test("Academy pages carry the Academy's own row of links", async ({ page }) => {
	await page.goto("/courses");
	const academy = page.getByRole("navigation", { name: "NexaHubTech Academy" });
	await expect(academy).toBeVisible();
	await expect(academy.getByRole("link", { name: "Courses" })).toHaveClass(
		/is-active/,
	);
	await academy.getByRole("link", { name: "Pricing" }).click();
	await expect(page).toHaveURL(/\/fees$/);
	await expect(page.getByRole("link", { name: "Enrol" }).first()).toBeVisible();
});

test("About introduces the team, founders first", async ({ page }) => {
	await page.goto("/about");
	const team = page.locator("#team");
	await expect(team.getByRole("heading", { name: "Divine O. Agbo" })).toBeVisible();
	await expect(team.getByRole("heading", { name: "Michael Onuoha" })).toBeVisible();
});

test("evidence slots show labelled placeholders until filled", async ({
	page,
}) => {
	await page.goto("/");
	await expect(
		page.getByRole("img", { name: /^Placeholder: A shipped product/ }),
	).toBeVisible();
});

test("the front page opens with the availability badge, the headline and Trusted by", async ({
	page,
}) => {
	await page.goto("/");
	await expect(page.getByRole("link", { name: /Available for new projects/ })).toHaveAttribute(
		"href",
		/wa\.me/,
	);
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		/Software,\s*built properly\./i,
	);
	await expect(page.getByText("Trusted by")).toBeVisible();
	/* the stickers are decoration, hidden from assistive technology */
	for (const s of await page.locator(".sticker").all())
		await expect(s).toHaveAttribute("aria-hidden", "true");
});
