import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

const baseProject: Project = {
  id: "demo",
  name: "Demo Project",
  status: "Acme · Shipped 2024",
  description: "A sample project description.",
  tech: ["React", "TypeScript"],
};

describe("ProjectCard", () => {
  it("renders project name, description, and tech", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();
    expect(screen.getByText("Acme · Shipped 2024")).toBeInTheDocument();
    expect(
      screen.getByText("A sample project description."),
    ).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Tech stack" })).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders a screenshot strip when images are set", () => {
    render(
      <ProjectCard
        project={{
          ...baseProject,
          images: [{ src: "/shot.png", alt: "A screenshot of the demo" }],
        }}
      />,
    );

    expect(
      screen.getByRole("list", { name: "Demo Project screenshots" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "A screenshot of the demo" }),
    ).toHaveAttribute("src", "/shot.png");
  });

  it("omits the screenshot strip when there are no images", () => {
    render(<ProjectCard project={{ ...baseProject, images: [] }} />);

    expect(
      screen.queryByRole("list", { name: "Demo Project screenshots" }),
    ).not.toBeInTheDocument();
  });

  it("renders an evidence link when one is set", () => {
    render(
      <ProjectCard
        project={{
          ...baseProject,
          evidence: { label: "Vendor page", url: "https://example.com/proof" },
        }}
      />,
    );

    expect(screen.getByRole("link", { name: "Vendor page" })).toHaveAttribute(
      "href",
      "https://example.com/proof",
    );
  });

  it("omits the evidence link when none is set", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.queryByRole("link", { name: "Vendor page" }),
    ).not.toBeInTheDocument();
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
