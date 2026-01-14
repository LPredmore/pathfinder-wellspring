import { Layout } from "@/components/layout";
import { Hero, CTABlock } from "@/components/sections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, Users, Shield, CreditCard, Laptop, Route, ClipboardList } from "lucide-react";

/**
 * About page intent:
 * - High-trust, calm, mission-driven
 * - Mirrors the best of valorwell.org/about (story + mission + differentiators)
 * - Removes Foundation/OCS + VA claims messaging
 * - Insurance positioning: CHAMPVA only (no VA Community Care, no TRICARE)
 */

const differentiators = [{
  title: "CHAMPVA Accepted",
  description: "We accept CHAMPVA and aim to make the process as straightforward as possible—so you can focus on care, not paperwork.",
  icon: CreditCard
}, {
  title: "Military-Centered Care",
  description: "Our clinicians understand military culture and the realities veterans and families face—because context matters in care.",
  icon: Shield
}, {
  title: "Telehealth-First Access",
  description: "Secure, confidential care designed to fit real-life schedules—wherever you are.",
  icon: Laptop
}, {
  title: "Multiple Paths to Support",
  description: "Therapy is one path. We also offer Support Sessions and Groups so people can start making progress without waiting for perfect conditions.",
  icon: Route
}];
const values = [{
  title: "Access-First",
  description: "We design for real-world barriers—availability, logistics, and complexity—so more people can start sooner.",
  icon: ClipboardList
}, {
  title: "Respect + Compassion",
  description: "We meet people where they are with dignity and empathy. No judgment—only practical support and clarity.",
  icon: Heart
}, {
  title: "Community Matters",
  description: "Healing is not only individual. We create structured spaces for connection, shared learning, and mutual support.",
  icon: Users
}, {
  title: "Integrity + Evidence-Informed",
  description: "We prioritize approaches grounded in proven methods—and we communicate clearly about what each service is and isn’t.",
  icon: Target
}];
const About = () => {
  return <Layout>
      <Hero title="About ValorWell" subtitle="We’re building clearer, more accessible mental health support for veterans and families—through therapy when available, and practical support options that help people keep moving forward." ctaText="Get Started" ctaLink="/get-started" />

      {/* Our Story */}
      <section className="py-6 md:py-10">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>

          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>ValorWell was born from a deeply personal experience. Founders Lucas and Nichole Predmore faced their own struggles in securing affordable mental health support for their family. Confronted with the challenges of finding therapists who accepted CHAMPVA and dealing with lengthy reimbursement delays, they recognized a critical gap in care for veterans and their loved ones. This experience ignited a passion to create a solution that would simplify access to mental health services for the military community. Thus, ValorWell was formed – a beacon of hope in a landscape where mental health support often falls short.</p>
            <p>
              We built ValorWell to reduce those barriers and make it easier to start. That means offering licensed
              therapy when available, and providing additional structured support options—Support Sessions and Groups—so
              people can build momentum instead of waiting.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-6 md:py-10 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">At ValorWell, we're on a mission to revolutionize access to quality mental health care for those who've sacrificed so much for our nation. We believe that every veteran and their family members deserve exceptional care, delivered with respect, understanding, and unwavering commitment.</p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-background p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Therapy is delivered by licensed clinicians</span> and
                availability can vary by state and provider capacity.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Route className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Support Sessions and Groups</span> provide additional,
                structured paths designed to help people start moving forward with clarity and momentum.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">We accept CHAMPVA</span> and can help you understand how
                to use your coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-6 md:py-10">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What sets ValorWell apart</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We focus on access, clarity, and military-centered support—so the process feels straightforward and
              respectful from the first step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map(item => <Card key={item.title}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-6 md:py-10 section-alt">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our values</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide how we build programs, support clients, and earn trust over time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(value => <Card key={value.title}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABlock className="py-6 md:py-10" title="Start with the support that fits today." subtitle="Choose Therapy, Support Sessions, or Groups. Get started in under a minute." variant="muted" />
    </Layout>;
};
export default About;