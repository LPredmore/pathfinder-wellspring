import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function VeteranMentalHealthCare() {
  return (
    <AuthorityPage
      title="Veteran Mental Health Care | Therapy and Support for Veterans"
      description="ValorWell helps veterans access mental health care, practical tools, ethical documentation support, and family-aware support without being left to navigate the system alone."
      canonical="/veteran-mental-health-care"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Veteran Mental Health Care", url: "/veteran-mental-health-care" },
      ]}
      eyebrow="Veteran Mental Health Care"
      h1="Mental health care for veterans who need more than another waiting list."
      subhead="ValorWell helps veterans access practical mental health support through a system built around care, documentation, family strain, and real-world barriers."
      heroCTAs={[
        { label: "Get Care", to: "/get-care" },
        { label: "Support the Mission", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "Veterans deserve support that understands the whole system",
          body: "Veterans often need more than a therapy appointment. They may need clinicians who understand trauma, transition, family stress, care delays, VA access issues, and the documentation that lives alongside real treatment. We build care around all of that, not around a single hour on a calendar.",
        },
        {
          heading: "What ValorWell helps with",
          cards: [
            { title: "Individual therapy", body: "One-on-one care with licensed clinicians." },
            { title: "Trauma and stress support", body: "Trauma-informed approaches that respect pace." },
            { title: "PTSD-related concerns", body: "Symptom-focused care, not labels first." },
            { title: "Family and relationship strain", body: "Care that sees the people around you." },
            { title: "Emotional regulation", body: "Practical skills you can actually use." },
            { title: "Care navigation education", body: "Help understanding the system you're in." },
            { title: "Appropriate clinical documentation", body: "Records that reflect real treatment." },
            { title: "Telehealth access", body: "Care from where you are, when possible." },
          ],
        },
        {
          heading: "Why access is difficult",
          body: "Long waitlists, limited in-network providers, insurance friction, fragmented systems, and confusion around VA Community Care or CHAMPVA all make it harder to get care. The problem usually isn't the veteran. It's the system around the veteran.",
        },
        {
          heading: "Our approach",
          bullets: [
            "Care first.",
            "Documentation when clinically appropriate.",
            "Practical tools that fit real life.",
            "Family-aware support.",
            "Ethical clinical standards.",
            "Telehealth delivery when available.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Does ValorWell work with veterans?",
          answer:
            "Yes. Veterans and military-connected families are the core population we serve.",
        },
        {
          question: "Is care available by telehealth?",
          answer:
            "Telehealth is our primary care delivery. Availability depends on state licensure and clinician fit.",
        },
        {
          question: "Can ValorWell help with PTSD-related concerns?",
          answer:
            "Yes. Our clinicians work with trauma-related symptoms using established, evidence-informed approaches.",
        },
        {
          question: "Can therapy documentation support a veteran's broader care record?",
          answer:
            "When clinically appropriate, treatment records can document symptoms, history, and functional impact. Documentation should be based on real clinical care, accurate records, and ethical professional judgment.",
        },
        {
          question: "Does ValorWell guarantee VA disability outcomes?",
          answer:
            "No. VA disability decisions are made by the VA. ValorWell does not control, guarantee, or sell those outcomes.",
        },
        { question: "What should I do if I am in crisis?", answer: CRISIS_NOTE },
      ]}
      related={[
        { name: "Military Family Therapy", href: "/military-family-therapy", body: "Support for spouses, kids, and the household." },
        { name: "Documentation Support", href: "/documentation-support", body: "Ethical documentation built on real care." },
        { name: "CHAMPVA Mental Health", href: "/champva-mental-health" },
        { name: "VA Community Care Mental Health", href: "/va-community-care-mental-health" },
      ]}
      finalCTAs={[
        { label: "Start Care with ValorWell", to: "/get-care" },
        { label: "Go Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      finalNote={CRISIS_NOTE}
    />
  );
}
