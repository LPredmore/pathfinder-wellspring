import { Layout } from "@/components/layout";
import { Hero, StepsSection, CTABlock, ContentSection } from "@/components/sections";

const steps = [
  {
    number: 1,
    title: "Get Started",
    description:
      "Answer a few questions so we can understand your goals, your state, and what you want support with first.",
  },
  {
    number: 2,
    title: "Intake + matching",
    description: "We confirm availability and match you with a licensed therapist who fits your needs and preferences.",
  },
  {
    number: 3,
    title: "Begin with a plan",
    description:
      "Start sessions via secure telehealth and build momentum with a clear direction and consistent support.",
  },
];

const Therapy = () => {
  return (
    <Layout>
      <Hero
        title="Therapy that honors your service—and supports your next chapter."
        subtitle="When you’re ready for support, the system can feel slow and confusing. ValorWell makes it easier to connect with licensed therapists who understand military life—and start moving toward peace, strength, and resilience."
        size="large"
      />

      {/* Hero CTAs */}
      <section className="-mt-10 pb-8">
        <div className="container-wide">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/get-started"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              Get Started
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-muted focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              How it works
            </a>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            If you’re experiencing an emergency, call 911.{" "}
            <a href="/urgent-help" className="underline underline-offset-2">
              Urgent help resources
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pain points -> solution */}
      <ContentSection title="You shouldn’t have to fight the system to get support">
        <p>
          Many veterans and families reach out for care and hit the same obstacles: long waits, providers who don’t
          understand military culture, and a process that feels more exhausting than helpful.
        </p>
        <p className="mt-4">
          ValorWell was built to reduce that friction. We provide a clear starting point, a respectful intake process,
          and therapy with licensed clinicians who understand the unique stressors of military life—transitions,
          deployments, family dynamics, and everything that comes with them.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="font-semibold text-foreground">Military-centered</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Care that respects the context of service and the realities families carry.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="font-semibold text-foreground">Telehealth-first access</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Secure, confidential sessions designed to fit real schedules and real life.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="font-semibold text-foreground">Clarity from day one</div>
            <p className="mt-2 text-sm text-muted-foreground">
              A straightforward process with clear next steps—so you can focus on healing.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/get-started"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:opacity-90"
          >
            Get Started
          </a>
          <a
            href="/support-sessions"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-muted"
          >
            Explore Support Sessions
          </a>
          <a
            href="/groups"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-muted"
          >
            View Groups
          </a>
        </div>
      </ContentSection>

      {/* Who it's for */}
      <ContentSection title="Who therapy is for" variant="alt">
        <p>
          Our therapy services are designed for veterans, service members, and family members who want a clinically
          grounded, supportive space to work on what matters most.
        </p>

        <ul className="mt-6 grid gap-2 text-muted-foreground md:grid-cols-2">
          <li>• Veterans navigating post-service transition or reintegration</li>
          <li>• Service members carrying persistent stress or pressure</li>
          <li>• Partners and spouses seeking individual support</li>
          <li>• Families working through communication and relationship strain</li>
          <li>• Anyone who wants a structured, confidential therapeutic process</li>
          <li>• Those ready to build stability, resilience, and healthier patterns</li>
        </ul>
      </ContentSection>

      {/* What to expect */}
      <ContentSection title="What you can expect">
        <p>
          Therapy at ValorWell is collaborative and goal-oriented. You and your therapist will clarify what you want to
          change, identify patterns that keep you stuck, and build strategies that support real progress over time.
        </p>
        <p className="mt-4">
          Sessions are delivered via secure telehealth. Your therapist will help you set a direction, measure progress
          in practical ways, and develop skills you can carry into daily life.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="font-semibold text-foreground">CHAMPVA accepted</div>
          <p className="mt-2 text-sm text-muted-foreground">
            If you use CHAMPVA, we’ll help keep the process straightforward so you can focus on care.
          </p>
        </div>
      </ContentSection>

      {/* How it works */}
      <section id="how-it-works">
        <StepsSection
          title="How it works"
          subtitle="A simple process designed to help you start with clarity and hope."
          steps={steps}
        />
      </section>

      {/* Hopeful close + capacity reality, framed positively */}
      <ContentSection title="If therapy availability is limited" variant="alt">
        <p>
          Therapy availability can vary by state and clinician capacity. If a therapist isn’t immediately available, you
          can join the waitlist and begin building momentum through Support Sessions or Groups while you wait—so your
          progress doesn’t have to pause.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/support-sessions"
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-base font-semibold text-background shadow-sm hover:opacity-90"
          >
            Start Support Sessions
          </a>
          <a
            href="/groups"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-muted"
          >
            Explore Groups
          </a>
        </div>
      </ContentSection>

      {/* CTA */}
      <CTABlock
        title="You’ve carried a lot. You don’t have to carry it alone."
        subtitle="Take the first step toward healing. We’ll help you find the right path and start with a plan."
      />

      {/* Safety note */}
      <section className="pb-12">
        <div className="container-wide">
          <p className="text-center text-sm text-muted-foreground">
            If you’re in immediate danger or experiencing an emergency, call 911.{" "}
            <a href="/urgent-help" className="underline underline-offset-2">
              Urgent help resources
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Therapy;
