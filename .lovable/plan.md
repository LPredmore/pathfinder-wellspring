

## Rename /competitions to /beyondtheyellow

### Overview

Rename the route, update all internal links, and change display text from "Competition" / "Creator Challenge" to "Beyond the Yellow" across the site. No content changes to the page itself (that's coming later).

### Changes

**1. `src/App.tsx`**
- Change import name: `Competitions` stays as the component name (file rename is cosmetic and not required since the page will be revamped anyway)
- Change route path from `/competitions` to `/beyondtheyellow`

**2. `src/components/layout/Footer.tsx`** (line 18)
- Change `{ name: "Competition", href: "/competitions" }` to `{ name: "Beyond the Yellow", href: "/beyondtheyellow" }`

**3. `src/pages/Support.tsx`** (line 189)
- Change `<Link to="/competitions">View Competitions</Link>` to `<Link to="/beyondtheyellow">Beyond the Yellow</Link>`

**4. `src/pages/Competitions.tsx`**
- Update `canonical` from `/competitions` to `/beyondtheyellow`
- Update breadcrumb name from `"Creator Challenge"` to `"Beyond the Yellow"` and URL to `/beyondtheyellow`
- Update `<h1>` from `"Creator Challenge: Sponsor a Veteran"` to `"Beyond the Yellow"` (keeping the subtitle as-is for now since a full revamp is coming)

**5. No changes to**:
- `CreatorApplicationForm.tsx` -- internal form copy, not navigation
- `Advocates.tsx` -- mentions "Creator Challenge" in body text, not a heading or link
- The filename `Competitions.tsx` -- since the page will be fully revamped soon anyway

### Files Modified

| File | What changes |
|------|-------------|
| `src/App.tsx` | Route path `/competitions` to `/beyondtheyellow` |
| `src/components/layout/Footer.tsx` | Link text and href |
| `src/pages/Support.tsx` | Link `to` and display text |
| `src/pages/Competitions.tsx` | SEO canonical, breadcrumb, and h1 heading |

