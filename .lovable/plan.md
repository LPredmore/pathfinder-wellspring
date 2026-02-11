

## Unified /Therapists Page Overhaul

This plan combines the clinician-first page redesign, the application modal, and the Supabase-managed autoplay video into a single update.

---

### 1. Database Migration: Create `site_config` Table

Create a new `site_config` key-value table to store configurable content (starting with the video URL).

```sql
CREATE TABLE public.site_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON public.site_config FOR SELECT USING (true);

INSERT INTO public.site_config (key, value)
VALUES ('therapists_video_url', 'https://youtube.com/shorts/-Nf6h6DwWGs?si=B-8fOeMcRpPVLnUm');
```

To change the video later, just edit the row in the Supabase dashboard -- no code change needed.

---

### 2. Full Rewrite of `src/pages/Therapists.tsx`

The page will be completely rewritten with the following section order:

**Section 1 -- Hero** (flag background + overlay kept)
- H1: "Work With Veterans. Do the Clinical Work You Trained For."
- Subheadline: "Paid weekly. No billing hassle. Telehealth-first. Real clinical autonomy."
- Primary CTA: "Apply to Work With ValorWell" (opens modal)
- Secondary CTA: "Watch: Working as a Clinician at ValorWell" (scrolls to `#video-section`)

**Section 2 -- Mission (KEPT EXACTLY)**
- "Your Clinical Skills Deserve a Bigger Mission" with existing body copy
- "Veterans Deserve Clinicians Who Get It" with existing body copy

**Section 3 -- Clinician Benefits Grid**: "What Clinicians Get at ValorWell"
- 2-column grid (desktop), 1-column (mobile)
- 8 cards with Lucide icons:

| Card | Icon |
|------|------|
| Paid Weekly | DollarSign |
| No Billing Hassle | FileX |
| Schedule Autonomy | CalendarClock |
| Clinical Autonomy and Respect | ShieldCheck |
| Documentation That Respects Your Time | ClipboardCheck |
| Support for Complex Cases | LifeBuoy |
| Clear Boundaries | Lock |
| Fast, Clear Onboarding | Rocket |

**Section 4 -- Video** (`id="video-section"`)
- Title: "A Quick Message From Luke"
- Fetches URL from `site_config` via `useQuery`
- Parses YouTube video ID (handles `/shorts/`, `watch?v=`, `youtu.be/` formats)
- Renders YouTube iframe with `autoplay=1&mute=1&loop=1&controls=1&rel=0`
- 9:16 aspect ratio using `AspectRatio` component, centered, max-width constrained
- Skeleton placeholder while loading
- Caption: "If you've wanted to serve veterans without sacrificing your time, sanity, or clinical judgment -- this is what we built ValorWell for."

**Section 5 -- Who This Is For**
- 4 bullet points as specified

**Section 6 -- How It Works**
- Uses existing `StepsSection` component
- 4 steps: Apply, Review, Onboarding, Start seeing clients
- CTA button at end opens same modal

**Section 7 -- FAQ**
- Uses existing `FAQSection` component
- 3 items: remote?, billing?, getting started?

**Section 8 -- Footer CTA** (existing `CTABlock` kept)

---

### 3. Application Modal

Implemented directly in `Therapists.tsx`:
- `useState` boolean shared by both CTA buttons
- Wraps the existing `TherapistApplicationForm` component (unchanged)
- Uses the existing `Dialog`/`DialogContent`/`DialogTitle`/`DialogDescription` components
- Title: "Apply to Work With ValorWell"
- Helper: "Complete the application below and we'll follow up with next steps."
- `max-w-2xl`, `max-h-[85vh] overflow-y-auto` for scrolling on small screens
- Accessible by default (Radix Dialog handles focus trap, ESC, close button)

---

### 4. Removed Content

- "Military-Centered Culture" card
- "Community of Clinicians" card
- "CHAMPVA Infrastructure" card
- "Telehealth-First" card
- "What Makes ValorWell Different" section
- "Who We're Looking For" section
- Inline embedded `TherapistApplicationForm`

---

### Technical Summary

| Aspect | Detail |
|--------|--------|
| New dependencies | None |
| Database changes | New `site_config` table with 1 seed row |
| Files modified | `src/pages/Therapists.tsx` (full rewrite) |
| Files unchanged | `src/components/forms/TherapistApplicationForm.tsx` |
| Reused components | `FAQSection`, `StepsSection`, `Card/CardContent`, `Dialog/*`, `TherapistApplicationForm`, `CTABlock`, `Layout`, `SEO`, `Button`, `AspectRatio`, `Skeleton` |
| New Lucide icons | `DollarSign`, `FileX`, `CalendarClock`, `ShieldCheck`, `ClipboardCheck`, `LifeBuoy`, `Lock`, `Rocket` |

