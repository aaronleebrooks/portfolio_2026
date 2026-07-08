import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Clock() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time
      aria-label="Current time"
      dateTime={now.toISOString()}
      className="tabular-nums"
    >
      {formatTime(now)}
    </time>
  );
}
