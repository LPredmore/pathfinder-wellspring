import { Layout } from "@/components/layout";
import { SEO, ServiceSchema, BreadcrumbSchema } from "@/components/SEO";
import { Hero, StepsSection, CTABlock, ContentSection } from "@/components/sections";
import { ClipboardCheck, Target, Brain, Route, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Get Started",
    description:
      "Answer a few questions so we can understand your goals, preferences, and what you want to improve first.",
  },
  {
    number: 2,
    title: "Meet your Wellness Guide",
    description:
      "You’ll be paired with a trained Wellness Guide and scheduled into a consistent cadence that respects your time.",
  },
  {
    number: 3,
    title: "Build skills and momentum",
    description:
      "Each session ends with a clear plan—practical tools, next steps, and simple progress check-ins to keep you moving forward.",
  },
];

const focusAreas = [
  "Stress regulation and daily routines",
  "Confidence, follow-through, and accountability",
  "Transitions (work, family, relocation, post-service life)",
  "Communication skills and relationship dynamics",
  "Sleep habits and energy management",
  "Goal clarity, decision-making, and planning",
  "Resilience skills for pressure and uncertainty",
];

const sessionStructure = [
  {
    title: "Structured intake + goal definition",
    description:
      "We start by clarifying what matters most right now and defining outcomes you can actually measure in real life.",
    icon: Target,
  },
  {
    title: "Skills-forward sessions",
    description: "Sessions focus on applied tools—strategies you can use immediately, not just talk about in theory.",
    icon: Brain,
  },
  {
    title: "Action plan every time",
    description:
      "You leave with a simple plan: what to do next, what to practice, and what we’ll review in the next session.",
    icon: ClipboardCheck,
  },
  {
    title: "Progress check-ins",
    description: "We track progress using clear signals—habits, behaviors, and outcomes that matter to you.",
    icon: CheckCircle2,
  },
];

const SupportSessions = () => {
  return (
    <Layout>
      <SEO 
        title="Support Sessions for Veterans & Families"
        description="Veteran life coaching and support sessions. Goal-oriented guidance for military families facing transition, stress, and relationship challenges. Start in days, not months."
        canonical="/support-sessions"
      />
      <ServiceSchema 
        name="Support Sessions"
        description="Structured, one-on-one sessions with trained Wellness Guides focused on goal clarity, skill-building, and practical next-step planning."
        url="/support-sessions"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Support Sessions", url: "/support-sessions" }
      ]} />
      <Hero
        title="Support Sessions"
        subtitle="When you're ready for support, waiting and red tape can feel like the opposite of care. Traditional systems can make it hard to connect quickly and consistently. ValorWell Support Sessions are designed to remove the friction—structured, one-on-one sessions that build skills and momentum for veterans and families who want a professional, modern support option."
      />

      <ContentSection title="What Support Sessions are">
        <p>
          Support Sessions are structured, one-on-one sessions with a trained Wellness Guide. The focus is practical:
          goal clarity, skill-building, and next-step planning. Sessions are designed to help you make progress you can
          feel in daily life—at home, at work, and in your relationships.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="font-semibold text-foreground">Professional structure</div>
            <p className="mt-2 text-sm text-muted-foreground">
              A consistent framework with clear session goals, takeaways, and follow-through.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="font-semibold text-foreground">Skills that transfer</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Practical strategies you can apply immediately—routines, communication tools, and resilience skills.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="font-semibold text-foreground">Built for access</div>
            <p className="mt-2 text-sm text-muted-foreground">
              A modern support option that’s designed to start quickly and fit real schedules.
            </p>
          </div>
        </div>

      </ContentSection>

      <ContentSection title="Who it's for" variant="alt">
        <p>
          Support Sessions are designed for veterans, service members, and family members who want a structured,
          professionally guided path to improve day-to-day functioning, routines, communication, and resilience.
        </p>

        <ul className="mt-6 grid gap-2 text-muted-foreground md:grid-cols-2">
          <li>• People navigating transition or change</li>
          <li>• Those who want structure and accountability</li>
          <li>• Families seeking better communication tools</li>
          <li>• Anyone who wants practical skills and a clear plan</li>
          <li>• People who prefer goal-based sessions with takeaways</li>
          <li>• Those who want a modern, accessible support option</li>
        </ul>
      </ContentSection>

      <ContentSection title="What you can work on">
        <p>
          The work is practical and skills-forward. Many clients use Support Sessions to strengthen routines, reduce
          friction in daily life, and build a repeatable system for progress.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Route className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">Common focus areas</div>
              <ul className="mt-3 grid gap-2 text-muted-foreground md:grid-cols-2">
                {focusAreas.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Session structure" variant="alt">
        <p>Sessions follow a consistent framework so you know what to expect and can measure progress over time.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {sessionStructure.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          Sessions are delivered online through a secure experience and are designed to be straightforward, consistent,
          and respectful of your time.
        </div>
      </ContentSection>

      <StepsSection
        title="How it works"
        subtitle="A simple process designed to help you start quickly and build momentum."
        steps={steps}
      />

      <CTABlock
        title="Ready to build momentum?"
        subtitle="Start with Support Sessions and get a structured plan you can apply immediately."
      />
    </Layout>
  );
};

export default SupportSessions;
