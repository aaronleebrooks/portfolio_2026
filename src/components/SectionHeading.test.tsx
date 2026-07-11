import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "@/components/SectionHeading";

describe("SectionHeading", () => {
  it("renders the section title as a heading", () => {
    render(<SectionHeading number="01" title="About" id="about-heading" />);

    expect(
      screen.getByRole("heading", { level: 2, name: /about/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("01.")).toBeInTheDocument();
  });

  it("works without an id", () => {
    render(<SectionHeading number="02" title="Experience" />);

    expect(
      screen.getByRole("heading", { level: 2, name: /experience/i }),
    ).toBeInTheDocument();
  });
});
