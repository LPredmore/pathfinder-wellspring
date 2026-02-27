import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema, FAQSchema } from "@/components/SEO";
import { ContentSection, StepsSection, FAQSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Unlock, Star, Award, Trophy, Target, Heart, Zap, Shield, ArrowRight, TrendingUp } from "lucide-react";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import { trackDonateConversion } from "@/lib/tracking";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

const faqItems = [
{
  question: "Who is this for?",
  answer:
  "Creators, advocates, and community-driven people who want to use their platform to help secure therapy hours for veterans and military families."
},
{
  question: "Do I need a huge following to apply?",
  answer:
  "No. Mission Partners are placed into divisions based on audience size, so both smaller and larger creators can compete fairly."
},
{
  question: "How do I get selected?",
  answer:
  "Applications are reviewed based on platform presence, fit, and readiness to participate in the mission."
},
{
  question: "When does my Creator Growth Grant activate?",
  answer:
  "Your Creator Growth Grant activates after 5 hours of therapy are secured through your private tracked link."
},
{
  question: "What is Permanent Partner Status?",
  answer:
  "At 25 hours secured, Mission Partners unlock long-term status tied to the supporter base they helped build."
},
{
  question: "How do Growth Grant payments work?",
  answer:
  "All Creator Growth Grants are processed through HomeFromCollege."
},
{
  question: "Can I help without competing?",
  answer:
  "Yes. You can fund sessions directly at valorwell.org/donate without applying as a Mission Partner."
},
{
  question: "What am I not allowed to claim?",
  answer:
  "Mission Partners may not promise outcomes, give medical advice, or misrepresent how the mission works."
}];


const steps = [
{
  number: 1,
  title: "Apply",
  description: "Submit your platform details and audience information."
},
{
  number: 2,
  title: "Get Verified",
  description:
  "Follower counts are reviewed and each Mission Partner is assigned to the correct division."
},
{
  number: 3,
  title: "Get Your Tracked Link",
  description:
  "Approved Mission Partners receive a private link to track the hours they help secure."
},
{
  number: 4,
  title: "Start Securing Hours",
  description:
  "Share your link, compete on the leaderboard, and unlock milestones as you create real impact."
}];


const milestones = [
{ sessions: 5, label: "Creator Growth Grant Unlocked", icon: Unlock },
{ sessions: 10, label: "Recognition + Momentum Spotlight", icon: Star },
{ sessions: 25, label: "Permanent Mission Partner Status", icon: Award },
{ sessions: 50, label: "Elite Recognition Feature", icon: Trophy },
{ sessions: 100, label: "Champion-Level Impact", icon: Target }];


const whyCards = [
{
  icon: Heart,
  title: "Create Real Impact",
  body: "You're not just posting. You're securing therapy hours people actually need."
},
{
  icon: Shield,
  title: "Build Credibility",
  body: "This is a measurable, mission-driven partnership — the kind of work people feel good being associated with."
},
{
  icon: TrendingUp,
  title: "Earn a Creator Growth Grant",
  body: "Not commission — a professional investment in your channel. Unlocks after you hit the required threshold."
}];


