

## Plan: Click-to-Play Thumbnails on /videos Page

### Problem
Currently, the Videos page embeds YouTube iframes immediately for every video in the grid. This loads heavy iframes for all videos at once and shows a generic video player screenshot rather than the actual YouTube thumbnail.

### Solution
Apply the same click-to-load pattern already used by `ClickToLoadYouTubeShort` — show the YouTube thumbnail image first, with a play button overlay, and only load the iframe when clicked.

For thumbnails, use YouTube's `maxresdefault.jpg` URL (`https://img.youtube.com/vi/{id}/maxresdefault.jpg`) with a fallback to `hqdefault.jpg`. These are the actual thumbnails set on the video in YouTube — no database image needed.

### Implementation

**File: `src/pages/Videos.tsx`**

1. Add `useState` import and a local state tracking which video (if any) is playing
2. Replace the `<iframe>` block with a conditional:
   - **Default state**: Show an `<img>` of `https://img.youtube.com/vi/{id}/maxresdefault.jpg` with a centered play button overlay (matching the style from `ClickToLoadYouTubeShort`)
   - **After click**: Swap to the YouTube embed iframe with `?autoplay=1` so it starts immediately
3. Use the `image_url` from the database as a fallback `onError` source, and `hqdefault.jpg` as a final fallback

This avoids loading any iframes until the user explicitly clicks, improving page performance and showing the real YouTube thumbnail.

