# /clinicians Rebuild — Editorial Clinician Manifesto

## Scope

Build a single new page at `/clinicians` following the exact section order, copy, and design system in the brief. Preserve `/therapists` as a redirect. No form work, no backend, no changes to other routes.

## Routing

- Add new route `/clinicians` → new `Clinicians` page component.
- `/therapists` currently renders the existing `Therapists.tsx` component. Change it to `<Navigate to="/clinicians" replace />` in `src/App.tsx`.
- Leave `Therapists.tsx` file in place (unused) so nothing else breaks; no other route changes.

## Visual System

Introduce a scoped clinician theme (no global token changes so the rest of the site is untouched):

- Palette: Evergreen `#3B5147`, Warm Canvas `#F4F1E8`, Ink `#111814`, Ember `#B24A3A` (used sparingly for accents/rules/CTAs).
- Typography: Trebuchet MS across the page (font stack: `'Trebuchet MS', 'Lucida Grande', sans-serif`), applied via a wrapper class on the page root only.
- No flag/sky background, no icon-card grid, no gradients.
- Layout language: oversized editorial headlines, asymmetric two-column bands, numbered bands, split comparison panels, generous whitespace, hairline Evergreen rules, small uppercase eyebrow labels in Ember or Evergreen.

Implementation: a page-scoped `<div className="clinicians-theme">` wrapper plus a small block in `src/index.css` defining the color variables and font stack under that class. No changes to global tokens or Tailwind config.

## Section Structure (in order)

Each is a distinct component section inside `src/pages/Clinicians.tsx`. Copy is used verbatim from the brief.

1. **Header** — existing site `<Header />` from `@/components/layout` (kept).
2. **Hero** — eyebrow, oversized H1, body, primary CTA "See If You Fit ValorWell" (anchor-scroll to `#raise-your-hand`), secondary CTA "See the Mission for Veterans & Families" (`/mission`), proof strip, small microcopy.
3. **Pain — "Maybe the work isn't the problem"** — headline, body, editorial recognition stack (5 numbered lines with hairline rules, not icon cards), full-width Evergreen callout.
4. **System Tension — "What we refuse to copy"** — two-panel comparison ("The Hamster Wheel" vs "What We Are Trying To Build"), Ember accent on the right panel.
5. **Mission** — headline, copy, three numbered editorial bands (01/02/03), CTA "Explore Operation Claims Success" → `/operation-claims-success`, small trust/disclaimer paragraph.
6. **Radical Honesty — "No bait-and-switch"** — two contrasting columns ("We Are Not Promising" / "We Are Offering"), closing callout.
7. **Autonomy** — four large editorial modules (numbered, not icon cards), closing boundaries callout.
8. **Fit** — "You may be our person if" list + "Not a fit if" list + closing line.
9. **Your Role in the Build** — vertical arrow/step editorial flow (text with `↓` separators), closing callout.
10. **Practical Terms** — clean vertical ledger list, trust line.
11. **Application Handoff (`#raise-your-hand`)** — headline, copy, uppercase label "RAISE YOUR HAND", and a clearly commented placeholder container:

    ```tsx
    {/* CLINICIAN_APPLICATION_SLOT: insert application component here */}
    <div id="clinician-application-slot" aria-label="Clinician application" />
    ```

    No fake inputs, no visible "form goes here" text — just the styled section frame around the slot.
12. **What Happens Next** — 4 numbered steps, closing callout.
13. **FAQ** — accessible accordion using existing shadcn `Accordion` primitives, styled to match the editorial theme. Questions from the brief; short honest answers written from the brief's stated facts ($75/session, 1099, weekly pay, telehealth-first, you set availability, ValorWell handles billing, clinical judgment respected, no VA outcome guarantees, veteran/family mission). Skip the "prior veteran experience" question as instructed. License types answered as "currently onboarding common independent clinical licenses; confirmed during the fit conversation."
14. **Final CTA** — headline, copy, primary + secondary CTAs, closing line.
15. **Footer** — existing site `<Footer />` (kept).

## SEO

`<SEO />` with clinician-recruitment title/description, canonical `/clinicians`. Reuse existing `JobPostingSchema` component (already used on `/therapists`).

## Files Touched

- **New:** `src/pages/Clinicians.tsx` (all sections inline; no new shared components).
- **Edit:** `src/App.tsx` — add `/clinicians` route, change `/therapists` to `<Navigate to="/clinicians" replace />`.
- **Edit:** `src/index.css` — append a small `.clinicians-theme { ... }` block with the four colors as CSS variables and the Trebuchet font stack. No changes to `:root` or existing tokens.

## Explicitly Not Doing

- No form fields, validation, or submission logic in the handoff section.
- No changes to `Therapists.tsx` file contents, `TherapistApplicationForm`, backend, Supabase, or other routes.
- No global design token changes; clinician palette/font are scoped to the page.
- No flag imagery, no stock therapist photos, no new icons in editorial bands.
