import { Layout } from "@/components/layout";
import { StepsSection, CTABlock } from "@/components/sections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";
import { SEO, BreadcrumbSchema } from "@/components/SEO";

const services = [
  {
    title: "Therapy",
    description: "Licensed clinical treatment for mental health conditions",
    icon: Heart,
    features: [
      "Licensed therapists",
      "Evidence-based treatment",
      "Trauma-informed care",
      "Telehealth & in-person options",
    ],
  },
  {
    title: "Support Sessions",
    description: "Structured guidance for goals and life transitions",
    icon: MessageCircle,
    features: [
      "Trained specialists",
      "Goal-oriented approach",
      "Practical skill-building",
      "Flexible scheduling",
    ],
  },
];

const steps = [
  {
    number: 1,
    title: "Choose Your Service",
    description:
      "Decide whether therapy, support sessions, or groups best fit your current needs.",
  },
  {
    number: 2,
    title: "Complete Intake",
    description:
      "Answer a few questions so we can match you with the right provider or program.",
  },
  {
    number: 3,
    title: "Get Matched",
    description:
      "We'll connect you with a provider or group based on your preferences and goals.",
  },
  {
    number: 4,
    title: "Begin Your Care",
    description:
      "Start your sessions and take the first step on your path to wellbeing.",
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      <SEO
        title="How It Works"
        description="Getting started with ValorWell is simple. Learn how our intake process works for therapy and support sessions. CHAMPVA accepted, telehealth available."
        canonical="/how-it-works"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "How It Works", url: "/how-it-works" }
      ]} />
      {/* Full-page flag background from header to CTA */}
      <div 
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        {/* Subdued overlay */}
        <div className="absolute inset-0 bg-white/70" />

        {/* Hero content - inline */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                How It Works
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Getting started with ValorWell is simple. Here's what to expect from intake to ongoing care.
              </p>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-8 md:py-12 relative z-10">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer two types of support designed for the military community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.map((service) => (
                <Card key={service.title}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <div className="relative z-10">
          <StepsSection
            title="The Process"
            subtitle="From first click to first session, here's what happens."
            steps={steps}
            className="py-8 md:py-12"
          />
        </div>
      </div>

      {/* CTA - outside the flag background */}
      <CTABlock
        title="Ready to Get Started?"
        subtitle="Take the first step today. We'll guide you through the rest."
      />
    </Layout>
  );
};

export default HowItWorks;
