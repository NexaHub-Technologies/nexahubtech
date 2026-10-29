import { expect, test } from "./fixtures";

test("the old /cbt-training address redirects to /cbt", async ({ page }) => {
	await page.goto("/cbt-training");
	await expect(page).toHaveURL(/\/cbt$/);
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		"CBT exam",
	);
});

test("practice questions answer by click and by keyboard", async ({ page }) => {
	await page.goto("/cbt");
	const card = page.locator("#practice .card");
	await expect(card).toContainText("Question 1 of 3");

	/* a click answers, and the explanation appears */
	await card.getByRole("button", { name: /Brief and to the point/ }).click();
	await expect(card).toContainText("Correct.");
	await expect(card).toContainText("1 of 1 correct");

	/* focus is now inside the card, so the exam keys work */
	await page.keyboard.press("n");
	await expect(card).toContainText("Question 2 of 3");
	await page.keyboard.press("a");
	await expect(card).toContainText("The answer is B.");
	await page.keyboard.press("p");
	await expect(card).toContainText("Question 1 of 3");
});

test("exam keys do nothing outside the practice card", async ({ page }) => {
	await page.goto("/cbt");
	await page.locator("body").press("n");
	await expect(page.locator("#practice .card")).toContainText(
		"Question 1 of 3",
	);
});

test("register links carry the CBT course to the enrol form", async ({
	page,
}) => {
	await page.goto("/cbt");
	await page
		.getByRole("link", { name: "Register for CBT training" })
		.first()
		.click();
	await expect(page).toHaveURL(/\/enrol\?course=cbt-training/);
	await expect(page.getByText("CBT Training (WAEC & JAMB)").first()).toBeVisible();
	await expect(page.getByText("From ₦3,000", { exact: true })).toBeVisible();
});
