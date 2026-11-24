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

test("the front page opens with its status, headline, tiles and motto", async ({
	page,
}) => {
	await page.goto("/");
	await expect(page.getByText(/taking on new projects/i)).toBeVisible();
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		/Software,\s*built properly\./,
	);
	const tiles = page.getByRole("list", { name: "What we build" }).getByRole("listitem");
	await expect(tiles).toHaveCount(4);
	const motto = page.getByRole("list", { name: "How every project runs" });
	for (const word of ["Design.", "Ship.", "Support."])
		await expect(motto).toContainText(word);
	await expect(page.getByRole("link", { name: "Book a call" })).toHaveAttribute(
		"href",
		/wa\.me/,
	);
});
