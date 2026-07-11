import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Contact } from "@/components/sections/Contact";
import { profile } from "@/data/profile";
import { triggerIntersection } from "@/test/setup";

describe("Contact", () => {
  it("reveals the email and links to social profiles", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    act(() => {
      triggerIntersection({ isIntersecting: true });
    });

    expect(
      screen.getByRole("heading", { name: /contact/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      profile.linkedin,
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      profile.github,
    );
    expect(screen.getByRole("link", { name: "Letterboxd" })).toHaveAttribute(
      "href",
      profile.letterboxd,
    );

    await user.click(screen.getByRole("button", { name: "Reveal email" }));

    expect(
      screen.getByRole("link", { name: profile.email }),
    ).toHaveAttribute("href", `mailto:${profile.email}`);
  });
});
