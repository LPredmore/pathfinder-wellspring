import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesVACommunityCare() {
  return (
    <AuthorityPage
      title="VA Community Care Mental Health Resources"
      description="Resources for veterans navigating VA Community Care mental health referrals, access barriers, care options, and documentation."
      canonical="/resources/va-community-care"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "VA Community Care", url: "/resources/va-community-care" },
      ]}
      eyebrow="Resource Category"
      h1="VA Community Care Mental Health Resources"
      subhead="Plain-language guidance for veterans trying to use Community Care for mental health needs."
      sections={[
        {
          heading: "What this category covers",
          bullets: [
            "Referrals",
            "Authorization",
            "Wait times",
            "Care options",
            "Questions to ask",
            "Documentation to keep",
          ],
        },
        {
          heading: "Articles (coming soon)",
          cards: [
            { title: "How VA Community Care referrals usually work", body: "Placeholder — content in development." },
            { title: "What to keep in a personal care file", body: "Placeholder — content in development." },
            { title: "When telehealth is appropriate for Community Care", body: "Placeholder — content in development." },
          ],
        },
      ]}
      related={[
        { name: "VA Community Care Mental Health (authority)", href: "/va-community-care-mental-health" },
        { name: "Get Care", href: "/get-care" },
        { name: "Documentation Support", href: "/documentation-support" },
      ]}
      finalCTAs={[
        { label: "Get Care", to: "/get-care" },
        { label: "Support the Mission", to: "/beyondtheyellow", variant: "secondary" },
      ]}
    />
  );
}
