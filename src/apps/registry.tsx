import type { ReactNode } from "react";

export interface AppDefinition {
  id: string;
  title: string;
  /** Short label shown under the desktop icon. */
  iconLabel: string;
  /** Emoji/glyph placeholder until real XP icon art lands. */
  glyph: string;
  defaultWidth: number;
  defaultHeight: number;
  content: ReactNode;
}

function AboutContent() {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-bold">Aaron Brooks — Full Stack Software Engineer</p>
      <p>
        8+ years building customer-facing EdTech at scale, specializing in
        React, TypeScript, and Redux. This site is a Windows XP–themed
        playground; poke around the desktop.
      </p>
      <p className="text-xs italic">
        More apps (résumé viewer, projects, an AIM-style AI buddy) are on the
        way.
      </p>
    </div>
  );
}

function ResumeContent() {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      <p>A proper Adobe Acrobat–style résumé viewer is coming in a later
        milestone.</p>
      <p>
        For now, find me on{" "}
        <a
          href="https://linkedin.com/in/aaronleebrooks"
          target="_blank"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/aaronleebrooks"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}

export const APPS: AppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    iconLabel: "About Me",
    glyph: "👤",
    defaultWidth: 380,
    defaultHeight: 240,
    content: <AboutContent />,
  },
  {
    id: "resume",
    title: "Résumé",
    iconLabel: "Résumé",
    glyph: "📄",
    defaultWidth: 360,
    defaultHeight: 200,
    content: <ResumeContent />,
  },
];

export function getApp(appId: string): AppDefinition | undefined {
  return APPS.find((app) => app.id === appId);
}
