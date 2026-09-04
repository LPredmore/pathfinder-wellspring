import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function ResourcesVACommunityCare() {
  return (
    <AuthorityPage
      title="VA Community Care Mental Health Resources"
      description="Plain-language resources for veterans navigating VA Community Care mental health referrals, authorization, access barriers, and documentation to keep."
      canonical="/resources/va-community-care"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "VA Community Care", url: "/resources/va-community-care" },
      ]}
      eyebrow="Resource Category"
      h1="VA Community Care Mental Health Resources"
      subhead="A practical starting point for veterans trying to understand the moving parts around referrals, authorization, and community mental health care."
      sections={[
        {
          heading: "Use this category for",
          bullets: [
            "Understanding the difference between a referral, authorization, and an actual scheduled appointment",
            "Keeping track of dates, calls, authorization information, and provider details",
            "Knowing what questions to ask when a Community Care pathway stalls",
            "Thinking through telehealth and community-provider options",
            "Recognizing when a provider can treat you but may not currently have the authorization needed to bill VA Community Care",
            "Separating what ValorWell can help with from decisions that remain with VA and its Community Care administrators",
          ],
        },
        {
          heading: "Verify current rules and authorization",
          body: "Community Care eligibility, authorization, referral status, network participation, and administrative requirements can change and can vary by circumstance. Use these resources to understand the process and organize your questions, then verify current status with the responsible VA or Community Care source before relying on it for care or payment.",
        },
      ]}
      related={[
        { name: "Clinical Documentation Resources", href: "/resources/documentation", body: "Understand ethical treatment records, documentation boundaries, and what to keep." },
        { name: "Veteran Mental Health Resources", href: "/resources/veteran-mental-health", body: "Care access, PTSD support, family strain, telehealth, and when to seek help." },
        { name: "Find Care", href: "/get-care", body: "See the care pathways ValorWell can currently support." },
      ]}
      finalCTAs={[
        { label: "Find Care", to: "/get-care" },
        { label: "Explore All Resources", to: "/resources", variant: "secondary" },
      ]}
    />
  );
}
