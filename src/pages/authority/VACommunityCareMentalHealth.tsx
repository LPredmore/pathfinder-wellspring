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
      heroCTAs={[{ label: "Get Care", to: "/get-care" }]}
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
            { title: "Provider availability", body: "Few providers, longer waits." },
            { title: "Authorization questions", body: "Coverage and approval can be unclear." },
            { title: "Communication gaps", body: "Information falls between systems." },
            { title: "Not knowing what to ask", body: "Without a script, it is hard to push." },
          ],
        },
        {
          heading: "How ValorWell fits",
          body: "ValorWell supports veterans seeking mental health care and works to reduce access barriers where possible. VA Community Care eligibility, referrals, authorization, and coverage depend on VA processes and individual circumstances. We do not control VA decisions.",
        },
        {
          heading: "What veterans can prepare",
          bullets: [
            "Any VA referral or authorization information, if applicable.",
            "Current provider information, if you have one.",
            "Insurance or coverage details.",
            "Treatment goals in your own words.",
            "Notes about documentation you may need.",
            "Specific questions about access barriers you are running into.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is VA Community Care?",
          answer:
            "VA Community Care allows eligible veterans to receive care from non-VA providers in certain circumstances. Eligibility and rules are determined by the VA.",
        },
        {
          question: "Can veterans receive mental health care through Community Care?",
          answer:
            "Mental health care is one of the categories that can be provided through Community Care for eligible veterans. Specifics depend on VA processes.",
        },
        {
          question: "Do I need a VA referral?",
          answer:
            "In most cases, Community Care requires VA referral and authorization. The VA determines what is required for your situation.",
        },
        {
          question: "Can ValorWell guarantee Community Care approval?",
          answer:
            "No. Approval is a VA decision. We can help you think through what to ask and what to prepare.",
        },
        {
          question: "What if I am waiting months?",
          answer:
            "Long waits are common. Reach out and we can talk through whether ValorWell is a fit, including telehealth options.",
        },
        {
          question: "Can telehealth be used?",
          answer:
            "Telehealth may be available depending on your state, eligibility, and clinician fit.",
        },
        {
          question: "What documentation should I keep?",
          answer:
            "Keep referrals, authorizations, appointment notes, and any communication from the VA or your providers. These records help you advocate for continuity of care.",
        },
        { question: "What if I am in crisis?", answer: CRISIS_NOTE },
      ]}
      related={[
        { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
        { name: "Documentation Support", href: "/documentation-support" },
        { name: "VA Community Care Resources", href: "/resources/va-community-care" },
      ]}
      finalCTAs={[
        { label: "Contact ValorWell About Care Options", to: "/get-care" },
        { label: "Support the Mission", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      finalNote="VA processes, eligibility, and authorization rules change. Confirm specifics with the VA for your situation."
    />
  );
}
