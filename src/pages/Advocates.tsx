import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { ContentSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart, ExternalLink, Users, Award, TrendingUp } from "lucide-react";
import { trackDonateConversion } from "@/lib/tracking";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";
import vibetalesLogo from "@/assets/vibetales-logo.png";
import { Link } from "react-router-dom";

export default function Advocates() {
  return (
    <Layout>
      <SEO
        title="Wall of Advocates — Corporate Sponsors for Veteran Mental Health"
        description="Meet the organizations powering veteran mental health care through ongoing sponsorship. Join mission-driven companies publicly committed to funding therapy for veterans and their families."
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
              A public honor wall recognizing the organizations and individuals who make an ongoing commitment to funding mental health care for veterans and their families.
            </p>
            <div className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold mb-6">
              $75 funds 1 therapy session
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm mb-8">
              The companies featured here don't just write a check — they build veteran mental health into the fabric of their business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" onClick={() => trackDonateConversion()}>
                <a href="https://valorwell.org/donate" target="_blank" rel="noopener noreferrer">
                  Sponsor a Session
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Become a Sponsor</Link>
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

        {/* Why Sponsor */}
        <section className="relative z-10 section-padding">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Why Companies Join the Wall
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Being featured here isn't about the size of a donation — it's about showing your customers, employees, and community that your organization stands with those who served.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Public Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Your brand is permanently featured alongside other mission-driven organizations making a real difference.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Values-Driven Branding</h3>
                <p className="text-sm text-muted-foreground">
                  Show your customers and employees what your company truly stands for — not just in words, but in action.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Sustained Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Ongoing partnerships fund consistent care — not one session, but a lasting pipeline of support for veterans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to get featured */}
        <ContentSection title="How to Get Featured" variant="alt" className="relative z-10">
          <p>
            We welcome sponsors of all sizes — from startups dedicating a share of revenue, to established companies funding recurring therapy sessions, to organizations providing in-kind support.
          </p>
          <p className="mt-4">
            What matters isn't the dollar amount. It's the commitment to showing up for veterans consistently. If your organization is ready to make veteran mental health part of its mission, we'd love to talk.
          </p>
          <div className="mt-6 not-prose">
            <Button asChild size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </ContentSection>

        {/* Final line */}
        <section className="relative z-10 section-padding">
          <div className="container-wide text-center">
            <p className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
              This wall exists to honor the organizations that don't just support veterans once — they commit to standing beside them for the long haul.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
