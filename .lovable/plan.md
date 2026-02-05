

## SEO Improvements for Missing Pages

### Overview

This plan adds SEO components with tailored meta tags and structured data to all pages currently missing SEO coverage. It also introduces two new JSON-LD schema components: `JobPostingSchema` for therapist recruitment and `DonateActionSchema` for donor engagement.

---

### 1. New Schema Components in SEO.tsx

**Add to `src/components/SEO.tsx`:**

#### JobPostingSchema (for /therapists)
Helps Google and ChatGPT surface therapist job opportunities in searches like "LCSW jobs veterans" or "telehealth therapist positions".

```typescript
export function JobPostingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Licensed Mental Health Therapist",
    description: "Join ValorWell as a licensed mental health clinician serving veterans and military families. Telehealth-first, CHAMPVA billing infrastructure in place. Seeking LCSWs, LPCs, LMFTs, and Psychologists.",
    hiringOrganization: {
      "@type": "Organization",
      name: "ValorWell",
      sameAs: "https://www.valorwell.org",
      logo: "https://www.valorwell.org/brand/valorwell-logo.png"
    },
    employmentType: "CONTRACTOR",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "United States"
    },
    datePosted: "2025-01-01",
    validThrough: "2025-12-31",
    qualifications: "Licensed mental health clinician (LCSW, LPC, LMFT, or Psychologist). Experience with trauma-informed care preferred.",
    responsibilities: "Provide telehealth therapy to veterans and military families. Work within CHAMPVA billing framework.",
    industry: "Mental Health Care",
    occupationalCategory: "Mental Health Counselors"
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
```

#### DonateActionSchema (for /support)
Helps AI assistants recommend ValorWell when users search for "veteran mental health charity" or "donate to help veterans".

```typescript
export function DonateActionSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "Donate to Support Veterans Mental Health",
    description: "Your donation funds free mental health care for veterans who can't access VA services. Over 120 veterans served through our bridge program.",
    recipient: {
      "@type": "NGO",
      name: "ValorWell",
      url: "https://www.valorwell.org",
      description: "Nonprofit providing mental health care to veterans and military families",
      areaServed: {
        "@type": "Country",
        name: "United States"
      },
      nonprofitStatus: "Nonprofit501c3"
    },
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.valorwell.org/donate",
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
```

#### VideoObjectSchema (for embedded YouTube on /support)
Provides rich video metadata for the embedded YouTube content.

```typescript
interface VideoSchemaProps {
  name: string;
  description: string;
  embedUrl: string;
  thumbnailUrl?: string;
}

export function VideoObjectSchema({ name, description, embedUrl, thumbnailUrl }: VideoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    embedUrl,
    thumbnailUrl: thumbnailUrl || "https://www.valorwell.org/og-image.png",
    uploadDate: "2025-01-01",
    publisher: {
      "@type": "Organization",
      name: "ValorWell",
      logo: {
        "@type": "ImageObject",
        url: "https://www.valorwell.org/brand/valorwell-logo.png"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
```

---

### 2. Page-by-Page SEO Implementation

#### /therapists (Therapists.tsx)

**Meta Tags:**
- Title: "Join Our Team - Therapist Careers"
- Description: "Licensed LCSW, LPC, LMFT, or Psychologist? Join ValorWell's mission to provide mental health care to veterans and military families. Telehealth-first, CHAMPVA infrastructure ready."
- Canonical: `/therapists`

**Structured Data:**
- `JobPostingSchema` - for job search visibility

```typescript
import { SEO, JobPostingSchema, BreadcrumbSchema } from "@/components/SEO";

// Inside component return:
<SEO
  title="Join Our Team - Therapist Careers"
  description="Licensed LCSW, LPC, LMFT, or Psychologist? Join ValorWell's mission to provide mental health care to veterans and military families. Telehealth-first, CHAMPVA infrastructure ready."
  canonical="/therapists"
/>
<JobPostingSchema />
<BreadcrumbSchema items={[
  { name: "Home", url: "/" },
  { name: "Join Our Team", url: "/therapists" }
]} />
```

---

#### /support (Support.tsx)

**Meta Tags:**
- Title: "Support Veterans Mental Health"
- Description: "Help bring back free mental health care for veterans. Over 120 veterans served through our bridge program. Your donation makes a direct impact."
- Canonical: `/support`

