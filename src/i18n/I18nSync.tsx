import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store";

/** Keeps i18next in sync with the Redux language setting. */
export function I18nSync() {
  const language = useAppSelector((state) => state.settings.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  return null;
}
