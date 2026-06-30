import { AuthorityPage, CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function Partners() {
  return (
    <AuthorityPage
      title="Partner with ValorWell | Build Better Systems for Veterans and Families"
      description="Partner with ValorWell on care access, VA-system education, Beyond the Yellow, practical family tools, and mission-aligned media."
      canonical="/partners"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Partners", url: "/partners" },
      ]}
      eyebrow="Partner With Us"
      h1="Partner with ValorWell to change the support ecosystem around veterans and families."
      subhead="ValorWell works with organizations, sponsors, creators, providers, and community leaders who want to make care access, VA navigation, documentation education, and family support easier to understand and easier to fund."
      heroCTAs={[
        { label: "Start a Partnership Conversation", to: "/contact" },
        { label: "Explore Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      sections={[
        {
          heading: "The problem is bigger than one clinic.",
          body: "Veterans and families often face long waits, fragmented care, confusing systems, limited provider access, documentation challenges, and a lack of practical support. ValorWell is building a mission-driven ecosystem around those gaps.",
        },
        {
          heading: "Partner types",
          cards: [
            { title: "Veteran Organizations", body: "Share resources, help veterans understand options, and support education around VA-related barriers." },
            { title: "Community Organizations", body: "Bring practical resources and education to families who need clearer pathways." },
            { title: "Businesses and Sponsors", body: "Support Beyond the Yellow, sponsor care, or fund education and resources." },
            { title: "Clinics and Providers", body: "Collaborate around care access education, continuity of care, and responsible documentation awareness." },
            { title: "Creators and Media Partners", body: "Help explain the mission to people who may never search for veteran support until they are already stuck." },
            { title: "Churches and Civic Groups", body: "Organize community-backed support, sponsorships, and resource sharing." },
          ],
        },
        {
          heading: "Ways to work together",
          bullets: [
            "Beyond the Yellow sponsorship",
            "Podcast or video guest conversations",
            "Community education",
            "Fundraising campaigns",
            "App and tool distribution through BestSelfs",
            "Veteran and family resource sharing",
            "Employer or organization support",
            "Grant and funder introductions",
          ],
        },
        {
          heading: "What makes ValorWell different",
          cards: [
            { title: "Ecosystem focus", body: "We are focused on the path veterans and families have to navigate, not just isolated services." },
            { title: "Documentation-aware support", body: "We talk about documentation ethically, through care relationships and accurate records — not letters on demand." },
            { title: "Practical tools through BestSelfs", body: "Family tools help support the mission and extend support outside formal systems." },
            { title: "Education engine", body: "Videos, podcasts, and resources help people understand the systems before crisis hits." },
            { title: "Beyond the Yellow", body: "A clear umbrella campaign for action, sponsorships, and funded support." },
            { title: "Model-first transparency", body: "We are defining what should be measured as the new model grows." },
          ],
        },
      ]}
      related={[
        { name: "Beyond the Yellow", href: "/beyondtheyellow", body: "The umbrella campaign for financial action and sponsorship." },
        { name: "Our Model", href: "/our-model", body: "How ValorWell is building a better pathway." },
        { name: "Videos & Podcast", href: "/media/youtube-podcast", body: "Education and conversations tied to the mission." },
      ]}
      finalCTAs={[
        { label: "Start a Partnership Conversation", to: "/contact" },
        { label: "Go Beyond the Yellow", to: "/beyondtheyellow", variant: "secondary" },
      ]}
      finalNote={CRISIS_NOTE}
    />
  );
}
