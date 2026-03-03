

## Plan: Add Donate Button to Competitor Cards

### What's happening now
The Challenge page queries the `influencers` table directly (filtering by `is_competing = true`) but never touches `current_competitors`. The `comp_link` field — which holds each competitor's unique Zeffy fundraising URL — lives in `current_competitors`, not `influencers`.

### What needs to change

**Single file: `src/pages/Challenge.tsx`**

1. **Fetch `comp_link` data**: After fetching influencers and platforms, also query `current_competitors` for `influencer_id` and `comp_link` where `influencer_id` is in the list of competing influencer IDs. Build a `Map<string, string>` mapping `influencer_id → comp_link`.

2. **Pass `compLink` to `CompetitorCard`**: Add a `compLink` prop (string or null) to the card component.

3. **Render a donate button**: At the bottom of `CardContent`, if `compLink` exists, render an anchor styled as a primary button: "Sponsor This Partner" linking to the `comp_link` URL (opens in new tab). Uses the existing `Button` component with `asChild` wrapping an `<a>` tag. If no `comp_link` is set, no button appears.

### No database or migration changes needed
The `current_competitors` table already has public SELECT via RLS, and `comp_link` is already populated for the competitors.

