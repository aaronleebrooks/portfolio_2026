import { useEffect } from "react";
import { getApp } from "../apps/registry";

const HASH_PREFIX = "#/";

export function parseAppIdFromHash(hash: string): string | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const appId = hash.slice(HASH_PREFIX.length).split("/")[0];
  if (!appId || !getApp(appId)) return null;
  return appId;
}

export function setHashForApp(appId: string | null): void {
  const next = appId ? `${HASH_PREFIX}${appId}` : "";
  if (window.location.hash === next) return;
  window.history.replaceState(null, "", next || window.location.pathname);
}

/** Opens the app named in the URL hash once the shell is ready. */
export function useHashDeepLink(
  openApp: (appId: string) => void,
  enabled: boolean
): void {
  useEffect(() => {
    if (!enabled) return;

    const syncFromHash = () => {
      const appId = parseAppIdFromHash(window.location.hash);
      if (appId) openApp(appId);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [openApp, enabled]);
}
