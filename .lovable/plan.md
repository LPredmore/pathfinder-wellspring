## Goal
Clean up the bottom of the Operation Claims Success page so the asks feel tighter and the redundant "What Happens Next" section is removed.

## Changes

### 1. Clinicians ask — drop the "Ask 1" prefix
- Change eyebrow from `Ask 1 — Clinicians` to `Clinicians`.
- Leave the heading, body, 4-card `clinicianValues` grid, and both CTAs untouched.

### 2. Supporters & Amplifiers — rebrand and restyle
- Change eyebrow from `Ask 2 — Supporters & amplifiers` to `Supporters & Amplifiers`.
- Remove the "Clinical & Provider Groups" card from `leveragePaths` (it is implicit in the Clinicians ask above).
- Restyle the remaining 3 cards to match the Homepage **"What we're building right now"** hover-reveal square pattern:
  - Desktop: 3 equal `aspect-square` cards in a row. Each card shows a placeholder image with a dark gradient overlay, title visible by default, and description + CTA revealed on hover.
  - Mobile: single-open Accordion (imported from `@/components/ui/accordion`) with colored backgrounds, matching the Homepage mobile treatment.
- Generate 3 placeholder images (veteran/community theme, media/creator theme, supporter/connector theme) and wire them into the cards via `.asset.json` pointers.
- Preserve existing `track()` events and `goToForm()` calls on every CTA.

### 3. Remove "What Happens Next" section
- Delete the entire section block (eyebrow, heading, 5-step numbered cards, guardrail paragraph, and the surrounding `<section>` markup).
- Leave the Routing Form, FAQ, Final CTA, and Sticky CTA untouched.

### 4. Verify
- Run `npx tsc --noEmit` to confirm no type errors after the markup and data changes.

## Out of scope
- No changes above the "What We Need From You" section.
- No routing, tracking event name, or CTA destination changes.
- No new dependencies beyond the existing `@/components/ui/accordion` import.