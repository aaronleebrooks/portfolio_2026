import { useTranslation } from "react-i18next";

export function useAppLabels(appId: string) {
  const { t } = useTranslation();
  return {
    title: t(`apps.${appId}.title`),
    iconLabel: t(`apps.${appId}.iconLabel`),
  };
}
