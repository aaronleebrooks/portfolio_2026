import { useTranslation } from "react-i18next";

const PROFILE_URL = "https://linkedin.com/in/aaronleebrooks";

export function LinkedInApp() {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p>{t("apps.linkedin.body")}</p>
      <p>
        <a href={PROFILE_URL} target="_blank" rel="noreferrer noopener">
          {PROFILE_URL}
        </a>
      </p>
      <button
        type="button"
        className="default"
        onClick={() => window.open(PROFILE_URL, "_blank", "noopener,noreferrer")}
      >
        {t("apps.linkedin.open")}
      </button>
    </div>
  );
}
