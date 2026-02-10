

## New Page: Wall of Advocates (`/advocates`)

### Overview

Create a new `/advocates` page following the same patterns as the Competitions page. The page is a "coming soon" landing page that honors creators funding veteran therapy sessions, with CTAs to participate and an email signup form.

---

### Files to Create

**`src/pages/Advocates.tsx`**

Sections in order:

1. **Hero** -- H1 "Wall of Advocates", subtitle about honoring people funding sessions, "$50 sponsors 1 therapy session" badge, and two buttons at the top: "Support a Creator" (toast: "Competition starts on March 1, 2026") and "Sponsor a Session" (links to `https://valorwell.org/donate`)

2. **"What you'll see here"** -- A grid of 4 items with icons showing what the Wall will feature once live:
   - Explore creator profiles and "Why I'm here" videos
   - See how many sessions each advocate helped fund
   - Support an advocate directly through their fundraising page
   - Celebrate the community making direct care possible

3. **"How to get featured"** -- Content section explaining the 25-session ($1,250) threshold, with "Apply to Compete" button linking to `/competitions/apply`

4. **"Support the current challenge"** -- Two cards side by side:
   - "Support a Creator" card with toast notification button
   - "Sponsor Sessions Directly" card with link to `https://valorwell.org/donate`

5. **Email signup form** -- "Get notified when the Wall launches" section with:
   - Email input field
   - Optional "I'm a creator" checkbox
   - "Get Updates" submit button (shows a success toast on submit for now -- no backend wiring)
   - Privacy note in small text below

6. **Final line** -- Centered italic text: "This page exists for one reason: to honor the people who turn support into real treatment sessions."

---

### Files to Modify

**`src/App.tsx`**
- Import `Advocates` from `./pages/Advocates`
- Add route: `<Route path="/advocates" element={<Advocates />} />`

**`src/components/layout/Footer.tsx`**
- Add "Wall of Advocates" link to the `getInvolved` array with an `Award` icon (already imported)

---

### Technical Details

| Aspect | Detail |
|--------|--------|
| SEO title | "Wall of Advocates \| ValorWell" |
| SEO description | As provided in the brief |
| Canonical | `/advocates` |
| Schema | `BreadcrumbSchema` (Home > Wall of Advocates) |
| "Support a Creator" buttons | Trigger sonner toast: "Competition starts on March 1, 2026" (same pattern as Competitions page) |
| "Sponsor a Session" buttons | Link to `https://valorwell.org/donate` in new tab |
| Email form | Client-side only for now -- shows success toast on submit, no Supabase integration |
| Components used | `Layout`, `SEO`, `BreadcrumbSchema`, `ContentSection`, `Button`, `Card`, `Input`, `Checkbox`, `Label`, `toast` from sonner |

