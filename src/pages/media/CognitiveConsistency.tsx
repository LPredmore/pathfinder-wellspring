import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// PLACEHOLDERS — replace with official URLs when ready.
const YOUTUBE_URL = "https://www.youtube.com/@valorwell";
const TIKTOK_URL = "https://www.tiktok.com/@valorwell";
const INSTAGRAM_URL = "https://www.instagram.com/valorwell";
const REDDIT_URL = "https://www.reddit.com/r/valorwell";

const test = [
  "What principle is being used?",
  "Would that principle still apply if the roles were reversed?",
  "Would it apply if the people involved were people I liked or disliked?",
  "Would I accept this rule if everyone used it?",
  "What outcome would this rule create if it became the standard?",
  "Is my reaction based on the principle, or based on who benefits?",
];

const topics = [
  { name: "Family and Parenting", body: "How parents, kids, spouses, and families apply rules differently depending on who is upset, who has power, or who feels wronged." },
  { name: "Public Controversies", body: "Emotionally charged situations where people often start with their desired outcome and work backward." },
  { name: "Race, Politics, and Identity", body: "Hard conversations where consistency, empathy, and careful reasoning matter most." },
  { name: "Veteran and Family Systems", body: "Situations where stress, trauma, bureaucracy, and family strain can create reactive thinking." },
  { name: "Relationships and Trust", body: "How double standards show up in marriage, co-parenting, friendship, accountability, and repair." },
];

const boundaries = [
  "We do not need to agree to examine consistency.",
  "Empathy does not require endorsement.",
  "Asking a question is not the same as taking a side.",
  "Strong emotions are not a substitute for a stable principle.",
  "The goal is better thinking, not winning arguments.",
];

const CognitiveConsistency = () => {
  return (
    <Layout>
      <SEO
        title="Cognitive Consistency — Applying Principles Across Hard Conversations"
        description="Cognitive Consistency is a ValorWell Media series that helps people test whether they apply the same principles consistently across emotionally charged situations."
        canonical="/media/cognitive-consistency"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Media", url: "/media" },
          { name: "Cognitive Consistency", url: "/media/cognitive-consistency" },
        ]}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">A ValorWell Media Series</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Do we apply the same rule when the people change?
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Cognitive Consistency is a ValorWell Media series that helps people test whether they are applying their principles consistently across emotionally charged situations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch the Series</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href="#framework">Explore the Framework</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">A framework for thinking, not a side to take.</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>Cognitive Consistency is not about telling people what to think. It is about helping people examine how they think.</p>
            <p>Each video looks at a situation, identifies the principle people seem to be using, and asks whether that same principle would still apply if the roles, people, politics, race, gender, or personal loyalties changed.</p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">Double standards destroy trust.</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>In families, communities, politics, relationships, and public life, conflict often gets worse when people apply one rule to people they like and a different rule to people they dislike.</p>
            <p>Cognitive Consistency helps people slow down and ask better questions before reacting.</p>
          </div>
        </div>
      </section>

      {/* The Consistency Test */}
      <section id="framework" className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Core Framework</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">The Consistency Test</h2>
          <ol className="space-y-4">
            {test.map((q, i) => (
              <li key={q} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-navy text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-lg text-foreground leading-relaxed pt-1">{q}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Topic Areas */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Topic Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((t) => (
              <Card key={t.name} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-3">{t.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tone and Boundaries */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">What this series is not.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            This series is not designed to create contempt, pile on individuals, or turn serious issues into entertainment. The goal is to create reflection, dialogue, and better thinking.
          </p>
          <ul className="space-y-3">
            {boundaries.map((b) => (
              <li key={b} className="flex gap-3 text-foreground">
                <span className="text-patriot-red font-bold">•</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm italic text-muted-foreground">
            Online content is educational. It is not therapy. If you need clinical support, visit <Link to="/get-care" className="text-navy underline">Get Care</Link>.
          </p>
        </div>
      </section>

      {/* Connection to ValorWell */}
      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Why this belongs with ValorWell.</h2>
          <div className="space-y-4 text-white/85 text-lg leading-relaxed mb-8">
            <p>The same thinking problems that divide public conversations also affect families, relationships, parenting, and mental health: emotional reasoning, double standards, avoidance, contempt, and reactive decision-making.</p>
            <p>ValorWell's broader mission is to build better support systems. Cognitive Consistency is one way we teach people to build better internal systems before conflict takes over.</p>
          </div>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/fund-access-to-care">Support the Mission</Link>
          </Button>
        </div>
      </section>

      {/* Watch / Follow */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Watch and follow.</h2>
          <div className="aspect-video w-full border-2 border-dashed border-navy/30 rounded-lg bg-muted/30 flex items-center justify-center mb-6">
            <div className="text-center p-6">
              <p className="text-navy font-semibold mb-2">Cognitive Consistency Playlist Coming Soon</p>
              <p className="text-sm text-muted-foreground">Replace this placeholder with the official YouTube playlist embed.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
            </Button>
            <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">Follow on TikTok</a>
            </Button>
            <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
            </Button>
            <Button asChild variant="ghost" className="text-navy hover:bg-navy/5">
              <a href={REDDIT_URL} target="_blank" rel="noopener noreferrer">Join the Discussion</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CognitiveConsistency;
