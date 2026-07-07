import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Mail } from "lucide-react";
import { CRISIS_NOTE } from "@/components/authority/AuthorityPage";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact ValorWell | We're Here for the Veteran Community"
        description="Reach out to ValorWell at info@valorwell.org. We welcome questions about our mission, operations, and Beyond the Yellow initiatives."
        canonical="/contact"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">We would love to hear from you.</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you are a veteran, a family member, a partner, or simply someone who believes in this mission, your voice matters to us. We are genuinely excited to hear from anyone in the veteran community with questions about ValorWell's mission and operations, or if you want to help someone with their Beyond The Yellow initiatives.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            No question is too small, no idea too early. If it involves serving those who served, we want to know.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-4 bg-muted/50 rounded-xl">
            <Mail className="h-6 w-6 text-patriot-red" />
            <a
              href="mailto:info@valorwell.org"
              className="text-lg font-semibold text-navy hover:text-patriot-red transition-colors"
            >
              info@valorwell.org
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow text-center">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {CRISIS_NOTE}
          </p>
        </div>
      </section>
    </Layout>
  );
}
