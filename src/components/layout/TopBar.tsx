import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems, profile, type NavItemId } from "@/data/profile";
import { cn } from "@/lib/utils";

type TopBarProps = {
  activeId: NavItemId;
};

export function TopBar({ activeId }: TopBarProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-2">
        <a
          href="#top"
          className="hidden font-heading text-base font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:inline"
        >
          {profile.name}
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    // "location" is the correct token for an in-page position;
                    // "true" asserts this is the current *page*, which it isn't.
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      // The bare text box was a ~50x16px tap target. The inline
                      // padding is what makes it thumb-sized without changing
                      // how the bar looks.
                      "-mx-1 inline-flex min-h-11 items-center px-1 font-mono text-[11px] uppercase tracking-widest transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
