

## Add `has_icon` Column + Shared PlatformIcon Component

### Problem
- Only 4 platforms have icons (TikTok, Instagram, YouTube, Facebook); the rest show a generic Globe
- No way to know which platforms in `sm_platforms` are missing icons without reading the code
- As new platforms are added, icons could silently be missing

### Solution

**1. Database: Add `has_icon` boolean to `sm_platforms`**

A new column `has_icon` (boolean, default `false`) on the `sm_platforms` table. This gives you a queryable flag at any time to see which platforms need icon work. We set it to `true` for all 11 current platforms since we'll be adding icons for all of them.

**2. Code: Create shared `PlatformIcon` component**

A new file `src/components/icons/PlatformIcon.tsx` containing:
- SVG definitions for all 11 platforms (TikTok, Instagram, YouTube, Facebook, X/Twitter, LinkedIn, Reddit, SnapChat, BlueSky, Twitch, Patreon)
- A `PlatformIcon` component that maps platform name to the correct icon, falling back to `Globe` for unknowns
- A `buildSocialUrl` helper that constructs clickable URLs from platform + handle

Icon sources: Lucide for Instagram, YouTube, Facebook, LinkedIn, Twitch. Custom single-color SVGs for TikTok (already exists), X, Reddit, SnapChat, BlueSky, Patreon.

**3. Code: Refactor `Challenge.tsx`**

Remove the inline `TikTokIcon`, `PlatformIcon`, and `buildSocialUrl` from `Challenge.tsx`. Import from the shared module instead. No visual changes — just cleaner code.

### Workflow Going Forward

When a new platform is added to `sm_platforms`:
1. `has_icon` defaults to `false` — you can query `SELECT * FROM sm_platforms WHERE NOT has_icon` to see gaps
2. Request an icon be added in code (one SVG path + one case line)
3. Flip `has_icon` to `true`
4. Until then, the Globe icon renders as the fallback

### Files

| File | Action |
|---|---|
| `sm_platforms` table | Add `has_icon` boolean column, set `true` for all 11 current rows |
| `src/components/icons/PlatformIcon.tsx` | New — shared icon map + URL builder for all platforms |
| `src/pages/Challenge.tsx` | Remove inline icon logic, import from shared module |

