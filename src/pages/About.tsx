import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, ShieldCheck, FileText, Wrench, BookOpen, HeartHandshake } from "lucide-react";

const differentiators = [
  { title: "Mission-driven care access", body: "Built around removing the access barriers veterans and families actually face.", icon: Target },
  { title: "Veteran and family focus", body: "Care, tools, and resources designed for military-connected lives.", icon: ShieldCheck },
  { title: "Documentation handled ethically", body: "Documentation comes from real treatment, not transactions.", icon: FileText },
  { title: "BestSelfs tools supporting the mission", body: "Practical apps that help families grow and help fund care.", icon: Wrench },
  { title: "Media & education", body: "Better systems for harder conversations — open to the public.", icon: BookOpen },
  { title: "Supporter-funded care model", body: "A system that scales because supporters help build it.", icon: HeartHandshake },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About ValorWell — Building a Better Support System for Veterans and Families"
        description="Learn why ValorWell exists and how we are building a better path for veterans and families seeking care, documentation, and support."
        canonical="/about"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            ValorWell exists because veterans and families deserve a better path.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            ValorWell is the mission. BestSelfs helps power it. Together, they are part of an effort to build infrastructure around the people who are too often left navigating the system alone.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-navy mb-6">Why this exists</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>Veterans and families face long waits for mental health care.</p>
            <p>Care access is fragmented across the VA, community care, CHAMPVA, and the private system — and figuring out which path to take is its own full-time job.</p>
            <p>Documentation is often hard to get ethically and affordably, especially when it is part of navigating the disability system.</p>
            <p>Predatory systems fill the gap, charging veterans far too much because they feel like there is no other option.</p>
            <p>ValorWell is building an alternative — one that combines care, tools, education, and supporter-funded access into a single, mission-driven system.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy mb-8">What makes ValorWell different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((d) => (
              <Card key={d.title}>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <d.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground">{d.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Help us build it.</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/get-care">Get Care</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link to="/fund-access-to-care">Support the Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
