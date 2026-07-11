import { act, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { sectionIds, type NavItemId } from "@/data/profile";
import { triggerIntersection } from "@/test/setup";

function ScrollSpyHarness({
  ids = sectionIds,
  offset,
}: {
  ids?: readonly NavItemId[];
  offset?: number;
}) {
  const activeId = useScrollSpy(ids, offset);

  return (
    <div>
      <p role="status">{activeId}</p>
      {ids.map((id) => (
        <section key={id} id={id} aria-label={`section-${id}`}>
          {id}
        </section>
      ))}
    </div>
  );
}

describe("useScrollSpy", () => {
  it("defaults to the first section", () => {
    render(<ScrollSpyHarness />);

    expect(screen.getByRole("status")).toHaveTextContent("about");
  });

  it("updates the active section when an entry intersects", () => {
    render(<ScrollSpyHarness />);

    const projects = screen.getByLabelText("section-projects");

    act(() => {
      triggerIntersection({
        target: projects,
        isIntersecting: true,
        intersectionRatio: 0.9,
      });
    });

    expect(screen.getByRole("status")).toHaveTextContent("projects");
  });

  it("falls back to the last section above the offset when none intersect", () => {
    render(<ScrollSpyHarness offset={0} />);

    const about = screen.getByLabelText("section-about");
    const experience = screen.getByLabelText("section-experience");
    const projects = screen.getByLabelText("section-projects");
    const contact = screen.getByLabelText("section-contact");

    const rect = (top: number) => ({
      top,
      bottom: top + 100,
      left: 0,
      right: 0,
      width: 0,
      height: 100,
      x: 0,
      y: top,
      toJSON: () => ({}),
    });

    vi.spyOn(about, "getBoundingClientRect").mockReturnValue(rect(-200));
    vi.spyOn(experience, "getBoundingClientRect").mockReturnValue(rect(-10));
    vi.spyOn(projects, "getBoundingClientRect").mockReturnValue(rect(120));
    vi.spyOn(contact, "getBoundingClientRect").mockReturnValue(rect(240));

    act(() => {
      triggerIntersection({
        isIntersecting: false,
        intersectionRatio: 0,
      });
    });

    expect(screen.getByRole("status")).toHaveTextContent("experience");
  });

  it("does nothing when section elements are missing", () => {
    const { result } = renderHook(() => useScrollSpy(["about"] as const));

    expect(result.current).toBe("about");
  });
});
