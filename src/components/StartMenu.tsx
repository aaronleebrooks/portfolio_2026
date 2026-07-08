import { useEffect, useRef } from "react";
import { APPS } from "../apps/registry";
import { useOpenApp } from "../apps/useOpenApp";

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const openApp = useOpenApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    // Defer so the same click that opened the menu doesn't immediately close it.
    const id = window.setTimeout(
      () => document.addEventListener("pointerdown", onPointer),
      0
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.clearTimeout(id);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Start menu"
      className="window absolute bottom-9 left-1 w-60"
    >
      <div className="title-bar">
        <div className="title-bar-text">Aaron Brooks</div>
      </div>
      <div className="window-body">
        <ul className="m-0 list-none p-0">
          {APPS.map((app) => (
            <li key={app.id}>
              <button
                role="menuitem"
                type="button"
                className="flex w-full items-center gap-2 border-0 bg-transparent p-1 text-left hover:bg-blue-700 hover:text-white"
                onClick={() => {
                  openApp(app.id);
                  onClose();
                }}
              >
                <span aria-hidden>{app.glyph}</span>
                {app.title}
              </button>
            </li>
          ))}
          <li aria-hidden>
            <hr className="my-1" />
          </li>
          <li>
            <button
              role="menuitem"
              type="button"
              disabled
              className="w-full p-1 text-left text-gray-500"
            >
              Turn Off Computer…
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
