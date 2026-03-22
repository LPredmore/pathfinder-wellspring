

## Plan: Rewrite Advocates Page as Corporate Sponsor Attraction

### What changes

**Hero section** — Remove "Coming soon," remove challenge references. Reframe as a public honor wall for organizations committed to ongoing support for veteran mental health. Keep the $75/session stat but frame it around sustained impact, not one-off donations.

**"How to Get Featured" section** — Replace challenge/creator language entirely. Reframe around ongoing commitment: companies that dedicate a portion of revenue, sponsor recurring sessions, or provide in-kind support. Emphasize that it's about consistency, not dollar amount. Replace the `CreatorApplicationForm` with a "Become a Sponsor" contact button (link to `/contact` or email). Remove the `CreatorApplicationForm` import.

**Hero subtext** — Add FOMO-driven language: public recognition, brand visibility alongside other mission-driven organizations, demonstrating corporate values to customers and employees.

**Sponsors section** — Keep VibeTales card as-is (it's already good). No changes needed.

**Final line** — Update to reinforce the ongoing commitment theme rather than just "support into sessions."

**SEO meta** — Update description to reflect corporate sponsorship focus, remove creator/challenge language.

### Files changed

**`src/pages/Advocates.tsx`** — Full rewrite of copy in hero, "How to Get Featured" section, and closing. Remove `CreatorApplicationForm` import. Add a simple CTA button linking to `/contact` in the featured section.

