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
  Sun,
  Users,
  MessageCircle,
  Repeat,
  Heart,
  Eye,
  HandHelping,
  Smile,
  Sparkles,
  Phone,
  CalendarCheck,
  MessagesSquare,
  Hand,
  Home as HomeIcon,
  Globe,
} from "lucide-react";
import { trackAppOutboundClick } from "@/lib/tracking";

const webUrl = "https://brightdeed.bestselfs.com";

const steps = [
  { icon: Sun, title: "Get a daily deed", body: "Each day, BrightDeed offers a simple kindness prompt your family can complete at home, school, in the neighborhood, or online." },
  { icon: Users, title: "Make it age-appropriate", body: "Prompts can be simple enough for younger kids and meaningful enough for older kids and teens." },
  { icon: MessageCircle, title: "Reflect on the impact", body: "Families can talk about what happened, how it felt, and who was helped." },
  { icon: Repeat, title: "Build the habit", body: "Small repeated actions help kindness become something kids practice, not just something they hear about." },
];

const examples = [
  { icon: Heart, title: "Encourage someone", body: "Send a kind message to someone who may need it today." },
  { icon: Eye, title: "Notice unseen work", body: "Thank someone for something they usually do without being noticed." },
  { icon: HandHelping, title: "Help without being asked", body: "Look for one useful thing you can do at home before someone reminds you." },
  { icon: Smile, title: "Share the good", body: "Tell someone one specific thing you appreciate about them." },
  { icon: Sparkles, title: "Repair a moment", body: "Apologize for something small you left unresolved." },
  { icon: Phone, title: "Give attention", body: "Put the device down and give someone your full attention for ten minutes." },
];

const bestFor = [
  "Family kindness practice", "Gratitude", "Character development", "Service mindset",
  "Sibling relationships", "Parent-child conversations", "Faith-friendly families",
  "Homeschool families", "Classrooms or groups", "Daily moral habits",
];

const parentBenefits = [
  { icon: CalendarCheck, title: "Simple daily structure", body: "No complicated program. Just one small deed to focus on today." },
  { icon: MessagesSquare, title: "Better conversations", body: "Prompts create natural moments to talk about gratitude, responsibility, empathy, and service." },
  { icon: Hand, title: "Real-world practice", body: "Kids learn that kindness is not just a feeling. It is something they can do." },
  { icon: HomeIcon, title: "A more intentional family culture", body: "Repeated small actions help families become more aware of how they treat each other and the people around them." },
];

const faqs = [
  { q: "Is BrightDeed religious?", a: "BrightDeed is designed to be values-friendly and family-friendly. Families from many backgrounds can use it to practice kindness, gratitude, service, and responsibility." },
  { q: "How much time does a Bright Deed take?", a: "Most prompts are designed to be completed in a few minutes. The goal is consistency, not complexity." },
  { q: "Can schools or groups use BrightDeed?", a: "Yes. BrightDeed can work for families, classrooms, homeschool groups, youth groups, and community programs." },
  { q: "Is this just random acts of kindness?", a: "BrightDeed includes kindness, but it is broader than random acts. It helps families practice gratitude, responsibility, encouragement, service, and repair." },
];

