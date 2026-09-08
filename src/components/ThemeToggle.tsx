import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Paper is the default for everyone, including people whose OS asks for dark.
 * Auto-switching would hide the intended design from most visitors, so dark is
 * opt-in and remembered instead.
 */
export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // Private windows and blocked site data make storage throw on access.
    return null;
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // The choice just will not survive a reload.
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    storeTheme(theme);
  }, [theme]);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {theme === "dark" ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
