import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function MonthlySupporters() {
  return (
    <AuthorityPage
      title="Become a Monthly Supporter | ValorWell"
      description="Become a monthly supporter and help ValorWell build a sustainable support system for veterans and families seeking care, tools, and guidance."
      canonical="/monthly-supporters"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Monthly Supporters", url: "/monthly-supporters" },
      ]}
      eyebrow="Recurring Support"
      h1="Become a monthly supporter of the mission."
      subhead="Monthly supporters help ValorWell build something sustainable: a long-term support system for veterans and families, not just a one-time campaign."
      heroCTAs={[
        { label: "Become a Monthly Supporter", to: "/beyondtheyellow" },
        { label: "Go Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "Why monthly support matters",
          body: "Veterans and families do not need temporary awareness. They need sustainable systems. Monthly supporters help ValorWell plan, build, and expand care access, practical tools, education, and mission infrastructure.",
        },
        {
          heading: "What monthly support helps",
          cards: [
            { title: "Direct therapist costs", body: "Helps cover the clinician time veterans and families need." },
            { title: "Practical family tools", body: "Supports the BestSelfs apps that help families build real skills." },
            { title: "Care access education", body: "CHAMPVA, VA Community Care, and family system explainers." },
            { title: "Documentation-support education", body: "Ethical, care-based clinical documentation guidance." },
            { title: "Content and media", body: "Brings people into the mission before crisis hits." },
            { title: "Impact tracking", body: "Helps us publish sessions delivered, care funded, and barriers documented." },
            { title: "Infrastructure for growth", body: "The boring backbone that lets a mission actually scale." },
          ],
        },
        {
          heading: "Suggested monthly giving levels",
          cards: [
            { title: "$10 / month", body: "Helps support education, outreach, and mission-building work." },
            { title: "$25 / month", body: "Helps support tools, content, and access-building work." },
            { title: "$75 / month", body: "Helps cover the direct therapist cost of one session." },
            { title: "$150 / month", body: "Helps cover the direct therapist cost of two sessions." },
            { title: "$300 / month", body: "Helps support direct session costs for about one month of weekly care for one client." },
            { title: "Custom monthly support", body: "Choose the amount that fits your commitment to the mission." },
          ],
        },
        {
          heading: "Supporter promise",
          body: "When you support ValorWell monthly, you are helping build an alternative to the broken path veterans and families are often forced into. Your support helps expand access to care, strengthen practical tools, educate the public, and reduce the need for veterans to rely on predatory organizations when they need documentation, guidance, or support.",
        },
      ]}
      related={[
        { name: "Go Beyond the Yellow", href: "/beyondtheyellow" },
        { name: "Sponsor Care", href: "/sponsor-care" },
        { name: "Impact", href: "/impact" },
      ]}
      finalCTAs={[
        { label: "Become a Monthly Supporter", to: "/beyondtheyellow" },
        { label: "Go Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
        { label: "Share the Mission", to: "/mission-one-pager", variant: "secondary" },
      ]}
      finalNote={<>
        <p className="mb-2">$75 helps cover the direct therapist cost of one session. That amount helps pay the clinician providing care and does not represent ValorWell's full operating cost.</p>
        <p>{CRISIS_NOTE}</p>
      </>}
    />
  );
}
