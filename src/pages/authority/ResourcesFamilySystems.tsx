import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesFamilySystems() {
  return (
    <AuthorityPage
      title="Family Systems Resources"
      description="Resources for families building better systems for communication, parenting, emotional regulation, conflict repair, and decision-making."
      canonical="/resources/family-systems"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Family Systems", url: "/resources/family-systems" },
      ]}
      eyebrow="Resource Category"
      h1="Family Systems Resources"
      subhead="Shared frameworks families can use again and again, instead of starting from scratch every fight."
      sections={[
        {
          heading: "What this category covers",
          bullets: [
            "Communication",
            "Parenting systems",
            "Emotional regulation",
            "Conflict repair",
            "Family meetings",
            "Teaching kids how to think",
            "Systems over reactions",
          ],
        },
        {
          heading: "Articles (coming soon)",
          cards: [
            { title: "How to run a useful family meeting", body: "Placeholder — content in development." },
            { title: "Teaching kids how to think, not just what to think", body: "Placeholder — content in development." },
            { title: "Repairing conflict without re-litigating it", body: "Placeholder — content in development." },
          ],
        },
      ]}
      related={[
        { name: "Family Systems (authority)", href: "/family-systems" },
        { name: "Military Family Therapy", href: "/military-family-therapy" },
        { name: "BestSelfs", href: "/bestselfs" },
      ]}
      finalCTAs={[
        { label: "Get Care", to: "/get-care" },
        { label: "Explore BestSelfs", to: "/bestselfs", variant: "secondary" },
      ]}
    />
  );
}
