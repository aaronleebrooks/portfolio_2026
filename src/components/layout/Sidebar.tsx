import { navItems, profile, type NavItemId } from "@/data/profile";
import { SocialLinks } from "@/components/SocialLinks";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activeId: NavItemId;
};

export function Sidebar({ activeId }: SidebarProps) {
  return (
    <header className="flex h-full flex-col justify-between py-12 lg:sticky lg:top-0 lg:max-h-screen lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          <a href="#about" className="hover:text-primary transition-colors">
            {profile.name}
          </a>
        </h1>
        <p className="mt-3 text-xl font-medium tracking-tight text-foreground/90">
          {profile.title}
        </p>
        <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
          {profile.tagline}
        </p>

        <nav aria-label="Primary" className="mt-12 hidden lg:block">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group flex items-center gap-3 py-1 font-mono text-xs uppercase tracking-widest transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px transition-all duration-300",
                        isActive
                          ? "w-12 bg-primary"
                          : "w-6 bg-muted-foreground/50 group-hover:w-12 group-hover:bg-foreground",
                      )}
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <SocialLinks className="mt-10" />
    </header>
  );
}
