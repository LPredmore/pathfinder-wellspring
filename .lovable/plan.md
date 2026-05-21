
## Plan: Replace `/vibetales` with the bestselfs-family-hub version

### Goal
Recreate the bestselfs-family-hub `/vibetales` layout and copy in this project, adapted to ValorWell's components (Layout, SEO) and preserving the existing Google Ads outbound-click tracking.

### What gets ported

From `bestselfs-family-hub`:
- Hero (badge, serif headline, subhead, "Create a Story" + "For Tutors and Educators" CTAs, storybook visual card with sample sentence, sight-word chips, level/min-read line)
- "The problem" section
- "How VibeTales helps" 4-card grid (Personalized stories, Sight word practice, Fluency support, Meaningful lessons)
- "For tutors, educators, and special education support" section with feature list + disclaimer
- "Best for" tag cloud
- Final CTA (violet band) with "Open VibeTales" + Web/Google Play/App Store buttons

### Small changes for this site

1. **Wrap in ValorWell's `Layout`** (which renders Header/Footer) instead of bestselfs `Header`/`Footer`.
2. **Use ValorWell's `SEO` component** with the existing title/description style; drop the bestselfs `softwareApplicationSchema`/`breadcrumbSchema` helpers (not present here) — keep a simple SEO meta.
3. **Preserve outbound click tracking**: every external link to `webUrl`, `iosUrl`, `androidUrl` becomes a `Button` with `onClick={() => trackVibeTalesOutboundClick(url)}` (same pattern already in the current `VibeTales.tsx`). No raw `<a target="_blank">` for those three destinations.
4. **Keep the existing `gtag` page_view beacon** `useEffect` from the current page.
5. **Add the ValorWell mission line** under the hero (preserved from current page, lightly reworded to fit tone): *"50% of all VibeTales revenue funds mental health treatment for veterans through ValorWell."* — placed as a small highlight band below the hero so the veteran connection isn't lost.
6. **Colors**: keep the bestselfs violet + amber palette inline (as the source does) since it's brand color for VibeTales itself, not ValorWell chrome. Layout/Header/Footer remain on ValorWell's design tokens.
7. **Inline the content** directly in the page file (don't add a separate `vibetales-content.ts` — the strings only live in one place).
8. **Assets**: reuse the existing `@/assets/vibetales-logo.png` already in this project.

### Files

- **`src/pages/VibeTales.tsx`** — full rewrite to the ported layout, wrapped in `Layout`, with tracked CTAs and ValorWell mission strip.

No routing, no other files affected.
