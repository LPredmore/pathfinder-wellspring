import { Layout } from "@/components/layout";
import { Hero } from "@/components/sections";
import { SEO } from "@/components/SEO";

const Privacy = () => (
  <Layout>
    <SEO
      title="Privacy Policy"
      description="ValorWell's privacy policy. Learn how we protect your personal information and health data."
      canonical="/privacy"
    />
    <Hero title="Privacy Policy" subtitle="Your privacy matters to us." ctaText="" ctaLink="" />
    <section className="section-padding">
      <div className="container-narrow prose prose-lg text-muted-foreground">
        <p>Privacy policy content will be provided. This page serves as a placeholder for legal content.</p>
      </div>
    </section>
  </Layout>
);

export default Privacy;
