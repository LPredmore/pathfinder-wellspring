import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// PLACEHOLDER — replace with the official subreddit/community URL.
const REDDIT_URL = "https://www.reddit.com/r/valorwell";

const guidelines = [
  "Bring curiosity, not contempt. We're here to think together, not score points.",
  "Disagree on the principle, not the person.",
  "No identifying details about third parties without their consent.",
  "Community discussion is not therapy and not crisis support.",
  "Moderators may remove content that targets individuals or spreads misinformation.",
];

const storyPrompts = [
  "What did getting (or not getting) mental health care look like for you or your family?",
  "What's a system — VA, CHAMPVA, insurance, school, workplace — that worked, or didn't?",
  "What's something you wish someone had told you earlier?",
];

const consistencyPrompts = [
  "Pick a recent public situation. Would you apply the same rule if the people involved were swapped?",
  "Where in your own life have you noticed a double standard you wouldn't accept from someone else?",
  "What principle are you most consistent about? Which one is hardest to hold steady?",
];

const familyPrompts = [
  "What's one family pattern you'd like to break — and one you'd like to keep?",
  "When stress is high, what does your family default to? What would you rather default to?",
  "If you're a military spouse or family member, what do outsiders consistently miss?",
];

const Community = () => {
  return (
    <Layout>
      <SEO
        title="ValorWell Community — Join the Conversation"
        description="Join ValorWell community discussions about veteran support, family systems, mental health access, Cognitive Consistency, and better ways to solve hard problems."
        canonical="/media/community"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Media", url: "/media" },
          { name: "Community", url: "/media/community" },
        ]}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Community</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Join the conversation.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            ValorWell uses community discussion to learn what veterans, families, supporters, and the public are seeing in real life.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={REDDIT_URL} target="_blank" rel="noopener noreferrer">Join on Reddit</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/media/collaborate">Share Your Story</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Reddit link is a placeholder until the official community is live.
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Discussion guidelines</h2>
          <ul className="space-y-3">
            {guidelines.map((g) => (
              <li key={g} className="flex gap-3 text-foreground">
                <span className="text-patriot-red font-bold">•</span>
                <span className="leading-relaxed">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prompts */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Conversation prompts</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-navy mb-3">Stories</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">{storyPrompts.map((p) => <li key={p}>• {p}</li>)}</ul>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-navy mb-3">Cognitive Consistency</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">{consistencyPrompts.map((p) => <li key={p}>• {p}</li>)}</ul>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-navy mb-3">Veterans & Families</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">{familyPrompts.map((p) => <li key={p}>• {p}</li>)}</ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Not Therapy Disclaimer */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <Card className="border-patriot-red/40 bg-background">
            <CardContent className="p-7">
              <h2 className="text-2xl font-bold text-navy mb-3">Community discussion is not therapy or crisis support.</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Online conversation is educational. It is not a substitute for clinical care. If you or someone you love needs help, use one of the paths below.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                  <Link to="/get-care">Get Care</Link>
                </Button>
                <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <Link to="/urgent-help">Urgent Help</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Support the mission behind the conversation.</h2>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/fund-access-to-care">Fund Access to Care</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
