import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function VACommunityCareMentalHealth() {
  return (
    <AuthorityPage
      title="VA Community Care Mental Health Support"
      description="Learn how ValorWell supports veterans navigating mental health care access, VA Community Care barriers, referrals, documentation, and practical next steps."
      canonical="/va-community-care-mental-health"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "VA Community Care Mental Health", url: "/va-community-care-mental-health" },
      ]}
      eyebrow="VA Community Care"
      h1="VA Community Care mental health access can be confusing, slow, and hard to navigate."
      subhead="ValorWell is working to build a better support path for veterans who need timely mental health care and practical guidance."
      heroCTAs={[
        { label: "Find Care", to: "/get-care" },
        { label: "Review Community Care Resources", to: "/resources/va-community-care", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "Why VA Community Care matters",
          body: "Many veterans may need care outside a VA facility because of wait times, distance, availability, or fit. Community Care exists to fill those gaps, but reaching it can be its own challenge.",
        },
        {
          heading: "Common barriers",
          cards: [
            { title: "Referral confusion", body: "It is not always clear who initiates what." },
            { title: "Appointment delays", body: "Even after referral, scheduling can stall." },
            { title: "Provider availability", body: "Few providers can mean longer waits." },
            { title: "Authorization questions", body: "Coverage and approval can be unclear." },
            { title: "Communication gaps", body: "Information can fall between systems." },
            { title: "Not knowing what to ask", body: "Without a clear question, it is harder to identify what is actually stalled." },
          ],
        },
        {
          heading: "How ValorWell fits",
          body: "ValorWell supports veterans seeking mental health care and works to reduce access barriers where possible. VA Community Care eligibility, referrals, authorization, and coverage depend on VA processes and individual circumstances. We do not control VA decisions or promise that a Community Care path will be available in every case.",
        },
        {
          heading: "What veterans can prepare",
          bullets: [
            "Any VA referral or authorization information, if applicable.",
            "Current provider information, if you have one.",
            "Insurance or coverage details.",
            "Treatment goals in your own words.",
            "Relevant treatment records or documentation you already have.",
            "Specific questions about the access barrier you are running into.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is VA Community Care?",
          answer:
            "VA Community Care allows eligible veterans to receive care from non-VA providers in certain circumstances. Eligibility and current rules are determined by the VA.",
        },
        {
          question: "Can veterans receive mental health care through Community Care?",
          answer:
            "Mental health care can be provided through Community Care for eligible veterans when the required VA pathway is in place. Specifics depend on the veteran's circumstances and current VA processes.",
        },
        {
          question: "Do I need a VA referral?",
          answer:
            "Community Care generally requires VA referral and authorization. Verify the requirements and current status for your situation with the responsible VA or Community Care source.",
        },
        {
          question: "Can ValorWell guarantee Community Care approval?",
          answer:
            "No. Authorization and eligibility are VA decisions. ValorWell cannot guarantee referral, authorization, placement, or payment.",
        },
        {
          question: "What if I am waiting months?",
          answer:
            "Use the Community Care resources to organize what you know and what to ask next, then check Find Care or contact ValorWell about any current pathway that may fit your situation.",
        },
        {
          question: "Can telehealth be used?",
          answer:
            "Telehealth may be available depending on authorization, state, clinician eligibility, availability, and clinical fit.",
        },
        {
          question: "What documentation should I keep?",
          answer:
            "Keep referrals, authorizations, appointment information, and relevant communication from the VA, Community Care administrators, and providers. Those records can help clarify what has already happened and what is still missing.",
        },
        { question: "What if I am in crisis?", answer: CRISIS_NOTE },
      ]}
      related={[
        { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care", body: "See the broader ValorWell care approach for veterans." },
        { name: "Clinical Documentation Resources", href: "/resources/documentation", body: "Understand ethical treatment records and documentation boundaries." },
        { name: "VA Community Care Resources", href: "/resources/va-community-care", body: "Use the practical resource category for referrals, authorization, and records to keep." },
      ]}
      finalCTAs={[
        { label: "Find Current Care Options", to: "/get-care" },
        { label: "Support ValorWell", to: "/support", variant: "secondary" },
      ]}
      finalNote="VA processes, eligibility, and authorization requirements can change. Verify current specifics with the responsible VA or Community Care source for your situation."
    />
  );
}
