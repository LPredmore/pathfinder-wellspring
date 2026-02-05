

## Clean Up Redundant CTA Buttons on Therapy and Support Sessions Pages

### Overview

Both pages have too many "Get Started" buttons creating a confusing user experience. This plan removes the redundant ones while keeping strategic placement.

---

### Therapy Page Changes

**File:** `src/pages/Therapy.tsx`

**Current button locations:**
1. Lines 52-57: "Get Started" button (paired with "How it works") - **KEEP**
2. Lines 110-115: "Get Started" button (paired with "Explore Support Sessions") - **REMOVE**
3. Lines 116-121: "Explore Support Sessions" button - **REMOVE**
4. Lines 178-183: "Start Support Sessions" button - KEEP (contextually relevant)
5. CTABlock at end - KEEP (standard page closer)

**Changes:**
Remove the entire button row (lines 109-122) inside the first ContentSection:

```tsx
// DELETE these lines:
<div className="mt-8 flex flex-col gap-3 sm:flex-row">
  <a href="/get-started" ...>Get Started</a>
  <a href="/support-sessions" ...>Explore Support Sessions</a>
</div>
```

---

### Support Sessions Page Changes

**File:** `src/pages/SupportSessions.tsx`

**Current button locations:**
1. Hero component lines 82-83: `ctaText="Get Started"` - **REMOVE**
2. Lines 114-127: "Get Started" + "Explore Therapy" buttons - **REMOVE**
3. CTABlock at end - KEEP (standard page closer)

**Changes:**

1. Remove `ctaText` and `ctaLink` props from Hero (lines 82-83)

2. Remove the entire button row (lines 114-127) inside "What Support Sessions are" ContentSection:

```tsx
// DELETE these lines:
<div className="mt-8 flex flex-col gap-3 sm:flex-row">
  <a href="/get-started" ...>Get Started</a>
  <a href="/therapy" ...>Explore Therapy</a>
</div>
```

---

### Result

| Page | Before | After |
|------|--------|-------|
| Therapy | 4 "Get Started" buttons | 2 strategic placements (Hero area + CTABlock) |
| Support Sessions | 3 "Get Started" buttons | 1 placement (CTABlock at end) |

---

### File Changes Summary

| File | Changes |
|------|---------|
| `src/pages/Therapy.tsx` | Remove lines 109-122 (redundant button row) |
| `src/pages/SupportSessions.tsx` | Remove Hero CTA props (lines 82-83), remove lines 114-127 (redundant button row) |

