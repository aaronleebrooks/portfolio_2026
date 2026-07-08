import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { readStoredLocale, resources } from "./locales";

void i18n.use(initReactI18next).init({
  resources,
  lng: readStoredLocale(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
