import { expect, test } from "@playwright/test";

test.describe("contact", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("exposes the email address directly from contact and sidebar", async ({
    page,
  }) => {
    await page.goto("./");

    await page.getByRole("heading", { name: /contact/i }).scrollIntoViewIfNeeded();

    await expect(
      page.getByRole("link", { name: "HireAaronBrooks@pm.me", exact: true }),
    ).toHaveAttribute("href", "mailto:HireAaronBrooks@pm.me");

    await expect(
      page.getByRole("link", { name: "Email HireAaronBrooks@pm.me", exact: true }),
    ).toHaveAttribute("href", "mailto:HireAaronBrooks@pm.me");
  });
});
