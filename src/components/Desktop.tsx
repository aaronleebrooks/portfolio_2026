import { APPS, getApp } from "../apps/registry";
import { useOpenApp } from "../apps/useOpenApp";
import { Window } from "../features/windows/Window";
import { useAppSelector } from "../store";
import { DesktopIcon } from "./DesktopIcon";

export function Desktop() {
  const windows = useAppSelector((state) => state.windows.windows);
  const focusedId = useAppSelector((state) => state.windows.focusedId);
  const openApp = useOpenApp();

  return (
    <div
      className="relative flex-1 overflow-hidden bg-gradient-to-b from-sky-400 via-sky-500 to-green-600"
      aria-label="Desktop"
    >
      <div className="absolute left-2 top-2 flex flex-col gap-3">
        {APPS.map((app) => (
          <DesktopIcon
            key={app.id}
            glyph={app.glyph}
            label={app.iconLabel}
            onOpen={() => openApp(app.id)}
          />
        ))}
      </div>

      {windows.map((win) => {
        const app = getApp(win.appId);
        return (
          <Window key={win.id} window={win} focused={focusedId === win.id}>
            {app?.content}
          </Window>
        );
      })}
    </div>
  );
}
