import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Reveal>
        <SectionHeading number="01" title="About" id="about-heading" />
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label={group.category}>
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge
                      variant="secondary"
                      className="font-mono text-[11px] font-normal"
                    >
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
