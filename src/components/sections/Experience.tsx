import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Reveal>
        <SectionHeading number="02" title="Experience" id="experience-heading" />
        <ol className="space-y-10">
          {experience.map((job) => (
            <li key={job.id} className="group relative">
              <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <time dateTime={job.start}>{job.start}</time>
                  {" – "}
                  <time dateTime={job.end}>{job.end}</time>
                </p>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {job.role}
                  </h3>
                  <p className="text-sm text-primary">
                    {job.company}
                    <span className="text-muted-foreground"> · {job.location}</span>
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {job.highlights.map((highlight) => (
                      <li key={highlight.slice(0, 40)} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {job.tech.map((item) => (
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
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
