## Plan: Port `/ninjado` and `/skillsquest` from bestselfs-family-hub

### Goal
Create two new pages on this site mirroring the bestselfs-family-hub designs for Ninja-Do and SkillsQuest, adapted to ValorWell's `Layout` + `SEO` and with Google Ads outbound tracking (matching what `/vibetales` already does).

### Files to create

1. **`src/assets/ninjado-logo.png`** — copied from bestselfs project.
2. **`src/assets/skillsquest-logo.png`** — copied from bestselfs project.
3. **`src/pages/NinjaDo.tsx`** — port of bestselfs `NinjaDo.tsx`.
4. **`src/pages/SkillsQuest.tsx`** — port of bestselfs `SkillsQuest.tsx`.

### Files to edit

- **`src/App.tsx`** — add `/ninjado` and `/skillsquest` routes.
- **`src/lib/tracking.ts`** — generalize the existing `trackVibeTalesOutboundClick` (or add `trackNinjaDoOutboundClick` / `trackSkillsQuestOutboundClick`) so each app fires its own Google Ads conversion. I'll inspect the current tracking helper and pick the cleanest extension; default approach is to keep one helper that takes the destination URL and a conversion label, with per-app constants.

### Small adaptations (same pattern as /vibetales)

For each ported page:
- Wrap in ValorWell's `Layout` (instead of bestselfs `Header` / `Footer`).
- Use ValorWell's `SEO` component; drop `softwareApplicationSchema` / `breadcrumbSchema` helpers (not present here) and keep simple `title` + `description`.
- Replace every `<a target="_blank">` to `webUrl` / `iosUrl` / `androidUrl` with a `Button` whose `onClick` calls the tracking helper (preserves new-tab behavior via `window.open(url, '_blank')` inside `event_callback`).
- Inline the small content arrays directly in the page file — no separate `*-content.ts` files.
- Keep the bestselfs amber/emerald palettes inline (these are the app brand colors, not ValorWell chrome).
- Add a slim ValorWell mission strip under each hero, matching the /vibetales pattern: *"100% of all [App] revenue funds mental health treatment for veterans through ValorWell."* — using `bg-[hsl(var(--patriot-red))] text-white`.
- Add the same `gtag` `page_view` beacon `useEffect` used on `/vibetales` so each landing fires a Google Ads page-view.

### Asset copy

Use `cross_project--copy_project_asset` to bring `ninjado-logo.png` and `skillsquest-logo.png` into `src/assets/`.

### Out of scope

- No changes to the header navigation — these are dedicated landing routes (same as `/vibetales`).
- No content rewrite — the bestselfs copy stays.

### Note on Google Ads conversion labels

The existing `trackVibeTalesOutboundClick` uses a specific conversion label. I'll need to either (a) reuse the same `send_to` for the new apps, or (b) you provide separate conversion snippets for Ninja-Do and SkillsQuest. **Default if no answer:** reuse the existing VibeTales conversion label for all three apps, so clicks still register as outbound conversions and you can split them later when you have per-app snippets. Let me know if you have dedicated AW snippets and I'll wire those in instead.
