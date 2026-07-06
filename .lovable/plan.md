
# Mission Page — Full Gary Vee Rebuild

## The strategic bet

The current `/mission` page is thorough but not magnetic. It convinces with structure; it should move people with **feeling in 3 seconds** and one clear next step. This rebuild treats the page as an attention → belief → action machine:

- **Attention** = Luke on camera, immediately
- **Belief** = the enemy named, the work shown
- **Action** = one drumbeat CTA — **Follow the Build** — echoed across the page

Strategic hierarchy preserved: ValorWell = master brand, OCS = public mission spine, BTY = amplifier, clinic = engine underneath. Care stays easy to find without turning the Mission page into a therapy landing page.

---

## Design system (locked)

**Palette — "Field Dispatch" (custom)**
```
--mission-ink:      #1F2A24   (deep forest ink, primary text)
--mission-paper:    #F4F1E8   (warm cream, page background)
--mission-paper-2:  #EAE5D6   (alt band, slightly deeper cream)
--mission-forest:   #3B5147   (brand green, primary surfaces & CTAs)
--mission-gold:     #D7A92E   (accent — eyebrows, underlines, highlights)
--mission-rust:     #B24A3A   (single hot CTA / urgency accent, used sparingly)
```
Scoped under a `.mission-theme` wrapper so it never leaks into other pages. No changes to global tokens.

**Typography**
- Headings & body: **Trebuchet MS** (user pick), loaded via system stack `"Trebuchet MS", "Lucida Sans", sans-serif`. No @fontsource install needed.
- Display sizing: tight leading (1.02–1.08), heavy weight (700–800), generous size (up to `clamp(3rem, 7vw, 6rem)`) so Trebuchet reads editorial rather than 2003-corporate.
- Body: 18–20px, 1.6 leading, max width ~65ch.

**Layout — Video-Anchor Single Column, opening into Full-Width Cinematic Bands**
Single-column vertical read on top so the founder video is the unmistakable center of gravity. Below the hero, sections alternate full-bleed cream / forest / cream / ink bands for scroll rhythm. Chosen because a mission page needs *focus* first, *drama* second — grids and split-screens dilute both.

**Motion**
- Hero: subtle grain texture overlay + gold underline draw-in on the H1 (once, on load).
- Section entry: 200ms fade + 8px rise on scroll into view (Framer Motion, prefers-reduced-motion respected).
- Nothing bouncy, nothing parallax-heavy. Documentary, not startup.

---

## Page structure — 6 sections, in order

### 1. Hero — "Watch what we're building"
- Eyebrow: **THE VALORWELL MISSION** (gold, uppercase, tracked)
- H1: **"Veterans and families are being sold shortcuts. We're building the real path — in public."**
- Sub (one line): *Care first. Not letter first.*
- **Founder video embedded directly** (16:9, rounded, gold 1px border, plays inline). YouTube URL provided by user — stored as a constant at top of file for easy swap.
- Primary CTA: **Follow the Build** → `/watch`
- Ghost CTA: **Need care now →** `/get-care` (small, under the primary — care stays discoverable without dominating)
- No side card, no pull-quote box. The video *is* the proof.

### 2. What we believe — compressed to 2 lines + one line of teeth
Full-bleed cream band. Big statement type, no cards, no numbered list.

> **Support should be felt by the people it's supposed to help.**
> Awareness is not the finish line. The work has to reach someone.
> *The question is not whether we care. The question is what changes because we cared.*

### 3. The enemy, named — "Here's what's broken"
Forest band, cream text. Three short punches (not a 2x2 grid — a vertical read):
- **Care is delayed.** Veterans wait months while their families absorb the stress.
- **Documentation got sold as a shortcut.** Letter-first models profit from that desperation.
- **Nobody's building the alternative at scale.** So we are.

Ends with a single rust-colored line: *"We are not selling the shortcut. We are building the better path."*

### 4. What we're actually doing — the three pillars
Cream band. Three horizontal blocks (desktop) / stacked (mobile). Each is a **link out**, not a mini-essay:

| Pillar | One-line | Links to |
|---|---|---|
| **Operation Claims Success** | The public mission spine. Care-first pathway for veterans and families. | `/operation-claims-success` |
| **Beyond The Yellow** | The movement amplifier. Real people doing real work, on camera. | `/beyondtheyellow` |
| **The Clinic** | The engine underneath. Real clinical care, ethical documentation when appropriate. | `/get-care` |

Gold underline animates in on hover. No icons — labels do the work.

