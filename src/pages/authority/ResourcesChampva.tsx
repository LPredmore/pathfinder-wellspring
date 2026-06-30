import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesChampva() {
  return (
    <AuthorityPage
      title="CHAMPVA Mental Health Resources"
      description="Helpful resources for CHAMPVA-connected families seeking mental health care, therapy access, telehealth, and provider guidance."
      canonical="/resources/champva"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "CHAMPVA", url: "/resources/champva" },
      ]}
      eyebrow="Resource Category"
      h1="CHAMPVA Mental Health Resources"
      subhead="Practical guidance for CHAMPVA-connected families trying to find and use mental health care."
      sections={[
        {
          heading: "What this category covers",
          bullets: [
            "Finding CHAMPVA providers",
            "Questions to ask providers",
            "Why CHAMPVA access is hard",
            "Telehealth considerations",
            "Family support options",
            "Common care barriers",
          ],
        },
        {
          heading: "Articles (coming soon)",
          cards: [
            { title: "How CHAMPVA mental health benefits actually work", body: "Placeholder — content in development." },
            { title: "Questions to ask a provider before starting CHAMPVA care", body: "Placeholder — content in development." },
            { title: "When telehealth is the better path", body: "Placeholder — content in development." },
          ],
        },
      ]}
      related={[
        { name: "CHAMPVA Mental Health (authority)", href: "/champva-mental-health" },
        { name: "Get Care", href: "/get-care" },
        { name: "Fund Access to Care", href: "/fund-access-to-care" },
      ]}
      finalCTAs={[
        { label: "Get Care", to: "/get-care" },
        { label: "Support the Mission", to: "/fund-access-to-care", variant: "secondary" },
      ]}
    />
  );
}
