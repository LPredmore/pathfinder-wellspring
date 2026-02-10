

## New Page: Creator Challenge — Sponsor a Veteran

### Overview

Create a new `/competitions` page showcasing the peer-to-peer fundraising competition. The page follows existing patterns (Layout wrapper, SEO component, content sections) and includes three participation paths, milestone info, prize details, and an FAQ accordion.

---

### Files to Create

**`src/pages/Competitions.tsx`**

A new page component structured into these sections:

1. **Hero section** — H1 "Creator Challenge: Sponsor a Veteran", subtitle about funding real therapy sessions, and the "$50 = 1 session" callout
2. **Three participation cards** — styled as a 3-column grid (stacking on mobile):
   - "Compete as a Creator" with bullet points and "Apply to Compete" button linking to `/competitions/apply`
   - "Support a Creator" with "Support a Creator" button (placeholder link `#support-creator`)
   - "Sponsor a Session" with suggested gift tiers ($50/$100/$250/$500) and two CTA buttons (placeholder links `#sponsor-session`)
3. **"What this is"** content section explaining the 30-day competition
4. **"How it works"** using the existing `StepsSection` component (3 steps: Apply, Fundraise, Donate)
5. **Eligibility and milestones** section with milestone highlights (10/25/50/Top 5) in a styled list
6. **Prize section** describing the resort vacation package
7. **FAQ accordion** using the existing `FAQSection` component with the 6 provided Q&A pairs
8. **Final CTA block** with three buttons: Sponsor a Session, Support a Creator, Apply to Compete

Uses existing components: `Layout`, `SEO`, `BreadcrumbSchema`, `ContentSection`, `StepsSection`, `FAQSection`, `CTABlock`-style patterns, `Button`, `Card`.

Placeholder links will use `#support-creator` and `#sponsor-session` with `TODO` comments for the Zeffy URLs.

---

### Files to Modify

**`src/App.tsx`**

- Import the new `Competitions` component
- Add route: `<Route path="/competitions" element={<Competitions />} />`

---

### Technical Details

| Aspect | Detail |
|--------|--------|
| SEO title | "Creator Challenge: Sponsor a Veteran \| ValorWell" |
| SEO description | As provided in the brief |
| Canonical | `/competitions` |
| Schema | `BreadcrumbSchema` (Home > Competitions) |
| Placeholder links | Zeffy links marked with `#sponsor-session` and `#support-creator` with TODO comments |
| Pattern followed | Same Layout + SEO + section structure as `/therapy` and `/support` pages |
| FAQ | Rendered via existing `FAQSection` accordion component |
| Participation cards | `Card` components in a responsive grid |

