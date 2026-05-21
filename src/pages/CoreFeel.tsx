import { useEffect } from "react";
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
  Calendar,
  MessageCircle,
  Smile,
  Heart,
  Sparkles,
  Eye,
  MessagesSquare,
  BookOpen,
  LineChart,
  ShieldAlert,
  Globe,
} from "lucide-react";
import { trackAppOutboundClick } from "@/lib/tracking";

const webUrl = "https://corefeel.bestselfs.com";

const steps = [
  { icon: Calendar, title: "Start with the event", body: "What happened? A conflict, a mistake, a social moment, a disappointment, a correction, or a stressful situation." },
  { icon: MessageCircle, title: "Notice the worry voice", body: "What did the child's mind say about it? CoreFeel helps identify the thought, fear, or belief that made the moment feel bigger." },
  { icon: Smile, title: "Name the emotion", body: "Kids choose the emotion that fits best, building emotional vocabulary and self-awareness." },
  { icon: Heart, title: "Connect the heart need", body: "CoreFeel helps kids understand what important need may have been touched — safety, trust, esteem, intimacy, or power/control." },
  { icon: Sparkles, title: "Try a healthier response", body: "The goal is not to shame the feeling. The goal is to understand it and practice a next step that works better." },
];

const bestFor = [
  "Worry thoughts", "Emotional awareness", "Tween and teen self-understanding",
  "Parent-child conversations", "Big reactions", "Social stress",
  "Shame and embarrassment", "Frustration tolerance", "Reflection after conflict", "CBT-informed skill practice",
];

const parentBenefits = [
  { icon: Eye, title: "Less guessing", body: "Parents can better understand what may be driving a child's reaction." },
  { icon: MessagesSquare, title: "Better conversations", body: "CoreFeel gives families language for what happened without turning the moment into a lecture." },
  { icon: BookOpen, title: "More emotional vocabulary", body: "Kids learn to identify feelings with more precision than just mad, sad, or fine." },
  { icon: LineChart, title: "More self-awareness over time", body: "Repeated practice helps kids notice patterns in their thoughts, feelings, and needs." },
];

const faqs = [
  { q: "Is CoreFeel therapy?", a: "No. CoreFeel is a practical emotional awareness and reflection tool. It can support conversations and skill practice, but it does not diagnose, treat, or replace professional care." },
  { q: "What ages is CoreFeel for?", a: "CoreFeel is especially useful for tweens and teens, but younger children may benefit when a parent or caregiver uses it with them." },
  { q: "Can parents use it with their child?", a: "Yes. CoreFeel is designed to help families talk through situations with more structure, clarity, and compassion." },
  { q: "What is a worry voice?", a: "A worry voice is the thought, fear, or belief that shows up inside a stressful moment. CoreFeel helps kids notice that thought so they can understand how it affects the emotion." },
];

const heroFlow = [
  { icon: Calendar, label: "Event", tint: "bg-rose-100 text-rose-900" },
  { icon: MessageCircle, label: "Worry voice", tint: "bg-amber-100 text-amber-900" },
  { icon: Smile, label: "Emotion", tint: "bg-orange-100 text-orange-900" },
  { icon: Heart, label: "Heart need", tint: "bg-pink-100 text-pink-900" },
  { icon: Sparkles, label: "Next step", tint: "bg-rose-200 text-rose-950" },
];