export default function Competitions() {
  return (
    <Layout>
      <SEO
        title="The $75 Mission | Beyond the Yellow"
        description="Join The $75 Mission as a ValorWell Mission Partner. Help secure real therapy hours for veterans and military families — $75 at a time."
        canonical="/beyondtheyellow" />

      <BreadcrumbSchema
        items={[
        { name: "Home", url: "/" },
        { name: "Beyond the Yellow", url: "/beyondtheyellow" }]
        } />

      <FAQSchema faqs={faqItems} />

      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}>

        <div className="absolute inset-0 bg-white/85" />

        {/* Hero */}
        <section className="relative z-10 hero-gradient py-20 md:py-28">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Beyond the Yellow

            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              We don't do ribbons. We buy results. One hour at a time.
            </p>
            <p className="text-base text-foreground/80 max-w-xl mx-auto mb-8">
              $75 funds exactly one hour of clinical therapy for a veteran or military family member.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CreatorApplicationForm buttonSize="lg" />
              <Button variant="outline" size="lg" asChild>
                <a href="#how-it-works">
                  See How It Works <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Creator Growth Grants for Influencers that Promote Help for Veterans

            </p>
          </div>
        </section>

        {/* Mission Control — Bento Grid */}
        <section className="relative z-10 section-padding">
          <div className="container-wide space-y-6">

            {/* Row 1: Counters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary/30 p-8 text-center">
                <span className="block text-5xl md:text-6xl font-bold text-primary">---</span>
                <span className="block text-lg font-semibold text-foreground mt-2">Hours of Therapy Secured</span>
                <p className="text-sm text-muted-foreground mt-2">
                  Every $75 moves this counter. This is not a donation page. It is a scoreboard.
                </p>
              </Card>
              <Card className="border-2 border-destructive/30 p-8 text-center">
                <span className="block text-5xl md:text-6xl font-bold text-destructive">---</span>
                <span className="block text-lg font-semibold text-foreground mt-2">Veterans Still Waiting</span>
                <p className="text-sm text-muted-foreground mt-2">
                  Every session funded moves someone off this list.
                </p>
              </Card>
            </div>

            {/* Row 2: Partner CTA + Secure a Session */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-2 border-primary">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-2xl">Become a Mission Partner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>
                    Apply, get a tracked link, compete in your division, and secure hours of therapy.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Your own private tracked link</li>
                    <li>Division placement based on audience size</li>
                    <li>Milestone recognition unlocks</li>
                    <li>Creator Growth Grant eligibility after 5 hours secured</li>
                    <li>Permanent Partner status at 25 hours secured</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <CreatorApplicationForm buttonClassName="w-full" />
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <Heart className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Secure a Session</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 text-muted-foreground text-sm">
                  <p>$75 = 1 hour. Fund a session directly.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackDonateConversion()}>
                    <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">
                      Fund a Session
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Row 3: Leaderboard placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <span className="block text-2xl font-bold text-foreground">Coming Soon</span>
                <span className="text-sm text-muted-foreground mt-1 block">Hero Division (Under 10K)</span>
              </Card>
              <Card className="p-6 text-center">
                <span className="block text-2xl font-bold text-foreground">Coming Soon</span>
                <span className="text-sm text-muted-foreground mt-1 block">Elite Division (10K+)</span>
              </Card>
            </div>
          </div>
        </section>

        {/* What This Really Is */}
        <ContentSection title="What The $75 Mission Really Is" variant="alt" className="relative z-10">
          <p>
            The $75 Mission is a creator-driven campaign built to secure actual therapy hours for veterans and military families. Every hour funded creates direct, measurable impact.
          </p>
          <p className="mt-4">
            This is not a generic awareness campaign. Mission Partners turn attention into treatment — and build lasting influence around something that matters.
          </p>
        </ContentSection>

        {/* How It Works */}
        <div id="how-it-works" className="relative z-10">
          <StepsSection title="How It Works" steps={steps} />
          <div className="container-wide pb-8">
            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
              <strong>Hero Division</strong> = under 10,000 followers · <strong>Elite Division</strong> = 10,000+ followers · Division is locked once assigned.
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
              {milestones.map((m) =>
              <div
                key={m.sessions}
                className="flex flex-col items-center text-center rounded-lg border-l-4 border-primary bg-card p-6 shadow-sm">

                  <m.icon className="h-7 w-7 text-primary mb-3" />
                  <span className="font-bold text-foreground">{m.sessions} Hours Secured</span>
                  <span className="text-sm text-muted-foreground mt-1">{m.label}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Mission Partners Join */}
        <section className="relative z-10 section-padding">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
              Why Mission Partners Join
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {whyCards.map((c) =>
              <Card key={c.title} className="text-center">
                  <CardHeader>
                    <c.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle>{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    {c.body}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Permanent Partner Status */}
        <ContentSection title="What Permanent Partner Status Means" variant="alt" className="relative z-10">
          <p>
            At 25 hours secured, Mission Partners unlock Permanent Partner Status — a lasting relationship to the supporter network they helped build, with an ongoing Creator Growth Grant tied to their impact.
          </p>
          <p className="mt-4 text-sm">
            All Growth Grants are processed through HomeFromCollege.
          </p>
        </ContentSection>

        {/* FAQ */}
        <FAQSection items={faqItems} className="relative z-10" />

        {/* Final CTA */}
        <section className="relative z-10 section-padding">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join The $75 Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Turn your platform into secured therapy hours for veterans and military families.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CreatorApplicationForm buttonSize="lg" />
              <Button asChild size="lg" variant="outline" onClick={() => trackDonateConversion()}>
                <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">
                  Secure a Session
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Applications reviewed manually. Approved partners receive onboarding and a tracked link.
            </p>
          </div>
        </section>
      </div>
    </Layout>);

}