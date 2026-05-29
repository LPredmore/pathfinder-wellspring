import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Brain,
  Moon,
  Headphones,
  Wand2,
  Sparkles,
  Target,
  ShieldAlert,
  Copy,
  Check,
  Handshake,
  Heart,
  Flame,
  LineChart,
} from "lucide-react";
import { toast } from "sonner";
import { trackAppOutboundClick } from "@/lib/tracking";

const pendulioUrl = "https://pendulo-hypno.com/";
const PROMO_CODE = "VALORWELL";

const benefits = [
  {
    icon: Brain,
    title: "Speaks the language your subconscious actually listens to",
    body:
      "Talking gets you insight. Hypnosis is what helps that insight finally land — at the level where habits, fears, and reactions actually live.",
  },
  {
    icon: Moon,
    title: "Quiet for the loudest part of your mind",
    body:
      "For the 2 a.m. loop. The replay of the argument. The dread before the alarm. Pendulo gives that part of you somewhere to land.",
  },
  {
    icon: Headphones,
    title: "Practice on your own time",
    body:
      "10–30 minute sessions, headphones, anywhere. The work doesn't stop when the session ends — and neither should the tools.",
  },
  {
    icon: Target,
    title: "Built for the goals therapy uncovers",
    body:
      "Sleep, focus, cravings, anxious patterns, confidence, motivation. Pendulo turns the goals you name in session into nightly practice.",
  },
];

const steps = [
  { icon: Wand2, title: "Tell it your goal", body: "A short conversation about what you actually want to change." },
  { icon: Sparkles, title: "AI hypnotist writes your script", body: "Trained on Ericksonian technique, tailored to you — not stitched from a stock library." },
  { icon: Headphones, title: "Listen 10–30 minutes", body: "Daytime focus sessions or nighttime sleep sessions, with headphones." },
  { icon: LineChart, title: "Track the shift", body: "Notice change in weeks, not months. Adjust your routine as your goals evolve." },
];

const goodFits = [
  "Sleep",
  "Focus",
  "Cravings",
  "Performance anxiety",
  "Stuck thought loops",
  "Public speaking",
  "Motivation",
  "Habit change",
  "Calming the inner critic",
  "Confidence",
];

const faqs = [
  {
    q: "Is Pendulo part of ValorWell?",
    a: "No. Pendulo is an independent company. ValorWell partnered with them because clients kept asking for a quality tool to use between therapy sessions. ValorWell does not own, operate, or clinically supervise Pendulo.",
  },
  {
    q: "How do I get the discount?",
    a: "When you subscribe on Pendulo's site, enter the code VALORWELL at checkout. You'll get 50% off your first year — that's half price for a full 12 months, on top of their 7-day free trial.",
  },
  {
    q: "Is Pendulo therapy?",
    a: "No. Pendulo is a wellness tool. It doesn't diagnose, treat, or replace clinical care. If you're a ValorWell client, keep your therapy — Pendulo is designed to live alongside it, not replace it.",
  },
  {
    q: "What if I'm already in therapy with ValorWell?",
    a: "Perfect. That's exactly who this partnership is for. The work you do in session is the real engine of change — Pendulo is for the in-between, when you want something to practice with on your own.",
  },
  {
    q: "Who do I contact for billing or account support?",
    a: "Pendulo directly. ValorWell can't manage your Pendulo account, change your subscription, or process refunds. Their support lives on pendulo-hypno.com.",
  },
  {
    q: "Is my Pendulo data shared with ValorWell?",
    a: "No. Pendulo handles all account and audio data on their own systems, governed by their own privacy policy. ValorWell never receives your Pendulo sessions or account information.",
  },
];

