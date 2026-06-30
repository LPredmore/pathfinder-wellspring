import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function SponsorCare() {
  return (
    <AuthorityPage
      title="Sponsor Care for Veterans and Families | ValorWell"
      description="Help cover direct therapist costs and expand access to mental health care for veterans and military-connected families."
      canonical="/sponsor-care"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Sponsor Care", url: "/sponsor-care" },
      ]}
      eyebrow="Sponsor Care"
      h1="Sponsor care for veterans and families who should not have to wait months for help."
      subhead="Your support helps cover direct therapist costs and expand access to mental health support for veterans and military-connected families."
      heroCTAs={[
        { label: "Sponsor Care", to: "/beyondtheyellow" },
        { label: "Become a Monthly Supporter", to: "/monthly-supporters", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "What care sponsorship means",
          body: "Care sponsorship helps ValorWell support the direct cost of therapy sessions while building the larger system around access, tools, documentation, education, and family support.",
        },
        {
          heading: "$75 helps cover the direct therapist cost of one session.",
          body: "That amount helps pay the clinician providing care. It does not represent the full operating cost of ValorWell, but it gives supporters a clear way to understand the direct cost of care delivery.",
        },
        {
          heading: "Sponsorship examples",
          cards: [
            { title: "$75", body: "Helps cover one direct therapist session cost." },
            { title: "$150", body: "Helps cover two direct therapist session costs." },
            { title: "$300", body: "Helps cover about one month of weekly direct therapist session costs for one client." },
            { title: "$900", body: "Helps cover about three months of weekly direct therapist session costs for one client." },
            { title: "Custom amount", body: "Supports care access and mission infrastructure." },
          ],
        },
        {
          heading: "Why this matters",
          body: "When timely care is not available, symptoms can worsen, families can strain, and people can end up relying on expensive or predatory systems because they feel like there is no other path. Care sponsorship helps build a better path.",
        },
      ]}
      related={[
        { name: "Go Beyond the Yellow", href: "/beyondtheyellow" },
        { name: "Monthly Supporters", href: "/monthly-supporters" },
        { name: "Sponsors", href: "/sponsors" },
      ]}
      finalCTAs={[
        { label: "Sponsor Care", to: "/beyondtheyellow" },
        { label: "Go Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
        { label: "Become a Monthly Supporter", to: "/monthly-supporters", variant: "secondary" },
      ]}
      finalNote={CRISIS_NOTE}
    />
  );
}
