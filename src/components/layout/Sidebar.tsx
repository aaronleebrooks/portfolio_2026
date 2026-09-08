import { navItems, profile, type NavItemId } from "@/data/profile";
import { SocialLinks } from "@/components/SocialLinks";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activeId: NavItemId;
};

export function Sidebar({ activeId }: SidebarProps) {
  return (
    <header className="flex h-full flex-col justify-between py-12 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">
      <div>
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          <a href="#about" className="hover:text-primary transition-colors">
            {profile.name}
          </a>
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-primary">
          {profile.title}
        </p>
        <p className="mt-5 max-w-xs text-base leading-relaxed text-foreground/90">
          {profile.tagline}
        </p>

        <div className="mt-8 max-w-xs">
          <p
            id="tenure-org"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            {profile.tenure.org}
          </p>
          <dl aria-labelledby="tenure-org" className="mt-3 space-y-2">
            {profile.tenure.rows.map((row) => (
              <div
                key={row.period}
                className="grid grid-cols-[5.25rem_1fr] gap-3"
              >
                <dt className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {row.period}
                </dt>
                <dd className="text-sm leading-snug text-foreground/90">
                  {row.role}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-primary">{profile.tenure.note}</p>
        </div>

        <nav aria-label="Primary" className="mt-10 hidden lg:block">
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
