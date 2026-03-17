

## Plan: Create `/apps` Redirect Page

Follow the exact pattern of the existing `/donate` page — a minimal component that immediately redirects via `window.location.replace()`.

### Changes

1. **Create `src/pages/Apps.tsx`** — Simple component that redirects to `https://bestselfs.com` on mount. Shows a brief "Redirecting…" message. No layout/header/footer needed. Google Tags fire automatically from `index.html`.

2. **Update `src/App.tsx`** — Add route: `<Route path="/apps" element={<Apps />} />`

That's it. The gtag.js in `index.html` fires on every page load, so Google Ads tracking is covered automatically.

