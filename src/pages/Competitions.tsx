import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema, FAQSchema } from "@/components/SEO";
import { ContentSection, StepsSection, FAQSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Unlock, Star, Award, Trophy, Target, Heart, Zap, Shield, ArrowRight, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import { trackDonateConversion } from "@/lib/tracking";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

const faqItems = [
  {
    question: "Who is this for?",
    answer:
      "Creators, advocates, and community-driven people who want to use their audience to help fund therapy sessions for veterans and military families.",
  },
  {
    question: "Do I need a huge following to apply?",
    answer:
      "No. Applicants are placed into divisions based on audience size, so both smaller and larger creators can compete fairly.",
  },
  {
    question: "How do I get selected?",
    answer:
      "Applications are reviewed based on platform presence, fit, and readiness to participate in the campaign.",
  },
  {
    question: "When does commission start?",
    answer: "Commission activates after 5 sessions are funded through your private link.",
  },
  {
    question: "What is Permanent Ambassador Status?",
    answer:
      "At 25 sessions funded, ambassadors unlock long-term status tied to the supporter base they helped build.",
  },
  {
    question: "How do payments work?",
    answer:
      "If earned, ambassador payouts are processed through HomeFromCollege.",
  },
  {
    question: "Can I still help if I don't want to compete?",
    answer:
      "Yes. Visitors can support an ambassador or sponsor sessions directly without applying.",
  },
  {
    question: "What am I not allowed to claim?",
    answer:
      "Ambassadors may not promise outcomes, give medical advice, or misrepresent how the campaign works.",
  },
];

const steps = [
  {
    number: 1,
    title: "Apply",
    description: "Creators apply with their platform details and audience information.",
  },
  {
    number: 2,
    title: "Get Verified",
    description:
      "Follower counts are reviewed, and each ambassador is assigned to the correct division based on their primary platform.",
  },
  {
    number: 3,
    title: "Get Your Private Link",
    description:
      "Approved ambassadors receive a private donation link to track the sessions they help fund.",
  },
  {
    number: 4,
    title: "Start Funding Sessions",
    description:
      "Share your link, compete on the leaderboard, and unlock milestone recognition as you create impact.",
  },
];

const milestones = [
  { sessions: 5, label: "Commission Unlocked", icon: Unlock },
  { sessions: 10, label: "Recognition + Momentum Spotlight", icon: Star },
  { sessions: 25, label: "Permanent Ambassador Status", icon: Award },
  { sessions: 50, label: "Elite Recognition Feature", icon: Trophy },
  { sessions: 100, label: "Champion-Level Impact", icon: Target },
];

const whyCards = [
  {
    icon: Heart,
    title: "Create Real Impact",
    body: "You're not just posting. You're helping fund therapy sessions people actually need.",
  },
  {
    icon: Shield,
    title: "Build Credibility",
    body: "This is the kind of campaign people feel good being associated with — measurable, mission-driven, and real.",
  },
  {
    icon: TrendingUp,
    title: "Earn Ongoing Upside",
    body: "After you reach the required threshold, you can unlock recurring commission tied to the impact you create.",
  },
];

const handleSupportCreator = () => {
  toast("The leaderboard is not live yet — check back when the campaign launches.");
};

export default function Competitions() {
  return (
    <Layout>
      <SEO
        title="Become a ValorWell Ambassador | Beyond the Yellow"
        description="Apply to become a ValorWell Ambassador. Help fund real therapy sessions for veterans and military families — turn your platform into measurable impact."
        canonical="/beyondtheyellow"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Beyond the Yellow", url: "/beyondtheyellow" },
        ]}
      />
      <FAQSchema faqs={faqItems} />

      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        <div className="absolute inset-0 bg-white/70" />

      {/* Hero */}
      <section className="relative z-10 hero-gradient py-20 md:py-28">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Become a ValorWell Ambassador
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Help fund therapy sessions for veterans and military families — and turn your platform into measurable impact.
          </p>
          <div className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold mb-4">
            $75 funds 1 therapy session
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm mb-8">
            This is not just awareness. It is real funding for real treatment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CreatorApplicationForm buttonSize="lg" />
            <Button variant="outline" size="lg" asChild>
              <a href="#how-it-works">
                See How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            If accepted, ambassador payouts are processed through HomeFromCollege.
          </p>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="relative z-10 section-padding">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Choose Your Path
          </h2>

          {/* Ambassador card — dominant */}
          <Card className="border-2 border-primary mb-8">
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-2xl">Become an Ambassador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Apply to represent ValorWell, receive your own private tracked donation link, and compete on the leaderboard to fund therapy sessions.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Your own private donation link</li>
                <li>Compete in the appropriate division</li>
                <li>Unlock milestone recognition</li>
                <li>Become eligible for ongoing commission after 5 sessions funded</li>
                <li>Permanent Ambassador status unlocks at 25 sessions</li>
              </ul>
            </CardContent>
            <CardFooter>
              <CreatorApplicationForm buttonClassName="w-full" />
            </CardFooter>
          </Card>

          {/* Secondary cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <Users className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Support an Ambassador</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 text-muted-foreground text-sm">
                <p>Support a creator you believe in while helping fund therapy sessions.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full" onClick={handleSupportCreator}>
                  View Leaderboard
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <Heart className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Fund a Session Directly</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 text-muted-foreground text-sm">
                <p>Donate straight to the campaign if you want to support the mission without choosing a creator.</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" onClick={() => trackDonateConversion()}>
                  <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">
                    Sponsor a Session
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Campaign Really Is */}
      <ContentSection title="What This Campaign Really Is" variant="alt" className="relative z-10">
        <p>
          The ValorWell Ambassador Challenge is a creator-driven campaign built to fund actual therapy sessions for veterans and military families. Every sponsored session creates direct, measurable impact.
        </p>
        <p className="mt-4">
          This is not a generic awareness campaign. It is a real opportunity to turn attention into treatment — and build lasting influence around something that matters.
        </p>
      </ContentSection>

      {/* How It Works */}
      <div id="how-it-works" className="relative z-10">
        <StepsSection title="How It Works" steps={steps} />
        <div className="container-wide pb-8">
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
            <strong>Hero Division</strong> = under 10,000 followers · <strong>Elite Division</strong> = 10,000+ followers · Division is locked once assigned for the campaign.
          </p>
        </div>
      </div>

      {/* Milestones That Matter */}
      <section className="relative z-10 section-padding section-alt">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            Milestones That Matter
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
            {milestones.map((m) => (
              <div
                key={m.sessions}
                className="flex flex-col items-center text-center rounded-lg border-l-4 border-primary bg-card p-6 shadow-sm"
              >
                <m.icon className="h-7 w-7 text-primary mb-3" />
                <span className="font-bold text-foreground">{m.sessions} Sessions</span>
                <span className="text-sm text-muted-foreground mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ambassadors Join */}
      <section className="relative z-10 section-padding">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            Why Ambassadors Join
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {whyCards.map((c) => (
              <Card key={c.title} className="text-center">
                <CardHeader>
                  <c.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  {c.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Permanent Ambassador Status */}
      <ContentSection title="What Permanent Ambassador Status Means" variant="alt" className="relative z-10">
        <p>
          When an ambassador reaches 25 sessions funded, they unlock Permanent Ambassador Status. That means they keep a lasting relationship to the donor network they helped build — and can continue earning on qualified future donations tied to the supporters they originally brought in.
        </p>
        <p className="mt-4 text-sm">
          All payouts, if earned, are processed through HomeFromCollege.
        </p>
      </ContentSection>

      {/* Live Momentum */}
      <section className="relative z-10 section-padding">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            Live Momentum
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Total Sessions Funded", value: "—" },
              { label: "Hero Division Leader", value: "Coming Soon" },
              { label: "Elite Division Leader", value: "Coming Soon" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border bg-card p-6 text-center"
              >
                <span className="block text-2xl font-bold text-foreground">{s.value}</span>
                <span className="text-sm text-muted-foreground mt-1 block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems} className="relative z-10" />

      {/* Final CTA */}
      <section className="relative z-10 section-padding">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Apply to Become a ValorWell Ambassador
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            If you want your platform to do more than raise awareness, this is your chance to help fund real therapy sessions and build something meaningful around your influence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CreatorApplicationForm buttonSize="lg" />
            <Button asChild size="lg" variant="outline" onClick={() => trackDonateConversion()}>
              <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">
                Support a Session
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Applications are reviewed manually. Approved ambassadors receive onboarding and a private donation link.
          </p>
        </div>
      </section>
      </div>
    </Layout>
  );
}
