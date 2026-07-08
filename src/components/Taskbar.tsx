import { useState } from "react";
import { Clock } from "../Clock";
import {
  focusWindow,
  minimizeWindow,
} from "../features/windows/windowsSlice";
import { toggleMuted, useAppDispatch, useAppSelector } from "../store";
import { StartMenu } from "./StartMenu";

export function Taskbar() {
  const dispatch = useAppDispatch();
  const [startOpen, setStartOpen] = useState(false);
  const windows = useAppSelector((state) => state.windows.windows);
  const focusedId = useAppSelector((state) => state.windows.focusedId);
  const muted = useAppSelector((state) => state.settings.soundMuted);

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      <footer
        aria-label="Taskbar"
        className="relative flex h-9 items-center gap-1 bg-blue-800 px-1 text-white"
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={startOpen}
          onClick={() => setStartOpen((v) => !v)}
          className="rounded bg-green-600 px-3 py-1 font-bold italic"
        >
          start
        </button>

        <div className="flex flex-1 items-center gap-1 overflow-hidden">
          {windows.map((win) => {
            const active = focusedId === win.id && !win.minimized;
            return (
              <button
                key={win.id}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  dispatch(
                    active ? minimizeWindow(win.id) : focusWindow(win.id)
                  )
                }
                className={`max-w-40 truncate rounded px-2 py-1 text-left text-sm ${
                  active ? "bg-blue-600" : "bg-blue-700"
                }`}
              >
                {win.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 rounded bg-blue-700 px-2 py-1 text-sm">
          <button
            type="button"
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
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
