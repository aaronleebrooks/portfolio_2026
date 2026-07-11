import { expect, test } from "@playwright/test";

test.describe("contact", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("reveals email from contact and sidebar", async ({ page }) => {
    await page.goto("./");

    await page.getByRole("heading", { name: /contact/i }).scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Reveal email", exact: true }).click();
    await expect(
      page.getByRole("link", { name: "HireAaronBrooks@pm.me", exact: true }),
    ).toHaveAttribute("href", "mailto:HireAaronBrooks@pm.me");

    await page
      .getByRole("button", { name: "Reveal email address", exact: true })
      .click();
    await expect(
      page.getByRole("link", { name: "Email HireAaronBrooks@pm.me", exact: true }),
    ).toHaveAttribute("href", "mailto:HireAaronBrooks@pm.me");
  });
});
