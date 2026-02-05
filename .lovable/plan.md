

## Donate Page Redirect Implementation

### Overview

This plan moves the current donation information page from `/donate` to `/support`, and creates a new `/donate` route that acts as a redirect utility with Google Ads tracking parameter forwarding.

### Changes Required

#### 1. Rename the Current Donate Page

**File: `src/pages/Donate.tsx`**
- Rename file to `src/pages/Support.tsx`
- Update the component name from `Donate` to `Support`

#### 2. Create New Donate Redirect Page

**New File: `src/pages/Donate.tsx`**

A minimal page that:
- Displays "Redirecting to donation page..." while processing
- Reads URL query parameters on load (gclid, gbraid, wbraid, utm_source, etc.)
- POSTs them to the edge function at `https://asjhkidpuhqodryczuth.functions.supabase.co/donate-go`
- Redirects to the returned `redirect_url`
- Falls back to `https://givebutter.com/valorwellhelp` on error

```typescript
import { useEffect } from "react";

const Donate = () => {
  useEffect(() => {
    (async function () {
      try {
        const params = new URLSearchParams(window.location.search);
        const payload = {
          gclid: params.get("gclid"),
          gbraid: params.get("gbraid"),
          wbraid: params.get("wbraid"),
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
          utm_term: params.get("utm_term"),
          utm_content: params.get("utm_content"),
        };

        const res = await fetch(
          "https://asjhkidpuhqodryczuth.functions.supabase.co/donate-go",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        if (!res.ok || !data.redirect_url) {
          throw new Error(data?.error || "donate-go failed");
        }
        window.location.replace(data.redirect_url);
      } catch (e) {
        window.location.replace("https://givebutter.com/valorwellhelp");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-muted-foreground">Redirecting to donation page…</p>
    </div>
  );
};

export default Donate;
```

#### 3. Update App.tsx Routes

**File: `src/App.tsx`**

- Import the new `Support` page
- Add route for `/support` pointing to `Support` component
- Keep `/donate` route pointing to new redirect `Donate` component

```typescript
import Donate from "./pages/Donate";        // New redirect page
import Support from "./pages/Support";      // Renamed from old Donate

// Routes:
<Route path="/donate" element={<Donate />} />
<Route path="/support" element={<Support />} />
```

#### 4. Update Internal Links

**File: `src/components/layout/Footer.tsx`**
- Change "Support a Veteran" link from `/donate` to `/support`

```typescript
getInvolved: [
  { name: "Join Our Team", href: "/therapists", external: false },
  { name: "Support a Veteran", href: "/support", external: false },  // Changed
],
```

**File: `src/pages/Index.tsx`**
- Change the donation CTA button link from `/donate` to `/support`

```typescript
<Link 
  to="/support"  // Changed from /donate
  className="inline-flex items-center..."
>
```

---

### Technical Notes

- The redirect page does not use the Layout wrapper (no header/footer) since it immediately redirects
- No secrets are exposed in client code - only calls the public edge function endpoint
- The edge function `donate-go` is assumed to already exist and handle the token generation and redirect URL logic

### File Summary

| Action | File |
|--------|------|
| Rename | `src/pages/Donate.tsx` → `src/pages/Support.tsx` |
| Create | `src/pages/Donate.tsx` (new redirect page) |
| Modify | `src/App.tsx` (add Support route, update imports) |
| Modify | `src/components/layout/Footer.tsx` (change link to /support) |
| Modify | `src/pages/Index.tsx` (change link to /support) |

