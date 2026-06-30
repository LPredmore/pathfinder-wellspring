# Phase 1: Conversion Foundation

Restructure ValorWell around the mission and 5 conversion paths. Scope is strictly Phase 1 — pages listed below plus nav and footer. No Media page build, no Phase 2+ work.

## Pages

### 1. Homepage `/` — rewrite `src/pages/Index.tsx`
Replace existing hero/services/CTA structure with 9 sections from the brief:
1. Hero — "Veterans and families deserve better than waiting months for help." + dual CTA (Get Care, Fund Access to Care) + tagline "ValorWell is the mission. BestSelfs helps power it."
2. The Broken System
3. What ValorWell Is Building (6 cards)
4. Two Main Paths (Need Care / Want to Help)
5. BestSelfs Helps Power the Mission → `/bestselfs`
6. Media / Education / Community → external YouTube (Media page deferred to Phase 2)
7. Supporter Section → `/fund-access-to-care`
8. Impact Preview — metric cards with "Impact tracking coming soon" placeholders
9. Final CTA (Get Care, Fund Access to Care, Explore BestSelfs)

Reuse existing imagery (`hero-family.jpg`, `flag-sky-background.png`) — no new image generation. Tone shifts away from heavy flag/patriot motifs toward serious, mission-driven typography.

### 2. `/get-care` — new `src/pages/GetCare.tsx`
Sections: Hero, Who We Help, What We Provide, Documentation Support Note (ethical wording verbatim from brief), What to Expect (5 steps), CTA. Single CTA "Start Care" routes to existing `/get-started` (preserves intake form).

### 3. `/fund-access-to-care` — new `src/pages/FundAccessToCare.tsx`
Sections: Hero, Problem, What Your Support Helps Build (5 cards), $75 Session Cost Explanation (uses exact brief wording with "direct therapist cost" framing), Giving Tiers ($25/$75/$150/$300/Custom), Monthly Supporter, Sponsor (contact link), Trust/Impact placeholders. Donate buttons route to existing Givebutter redirect (`/donate`) to preserve current donation flow.

### 4. `/bestselfs` — new `src/pages/BestSelfs.tsx`
Sections: Hero, Product Cards (CoreFeel → `/corefeel`, VibeTales → `/vibetales`, NinjaDo → `/ninjado`, Future Tools), Mission Connection. "ValorWell is the mission. BestSelfs helps power it."

### 5. `/about` — rewrite `src/pages/About.tsx`
Sections: Hero, Origin/Why This Exists, What Makes ValorWell Different (6 cards), CTA (Get Care, Support the Mission).

### 6. `/impact` — new `src/pages/Impact.tsx`
Sections: Hero, Current Impact Metrics (placeholders clearly editable, $75/session line), What We Track, Transparency Note.

## Routing

`src/App.tsx`:
- Add routes: `/get-care` → GetCare, `/fund-access-to-care` → FundAccessToCare, `/bestselfs` → BestSelfs, `/impact` → Impact
- Keep `/therapy`, `/get-started`, `/support`, `/donate`, `/corefeel`, `/vibetales`, `/ninjado`, `/foundation`, all admin/portal/competition routes — untouched.
- Add legacy redirects: `/therapy` → `/get-care`, `/support` → `/fund-access-to-care` via `<Navigate replace>` so old links and ads keep working.

## Navigation — `src/components/layout/Header.tsx`

Desktop nav links: Get Care · Support the Mission · BestSelfs · Media · Impact · About
- "Support the Mission" → `/fund-access-to-care`
- "Media" → external link to ValorWell YouTube (until Phase 2 page exists)
- Primary CTA buttons: **Get Care** (`/get-care`) and **Fund Access to Care** (`/fund-access-to-care`)
- Login dropdown + Mission Partner flow preserved unchanged
- Mobile menu mirrors desktop order; condensed CTA priority if cramped: Get Care, Support the Mission, BestSelfs, Impact, About

Remove the current "BTY" ribbon link from primary nav (moved to footer only — Beyond the Yellow stays reachable, just deprioritized in Phase 1 hierarchy).

## Footer — `src/components/layout/Footer.tsx`

Replace current 4-column layout with mission tagline block + link columns:
- Mission paragraph (verbatim from brief)
- Columns: Get Care · Fund Access to Care · BestSelfs · Media · Impact · About · Contact · Privacy Policy · Terms · Urgent Help
- Preserve Beyond the Yellow, Heroes for Heroes, Join Our Team, Foundation under a secondary "Programs" group so existing pages stay discoverable
- Keep `info@valorwell.org` contact

## SEO

Each new/rewritten page uses `<SEO>` with the exact titles + descriptions from the brief and `canonical` set to its own path. Homepage canonical stays `/`.

## Design direction

- Typography-led, serious, mission-driven. Existing semantic tokens (`navy`, `patriot-red`, `gold-accent`, `flag-sky`) reused; no new tokens, no hardcoded hex.
- High-contrast CTAs (existing `bg-patriot-red` for primary, outline for secondary).
- Mobile-first single-column → 2/3-up on `md`.
- No new generated imagery in Phase 1; reuse `src/assets/*` already in the repo.

## Preserved functionality

- Intake form at `/get-started` and `TherapistApplicationForm` flow
- Givebutter donate redirect at `/donate`
- Auth, admin dashboard, influencer portal, competitions, challenge, advocates, foundation
- All `trackAppOutboundClick` analytics, gtag.js, sitemap, robots
- Pendulo, CoreFeel, VibeTales, NinjaDo, SkillsQuest, BrightDeed product pages

## Out of scope (later phases)

- Media page build, Contact page rewrite, real impact numbers, new imagery, Phase 2 conversion experiments, Cognitive Consistency content hub.

## Placeholders flagged for human review

- Impact metrics on `/` and `/impact` (sessions delivered, families served, supporter-funded care, BestSelfs revenue) — shown as "Coming soon"
- ValorWell YouTube channel URL for Media nav link — needs confirmation
- Sponsorship contact destination on `/fund-access-to-care` (defaults to `mailto:info@valorwell.org` unless told otherwise)
- "Ask About Sponsorship" form — Phase 1 uses mailto; dedicated form later
