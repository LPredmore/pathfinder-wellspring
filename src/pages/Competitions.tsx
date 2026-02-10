import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema, FAQSchema } from "@/components/SEO";
import { ContentSection, StepsSection, FAQSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Trophy, Users, Heart, Star, Mic, Award } from "lucide-react";

const faqItems = [
  {
    question: "Is my donation tax-deductible?",
    answer:
      "ValorWell is a registered 501(c)(3) nonprofit. Donations are generally tax-deductible to the extent allowed by law. A receipt will be provided during checkout.",
  },
  {
    question: "Where does the money go?",
    answer:
      "Donations fund mental health therapy sessions for veterans through the Bridge Program.",
  },
  {
    question: "Why monthly sponsorship matters",
    answer:
      "Monthly sponsors create predictability—helping fund sessions consistently and plan ahead for veterans who need continued support.",
  },
  {
    question: "What is Zeffy's optional checkout tip?",
    answer:
      "Zeffy is fee-free for nonprofits. Donors may see an optional tip during checkout and can adjust it (including to $0) if they prefer.",
  },
  {
    question: "Can I support a creator and still fund sessions?",
    answer:
      "Yes. Supporting a creator is simply a way to route your donation through their fundraising page—your gift still funds sessions.",
  },
  {
    question: "I'm a creator—how do I join?",
    answer:
      "Click Apply to Compete. If selected, you'll receive onboarding steps, your fundraising page setup instructions, and the \"Why I'm here\" video prompt.",
  },
];

const steps = [
  {
    number: 1,
    title: "Creators Apply and Get Selected",
    description:
      "Creators submit an application and, if selected, receive their own fundraising page.",
  },
  {
    number: 2,
    title: "Fundraise on the Leaderboard",
    description:
      "Each creator competes on the leaderboard by rallying their community to sponsor sessions.",
  },
  {
    number: 3,
    title: "Donors Sponsor Sessions",
    description:
      "Donors sponsor sessions by donating to a creator's page or directly to the campaign.",
  },
];

const milestones = [
  { icon: Star, count: "10 sessions funded", label: "Featured Moment spotlight" },
  { icon: Users, count: "25 sessions funded", label: "Added to the Wall of Advocates" },
  { icon: Mic, count: "50 sessions funded", label: "Podcast feature" },
  { icon: Award, count: "Top 5", label: "Finalist spotlight" },
];

export default function Competitions() {
  return (
    <Layout>
      <SEO
        title="Creator Challenge: Sponsor a Veteran"
        description="A 30-day creator challenge funding real therapy sessions for veterans. $50 sponsors 1 session. Compete, support a creator, or sponsor a session today."
        canonical="/competitions"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Creator Challenge", url: "/competitions" },
        ]}
      />
      <FAQSchema faqs={faqItems} />

      {/* Hero */}
      <section className="section-padding bg-primary/5">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Creator Challenge: Sponsor a Veteran
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Fund real therapy sessions for veterans — one session at a time.
          </p>
          <div className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold">
            $50 sponsors 1 therapy session
          </div>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            This is direct care through ValorWell's Bridge Program, helping
            veterans access support while longer timelines play out.
          </p>
        </div>
      </section>

      {/* Participation Cards */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Choose How You Want to Participate
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="flex flex-col">
              <CardHeader>
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Compete as a Creator</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-2 text-muted-foreground">
                <p>
                  If you're a creator with a mission and a community, compete on
                  the leaderboard by fundraising through your own campaign page.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Your own fundraising page and link</li>
                  <li>The chance to be featured by ValorWell throughout the month</li>
                  <li>A clear, tangible mission: $50 = 1 session</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/competitions/apply">Apply to Compete</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="flex flex-col">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Support a Creator</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 text-muted-foreground">
                <p>
                  Want to back a specific creator? Choose one from the
                  leaderboard and donate through their page.
                </p>
              </CardContent>
              <CardFooter>
                {/* TODO: Replace with Zeffy leaderboard link */}
                <Button asChild variant="secondary" className="w-full">
                  <a href="#support-creator">Support a Creator</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="flex flex-col">
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Sponsor a Session</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 text-muted-foreground space-y-3">
                <p>
                  Prefer to donate directly to the campaign? Sponsor sessions
                  without choosing a specific creator.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                  <span className="rounded bg-muted px-3 py-1.5 text-center">$50 = 1 session</span>
                  <span className="rounded bg-muted px-3 py-1.5 text-center">$100 = 2 sessions</span>
                  <span className="rounded bg-muted px-3 py-1.5 text-center">$250 = 5 sessions</span>
                  <span className="rounded bg-muted px-3 py-1.5 text-center">$500 = 10 sessions</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                {/* TODO: Replace with Zeffy main campaign link */}
                <Button asChild className="w-full">
                  <a href="#sponsor-session">Sponsor a Session</a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="#sponsor-session">Become a Monthly Sponsor</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <ContentSection title="What This Is" variant="alt">
        <p>
          The Creator Challenge is a 30-day peer-to-peer fundraising competition
          where creators and community advocates raise money to sponsor therapy
          sessions for veterans through ValorWell's Bridge Program.
        </p>
        <p className="mt-4">
          It's not an "awareness" campaign. It's a direct funding mechanism for
          real treatment sessions.
        </p>
      </ContentSection>

      {/* How It Works */}
      <StepsSection
        title="How It Works"
        steps={steps}
      />

      {/* Eligibility & Milestones */}
      <section className="section-padding section-alt">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Eligibility &amp; Milestones
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            To be eligible for the grand prize, a creator must fund at least 25
            sessions ($1,250) during the contest period. The creator who raises
            the most by the deadline wins.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {milestones.map((m) => (
              <div
                key={m.count}
                className="flex flex-col items-center text-center rounded-lg border bg-card p-6"
              >
                <m.icon className="h-8 w-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">{m.count}</span>
                <span className="text-sm text-muted-foreground mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize */}
      <ContentSection title="Prize">
        <p>
          The top fundraiser wins a romantic resort vacation package in Mexico
          (provided through LuxGive). Full prize details and terms are provided
          on the application page.
        </p>
      </ContentSection>

      {/* FAQ */}
      <FAQSection items={faqItems} />

      {/* Final CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sponsor a Session Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            If you've ever wanted to help veterans in a concrete way, this is
            it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* TODO: Replace with Zeffy main campaign link */}
            <Button asChild size="lg">
              <a href="#sponsor-session">Sponsor a Session</a>
            </Button>
            {/* TODO: Replace with Zeffy leaderboard link */}
            <Button asChild size="lg" variant="secondary">
              <a href="#support-creator">Support a Creator</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/competitions/apply">Apply to Compete</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
