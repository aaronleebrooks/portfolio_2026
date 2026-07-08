import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface BootSplashProps {
  onDone: () => void;
}

const BOOT_MS = 2400;
const REDUCED_MS = 300;

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function BootSplash({ onDone }: BootSplashProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const duration = prefersReducedMotion() ? REDUCED_MS : BOOT_MS;
    const id = window.setTimeout(onDone, duration);
    return () => window.clearTimeout(id);
  }, [onDone]);

  return (
    <div
      role="status"
      aria-label={t("boot.status")}
      onClick={onDone}
      className="flex h-full flex-col items-center justify-center gap-6 bg-black text-white"
    >
      <div className="text-center">
        <div className="text-4xl font-bold tracking-tight">
          Aaron<span className="text-orange-400">XP</span>
        </div>
        <div className="text-sm text-gray-400">{t("boot.tagline")}</div>
      </div>
      <div
        aria-hidden
        className="h-4 w-40 overflow-hidden rounded border border-gray-600"
      >
        <div className="boot-bar h-full w-1/3 bg-blue-500" />
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDone();
        }}
        className="text-xs text-gray-500 underline"
      >
        {t("boot.skip")}
      </button>
    </div>
  );
}
