import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { ContentSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import { trackDonateConversion } from "@/lib/tracking";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";
import vibetalesLogo from "@/assets/vibetales-logo.png";

export default function Advocates() {
  return (
    <Layout>
      <SEO
        title="Wall of Advocates"
        description="Meet the creators and community advocates funding therapy sessions for veterans. $75 sponsors 1 session. Support a creator or sponsor a session today."
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
              $75 sponsors 1 therapy session
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm mb-8">
              If you want to help right now, you can sponsor a session or support a creator in the current challenge.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" onClick={() => trackDonateConversion()}>
                <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">
                  Sponsor a Session
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="relative z-10 section-padding">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Our Sponsors
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Organizations and products putting real resources behind veteran mental health care.
            </p>
            <div className="max-w-2xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-5 pb-2">
                  <img
                    src={vibetalesLogo}
                    alt="VibeTales logo"
                    className="w-16 h-16 rounded-xl shadow-sm shrink-0"
                  />
                  <div>
                    <CardTitle className="text-xl">VibeTales</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI-powered reading stories &amp; clinical assessment for every child
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Built by a veteran father for his dyslexic daughter because the tools they needed didn't exist, VibeTales generates personalized stories calibrated to each child's reading level. But what makes VibeTales truly different is its mission:{" "}
                    <span className="font-semibold text-foreground">
                      50% of all revenue goes directly toward funding mental health treatment for veterans through ValorWell.
                    </span>
                  </p>
                  <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-4">
                    <Heart className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-foreground">
                      Every story a child reads helps a veteran get the care they deserve.
                    </p>
                  </div>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="https://valorwell.org/vibetales" target="_blank" rel="noopener noreferrer">
                      Learn More About VibeTales
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How to get featured */}
        <ContentSection title="How to Get Featured on the Wall" variant="alt" className="relative z-10">
          <p>
            Advocates are featured after funding 25 sessions ($1,875) during the Creator Challenge.
          </p>
          <p className="mt-4">
            If you're a creator who wants to compete and fund sessions with your audience, apply to join the next round.
          </p>
          <div className="mt-6 not-prose">
            <CreatorApplicationForm buttonSize="lg" />
          </div>
        </ContentSection>

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
