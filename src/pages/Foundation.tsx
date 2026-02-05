import { Layout } from "@/components/layout";
import { Hero } from "@/components/sections";
import { SEO } from "@/components/SEO";

const Foundation = () => (
  <Layout>
    <SEO
      title="Foundation"
      description="Learn about the ValorWell Foundation and our mission to expand mental health access for veterans and military families."
      canonical="/foundation"
      noIndex={true}
    />
    <Hero title="Foundation" subtitle="Content coming soon." ctaText="" ctaLink="" />
    <section className="section-padding">
      <div className="container-narrow text-muted-foreground">
        <p>Foundation page content will be provided.</p>
      </div>
    </section>
  </Layout>
);

export default Foundation;
