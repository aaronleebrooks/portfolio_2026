import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Reveal } from "@/components/Reveal";
import { triggerIntersection } from "@/test/setup";

describe("Reveal", () => {
  it("hides content until it intersects, then reveals it", () => {
    render(
      <Reveal>
        <p>Hidden until visible</p>
      </Reveal>,
    );

    expect(screen.getByText("Hidden until visible")).not.toBeVisible();

    act(() => {
      triggerIntersection({ isIntersecting: true });
    });

    expect(screen.getByText("Hidden until visible")).toBeVisible();
  });

  it("applies a transition delay when delay is set", () => {
    render(
      <Reveal delay={0.05}>
        <p>Delayed reveal</p>
      </Reveal>,
    );

    act(() => {
      triggerIntersection({ isIntersecting: true });
    });

    expect(screen.getByText("Delayed reveal")).toBeVisible();
  });

  it("ignores non-intersecting observer entries", () => {
    render(
      <Reveal>
        <p>Still hidden</p>
      </Reveal>,
    );

    act(() => {
      triggerIntersection({ isIntersecting: false, intersectionRatio: 0 });
    });

    expect(screen.getByText("Still hidden")).not.toBeVisible();
  });
});
