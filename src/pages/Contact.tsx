import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { ArrowRight, Mail } from "lucide-react";

const routes = [
  {
    label: "I am a veteran or veteran family member looking for mental health care",
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
        description="Not sure where you fit at ValorWell? Pick the closest path—mental health care for veterans and veteran families, clinicians, veteran pathways, partners, or stories."
        canonical="/contact"
      />
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]}
      />

      <section className="section-padding">
        <div className="container-narrow text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-patriot-red">
            Contact
          </p>
          <h1 className="mb-2 text-3xl font-bold text-navy md:text-4xl">
            Not sure where to start?
          </h1>
          <p className="mb-10 text-lg text-muted-foreground">
            Pick the closest one.
          </p>

          <div className="mx-auto max-w-xl space-y-3 text-left">
            {routes.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className="group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-primary/20 hover:bg-secondary"
              >
                <span className="text-base font-medium text-foreground">
                  {route.label}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}

            <a
              href="mailto:info@valorwell.org"
              className="group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-primary/20 hover:bg-secondary"
            >
              <span className="text-base font-medium text-foreground">
                None of these fit
              </span>
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
