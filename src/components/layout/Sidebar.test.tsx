import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Sidebar } from "@/components/layout/Sidebar";
import { profile } from "@/data/profile";

describe("Sidebar", () => {
  it("renders profile identity and primary navigation", () => {
    render(<Sidebar activeId="about" />);

    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(profile.title)).toBeInTheDocument();
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(
      within(nav).getByRole("link", { name: "Experience" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("marks the active section with aria-current", () => {
    render(<Sidebar activeId="projects" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });
});
