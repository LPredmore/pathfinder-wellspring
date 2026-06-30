import { Layout } from "@/components/layout";
import { SEO, OrganizationSchema, MedicalOrganizationSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Compass,
  HeartHandshake,
  PlayCircle,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";

const systemCards = [
  {
    icon: Compass,
    title: "VA-system navigation",
    body: "Clearer next steps for families trying to understand care access, Community Care, CHAMPVA, and system delays.",
  },
  {
    icon: ShieldCheck,
    title: "Bridge support",
    body: "Support pathways for veterans and families who should not be left alone while the larger system catches up.",
  },
  {
    icon: ClipboardCheck,
    title: "Ethical documentation awareness",
    body: "Education and clinical support that respects real care relationships, accurate records, and professional judgment.",
  },
  {
    icon: Wrench,
    title: "Practical family tools",
    body: "BestSelfs tools and resources that help families build skills outside formal systems.",
  },
  {
    icon: BookOpen,
    title: "Public education",
    body: "Resources, videos, and conversations that explain the ecosystem people are forced to navigate.",
  },
  {
    icon: HeartHandshake,
    title: "Funded action",
    body: "Beyond the Yellow turns support into therapy hours, sponsorships, partnerships, and practical help.",
  },
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Changing the Support Ecosystem for Veterans and Families"
        description="ValorWell is building a better pathway for veterans and families navigating VA systems, care access, documentation challenges, support gaps, and practical family needs."
        canonical="/"
      />
      <OrganizationSchema />
      <MedicalOrganizationSchema />

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
                  Veterans and families need a better path through the systems meant to support them.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  ValorWell is building better systems for veterans and families navigating VA access, care delays, documentation challenges, family support needs, and the gaps where predatory alternatives too often step in.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                    <Link to="/get-care">Get Support</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                    <Link to="/beyondtheyellow">Go Beyond the Yellow</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            The problem is bigger than one appointment.
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>Veterans and families are often left waiting, repeating their story, navigating confusing systems, paying out of pocket, or turning to expensive services because they do not know where else to go.</p>
            <p>ValorWell exists to build a better path through that ecosystem: care access, VA navigation, documentation awareness, family tools, public education, and mission-backed funding.</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 section-alt">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              What ValorWell is building.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              This is not just a clinic. It is a mission to change how veterans and families move through the systems that shape their care, support, documentation, and options.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {systemCards.map((b) => (
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
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-navy/10 hover:border-navy/30 transition-colors">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">Need support?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Start here if you are a veteran, family member, or caregiver trying to understand care options, mental health support, documentation, or next steps.
                </p>
                <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                  <Link to="/get-care">Get Support <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-navy/10 hover:border-navy/30 transition-colors">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">Want to help?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Beyond the Yellow is the action campaign for supporters, sponsors, creators, and funders who want to put real backing behind veterans and families.
                </p>
                <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <Link to="/beyondtheyellow">Go Beyond the Yellow <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">The ValorWell model.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We are entering a new phase focused on clearer pathways, funded action, public education, family tools, and measurable support as the model grows.
          </p>
          <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white">
            <Link to="/our-model">Explore Our Model</Link>
          </Button>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Tools that help fund the mission.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            BestSelfs builds practical family tools and apps. Revenue from BestSelfs products helps support the ValorWell mission while giving families resources they can use outside formal systems.
          </p>
          <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
            <Link to="/bestselfs">Explore BestSelfs</Link>
          </Button>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Education helps people find the path sooner.</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Our videos, podcast conversations, and resources explain the systems veterans and families are forced to navigate — and help supporters understand what real action looks like.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                  <Link to="/media/youtube-podcast"><PlayCircle className="mr-2 h-5 w-5" /> Watch Videos</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                  <Link to="/resources">Explore Resources</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8">
              <h3 className="text-2xl font-bold mb-3">Beyond the Yellow</h3>
              <p className="text-white/85 leading-relaxed mb-5">
                We do not stop at awareness. Beyond the Yellow is how the mission turns words into funded therapy hours, sponsorships, partnerships, and real support.
              </p>
              <Link to="/beyondtheyellow" className="font-semibold underline underline-offset-4 hover:text-gold-accent">
                See the campaign →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
