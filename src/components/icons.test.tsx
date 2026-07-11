import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  GitHubIcon,
  LetterboxdIcon,
  LinkedInIcon,
} from "@/components/icons";

describe("icons", () => {
  it.each([
    ["GitHub", GitHubIcon],
    ["LinkedIn", LinkedInIcon],
    ["Letterboxd", LetterboxdIcon],
  ] as const)("renders %s icon inside a labeled control", (name, Icon) => {
    render(
      <button type="button" aria-label={name}>
        <Icon />
      </button>,
    );

    expect(screen.getByRole("button", { name })).toBeInTheDocument();
  });
});
