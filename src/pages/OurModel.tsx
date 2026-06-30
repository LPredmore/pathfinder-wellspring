import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardCheck, Compass, HeartHandshake, Megaphone, ShieldCheck, Wrench } from "lucide-react";

const modelSteps = [
  {
    icon: Compass,
    title: "Map the gap",
    body: "Help veterans and families understand where they are stuck: VA access, Community Care, CHAMPVA, documentation, delays, or family strain.",
  },
  {
    icon: ShieldCheck,
    title: "Bridge the wait",
    body: "Build pathways for timely support while people are waiting on larger systems to catch up.",
  },
  {
    icon: ClipboardCheck,
    title: "Keep documentation ethical",
    body: "Support documentation only when it is grounded in real care, accurate records, and professional judgment.",
  },
  {
    icon: Wrench,
    title: "Build practical tools",
    body: "Use BestSelfs products and education to help families build skills outside formal systems.",
  },
  {
    icon: Megaphone,
    title: "Educate publicly",
    body: "Use videos, resources, and conversations to explain the systems people are forced to navigate.",
  },
  {
    icon: HeartHandshake,
    title: "Fund action",
    body: "Use Beyond the Yellow to turn support into funded therapy hours, sponsorships, partnerships, and measurable help.",
  },
];

const futureMetrics = [
  "Therapy hours funded through Beyond the Yellow",
  "Veterans and families connected with support",
  "Common VA, CHAMPVA, and Community Care barriers documented",
  "Education and resource reach",
  "BestSelfs revenue routed to the ValorWell mission",
  "Partner and sponsor participation",
];

export default function OurModel() {
  return (
    <Layout>
      <SEO
        title="The ValorWell Model — Building Better Systems for Veterans and Families"
        description="Learn how ValorWell is building a better pathway for veterans and families navigating VA systems, care access, documentation, tools, education, and funded support."
        canonical="/our-model"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Our Model", url: "/our-model" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Our Model</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            ValorWell is building a better pathway through the systems veterans and families are forced to navigate.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            The mission is bigger than one clinic. ValorWell exists to change how veterans and families move through care access, VA-related barriers, documentation challenges, family support needs, and the gaps where predatory systems often step in.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/get-care">Get Support</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/beyondtheyellow">Go Beyond the Yellow</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">Why this model needs to exist.</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>Veterans and families are often left waiting, repeating their story, navigating confusing systems, paying out of pocket, or turning to expensive services because they do not know where else to go.</p>
            <p>ValorWell is building a clearer path: practical education, ethical clinical support, care navigation, family tools, public resources, and campaigns that fund real action.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">How the model works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modelSteps.map((s) => (
              <Card key={s.title} className="border-border/60">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">What we will measure as the new model grows.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            ValorWell is entering a new phase. Instead of publishing weak or misleading vanity metrics, we are defining the outcomes that should matter as Beyond the Yellow, resources, partnerships, and tools mature.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {futureMetrics.map((m) => (
              <li key={m} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background">
                <span className="text-gold-accent mt-1">★</span>
                <span className="text-foreground">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Beyond the Yellow turns the model into action.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            The point is not awareness for awareness' sake. Beyond the Yellow is where supporters, sponsors, creators, businesses, and funders help put real backing behind veterans and families.
          </p>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/beyondtheyellow">Explore Beyond the Yellow</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
