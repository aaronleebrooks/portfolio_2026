import { navItems, profile, type NavItemId } from "@/data/profile";
import { cn } from "@/lib/utils";

type TopBarProps = {
  activeId: NavItemId;
};

export function TopBar({ activeId }: TopBarProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-3">
        <a
          href="#top"
          className="hidden font-heading text-base font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:inline"
        >
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-widest transition-colors",
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
      </div>
    </div>
  );
}
