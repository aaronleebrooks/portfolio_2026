import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "@/components/SectionHeading";

describe("SectionHeading", () => {
  it("renders the section title as a heading", () => {
    render(<SectionHeading title="About" id="about-heading" />);

    const heading = screen.getByRole("heading", { level: 2, name: /about/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "about-heading");
  });

  it("works without an id", () => {
    render(<SectionHeading title="Experience" />);

    expect(
      screen.getByRole("heading", { level: 2, name: /experience/i }),
    ).toBeInTheDocument();
  });
});
