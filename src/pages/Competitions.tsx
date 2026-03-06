import { useEffect } from "react";
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
  "At 25 hours secured, Mission Partners unlock long-term status tied to the supporter base they helped build. You will continue to earn your Growth Grant each month for the support you continue to show. We believe is continuing to help those, who continue to help our nations heroes."
},
{
  question: "How do Growth Grant payments work?",
  answer:
  "As a show of support. We give 10% of the money earned back to influencers who are dedicated to helping veterans. At ValorWell, we believe that the best way to say thank you, is to support those who support us. That's what Beyond the Yellow is about."
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
},
{
  question: "What is this campaign for?",
  answer: "This campaign funds the ValorWell Bridge Program, which provides therapy sessions for veterans who are waiting to access mental health care through the VA system.\n\nIn many areas, veterans can wait 3–10 months before they are able to see a provider through the VA system. The Bridge Program exists to ensure veterans receive support during that waiting period, rather than being left without care."
},
{
  question: "What is the Bridge Program?",
  answer: "The Bridge Program is a short-term mental health support program that helps veterans receive therapy while they are waiting for care through the VA system.\n\nThe program focuses on three key things:\n\n• Connecting veterans with a licensed therapist quickly\n• Supporting them consistently during the waiting period\n• Coordinating a smooth transition into VA care once it becomes available\n\nIt is called a bridge because it fills the gap between when a veteran asks for help and when the VA system is able to provide that care."
},
{
  question: "Why is this needed if the VA already provides mental health care?",
  answer: "The issue most veterans face is access, not eligibility.\n\nEven though veterans may qualify for care through the VA, it can take 3–10 months to actually get an appointment depending on location and provider availability.\n\nMental health challenges do not wait for systems to catch up. The Bridge Program exists so veterans can receive care now, while they navigate the VA process."
},
{
  question: "How long are veterans typically in the Bridge Program?",
  answer: "The average veteran in the Bridge Program receives:\n\n• 11 therapy sessions\n• Over approximately 5.5 months\n• With sessions typically scheduled every other week\n\nSome veterans transition into VA care sooner, while others may need slightly longer depending on how quickly the VA system can schedule their care."
},
{
  question: "Does ValorWell provide therapy indefinitely?",
  answer: "No.\n\nThe Bridge Program is designed to provide temporary support, not replace the VA system.\n\nThe goal is to support veterans until they are able to receive care through the VA or VA Community Care network. Once that happens, ValorWell works with VA providers to ensure a clean transition so the veteran does not lose progress."
},
{
  question: "What does a $75 donation pay for?",
  answer: "A $75 donation covers one full therapy session.\n\nIt is not partial coverage or a symbolic amount. Each $75 donation directly funds one complete session with a licensed therapist."
},
{
  question: "Does ValorWell keep any of the donated money?",
  answer: "No.\n\nValorWell keeps $0 from Bridge Program session donations.\n\nEvery dollar donated toward therapy sessions goes directly to the licensed therapists providing care to veterans."
},
{
  question: "How does ValorWell operate if it keeps $0 from these donations?",
  answer: "Bridge Program session donations are restricted to funding therapy sessions.\n\nValorWell's broader operational expenses are supported separately through other funding sources and partnerships. The purpose of this campaign is simple:\n\nSession donations fund therapy sessions."
},
{
  question: "Are the therapists licensed professionals?",
  answer: "Yes.\n\nTherapy sessions in the Bridge Program are conducted by licensed mental health professionals who are qualified to provide clinical care."
},
{
  question: "How does ValorWell help veterans access VA care faster?",
  answer: "Many veterans struggle with navigating the VA system and understanding the steps required to receive care.\n\nValorWell helps veterans:\n\n• Understand how to move through the VA process\n• Avoid common administrative delays\n• Navigate the Community Care pathway more efficiently\n• Stay organized while waiting for their appointment\n\nIn many cases, this guidance helps veterans access VA care sooner than they would on their own."
},
{
  question: "What happens when a veteran is able to receive VA care?",
  answer: "When a veteran is scheduled for care through the VA system or the VA Community Care Network, ValorWell coordinates with the veteran and their VA care team to ensure a smooth hand-off.\n\nThis ensures the veteran does not lose progress or experience gaps in care."
},
{
  question: "Do influencers need to explain the VA Community Care system?",
  answer: "Not necessarily.\n\nFor most audiences it is simpler to say \"the VA system.\"\n\nInfluencers can mention Community Care if they wish, but keeping the explanation simple often helps audiences understand the message more clearly."
},
{
  question: "Who can receive support through the Bridge Program?",
  answer: "The Bridge Program is designed for veterans who are attempting to access mental health care through the VA system and are facing delays.\n\nEligibility and onboarding depend on several factors including availability, location, and clinical needs."
},
{
  question: "Is the Bridge Program only for emergency mental health situations?",
  answer: "No.\n\nThe program supports veterans who need mental health care and are currently waiting for access through the VA system.\n\nSome veterans may be experiencing urgent situations, while others are seeking help early. The goal is to ensure veterans receive support before problems escalate."
},
{
  question: "Is therapy the only support provided?",
  answer: "The primary focus of the Bridge Program is funding therapy sessions.\n\nHowever, veterans also receive guidance and support as they navigate the VA system so they can successfully transition into long-term care."
},
{
  question: "What is Zeffy and how does the campaign link work?",
  answer: "Each influencer participating in the campaign has a personal Zeffy donation link.\n\nWhen someone donates through that link:\n\n• Therapy sessions are funded\n• The donation is tracked through the influencer's campaign link\n\nThis helps measure the total number of therapy sessions funded through the campaign."
},
{
  question: "Do donors receive a receipt for their donation?",
  answer: "Yes.\n\nDonations made through Zeffy generate a confirmation receipt for the donor."
},
{
  question: "Can donors fund multiple therapy sessions?",
  answer: "Yes.\n\nDonors can sponsor as many sessions as they would like.\n\nExamples:\n\n• $75 = 1 therapy session\n• $150 = 2 therapy sessions\n• $375 = 5 therapy sessions\n\nEvery session funded directly supports a veteran receiving care."
},
{
  question: "What is the long-term goal for the Bridge Program?",
  answer: "ValorWell's long-term goal is to improve access to mental health care for veterans by working toward direct integration with the VA system.\n\nThis includes pursuing the ability to operate as a Preferred Community Care Network provider, allowing ValorWell to serve veterans directly within the VA care network.\n\nUntil the system can consistently provide timely access to care, the Bridge Program exists to ensure veterans do not fall through the gap while waiting."
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <section className="relative z-10 hero-gradient py-10 md:py-14">
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
            


          </div>
        </section>

        {/* Current Challenge CTA */}
        <section className="relative z-10 py-10">
          <div className="container-wide">
            <a
              href="/challenge"
              className="group block relative overflow-hidden rounded-2xl border-2 border-primary bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 md:p-12 text-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.4)] hover:scale-[1.01]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="inline-block px-4 py-1 mb-4 rounded-full bg-primary/15 text-primary text-sm font-semibold uppercase tracking-widest animate-fade-in">
                  🔥 Live Now
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  The Creator Challenge Is On
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
                  See the leaderboard, track campaign progress, and meet the Mission Partners competing to secure therapy hours.
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-lg group-hover:gap-3 transition-all duration-300">
                  View the Challenge
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Mission Control — Bento Grid */}
        <section className="relative z-10 section-padding">
          <div className="container-wide space-y-6">

            {/* Row 1: Counters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary/30 p-8 text-center">
                <span className="block text-5xl md:text-6xl font-bold text-primary">1150+</span>
                <span className="block text-lg font-semibold text-foreground mt-2">Hours of Therapy Secured</span>
                <p className="text-sm text-muted-foreground mt-2">
                  Every $75 moves this counter. This is not a donation page. It is a scoreboard.
                </p>
              </Card>
              <Card className="border-2 border-destructive/30 p-8 text-center">
                <span className="block text-5xl md:text-6xl font-bold text-destructive">800+</span>
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

            {/* Leaderboard moved to /challenge */}
          </div>
        </section>

        {/* What This Really Is */}
        <ContentSection title='What "Beyond the Yellow" Really Is' variant="alt" className="relative z-10">
          <p>Beyond the Yellow is a creator-driven campaign built to secure actual therapy hours for veterans and military families. Every hour funded creates direct, measurable impact.

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
          


        </ContentSection>

        {/* FAQ */}
        <FAQSection items={faqItems} className="relative z-10" />

        {/* Final CTA */}
        <section className="relative z-10 section-padding">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Beyond the Yellow

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