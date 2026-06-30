import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function Partners() {
  return (
    <AuthorityPage
      title="Partner with ValorWell | Veteran Mental Health, Family Support and Mission Partnerships"
      description="Partner with ValorWell to help expand mental health access, practical tools, education, and support systems for veterans and military-connected families."
      canonical="/partners"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Partners", url: "/partners" },
      ]}
      eyebrow="Partnerships"
      h1="Partner with ValorWell to help build a better support system for veterans and families."
      subhead="ValorWell is looking for mission-aligned partners who want to expand access to care, practical tools, education, and support for veterans and military-connected families."
      heroCTAs={[
        { label: "Partner With ValorWell", to: "/contact" },
        { label: "View Sponsorship Options", to: "/sponsors", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "The problem is bigger than one clinic.",
          body: "Veterans and families often face long waits, fragmented care, confusing systems, limited provider access, and a lack of practical support. ValorWell is building a mission-driven ecosystem that combines mental health care, ethical documentation, family tools, education, media, and supporter-funded access.",
        },
        {
          heading: "Partner types",
          cards: [
            { title: "Veteran Organizations", body: "Help connect veterans and families with care, resources, education, and support." },
            { title: "Community Organizations", body: "Partner around local awareness, referrals, family support, and practical resources." },
            { title: "Businesses and Sponsors", body: "Fund access to care, sponsor education, or support mission-aligned campaigns." },
            { title: "Clinics and Providers", body: "Collaborate around referrals, care access, provider education, and responsible documentation." },
            { title: "Creators and Media Partners", body: "Help reach people who need to understand the mission but may never search for mental health care directly." },
            { title: "Churches and Civic Groups", body: "Help identify families who need support and create pathways for community-backed care." },
          ],
        },
        {
          heading: "Ways to partner",
          bullets: [
            "Sponsor care",
            "Referral partnership",
            "Content collaboration",
            "Podcast or video guest",
            "Community education",
            "Fundraising campaign",
            "App and tool distribution",
            "Veteran and family resource sharing",
            "Employer or organization support",
            "Grant and funder introductions",
          ],
        },
        {
          heading: "What makes ValorWell different",
          cards: [
            { title: "Care access + documentation awareness", body: "Clinical work that respects continuity of care, not nexus-letters-on-demand." },
            { title: "Veterans and family focus", body: "We treat the system around the veteran, not just the veteran in isolation." },
            { title: "Practical tools through BestSelfs", body: "Reading, emotional skills, and family communication tools that work outside the therapy room." },
            { title: "Media ecosystem for awareness", body: "YouTube, podcast, and shorts that bring people into the mission before crisis hits." },
            { title: "Supporter-funded care model", body: "A sustainable way to expand access instead of waiting on a single funding source." },
            { title: "Transparent impact tracking", body: "Sessions delivered, care funded, and barriers documented — published as the data matures." },
          ],
        },
      ]}
      related={[
        { name: "Sponsors", href: "/sponsors", body: "Sponsorship opportunities, levels, and recognition." },
        { name: "Referral Partners", href: "/referral-partners", body: "Refer a veteran or family to a mission-driven path." },
        { name: "Collaborate", href: "/media/collaborate", body: "Media, podcast, and creator collaborations." },
      ]}
      finalCTAs={[
        { label: "Partner With ValorWell", to: "/contact" },
        { label: "Sponsor Care", to: "/sponsor-care", variant: "secondary" },
        { label: "Fund Access to Care", to: "/fund-access-to-care", variant: "secondary" },
      ]}
      finalNote={CRISIS_NOTE}
    />
  );
}
