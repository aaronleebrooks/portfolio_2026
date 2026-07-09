import { useTranslation } from "react-i18next";
import { APPS, getApp } from "../apps/registry";
import { useAppLabels } from "../apps/useAppLabels";
import { useOpenApp } from "../apps/useOpenApp";
import { Window } from "../features/windows/Window";
import { useAppSelector } from "../store";
import { DesktopIcon } from "./DesktopIcon";

function DesktopAppIcon({ appId }: { appId: string }) {
  const app = getApp(appId);
  const openApp = useOpenApp();
  const { iconLabel } = useAppLabels(appId);
  if (!app) return null;

  return (
    <DesktopIcon
      glyph={app.glyph}
      label={iconLabel}
      onOpen={() => openApp(appId)}
    />
  );
}

export function Desktop() {
  const { t } = useTranslation();
  const windows = useAppSelector((state) => state.windows.windows);
  const focusedId = useAppSelector((state) => state.windows.focusedId);

  return (
    <div
      className="relative flex-1 overflow-hidden bg-gradient-to-b from-sky-400 via-sky-500 to-green-600"
      aria-label={t("desktop.aria")}
    >
      <div className="absolute left-2 top-2 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
        {APPS.map((app) => (
          <DesktopAppIcon key={app.id} appId={app.id} />
        ))}
      </div>

      {windows.map((win) => {
        const app = getApp(win.appId);
        if (!app) return null;
        const { Content } = app;
        return (
          <Window key={win.id} window={win} focused={focusedId === win.id}>
            <Content />
          </Window>
        );
      })}
    </div>
  );
}
