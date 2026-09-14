---
name: Aaron Brooks Portfolio
description: A warm paper-and-ink portfolio with square corners, a three-voice type system, and a single measured column.
colors:
  foolscap: "oklch(0.964 0.016 85)"
  foolscap-raised: "oklch(0.988 0.008 85)"
  foolscap-sunken: "oklch(0.925 0.018 85)"
  ink: "oklch(0.245 0.03 62)"
  ink-medium: "oklch(0.31 0.03 62)"
  ink-soft: "oklch(0.455 0.024 70)"
  field-amber: "oklch(0.505 0.112 68)"
  field-amber-contrast: "oklch(0.985 0.01 85)"
  signal-red: "oklch(0.512 0.192 27.5)"
  lamp-black: "oklch(0.149 0.027 85.769)"
  lamp-black-raised: "oklch(0.29 0.044 75.542)"
  lamp-black-sunken: "oklch(0.341 0.053 75.403)"
  chalk: "oklch(0.972 0.009 85)"
  chalk-soft: "oklch(0.78 0.02 85)"
  field-amber-lit: "oklch(0.86 0.12 85)"
  signal-red-lit: "oklch(0.704 0.191 22.216)"
typography:
  display:
    fontFamily: "Fraunces Variable, ui-serif, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: "1"
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Fraunces Variable, ui-serif, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: "2.25rem"
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Fraunces Variable, ui-serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.75rem"
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.625"
    letterSpacing: "normal"
  body:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.625"
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: "1rem"
    letterSpacing: "0.1em"
rounded:
  none: "0rem"
  dot: "9999px"
spacing:
  card: "1.25rem"
  gutter: "1.5rem"
  section: "2.5rem"
  section-lg: "3.5rem"
  masthead-top: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.field-amber}"
    textColor: "{colors.field-amber-contrast}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "2.25rem"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "oklch(0.505 0.112 68 / 80%)"
    textColor: "{colors.field-amber-contrast}"
  button-outline:
    backgroundColor: "{colors.foolscap}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "2.25rem"
  button-outline-hover:
    backgroundColor: "{colors.foolscap-sunken}"
    textColor: "{colors.ink}"
  badge-secondary:
    backgroundColor: "{colors.foolscap-sunken}"
    textColor: "{colors.ink-medium}"
    rounded: "{rounded.none}"
    padding: "0.125rem 0.5rem"
    height: "1.25rem"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.foolscap-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.25rem"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.field-amber}"
    typography: "{typography.label}"
---

# Design System: Aaron Brooks Portfolio

## Overview

**Creative North Star: "The Field Notebook"**

This is a carried object, not a screen. The ground is warm writing paper, the text is brown ink rather than black, and the accent is a pigment dug out of the earth. Nothing in the neutral range is gray — every surface and every piece of text sits on the same narrow band of warm hue (62–86 in OKLCH), which is what separates this from the cool slate default it started from. The page should feel like something used: worked-in, a little soft, with the structure showing through rather than being styled over.

The form language is uncompromisingly square. `--radius` is `0rem`, and because every component's radius derives from it, the entire system collapses to hard corners — buttons that ask for `rounded-2xl` and cards that ask for `rounded-[min(var(--radius-4xl),24px)]` all render flat-cornered. This is the single most load-bearing decision in the system. One exception exists in the whole page: the 4px bullet dot in the Experience list, which uses a fixed `rounded-full`. That exception is the proof the rule is deliberate.

Type carries the hierarchy, because almost nothing else is allowed to. Three faces divide the labor cleanly — a serif names things, a sans explains them, a monospace labels them — and the layout is a single measured column with no sidebars, no cards-in-grids, and no competing regions. Depth comes from tone: a hairline ring and a slightly lifted card tint, not a shadow stack. Restraint here is not minimalism for its own sake; it is what lets dense, specific content sit on the page without the design arguing with it.

**Key Characteristics:**
- Warm neutrals only — no gray anywhere in the system
- Square corners everywhere, from one root token
- Three type faces with three non-overlapping jobs
- A single column at `48rem`, centered, with `1.5rem` gutters
- Tonal separation over shadow; flat at rest
- Uppercase monospace reserved exclusively for metadata

## Colors

A warm paper-and-ink palette that inverts into a banked-fire dark mode without ever passing through gray.

### Primary

