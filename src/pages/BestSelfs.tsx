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
    body: "Emotional skills and thinking tools designed to help people better understand feelings, needs, worry stories, and patterns.",
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
    body: "Skill-building and task-support tools for growth, routines, and action.",
  },
  {
    name: "Future Tools",
    href: null,
    logo: null,
    body: "BestSelfs will continue building practical tools that support emotional growth, family systems, and mission-aligned education.",
  },
];

const BestSelfs = () => {
  return (
    <Layout>
      <SEO
        title="BestSelfs by ValorWell — Tools That Help Families Grow Stronger"
        description="BestSelfs creates practical emotional skills, family communication, reading, and growth tools that help support ValorWell's mission."
        canonical="/bestselfs"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "BestSelfs", url: "/bestselfs" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">BestSelfs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            BestSelfs builds tools that help families grow stronger.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            BestSelfs creates practical apps and resources for emotional skills, family communication, routines, reading, and self-guided growth. Revenue from BestSelfs helps support ValorWell's mission to expand mental health access for veterans and families.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href="#products">Explore BestSelfs Tools</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/fund-access-to-care">Support the Mission</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm italic text-muted-foreground">
            ValorWell is the mission. BestSelfs helps power it.
          </p>
        </div>
      </section>

      <section id="products" className="py-12 md:py-16 section-alt">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-5">
            {products.map((p) => (
              <Card key={p.name} className="border-border/60">
                <CardContent className="p-7">
                  <div className="flex items-center gap-4 mb-4">
                    {p.logo && (
                      <img src={p.logo} alt={`${p.name} logo`} className="h-14 w-14 object-contain rounded-md" />
                    )}
                    <h3 className="text-2xl font-bold text-navy">{p.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{p.body}</p>
                  {p.href && (
                    <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                      <Link to={p.href}>Learn more</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apps with a larger purpose.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            When someone subscribes to a BestSelfs product, they are not just buying an app. They are helping support a larger system designed to expand care, tools, and support for veterans and families.
          </p>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/fund-access-to-care">Support the Mission</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default BestSelfs;
