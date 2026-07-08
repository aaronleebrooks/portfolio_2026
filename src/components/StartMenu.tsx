import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { APPS } from "../apps/registry";
import { useAppLabels } from "../apps/useAppLabels";
import { useOpenApp } from "../apps/useOpenApp";

interface StartMenuProps {
  onClose: () => void;
}

function StartMenuItem({ appId, onClose }: { appId: string; onClose: () => void }) {
  const openApp = useOpenApp();
  const app = APPS.find((a) => a.id === appId);
  const { title } = useAppLabels(appId);
  if (!app) return null;

  return (
    <li>
      <button
        role="menuitem"
        type="button"
        className="flex w-full items-center gap-2 border-0 bg-transparent p-1 text-left hover:bg-blue-700 hover:text-white"
        onClick={() => {
          openApp(appId);
          onClose();
        }}
      >
        <span aria-hidden>{app.glyph}</span>
        {title}
      </button>
    </li>
  );
}

export function StartMenu({ onClose }: StartMenuProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
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
      aria-label={t("startMenu.aria")}
      className="window absolute bottom-9 left-1 w-60"
    >
      <div className="title-bar">
        <div className="title-bar-text">{t("startMenu.userName")}</div>
      </div>
      <div className="window-body">
        <ul className="m-0 list-none p-0">
          {APPS.map((app) => (
            <StartMenuItem key={app.id} appId={app.id} onClose={onClose} />
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
              {t("startMenu.shutDown")}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
