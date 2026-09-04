import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesChampva() {
  return (
    <AuthorityPage
      title="CHAMPVA Mental Health Resources"
      description="Practical CHAMPVA mental health resources for families navigating provider access, telehealth, questions to ask, and care barriers."
      canonical="/resources/champva"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "CHAMPVA", url: "/resources/champva" },
      ]}
      eyebrow="Resource Category"
      h1="CHAMPVA Mental Health Resources"
      subhead="A starting point for CHAMPVA-connected families trying to find and use mental health care without pretending the process is simpler than it is."
      sections={[
        {
          heading: "Use this category for",
          bullets: [
            "Finding mental health providers who will actually work with CHAMPVA",
            "Questions to ask a provider before scheduling",
            "Understanding common access and participation barriers",
            "Thinking through telehealth as a care option",
            "Keeping track of the information you receive from providers and CHAMPVA",
            "Knowing when the fastest useful next step is simply to ask ValorWell about current care availability",
          ],
        },
        {
          heading: "Verify the details that can change",
          body: "Coverage rules, provider participation, billing practices, and administrative requirements can change. Use these resources to understand the problem and the questions to ask, then verify current benefit and provider information before making a care or financial decision.",
        },
      ]}
      related={[
        { name: "Find Care", href: "/get-care", body: "See the care pathways ValorWell can currently support." },
        { name: "VA Community Care Resources", href: "/resources/va-community-care", body: "A separate pathway for eligible veterans navigating VA-authorized community care." },
        { name: "All Resources", href: "/resources", body: "Return to the full ValorWell resource hub." },
      ]}
      finalCTAs={[
        { label: "Find Care", to: "/get-care" },
        { label: "Support ValorWell", to: "/support", variant: "secondary" },
      ]}
    />
  );
}
