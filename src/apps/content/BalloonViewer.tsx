import { useTranslation } from "react-i18next";
import { publicAssetUrl } from "../../utils/publicAssetUrl";

export function BalloonViewer() {
  const { t } = useTranslation();
  const src = publicAssetUrl("balloon.jpg");

  return (
    <figure className="flex h-full flex-col items-center gap-2 overflow-auto">
      <img
        src={src}
        alt={t("apps.balloon.alt")}
        className="max-h-full max-w-full object-contain"
      />
      <figcaption className="text-center text-xs italic text-gray-700">
        {t("apps.balloon.caption")}
      </figcaption>
    </figure>
  );
}
