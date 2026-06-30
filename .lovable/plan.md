# Phase 2: Media + Trust

Build the public media/trust layer on top of the Phase 1 conversion funnel. No Phase 3 SEO authority pages, no Phase 4 partner/funder infrastructure.

## Pages

### 1. `/media` — new `src/pages/media/MediaOverview.tsx`
Sections from brief:
1. Hero — "Better systems for harder conversations." + CTAs: Watch the Mission, Subscribe on YouTube, Be a Guest
2. Why Media Exists
3. Content Pillars (5 cards: Cognitive Consistency, Veteran Mental Health, Family Systems, Podcast Conversations, BestSelfs Tools)
4. Shorts vs Long-Form (two side-by-side cards)
5. Mission Connection → `/fund-access-to-care`
6. Final CTA (Subscribe / Fund Access / Be a Guest)

### 2. `/media/youtube-podcast` — new `src/pages/media/YouTubePodcast.tsx`
Hero, Featured Mission Video placeholder embed (`<div>` with editable placeholder block), 5 Conversation Category cards, Guest Format section → `/media/collaborate`, Subscribe CTA. Placeholder YouTube URL constant at top of file for easy swap.

### 3. `/media/cognitive-consistency` — new `src/pages/media/CognitiveConsistency.tsx`
Hero, What It Is, Why It Matters, The Consistency Test (6 numbered steps), Topic Areas (5 cards), Tone and Boundaries with bullet list, Connection to ValorWell → `/fund-access-to-care`, Watch/Follow (placeholder playlist embed + YouTube/TikTok/Instagram/Discussion buttons with placeholder hrefs).

### 4. `/media/collaborate` — new `src/pages/media/Collaborate.tsx`
Hero, Who We Want to Hear From (6 cards), Collaboration Types list, Good Fit Topics list, **Collaboration Form** (React + shadcn `Form`, fields per brief, submits via `mailto:info@valorwell.org` with structured body for Phase 2 — flagged for future Supabase backend), Final CTA.

### 5. `/media/community` — new `src/pages/media/Community.tsx` (included, scope is small)
Hero, Reddit placeholder link, discussion guidelines, story prompts, Cognitive Consistency prompts, veteran/family prompts, "not therapy / not crisis support" disclaimer with `/get-care` and `/urgent-help` CTAs, Support the Mission CTA.

All pages use existing `Layout` + `SEO` + shadcn `Card`/`Button`. SEO titles/descriptions verbatim from brief, canonical self-references each route.

## Routing — `src/App.tsx`
- Add: `/media`, `/media/youtube-podcast`, `/media/cognitive-consistency`, `/media/collaborate`, `/media/community`
- Existing `/videos` route kept; add lightweight link from `/media` → `/videos` ("Browse all videos") so the existing gallery stays discoverable.

## Navigation — `src/components/layout/Header.tsx`
- "Media" link target changes from `/videos` → `/media`.
- Add hover/click dropdown on Media (desktop): Overview, YouTube & Podcast, Cognitive Consistency, Collaborate, Community. Use existing shadcn `DropdownMenu` (already imported in Header).
- Mobile menu: expand "Media" inline with the 5 sub-links indented.
- Primary CTA buttons (Get Care, Fund Access) unchanged.

## Footer — `src/components/layout/Footer.tsx`
- Add a "Media" column (or extend existing one): Overview, YouTube & Podcast, Cognitive Consistency, Collaborate, Community.
- Keep all Phase 1 links intact.

## Internal linking
Added per brief: Homepage→Media (already present via nav, also add a contextual link in the existing Media/Education section block); Media→sub-pages; sub-pages→Fund Access / Collaborate / Support the Mission as specified.

## Design direction
Reuse Phase 1 semantic tokens (`navy`, `patriot-red`, `gold-accent`, `flag-sky`). Typography-led, serious tone. No new imagery generated. Embed/placeholder blocks use a bordered `aspect-video` container with a "Coming soon — editable placeholder" label so they're visually obvious but not jarring.

## Placeholders flagged for human review
- YouTube channel URL, mission video URL, playlist URLs
- TikTok / Instagram / Reddit URLs
- Podcast platform links (Spotify/Apple) — not in brief but stubbed in YouTube/Podcast page if room
- Collaboration form delivery (mailto for now; Supabase table + edge function later)
- Final copy review for Cognitive Consistency tone

## Out of scope
- Phase 3 SEO authority pages
- Phase 4 partner/funder infrastructure
- Real podcast RSS, real video embeds, real impact metrics
- Replacing `/videos` gallery (kept as-is, linked from `/media`)
