import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { profile } from "@/data/profile";
import { triggerIntersection } from "@/test/setup";

describe("App", () => {
  it("renders skip link, main landmark, and all sections", () => {
    render(<App />);

    act(() => {
      triggerIntersection({ isIntersecting: true });
    });

    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /experience/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /projects/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /contact/i }),
    ).toBeInTheDocument();

    expect(
      within(screen.getByRole("contentinfo")).getByText(/built with react/i),
    ).toBeInTheDocument();
  });
});
