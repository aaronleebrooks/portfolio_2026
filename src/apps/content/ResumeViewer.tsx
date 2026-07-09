import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { publicAssetUrl } from "../../utils/publicAssetUrl";

const ZOOM_LEVELS = [0.75, 1, 1.25, 1.5] as const;

export function ResumeViewer() {
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoomIndex, setZoomIndex] = useState(1);
  const zoom = ZOOM_LEVELS[zoomIndex];
  const resumeUrl = publicAssetUrl("AaronBrooksResume.html");

  const downloadPdf = useCallback(() => {
    iframeRef.current?.contentWindow?.print();
  }, []);

  const zoomOut = () => setZoomIndex((i) => Math.max(0, i - 1));
  const zoomIn = () =>
    setZoomIndex((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1));

  return (
    <div className="flex h-full min-h-0 flex-col text-xs">
      <div
        className="flex gap-3 border-b border-[#aca899] bg-[#ece9d8] px-2 py-0.5"
        aria-hidden
      >
        <span>{t("apps.resume.menu.file")}</span>
        <span>{t("apps.resume.menu.edit")}</span>
        <span>{t("apps.resume.menu.view")}</span>
        <span>{t("apps.resume.menu.document")}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b border-[#aca899] bg-[#ece9d8] px-1 py-0.5">
        <button
          type="button"
          className="px-1"
          onClick={downloadPdf}
          aria-label={t("apps.resume.download")}
        >
          {t("apps.resume.download")}
        </button>
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
        <iframe
          ref={iframeRef}
          src={resumeUrl}
          title={t("apps.resume.viewerTitle")}
          className="mx-auto block w-full min-h-[560px] border border-[#404040] bg-white shadow-md"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            height: `${560 / zoom}px`,
          }}
        />
      </div>

      <div className="border-t border-[#aca899] bg-[#ece9d8] px-2 py-0.5">
        {t("apps.resume.status", {
          page: 1,
          total: 1,
          zoom: Math.round(zoom * 100),
        })}
      </div>
    </div>
  );
}
