

## Plan: /videos Page for Long-Form YouTube Content

### Architecture Decision

Use standard YouTube `<iframe>` embeds (`youtube.com/embed/{videoId}`). This is the only correct approach because:

- YouTube's Terms of Service require using their official embed player for view counting. Any custom player or API-based playback that hides the YouTube player violates their ToS and will not count views.
- The embed player handles adaptive bitrate, captions, and all YouTube UI natively.
- The `youtube_video_id` column on `posted_content` already stores the video ID needed for embedding.

For SEO: Each video's `youtube_desc` will be rendered in a `<meta>` tag via `VideoObjectSchema` structured data and also placed in a visually-hidden `<span>` (using `sr-only` class). This gives search engines the description text without cluttering the UI. This is not cloaking because the content is accessible to screen readers; it is standard accessibility practice.

### Implementation

**1. Add route and nav link**

- `src/App.tsx`: Add `import Videos` and `<Route path="/videos" element={<Videos />} />`
- `src/components/layout/Header.tsx`: Add `{ name: "Videos", href: "/videos" }` to the `navigation` array

**2. Create `src/pages/Videos.tsx`**

- Fetch from `posted_content` where `post_length = 'Long'` and `youtube_video_id IS NOT NULL`, ordered by `scheduled_at` descending
- Use the existing Supabase client and `useQuery` from TanStack Query
- RLS note: `posted_content` only allows SELECT for admins or the owning user. This means the current RLS policies will block anonymous/public access. A new RLS policy is required.

**3. Database migration: Add public SELECT policy on `posted_content`**

```sql
CREATE POLICY "Public can view published long content"
ON public.posted_content
FOR SELECT
USING (
  post_length = 'Long'
  AND youtube_video_id IS NOT NULL
  AND status = 'posted'
);
```

This scopes public access strictly to published long-form content with a YouTube video. No other rows are exposed.

**4. Page layout and SEO**

- Page-level `<SEO>` component with title "Videos | ValorWell" and a description about veteran mental health content
- Each video rendered as a card:
  - YouTube iframe embed: `https://www.youtube.com/embed/{youtube_video_id}` in 16:9 aspect ratio
  - `youtube_title` displayed below the embed
  - `youtube_desc` rendered as `<span className="sr-only">` for screen reader / SEO accessibility
  - `VideoObjectSchema` JSON-LD for each video (name, description, embedUrl, thumbnailUrl from YouTube)
- Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Loading skeleton state while data fetches
- Empty state if no videos exist

**5. Files changed**

| File | Change |
|------|--------|
| `src/pages/Videos.tsx` | New file |
| `src/App.tsx` | Add route + import |
| `src/components/layout/Header.tsx` | Add "Videos" nav link |
| Migration SQL | Public SELECT policy on `posted_content` |

