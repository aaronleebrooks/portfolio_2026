import type { ComponentType } from "react";
import { useTranslation, Trans } from "react-i18next";

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

function ResumeContent() {
  const { t } = useTranslation();
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      <p>{t("apps.resume.comingSoon")}</p>
      <p>
        <Trans
          i18nKey="apps.resume.links"
          components={{
            linkedin: (
              <a
                href="https://linkedin.com/in/aaronleebrooks"
                target="_blank"
                rel="noreferrer noopener"
              />
            ),
            github: (
              <a
                href="https://github.com/aaronleebrooks"
                target="_blank"
                rel="noreferrer noopener"
              />
            ),
          }}
        />
      </p>
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
    defaultWidth: 360,
    defaultHeight: 200,
    Content: ResumeContent,
  },
];

export function getApp(appId: string): AppDefinition | undefined {
  return APPS.find((app) => app.id === appId);
}