export default function BrightDeed() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { send_to: "AW-11339741081", transport_type: "beacon" });
    }
  }, []);

  return (
    <Layout>
      <SEO
        title="BrightDeed — Daily Kindness App for Families | ValorWell"
        description="BrightDeed gives families simple daily kindness prompts that help kids practice gratitude, generosity, and thoughtful action. Free from ValorWell."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-8 md:py-14 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-amber-200/60 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl" aria-hidden />
        <Sun className="absolute top-12 right-1/4 h-7 w-7 text-amber-400/80" aria-hidden />
        <Sparkles className="absolute bottom-24 left-1/3 h-5 w-5 text-yellow-500/70" aria-hidden />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <Badge className="bg-amber-900 text-amber-50 hover:bg-amber-900/90">BrightDeed</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-950 leading-[1.05]">
                Turn kindness into a daily family habit.
              </h1>
              <p className="text-lg md:text-xl text-amber-900/80 leading-relaxed max-w-2xl">
                BrightDeed gives families simple daily prompts that help kids practice gratitude, generosity, responsibility, encouragement, and service in real life.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-amber-900 hover:bg-amber-800 text-amber-50"
                  onClick={() => trackAppOutboundClick(webUrl)}
                >
                  Start Today's Bright Deed
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" asChild className="border-amber-900/30 text-amber-950 hover:bg-amber-100">
                  <a href="#how-it-works">How It Works</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rotate-3 rounded-3xl bg-yellow-100/80 border border-amber-100" aria-hidden />
              <div className="absolute inset-0 -rotate-2 rounded-3xl bg-orange-100/70 border border-amber-100" aria-hidden />
              <div className="relative rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl border border-amber-100 p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-amber-900/60 font-semibold">Today's Bright Deed</p>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center shadow-inner">
                    <Sun className="h-5 w-5 text-white" aria-hidden />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-amber-950 leading-snug">Notice unseen work</h3>
                <p className="text-amber-900/75 leading-relaxed">
                  Thank someone for something they usually do without being noticed.
                </p>
                <div className="flex items-center gap-2 pt-2 text-sm text-amber-900/60">
                  <Heart className="h-4 w-4" aria-hidden /> 3 minute deed · Family friendly
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* The problem */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-950">
            Values are easier to teach when kids can practice them.
          </h2>
          <p className="text-lg text-amber-900/75 leading-relaxed">
            Most parents want their kids to be kind, grateful, helpful, and aware of others. But those values can be hard to teach through lectures alone. BrightDeed turns character-building into small daily actions families can actually do.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-8 md:py-14 bg-gradient-to-b from-amber-50/60 to-transparent">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-amber-900/60 font-semibold">How BrightDeed works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950">One small deed at a time.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl bg-white border border-amber-100 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">{i + 1}</div>
                  <step.icon className="h-5 w-5 text-amber-700" aria-hidden />
                </div>
                <h3 className="font-semibold text-amber-950">{step.title}</h3>
                <p className="text-sm text-amber-900/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-amber-900/60 font-semibold">Examples</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950">Sample Bright Deeds</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {examples.map((ex) => (
              <div key={ex.title} className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 p-6 shadow-sm space-y-3">
                <div className="h-11 w-11 rounded-xl bg-white text-amber-700 flex items-center justify-center shadow-sm">
                  <ex.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-semibold text-amber-950">{ex.title}</h3>
                <p className="text-sm text-amber-900/75 leading-relaxed">{ex.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="py-8 md:py-12 bg-amber-50/50">
        <div className="container-wide max-w-4xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-950">Best for</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {bestFor.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white border border-amber-200 text-amber-900 px-4 py-2 text-sm font-medium hover:bg-amber-100">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-8 md:py-14">
        <div className="container-wide max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-amber-100 p-8 md:p-12 space-y-4 text-center">
            <p className="text-sm uppercase tracking-widest text-amber-900/70 font-semibold">Why it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950">Kids learn values by practicing them.</h2>
            <p className="text-lg text-amber-900/75 leading-relaxed max-w-2xl mx-auto">
              BrightDeed keeps the action small enough to complete, but meaningful enough to matter. Instead of turning kindness into a lecture, it gives families one concrete way to live it out today.
            </p>
          </div>
        </div>
      </section>

      {/* Parent benefits */}
      <section className="py-8 md:py-14 bg-amber-50/40">
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <p className="text-sm uppercase tracking-widest text-amber-900/60 font-semibold">Parent benefits</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950">Built for everyday family life.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {parentBenefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white border border-amber-100 p-6 shadow-sm space-y-3">
                <div className="h-11 w-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <b.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-semibold text-amber-950">{b.title}</h3>
                <p className="text-sm text-amber-900/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-14 bg-amber-50/40">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm uppercase tracking-widest text-amber-900/60 font-semibold">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950">Questions families ask</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-amber-100">
                <AccordionTrigger className="text-left text-amber-950 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-amber-900/75 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 md:py-14 bg-gradient-to-br from-amber-800 via-orange-700 to-amber-900 text-amber-50">
        <div className="container-wide max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">Do one small good thing today.</h2>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-amber-50 text-amber-950 hover:bg-white"
              onClick={() => trackAppOutboundClick(webUrl)}
            >
              Start Today's Bright Deed
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-amber-50/40 text-amber-50 hover:bg-amber-50/10 hover:text-amber-50"
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
