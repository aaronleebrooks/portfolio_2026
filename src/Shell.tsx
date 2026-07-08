import { useState } from "react";
import { I18nSync } from "./i18n/I18nSync";
import { useOpenApp } from "./apps/useOpenApp";
import { BootSplash } from "./components/BootSplash";
import { Desktop } from "./components/Desktop";
import { Taskbar } from "./components/Taskbar";
import { useHashDeepLink } from "./routing/useHashDeepLink";

export function Shell() {
  const [booted, setBooted] = useState(false);
  const openApp = useOpenApp();

  useHashDeepLink(openApp, booted);

  if (!booted) {
    return (
      <>
        <I18nSync />
        <BootSplash onDone={() => setBooted(true)} />
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
