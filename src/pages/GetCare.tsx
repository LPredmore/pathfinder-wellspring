import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Heart, Stethoscope, FileText, ShieldCheck, Wrench } from "lucide-react";

const whoWeHelp = [
  { title: "Veterans", body: "Care designed around the realities of military service.", icon: ShieldCheck },
  { title: "Military spouses & family members", body: "Support for the people who carry the load at home.", icon: Heart },
  { title: "CHAMPVA families", body: "We work within CHAMPVA so dependents and survivors can access care.", icon: Users },
  { title: "Veterans navigating VA Community Care", body: "Help moving through a system that often feels stuck.", icon: Stethoscope },
  { title: "Families affected by PTSD, stress, conflict, or transition", body: "Practical support for the moments that matter most.", icon: Heart },
  { title: "People who need clinicians who understand military-connected issues", body: "Care from people who actually get it.", icon: Users },
];

const whatWeProvide = [
  "Individual therapy",
  "Family support",
  "Telehealth care",
  "Treatment planning",
  "Appropriate clinical documentation",
  "Support navigating care barriers",
  "Practical tools and education",
];

const steps = [
  { n: 1, title: "Reach out", body: "Tell us a little about what you need." },
  { n: 2, title: "We review fit and availability", body: "We make sure we are the right place for you." },
  { n: 3, title: "We discuss care options", body: "Clear conversation about what care will look like." },
  { n: 4, title: "You begin care if appropriate", body: "Start sessions with a licensed clinician." },
  { n: 5, title: "Documentation handled ethically", body: "When clinically appropriate, documentation comes from real treatment." },
];

const GetCare = () => {
  return (
    <Layout>
      <SEO
        title="Get Mental Health Care"
        description="Mental health support for veterans, military families, CHAMPVA families, and those navigating VA Community Care access barriers."
        canonical="/get-care"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Get Care", url: "/get-care" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Get Care</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Mental health support for veterans and families.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            ValorWell helps veterans, family members, and caregivers access practical mental health support through a system built around care, documentation, and real-world barriers.
          </p>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/get-started">Start Care</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy mb-8">Who we help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoWeHelp.map((w) => (
              <Card key={w.title}>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <w.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-navy mb-6">What we provide</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {whatWeProvide.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <div className="rounded-2xl border-2 border-navy/15 bg-background p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <h2 className="text-2xl md:text-3xl font-bold text-navy">Documentation support</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              ValorWell does not sell documentation or provide generic letters on demand. When documentation is appropriate, it should come from a real clinical relationship, accurate records, and ethical professional judgment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy mb-8">What to expect</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((s) => (
              <Card key={s.n} className="border-border/60">
                <CardContent className="p-5">
                  <div className="w-9 h-9 rounded-full bg-patriot-red text-white flex items-center justify-center font-bold mb-3">{s.n}</div>
                  <h3 className="font-semibold text-navy mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start?</h2>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/get-started">Start Care</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default GetCare;
