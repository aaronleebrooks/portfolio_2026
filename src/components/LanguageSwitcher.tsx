import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../i18n/locales";
import { setLanguage, useAppDispatch, useAppSelector } from "../store";

const LOCALE_LABEL_KEYS: Record<SupportedLocale, string> = {
  en: "language.en",
  fr: "language.fr",
  es: "language.es",
};

export function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.settings.language);
  const { t } = useTranslation();

  return (
    <label className="flex items-center gap-1 text-xs">
      <span className="sr-only">{t("language.label")}</span>
      <select
        aria-label={t("language.label")}
        value={current}
        onChange={(event) =>
          dispatch(setLanguage(event.target.value as SupportedLocale))
        }
        className="max-w-24 rounded border border-blue-600 bg-blue-800 px-1 py-0.5 text-white"
      >
        {SUPPORTED_LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {t(LOCALE_LABEL_KEYS[locale])}
          </option>
        ))}
      </select>
    </label>
  );
}
