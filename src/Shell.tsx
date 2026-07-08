import { useState } from "react";
import { BootSplash } from "./components/BootSplash";
import { Desktop } from "./components/Desktop";
import { Taskbar } from "./components/Taskbar";

export function Shell() {
  const [booted, setBooted] = useState(false);

  if (!booted) {
    return <BootSplash onDone={() => setBooted(true)} />;
  }

  return (
    <div className="flex h-full flex-col">
      <Desktop />
      <Taskbar />
    </div>
  );
}
