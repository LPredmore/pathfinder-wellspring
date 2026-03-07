

## Plan: Standalone Apply Page with Embedded Form Feel

### Concept

Create `/beyondtheyellow/apply` as a focused page that renders the creator application form **directly in the page** (always visible in DOM for Google Ads), but styled to feel like an overlay/component rather than a full standalone page — centered card with a subtle backdrop, no distracting page content around it.

### Changes

**1. Refactor `CreatorApplicationForm` to support inline mode**

Add an optional `inline` prop. When `true`:
- Skip the `Dialog`/`DialogTrigger`/`DialogContent` wrapper entirely
- Render the form content (steps, progress, fields, success state) directly as a `Card` component
- All existing logic (state, validation, submission, tracking) stays identical

**2. Create `src/pages/CreatorApply.tsx`**

- Minimal page with `Layout` wrapper and SEO
- Centered content area with a subtle background
- Renders `<CreatorApplicationForm inline />` so the `<form>` is in the DOM on page load
- Feels like a focused overlay/component, not a busy page

**3. Add route in `App.tsx`**

- `/beyondtheyellow/apply` → `CreatorApply`

### Result

- Google Ads sees the `<form>` immediately in the DOM at `/beyondtheyellow/apply`
- Native `submit` event fires normally — automatic tracking works
- User experience feels like opening a focused component, not navigating to a cluttered page
- Existing modal on `/beyondtheyellow` remains unchanged

