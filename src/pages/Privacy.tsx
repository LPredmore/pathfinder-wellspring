import { Layout } from "@/components/layout";
import { Hero } from "@/components/sections";

const Privacy = () => (
  <Layout>
    <Hero title="Privacy Policy" subtitle="Your privacy matters to us." ctaText="" ctaLink="" />
    <section className="section-padding">
      <div className="container-narrow prose prose-lg text-muted-foreground">
        <p>Privacy policy content will be provided. This page serves as a placeholder for legal content.</p>
      </div>
    </section>
  </Layout>
);

export default Privacy;
