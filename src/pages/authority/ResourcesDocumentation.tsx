import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesDocumentation() {
  return (
    <AuthorityPage
      title="Clinical Documentation Resources for Veterans"
      description="Resources on ethical clinical documentation, therapy records, treatment history, and avoiding predatory documentation systems."
      canonical="/resources/documentation"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Documentation", url: "/resources/documentation" },
      ]}
      eyebrow="Resource Category"
      h1="Clinical Documentation Resources for Veterans"
      subhead="What ethical documentation looks like, what it isn't, and how it fits into real care."
      sections={[
        {
          heading: "What this category covers",
          bullets: [
            "Ethical documentation",
            "Therapy records",
            "Treatment history",
            "Functional impact",
            "What clinicians can and cannot do",
            "Avoiding predatory systems",
          ],
        },
        {
          heading: "Articles (coming soon)",
          cards: [
            { title: "What ethical clinical documentation actually means", body: "Placeholder — content in development." },
            { title: "Why letters-on-demand systems are a problem", body: "Placeholder — content in development." },
            { title: "How documentation grows out of real treatment", body: "Placeholder — content in development." },
          ],
        },
      ]}
      related={[
        { name: "Documentation Support (authority)", href: "/documentation-support" },
        { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
        { name: "Get Care", href: "/get-care" },
      ]}
      finalCTAs={[
        { label: "Get Care", to: "/get-care" },
        { label: "Support the Mission", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      finalNote="Documentation should be based on real clinical care, accurate records, and ethical professional judgment."
    />
  );
}
