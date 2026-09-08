import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Reveal>
        <SectionHeading title="Contact" id="contact-heading" />
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          I&apos;m open to new roles, and I like talking shop: accessible React,
          assessment standards, or why your AI feature costs more than it earns.
          Email is the fastest way to reach me.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            render={<a href={`mailto:${profile.email}`}>{profile.email}</a>}
          />
          <Button
            variant="outline"
            size="lg"
            render={
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            }
          />
          <Button
            variant="outline"
            size="lg"
            render={
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            }
          />
          <Button
            variant="outline"
            size="lg"
            render={
              <a
                href={profile.letterboxd}
                target="_blank"
                rel="noopener noreferrer"
              >
                Letterboxd
              </a>
            }
          />
        </div>
      </Reveal>
    </section>
  );
}
