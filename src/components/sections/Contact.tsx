import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Contact() {
  const [emailRevealed, setEmailRevealed] = useState(false);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Reveal>
        <SectionHeading number="04" title="Contact" id="contact-heading" />
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Whether you&apos;re hiring, collaborating, or just want to talk shop
          about accessible React and AI-powered EdTech — I&apos;d love to hear
          from you.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {emailRevealed ? (
            <Button
              size="lg"
              render={
                <a href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              }
            />
          ) : (
            <Button size="lg" onClick={() => setEmailRevealed(true)}>
              Reveal email
            </Button>
          )}
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
