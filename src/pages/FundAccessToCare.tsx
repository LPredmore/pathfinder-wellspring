import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Wrench, FileText, Compass, Users, Layers } from "lucide-react";

const supportCards = [
  { title: "Therapy access", body: "Help cover the cost of sessions for veterans and families who can't afford to wait.", icon: Heart },
  { title: "Practical family tools", body: "Fund tools that help families build skills, routines, and stronger systems.", icon: Wrench },
  { title: "Clinical documentation support", body: "Make ethical, treatment-based documentation possible for more people.", icon: FileText },
  { title: "Care navigation education", body: "Help people understand and move through the systems they're stuck in.", icon: Compass },
  { title: "Veteran & family support resources", body: "Resources that exist outside of the therapy room.", icon: Users },
  { title: "Better systems for long-term access", body: "Infrastructure that outlasts any single campaign.", icon: Layers },
];

const tiers = [
  { amount: "$25", body: "Supports tools, education, and access-building work." },
  { amount: "$75", body: "Helps cover the direct therapist cost of one session.", highlight: true },
  { amount: "$150", body: "Helps cover the direct therapist cost of two sessions." },
  { amount: "$300", body: "Helps support a month of direct session costs for one client receiving weekly care." },
  { amount: "Custom", body: "Help build the system." },
];

const FundAccessToCare = () => {
  return (
    <Layout>
      <SEO
        title="Go Beyond the Yellow"
        description="Help fund access to mental health care, practical tools, and support systems for veterans and families."
        canonical="/fund-access-to-care"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Go Beyond the Yellow", url: "/fund-access-to-care" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Support the Mission</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Help fund access to care for veterans and families.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Veterans should not have to wait months for mental health care, go untreated, or rely on predatory systems just to get support.
          </p>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/donate">Go Beyond the Yellow</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-navy mb-4">The problem.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Too many veterans and families are left waiting for care, searching for providers, navigating confusing systems, or paying out of pocket because the support they need is not available quickly enough.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy mb-8">What your support helps build.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportCards.map((c) => (
              <Card key={c.title}>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <div className="rounded-2xl border-2 border-navy/15 bg-background p-8 md:p-10">
            <h2 className="text-3xl font-bold text-navy mb-4">What $75 means.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              $75 helps cover the direct therapist cost of one session. That amount goes toward paying the clinician providing care. It does not represent the full operating cost of ValorWell, but it gives supporters a clear way to understand the direct cost of care delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Giving tiers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiers.map((t) => (
              <Card
                key={t.amount}
                className={t.highlight ? "border-2 border-patriot-red shadow-lg" : "border-border/60"}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-navy mb-2">{t.amount}</div>
                  <p className="text-sm text-muted-foreground mb-4">{t.body}</p>
                  <Button asChild size="sm" className="w-full bg-patriot-red hover:bg-patriot-red-dark text-white">
                    <Link to="/donate">Give</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a monthly mission supporter.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Monthly supporters help us build something sustainable: not a one-time campaign, not a temporary awareness push, but a long-term support system for veterans and their families.
          </p>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/donate">Become a Monthly Supporter</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              Businesses and organizations can sponsor care.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Sponsor sessions, fund a program, or partner with ValorWell on a long-term initiative.
            </p>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href="mailto:info@valorwell.org?subject=Sponsorship%20Inquiry">Ask About Sponsorship</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy mb-8">Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "$75", label: "Direct therapist cost per session" },
              { stat: "Tracking", label: "Sessions delivered" },
              { stat: "Tracking", label: "Care funded" },
              { stat: "Tracking", label: "Families served" },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-navy mb-1">{m.stat}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground text-center">Public impact tracking coming soon.</p>
        </div>
      </section>
    </Layout>
  );
};

export default FundAccessToCare;
