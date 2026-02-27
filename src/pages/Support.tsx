import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { SEO, DonateActionSchema, BreadcrumbSchema } from "@/components/SEO";
import { trackDonateConversion } from "@/lib/tracking";
import { ContentSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { CheckCircle, BarChart3, TrendingUp, Trophy } from "lucide-react";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEO
        title="Support the Bridge Program"
        description="Help fund real mental health therapy sessions for veterans through ValorWell's Bridge Program. $75 sponsors 1 session. Become a monthly sponsor or give once."
        canonical="/support"
      />
      <DonateActionSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support the Bridge Program", url: "/support" },
        ]}
      />

      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        <div className="absolute inset-0 bg-white/70" />

      {/* Hero */}
      <section className="relative z-10 section-padding">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Support the Bridge Program
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Fund real therapy sessions for veterans—when support can't wait.
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm">
            ValorWell's Bridge Program helps fund mental health therapy sessions
            for veterans during gaps in access and delays in care. This is direct
            support—measured in sessions funded.
          </p>
          <div className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold mb-8">
            $75 sponsors 1 therapy session
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" onClick={() => trackDonateConversion()}>
              <a
                href="https://valorwell.org/donate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sponsor a Session
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" onClick={() => trackDonateConversion()}>
              <a
                href="https://valorwell.org/donate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Become a Monthly Sponsor
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What the Bridge Program Does */}
      <ContentSection title="What the Bridge Program Does" className="relative z-10">
        <p>
          The Bridge Program exists for one reason: to get veterans support
          now—not only after months of waiting, paperwork, or scheduling
          barriers.
        </p>
        <p className="mt-4">
          Your donation helps fund therapy sessions that veterans can use while
          longer timelines play out.
        </p>
      </ContentSection>

      {/* Why Continued Support Matters */}
      <ContentSection title="Why Continued Support Matters" variant="alt" className="relative z-10">
        <p>
          One-time donations help. Continued support changes what we can reliably
          do.
        </p>
        <p className="mt-4 font-medium text-foreground">
          Monthly sponsorship:
        </p>
        <ul className="mt-3 space-y-3">
          {[
            "Creates predictable funding for sessions",
            "Helps prevent interruptions in care",
            "Allows planning for veterans who need ongoing support",
            "Builds a stable bridge that doesn't depend on one-time spikes",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-medium text-foreground">
          If you've ever wanted to help veterans in a way that is measurable and
          immediate, this is it.
        </p>
      </ContentSection>

      {/* What Your Gift Funds */}
      <section className="relative z-10 section-padding">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            What Your Gift Funds
          </h2>

          <div className="grid grid-cols-2 gap-3 max-w-md mb-8">
            {[
              { amount: "$75", sessions: "1 session" },
              { amount: "$150", sessions: "2 sessions" },
              { amount: "$375", sessions: "5 sessions" },
              { amount: "$750", sessions: "10 sessions" },
            ].map((tier) => (
              <span
                key={tier.amount}
                className="rounded bg-muted px-4 py-2.5 text-center font-medium text-foreground"
              >
                {tier.amount} = {tier.sessions}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-4">
            Suggested monthly sponsorships
          </h3>
          <ul className="space-y-2 text-muted-foreground mb-8">
             <li className="flex items-center gap-2">
              <span className="font-medium text-foreground">$75/month</span> —
               Sponsor 1 session each month
             </li>
             <li className="flex items-center gap-2">
              <span className="font-medium text-foreground">$150/month</span> —
               Sponsor 2 sessions each month
             </li>
             <li className="flex items-center gap-2">
              <span className="font-medium text-foreground">$375/month</span> —
               Sponsor 5 sessions each month
             </li>
          </ul>

          <Button asChild size="lg" onClick={() => trackDonateConversion()}>
            <a
              href="https://valorwell.org/donate"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sponsor Sessions Now
            </a>
          </Button>
        </div>
      </section>

      {/* Other Ways to Help */}
      <ContentSection title="Other Ways to Help" variant="alt" className="relative z-10">
        <p className="mb-4">
          Not everyone can give financially. These actions still help fund
          sessions:
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>Share the campaign with someone who supports veterans</li>
          <li>
            Encourage a creator to join the competition and fundraise
          </li>
          <li>
            Invite your workplace or community group to sponsor a set number of
            sessions
          </li>
        </ul>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link to="/beyondtheyellow">Beyond the Yellow</Link>
          </Button>
        </div>
      </ContentSection>

      {/* Transparency and Accountability */}
      <section className="relative z-10 section-padding">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Transparency and Accountability
          </h2>
          <p className="text-muted-foreground mb-6">
            We believe support should be clear and measurable. Our reporting
            focuses on:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              { icon: BarChart3, label: "Sessions funded" },
              { icon: TrendingUp, label: "Monthly sponsor growth" },
              { icon: Trophy, label: "Creator challenge outcomes and totals" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-muted-foreground">
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground italic">
            (We'll publish updates as the program grows.)
          </p>
        </div>
      </section>
      </div>
    </Layout>
  );
};

export default Support;
