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
  { icon: Calendar, title: "Start with the event", body: "What just happened? A conflict, a mistake, a stressful moment, a disappointment, a correction, or something that hit harder than expected." },
  { icon: MessageCircle, title: "Notice the Worry Voice", body: "What did your mind say about it? CoreFeel helps you name the thought, fear, or belief that made the moment feel bigger." },
  { icon: Smile, title: "Name the emotion", body: "Pick the feeling that actually fits. Over time you build a richer vocabulary than just mad, sad, or fine." },
  { icon: Heart, title: "Connect the heart need", body: "Understand what important need may have been touched — safety, trust, esteem, intimacy, or power and control." },
  { icon: Sparkles, title: "Try a healthier response", body: "Not to shame the feeling, but to understand it and practice a next step that actually works better." },
];

const bestFor = [
  "Worry thoughts",
  "Emotional awareness",
  "Building mental habits",
  "Working with your Worry Voice",
  "Big reactions",
  "Social stress",
  "Shame and embarrassment",
  "Frustration tolerance",
  "Reflection after conflict",
  "Parent-child conversations",
  "CBT-informed skill practice",
];

const benefits = [
  { icon: Eye, title: "Less guessing", body: "Stop wondering why you (or someone you love) reacted that way. CoreFeel surfaces what was really underneath." },
  { icon: MessagesSquare, title: "Better conversations", body: "Gives you shared language for hard moments — without turning them into a lecture or a fight." },
  { icon: BookOpen, title: "More emotional vocabulary", body: "Move past mad/sad/fine and learn to identify what you actually feel with more precision." },
  { icon: LineChart, title: "More self-awareness over time", body: "Repeated practice helps you notice patterns in your thoughts, feelings, and needs." },
];

const faqs = [
  { q: "Who is CoreFeel for?", a: "Everyone. CoreFeel is built for kids, teens, and adults. It's especially useful for anyone who was never taught to work with their inner Worry Voice — which is most of us." },
  { q: "Is CoreFeel therapy?", a: "No. CoreFeel is a practical emotional awareness and reflection tool. It can support conversations and skill practice, but it does not diagnose, treat, or replace professional care." },
  { q: "What is a Worry Voice?", a: "A Worry Voice is the thought, fear, or belief that shows up inside a stressful moment. CoreFeel helps you notice that voice so you can understand how it shapes the emotion — and respond to it instead of being controlled by it." },
  { q: "How do I build a habit with it?", a: "Use CoreFeel any time a moment feels bigger than it should. Even a few minutes a week of walking through the cycle starts rewiring how you relate to your own mind." },
  { q: "Can I use it with my child?", a: "Yes. The same five-step flow works beautifully when a parent walks through it with a child or teen — it gives families structure, clarity, and compassion in hard moments." },
];

const heroFlow = [
  { icon: Calendar, label: "Event", tint: "bg-rose-100 text-rose-900" },
  { icon: MessageCircle, label: "Worry Voice", tint: "bg-amber-100 text-amber-900" },
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
        title="CoreFeel — Understand Your Mind, Emotions & Worry Voice | ValorWell"
        description="CoreFeel is a guided practice for understanding how your mind, feelings, and needs connect — built for kids, teens, and adults. Free from ValorWell."
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
                Build a healthier relationship with your mind.
              </h1>
              <p className="text-lg md:text-xl text-rose-900/80 leading-relaxed max-w-2xl">
                Thoughts shape feelings. Feelings shape needs. Needs shape how we respond. CoreFeel is a guided practice that walks you through that cycle — so you can finally work <em>with</em> your mind instead of against it. Built for kids, teens, and adults.
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


      {/* The problem */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-950">
            Most of us were never taught how to work with our own mind.
          </h2>
          <p className="text-lg text-rose-900/75 leading-relaxed">
            We were told to suppress the Worry Voice. Control the feeling. Push through. But the mind doesn't work that way — and neither do kids. Understanding how thoughts, emotions, and needs move together is a skill, and like any skill, it takes the right tool and regular practice. CoreFeel is that tool, for any age.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-8 md:py-14 bg-gradient-to-b from-rose-50/60 to-transparent">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-rose-900/60 font-semibold">How CoreFeel works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-rose-950">Five small steps to understand a big moment.</h2>
            <p className="text-sm text-rose-900/70">Works on your own — and works just as well when a parent walks through it with a child.</p>
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
              From "I feel bad" to "I understand what just happened inside me."
            </h2>
            <p className="text-lg text-rose-900/75 leading-relaxed max-w-2xl mx-auto">
              Mood trackers show what you felt. CoreFeel goes deeper — connecting the situation, the thought, the emotion, the underlying need, and a healthier next step. That's the difference between logging a feeling and actually growing from it.
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

      {/* What CoreFeel gives you */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-rose-900/60 font-semibold">What CoreFeel gives you</p>
            <h2 className="text-3xl md:text-4xl font-bold text-rose-950">Built to make hard moments easier to navigate.</h2>
            <p className="text-sm text-rose-900/70">Powerful on your own — and a great shared tool to use with a child or teen.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
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
                CoreFeel is a practical emotional awareness tool. It is not therapy, medical care, crisis support, or a substitute for a licensed mental health professional. If you or someone you know is in immediate danger, contact emergency services or a qualified crisis resource.
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
            <h2 className="text-3xl md:text-4xl font-bold text-rose-950">Common questions</h2>
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
            Practice understanding your mind — one moment at a time.
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
