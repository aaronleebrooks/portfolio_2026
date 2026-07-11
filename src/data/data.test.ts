import { describe, expect, it } from "vitest";

import { experience } from "@/data/experience";
import { profile, navItems, sectionIds } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

describe("data modules", () => {
  it("exports a complete profile", () => {
    expect(profile.name).toBe("Aaron Brooks");
    expect(profile.email).toContain("@");
    expect(profile.about.length).toBeGreaterThan(0);
  });

  it("exports nav items aligned with section ids", () => {
    expect(navItems.length).toBe(4);
    expect(sectionIds).toEqual(navItems.map((item) => item.id));
  });

  it("exports projects with required fields", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tech.length).toBeGreaterThan(0);
    }
  });

  it("exports experience entries with highlights", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const job of experience) {
      expect(job.role).toBeTruthy();
      expect(job.company).toBeTruthy();
      expect(job.highlights.length).toBeGreaterThan(0);
      expect(job.tech.length).toBeGreaterThan(0);
    }
  });

  it("exports skill groups", () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const group of skills) {
      expect(group.category).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
  });
});
