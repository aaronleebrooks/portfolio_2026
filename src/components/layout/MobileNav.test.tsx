import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileNav } from "@/components/layout/MobileNav";
import { profile } from "@/data/profile";

describe("MobileNav", () => {
  it("opens the navigation sheet and highlights the active section", async () => {
    const user = userEvent.setup();
    render(<MobileNav activeId="experience" />);

    expect(
      screen.getByRole("link", { name: profile.name }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: "Navigate" }),
    ).toBeInTheDocument();

    const mobileNav = within(dialog).getByRole("navigation", {
      name: "Mobile",
    });
    expect(
      within(mobileNav).getByRole("link", { name: "Experience" }),
    ).toHaveAttribute("aria-current", "true");
    expect(within(dialog).getByText("GitHub")).toBeInTheDocument();
  });

  it("closes the sheet when a nav link is activated", async () => {
    const user = userEvent.setup();
    render(<MobileNav activeId="about" />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = await screen.findByRole("dialog");

    await user.click(within(dialog).getByRole("link", { name: "Projects" }));

    await expect
      .poll(() => screen.queryByRole("dialog"))
      .toBeNull();
  });
});
