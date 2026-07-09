import type { KeyboardEvent, MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface DesktopIconProps {
  glyph: string;
  label: string;
  href?: string;
  onOpen?: () => void;
}

export function DesktopIcon({ glyph, label, href, onOpen }: DesktopIconProps) {
  const { t } = useTranslation();
  const className =
    "flex w-20 cursor-default flex-col items-center gap-1 rounded p-1 text-center text-white no-underline focus:outline focus:outline-1 focus:outline-dotted focus:outline-white";

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        onOpen?.();
      }
    }
  };

  const onDoubleClick = (event: MouseEvent) => {
    if (href) {
      event.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    onOpen?.();
  };

  const onClick = (event: MouseEvent) => {
    if (href) event.preventDefault();
  };

  const content = (
    <>
      <span aria-hidden className="text-3xl drop-shadow">
        {glyph}
      </span>
      <span
        className="text-xs drop-shadow"
        style={{ textShadow: "0 1px 2px #0008" }}
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("desktop.openLink", { name: label })}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t("desktop.openApp", { name: label })}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      className={className}
    >
      {content}
    </div>
  );
}
