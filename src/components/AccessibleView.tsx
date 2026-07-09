import { useTranslation } from "react-i18next";
import { publicAssetUrl } from "../utils/publicAssetUrl";

interface AccessibleViewProps {
  onExit: () => void;
}

export function AccessibleView({ onExit }: AccessibleViewProps) {
  const { t } = useTranslation();
  const resumeUrl = publicAssetUrl("AaronBrooksResume.html");

  return (
    <main className="flex h-full flex-col overflow-auto bg-white p-4 text-black">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 pb-3">
        <h1 className="text-xl font-bold">{t("accessible.title")}</h1>
        <button type="button" className="default" onClick={onExit}>
          {t("accessible.backToDesktop")}
        </button>
      </header>

      <nav
        aria-label={t("accessible.contactNav")}
        className="mb-4 flex flex-wrap gap-4 text-sm"
      >
        <a href="https://linkedin.com/in/aaronleebrooks">
          {t("apps.linkedin.title")}
        </a>
        <a href="https://github.com/aaronleebrooks">{t("apps.github.title")}</a>
      </nav>

      <iframe
        src={resumeUrl}
        title={t("apps.resume.viewerTitle")}
        className="min-h-[70vh] w-full grow border border-gray-300"
      />
    </main>
  );
}
