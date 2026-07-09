import { useTranslation } from "react-i18next";
import { GITHUB_PORTFOLIO_URL, LINKEDIN_URL } from "../apps/links";
import { publicAssetUrl } from "../utils/publicAssetUrl";

interface AccessibleViewProps {
  onExit: () => void;
}

export function AccessibleView({ onExit }: AccessibleViewProps) {
  const { t } = useTranslation();
  const resumeImageUrl = publicAssetUrl("AaronBrooksResume.jpeg");
  const resumePdfUrl = publicAssetUrl("AaronBrooksResume.pdf");

  return (
    <main className="flex h-full flex-col overflow-auto bg-white p-4 text-black">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 pb-3">
        <h1 className="text-xl font-bold">{t("accessible.title")}</h1>
        <div className="flex flex-wrap gap-2">
          <a href={resumePdfUrl} download="AaronBrooksResume.pdf" className="default">
            {t("apps.resume.download")}
          </a>
          <button type="button" className="default" onClick={onExit}>
            {t("accessible.backToDesktop")}
          </button>
        </div>
      </header>

      <nav
        aria-label={t("accessible.contactNav")}
        className="mb-4 flex flex-wrap gap-4 text-sm"
      >
        <a href={LINKEDIN_URL}>{t("apps.linkedin.title")}</a>
        <a href={GITHUB_PORTFOLIO_URL}>{t("apps.github.title")}</a>
      </nav>

      <img
        src={resumeImageUrl}
        alt={t("apps.resume.viewerTitle")}
        className="mx-auto w-full max-w-3xl border border-gray-300 object-contain"
      />
    </main>
  );
}