- **Field Amber** (`oklch(0.505 0.112 68)`): The only accent in the system. It marks what is interactive or currently active — links, the active nav item, the primary button fill, the role line under the name, and the focus ring. In dark mode it inverts to **Field Amber Lit** (`oklch(0.86 0.12 85)`), a lighter warm gold, because the mid-dark original would disappear against the dark ground.
- **Field Amber Contrast** (`oklch(0.985 0.01 85)`): The near-white used for text on a filled amber surface. It is a warm off-white, not pure white — pure white would break the paper metaphor at the one place the eye is most likely to notice.

### Neutral

- **Foolscap** (`oklch(0.964 0.016 85)`): The page ground. A warm cream writing stock. Light product screenshots sit on it without glaring, which is why it was chosen over a brighter white.
- **Foolscap Raised** (`oklch(0.988 0.008 85)`): Card and popover surfaces. Lighter and *less* saturated than the page — the card lifts by getting closer to white, not by casting a shadow.
- **Foolscap Sunken** (`oklch(0.925 0.018 85)`): Secondary, muted, and accent fills. Badges, ghost-button hovers, and any recessed surface.
- **Ink** (`oklch(0.245 0.03 62)`): Primary text. A dark warm brown, never black. Also the source of both hairlines in light mode — borders at 16% alpha, inputs at 22%.
- **Ink Medium** (`oklch(0.31 0.03 62)`): Text on secondary and accent fills, such as badge labels.
- **Ink Soft** (`oklch(0.455 0.024 70)`): Body copy inside sections, inactive nav items, timestamps, and all monospace metadata. This is the workhorse text color — most prose on the page is Ink Soft, not Ink.

### Dark Theme

The same family inverted. Neutrals stay on the ground's hue rather than reverting to cool slate.

- **Lamp Black** (`oklch(0.149 0.027 85.769)`): The dark ground. Warm, not neutral — it reads as a room with a fire in it, not a void.
- **Lamp Black Raised** (`oklch(0.29 0.044 75.542)`): Card surfaces. Note this is a large jump from the ground (0.149 → 0.29), far more separation than the light theme uses.
- **Lamp Black Sunken** (`oklch(0.341 0.053 75.403)`): Secondary, muted, and accent fills.
- **Chalk** (`oklch(0.972 0.009 85)`): Primary text on dark.
- **Chalk Soft** (`oklch(0.78 0.02 85)`): Muted text on dark.
- Dark hairlines do **not** derive from the foreground the way light ones do. Borders are `oklch(0.752 0.147 83.988 / 18%)` and inputs `oklch(0.752 0.147 83.988 / 22%)` — a warm amber line, not a chalk one, so edges glow faintly rather than looking chalk-dusted.

### Signal

- **Signal Red** (`oklch(0.512 0.192 27.5)`, dark: `oklch(0.704 0.191 22.216)`): Destructive and invalid states. Present in the component primitives; currently unused by any shipped surface.

### Named Rules

**The No Gray Rule.** Every color in this system carries chroma on the warm band (hue 62–86). A neutral with chroma at or near zero is wrong, no matter how good it looks in isolation. Audit test: if a swatch reads as gray next to Foolscap, it does not belong.

**The One Accent Rule.** Field Amber is the only accent, and it means "interactive or active." It is never used decoratively, never used to add visual interest to a static block, and never joined by a second accent hue. If something needs emphasis and is not interactive, use weight, size, or Ink — not color.

**The Warm Inversion Rule.** Dark mode inverts lightness, never hue. Any dark-theme value that drifts off the warm band has broken the system, even if its contrast is fine.

## Typography

