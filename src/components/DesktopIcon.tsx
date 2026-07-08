import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

interface DesktopIconProps {
  glyph: string;
  label: string;
  onOpen: () => void;
}

export function DesktopIcon({ glyph, label, onOpen }: DesktopIconProps) {
  const { t } = useTranslation();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t("desktop.openApp", { name: label })}
      onDoubleClick={onOpen}
      onKeyDown={onKeyDown}
      className="flex w-20 cursor-default flex-col items-center gap-1 rounded p-1 text-center text-white focus:outline focus:outline-1 focus:outline-dotted focus:outline-white"
    >
      <span aria-hidden className="text-3xl drop-shadow">
        {glyph}
      </span>
      <span
        className="text-xs drop-shadow"
        style={{ textShadow: "0 1px 2px #0008" }}
      >
        {label}
      </span>
    </div>
  );
}
