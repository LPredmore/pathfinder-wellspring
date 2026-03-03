

## Migrate `social_profiles` JSON → `creator_platforms` Rows

### Current Data

There are ~15 creator_applications with `social_profiles` JSON arrays. Each entry has `platform`, `handle`, and `followers`. Some use "Other" as the platform name. The `sm_platforms` table has 11 known platforms (TikTok, Instagram, YouTube, Facebook, LinkedIn, Reddit, SnapChat, BlueSky, Patreon, Twitch, X).

### Migration Logic

A single SQL migration that:

1. Loops through every `creator_applications` row where `social_profiles IS NOT NULL`
2. Unnests the JSON array
3. For each entry, normalizes the platform name by doing a case-insensitive match against `sm_platforms.name` (e.g. "tiktok" → "TikTok")
4. If no match is found, keeps the original name (treats it as a custom/other platform)
5. Sets `approved_platform = true` if the normalized name exists in `sm_platforms`, `false` otherwise
6. Inserts into `creator_platforms` with `creator_id`, `platform_name`, `handle`, `follower_count`, `approved_platform`
7. Skips duplicates (same creator_id + platform_name + handle) to be safe on re-runs

### Files Touched

| File | Action |
|---|---|
| New migration SQL | Insert data from JSON into `creator_platforms` |

No code changes needed — this is a one-time data backfill.

