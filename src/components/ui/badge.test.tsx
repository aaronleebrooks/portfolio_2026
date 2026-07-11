import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, badgeVariants } from "@/components/ui/badge";

describe("Badge", () => {
  it.each([
    ["default", "default"],
    ["secondary", "secondary"],
    ["destructive", "destructive"],
    ["outline", "outline"],
    ["ghost", "ghost"],
    ["link", "link"],
  ] as const)("renders the %s variant", (label, variant) => {
    render(<Badge variant={variant}>{label}</Badge>);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("renders as a link via the render prop", () => {
    render(
      <Badge render={<a href="https://example.com/badge">Linked badge</a>} />,
    );

    expect(screen.getByRole("link", { name: "Linked badge" })).toHaveAttribute(
      "href",
      "https://example.com/badge",
    );
  });

  it("exposes badgeVariants for class composition", () => {
    expect(badgeVariants({ variant: "outline" })).toContain("border-border");
  });
});
