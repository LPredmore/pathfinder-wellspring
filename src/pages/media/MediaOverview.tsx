import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const YOUTUBE_URL = "https://www.youtube.com/@valorwell";

const pillars = [
  {
    name: "VA access and care navigation",
    body: "Explainers that help veterans and families understand delays, referrals, Community Care, CHAMPVA, and next steps.",
  },
  {
    name: "Veteran and family support",
    body: "Conversations about stress, transition, family strain, trauma, caregiving, and practical support outside formal systems.",
  },
  {
    name: "Documentation and predatory systems",
    body: "Education about ethical documentation, real care relationships, and the expensive alternatives that often fill the gap.",
  },
  {
    name: "Beyond the Yellow updates",
    body: "Stories, campaign updates, and interviews that show how supporters can turn awareness into funded action.",
  },
  {
    name: "BestSelfs tools",
    body: "Practical family tools and apps that support the larger ValorWell mission.",
  },
];

const MediaOverview = () => {
  return (
    <Layout>
      <SEO
        title="ValorWell Videos and Podcast — Education for Veterans, Families, and Supporters"
        description="ValorWell videos and podcast conversations help veterans, families, partners, and supporters understand VA access, care barriers, documentation, family support, and Beyond the Yellow."
        canonical="/media"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Videos", url: "/media" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Videos & Podcast</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-5">
            Education for the systems veterans and families are forced to navigate.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
            ValorWell videos and conversations explain care access, VA-related barriers, documentation challenges, family support, and what real action looks like through Beyond the Yellow.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/media/youtube-podcast">Watch Videos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy hover:bg-navy/5">
              <Link to="/partners">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">This is education tied to the mission.</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>The goal is not content for content's sake. The goal is to help people understand the broken ecosystem and find a clearer path before they are forced into expensive, confusing, or predatory alternatives.</p>
            <p>Short videos help people find the mission. Long-form conversations build trust and explain what needs to change.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Content focus</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <Card key={p.name} className="border-border/60 flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-navy mb-3">{p.name}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Every view should point back to useful action.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            Videos should help someone understand their options, share a resource, support the campaign, or connect with a partner who can move the mission forward.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/beyondtheyellow">Go Beyond the Yellow</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link to="/resources">Explore Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MediaOverview;
