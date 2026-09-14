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

    await expect(page.getByRole("contentinfo")).toContainText(/source/i);

    // The test-coverage argument is a project now, not a footer aside. Assert
    // it is still on the page and that it sits inside Projects, so moving it
    // out of the footer cannot quietly become losing it.
    const thisSite = page.getByRole("heading", { name: "This Site" });
    await expect(thisSite).toBeVisible();
    await expect(
      page.locator("section#projects").getByText(/100% unit coverage/i),
    ).toBeVisible();
  });

  test("leads with the artifact and the role being sought", async ({ page }) => {
    await page.goto("./");

    // The masthead screenshot is the page's evidence-first move; it must be in
    // the first viewport, not lazy-loaded somewhere below the fold.
    const hero = page.locator("header#top img");
    await expect(hero).toBeInViewport();
    await expect(hero).toHaveAttribute("alt", /read-aloud toolbar/i);

    // The masthead must carry the leadership evidence, not just the shipping
    // record — a visitor who leaves knowing what was built but not that it was
    // led has missed the point. This asserts the evidence, not a job title.
    await expect(page.locator("header#top")).toContainText(
      /acting team lead/i,
    );
  });
});
