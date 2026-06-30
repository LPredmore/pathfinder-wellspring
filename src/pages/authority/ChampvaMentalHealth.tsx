import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function ChampvaMentalHealth() {
  return (
    <AuthorityPage
      title="CHAMPVA Mental Health Providers and Therapy Support"
      description="ValorWell supports CHAMPVA-connected families seeking mental health care, telehealth options, and practical guidance around care access barriers."
      canonical="/champva-mental-health"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "CHAMPVA Mental Health", url: "/champva-mental-health" },
      ]}
      eyebrow="CHAMPVA Mental Health"
      h1="CHAMPVA mental health care should not be this hard to find."
      subhead="Many CHAMPVA families struggle to find mental health providers who understand the system, accept the coverage, and can provide timely care."
      heroCTAs={[{ label: "Get Care", to: "/get-care" }]}
      sections={[
        {
          heading: "Why CHAMPVA families struggle to find care",
          bullets: [
            "Limited provider participation in CHAMPVA.",
            "Confusion around claims and reimbursement.",
            "Long wait times when providers can be found.",
            "Families having to call dozens of offices.",
            "Providers and front desks misunderstanding what CHAMPVA is.",
          ],
        },
        {
          heading: "Who this page is for",
          bullets: [
            "Spouses of veterans",
            "Dependents",
            "Caregivers",
            "Military-connected families",
            "Families looking for telehealth therapy",
            "Families who have been turned away by providers",
          ],
        },
        {
          heading: "How ValorWell approaches CHAMPVA care",
          body: "ValorWell works to support CHAMPVA-connected families and reduce barriers to care where possible. Availability, coverage, and eligibility may vary based on your situation and state.",
        },
        {
          heading: "What support may include",
          cards: [
            { title: "Therapy", body: "Care with licensed clinicians." },
            { title: "Family support", body: "Care that sees the household." },
            { title: "Treatment planning", body: "A real plan, not just sessions." },
            { title: "Practical tools", body: "Skills you can use between visits." },
            { title: "Documentation as part of real care", body: "Records built on actual treatment." },
            { title: "Help understanding next steps", body: "Plain-language guidance on the system." },
          ],
        },
        {
          heading: "Why this is part of our mission",
          body: "CHAMPVA access barriers are one of the reasons ValorWell exists. We built the organization in part to help families who kept hitting the same wall.",
        },
      ]}
      faqs={[
        {
          question: "What is CHAMPVA?",
          answer:
            "CHAMPVA (Civilian Health and Medical Program of the Department of Veterans Affairs) is a federal health benefits program that may cover certain family members of veterans who meet eligibility criteria. Eligibility, coverage, and reimbursement are determined by the VA.",
        },
        {
          question: "Why is it hard to find CHAMPVA mental health providers?",
          answer:
            "Many private providers are unfamiliar with CHAMPVA, do not bill it, or do not understand how reimbursement works. That leaves families calling provider after provider before finding care.",
        },
        {
          question: "Does ValorWell accept CHAMPVA?",
          answer:
            "We work to support CHAMPVA-connected families. Specific coverage, eligibility, and acceptance for your situation should be confirmed with our team before starting care.",
        },
        {
          question: "Can CHAMPVA family members use telehealth?",
          answer:
            "Telehealth may be available depending on your state, clinician licensure, and individual circumstances.",
        },
        {
          question: "What should I ask before starting care?",
          answer:
            "Ask whether the provider has experience with CHAMPVA, how billing is handled, what to expect for documentation, and how scheduling and telehealth work.",
        },
        {
          question: "Can ValorWell guarantee coverage?",
          answer:
            "No. Coverage decisions are made by CHAMPVA and the VA. We can help you understand options and next steps.",
        },
        {
          question: "What if I cannot find a provider near me?",
          answer:
            "Telehealth often expands the pool of available clinicians. Reach out and we can talk through what is realistically available for your situation.",
        },
        { question: "What if I am in crisis?", answer: CRISIS_NOTE },
      ]}
      related={[
        { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
        { name: "Military Family Therapy", href: "/military-family-therapy" },
        { name: "VA Community Care Mental Health", href: "/va-community-care-mental-health" },
        { name: "CHAMPVA Resources", href: "/resources/champva" },
      ]}
      finalCTAs={[
        { label: "Ask About CHAMPVA Care", to: "/get-care" },
        { label: "Go Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      finalNote="Coverage and eligibility details depend on CHAMPVA and the VA and may change. Confirm specifics for your situation before starting care."
    />
  );
}
