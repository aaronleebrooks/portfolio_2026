import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Reveal>
        <SectionHeading number="03" title="Projects" id="projects-heading" />
        <ul className="grid gap-6">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Reveal delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
