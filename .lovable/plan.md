

## Therapist Recruitment Page (`/therapists`)

### Strategic Decision

The page will follow the same visual pattern established by About.tsx and HowItWorks.tsx: a flag-sky background with semi-transparent overlay, inline hero section, and structured content sections. This maintains brand cohesion and leverages the patriotic, mission-driven aesthetic already proven effective on other pages.

The content strategy prioritizes emotional resonance over information density. The goal is to create enough intrigue and alignment with values that clinicians want to learn more by completing the form, rather than overwhelming them with operational details upfront.

### Page Structure

**1. Hero Section**
- Headline: "Your Clinical Skills Deserve a Bigger Mission"
- Subtitle: Speaks to the gap between wanting to help veterans and actually having the infrastructure to do so
- No CTA button in hero (builds anticipation)

**2. The Problem Section**
- Addresses the pain point clinicians feel: wanting to serve this population but facing systemic barriers
- Brief, emotionally resonant copy about veterans falling through the cracks

**3. What Makes ValorWell Different Section**
- 3-4 card grid highlighting:
  - Military-centered culture (not just "veteran-friendly" branding)
  - CHAMPVA infrastructure already built
  - Telehealth-first (flexibility)
  - Community of like-minded clinicians

**4. Who We're Looking For Section**
- Clear but brief criteria:
  - Licensed mental health clinicians (LCSW, LPC, LMFT, Psychologists)
  - Passion for working with veterans and military families
  - Experience with trauma-informed care (preferred, not required)
- Framed aspirationally, not as a checklist

**5. Call-to-Action Section**
- Navy background with centered content
- Emotionally closing headline
- Single prominent "Join Our Team" button linking to Google Form
- Maintains the external link behavior but now in the proper context

**6. Footer CTA**
- Standard CTABlock component pointing to Get Started (for visitors who aren't clinicians)

### Technical Implementation

**Files to create:**
- `src/pages/Therapists.tsx` - New page component

**Files to modify:**
- `src/App.tsx` - Add route for `/therapists`
- `src/components/layout/Footer.tsx` - Change "Join Our Team" from external Google Form link to internal `/therapists` route

### Footer Link Change

Currently:
```text
{ name: "Join Our Team", href: "https://forms.gle/FKYyVu4uPfQtL3to7", external: true }
```

Changed to:
```text
{ name: "Join Our Team", href: "/therapists", external: false }
```

This creates a proper landing page funnel: Footer link leads to the /therapists page, which builds context and emotional buy-in, then drives to the Google Form.

### Assets

The page will use the existing `flag-sky-background-vertical.png` background image, consistent with About and How It Works pages. No new images required.

### Content Tone

The copy will emphasize:
- Purpose and meaning over compensation
- Being part of a mission, not just filling a role
- The unique opportunity to serve a population that genuinely needs specialized care
- Simplicity: one clear action (fill out the form)

The page intentionally omits:
- Detailed compensation information
- Extensive operational requirements
- State-by-state licensing details

These are better handled in the application/interview process after initial interest is established.

---

### Technical Details

**New Page Component Structure (Therapists.tsx):**

```text
Layout
  Flag background container
    White overlay
    Hero section (inline, like About.tsx)
    Problem/opportunity section
    What makes us different (card grid)
    Who we're looking for
    CTA section (navy background with form link)
  CTABlock (for non-clinician visitors)
```

**Route Addition (App.tsx):**

```text
import Therapists from "./pages/Therapists";
...
<Route path="/therapists" element={<Therapists />} />
```

**Footer Update:**

The "Join Our Team" link changes from external (Google Form) to internal (`/therapists`), using the existing Link component instead of anchor tag.

