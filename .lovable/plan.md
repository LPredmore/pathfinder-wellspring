## Goal
Reskin `src/pages/HomePage.tsx` to match the "Field Dispatch" palette and typography used on `/mission`. No layout or content changes.

## Approach
Wrap the HomePage's returned JSX in a `home-theme` container (same technique as `mission-theme`) and inject the same scoped `<style>` block, so we get the palette + Trebuchet MS font system without polluting the global design tokens or affecting other pages.

Then replace the current color utility classes throughout HomePage with the Field Dispatch tokens.

## Palette tokens (scoped to HomePage only)
```
--mission-ink:      145 9% 15%    /* #1F2A24 */
--mission-paper:    43 40% 93%    /* #F4F1E8 — cream, dominant background */
--mission-paper-2:  44 33% 88%    /* #EAE5D6 — alt section background */
--mission-forest:   145 15% 27%   /* #3B5147 — primary dark */
--mission-gold:     42 71% 51%    /* #D7A92E — accent */
--mission-rust:     9 51% 46%     /* #B24A3A — one urgent moment */
```
Font: `"Trebuchet MS", "Lucida Sans", "Lucida Grande", sans-serif` on the wrapper + headings.

## Color mapping (existing → new)
- Section backgrounds currently on cream/white/muted → `bg-[hsl(var(--mission-paper))]`
- Alternating section backgrounds → `bg-[hsl(var(--mission-paper-2))]`
- Dark/full-bleed forest bands → `bg-[hsl(var(--mission-forest))]` with `text-[hsl(var(--mission-paper))]`
- Body text → `text-[hsl(var(--mission-ink))]` (with `/80` or `/75` for secondary)
- Eyebrows, numeric callouts, gold underlines, accent lines → `text-[hsl(var(--mission-gold))]`
- Primary CTA (light section) → `bg-[hsl(var(--mission-forest))] text-[hsl(var(--mission-paper))]` hover → `bg-[hsl(var(--mission-ink))]`
- Primary CTA (dark section) → `bg-[hsl(var(--mission-gold))] text-[hsl(var(--mission-ink))]` hover → `bg-[hsl(var(--mission-paper))]`
- Secondary link → `text-[hsl(var(--mission-ink))]/70` hover → `text-[hsl(var(--mission-rust))]`
- Card borders → `border-[hsl(var(--mission-ink))]/15`, hover → `border-[hsl(var(--mission-forest))]`
- One "urgent" accent (e.g. the "Need care now" line, initiative eyebrows on rust like Mission) → `text-[hsl(var(--mission-rust))]`

## Element-by-element pass on HomePage sections
1. **Hero** — cream bg + paper-grain, ink headline with `.gold-underline` on the key phrase, forest primary CTA, ink/70 secondary link, YouTube Short placeholder frame gets `border-[hsl(var(--mission-gold))]/70 bg-[hsl(var(--mission-forest))] text-[hsl(var(--mission-paper))]` (same as Mission).
2. **Identity strip** — full-bleed `bg-[hsl(var(--mission-forest))]` with cream text and gold eyebrow.
3. **Current Initiatives (OCS → BTY → Real Medical Care)** — paper background, rust eyebrows, ink headings, ink/80 body, forest "learn more" caret line.
4. **Pillars / momentum / static build-log** — paper-2 background band, gold numerals, ink headings, ink/80 body.
5. **Choose Your Lane (4 cards)** — paper-2 background, cards on `bg-[hsl(var(--mission-paper))]/60` with `border-[hsl(var(--mission-ink))]/15`, hover lifts to forest border + full paper bg (reuse `.lane-card` class from Mission by naming it the same in this scoped style block).
6. **Founder POV pull-quote** — italic forest text on paper.
7. **Closing full-bleed** — forest bg, cream text, gold CTA button with ink text.

## Technical notes
- Single file edit: `src/pages/HomePage.tsx`. No changes to `index.css`, `tailwind.config.ts`, or any other page — the theme stays scoped via the `.home-theme` wrapper, so the rest of the site (Header/Footer excluded from restyle) keeps its current tokens.
- Header/Footer are rendered by the page but keep their existing global styles; we only restyle what lives inside `<main>` on HomePage.
- Reuse the exact `<style>` block from MissionPage (renamed selector prefix to `.home-theme`) so utility classes like `.gold-underline`, `.paper-grain`, `.lane-card`, `.rise-in`, `.pillar-link` are available.
- No content edits: every heading, paragraph, CTA label, card copy, event tracking key, route, and section order stays exactly as-is.
- No layout edits: grid columns, spacing, section order, card counts, and component structure are untouched.
- Verification: after the edit, view `/` at 1280 wide via Playwright and confirm cream/forest/gold palette + Trebuchet MS is applied and Mission and Home read as one brand.
