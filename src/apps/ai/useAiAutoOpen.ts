import { useEffect } from "react";
import { markAutoOpened, openChat } from "../../features/ai/aiSlice";
import { useAppDispatch, useAppSelector } from "../../store";

export const AI_AUTO_OPEN_MS = 1000;
export const AI_AUTO_OPEN_REDUCED_MS = 0;

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * ~1s after the desktop is ready, open the AIM chat once.
 * If the user previously closed it (`open === false` persisted), skip auto-open.
 * If it was left open (`open === true` persisted), keep it open and mark handled.
 */
export function useAiAutoOpen(enabled: boolean): void {
  const dispatch = useAppDispatch();
  const autoOpened = useAppSelector((state) => state.ai.autoOpened);
  const open = useAppSelector((state) => state.ai.open);
  const hasPersistedPreference = useAppSelector(() => {
    try {
      return localStorage.getItem("aiChat") !== null;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!enabled || autoOpened) return;

    // User previously closed the chat — respect that and don't reopen.
    if (hasPersistedPreference && !open) {
      dispatch(markAutoOpened());
      return;
    }

    // Already restored open from persistence — don't steal focus / re-animate.
    if (open) {
      dispatch(markAutoOpened());
      return;
    }

    const delay = prefersReducedMotion()
      ? AI_AUTO_OPEN_REDUCED_MS
      : AI_AUTO_OPEN_MS;

    const id = window.setTimeout(() => {
      dispatch(openChat());
      dispatch(markAutoOpened());
    }, delay);

    return () => window.clearTimeout(id);
  }, [enabled, autoOpened, open, hasPersistedPreference, dispatch]);
}
