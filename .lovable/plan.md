

## Create `/challenge` Page with Competitor Cards

### Overview

Create a new `/challenge` route that houses the Zeffy leaderboard and thermometer embeds (moved from `/beyondtheyellow`) plus a grid of competitor cards pulled from `current_competitors`. Each card shows their avatar, display name, social links (with platform icons), and personal mission statement -- omitting anything that's empty.

### Database Changes

1. **Add `avatar_url` column** to `current_competitors` -- a nullable text column for a Supabase Storage path/URL.

2. **Add RLS policy** for public SELECT on `current_competitors` so the frontend can read competitor data without auth. The table currently has no RLS policies and RLS appears disabled -- we need to enable RLS and add a public select policy.

### File Changes

**1. `src/pages/Challenge.tsx` (new file)**

- Hero section with title "Current Challenge" 
- Two-column grid with the Zeffy leaderboard iframe (left) and thermometer iframe (right) -- moved from Competitions.tsx
- Below that, a "Meet Our Mission Partners" section with a responsive grid of competitor cards
- Each card:
  - Circle-framed avatar using `Avatar` component (hidden if no `avatar_url`)
  - `pref_name` as the name
  - Row of social platform icons (using Lucide icons for known platforms: Instagram, Facebook, Youtube; generic Globe/Link for others) linking to the profile handle/URL
  - `personal_mission` text (hidden if empty)
- Data fetched from `current_competitors` via Supabase client using `@tanstack/react-query`

**2. `src/pages/Competitions.tsx`**

- Remove the "Row 3: Leaderboard placeholders" grid (lines 218-253) containing the two iframe cards
- They now live on `/challenge`

**3. `src/App.tsx`**

- Import and add route: `<Route path="/challenge" element={<Challenge />} />`

### Social Platform Icon Mapping

The `social_profiles` jsonb contains objects like `{ platform: "TikTok", handle: "@user", followers: 300 }`. We'll map known platform names to Lucide icons and construct URLs where possible:

- "TikTok" -- custom SVG or fallback icon, link to `tiktok.com/@handle`
- "Instagram" -- Instagram icon, link to `instagram.com/handle`  
- "YouTube" -- Youtube icon, link to channel
- "Facebook" -- Facebook icon
- "Other" -- Globe icon, show handle as text

For platforms where we can construct a URL from the handle, the icon will be a clickable link. For "Other" or ambiguous handles, show icon + handle text.

### Competitor Card Layout

```text
+---------------------------+
|      (circle avatar)      |
|       Liberty Adams       |
|   [TikTok] [Instagram]    |
|                           |
|  "I want to help veterans |
|   feel protected..."      |
+---------------------------+
```

### Files touched
- `src/pages/Challenge.tsx` -- new
- `src/pages/Competitions.tsx` -- remove iframe section
- `src/App.tsx` -- add route
- DB migration: add `avatar_url` column + RLS

