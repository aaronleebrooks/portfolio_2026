import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Masthead } from "@/components/layout/Masthead";
import { profile } from "@/data/profile";

describe("Masthead", () => {
  it("renders identity, claim, tenure, and social links", () => {
    render(<Masthead />);

    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(profile.title)).toBeInTheDocument();
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();

    expect(screen.getByText(profile.tenure.org)).toBeInTheDocument();
    expect(screen.getByText(profile.tenure.note)).toBeInTheDocument();
    for (const row of profile.tenure.rows) {
      expect(screen.getByText(row.period)).toBeInTheDocument();
      expect(screen.getByText(row.role)).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      profile.github,
    );
  });
});
