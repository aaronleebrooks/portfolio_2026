import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("desktop sidebar nav updates the hash and target section", async ({
    page,
  }) => {
    await page.goto("./");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.getByRole("link", { name: "Projects" }).click();

    await expect(page).toHaveURL(/#projects$/);
    await expect(page.getByRole("heading", { name: /projects/i })).toBeInViewport();
  });
});
