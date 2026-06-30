import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function MilitaryFamilyTherapy() {
  return (
    <AuthorityPage
      title="Military Family Therapy and Veteran Family Support"
      description="ValorWell helps veterans and military-connected families address stress, communication, PTSD-related strain, parenting, and family systems."
      canonical="/military-family-therapy"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Military Family Therapy", url: "/military-family-therapy" },
      ]}
      eyebrow="Military Family Therapy"
      h1="Military and veteran families carry stress the system often does not see."
      subhead="ValorWell helps families work through communication, stress, conflict, transition, trauma-related strain, and the real-life impact of military-connected mental health challenges."
      heroCTAs={[{ label: "Get Care", to: "/get-care" }]}
      sections={[
        {
          heading: "Families need support too",
          bullets: [
            "Family members are affected by trauma and stress, not only the veteran.",
            "Spouses and children often carry invisible burdens.",
            "Conflict can become the visible symptom of deeper strain.",
            "Support should include the family system when appropriate.",
          ],
        },
        {
          heading: "Common issues we work with",
          cards: [
            { title: "Communication breakdowns" },
            { title: "Emotional distance" },
            { title: "Anger and irritability" },
            { title: "Parenting strain" },
            { title: "Role changes" },
            { title: "Caregiver stress" },
            { title: "Transition stress" },
            { title: "PTSD-related relationship impact" },
          ],
        },
        {
          heading: "ValorWell's approach",
          bullets: [
            "Practical tools the family can actually use.",
            "Family systems thinking, not just one person at a time.",
            "Emotional regulation skills.",
            "Communication frameworks.",
            "Therapy where appropriate.",
            "Education and support for caregivers.",
          ],
        },
        {
          heading: "BestSelfs supports families between sessions",
          body: "Therapy is one hour. The rest of the week is real life. BestSelfs tools (like CoreFeel for emotional skills and NinjaDo for habit-building) give families something to actually use between sessions.",
        },
      ]}
      faqs={[
        {
          question: "Does ValorWell work with spouses and family members?",
          answer:
            "Yes. Military-connected family members are part of who we serve.",
        },
        {
          question: "Can family members receive support even if the veteran is not in therapy?",
          answer:
            "Yes. Family members can pursue care for themselves regardless of whether the veteran in their life is in treatment.",
        },
        {
          question: "Can telehealth work for family support?",
          answer:
            "Telehealth is often a good fit for family-related care, especially across distance or busy schedules. Availability depends on state licensure.",
        },
        {
          question: "Does PTSD affect relationships and parenting?",
          answer:
            "Trauma-related symptoms can affect communication, irritability, sleep, intimacy, and parenting. Support that includes the family can help.",
        },
        { question: "What if my family is in crisis?", answer: CRISIS_NOTE },
        {
          question: "Are BestSelfs tools a replacement for therapy?",
          answer:
            "No. BestSelfs tools support emotional skills and habit-building. They are not a substitute for clinical care.",
        },
      ]}
      related={[
        { name: "Family Systems", href: "/family-systems", body: "Build systems instead of constant reactions." },
        { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
        { name: "BestSelfs", href: "/bestselfs" },
      ]}
      finalCTAs={[
        { label: "Ask About Family Support", to: "/get-care" },
        { label: "Explore BestSelfs", to: "/bestselfs", variant: "secondary" },
      ]}
      finalNote={CRISIS_NOTE}
    />
  );
}
