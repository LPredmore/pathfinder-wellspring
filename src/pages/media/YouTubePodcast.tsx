import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// PLACEHOLDERS — swap with real URLs when available.
const YOUTUBE_URL = "https://www.youtube.com/@valorwell";
const MISSION_VIDEO_EMBED: string | null = null; // e.g. "https://www.youtube.com/embed/VIDEO_ID"

const categories = [
  {
    name: "Veteran Mental Health Access",
    topics: ["VA access barriers", "CHAMPVA", "Provider shortages", "Care delays", "Telehealth", "Documentation gaps"],
  },
  {
    name: "Family Systems",
    topics: ["Communication", "Parenting", "Conflict", "Emotional regulation", "Systems over reactions"],
  },
  {
    name: "Disability-System Support",
    topics: ["Ethical clinical documentation", "Treatment records", "Why predatory systems fill the gap", "How veterans can avoid exploitative options"],
  },
  {
    name: "Provider and Advocate Conversations",
    topics: ["Clinicians", "Veteran organizations", "Nonprofit leaders", "Community partners", "Advocates"],
  },
  {
    name: "Beyond the Yellow",
    topics: ["Funded therapy hours", "Creator campaigns", "Sponsors", "Mission partners", "Turning awareness into action"],
  },
];

const guestTypes = [
  "Veterans",
  "Spouses and family members",
  "Clinicians",
  "Veteran advocates",
  "Nonprofit leaders",
  "Community organizers",
  "Creators with aligned audiences",
  "People with personal stories about care barriers",
];

const YouTubePodcast = () => {
  return (
    <Layout>
      <SEO
        title="ValorWell YouTube and Podcast — VA Access, Family Support and Mission Conversations"
        description="Watch long-form ValorWell conversations about VA access, family support, documentation, Beyond the Yellow, and the mission to build better systems."
        canonical="/media/youtube-podcast"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Media", url: "/media" },
          { name: "YouTube & Podcast", url: "/media/youtube-podcast" },
        ]}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">YouTube & Podcast</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Long-form conversations about the systems that shape veterans, families, and mental health.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            ValorWell's YouTube and podcast-style conversations go deeper than short clips. We talk about the barriers, tools, stories, and systems that affect veterans and families in real life.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href="#mission-video">Watch the Mission Video</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy hover:bg-navy/5">
              <Link to="/partners">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Mission Video */}
      <section id="mission-video" className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Featured Mission Video</h2>
          <div className="aspect-video w-full border-2 border-dashed border-navy/30 rounded-lg bg-background flex items-center justify-center mb-6">
            {MISSION_VIDEO_EMBED ? (
              <iframe
                src={MISSION_VIDEO_EMBED}
                title="ValorWell Mission Video"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-6">
                <p className="text-navy font-semibold mb-2">Featured Mission Video Coming Soon</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  This video will explain what ValorWell is building, why the mission matters, and how viewers can support access to care.
                </p>
              </div>
            )}
          </div>
          <Button asChild className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch the Mission</a>
          </Button>
        </div>
      </section>

      {/* Conversation Categories */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Conversation Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
              <Card key={c.name} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-4">{c.name}</h3>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    {c.topics.map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Format */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Real conversations with people close to the problem.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We want to talk with veterans, family members, providers, advocates, creators, and organizations who care about building better support systems.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 mb-8 text-muted-foreground">
            {guestTypes.map((g) => (
              <li key={g}>• {g}</li>
            ))}
          </ul>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/partners">Apply to Partner With Us</Link>
          </Button>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe for deeper conversations.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            If the short videos introduce the framework, the long-form conversations explain the mission.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link to="/beyondtheyellow">Support the Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default YouTubePodcast;
