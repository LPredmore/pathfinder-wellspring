import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// PLACEHOLDER — swap with the official ValorWell YouTube channel URL when available.
const YOUTUBE_URL = "https://www.youtube.com/@valorwell";

const pillars = [
  {
    name: "Cognitive Consistency",
    body: "Short-form videos that test whether we apply the same principle consistently across emotionally charged situations.",
    cta: "Explore Cognitive Consistency",
    href: "/media/cognitive-consistency",
  },
  {
    name: "Veteran Mental Health",
    body: "Conversations about care access, trauma, family strain, VA barriers, CHAMPVA, documentation, and the real-life systems veterans have to navigate.",
    cta: "Watch Veteran Topics",
    href: "/media/youtube-podcast",
  },
  {
    name: "Family Systems",
    body: "Content that helps families move from reacting to each situation individually toward building shared systems for how they think, communicate, and solve problems.",
    cta: "Explore Family Systems",
    href: "/media/youtube-podcast",
  },
  {
    name: "Podcast Conversations",
    body: "Longer conversations with veterans, families, providers, advocates, creators, and people working to solve real problems.",
    cta: "Watch Conversations",
    href: "/media/youtube-podcast",
  },
  {
    name: "BestSelfs Tools",
    body: "Practical tools and apps that support emotional skills, parenting, communication, reading, routines, and family growth.",
    cta: "Explore BestSelfs",
    href: "/bestselfs",
  },
];

const MediaOverview = () => {
  return (
    <Layout>
      <SEO
        title="ValorWell Media — Better Systems for Harder Conversations"
        description="ValorWell Media creates videos, podcasts, shorts, and discussions about veteran mental health, family systems, Cognitive Consistency, and better ways to think through difficult issues."
        canonical="/media"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Media", url: "/media" }]} />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">ValorWell Media</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-5">
            Better systems for harder conversations.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
            ValorWell Media helps people slow down, think clearly, and approach difficult issues with more consistency, empathy, and structure.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
            We create short-form videos, long-form discussions, podcast conversations, and community content around the thinking patterns that affect families, veterans, relationships, communities, and public life.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/media/youtube-podcast">Watch the Mission</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy hover:bg-navy/5">
              <Link to="/media/collaborate">Be a Guest</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Media Exists */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">This is not content for content's sake.</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>ValorWell Media exists to help people understand the mission, engage with hard topics, and build better ways to think, communicate, and respond.</p>
            <p>The same thinking patterns that divide families also divide communities: emotional reasoning, double standards, contempt, avoidance, and reactive decision-making.</p>
            <p>Our goal is to help people move from reaction to reflection.</p>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Content Pillars</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <Card key={p.name} className="border-border/60 flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-navy mb-3">{p.name}</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed flex-1">{p.body}</p>
                  <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white self-start">
                    <Link to={p.href}>{p.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shorts vs Long-Form */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Shorts create attention. Long-form builds trust.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our short-form content introduces people to practical thinking frameworks. Our long-form conversations go deeper into veteran issues, family systems, mental health access, and the mission behind ValorWell.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="border-border/60">
              <CardContent className="p-7">
                <h3 className="text-2xl font-bold text-navy mb-4">Shorts</h3>
                <ul className="space-y-2 mb-6 text-muted-foreground">
                  <li>Cognitive Consistency</li>
                  <li>Family systems</li>
                  <li>Parenting questions</li>
                  <li>Public issue frameworks</li>
                  <li>Emotional reasoning</li>
                  <li>Role-reversal tests</li>
                </ul>
                <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch Shorts</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-7">
                <h3 className="text-2xl font-bold text-navy mb-4">Long-Form</h3>
                <ul className="space-y-2 mb-6 text-muted-foreground">
                  <li>Mission videos</li>
                  <li>Podcast conversations</li>
                  <li>Veteran stories</li>
                  <li>Provider discussions</li>
                  <li>Family systems breakdowns</li>
                  <li>Deeper educational topics</li>
                </ul>
                <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <Link to="/media/youtube-podcast">Watch Long-Form</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Link to="/videos" className="text-sm text-navy underline underline-offset-4 hover:text-patriot-red">
              Browse all ValorWell videos →
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Connection */}
      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Every view should point back to the mission.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            ValorWell Media is designed to do more than generate views. It helps people discover the larger mission: building a better support system so veterans and their families can get care, documentation, and practical tools without waiting months, going untreated, or relying on predatory systems.
          </p>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/fund-access-to-care">Support the Mission</Link>
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Join the conversation. Support the mission.</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/fund-access-to-care">Fund Access to Care</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy hover:bg-navy/5">
              <Link to="/media/collaborate">Be a Guest</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MediaOverview;
