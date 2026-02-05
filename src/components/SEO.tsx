import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}

const SITE_NAME = "ValorWell";
const DEFAULT_TITLE = "ValorWell - Mental Health Care for Veterans and Families";
const DEFAULT_DESCRIPTION = "Online mental health care for veterans and families—therapy, support sessions, and groups built around access. CHAMPVA accepted.";
const SITE_URL = "https://www.valorwell.org";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  type = "website",
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

// JSON-LD Structured Data Components
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ValorWell",
    alternateName: "ValorWell Mental Health",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/valorwell-logo.png`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "support@valorwell.org",
      availableLanguage: "English",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function MedicalOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "ValorWell",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/valorwell-logo.png`,
    description: "Mental health care provider specializing in therapy and support services for veterans, service members, and their families.",
    medicalSpecialty: [
      "Psychiatry",
      "Mental Health",
    ],
    availableService: [
      {
        "@type": "MedicalTherapy",
        name: "Therapy",
        description: "Professional, licensed counseling covered by CHAMPVA for veterans and families.",
      },
      {
        "@type": "MedicalTherapy",
        name: "Support Sessions",
        description: "Guidance and skills-based coaching for everyday challenges.",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Veterans, Service Members, Military Families",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "ValorWell",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Veterans, Service Members, Military Families",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
