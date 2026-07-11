import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("loads the portfolio with landmarks and sections", async ({ page }) => {
    await page.goto("./");

    await expect(page).toHaveTitle(/Aaron Brooks/i);
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeAttached();
    await expect(page.getByRole("main")).toBeVisible();

    await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /experience/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /projects/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();

    await expect(page.getByRole("contentinfo")).toContainText(/Built with React/i);
  });
});
