import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "@/components/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("defaults to paper when nothing is remembered", () => {
    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("restores a remembered dark choice", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
  });

  it("ignores a stored value that is not a theme", () => {
    localStorage.setItem("theme", "sepia");
    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toBeInTheDocument();
  });

  it("falls back to paper when storage cannot be read", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toBeInTheDocument();
  });

  it("toggles the theme and remembers it", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Switch to dark theme" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    await user.click(
      screen.getByRole("button", { name: "Switch to light theme" }),
    );

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("still toggles when storage cannot be written", async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    render(<ThemeToggle />);
    await user.click(screen.getByRole("button", { name: "Switch to dark theme" }));

    expect(document.documentElement).toHaveClass("dark");
  });
});
