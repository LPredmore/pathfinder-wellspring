import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { ArrowRight, Mail } from "lucide-react";

const routes = [
  {
    label: "I need mental health care",
    to: "/get-care",
  },
  {
    label: "I'm a clinician",
    to: "/clinicians",
  },
  {
    label: "I'm a veteran trying to understand the mission/pathway",
    to: "/operation-claims-success",
  },
  {
    label: "I want to share or nominate a real-action story",
    to: "/beyondtheyellow",
  },
  {
    label: "I'm an organization, sponsor, creator, or potential partner",
    to: "/partner",
  },
];

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact ValorWell | Not Sure Where to Start?"
        description="Not sure where you fit at ValorWell? Pick the closest path—mental health care, clinicians, veterans, partners, or stories—and we'll route you to the right place."
        canonical="/contact"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />

      <section className="section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Contact</p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            Not sure where to start?
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Pick the closest one.
          </p>

          <div className="space-y-3 max-w-xl mx-auto text-left">
            {routes.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:bg-secondary hover:border-primary/20"
              >
                <span className="text-base font-medium text-foreground">{r.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}

            <a
              href="mailto:info@valorwell.org"
              className="group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:bg-secondary hover:border-primary/20"
            >
              <span className="text-base font-medium text-foreground">None of these fit</span>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground">
                <Mail className="h-4 w-4" />
                info@valorwell.org
              </span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
