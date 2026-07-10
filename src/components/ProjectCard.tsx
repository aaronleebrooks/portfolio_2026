import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const href = project.liveUrl ?? project.repoUrl;
  const linkLabel = project.liveUrl ? "Live demo" : "Repository";

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-primary/10">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
                aria-label={`${linkLabel} for ${project.name}`}
              >
                {linkLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
          <CardDescription className="leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map((item) => (
              <li key={item}>
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] font-normal"
                >
                  {item}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
