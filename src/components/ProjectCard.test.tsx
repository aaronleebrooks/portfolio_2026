import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

const baseProject: Project = {
  id: "demo",
  name: "Demo Project",
  description: "A sample project description.",
  tech: ["React", "TypeScript"],
};

describe("ProjectCard", () => {
  it("renders project name, description, and tech", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();
    expect(
      screen.getByText("A sample project description."),
    ).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Tech stack" })).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("links to a live demo when liveUrl is set", () => {
    render(
      <ProjectCard
        project={{ ...baseProject, liveUrl: "https://example.com/demo" }}
      />,
    );

    expect(
      screen.getByRole("link", { name: /live demo for demo project/i }),
    ).toHaveAttribute("href", "https://example.com/demo");
  });

  it("links to the repository when only repoUrl is set", () => {
    render(
      <ProjectCard
        project={{ ...baseProject, repoUrl: "https://github.com/example/demo" }}
      />,
    );

    expect(
      screen.getByRole("link", { name: /repository for demo project/i }),
    ).toHaveAttribute("href", "https://github.com/example/demo");
  });

  it("omits the external link when neither URL is set", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.queryByRole("link", { name: /live demo for demo project/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /repository for demo project/i }),
    ).not.toBeInTheDocument();
  });
});
