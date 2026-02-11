import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema, FAQSchema } from "@/components/SEO";
import { ContentSection, StepsSection, FAQSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Trophy, Users, Heart, Star, Mic, Award } from "lucide-react";
import { toast } from "sonner";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

import resortBeach from "@/assets/resort-beach.png";
import resortDinner from "@/assets/resort-dinner.png";
import resortPoolSunset from "@/assets/resort-pool-sunset.png";
import resortPoolDay from "@/assets/resort-pool-day.png";
import resortInfinity from "@/assets/resort-infinity.png";

const faqItems = [
  {
    question: "Where does the money go?",
    answer:
      "Donations fund mental health therapy sessions for veterans through the Bridge Program. Every dollar goes to pay for actual therapy sessions for a veteran in need. This is what makes us different.",
  },
  {
    question: "Why monthly sponsorship matters",
    answer:
      "Monthly sponsors create predictability—helping fund sessions consistently and plan ahead for veterans who need continued support.",
  },
  {
    question: "Can I support a creator and still fund sessions?",
    answer:
      "Yes. Supporting a creator is simply a way to route your donation through their fundraising page—your gift still funds sessions.",
  },
  {
    question: "I'm a creator—how do I join?",
    answer:
      "Click the Apply to Compete button on this page. If selected, you'll receive onboarding steps, your fundraising page setup instructions, and the \"Why I'm here\" video prompt.",
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

const galleryImages = [
  { src: resortPoolSunset, alt: "Resort pool at sunset" },
  { src: resortBeach, alt: "Resort beachfront" },
  { src: resortDinner, alt: "Resort dining experience" },
  { src: resortPoolDay, alt: "Resort pool during the day" },
  { src: resortInfinity, alt: "Resort infinity pool view" },
];

const handleSupportCreator = () => {
  toast("Competition starts on March 1, 2026");
};

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

      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        <div className="absolute inset-0 bg-white/70" />

      {/* Hero */}
      <section className="relative z-10 section-padding">
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
      <section className="relative z-10 section-padding">
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
                <CreatorApplicationForm buttonClassName="w-full" />
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
                <Button variant="secondary" className="w-full" onClick={handleSupportCreator}>
                  Support a Creator
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
                <Button asChild className="w-full">
                  <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">Sponsor a Session</a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">Become a Monthly Sponsor</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <ContentSection title="What This Is" variant="alt" className="relative z-10">
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
        className="relative z-10"
      />

      {/* Eligibility & Milestones */}
      <section className="relative z-10 section-padding section-alt">
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
      <ContentSection title="Prize" className="relative z-10">
        <p>
          The top fundraiser wins a romantic resort vacation package in Mexico.
          Full prize details and terms are provided on the application page.
        </p>

        {/* Resort Image Gallery */}
        <div className="mt-8">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {galleryImages.slice(1).map((img) => (
              <div key={img.alt} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* FAQ */}
      <FAQSection items={faqItems} className="relative z-10" />

      {/* Final CTA */}
      <section className="relative z-10 section-padding">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sponsor a Session Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            If you've ever wanted to help veterans in a concrete way, this is
            it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">Sponsor a Session</a>
            </Button>
            <Button size="lg" variant="secondary" onClick={handleSupportCreator}>
              Support a Creator
            </Button>
            <CreatorApplicationForm buttonSize="lg" buttonVariant="outline" />
          </div>
        </div>
      </section>
      </div>
    </Layout>
  );
}
