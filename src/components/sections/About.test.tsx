import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { About } from "@/components/sections/About";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { triggerIntersection } from "@/test/setup";

describe("About", () => {
  it("renders about copy and skill groups", () => {
    render(<About />);

    act(() => {
      triggerIntersection({ isIntersecting: true });
    });

    expect(
      screen.getByRole("heading", { name: /about/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(profile.about[0])).toBeInTheDocument();

    const firstGroup = skills[0];
    expect(screen.getByText(firstGroup.category)).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: firstGroup.category }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("list", { name: firstGroup.category })).getByText(
        firstGroup.items[0],
      ),
    ).toBeInTheDocument();
  });
});
