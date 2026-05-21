import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ListChecks,
  Timer,
  PiggyBank,
  Compass,
  Globe,
  Apple,
  Smartphone,
  Quote,
} from "lucide-react";
import ninjadoLogo from "@/assets/ninjado-logo.png";
import { trackAppOutboundClick } from "@/lib/tracking";

const webUrl = "https://ninjado.bestselfs.com";
const iosUrl = "https://apps.apple.com/us/app/ninja-do/id6754611445";
const androidUrl = "https://play.google.com/store/apps/details?id=com.bestselfs.ninjado.twa";

const steps = [
  {
    icon: ListChecks,
    title: "Build a routine",
    body: "Create morning, bedtime, homework, or custom routines with simple task steps.",
  },
  {
    icon: Timer,
    title: "Set the time window",
    body: "Give each task a realistic time frame so kids can see what time ownership looks like.",
  },
  {
    icon: PiggyBank,
    title: "Bank saved time",
    body: "When a task is finished early, the saved time becomes a reward signal: productive choices create freedom.",
  },
  {
    icon: Compass,
    title: "Coach the pattern",
    body: "If a task takes longer, Ninja-Do shows where improvement is possible without shame or lectures.",
  },
];

const bestFor = [
  "Morning routines",
  "Bedtime routines",
  "ADHD-friendly structure",
  "Kids who need visual cues",
  "Parents tired of nagging",
  "Building independence",
  "Homeschool or classroom routines",
];

export default function NinjaDo() {
  useEffect(() => {
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
        title="Ninja-Do — Help Kids Master Time & Routines | ValorWell"
        description="Turn daily routines into time mastery with visual tasks, banked time, rewards, and parent-friendly coaching. 100% of revenue funds veteran mental health care through ValorWell."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-8 md:py-14 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl" aria-hidden />
        <div className="container-wide relative">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <Badge className="bg-amber-900 text-amber-50 hover:bg-amber-900/90">Ninja-Do</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-950 leading-[1.05]">
                Turn routine battles into time mastery.
              </h1>
              <p className="text-lg md:text-xl text-amber-900/80 leading-relaxed max-w-2xl">
                Ninja-Do helps kids move through daily tasks with visual structure, time awareness, and rewards — so parents can stop chasing and start coaching.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-amber-900 hover:bg-amber-800 text-amber-50"
                  onClick={() => trackAppOutboundClick(webUrl)}
                >
                  Start Using Ninja-Do
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-amber-900/30 text-amber-900 hover:bg-amber-100"
                >
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto">
              <div className="relative rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 p-8 shadow-2xl shadow-amber-900/10">
                <div className="relative w-56 h-56 mx-auto">
                  <svg className="absolute inset-0" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="92" fill="none" stroke="hsl(38 60% 88%)" strokeWidth="10" />
                    <circle
                      cx="100"
                      cy="100"
                      r="92"
                      fill="none"
                      stroke="hsl(28 80% 50%)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="578"
                      strokeDashoffset="145"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="absolute inset-6 rounded-full bg-white shadow-inner flex items-center justify-center overflow-hidden">
                    <img src={ninjadoLogo} alt="Ninja-Do app icon" className="w-32 h-32" width={128} height={128} />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm font-medium text-amber-900">
                  <span>Morning routine</span>
                  <span className="tabular-nums">75% · 4 min saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ValorWell mission strip */}
      <section className="bg-[hsl(var(--patriot-red))] text-white">
        <div className="container-wide py-5">
          <p className="text-center text-base md:text-lg font-semibold">
            100% of all Ninja-Do revenue funds mental health treatment for veterans through ValorWell.
          </p>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-8 md:py-14">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-950">
                From repeated reminders to visible progress
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border bg-muted/40 p-8 space-y-3">
                <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Before</p>
                <p className="text-xl leading-relaxed text-foreground/80 italic">
                  "Brush your teeth. Get dressed. Pack your bag. Hurry up. We're late again."
                </p>
              </div>
              <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-8 space-y-3 shadow-md">
                <p className="text-xs uppercase tracking-widest font-semibold text-amber-700">After</p>
                <p className="text-xl leading-relaxed text-amber-950">
                  Your child sees the routine, completes each step, banks saved time, and learns that responsibility creates freedom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-8 md:py-14 bg-amber-100/50">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-950">How Ninja-Do works</h2>
              <p className="text-lg text-amber-900/70 max-w-2xl mx-auto">
                Four simple moves that turn daily friction into a child-owned skill.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map(({ icon: Icon, title, body }, i) => (
                <div
                  key={title}
                  className="relative rounded-2xl bg-white border border-amber-200/70 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-900 text-amber-50 font-bold flex items-center justify-center ring-4 ring-amber-200">
                      {i + 1}
                    </div>
                    <Icon className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="font-bold text-lg text-amber-950 mb-2">{title}</h3>
                  <p className="text-sm text-amber-900/75 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="py-8 md:py-12">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950">Best for</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {bestFor.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="px-4 py-2 text-sm bg-amber-50 border-amber-300 text-amber-900 rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-8 md:py-14 bg-amber-100/50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950">Why it works</h2>
            <p className="text-lg md:text-xl text-amber-900/80 leading-relaxed">
              Ninja-Do does not rely on pressure. It makes time visible. Kids can see the task, the window, the result, and the reward. That turns routines from a parent-controlled argument into a child-owned skill.
            </p>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="py-8 md:py-14">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 p-10 md:p-12 shadow-md">
              <Quote className="absolute -top-5 -left-2 h-12 w-12 text-amber-300" />
              <p className="text-xl md:text-2xl text-amber-950 leading-relaxed italic">
                Built from real-life routine struggles and co-designed with a child who needed routines to feel more concrete, more motivating, and less like constant correction.
              </p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-amber-700">
                — A note from the founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 md:py-14 bg-amber-900 text-amber-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to stop chasing the routine?</h2>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-amber-50 text-amber-950 hover:bg-white"
                onClick={() => trackAppOutboundClick(webUrl)}
              >
                Open Ninja-Do
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm uppercase tracking-widest text-amber-200/80 font-semibold">Available on</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-amber-50/40 text-amber-50 hover:bg-amber-50/10 hover:text-amber-50"
                  onClick={() => trackAppOutboundClick(webUrl)}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Web App
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-amber-50/40 text-amber-50 hover:bg-amber-50/10 hover:text-amber-50"
                  onClick={() => trackAppOutboundClick(iosUrl)}
                >
                  <Apple className="mr-2 h-5 w-5" />
                  Download on the App Store
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-amber-50/40 text-amber-50 hover:bg-amber-50/10 hover:text-amber-50"
                  onClick={() => trackAppOutboundClick(androidUrl)}
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Get it on Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
