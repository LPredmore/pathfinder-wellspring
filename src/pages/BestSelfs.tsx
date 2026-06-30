import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import corefeelLogo from "@/assets/corefeel-logo.png";
import vibetalesLogo from "@/assets/vibetales-logo.png";
import ninjadoLogo from "@/assets/ninjado-logo.png";

const products = [
  {
    name: "CoreFeel",
    href: "/corefeel",
    logo: corefeelLogo,
    body: "Emotional skills and thinking tools for feelings, needs, worry stories, and patterns.",
  },
  {
    name: "VibeTales",
    href: "/vibetales",
    logo: vibetalesLogo,
    body: "Reading and story-based tools for families, children, and growth.",
  },
  {
    name: "NinjaDo",
    href: "/ninjado",
    logo: ninjadoLogo,
    body: "Skill-building and task-support tools for routines, growth, and action.",
  },
];

const BestSelfs = () => {
  return (
    <Layout>
      <SEO
        title="BestSelfs — Family Tools That Support the ValorWell Mission"
        description="BestSelfs creates practical family tools and apps. Revenue from BestSelfs products helps support the ValorWell mission."
        canonical="/bestselfs"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "BestSelfs", url: "/bestselfs" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">BestSelfs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Practical tools for families that help support the ValorWell mission.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            BestSelfs builds apps and resources families can use outside formal systems. Revenue from BestSelfs products helps support ValorWell's mission to build better pathways for veterans and families navigating care, documentation, support gaps, and VA-related systems.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href="https://bestselfs.com" target="_blank" rel="noopener noreferrer">Visit BestSelfs.com</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/beyondtheyellow">Go Beyond the Yellow</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="py-12 md:py-16 section-alt">
        <div className="container-wide">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">BestSelfs products</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These pages support search campaigns and product discovery without making the apps the main ValorWell visitor journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {products.map((p) => (
              <Card key={p.name} className="border-border/60">
                <CardContent className="p-7">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={p.logo} alt={`${p.name} logo`} className="h-14 w-14 object-contain rounded-md" />
                    <h3 className="text-2xl font-bold text-navy">{p.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{p.body}</p>
                  <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                    <Link to={p.href}>Learn more</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools are part of the system families need.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            ValorWell's larger mission is about building pathways and practical support. BestSelfs fits that mission by creating tools families can use between appointments, outside systems, and in everyday life.
          </p>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/our-model">Explore the ValorWell Model</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default BestSelfs;
