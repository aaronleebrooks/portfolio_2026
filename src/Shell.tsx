import { useState } from "react";
import { I18nSync } from "./i18n/I18nSync";
import { useOpenApp } from "./apps/useOpenApp";
import { AccessibleView } from "./components/AccessibleView";
import { BootSplash } from "./components/BootSplash";
import { Desktop } from "./components/Desktop";
import { Taskbar } from "./components/Taskbar";
import { useHashDeepLink } from "./routing/useHashDeepLink";
import { setAccessibleMode, useAppDispatch, useAppSelector } from "./store";

export function Shell() {
  const dispatch = useAppDispatch();
  const accessibleMode = useAppSelector((state) => state.settings.accessibleMode);
  const [booted, setBooted] = useState(false);
  const openApp = useOpenApp();

  useHashDeepLink(openApp, booted && !accessibleMode);

  if (!booted) {
    return (
      <>
        <I18nSync />
        <BootSplash onDone={() => setBooted(true)} />
      </>
    );
  }

  if (accessibleMode) {
    return (
      <>
        <I18nSync />
        <AccessibleView onExit={() => dispatch(setAccessibleMode(false))} />
      </>
    );
  }

  return (
    <>
      <I18nSync />
      <div className="flex h-full flex-col">
        <Desktop />
        <Taskbar />
      </div>
    </>
  );
}
