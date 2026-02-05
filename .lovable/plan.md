

## SEO Improvements: OrganizationSchema, BreadcrumbSchema, About Page Link, and Meta Descriptions

### Overview

This plan implements four key SEO improvements:
1. Fix OrganizationSchema with real contact info (virtual-only, no physical address)
2. Add BreadcrumbSchema to 7 pages missing it
3. Update About page therapist link from Google Form to /therapists
4. Enhance meta descriptions with target keywords for therapist recruitment, client acquisition, and donor engagement

---

### 1. Fix OrganizationSchema with Real Contact Info

**File:** `src/components/SEO.tsx`

Update the OrganizationSchema to:
- Remove the placeholder phone number (`+1-555-123-4567`)
- Use email as primary contact method (`support@valorwell.org`)
- Remove telephone field since you're virtual-only
- Add social media links to `sameAs` array (placeholder for future - can add LinkedIn, Facebook, etc. when available)
- Keep `areaServed` as United States

```typescript
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ValorWell",
    alternateName: "ValorWell Mental Health",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/valorwell-logo.png`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      // Add social media URLs when available
      // "https://www.linkedin.com/company/valorwell",
      // "https://www.facebook.com/valorwell",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@valorwell.org",
      contactType: "customer service",
      availableLanguage: "English",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
  // ...
}
```

---

### 2. Update Contact Page (Remove Physical Address)

**File:** `src/pages/Contact.tsx`

Since ValorWell is virtual-only:
- Remove the physical address section completely
- Keep only email as contact method
- Update the meta description

---

### 3. Add BreadcrumbSchema to Remaining Pages

Add `BreadcrumbSchema` imports and components to these 7 pages:

| Page | File | Breadcrumb Path |
|------|------|-----------------|
| Therapy | `src/pages/Therapy.tsx` | Home > Therapy |
| Support Sessions | `src/pages/SupportSessions.tsx` | Home > Support Sessions |
| About | `src/pages/About.tsx` | Home > About |
| FAQ | `src/pages/FAQ.tsx` | Home > FAQ |
| Get Started | `src/pages/GetStarted.tsx` | Home > Get Started |
| Contact | `src/pages/Contact.tsx` | Home > Contact |
| Urgent Help | `src/pages/UrgentHelp.tsx` | Home > Urgent Help |

Example implementation:
```typescript
import { SEO, BreadcrumbSchema } from "@/components/SEO";

// In component return:
<BreadcrumbSchema items={[
  { name: "Home", url: "/" },
  { name: "Therapy", url: "/therapy" }
]} />
```

---

### 4. Update About Page Therapist Link

**File:** `src/pages/About.tsx`

Change the "Join Our Team" button from external Google Form to internal `/therapists` page:

**Before:**
```jsx
<a 
  href="https://forms.gle/FKYyVu4uPfQtL3to7" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Apply Now
  <ExternalLink className="h-4 w-4" />
</a>
```

**After:**
```jsx
<Link to="/therapists">
  Apply Now
</Link>
```

Also remove the `ExternalLink` icon since it's now an internal link.

---

### 5. Enhance Meta Descriptions with Target Keywords

Update meta descriptions to include target keywords for better search visibility:

| Page | Current Description | Enhanced Description |
|------|---------------------|---------------------|
| **Therapy** | "Licensed therapy for veterans and military families. Trauma-informed care, telehealth options, CHAMPVA accepted." | "Licensed LCSW, LMFT, and psychologist therapy for veterans and military families. PTSD treatment, trauma-informed telehealth care. CHAMPVA accepted, no VA referral needed." |
| **Support Sessions** | "Structured one-on-one sessions with trained Wellness Guides. Goal-oriented coaching..." | "Veteran life coaching and support sessions. Goal-oriented guidance for military families facing transition, stress, and relationship challenges. Start in days, not months." |
| **About** | "ValorWell provides accessible mental health care for veterans and military families..." | "ValorWell: Veteran-founded telehealth mental health care. CHAMPVA-accepted therapy and support for military families nationwide. Our story, mission, and values." |
| **FAQ** | "Get answers about ValorWell's therapy and support services for veterans..." | "CHAMPVA therapy FAQ: coverage, eligibility, telehealth sessions. Answers for veterans and military families seeking mental health support." |
| **Get Started** | "Begin your mental health journey with ValorWell..." | "Start veteran therapy or support sessions today. Quick intake, fast matching with military-focused therapists. CHAMPVA accepted, telehealth available nationwide." |
| **Contact** | "Contact ValorWell for questions about therapy and support services..." | "Contact ValorWell for veteran mental health support. Questions about CHAMPVA therapy, telehealth sessions, or therapist careers. Email support available." |
| **Urgent Help** | "If you're in crisis, help is available now..." | "Veterans Crisis Line: 988 Press 1. Immediate mental health crisis resources for veterans, service members, and military families. 24/7 support available." |
| **Therapists** | "Licensed LCSW, LPC, LMFT, or Psychologist? Join ValorWell's mission..." | "Telehealth therapist jobs serving veterans. LCSW, LPC, LMFT, Psychologist positions. CHAMPVA billing handled, flexible contractor role. Apply now." |
| **Support (Donate)** | "Help bring back free mental health care for veterans..." | "Donate to veteran mental health. 501(c)(3) nonprofit helping 120+ veterans access free therapy. Tax-deductible, transparent impact." |

---

### File Change Summary

| File | Changes |
|------|---------|
| `src/components/SEO.tsx` | Update OrganizationSchema to remove phone, use email-only contact |
| `src/pages/Therapy.tsx` | Add BreadcrumbSchema, enhance meta description |
| `src/pages/SupportSessions.tsx` | Add BreadcrumbSchema, enhance meta description |
| `src/pages/About.tsx` | Add BreadcrumbSchema, change therapist link to /therapists, remove ExternalLink icon, enhance meta description |
| `src/pages/FAQ.tsx` | Add BreadcrumbSchema, enhance meta description |
| `src/pages/GetStarted.tsx` | Add BreadcrumbSchema, enhance meta description |
| `src/pages/Contact.tsx` | Add BreadcrumbSchema, remove physical address section, enhance meta description |
| `src/pages/UrgentHelp.tsx` | Add BreadcrumbSchema, enhance meta description |
| `src/pages/Therapists.tsx` | Enhance meta description for therapist recruitment |
| `src/pages/Support.tsx` | Enhance meta description for donor engagement |

---

### Technical Notes

- All BreadcrumbSchema implementations follow the existing pattern from previously updated pages
- The OrganizationSchema removes the `telephone` field entirely since ValorWell is virtual-only
- The About page link change also removes the `ExternalLink` icon import if no longer needed
- Enhanced meta descriptions are optimized for both Google search and AI assistants (ChatGPT, Claude) with natural keyword integration
- Contact page will show only email support, which is appropriate for a telehealth-first organization

