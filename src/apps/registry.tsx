import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { BalloonViewer } from "./content/BalloonViewer";
import { EmailApp } from "./content/EmailApp";
import { ResumeViewer } from "./content/ResumeViewer";
import { GITHUB_PORTFOLIO_URL, LINKEDIN_URL } from "./links";

interface AppBase {
  id: string;
  glyph: string;
}

export interface WindowApp extends AppBase {
  defaultWidth: number;
  defaultHeight: number;
  Content: ComponentType;
  externalUrl?: never;
}

export interface ExternalLinkApp extends AppBase {
  externalUrl: string;
  defaultWidth?: never;
  defaultHeight?: never;
  Content?: never;
}

export type AppDefinition = WindowApp | ExternalLinkApp;

export function isExternalApp(app: AppDefinition): app is ExternalLinkApp {
  return "externalUrl" in app;
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
    externalUrl: LINKEDIN_URL,
  },
  {
    id: "github",
    glyph: "🐙",
    externalUrl: GITHUB_PORTFOLIO_URL,
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
