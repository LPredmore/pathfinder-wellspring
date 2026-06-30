import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "CHAMPVA Resources",
    href: "/resources/champva",
    body: "Find providers, ask the right questions, and understand why CHAMPVA access is hard.",
  },
  {
    name: "VA Community Care Resources",
    href: "/resources/va-community-care",
    body: "Referrals, authorization, wait times, and what to keep track of.",
  },
  {
    name: "Documentation Support Resources",
    href: "/resources/documentation",
    body: "Ethical clinical documentation, records, and what clinicians can and cannot do.",
  },
  {
    name: "Veteran Mental Health Resources",
    href: "/resources/veteran-mental-health",
    body: "Therapy access, PTSD support, family strain, and telehealth.",
  },
  {
    name: "Family Systems Resources",
    href: "/resources/family-systems",
    body: "Communication, parenting systems, emotional regulation, and conflict repair.",
  },
];

const featured = [
  { title: "How to think about CHAMPVA mental health access", note: "Coming soon." },
  { title: "What ethical clinical documentation means", note: "Coming soon." },
  { title: "Why families need systems, not just reactions", note: "Coming soon." },
];

export default function Resources() {
  return (
    <Layout>
      <SEO
        title="Veteran and Family Mental Health Resources"
        description="Explore ValorWell resources on veteran mental health care, CHAMPVA, VA Community Care, clinical documentation, family systems, and practical support."
        canonical="/resources"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">
            Resource Hub
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Resources for veterans and families navigating care, documentation, and VA-related systems.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Explore guides and educational resources on VA access, CHAMPVA, Community
            Care, documentation, family systems, and practical support.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.href}
                to={c.href}
                className="block rounded-lg border border-border/60 bg-background p-5 hover:border-navy transition-colors"
              >
                <div className="font-semibold text-navy mb-1">{c.name}</div>
                <p className="text-sm text-muted-foreground">{c.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Featured (coming soon)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-dashed border-border bg-muted/30 p-5"
              >
                <div className="font-semibold text-navy mb-1">{f.title}</div>
                <p className="text-sm text-muted-foreground">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container-narrow flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-1">Need support?</h2>
            <p className="text-muted-foreground">Reach out and we'll talk through care, navigation, and support options.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/get-care">Get Care</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/beyondtheyellow">Go Beyond the Yellow</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
