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
  Atom,
  Zap,
  Anchor,
  Layers,
  Sparkles,
  Wand2,
  Headphones,
  LineChart,
  Target,
  Copy,
  Check,
  Handshake,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { trackAppOutboundClick } from "@/lib/tracking";

const pendulioUrl = "https://pendulo-hypno.com/";
const PROMO_CODE = "VALORWELL";

const bigThree = [
  {
    name: "Psychoanalysis",
    pct: 38,
    sessions: "600 sessions",
    blurb: "The classic talk-on-the-couch approach. Slow, expensive, and modest in measured outcomes.",
    tone: "from-slate-400 to-slate-500",
    text: "text-slate-700",
  },
  {
    name: "Behavior Therapy",
    pct: 72,
    sessions: "22 sessions",
    blurb: "Modern, structured, and evidence-based — a major step up from older talk approaches.",
    tone: "from-indigo-400 to-indigo-600",
    text: "text-indigo-700",
  },
  {
    name: "Hypnosis",
    pct: 93,
    sessions: "6 sessions",
    blurb: "Faster to results. More likely to last. And it works from a pair of headphones.",
    tone: "from-indigo-500 to-violet-600",
    text: "text-violet-700",
    highlight: true,
  },
];

const plainEnglish = [
  {
    icon: Zap,
    title: "Faster",
    body: "On average, hypnosis reaches measurable change in a fraction of the sessions other approaches require.",
  },
  {
    icon: Anchor,
    title: "Deeper",
    body: "Talk works at the level of insight. Hypnosis works where habits, fears, and reactions actually live.",
  },
  {
    icon: Layers,
    title: "Stickier",
    body: "People who complete hypnosis are far less likely to relapse. The change tends to hold without willpower.",
  },
];

const helpsWith = [
  "Anxiety", "Sleep", "Pain", "Quitting smoking", "Weight", "Confidence",
  "Focus", "Phobias", "Stress", "Public speaking", "Bad habits", "Self-talk",
];

const steps = [
  { icon: Wand2, title: "Tell it your goal", body: "A short conversation about what you actually want to change." },
  { icon: Sparkles, title: "AI hypnotist writes your script", body: "Grounded in Ericksonian technique, personalized to you." },
  { icon: Headphones, title: "Listen 10–30 minutes", body: "Daytime focus or nighttime sleep sessions, with headphones." },
  { icon: LineChart, title: "Track the shift", body: "Notice change in weeks, not months. Adjust as your goals evolve." },
];

