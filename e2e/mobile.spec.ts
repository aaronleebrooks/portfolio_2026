import { expect, test } from "@playwright/test";

test.describe("mobile", () => {
  test("opens the menu sheet and navigates to Projects", async ({ page }) => {
    await page.goto("./");

    await page.getByRole("button", { name: "Open menu" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Navigate" })).toBeVisible();

    await dialog.getByRole("link", { name: "Projects" }).click();

    await expect(page).toHaveURL(/#projects$/);
    await expect(page.getByRole("heading", { name: /projects/i })).toBeInViewport();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