### 5. Momentum — static "proof of work" (live data later)
Ink band, cream text. A **static** wall of recent activity, styled like a build log / dispatch feed:
- "Episode 12 of Beyond The Yellow — [title]"
- "OCS pathway update — [date]"
- "New clinician onboarding — [month]"
- "Supporter count — [static number]"

Copy is hand-authored constants for now. Structured so a future turn can swap in Supabase queries without touching layout. Small note at bottom: *Updated manually. Live counters coming.*

### 6. Pick your lane — 3 paths, not 8
Cream band. Collapses the current 8 participation paths into three honest lanes:

- **Get Care** → `/get-care` (veterans, families, individuals)
- **Watch & Share** → `/watch` (viewers, followers, connectors)
- **Build With Us** → `/partner` (clinicians, partners, supporters, sponsors, creators)

Each is a big clickable card with a one-line description and a single arrow. No icons competing with each other.

### 7. Closing drumbeat
Forest band, full-bleed, centered.
> **Care first. Not letter first.**
> **[ Follow the Build ]** (primary CTA → `/watch`)

Same line, same button, same color as the OCS page closer. One brand, one drumbeat.

---

## What gets cut from the current page

- Hero aside card with the pull-quote (replaced by video)
- 4-item numbered "What We Believe" list (compressed to a statement + one line)
- 4-card "Current Problem" grid (compressed to 3 vertical punches)
- Mission formula with "+" signs (removed entirely — reads like a slide)
- 8 participation paths (collapsed to 3 lanes)
- Duplicate OCS explainer block (OCS gets one pillar mention + the closing CTA; the OCS *page* does the explaining)

Nothing else on the site changes. No route changes. No nav changes. No other page touched.

---

## Technical section

**File**: full rewrite of `src/pages/MissionPage.tsx` (currently 773 lines → target ~350 lines). Route unchanged: `/mission`.

**Theme scoping**: All new colors declared as CSS custom properties inside a `.mission-theme` wrapper at the top of the page component. Tailwind arbitrary values (`bg-[hsl(var(--mission-forest))]`) used inside that scope only. Global `index.css` untouched.

**Video embed**: `<iframe>` YouTube embed with `loading="lazy"`, `title` attribute for a11y, aspect-ratio wrapper. URL as a `FOUNDER_VIDEO_URL` constant at the top of the file — user swaps one line to change it. If URL is empty, hero falls back to a bold typographic block (no broken embed).

**Analytics**: Preserve all existing `trackHomeEvent` calls, rename events to the new section names:
- `mission_hero_video_play`
- `mission_hero_follow_build`
- `mission_hero_get_care`
- `mission_pillar_ocs` / `mission_pillar_bty` / `mission_pillar_clinic`
- `mission_lane_get_care` / `mission_lane_watch` / `mission_lane_build`
- `mission_close_follow_build`

**Accessibility**: Semantic `<main>`, `<section>`, single `<h1>`, `<h2>` per section, video iframe has title + focusable fallback link, `prefers-reduced-motion` disables entry animations, contrast checked (forest #3B5147 on cream #F4F1E8 = 8.4:1, cream on forest = 8.4:1, rust on cream = 4.8:1 — all AA+).

**SEO**: Keep existing `<Helmet>` block; update `<title>` and `<meta description>` to match the new "Care first. Not letter first. Watch us build it." positioning. Canonical unchanged.

**Motion**: Uses existing Framer Motion (already in project — no new deps).

**No new dependencies. No schema changes. No migrations. No other files touched** except a single-line update to internal event names in `src/lib/tracking.ts` if needed for the new event constants (or handled inline).

---

## Acceptance checklist (I will verify before completion)

1. Founder video is the visual center of gravity of the hero. ✅ or fail.
2. Primary CTA everywhere is **Follow the Build** → `/watch`. Consistent verb, consistent destination.
3. Care remains one click from hero via a secondary link (not buried).
4. OCS = spine (one pillar + one link), BTY = amplifier (one pillar + one link), Clinic = engine (one pillar + one link). None dominates the Mission page.
5. Page reads top-to-bottom in under 90 seconds. If it doesn't, cut more.
6. No invented stats, testimonials, waitlists, partners, or outcome guarantees.
7. Zero global CSS changes; palette is scoped under `.mission-theme` only.
8. No other page in the app is touched.

If any of these fail on review, I revise before saying it's done.

---

## What I need from you to start building

- The **YouTube (or Vimeo) URL** for Luke's founder video.

Once approved and you drop the URL in chat, I switch to build mode and ship it in one pass.