const myths = [
  {
    q: "Can someone control me under hypnosis?",
    a: "No. You're awake and in charge the whole time. Hypnosis isn't a take-over — it's a tune-in. You can open your eyes or stop the session whenever you want.",
  },
  {
    q: "What if I can't be hypnotized?",
    a: "Almost everyone can. It's a normal state your brain enters every day — zoning out on a long drive, getting lost in a movie. Hypnosis just guides you there on purpose.",
  },
  {
    q: "Is it safe?",
    a: "Yes. There's no drug, no side effects, nothing to recover from. The worst-case outcome is you fall asleep and wake up feeling rested.",
  },
  {
    q: "Why haven't I heard more about this?",
    a: "Hypnosis has quietly outperformed traditional therapy in outcome studies for decades. There's just no large industry funding ads for a tool that doesn't require a prescription.",
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
        title="Pendulo — AI Hypnosis That Works Faster and Lasts Longer"
        description="Personalized AI hypnosis sessions backed by decades of clinical research. Try Pendulo free — ValorWell members get 50% off the first year."
      />

      {/* ValorWell partner banner */}
      <section className="bg-flag-sky/40 border-b border-indigo-100">
        <div className="container-wide max-w-5xl py-4 md:py-5">
          <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-5">
            <div className="flex items-center gap-2 shrink-0">
              <Handshake className="h-4 w-4 text-indigo-700" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-800">
                ValorWell · Proud Partner
              </span>
            </div>
            <p className="text-sm md:text-[0.95rem] text-indigo-950/85 leading-relaxed">
              ValorWell is about bridging the gap between need and availability in mental health care. Pendulo built an incredible solution that brings the proven benefits of hypnosis into your home — the right blend of accessibility and professional quality. We may not be the best fit for everyone, and we'd rather point you toward something that works than block you from a better option. The results of hypnosis are undeniable. See for yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Hero — Pendulo first */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 text-indigo-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-indigo-500/20 blur-3xl" aria-hidden />

        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur">
              <Atom className="h-4 w-4 text-violet-200" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-100">
                Pendulo · AI Hypnosis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Hypnosis isn't a trick. It's the most effective therapy most people have never tried.
            </h1>
            <p className="text-lg md:text-xl text-indigo-100/85 leading-relaxed max-w-2xl mx-auto">
              Pendulo writes personalized hypnosis sessions for your real goals — sleep, focus, anxiety, habits, confidence. Listen anywhere, in 10–30 minutes, from a pair of headphones.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button
                size="lg"
                className="bg-amber-400 hover:bg-amber-300 text-indigo-950 font-semibold"
                onClick={() => trackAppOutboundClick(pendulioUrl)}
              >
                Try Pendulo Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-indigo-200/40 text-indigo-50 hover:bg-indigo-50/10 hover:text-indigo-50"
              >
                <a href="#research">See the research</a>
              </Button>
            </div>
            <p className="text-xs text-indigo-100/65 pt-1">7-day free trial. Cancel any time.</p>
          </div>
        </div>
      </section>

      {/* Big 3 stats */}
      <section id="research" className="py-12 md:py-20">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <p className="text-sm uppercase tracking-widest text-indigo-700 font-semibold">The research</p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950">
              Three approaches. One clear winner.
            </h2>
            <p className="text-base text-indigo-950/70 leading-relaxed">
              Researchers compared the three most-studied therapy approaches across 1,018 outcome studies. Here's what they found.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {bigThree.map((s) => (
              <div
                key={s.name}
                className={
                  s.highlight
                    ? "relative rounded-3xl p-6 md:p-8 border bg-gradient-to-br from-indigo-50 to-violet-50 border-violet-200 shadow-xl"
                    : "relative rounded-3xl p-6 md:p-8 border bg-white border-indigo-100 shadow-sm"
                }
              >
                {s.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold uppercase tracking-wider shadow">
                    The winner
                  </div>
                )}
                <div className="text-center">
                  <div className={`text-6xl md:text-7xl font-extrabold bg-gradient-to-br ${s.tone} bg-clip-text text-transparent mb-1`}>
                    {s.pct}%
                  </div>
                  <div className={`text-sm font-semibold mb-3 ${s.text}`}>recovery rate</div>
                  <div className="h-px w-12 mx-auto bg-indigo-100 my-3" />
                  <div className="text-xs uppercase tracking-widest text-indigo-400 mb-1">{s.name}</div>
                  <div className="text-sm font-semibold text-indigo-900 mb-4">to get there: {s.sessions}</div>
                  <p className="text-sm text-indigo-950/70 leading-relaxed">{s.blurb}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-indigo-950/50 italic text-center mt-6">
            Recovery rates from a peer-reviewed survey of 1,018 psychotherapy outcome studies (Barrios, A.A.).
          </p>
        </div>
      </section>

      {/* Plain English */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-indigo-50/70 to-transparent">
        <div className="container-wide max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-950 mb-10">In plain English</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {plainEnglish.map((p) => (
              <div key={p.title} className="bg-white border border-indigo-100 rounded-3xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-md">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-indigo-950 mb-2">{p.title}</h3>
                <p className="text-indigo-950/70 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Helps with */}
      <section className="py-10 md:py-14">
        <div className="container-wide max-w-4xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-950">What hypnosis has been shown to help with</h2>
          <p className="text-indigo-950/60">A small sample of the things hypnosis has real research behind.</p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {helpsWith.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white border border-indigo-200 text-indigo-900 px-4 py-2 text-sm font-medium hover:bg-indigo-50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-transparent to-indigo-50/70">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-indigo-700 font-semibold">How Pendulo works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950">Personalized sessions, written for you.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl bg-white border border-indigo-100 p-6 shadow-sm space-y-3">
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

      {/* Myth-busters FAQ */}
      <section className="py-10 md:py-16">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm uppercase tracking-widest text-indigo-700 font-semibold">But what about…</p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950">Common questions about hypnosis</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {myths.map((m, i) => (
              <AccordionItem key={m.q} value={`item-${i}`} className="border-indigo-100">
                <AccordionTrigger className="text-left text-indigo-950 hover:no-underline">{m.q}</AccordionTrigger>
                <AccordionContent className="text-indigo-950/75 leading-relaxed">{m.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ValorWell partner offer */}
      <section className="py-10 md:py-16 bg-indigo-50/40">
        <div className="container-wide max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-indigo-50 p-8 md:p-12 shadow-xl">
            <div className="text-center space-y-5">
              <Badge className="bg-amber-400/90 hover:bg-amber-400 text-indigo-950 font-semibold">
                <Handshake className="h-3.5 w-3.5 mr-1.5" /> A thank-you from ValorWell
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                <span className="text-amber-300">50% off</span> your first year of Pendulo
              </h2>
              <p className="text-base md:text-lg text-indigo-100/85 max-w-xl mx-auto">
                ValorWell partnered with Pendulo to unlock an exclusive discount for our community. Use this code at checkout on Pendulo's site:
              </p>
              <div className="pt-2 flex justify-center">
                <CodeChip tone="dark" />
              </div>
              <ul className="text-sm text-indigo-100/85 space-y-1.5 pt-2">
                <li>✓ 7-day free trial</li>
                <li>✓ Cancel any time</li>
                <li>✓ Code applied at checkout on pendulo-hypno.com</li>
                <li>✓ Billed directly by Pendulo</li>
              </ul>
              <div className="pt-3">
                <Button
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-300 text-indigo-950 font-semibold"
                  onClick={() => trackAppOutboundClick(pendulioUrl)}
                >
                  Claim 50% off
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sources + disclosure */}
      <section className="py-10 md:py-12">
        <div className="container-wide max-w-3xl text-center text-sm text-indigo-950/60 space-y-5">
          <div>
            <p className="font-semibold text-indigo-950/80 mb-3">Sources</p>
            <div className="flex flex-col gap-2 items-center">
              <a href="https://www.sharondykehypnotherapy.co.uk/blog/hypnotherapy-vs-psychotherapy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
                Hypnotherapy vs Psychotherapy — Sharon Dyke <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://dochypnosis.com/blog/exploring-the-effectiveness-of-hypnotherapy-vs-psychoanalysis-and-behavior-therapy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
                Hypnotherapy vs Psychoanalysis & Behavior Therapy — Doc Hypnosis <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://katesemeniuk.com/hypnotherapy-vs-talk-therapy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
                Hypnotherapy vs Talk Therapy — Kate Semeniuk <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="mt-3 text-xs text-indigo-950/45 max-w-md mx-auto">
              Recovery rates from a peer-reviewed survey of 1,018 psychotherapy outcome studies (Barrios, A.A.).
            </p>
          </div>
          <div className="pt-2 border-t border-indigo-100 max-w-2xl mx-auto">
            <p className="text-xs text-indigo-950/55 leading-relaxed pt-4 flex items-start gap-2 justify-center">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" aria-hidden />
              <span>
                Pendulo is an independent company. ValorWell does not own, operate, or clinically supervise Pendulo. Pendulo is a wellness tool — it does not diagnose, treat, or replace clinical care. If you or someone you know is in crisis, contact emergency services.
              </span>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
