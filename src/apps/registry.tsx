import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { BalloonViewer } from "./content/BalloonViewer";
import { EmailApp } from "./content/EmailApp";
import { GitHubApp } from "./content/GitHubApp";
import { LinkedInApp } from "./content/LinkedInApp";
import { ResumeViewer } from "./content/ResumeViewer";

export interface AppDefinition {
  id: string;
  glyph: string;
  defaultWidth: number;
  defaultHeight: number;
  Content: ComponentType;
}

function AboutContent() {
  const { t } = useTranslation();
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-bold">{t("apps.about.headline")}</p>
      <p>{t("apps.about.body")}</p>
      <p className="text-xs italic">{t("apps.about.footnote")}</p>
    </div>
  );
}

export const APPS: AppDefinition[] = [
  {
    id: "about",
    glyph: "👤",
    defaultWidth: 380,
    defaultHeight: 240,
    Content: AboutContent,
  },
  {
    id: "resume",
    glyph: "📄",
    defaultWidth: 640,
    defaultHeight: 520,
    Content: ResumeViewer,
  },
  {
    id: "email",
    glyph: "✉️",
    defaultWidth: 360,
    defaultHeight: 220,
    Content: EmailApp,
  },
  {
    id: "linkedin",
    glyph: "💼",
    defaultWidth: 400,
    defaultHeight: 260,
    Content: LinkedInApp,
  },
  {
    id: "github",
    glyph: "🐙",
    defaultWidth: 400,
    defaultHeight: 260,
    Content: GitHubApp,
  },
  {
    id: "balloon",
    glyph: "🎈",
    defaultWidth: 480,
    defaultHeight: 520,
    Content: BalloonViewer,
  },
];

export function getApp(appId: string): AppDefinition | undefined {
  return APPS.find((app) => app.id === appId);
}
