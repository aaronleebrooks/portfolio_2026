import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Projects } from "@/components/sections/Projects";
import { projects } from "@/data/projects";
import { triggerIntersection } from "@/test/setup";

describe("Projects", () => {
  it("renders every project card", () => {
    render(<Projects />);

    act(() => {
      triggerIntersection({ isIntersecting: true });
    });

    expect(
      screen.getByRole("heading", { name: /projects/i }),
    ).toBeInTheDocument();

    for (const project of projects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
  });
});
