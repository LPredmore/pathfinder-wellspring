

## Replace Autoplay Video with Click-to-Load Facade

### 1. New Component: `src/components/ClickToLoadYouTubeShort.tsx`

A reusable component with two states:

**Default state (facade):**
- Shows a 9:16 aspect-ratio container with the YouTube thumbnail (`https://i.ytimg.com/vi/{videoId}/hqdefault.jpg`) as a background image
- Centered "Watch Short" `<button>` with `aria-label="Watch Short"`, keyboard accessible
- Helper caption below: "After it loads, press play in the player to start."

**After click:**
- Replaces thumbnail with an iframe:
  - `src`: `https://www.youtube.com/embed/{videoId}?rel=0` (NO `autoplay=1`, NO `mute=1`)
  - `allow`: `"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"` (NO `autoplay`)
  - `allowFullScreen: true`
  - Fills container via absolute positioning (width/height 100%)

**Props:**
- `videoId: string` (required)
- `title?: string` (default "YouTube Short")
- `className?: string`

**Sizing:** Uses CSS `aspect-ratio: 9/16` with a `min-w-[200px] min-h-[200px]` to meet YouTube's minimum, and `max-w-sm` + `mx-auto` for centering (matching current layout).

### 2. Update `src/pages/Therapists.tsx`

**Video section (lines 222-251):** Replace the current `AspectRatio` + autoplay iframe block with:

```tsx
<ClickToLoadYouTubeShort
  videoId={videoId}
  title="A Quick Message From Luke"
/>
```

- Keep the `useQuery` fetch from `site_config` and the `extractYouTubeId` helper (still needed to get the video ID)
- Keep the skeleton loading state while the URL is being fetched
- Remove the `AspectRatio` and `Skeleton` imports if no longer used elsewhere on this page

### 3. Removed Behavior

- No `autoplay=1` parameter
- No `mute=1` parameter
- No `loop=1` parameter
- No `autoplay` in the iframe `allow` attribute
- Iframe not loaded until user clicks the facade button

### Technical Summary

| Aspect | Detail |
|--------|--------|
| New file | `src/components/ClickToLoadYouTubeShort.tsx` |
| Modified file | `src/pages/Therapists.tsx` (video section only) |
| Dependencies | None new |

