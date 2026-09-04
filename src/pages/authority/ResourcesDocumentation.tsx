import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesDocumentation() {
  return (
    <AuthorityPage
      title="Clinical Documentation Resources for Veterans"
      description="Resources on ethical clinical documentation, therapy records, treatment history, functional impact, and avoiding documentation shortcuts that compromise care."
      canonical="/resources/documentation"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Documentation", url: "/resources/documentation" },
      ]}
      eyebrow="Resource Category"
      h1="Clinical Documentation Resources for Veterans"
      subhead="Understand what responsible clinical documentation is for, what it can support, and where the boundaries belong."
      sections={[
        {
          heading: "Use this category for",
          bullets: [
            "Understanding how clinical records grow out of real treatment",
            "Distinguishing treatment documentation from letters or records created only to support a desired outcome",
            "Thinking about functional impact, treatment history, and continuity of care",
            "Understanding what clinicians can document and what they should not promise",
            "Recognizing predatory or outcome-driven documentation models",
            "Keeping your own records organized when multiple systems or providers are involved",
          ],
        },
        {
          heading: "The standard",
          body: "Documentation should reflect what a clinician can responsibly support from actual care, records, assessment, and professional judgment. It should not be reverse-engineered to guarantee a disability rating, service connection, claim approval, or any other administrative outcome.",
        },
      ]}
      related={[
        { name: "Veteran Mental Health Resources", href: "/resources/veteran-mental-health", body: "Care access, PTSD support, family strain, telehealth, and when to seek help." },
        { name: "Find Care", href: "/get-care", body: "See the care pathways ValorWell can currently support." },
        { name: "All Resources", href: "/resources", body: "Return to the full ValorWell resource hub." },
      ]}
      finalCTAs={[
        { label: "Find Care", to: "/get-care" },
        { label: "Support ValorWell", to: "/support", variant: "secondary" },
      ]}
      finalNote="Clinical documentation should be based on real care, accurate records, and ethical professional judgment."
    />
  );
}
