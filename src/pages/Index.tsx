import { Layout } from "@/components/layout";
import { SEO, OrganizationSchema, MedicalOrganizationSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  ClipboardCheck,
  ShieldCheck,
  Wrench,
  BookOpen,
  HeartHandshake,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";

const MISSION_TAGLINE =
  "ValorWell is the mission. BestSelfs helps power it.";

const buildingBlocks = [
  {
    icon: Stethoscope,
    title: "Mental health care",
    body: "Therapy for veterans, military families, and caregivers.",
  },
  {
    icon: ShieldCheck,
    title: "VA Community Care & CHAMPVA support",
    body: "Help navigating the access barriers that keep people from getting in.",
  },
  {
    icon: ClipboardCheck,
    title: "Ethical clinical documentation",
    body: "Appropriate documentation when it is based on a real clinical relationship.",
  },
  {
    icon: Wrench,
    title: "Practical tools",
    body: "Emotional skills, parenting, communication, and family systems.",
  },
  {
    icon: BookOpen,
    title: "Education that helps people think clearly",
    body: "Better systems for harder conversations, instead of reactive noise.",
  },
  {
    icon: HeartHandshake,
    title: "Funding pathways for access to care",
    body: "Supporter-funded sessions that expand who can be seen.",
  },
];

const supporterBullets = [
  "Fund access to care",
  "Subscribe to BestSelfs tools",
  "Become a monthly supporter",
  "Subscribe to our YouTube channel",
  "Share the mission",
  "Partner with ValorWell",
  "Help us reach veterans and families who need support",
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Mental Health Care, Documentation & Support for Veterans and Families"
        description="ValorWell is building a better support system so veterans and their families can access mental health care, clinical documentation, and practical tools without waiting months or relying on predatory systems."
        canonical="/"
      />
      <OrganizationSchema />
      <MedicalOrganizationSchema />

      {/* Section 1: Hero */}
      <section className="relative">
        <div className="flex justify-center bg-background">
          <div
            className="w-full max-w-[1280px] bg-cover bg-center bg-no-repeat relative min-h-[72vh]"
            style={{ backgroundImage: `url(${heroFamily})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-transparent" />
            <div className="relative z-10 px-6 md:px-12 py-14 md:py-20 flex items-center min-h-[72vh]">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-4">
                  The ValorWell Mission
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-[1.1] mb-6">
                  Veterans and families deserve better than waiting months for help.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  ValorWell is building a better support system so veterans and their families can get mental health care, accurate clinical documentation, and practical tools — without waiting months, going untreated, or relying on predatory systems.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                    <Link to="/get-care">Get Care</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                    <Link to="/fund-access-to-care">Fund Access to Care</Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-muted-foreground italic">
                  {MISSION_TAGLINE}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Broken System */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            The system is too slow, too fragmented, and too hard to navigate.
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Veterans and military families often face long waits, limited provider access, confusing insurance barriers, and a lack of practical guidance when they need help.
            </p>
            <p>
              Some need therapy. Some need family support. Some need documentation from a mental health professional to help them navigate the disability system. Many need all of it.
            </p>
            <p>
              But instead of finding a clear path, they are often left to wait, search, repeat their story, pay out of pocket, or turn to organizations that charge far too much because veterans feel like they have no other option.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: What ValorWell Is Building */}
      <section className="py-14 md:py-20 section-alt">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              ValorWell is building a better path.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {buildingBlocks.map((b) => (
              <Card key={b.title} className="border-border/60">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-10 text-lg text-muted-foreground italic max-w-3xl">
            This is not just a clinic. It is an effort to build infrastructure around the people who are too often left navigating the system alone.
          </p>
        </div>
      </section>

      {/* Section 4: Two Main Paths */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-navy/10 hover:border-navy/30 transition-colors">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">Need Care?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Start here if you are a veteran, family member, or caregiver looking for mental health support or practical guidance.
                </p>
                <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                  <Link to="/get-care">Get Care <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-navy/10 hover:border-navy/30 transition-colors">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">Want to Help?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Support the mission by helping fund access to care, tools, education, and practical support for veterans and families.
                </p>
                <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <Link to="/fund-access-to-care">Fund Access to Care <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: BestSelfs */}
      <section className="py-14 md:py-20 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            BestSelfs helps power the mission.
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
            <p>
              BestSelfs creates practical tools that help individuals and families build emotional skills, better communication, stronger routines, and healthier systems.
            </p>
            <p>
              Products like CoreFeel, VibeTales, NinjaDo, and future BestSelfs tools are designed to help families grow stronger while also supporting the larger ValorWell mission.
            </p>
          </div>
          <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white">
            <Link to="/bestselfs">Explore BestSelfs</Link>
          </Button>
        </div>
      </section>

      {/* Section 6: Media */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            We teach better systems for harder conversations.
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
            <p>
              ValorWell Media helps people slow down, think clearly, and approach difficult issues with more consistency, empathy, and structure.
            </p>
            <p>
              Through short-form videos, long-form discussions, podcasts, Reddit conversations, and educational content, we explore the thinking patterns that affect families, communities, veterans, and public life.
            </p>
            <p>
              The goal is not to tell people what to think. The goal is to help people build better systems for how they think, communicate, and respond.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
            <Link to="/videos">
              <PlayCircle className="mr-2 h-5 w-5" /> Watch the Mission
            </Link>
          </Button>
        </div>
      </section>

      {/* Section 7: Supporter */}
      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Support is not just a donation. It is how this gets built.
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Every supporter helps us move closer to a system where veterans and families can access care, documentation, tools, and guidance before they are left waiting too long or pushed toward predatory alternatives.
              </p>
              <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                <Link to="/fund-access-to-care">Help Fund Access to Care</Link>
              </Button>
            </div>
            <ul className="space-y-3">
              {supporterBullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="text-gold-accent mt-1">★</span>
                  <span className="text-white/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: Impact Preview */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              Built around real care and measurable impact.
            </h2>
            <p className="text-muted-foreground">
              Public impact dashboard in development. Below is what we are tracking and reporting on as the mission scales.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "$75", label: "Direct therapist cost per session" },
              { stat: "Tracking", label: "Sessions delivered" },
              { stat: "Tracking", label: "Veterans & families served" },
              { stat: "Tracking", label: "Supporter-funded care" },
            ].map((m) => (
              <Card key={m.label} className="border-border/60">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-navy mb-1">{m.stat}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/impact" className="text-sm font-medium text-navy underline underline-offset-4 hover:text-patriot-red">
              See the full impact page →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="py-14 md:py-20 section-alt">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 max-w-3xl mx-auto">
            Help us build the support system veterans and families should have had all along.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/get-care">Get Care</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/fund-access-to-care">Fund Access to Care</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy hover:bg-navy/5">
              <Link to="/bestselfs">Explore BestSelfs</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