export default function CoreFeel() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { send_to: "AW-11339741081", transport_type: "beacon" });
    }
  }, []);

  return (
    <Layout>
      <SEO
        title="CoreFeel — Emotional Awareness App for Kids & Teens | ValorWell"
        description="CoreFeel helps kids and teens understand emotions, worry thoughts, needs, and healthier responses. 100% of revenue funds veteran mental health care through ValorWell."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-8 md:py-14 bg-gradient-to-br from-rose-100 via-orange-50 to-amber-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-200/50 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
        <Heart className="absolute top-16 right-1/4 h-6 w-6 text-rose-300/70" aria-hidden />
        <Sparkles className="absolute bottom-24 left-1/3 h-5 w-5 text-amber-300/70" aria-hidden />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <Badge className="bg-rose-900 text-rose-50 hover:bg-rose-900/90">CoreFeel</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-rose-950 leading-[1.05]">
                Help kids understand the feeling under the reaction.
              </h1>
              <p className="text-lg md:text-xl text-rose-900/80 leading-relaxed max-w-2xl">
                CoreFeel helps kids and teens connect what happened, what they thought, what they felt, what they needed, and what they can try next — so big emotions become easier to understand and talk about.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-rose-900 hover:bg-rose-800 text-rose-50"
                  onClick={() => trackAppOutboundClick(webUrl)}
                >
                  Open CoreFeel
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" asChild className="border-rose-900/30 text-rose-950 hover:bg-rose-100">
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-rose-100 p-6 md:p-8 space-y-3">
                <p className="text-xs uppercase tracking-widest text-rose-900/60 font-semibold">A moment, understood</p>
                {heroFlow.map((step, i) => (
                  <div key={step.label} className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${step.tint}`}>
                    <step.icon className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="font-medium">{step.label}</span>
                    {i < heroFlow.length - 1 && <ArrowRight className="ml-auto h-4 w-4 opacity-60" aria-hidden />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ValorWell mission strip */}
      <section className="bg-[hsl(var(--patriot-red))] text-white">
        <div className="container-wide py-5">
          <p className="text-center text-base md:text-lg font-semibold">
            100% of all CoreFeel revenue funds mental health treatment for veterans through ValorWell.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-950">
            Big feelings are hard to handle when kids do not understand what is underneath them.
          </h2>
          <p className="text-lg text-rose-900/75 leading-relaxed">
            Kids and teens often know they feel bad, overwhelmed, angry, worried, embarrassed, or shut down — but they may not know why. Parents may see the reaction, but not the worry, belief, fear, or unmet need underneath it. CoreFeel helps slow the moment down so families can understand the pattern instead of just reacting to it.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-8 md:py-14 bg-gradient-to-b from-rose-50/60 to-transparent">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-rose-900/60 font-semibold">How CoreFeel works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-rose-950">Five small steps to understand a big moment.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl bg-white border border-rose-100 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold">{i + 1}</div>
                  <step.icon className="h-5 w-5 text-rose-700" aria-hidden />
                </div>
                <h3 className="font-semibold text-rose-950">{step.title}</h3>
                <p className="text-sm text-rose-900/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not just a mood tracker */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-100 p-8 md:p-12 space-y-4 text-center">
            <p className="text-sm uppercase tracking-widest text-amber-900/70 font-semibold">CoreFeel is not just a mood tracker</p>
            <h2 className="text-3xl md:text-4xl font-bold text-rose-950">
              From "I feel bad" to "I understand what happened inside me."
            </h2>
            <p className="text-lg text-rose-900/75 leading-relaxed max-w-2xl mx-auto">
              Mood trackers can show what someone felt. CoreFeel goes deeper by helping kids connect the situation, thought, emotion, need, and response. That makes it easier for parents and kids to talk about patterns instead of arguing about behavior.
            </p>
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="py-8 md:py-12 bg-rose-50/40">
        <div className="container-wide max-w-4xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-rose-950">Best for</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {bestFor.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white border border-rose-200 text-rose-900 px-4 py-2 text-sm font-medium hover:bg-rose-100">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Parent benefits */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-rose-900/60 font-semibold">Parent benefits</p>
            <h2 className="text-3xl md:text-4xl font-bold text-rose-950">Built to make hard moments easier to navigate together.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {parentBenefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white border border-rose-100 p-6 shadow-sm space-y-3">
                <div className="h-11 w-11 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center">
                  <b.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-semibold text-rose-950">{b.title}</h3>
                <p className="text-sm text-rose-900/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust note */}
      <section className="py-8">
        <div className="container-wide max-w-3xl">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 md:p-8 flex gap-4">
            <ShieldAlert className="h-6 w-6 text-amber-700 shrink-0 mt-1" aria-hidden />
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-950">Important trust note</h3>
              <p className="text-sm md:text-base text-amber-900/85 leading-relaxed">
                CoreFeel is a practical emotional awareness tool. It is not therapy, medical care, crisis support, or a substitute for a licensed mental health professional. If a child is in immediate danger or may harm themselves or someone else, contact emergency services or a qualified crisis resource.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm uppercase tracking-widest text-rose-900/60 font-semibold">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-rose-950">Questions parents ask</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-rose-100">
                <AccordionTrigger className="text-left text-rose-950 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-rose-900/75 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 md:py-14 bg-gradient-to-br from-rose-900 via-rose-800 to-orange-900 text-rose-50">
        <div className="container-wide max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Help your child make sense of the feeling, not just the behavior.
          </h2>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-rose-50 text-rose-950 hover:bg-white"
              onClick={() => trackAppOutboundClick(webUrl)}
            >
              Open CoreFeel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-rose-50/40 text-rose-50 hover:bg-rose-50/10 hover:text-rose-50"
              onClick={() => trackAppOutboundClick(webUrl)}
            >
              <Globe className="mr-2 h-4 w-4" /> Web App
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
