import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesFamilySystems() {
  return (
    <AuthorityPage
      title="Family Systems Resources"
      description="Practical resources for communication, parenting systems, emotional regulation, conflict repair, and repeatable family routines."
      canonical="/resources/family-systems"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Family Systems", url: "/resources/family-systems" },
      ]}
      eyebrow="Resource Category"
      h1="Family Systems Resources"
      subhead="Shared frameworks families can use repeatedly instead of rebuilding the rules in the middle of every conflict."
      sections={[
        {
          heading: "Use this category for",
          bullets: [
            "Building clearer family communication routines",
            "Creating repeatable parenting and household systems",
            "Practicing emotional regulation before conflict escalates",
            "Repairing conflict without endlessly re-litigating it",
            "Running family meetings with a clear purpose and follow-through",
            "Helping children learn how to reason through choices and consequences",
            "Replacing inconsistent reactions with expectations everyone can understand",
          ],
        },
        {
          heading: "What a system is supposed to do",
          body: "A useful family system reduces the number of decisions that have to be reinvented under stress. It creates a shared expectation for what happens next while leaving room for judgment, repair, and individual needs.",
        },
      ]}
      related={[
        { name: "Veteran Mental Health Resources", href: "/resources/veteran-mental-health", body: "Mental health, family strain, transition stress, telehealth, and care access." },
        { name: "Find Care", href: "/get-care", body: "See the care pathways ValorWell can currently support." },
        { name: "All Resources", href: "/resources", body: "Return to the full ValorWell resource hub." },
      ]}
      finalCTAs={[
        { label: "Find Care", to: "/get-care" },
        { label: "Explore All Resources", to: "/resources", variant: "secondary" },
      ]}
    />
  );
}
