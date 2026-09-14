import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export function Masthead() {
  return (
    <header id="top" className="border-b border-border pb-12 pt-14 sm:pt-20">
      <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
        {profile.name}
      </h1>
      {/*
        No title line here. The tenure rail below states the title with dates,
        which is both more specific and more credible than a standalone label;
        repeating it above only made the masthead say it twice.
      */}
      <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-foreground/90">
        {profile.tagline}
      </p>

      {/*
        The mat matters in dark mode. These captures are pale application UI, so
        on the near-black ground they land as the brightest object on the page.
        Sitting them on the card tone with a hairline gives the eye an edge to
        read, so the screenshot looks framed rather than punched through.
      */}
      <figure className="mt-8">
        <div className="border border-border bg-card p-2">
          <img
            src={profile.hero.src}
            alt={profile.hero.alt}
            width={profile.hero.width}
            height={profile.hero.height}
            decoding="async"
            fetchPriority="high"
            className="h-auto w-full dark:brightness-[0.93]"
          />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {profile.hero.caption}
        </figcaption>
      </figure>

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
              <dt className="font-mono text-[11px] uppercase tracking-wide tabular-nums text-muted-foreground">
                {row.period}
              </dt>
              <dd className="text-sm leading-snug text-foreground/90">
                {row.role}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm font-medium text-foreground">
          {profile.tenure.note}
        </p>
        <p className="mt-2 max-w-[46ch] text-sm font-medium leading-snug text-foreground">
          {profile.tenure.lead}
        </p>
      </div>

      <SocialLinks className="-ml-2 mt-10" />
    </header>
  );
}
