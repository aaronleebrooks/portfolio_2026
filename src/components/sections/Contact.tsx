import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";

/**
 * Secondary destinations sit inline as text. Giving LinkedIn, GitHub and a
 * movie diary the same weight as "email me" made the page's one ask compete
 * with three things that are not the ask.
 */
const inlineLinkClass =
  "underline underline-offset-4 transition-colors hover:text-primary";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 py-10 sm:py-14"
    >
      <Reveal>
        <SectionHeading title="Contact" id="contact-heading" />
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          I&apos;m looking for a front-end role, and I like talking shop:
          accessible React, assessment standards, or why your AI feature costs
          more than it earns. Email is the fastest way to reach me.
        </p>
        {/*
          These navigate, so they are links wearing the button style rather than
          Base UI buttons rendering an anchor. The old form put role="button" on
          an <a> — announced as a button, behaves as a link — and logged a
          Base UI error for every one of them.
        */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className={buttonVariants({ size: "lg" })}
          >
            {profile.email}
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            // secondary, not outline: on the paper ground a 16%-alpha hairline
            // reads as text rather than a control, and this is the artifact a
            // recruiter actually forwards.
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Résumé (PDF)
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Also on{" "}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClass}
          >
            LinkedIn
          </a>
          {", "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClass}
          >
            GitHub
          </a>
          {", and "}
          <a
            href={profile.letterboxd}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClass}
          >
            Letterboxd
          </a>
          {"."}
        </p>
      </Reveal>
    </section>
  );
}
