

## Diagnosis

There are **7 videos** in the database (not 6). Here is exactly what's happening:

### The `image` column problem
The `image` column stores paths like `content/28d1bc0f-.../cover.png`. The current code tries to sign these via `supabase.storage.from("content-media").createSignedUrls()` -- but the files **do not exist in Supabase storage**. They exist in **Cloudflare R2**. So the signing silently fails and `thumbnailUrl` stays undefined.

### The `image_url` column problem
The `image_url` column already has fully-formed R2 signed URLs like:
`https://3cba9086c8f9957a37877b96f1325185.r2.cloudflarestorage.com/valorwell-videos/content/.../cover.png?X-Amz-Expires=3600&...`

These are pre-signed at content creation time with a **1-hour expiry**. By the time a visitor loads the /videos page, they're expired and return access denied.

### The YouTube `hqdefault.jpg` fallback
This returns an auto-generated frame from the video, **not** the custom thumbnail you uploaded in YouTube Studio. YouTube only serves custom thumbnails via the Data API. So the fallback shows a random video frame -- which is what you're seeing.

### Summary
- Supabase signed URLs fail: files aren't in Supabase storage
- R2 `image_url` is expired: signed at upload time, only valid 1 hour
- YouTube static URL: returns an auto-generated frame, not your custom thumbnail

---

## Fix

Create a **Supabase Edge Function** that generates fresh R2 signed URLs on demand. The R2 credentials already exist as secrets (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET_NAME`).

### 1. New Edge Function: `r2-sign-urls`

Accepts an array of R2 storage paths, returns fresh signed URLs (1-hour expiry) using AWS S3-compatible signing with the existing R2 credentials.

### 2. Update `src/pages/Videos.tsx`

- Also select `image_url` from the query (to extract the R2 path from it as a fallback)
- Replace the failed `supabase.storage.from("content-media").createSignedUrls()` call with a call to the new `r2-sign-urls` edge function
- Pass the `image` paths (e.g. `content/.../cover.png`) to the edge function
- Use the returned signed URLs as thumbnail sources
- Fall back to `hqdefault.jpg` only if the edge function fails entirely

