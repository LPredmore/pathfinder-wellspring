import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesCognitiveConsistency() {
  return (
    <AuthorityPage
      title="Cognitive Consistency Resources"
      description="Resources on role reversal, double standards, emotional reasoning, principle-first thinking, empathy, and systems-based conversations."
      canonical="/resources/cognitive-consistency"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Cognitive Consistency", url: "/resources/cognitive-consistency" },
      ]}
      eyebrow="Resource Category"
      h1="Cognitive Consistency Resources"
      subhead="A framework for harder conversations — at the kitchen table and in public life."
      sections={[
        {
          heading: "What this category covers",
          bullets: [
            "Role reversal",
            "Double standards",
            "Emotional reasoning",
            "Principle-first thinking",
            "Empathy across disagreement",
            "Systems thinking",
            "Family and public-issue examples",
          ],
        },
        {
          heading: "Articles (coming soon)",
          cards: [
            { title: "The role-reversal test", body: "Placeholder — content in development." },
            { title: "Spotting double standards in your own thinking", body: "Placeholder — content in development." },
            { title: "Principle-first conversations at home", body: "Placeholder — content in development." },
          ],
        },
      ]}
      related={[
        { name: "Cognitive Consistency (Media)", href: "/media/cognitive-consistency" },
        { name: "Family Systems", href: "/family-systems" },
        { name: "Media Overview", href: "/media" },
      ]}
      finalCTAs={[
        { label: "Explore Media", to: "/media" },
        { label: "Get Care", to: "/get-care", variant: "secondary" },
      ]}
    />
  );
}