**Display Font:** Fraunces Variable (with `ui-serif, Georgia, serif`)
**Body Font:** Inter Variable (with `ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** JetBrains Mono Variable (with `ui-monospace, monospace`)

All three are self-hosted through Fontsource, latin-subset only, `font-display: swap`. Fraunces is loaded from the optical-size axis file (`fraunces-latin-opsz-normal.woff2`), matching Fontsource's own declaration.

**Character:** A high-contrast serif doing the naming, a neutral grotesque doing the explaining, and a monospace doing the labeling. The pairing is editorial rather than technical — Fraunces has enough warmth and quirk to carry the paper metaphor, while Inter stays out of the way so dense paragraphs stay readable. The monospace is what keeps it from reading as a magazine: it signals that an engineer built this.

### Hierarchy

- **Display** (Fraunces, 600, `3rem` / `3.75rem` at `sm`, line-height 1, tracking `-0.025em`): The name in the masthead. Used exactly once per page.
- **Headline** (Fraunces, 600, `1.875rem`, tracking `-0.025em`): Section headings — About, Experience, Projects, Contact. Always followed by `2rem` of space.
- **Title** (Fraunces, 600, `1.25rem`, tracking `-0.025em`): Job roles and project names. The smallest size at which Fraunces still appears.
- **Lead** (Inter, 400, `1.125rem`, line-height 1.625): The tagline under the name, constrained to `46ch`. The only lead-sized text in the system.
- **Body** (Inter, 400, `1rem`, line-height 1.625): All prose. Constrained to `68ch` in About and the footer, `36rem` in Contact.
- **Body Small** (Inter, 400, `0.875rem`, line-height 1.625): Experience bullets, project descriptions, card copy. Most of the page's actual reading is at this size.
- **Label** (JetBrains Mono, 400, `0.6875rem` / `0.75rem`, uppercase, tracking `0.1em`): Nav items, date ranges, skill category headers, project status lines, and tech badges. Never sentence case.

### Named Rules

**The Three Voices Rule.** Fraunces names things, Inter explains them, JetBrains Mono labels them. No face does another's job. A serif paragraph, a mono heading, or a sans metadata label is a system violation, not a variation.

**The Caps Are Metadata Rule.** Uppercase with `0.1em` tracking is reserved for monospace labels. Headings are never uppercase, body text is never uppercase, and buttons are never uppercase. When you see caps, it is machine-adjacent information: a date, a category, a status, a nav target.

**The Measure Rule.** Prose is always constrained by a character measure, never by the container alone — `46ch` for the tagline, `68ch` for body paragraphs. Full-width prose in a `48rem` column is a defect.

## Layout

A single centered column at `max-width: 48rem` with `1.5rem` horizontal gutters, and nothing outside it. No sidebar, no multi-column region, no full-bleed break. The entire page is one vertical read, which is what makes the sticky top bar's scroll-spy meaningful.

The masthead opens with `3.5rem` of top space (`5rem` at `sm`), closes with `3rem`, and is separated from the content by a single hairline border. Sections are rhythmically identical: `2.5rem` of vertical padding, rising to `3.5rem` at `sm`, with `scroll-mt-24` (`6rem`) reserving room for the sticky bar when a nav link jumps to them. Project cards stack in a one-column grid with `1.5rem` gaps — the grid never becomes multi-column at any breakpoint, because two cards side by side at `48rem` would make the screenshots illegible.

Two internal grids carry metadata in a left rail: the tenure rows in the masthead (`7rem` fixed first column) and the Experience date ranges (`8rem`, collapsing to stacked below `sm`). These are the only places the single column subdivides, and both revert to a plain vertical stack on narrow screens.

Responsive behavior is deliberately minimal — the system has one real breakpoint, Tailwind's `sm` (`40rem`), and it only adjusts type scale and vertical rhythm. There is no tablet layout and no desktop layout, because the column is already narrower than a tablet.

### Named Rules

**The Single Column Rule.** One column, `48rem`, centered. Any proposal that introduces a sidebar, a two-up card grid, or a full-bleed section is changing the system, not extending it.

**The One Breakpoint Rule.** `sm` (`40rem`) is the only breakpoint. If a change needs `md`, `lg`, or `xl` to work, the change is wrong for this layout.

## Elevation & Depth

**Depth is tone, not shadow.** Surfaces separate by lightness within the warm family: the card ground is lighter than the page in light mode (0.988 vs 0.964) and substantially lighter in dark mode (0.29 vs 0.149). A hairline ring at 5% foreground opacity (10% in dark) finishes the edge. That ring and that tint are the depth model.

Shadows exist but are deliberately marginal. Cards carry `shadow-sm` at rest — barely perceptible, effectively an edge-softener rather than a lift. On hover a card raises `0.375rem` and takes a larger amber-tinted shadow (`hover:shadow-lg hover:shadow-primary/10`), which is a courtesy to the pointer, not a statement about hierarchy. Nothing in the system uses shadow to rank content.

### Shadow Vocabulary

- **Resting** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): The default card state. Present, not visible.
- **Pointer lift** (`box-shadow: 0 10px 15px -3px oklch(0.505 0.112 68 / 0.1), 0 4px 6px -4px oklch(0.505 0.112 68 / 0.1)`): Hover only, paired with `translateY(-0.375rem)` over `300ms ease-out`, and gated behind `motion-safe:`.

### Named Rules

**The Tone Before Shadow Rule.** When a new surface needs separation, change its tone first. Reach for a shadow only when tone and the hairline ring have both failed, which on this palette is rare.

**The Lift Is A Response Rule.** Elevation only ever answers pointer intent. A card that is elevated at rest to signal importance is a violation — importance is expressed by order and type, not by height.

## Shapes

Square. `--radius: 0rem` at the root, and the full derived scale (`sm` through `4xl`) multiplies from it, so every radius in the system computes to zero. Components still carry their inherited utility classes — `rounded-2xl` on buttons and badges, `rounded-[min(var(--radius-4xl),24px)]` on cards, `rounded-md` on icon links — and all of them resolve flat. This is intentional and must survive any refactor: changing `--radius` is a redesign, not a tweak.

Edges are hairlines, never heavy rules. Borders sit at 16% foreground alpha in light mode and use a warm amber at 18% in dark. Project screenshots carry a `1px` border of the same token, which frames them as inset plates rather than floating images. Dividers appear in exactly two places: under the masthead and above the footer.

The surfaces the browser draws belong to the palette too. Text selection is Field Amber at 22% over unchanged Ink; the scrollbar thumb is Ink at 28% on a transparent track; and every monospace run carries `tabular-nums`, so date rails and figures stay in column. Left at their defaults these three are where a warm paper page silently reverts to system blue and system gray.

The sole curved element in the system is the Experience bullet — a `0.25rem` dot at `rounded-full`, filled with muted foreground at 60% opacity. It is the one place a circle is correct, because it is a typographic mark rather than a container.

### Named Rules

**The Square Corner Rule.** `--radius` is `0rem` and stays `0rem`. Do not introduce a component with a hardcoded radius, and do not "soften" the system with a small global radius. The hard corner is the notebook's cut edge; rounding it turns a field notebook into an app.

**The Hairline Rule.** Borders are hairlines at low alpha, never solid strokes at full opacity. If an edge needs more presence, change the surface tone behind it.

## Components

### Buttons

- **Character:** Refined and restrained. Square, tightly padded, flat-filled or hairline-outlined — never both.
- **Shape:** Hard corners (`0rem`), via the root radius token.
- **Primary:** Field Amber fill with warm off-white text. `2.25rem` tall at `lg`, `1rem` horizontal padding, `0.875rem` medium weight. Hover drops the fill to 80% opacity.
- **Outline:** Page-ground fill with a hairline border and Ink text; hover swaps the fill to Foolscap Sunken. In dark mode the fill goes fully transparent rather than taking the card tone.
- **Focus:** A `3px` ring at 30% Field Amber plus a solid border in the ring color. Global `:focus-visible` adds a `2px` outline at `2px` offset. Focus is always visible and always amber.
- **Active:** `translateY(1px)`. The only press feedback in the system.
- **Ghost / Link:** Ghost takes a muted fill on hover only. Link is amber text with a `4px` underline offset, underlined on hover.
- **Anything that navigates is a link.** Use `buttonVariants(...)` on an `<a>` rather than the Button primitive with a `render` prop — the primitive puts `role="button"` on the anchor, which announces a button that behaves like a link.
- **Outline is genuinely quiet.** A 16%-alpha hairline on the paper ground reads as text, not a control. When a secondary action has to look clickable on its own, use `secondary` (a Foolscap Sunken fill), not `outline`.

### Badges

- **Character:** Typographic chips, not buttons. They carry tech-stack terms and skill categories.
- **Style:** Foolscap Sunken fill, Ink Medium text, no border, `1.25rem` tall, `0.5rem` horizontal padding.
- **Typography:** Always overridden to monospace at `0.6875rem`, normal weight — the default sans-medium badge style is never used on this site.
- **State:** Static. Badges here are labels, not controls; they have no hover or selected state.

### Cards

- **Character:** Inset plates on paper. They hold a project and its evidence.
- **Corner Style:** Square (`0rem`).
- **Background:** Foolscap Raised, lighter than the page.
- **Border:** No border — a `1px` ring at 5% foreground (10% in dark) does the edge work.
- **Shadow Strategy:** See Elevation. Flat at rest, amber-tinted lift on hover, motion-gated.
- **Internal Padding:** `1.25rem` via a local `--card-spacing` custom property, which also drives the gap between card regions. Images that lead a card break the padding to sit flush at the top.
- **Composition:** A monospace status line, then the project name paired with an optional outbound link, then a description, then screenshots, then optional evidence link, then tech badges. That order is fixed.

### Images

- **Character:** Matted plates, not floating pictures.
- **Treatment:** Every screenshot sits inside a hairline-bordered container with `0.5rem` of mat. The mat is what gives the eye an edge to read; the border alone is too faint to do it.
- **Dark mode:** Product captures are pale application UI, so on the near-black ground they arrive as the brightest object on the page. They carry `brightness(0.93)` in dark — enough to stop them dominating, not enough to change anything the screenshot shows.
- **Contract:** Intrinsic `width` and `height` are required by the `Project` type, so every image reserves its box and nothing shifts. Below-the-fold images are `loading="lazy"`; the masthead capture is eager with `fetchPriority="high"`.
- **Portrait sets:** Phone captures sit two-up on a phone and three across from `sm`, never in a single row — at one row they rendered near a quarter of native width and stopped being legible.

### Navigation

- **Style:** Sticky top bar, full width, hairline bottom border, `background/85` with `backdrop-blur`. The content inside is constrained to the same `48rem` column as the page.
- **Typography:** Monospace labels at `0.6875rem`, uppercase, `0.1em` tracking.
- **Tap targets:** Every interactive target is at least `2.75rem` (44px) on its smallest axis, achieved with padding rather than visible size. An 11px label is a legitimate type choice; an 11px *target* is not.
- **States:** Inactive is Ink Soft; hover goes to Ink; active goes to Field Amber and carries `aria-current`. Active state is driven by scroll-spy (`IntersectionObserver`), not by click.
- **Mobile:** The name on the left is hidden below `sm`, leaving only the nav items and theme toggle. There is no hamburger and no drawer — four items fit.

### Social Links

- **Style:** Icon-only row at `1.25rem`, Ink Soft, hovering to Field Amber. Labels are available behind a `showLabels` prop but are off in the masthead.
- **Accessibility:** Every link carries an `aria-label`; icons are `aria-hidden`.

### Reveal

- **Character:** The system's only entrance motion.
- **Behavior:** Elements start at `opacity: 0` and `translateY(1.5rem)`, transitioning to rest over `0.5s ease-out` when they cross an IntersectionObserver threshold of 0.2 with a `-10%` bottom root margin. Project cards stagger at `0.05s` per index.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, reveal elements render at full opacity with no transform and no transition, and `scroll-behavior` drops to `auto`. This is non-negotiable and is covered by the e2e suite.

### Theme Toggle

- **Behavior:** Light ("paper") is the default for everyone, *including* visitors whose OS requests dark. The system deliberately does not honor `prefers-color-scheme` — dark is opt-in and remembered in `localStorage`, because auto-switching would hide the intended design from most visitors.
- **First paint:** An inline script in `index.html` restores a stored dark choice before React mounts, so there is no flash.
- **Style:** Icon-only, `1rem` icon, Ink Soft hovering to Field Amber. Shows the icon of the theme it will switch *to*.

## Do's and Don'ts

### Do:

- **Do** keep every neutral on the warm hue band (62–86 in OKLCH). Warm cream, warm brown, warm dark.
- **Do** derive all radii from `--radius`, and leave `--radius` at `0rem`.
- **Do** give each type face its assigned job: Fraunces names, Inter explains, JetBrains Mono labels.
- **Do** constrain prose with a character measure (`46ch` tagline, `68ch` body).
- **Do** separate surfaces by tone and a hairline ring before reaching for a shadow.
- **Do** gate every transform-based motion behind `motion-safe:` and honor `prefers-reduced-motion`.
- **Do** reserve Field Amber for interactive and active states only.
- **Do** keep the page a single `48rem` column with `sm` as the only breakpoint.
- **Do** mat every screenshot and dim it slightly in dark mode.
- **Do** give every interactive target a 44px minimum, using padding rather than size.

### Don't:

- **Don't** introduce a gray. A zero-chroma neutral breaks the paper metaphor immediately.
- **Don't** round a corner, including "just slightly" on a new component.
- **Don't** set headings, body text, or buttons in uppercase — caps belong to monospace metadata.
- **Don't** add a second accent color, or use Field Amber decoratively on non-interactive elements.
- **Don't** use shadow to signal importance or hierarchy; elevation answers pointer intent only.
- **Don't** put project cards in a multi-column grid — the screenshots stop being legible.
- **Don't** make the theme follow `prefers-color-scheme`. Paper is the default by design.
- **Don't** reach for `md`, `lg`, or `xl` breakpoints; if the layout needs them, the layout is wrong.
- **Don't** build a stat strip — big figure, small label, repeated across a row. The numbers here are exact and they belong inside the sentence that gives them meaning; lifted out into tiles they become decoration.
- **Don't** render a navigating element as a Button primitive with a `render` prop.
