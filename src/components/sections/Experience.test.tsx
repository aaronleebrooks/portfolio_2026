import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Experience } from "@/components/sections/Experience";
import { experience } from "@/data/experience";
import { triggerIntersection } from "@/test/setup";

describe("Experience", () => {
  it("renders jobs with roles, companies, and tech", () => {
    render(<Experience />);

    act(() => {
      triggerIntersection({ isIntersecting: true });
    });

    expect(
      screen.getByRole("heading", { name: /experience/i }),
    ).toBeInTheDocument();

    const firstJob = experience[0];
    expect(
      screen.getByRole("heading", { name: firstJob.role }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText((_, element) => {
        return element?.tagName === "P" &&
          Boolean(element.textContent?.includes(firstJob.company));
      }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(firstJob.highlights[0])).toBeInTheDocument();
    expect(screen.getAllByRole("list", { name: "Technologies" }).length).toBe(
      experience.length,
    );
  });
});
