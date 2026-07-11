import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

describe("SocialLinks", () => {
  it("renders social and résumé links", () => {
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
      screen.getByRole("link", { name: "Download résumé PDF" }),
    ).toHaveAttribute("href", profile.resumeUrl);
  });

  it("reveals the email address on click", async () => {
    const user = userEvent.setup();
    render(<SocialLinks />);

    expect(
      screen.queryByRole("link", { name: `Email ${profile.email}` }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Reveal email address" }),
    );

    expect(
      screen.getByRole("link", { name: `Email ${profile.email}` }),
    ).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("shows visible labels when showLabels is true", async () => {
    const user = userEvent.setup();
    render(<SocialLinks showLabels />);

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Reveal email address" }),
    );

    expect(screen.getByText(profile.email)).toBeInTheDocument();
  });
});
