import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export function Masthead() {
  return (
    <header id="top" className="border-b border-border pb-12 pt-14 sm:pt-20">
      <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-primary">
        {profile.title}
      </p>
      <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-foreground/90">
        {profile.tagline}
      </p>

      <div className="mt-10">
        <p
          id="tenure-org"
          className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          {profile.tenure.org}
        </p>
        <dl aria-labelledby="tenure-org" className="mt-3 space-y-2">
          {profile.tenure.rows.map((row) => (
            <div key={row.period} className="grid grid-cols-[7rem_1fr] gap-4">
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

      <SocialLinks className="-ml-2 mt-10" />
    </header>
  );
}
