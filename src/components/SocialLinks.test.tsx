import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

describe("SocialLinks", () => {
  it("renders social, email, and résumé links", () => {
    render(<SocialLinks />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      profile.github,
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      profile.linkedin,
    );
    expect(screen.getByRole("link", { name: "Letterboxd" })).toHaveAttribute(
      "href",
      profile.letterboxd,
    );
    expect(
      screen.getByRole("link", { name: `Email ${profile.email}` }),
    ).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(
      screen.getByRole("link", { name: "Download résumé PDF" }),
    ).toHaveAttribute("href", profile.resumeUrl);
  });

  it("shows visible labels when showLabels is true", () => {
    render(<SocialLinks showLabels />);

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Résumé")).toBeInTheDocument();
    expect(screen.getByText(profile.email)).toBeInTheDocument();
  });
});
