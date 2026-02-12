import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { ContentSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Heart, Video, BarChart3, HandHeart, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import { trackDonateConversion } from "@/lib/tracking";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

const handleSupportCreator = () => {
  toast("Competition starts on March 1, 2026");
};

const features = [
  {
    icon: Video,
    title: "Creator Profiles & Videos",
    description: 'Explore creator profiles and "Why I\'m here" videos',
  },
  {
    icon: BarChart3,
    title: "Session Impact Tracker",
    description: "See how many sessions each advocate helped fund",
  },
  {
    icon: HandHeart,
    title: "Direct Support",
    description: "Support an advocate directly through their fundraising page",
  },
  {
    icon: PartyPopper,
    title: "Community Celebration",
    description: "Celebrate the community making direct care possible",
  },
];

export default function Advocates() {
  return (
    <Layout>
      <SEO
        title="Wall of Advocates"
        description="Meet the creators and community advocates funding therapy sessions for veterans. $50 sponsors 1 session. Support a creator or sponsor a session today."
        canonical="/advocates"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Wall of Advocates", url: "/advocates" },
        ]}
      />

      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        <div className="absolute inset-0 bg-white/70" />

      {/* Hero */}
      <section className="relative z-10 section-padding">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Wall of Advocates
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Coming soon — a public wall honoring the people funding real therapy sessions for veterans.
          </p>
          <div className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold mb-6">
            $50 sponsors 1 therapy session
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm mb-8">
            If you want to help right now, you can sponsor a session or support a creator in the current challenge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" onClick={handleSupportCreator}>
              Support a Creator
            </Button>
            <Button asChild size="lg" onClick={() => trackDonateConversion()}>
              <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">
                Sponsor a Session
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What you'll see here */}
      <section className="relative z-10 section-padding">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            What You'll See Here
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            When the Wall of Advocates goes live, you'll be able to:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center rounded-lg border bg-card p-6"
              >
                <feature.icon className="h-8 w-8 text-primary mb-3" />
                <span className="font-semibold text-foreground mb-2">{feature.title}</span>
                <span className="text-sm text-muted-foreground">{feature.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get featured */}
      <ContentSection title="How to Get Featured on the Wall" variant="alt" className="relative z-10">
        <p>
          Advocates are featured after funding 25 sessions ($1,250) during the Creator Challenge.
        </p>
        <p className="mt-4">
          If you're a creator who wants to compete and fund sessions with your audience, apply to join the next round.
        </p>
        <div className="mt-6 not-prose">
          <CreatorApplicationForm buttonSize="lg" />
        </div>
      </ContentSection>

      {/* Support the current challenge */}
      <section className="relative z-10 section-padding">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            Support the Current Challenge
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="flex flex-col">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Support a Creator</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 text-muted-foreground">
                <p>
                  Donate through a creator's page and help them climb the leaderboard.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full" onClick={handleSupportCreator}>
                  Support a Creator
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Sponsor Sessions Directly</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 text-muted-foreground">
                <p>
                  Sponsor therapy sessions through the main campaign.
                </p>
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

      {/* Final line */}
      <section className="relative z-10 section-padding">
        <div className="container-wide text-center">
          <p className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
            This page exists for one reason: to honor the people who turn support into real treatment sessions.
          </p>
        </div>
      </section>
      </div>
    </Layout>
  );
}
