import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  Heart,
  BarChart3,
  Languages,
  Accessibility,
  Sparkles,
  Star,
  Monitor,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import vibetalesLogo from "@/assets/vibetales-logo.png";

export default function VibeTales() {
  useEffect(() => {
    // Fire Google Ads page_view beacon (no redirect)
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        send_to: "AW-11339741081",
        transport_type: "beacon",
      });
    }
  }, []);

  return (
    <Layout>
      <SEO
        title="VibeTales — AI Reading Stories & Assessment | ValorWell"
        description="AI-powered reading stories and clinical-grade assessment for every child. Created by a veteran father for his dyslexic daughter. 50% of revenue funds veteran mental health care."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270,60%,96%)] via-[hsl(280,50%,94%)] to-[hsl(210,60%,95%)] dark:from-[hsl(270,30%,12%)] dark:via-[hsl(280,25%,10%)] dark:to-[hsl(210,30%,10%)]" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <img
              src={vibetalesLogo}
              alt="VibeTales logo"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-2xl shadow-lg"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Every Child Deserves Stories That{" "}
              <span className="bg-gradient-to-r from-[hsl(270,65%,55%)] to-[hsl(330,70%,55%)] bg-clip-text text-transparent">
                Meet Them Where They Are
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered reading stories and clinical-grade assessment — built by
              a veteran father for his dyslexic daughter, because the tools they
              needed didn't exist.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[hsl(270,65%,55%)] hover:bg-[hsl(270,65%,48%)] text-white">
                <a href="https://vibetales.bestselfs.com/" target="_blank" rel="noopener noreferrer">
                  <Monitor className="mr-2 h-5 w-5" />
                  Try on Web
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://apps.apple.com/us/app/vibetales/id6751900169" target="_blank" rel="noopener noreferrer">
                  <Smartphone className="mr-2 h-5 w-5" />
                  iOS App
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://play.google.com/store/apps/details?id=com.VibeTales" target="_blank" rel="noopener noreferrer">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Android App
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <Heart className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--patriot-red))]" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Born From a Father's Promise
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When a veteran father watched his dyslexic daughter struggle with
              flashcards and outgrow every book on the shelf, he didn't wait for
              someone else to fix it. He built VibeTales — an app that generates
              fresh, personalized stories calibrated to each child's exact reading
              level, weaving their sight words into adventures they actually want
              to read.
            </p>
            <div className="mt-8 p-6 rounded-xl bg-[hsl(var(--patriot-red))] text-white">
              <p className="text-lg font-semibold">
                50% of all VibeTales revenue goes directly toward paying for
                mental health treatment for veterans through ValorWell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              More Than Stories — A Clinical Reading Tool
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by educators, special education instructors, and tutors for
              data-driven reading assessment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card
                key={f.title}
                className="animate-fade-in border-none shadow-md hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CardContent className="pt-6">
                  <f.icon className="h-8 w-8 mb-3 text-[hsl(270,65%,55%)]" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ReadRise Scoring */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <div className="text-center mb-10 animate-fade-in">
            <BarChart3 className="h-10 w-10 mx-auto mb-4 text-[hsl(270,65%,55%)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              ReadRise™ Scoring System
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              A proprietary 0–1,000 scale that maps directly to Lexile, NWEA MAP
              RIT, Fountas & Pinnell, and Flesch-Kincaid — so educators speak the
              same language.
            </p>
          </div>
          <div className="grid sm:grid-cols-5 gap-4">
            {scoreComponents.map((c) => (
              <div
                key={c.name}
                className="rounded-lg bg-card p-4 text-center shadow-sm"
              >
                <p className="text-2xl font-bold text-[hsl(270,65%,55%)]">
                  {c.weight}
                </p>
                <p className="font-semibold text-foreground text-sm mt-1">
                  {c.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-10 animate-fade-in">
            <Accessibility className="h-10 w-10 mx-auto mb-4 text-[hsl(270,65%,55%)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Built for Every Learner
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Purpose-built for special education, dyslexia, and neurodiverse
              learners — not bolted on as an afterthought.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {accessibilityFeatures.map((a) => (
              <div
                key={a.label}
                className="rounded-lg bg-card p-5 text-center shadow-sm"
              >
                <p className="font-semibold text-foreground">{a.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[hsl(270,65%,55%)] to-[hsl(330,70%,55%)]">
        <div className="container-narrow text-center text-white">
          <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Creating Stories Today
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
            Free to start. No installation required. Every story you read helps a
            veteran get the mental health care they deserve.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-[hsl(270,65%,45%)] hover:bg-white/90 font-semibold"
            >
              <a href="https://vibetales.bestselfs.com/" target="_blank" rel="noopener noreferrer">
                Get Started Free
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ── static data ── */

const features = [
  {
    icon: BookOpen,
    title: "AI Story Generation",
    desc: "K–Teen reading levels, 15+ genres, 15 languages, sight word integration, Dr. Seuss mode, and custom life-lesson embedding.",
  },
  {
    icon: Brain,
    title: "Clinical Reading Assessment",
    desc: "Two-phase oral fluency analysis: real-time WPM/WCPM/accuracy plus AI-powered hesitation detection, self-correction tracking, and error categorization.",
  },
  {
    icon: BarChart3,
    title: "ReadRise™ Scoring (0–1,000)",
    desc: "Five-component weighted composite mapped to Lexile, NWEA MAP, Fountas & Pinnell, and Flesch-Kincaid for IEP-ready data.",
  },
  {
    icon: Star,
    title: "Comprehension Quizzes",
    desc: "AI-generated, level-appropriate quizzes after every story — integrated directly into the ReadRise score.",
  },
  {
    icon: Languages,
    title: "15 Languages",
    desc: "Supporting ELL students and bilingual programs with stories in Spanish, French, Arabic, Mandarin, and more.",
  },
  {
    icon: Sparkles,
    title: "Educator Dashboard",
    desc: "Link students, track progress with professional metrics, manage sight word lists, and sponsor premium access for your class.",
  },
];

const scoreComponents = [
  { name: "Pace", weight: "30%", desc: "WCPM vs. grade norms" },
  { name: "Precision", weight: "25%", desc: "Accuracy 80–100%" },
  { name: "Meaning", weight: "25%", desc: "Comprehension quiz" },
  { name: "Smoothness", weight: "15%", desc: "Hesitation frequency" },
  { name: "Recovery", weight: "5%", desc: "Self-correction ratio" },
];

const accessibilityFeatures = [
  { label: "OpenDyslexic Font", detail: "Weighted letter bottoms reduce swapping" },
  { label: "Adjustable Spacing", detail: "Increased letter & word spacing" },
  { label: "8 Background Tints", detail: "Cream, blue, yellow, peach & more" },
  { label: "15 Languages", detail: "Multilingual story generation" },
];
