import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function preparePage(page: import("@playwright/test").Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await page.evaluate(() => {
    for (const el of document.querySelectorAll(".reveal")) {
      el.classList.add("reveal-visible");
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.transform = "none";
    }
  });
}

async function expectNoSeriousViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const serious = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );

  expect(serious).toEqual([]);
}

test.describe("accessibility", () => {
  test("has no serious or critical axe violations on the home page", async ({
    page,
  }) => {
    await preparePage(page);
    await expectNoSeriousViolations(page);
  });

  test("has no serious or critical axe violations with the mobile menu open", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page);
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expectNoSeriousViolations(page);
  });
});