function CodeChip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      toast.success("Code copied", { description: "VALORWELL is on your clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy", { description: "Use the code VALORWELL at checkout." });
    }
  };

  const isDark = tone === "dark";
  return (
    <button
      type="button"
      onClick={onCopy}
      className={
        isDark
          ? "inline-flex items-center gap-3 rounded-full border border-indigo-200/30 bg-white/10 backdrop-blur px-5 py-2.5 font-mono text-base font-semibold tracking-[0.2em] text-indigo-50 hover:bg-white/15 transition"
          : "inline-flex items-center gap-3 rounded-full border border-indigo-200 bg-white px-5 py-2.5 font-mono text-base font-semibold tracking-[0.2em] text-indigo-900 hover:bg-indigo-50 transition shadow-sm"
      }
      aria-label="Copy promo code VALORWELL"
    >
      <span>{PROMO_CODE}</span>
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4 opacity-70" aria-hidden />}
    </button>
  );
}

export default function Pendulo() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { send_to: "AW-11339741081", transport_type: "beacon" });
    }
  }, []);

  return (
    <Layout>
      <SEO
        title="Pendulo — AI Hypnosis for Real Change | Partner Offer for ValorWell Clients"
        description="Pendulo is a personalized AI hypnosis app. ValorWell clients get 50% off the first year with code VALORWELL."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-10 md:py-16 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 text-indigo-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-indigo-500/20 blur-3xl" aria-hidden />
        <Sparkles className="absolute top-16 right-1/4 h-5 w-5 text-violet-200/60" aria-hidden />
        <Moon className="absolute bottom-24 left-1/3 h-5 w-5 text-indigo-200/60" aria-hidden />

        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-400/90 hover:bg-amber-400 text-indigo-950 font-semibold">
              <Handshake className="h-3.5 w-3.5 mr-1.5" /> Partner offer for ValorWell clients
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Rewire the part of you that talks back.
            </h1>
            <p className="text-lg md:text-xl text-indigo-100/85 leading-relaxed max-w-2xl mx-auto">
              Pendulo is a personalized AI hypnosis app — built by an independent team and now opening an exclusive door for the ValorWell community.
            </p>

            <div className="pt-2 flex flex-col items-center gap-3">
              <CodeChip tone="dark" />
              <p className="text-sm text-indigo-100/80">
                <span className="font-semibold text-amber-300">50% off your first year</span> when you subscribe with this code.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button
                size="lg"
                className="bg-amber-400 hover:bg-amber-300 text-indigo-950 font-semibold"
                onClick={() => trackAppOutboundClick(pendulioUrl)}
              >
                Try Pendulo (50% off)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-indigo-200/40 text-indigo-50 hover:bg-indigo-50/10 hover:text-indigo-50"
              >
                <a href="#how-it-works">How it works</a>
              </Button>
            </div>
            <p className="text-xs text-indigo-100/65 pt-1">
              7-day free trial. Cancel any time. Code applied at checkout on pendulo-hypno.com.
            </p>
          </div>
        </div>
      </section>

      {/* Partner disclosure */}
      <section className="py-6">
        <div className="container-wide max-w-3xl">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 md:p-6 flex gap-4">
            <Handshake className="h-6 w-6 text-indigo-700 shrink-0 mt-1" aria-hidden />
            <p className="text-sm md:text-base text-indigo-950/85 leading-relaxed">
              <span className="font-semibold">Pendulo is an independent company.</span> ValorWell does not own, operate, or clinically supervise Pendulo. We're sharing this because clients kept asking for a quality tool to complement the work they're already doing in therapy — and Pendulo agreed to open up a serious discount for our community.
            </p>
          </div>
        </div>
      </section>

      {/* Why hypnosis */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <p className="text-sm uppercase tracking-widest text-indigo-700 font-semibold">Why hypnosis</p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950">
              Therapy is where the real work happens. Hypnosis is what you bring home with you.
            </h2>
            <p className="text-base text-indigo-950/70 leading-relaxed">
              Insight in session is powerful. Practice between sessions is what makes it stick. Hypnosis is one of the most underrated tools you can layer on top of the work you're already doing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white border border-indigo-100 p-6 shadow-sm space-y-3">
                <div className="h-11 w-11 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center">
                  <b.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-semibold text-indigo-950">{b.title}</h3>
                <p className="text-sm text-indigo-950/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-indigo-950/60 italic max-w-2xl mx-auto">
            Pendulo's sessions are grounded in 70+ years of clinical hypnosis research and built on Ericksonian foundations.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-8 md:py-14 bg-gradient-to-b from-indigo-50/70 to-transparent">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-indigo-700 font-semibold">How Pendulo works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950">Personalized sessions, written for you.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl bg-white border border-indigo-100 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">{i + 1}</div>
                  <step.icon className="h-5 w-5 text-indigo-700" aria-hidden />
                </div>
                <h3 className="font-semibold text-indigo-950">{step.title}</h3>
                <p className="text-sm text-indigo-950/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The offer */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-indigo-50 p-8 md:p-12 shadow-xl">
            <div className="text-center space-y-5">
              <Badge className="bg-amber-400/90 hover:bg-amber-400 text-indigo-950 font-semibold">
                <Flame className="h-3.5 w-3.5 mr-1.5" /> Exclusive for ValorWell clients
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-amber-300">50% off</span> your first year of Pendulo
              </h2>
              <p className="text-base md:text-lg text-indigo-100/85 max-w-xl mx-auto">
                Subscribe on Pendulo's site and apply the code below at checkout. That's half price for a full 12 months — on top of their 7-day free trial.
              </p>
              <div className="pt-2 flex justify-center">
                <CodeChip tone="dark" />
              </div>
              <ul className="text-sm text-indigo-100/85 space-y-1.5 pt-2">
                <li>✓ 7-day free trial</li>
                <li>✓ Cancel any time</li>
                <li>✓ Code applied at checkout on pendulo-hypno.com</li>
                <li>✓ Billed directly by Pendulo (not ValorWell)</li>
              </ul>
              <div className="pt-3">
                <Button
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-300 text-indigo-950 font-semibold"
                  onClick={() => trackAppOutboundClick(pendulioUrl)}
                >
                  Claim your 50% off
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Good fits */}
      <section className="py-8 md:py-12 bg-indigo-50/50">
        <div className="container-wide max-w-4xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-950">Good fits for Pendulo</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {goodFits.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white border border-indigo-200 text-indigo-900 px-4 py-2 text-sm font-medium hover:bg-indigo-100"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Not a replacement */}
      <section className="py-8">
        <div className="container-wide max-w-3xl">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 md:p-8 flex gap-4">
            <ShieldAlert className="h-6 w-6 text-amber-700 shrink-0 mt-1" aria-hidden />
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-950">Pendulo is not therapy</h3>
              <p className="text-sm md:text-base text-amber-900/85 leading-relaxed">
                Pendulo is a wellness tool — it doesn't diagnose, treat, or replace clinical care. If you're a ValorWell client, keep your sessions. Pendulo is for the in-between. If you or someone you know is in crisis, contact emergency services or a qualified crisis resource.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm uppercase tracking-widest text-indigo-700 font-semibold">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950">Common questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-indigo-100">
                <AccordionTrigger className="text-left text-indigo-950 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-indigo-950/75 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 text-indigo-50">
        <div className="container-wide max-w-3xl text-center space-y-6">
          <Heart className="h-7 w-7 text-amber-300 mx-auto" aria-hidden />
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Bring something powerful home from your next session.
          </h2>
          <p className="text-indigo-100/85 max-w-xl mx-auto">
            Half price for a full year. Cancel any time. The code is yours.
          </p>
          <div className="pt-2 flex justify-center">
            <CodeChip tone="dark" />
          </div>
          <div className="pt-2">
            <Button
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-indigo-950 font-semibold"
              onClick={() => trackAppOutboundClick(pendulioUrl)}
            >
              Try Pendulo with VALORWELL
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
