import { FileText, Mail } from "lucide-react";
import { useState } from "react";

import { GitHubIcon, LetterboxdIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  showLabels?: boolean;
};

const linkClass =
  "inline-flex items-center gap-2 rounded-md p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SocialLinks({ className, showLabels = false }: SocialLinksProps) {
  const [emailRevealed, setEmailRevealed] = useState(false);

  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      <li>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="GitHub"
        >
          <GitHubIcon className="size-5" />
          {showLabels ? <span className="text-sm">GitHub</span> : null}
        </a>
      </li>
      <li>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="size-5" />
          {showLabels ? <span className="text-sm">LinkedIn</span> : null}
        </a>
      </li>
      <li>
        <a
          href={profile.letterboxd}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="Letterboxd"
        >
          <LetterboxdIcon className="size-5" />
          {showLabels ? <span className="text-sm">Letterboxd</span> : null}
        </a>
      </li>
      <li>
        {emailRevealed ? (
          <a
            href={`mailto:${profile.email}`}
            className={linkClass}
            aria-label={`Email ${profile.email}`}
          >
            <Mail className="size-5" aria-hidden="true" />
            {showLabels ? (
              <span className="text-sm">{profile.email}</span>
            ) : null}
          </a>
        ) : (
          <button
            type="button"
            className={linkClass}
            onClick={() => setEmailRevealed(true)}
            aria-label="Reveal email address"
          >
            <Mail className="size-5" aria-hidden="true" />
            {showLabels ? <span className="text-sm">Email</span> : null}
          </button>
        )}
      </li>
      <li>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="Download résumé PDF"
        >
          <FileText className="size-5" aria-hidden="true" />
          {showLabels ? <span className="text-sm">Résumé</span> : null}
        </a>
      </li>
    </ul>
  );
}
