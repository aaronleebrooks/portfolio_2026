import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppLabels } from "../apps/useAppLabels";
import { Clock } from "../Clock";
import {
  focusWindow,
  minimizeWindow,
} from "../features/windows/windowsSlice";
import { toggleMuted, setAccessibleMode, useAppDispatch, useAppSelector } from "../store";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { StartMenu } from "./StartMenu";

function TaskbarWindowButton({ appId }: { appId: string }) {
  const dispatch = useAppDispatch();
  const win = useAppSelector((state) =>
    state.windows.windows.find((w) => w.id === appId)
  );
  const focusedId = useAppSelector((state) => state.windows.focusedId);
  const { title } = useAppLabels(appId);

  if (!win) return null;

  const active = focusedId === win.id && !win.minimized;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() =>
        dispatch(active ? minimizeWindow(win.id) : focusWindow(win.id))
      }
      className={`max-w-40 truncate rounded px-2 py-1 text-left text-sm ${
        active ? "bg-blue-600" : "bg-blue-700"
      }`}
    >
      {title}
    </button>
  );
}

export function Taskbar() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [startOpen, setStartOpen] = useState(false);
  const windows = useAppSelector((state) => state.windows.windows);
  const muted = useAppSelector((state) => state.settings.soundMuted);

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      <footer
        aria-label={t("taskbar.aria")}
        className="relative flex h-9 items-center gap-1 bg-blue-800 px-1 text-white"
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={startOpen}
          onClick={() => setStartOpen((v) => !v)}
          className="rounded bg-green-600 px-3 py-1 font-bold italic"
        >
          {t("taskbar.start")}
        </button>

        <button
          type="button"
          className="rounded bg-blue-700 px-2 py-1 text-xs"
          onClick={() => dispatch(setAccessibleMode(true))}
        >
          {t("taskbar.plainResume")}
        </button>

        <div className="flex flex-1 items-center gap-1 overflow-hidden">
          {windows.map((win) => (
            <TaskbarWindowButton key={win.id} appId={win.appId} />
          ))}
        </div>

        <div className="flex items-center gap-2 rounded bg-blue-700 px-2 py-1 text-sm">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={muted ? t("taskbar.unmute") : t("taskbar.mute")}
            aria-pressed={!muted}
            onClick={() => dispatch(toggleMuted())}
            className="border-0 bg-transparent p-0 text-white"
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <Clock />
        </div>
      </footer>
    </>
  );
}
