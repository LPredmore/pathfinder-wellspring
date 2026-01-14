import { Layout } from "@/components/layout";
import { Hero, CTABlock } from "@/components/sections";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Heart, Shield, Compass, Sparkles, CalendarDays } from "lucide-react";

const groups = [
  {
    slug: "veteran-peer",
    title: "Veteran Peer",
    description:
      "A structured, supportive space to connect with other veterans—shared experience, practical discussion, and steady momentum.",
    icon: Users,
  },
  {
    slug: "family-partner",
    title: "Family & Partner",
    description:
      "For partners and family members navigating military life—communication tools, support, and a space that respects the whole system.",
    icon: Heart,
  },
  {
    slug: "resilience-building",
    title: "Resilience Building",
    description:
      "Skills-forward sessions designed to strengthen stress regulation, routines, and resilience under pressure.",
    icon: Shield,
  },
  {
    slug: "transition-support",
    title: "Transition Support",
    description:
      "Focused support for post-service transition—identity, purpose, routines, and practical next steps for civilian life.",
    icon: Compass,
  },
];

const Groups = () => {
  return (
    <Layout>
      <Hero
        title="Groups"
        subtitle="Groups are launching soon. Join the interest list for the category that fits your situation—and we’ll reach out when enrollment opens."
        size="large"
        ctaText="Join the Interest List"
        ctaLink="/get-started?service=groups"
      />

      {/* Quick context + positioning */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />A structured way to build momentum—together
            </div>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">Find the group category that fits</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Many people want support that feels grounded, consistent, and shared. ValorWell Groups are designed to
              combine community with practical skills and a clear format—so it feels focused and respectful of your
              time.
            </p>
          </div>

          {/* Group category cards */}
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {groups.map((group) => (
              <Card key={group.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <group.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{group.title}</CardTitle>
                  <CardDescription className="text-base">{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={`/get-started?service=groups&group=${group.slug}`}>Request to Join</Link>
                  </Button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    You’ll be added to the interest list for this category. We’ll contact you with timing and next steps
                    as enrollment opens.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect (future-state, without over-promising) */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">What to expect</h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Our groups are designed to be structured and skills-forward, with a clear format that supports
              participation and follow-through. Each group category is built around practical goals—connection,
              communication, routines, and resilience skills that translate to daily life.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <CalendarDays className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Enrollment and scheduling</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Groups will open on a rolling basis based on interest and facilitator availability. When you request
                    to join, we’ll follow up with the next available start window, group format details, and
                    participation guidelines.
                  </p>
                </div>
              </div>
            </div>

            <p>
              Prefer one-on-one support right away? You can begin with{" "}
              <Link to="/support-sessions" className="underline underline-offset-2">
                Support Sessions
              </Link>{" "}
              while you wait for a group to open.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/get-started?service=groups">Join the Interest List</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/support-sessions">Explore Support Sessions</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABlock
        title="Join a group when enrollment opens"
        subtitle="Select the category that fits you best. We’ll follow up with next steps as cohorts become available."
        ctaLink="/get-started?service=groups"
        variant="muted"
      />
    </Layout>
  );
};

export default Groups;
