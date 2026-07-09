import { useState } from "react";
import { useTranslation } from "react-i18next";
import { publicAssetUrl } from "../../utils/publicAssetUrl";

const ZOOM_LEVELS = [0.75, 1, 1.25, 1.5] as const;

export function ResumeViewer() {
  const { t } = useTranslation();
  const [zoomIndex, setZoomIndex] = useState(1);
  const zoom = ZOOM_LEVELS[zoomIndex];
  const resumeImageUrl = publicAssetUrl("AaronBrooksResume.jpeg");
  const resumePdfUrl = publicAssetUrl("AaronBrooksResume.pdf");

  const zoomOut = () => setZoomIndex((i) => Math.max(0, i - 1));
  const zoomIn = () =>
    setZoomIndex((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1));

  return (
    <div className="flex h-full min-h-0 flex-col text-xs">
      <div
        className="flex shrink-0 gap-3 border-b border-[#aca899] bg-[#ece9d8] px-2 py-0.5"
        aria-hidden
      >
        <span>{t("apps.resume.menu.file")}</span>
        <span>{t("apps.resume.menu.edit")}</span>
        <span>{t("apps.resume.menu.view")}</span>
        <span>{t("apps.resume.menu.document")}</span>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1 border-b border-[#aca899] bg-[#ece9d8] px-1 py-0.5">
        <a
          href={resumePdfUrl}
          download="AaronBrooksResume.pdf"
          className="px-1 text-inherit no-underline"
          aria-label={t("apps.resume.download")}
        >
          {t("apps.resume.download")}
        </a>
        <span aria-hidden className="text-[#aca899]">
          |
        </span>
        <button
          type="button"
          className="px-1"
          onClick={zoomOut}
          disabled={zoomIndex === 0}
          aria-label={t("apps.resume.zoomOut")}
        >
          −
        </button>
        <button
          type="button"
          className="px-1"
          onClick={zoomIn}
          disabled={zoomIndex === ZOOM_LEVELS.length - 1}
          aria-label={t("apps.resume.zoomIn")}
        >
          +
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-[#808080] p-2">
        <div
          className="mx-auto flex h-full w-full items-center justify-center"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <img
            src={resumeImageUrl}
            alt={t("apps.resume.viewerTitle")}
            draggable={false}
            className="h-full w-full border border-[#404040] bg-white object-contain shadow-md"
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-[#aca899] bg-[#ece9d8] px-2 py-0.5">
        {t("apps.resume.status", {
          page: 1,
          total: 1,
          zoom: Math.round(zoom * 100),
        })}
      </div>
    </div>
  );
}
