import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function ResourcesVeteranMentalHealth() {
  return (
    <AuthorityPage
      title="Veteran Mental Health Resources"
      description="Practical resources on veteran mental health care, therapy access, PTSD-related concerns, family strain, transition stress, telehealth, and care barriers."
      canonical="/resources/veteran-mental-health"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Veteran Mental Health", url: "/resources/veteran-mental-health" },
      ]}
      eyebrow="Resource Category"
      h1="Veteran Mental Health Resources"
      subhead="Practical starting points for veterans and families trying to understand what is happening and what a useful next step could look like."
      sections={[
        {
          heading: "Use this category for",
          bullets: [
            "Understanding common barriers to starting or staying in therapy",
            "Recognizing when symptoms, stress, or family strain are interfering with daily life",
            "Thinking through telehealth as a care option",
            "Preparing questions before contacting a therapist or care system",
            "Understanding how mental health concerns can affect the whole family system",
            "Separating immediate crisis needs from routine outpatient care",
            "Finding the right ValorWell care or resource path without assuming every service is currently available",
          ],
        },
        {
          heading: "Resources are not a diagnosis",
          body: "Educational material can help you recognize patterns and prepare better questions, but it cannot determine a diagnosis, replace an individual clinical assessment, or tell you what treatment is right for you. Use the information to make the next conversation more useful—not to replace it.",
        },
      ]}
      related={[
        { name: "Find Care", href: "/get-care", body: "See the mental health care pathways ValorWell can currently support." },
        { name: "Family Systems Resources", href: "/resources/family-systems", body: "Communication, parenting systems, emotional regulation, and conflict repair." },
        { name: "All Resources", href: "/resources", body: "Return to the full ValorWell resource hub." },
      ]}
      finalCTAs={[
        { label: "Find Care", to: "/get-care" },
        { label: "Explore All Resources", to: "/resources", variant: "secondary" },
      ]}
      finalNote={CRISIS_NOTE}
    />
  );
}
