import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function DocumentationSupport() {
  return (
    <AuthorityPage
      title="Clinical Documentation Support for Veterans"
      description="ValorWell believes clinical documentation for veterans should be accurate, ethical, and based on real care, not predatory systems or letters on demand."
      canonical="/documentation-support"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Documentation Support", url: "/documentation-support" },
      ]}
      eyebrow="Documentation Support"
      h1="Clinical documentation should be accurate, ethical, and based on real care."
      subhead="ValorWell believes veterans should not have to rely on predatory organizations just to get support and documentation from mental health professionals."
      heroCTAs={[
        { label: "Get Care", to: "/get-care" },
        { label: "Support the Mission", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "Why documentation matters",
          bullets: [
            "Care continuity across providers and systems.",
            "An accurate treatment history.",
            "Symptom tracking over time.",
            "Functional impact in real life.",
            "Communication between systems that often do not talk.",
            "Records that reflect what actually happened in care.",
          ],
        },
        {
          heading: "The problem with predatory systems",
          body: "When veterans cannot access timely care or appropriate documentation, expensive third-party organizations often fill the gap. ValorWell is working to build a more ethical path: documentation that comes out of real treatment, not as a product sold separately from it.",
        },
        {
          heading: "What ethical documentation means",
          bullets: [
            "Based on real clinical contact.",
            "Accurate.",
            "Within the clinician's professional scope.",
            "Not exaggerated.",
            "Not guaranteed in advance.",
            "Not purchased as a standalone outcome.",
            "Connected to ongoing treatment when appropriate.",
          ],
        },
        {
          heading: "What ValorWell can and cannot do",
          columns: [
            {
              title: "We can",
              bullets: [
                "Provide therapy records when clinically appropriate.",
                "Document symptoms and treatment.",
                "Support continuity of care across providers.",
                "Provide appropriate letters or records when clinically justified.",
                "Help veterans understand what documentation means.",
              ],
            },
            {
              title: "We cannot",
              bullets: [
                "Guarantee VA disability outcomes.",
                "Sell letters on demand.",
                "Fabricate or exaggerate symptoms.",
                "Replace VA adjudication.",
                "Provide legal advice.",
                "Bypass clinical ethics.",
              ],
            },
          ],
        },
      ]}
      faqs={[
        {
          question: "Can therapy records help document mental health symptoms?",
          answer:
            "Yes. Treatment records can describe symptoms, history, treatment, and functional impact when documented through real clinical care.",
        },
        {
          question: "Does ValorWell write nexus letters?",
          answer:
            "ValorWell does not sell letters on demand. Any documentation that comes from us is based on real clinical care and ethical professional judgment.",
        },
        {
          question: "Can ValorWell guarantee disability benefits?",
          answer:
            "No. Disability decisions are made by the VA. ValorWell does not control or guarantee those outcomes.",
        },
        {
          question: "What makes documentation ethical?",
          answer:
            "Ethical documentation is accurate, based on actual clinical contact, within professional scope, and not exaggerated or fabricated.",
        },
        {
          question: "Why is documentation hard for veterans to get?",
          answer:
            "Access to clinicians is limited, systems are fragmented, and many veterans never have a place where their treatment is consistently documented over time.",
        },
        {
          question: "How does documentation fit into treatment?",
          answer:
            "Documentation is a byproduct of real care. It records what happened in treatment so that a veteran and other providers have an accurate picture.",
        },
        {
          question: "Is this legal advice?",
          answer:
            "No. ValorWell does not provide legal advice. For legal questions, consult an attorney or an accredited representative.",
        },
        { question: "What if I am in crisis?", answer: CRISIS_NOTE },
      ]}
      related={[
        { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
        { name: "VA Community Care Mental Health", href: "/va-community-care-mental-health" },
        { name: "Documentation Resources", href: "/resources/documentation" },
      ]}
      finalCTAs={[
        { label: "Start Real Care", to: "/get-care" },
        { label: "Go Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      finalNote="Documentation should be based on real clinical care, accurate records, and ethical professional judgment."
    />
  );
}
