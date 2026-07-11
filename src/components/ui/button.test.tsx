import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button, buttonVariants } from "@/components/ui/button";

describe("Button", () => {
  it.each([
    ["default", "default"],
    ["outline", "outline"],
    ["secondary", "secondary"],
    ["ghost", "ghost"],
    ["destructive", "destructive"],
    ["link", "link"],
  ] as const)("renders the %s variant", (name, variant) => {
    render(
      <Button variant={variant} size="default">
        {name}
      </Button>,
    );

    expect(screen.getByRole("button", { name })).toBeInTheDocument();
  });

  it.each([
    ["xs", "xs"],
    ["sm", "sm"],
    ["lg", "lg"],
    ["icon", "icon"],
    ["icon-xs", "icon-xs"],
    ["icon-sm", "icon-sm"],
    ["icon-lg", "icon-lg"],
  ] as const)("renders the %s size", (label, size) => {
    render(
      <Button size={size} aria-label={label}>
        Go
      </Button>,
    );

    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });

  it("renders as a link via the render prop", () => {
    render(
      <Button render={<a href="https://example.com">Example</a>} />,
    );

    expect(screen.getByRole("link", { name: "Example" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  it("exposes buttonVariants for class composition", () => {
    expect(buttonVariants({ variant: "outline", size: "sm" })).toContain(
      "border-border",
    );
  });
});
