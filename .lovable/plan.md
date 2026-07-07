## Wire `/privacy` (footer-only) and remove `/terms`

Privacy content in `src/pages/Privacy.tsx` already matches what you sent — no copy changes needed. Route `/privacy` will be reachable only via the footer link (no header nav, no other cross-links). `/terms` gets removed entirely.

### Changes

**`src/App.tsx`**
- Import `Privacy` from `./pages/Privacy`.
- Add `<Route path="/privacy" element={<Privacy />} />` alongside the other real page routes.
- Remove both `/privacy` and `/terms` entries from the `publicPages` placeholder array.

**`src/components/layout/Footer.tsx`**
- Remove the `{ name: "Terms", href: "/terms" }` entry from the Legal column. Keep `{ name: "Privacy", href: "/privacy" }` — this remains the only entry point to the page.

**`src/pages/Terms.tsx`**
- Delete the file.

### Verification

- Footer Legal column shows only "Privacy", and clicking it loads the full policy.
- `/privacy` typed directly renders the real page (not the shell placeholder).
- `/terms` returns the `NotFound` page.
- No other page links to `/privacy`.
- Type-check passes.
