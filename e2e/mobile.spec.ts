import { expect, test } from "@playwright/test";

test.describe("mobile", () => {
  test("navigates to Projects from the sticky top bar", async ({ page }) => {
    await page.goto("./");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Projects" }).click();

    await expect(page).toHaveURL(/#projects$/);
    await expect(
      page.getByRole("heading", { name: /projects/i }),
    ).toBeInViewport();
  });
});
