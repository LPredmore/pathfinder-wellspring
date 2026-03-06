

## Diagnosis

The thumbnail issue is that YouTube's `maxresdefault.jpg` doesn't return a 404 when unavailable -- it returns a valid but tiny gray placeholder image. Since it's technically a successful image load, the `onError` handler never fires, so the fallback chain never triggers. Additionally, the `image_url` from the database is an R2 signed URL that expires after 1 hour, making it unreliable as a fallback.

## Should we pull from YouTube directly?

No. Using the YouTube Data API v3 would require an API key, quota management (10,000 units/day free), and an edge function to proxy requests. The database already has the exact data needed. The only problem is the thumbnail sourcing strategy, which is a simple fix.

## Fix

Use `hqdefault.jpg` as the primary thumbnail source. It is **always** available for every YouTube video and is 480x360px -- more than sufficient for a grid card. Drop the unreliable `maxresdefault.jpg` → `image_url` → `hqdefault.jpg` fallback chain entirely.

**File: `src/pages/Videos.tsx`**

1. Change the `<img>` `src` from `maxresdefault.jpg` to `hqdefault.jpg`
2. Remove the `handleThumbnailError` callback entirely -- it's no longer needed since `hqdefault.jpg` is universally available
3. Keep the `image_url` only in the `VideoObjectSchema` `thumbnailUrl` prop (for structured data), falling back to `hqdefault.jpg`

This is one file, ~10 lines changed.

