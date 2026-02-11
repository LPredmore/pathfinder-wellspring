

## Rewrite: `/support` Page — "Support the Bridge Program"

### Overview

Replace the current emotional narrative `/support` page with a cleaner, action-oriented page focused on the Bridge Program, session sponsorship tiers, and monthly giving. Follows the same component patterns used in `/competitions` and `/advocates`.

---

### File to Modify

**`src/pages/Support.tsx`** — Full rewrite with these sections:

1. **SEO and Schema**
   - Title: "Support the Bridge Program | ValorWell"
   - Description: as provided
   - Canonical: `/support`
   - Keep `DonateActionSchema` and `BreadcrumbSchema` (Home > Support the Bridge Program)
   - Remove `VideoObjectSchema` (no video on this page)

2. **Hero section**
   - H1: "Support the Bridge Program"
   - Subtitle: "Fund real therapy sessions for veterans--when support can't wait."
   - Brief explanation paragraph about the Bridge Program
   - "$50 sponsors 1 therapy session" badge (same style as Competitions page)
   - Two buttons: "Sponsor a Session" (primary, links to `https://valorwell.org/donate`, new tab) and "Become a Monthly Sponsor" (outline, same link)

3. **"What the Bridge Program Does" section**
   - `ContentSection` with the two paragraphs explaining how donations fund sessions during gaps in access

4. **"Why Continued Support Matters" section**
   - Content section with intro text and a styled bullet list for monthly sponsorship benefits (predictable funding, prevents interruptions, allows planning, stable bridge)
   - Closing line: "If you've ever wanted to help veterans in a way that is measurable and immediate, this is it."

5. **"What Your Gift Funds" section**
   - One-time gift tiers in a 2x2 grid ($50/$100/$250/$500) — same chip style as Competitions page
   - Monthly sponsorship tiers in a styled list ($50/mo, $100/mo, $250/mo)
   - CTA button: "Sponsor Sessions Now" linking to `https://valorwell.org/donate`

6. **"Other Ways to Help" section**
   - Three bullet points (share campaign, encourage creator, invite workplace)
   - CTA button: "View Competitions" linking to `/competitions`

7. **"Transparency and Accountability" section**
   - Brief text about measurable reporting
   - Styled list: sessions funded, monthly sponsor growth, creator challenge outcomes
   - Note: "(We'll publish updates as the program grows.)"

---

### Technical Details

| Aspect | Detail |
|--------|--------|
| Components used | `Layout`, `SEO`, `DonateActionSchema`, `BreadcrumbSchema`, `ContentSection`, `Button`, `Card`, `Link` |
| Removed | `VideoObjectSchema`, YouTube embed, old emotional narrative, Heart icon |
| All donation links | `https://valorwell.org/donate` opening in new tab |
| Pattern | Matches Competitions page styling (badge, grid chips, section spacing) |
| No new files | Only `src/pages/Support.tsx` is modified |