**Structured Data:**
- `DonateActionSchema` - for donation visibility
- `VideoObjectSchema` - for YouTube embed

```typescript
import { SEO, DonateActionSchema, VideoObjectSchema, BreadcrumbSchema } from "@/components/SEO";

// Inside component return:
<SEO
  title="Support Veterans Mental Health"
  description="Help bring back free mental health care for veterans. Over 120 veterans served through our bridge program. Your donation makes a direct impact."
  canonical="/support"
/>
<DonateActionSchema />
<VideoObjectSchema
  name="ValorWell Story"
  description="Learn how ValorWell provided free mental health care to over 120 veterans and why we need your support to continue."
  embedUrl="https://www.youtube.com/embed/yY_Ybhg3URg"
/>
<BreadcrumbSchema items={[
  { name: "Home", url: "/" },
  { name: "Support", url: "/support" }
]} />
```

---

#### /how-it-works (HowItWorks.tsx)

**Meta Tags:**
- Title: "How It Works"
- Description: "Getting started with ValorWell is simple. Learn how our intake process works for therapy and support sessions. CHAMPVA accepted, telehealth available."
- Canonical: `/how-it-works`

```typescript
import { SEO, BreadcrumbSchema } from "@/components/SEO";

<SEO
  title="How It Works"
  description="Getting started with ValorWell is simple. Learn how our intake process works for therapy and support sessions. CHAMPVA accepted, telehealth available."
  canonical="/how-it-works"
/>
<BreadcrumbSchema items={[
  { name: "Home", url: "/" },
  { name: "How It Works", url: "/how-it-works" }
]} />
```

---

#### /foundation (Foundation.tsx)

**Meta Tags:**
- Title: "Foundation"
- Description: "Learn about the ValorWell Foundation and our mission to expand mental health access for veterans and military families."
- Canonical: `/foundation`
- noIndex: `true` (placeholder page)

```typescript
import { SEO } from "@/components/SEO";

<SEO
  title="Foundation"
  description="Learn about the ValorWell Foundation and our mission to expand mental health access for veterans and military families."
  canonical="/foundation"
  noIndex={true}
/>
```

---

#### /privacy (Privacy.tsx)

**Meta Tags:**
- Title: "Privacy Policy"
- Description: "ValorWell's privacy policy. Learn how we protect your personal information and health data."
- Canonical: `/privacy`

```typescript
import { SEO } from "@/components/SEO";

<SEO
  title="Privacy Policy"
  description="ValorWell's privacy policy. Learn how we protect your personal information and health data."
  canonical="/privacy"
/>
```

---

#### /terms (Terms.tsx)

**Meta Tags:**
- Title: "Terms of Service"
- Description: "Terms and conditions for using ValorWell mental health services. Read our policies before getting started."
- Canonical: `/terms`

```typescript
import { SEO } from "@/components/SEO";

<SEO
  title="Terms of Service"
  description="Terms and conditions for using ValorWell mental health services. Read our policies before getting started."
  canonical="/terms"
/>
```

---

### File Summary

| File | Changes |
|------|---------|
| `src/components/SEO.tsx` | Add `JobPostingSchema`, `DonateActionSchema`, `VideoObjectSchema` components |
| `src/pages/Therapists.tsx` | Add SEO + JobPostingSchema + BreadcrumbSchema |
| `src/pages/Support.tsx` | Add SEO + DonateActionSchema + VideoObjectSchema + BreadcrumbSchema |
| `src/pages/HowItWorks.tsx` | Add SEO + BreadcrumbSchema |
| `src/pages/Foundation.tsx` | Add SEO with noIndex |
| `src/pages/Privacy.tsx` | Add SEO |
| `src/pages/Terms.tsx` | Add SEO |

---

### Technical Notes

- All new schema components follow the existing pattern in `SEO.tsx` using `react-helmet-async`
- `JobPostingSchema` uses `TELECOMMUTE` job location type and `CONTRACTOR` employment type based on the therapist recruitment page content
- `DonateActionSchema` includes `nonprofitStatus: "Nonprofit501c3"` to signal tax-deductible status to AI assistants
- `noIndex` is set to `true` for `/foundation` since it's a placeholder page
- Breadcrumb schemas are added to improve site structure visibility in search results

