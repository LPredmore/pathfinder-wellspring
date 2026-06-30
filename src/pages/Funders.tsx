import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function Funders() {
  return (
    <AuthorityPage
      title="Funding ValorWell | A Better Support System for Veterans and Families"
      description="Learn how foundations, grant funders, major donors, and strategic partners can support ValorWell's mission-driven care, documentation, tools, and impact model."
      canonical="/funders"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Funders", url: "/funders" },
      ]}
      eyebrow="For Funders"
      h1="Funding a better support system for veterans and families."
      subhead="ValorWell is building mission-driven infrastructure around mental health access, ethical documentation, practical family tools, education, and long-term support."
      heroCTAs={[
        { label: "Contact ValorWell", to: "/contact" },
        { label: "View Impact", to: "/impact", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "Why this needs to exist.",
          body: "Veterans and families are often left navigating fragmented systems, long waits, limited provider access, confusing coverage barriers, and documentation gaps. When support is not accessible, families suffer and predatory alternatives fill the space.",
        },
        {
          heading: "What ValorWell is building",
          cards: [
            { title: "Care access model", body: "A supporter-funded path that reduces wait barriers." },
            { title: "Documentation-aware clinical support", body: "Ethical clinical work that respects continuity of care." },
            { title: "Family systems tools", body: "Practical tools for the system around the veteran." },
            { title: "BestSelfs product ecosystem", body: "Apps that build emotional skills, communication, and habits." },
            { title: "Media and education engine", body: "YouTube, podcast, and shorts that bring people into the mission." },
            { title: "Supporter-funded care model", body: "A sustainable funding mechanism instead of crisis fundraising." },
            { title: "Public impact tracking", body: "Sessions delivered, care funded, barriers documented." },
          ],
        },
        {
          heading: "Funding priorities",
          cards: [
            { title: "Care Access", body: "Support direct care costs and access-building infrastructure." },
            { title: "Documentation and Care Continuity", body: "Support ethical systems for clinical documentation, treatment records, and continuity of care." },
            { title: "Family Support Tools", body: "Support BestSelfs tools for emotional skills, communication, parenting, reading, and family systems." },
            { title: "Media and Education", body: "Support public education around veteran mental health access, CHAMPVA, VA Community Care, predatory systems, and family support." },
            { title: "Data and Impact", body: "Support better tracking of sessions delivered, care funded, access barriers, and mission outcomes." },
          ],
        },
        {
          heading: "Metrics and proof",
          bullets: [
            "Sessions delivered — tracked and reported as data matures",
            "Direct therapist cost per session: $75",
            "Veterans and families served — placeholder pending publish",
            "Care funded through supporter contributions — placeholder pending publish",
            "CHAMPVA and VA Community Care barriers documented",
            "BestSelfs revenue routed to support the mission",
            "Public impact dashboard in development",
          ],
        },
        {
          heading: "Documents and downloads",
          cards: [
            { title: "Mission one-pager", body: "Concise overview of mission, model, and support paths. View at /mission-one-pager." },
            { title: "Sponsorship packet", body: "Coming soon — request via Contact." },
            { title: "Impact summary", body: "Coming soon — request via Contact." },
            { title: "Future annual report", body: "Planned as data matures." },
            { title: "Program overview", body: "Available on request." },
          ],
        },
      ]}
      related={[
        { name: "Impact", href: "/impact" },
        { name: "Mission One-Pager", href: "/mission-one-pager" },
        { name: "Contact", href: "/contact" },
      ]}
      finalCTAs={[
        { label: "Request Funder Materials", to: "/contact" },
        { label: "View Mission One-Pager", to: "/mission-one-pager", variant: "secondary" },
      ]}
      finalNote={<>
        <p className="mb-2">ValorWell does not guarantee clinical outcomes, treatment availability, or VA disability outcomes. Cost figures reflect direct therapist cost per session, not ValorWell's full operating cost.</p>
        <p>{CRISIS_NOTE}</p>
      </>}
    />
  );
}
