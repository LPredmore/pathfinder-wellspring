import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function ResourcesVeteranMentalHealth() {
  return (
    <AuthorityPage
      title="Veteran Mental Health Resources"
      description="Resources on veteran therapy access, PTSD support, family strain, emotional regulation, telehealth, and care barriers."
      canonical="/resources/veteran-mental-health"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Veteran Mental Health", url: "/resources/veteran-mental-health" },
      ]}
      eyebrow="Resource Category"
      h1="Veteran Mental Health Resources"
      subhead="Practical guides for veterans and the people around them."
      sections={[
        {
          heading: "What this category covers",
          bullets: [
            "Therapy access",
            "PTSD support",
            "Family strain",
            "Emotional regulation",
            "Transition stress",
            "Telehealth",
            "When to seek help",
          ],
        },
        {
          heading: "Articles (coming soon)",
          cards: [
            { title: "How to know it's time to talk to someone", body: "Placeholder — content in development." },
            { title: "PTSD-related symptoms families often miss", body: "Placeholder — content in development." },
            { title: "Why telehealth works for many veterans", body: "Placeholder — content in development." },
          ],
        },
      ]}
      related={[
        { name: "Veteran Mental Health Care (authority)", href: "/veteran-mental-health-care" },
        { name: "Military Family Therapy", href: "/military-family-therapy" },
        { name: "Get Care", href: "/get-care" },
      ]}
      finalCTAs={[
        { label: "Get Care", to: "/get-care" },
        { label: "Support the Mission", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      finalNote={CRISIS_NOTE}
    />
  );
}
