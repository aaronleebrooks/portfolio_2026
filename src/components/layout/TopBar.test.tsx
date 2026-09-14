import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TopBar } from "@/components/layout/TopBar";
import { navItems, profile } from "@/data/profile";

describe("TopBar", () => {
  it("links the name home and lists every section", () => {
    render(<TopBar activeId="about" />);

    expect(screen.getByRole("link", { name: profile.name })).toHaveAttribute(
      "href",
      "#top",
    );

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      expect(
        within(nav).getByRole("link", { name: item.label }),
      ).toHaveAttribute("href", `#${item.id}`);
    }
  });

  it("marks the active section with aria-current", () => {
    render(<TopBar activeId="projects" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(
      within(nav).getByRole("link", { name: "About" }),
    ).not.toHaveAttribute("aria-current");
  });
});
