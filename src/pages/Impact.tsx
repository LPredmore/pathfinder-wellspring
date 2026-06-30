import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { stat: "$75", label: "Direct therapist cost per session" },
  { stat: "Tracking", label: "Sessions delivered" },
  { stat: "Tracking", label: "Veterans & families served" },
  { stat: "Tracking", label: "Supporter-funded care" },
  { stat: "Tracking", label: "App revenue supporting mission" },
  { stat: "In progress", label: "Public impact dashboard" },
];

const trackList = [
  "Care delivered",
  "Care funded",
  "Access barriers",
  "Family & veteran support needs",
  "BestSelfs contribution",
  "Supporter growth",
  "Education & content reach",
];

const Impact = () => {
  return (
    <Layout>
      <SEO
        title="ValorWell Impact — Measuring Access to Care"
        description="See how ValorWell tracks care access, direct therapist costs, supporter-funded care, and mission growth."
        canonical="/impact"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Impact", url: "/impact" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Impact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">Measuring the mission.</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            ValorWell is building a support system that should be visible, measurable, and accountable.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy mb-8">Current impact metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <Card key={m.label}>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-navy mb-1">{m.stat}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-navy mb-6">What we track</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {trackList.map((t) => (
              <li key={t} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                <span className="text-gold-accent mt-1">★</span>
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20 section-alt">
        <div className="container-narrow">
          <div className="rounded-2xl border border-border bg-background p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Transparency note</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              ValorWell is building toward clearer public reporting as the mission grows.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impact;
