
# HomePage targeted edits

Scope: `src/pages/HomePage.tsx` only. No other files touched. No new deps.

## 1. Hero aside → YouTube Short placeholder

Replace the "Currently Building" card (lines ~162–189) with a 9:16 vertical YouTube Short placeholder that matches the existing `ClickToLoadYouTubeShort` component pattern already in the codebase.

- Add a `HERO_SHORT_VIDEO_ID` constant at the top of the file (empty string for now — user drops in a YouTube video ID later).
- Reuse `ClickToLoadYouTubeShort` from `@/components/ClickToLoadYouTubeShort` when the ID is set.
- When the ID is empty, render a bordered 9:16 placeholder box with a Play icon and "Founder short coming soon" caption so the layout doesn't collapse.
- Keeps the `lg:col-span-4` aside slot intact so the hero grid still balances at 8/4.

## 2. Reorder Current Initiatives

Reorder the `initiatives` array (lines 13–50) to: **Operation Claims Success → Beyond The Yellow → Real Medical Care**. No copy or styling changes, just array order (both desktop grid and mobile accordion pick this up automatically).

## 3. Choose Your Lane → 4 paths

Replace the 6-card array (lines ~506–548) with exactly the 4 lanes the user specified, in this order, keeping the existing card styling and grid:

1. **I'm a Veteran or Family Member** — "Understand the care-first mission and find the right place to start." → `Explore Veteran & Family Support` → `/veterans` — event `homepage_lane_veteran_family`
2. **I Need Mental Health Care** — "Looking for actual mental health support or a clearer care starting point?" → `Find Care` → `/get-care` — event `homepage_lane_care`
3. **I'm a Clinician** — "Help build ethical, care-first systems—not just fill appointment slots." → `Join the Clinician Mission` → `/clinicians` — event `homepage_lane_clinician`
4. **I Want to Join the Mission** — "Bring relationships, reach, resources, ideas, infrastructure, support, or the ability to help move the work." → `Join the Mission` → `/partner` — event `homepage_lane_join`

Change the grid to `md:grid-cols-2 lg:grid-cols-4` so all four lanes sit on one row on desktop, two-up on tablet, stacked on mobile.

## 4. Remove "Watch ValorWell" section entirely

Delete the whole `{/* 6. Watch / content growth engine */}` `<section>` block (lines ~418–490). Removes the dark full-bleed watch band and its 4 lane cards. No references to it exist elsewhere in the file.

## Technical notes

- Single file edit: `src/pages/HomePage.tsx`.
- Imports to add: `ClickToLoadYouTubeShort`. `Play` import stays (still used elsewhere in hero visuals if kept — will drop if it becomes unused after the Watch section is removed, along with any other now-unused lucide icons like `Radio`, `Wrench`, `Users`, `Hammer` if truly orphaned, to keep the file clean).
- No route, nav, SEO, or schema changes.
- No global CSS changes.
- All existing `trackHomeEvent` calls in untouched sections remain as-is; only the Choose Your Lane events are renamed to the 4 new ones above.

## Acceptance

- Hero shows the vertical Short placeholder in the right column; "Currently building" list is gone.
- Initiatives render as OCS → BTY → Real Medical Care on both desktop and mobile.
- Choose Your Lane shows exactly 4 cards with the exact copy and CTAs above.
- The dark "Watch ValorWell" section no longer appears between BTY and Choose Your Lane.
- No TypeScript or unused-import errors.
