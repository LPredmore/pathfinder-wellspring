import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Wand2,
  Heart,
  GraduationCap,
  Accessibility,
  LineChart,
  Info,
  Globe,
  Apple,
  Smartphone,
} from "lucide-react";
import vibetalesLogo from "@/assets/vibetales-logo.png";
import { trackVibeTalesOutboundClick } from "@/lib/tracking";

const webUrl = "https://vibetales.bestselfs.com/";
const iosUrl = "https://apps.apple.com/us/app/vibetales/id6751900169";
const androidUrl = "https://play.google.com/store/apps/details?id=com.VibeTales";

const helps = [
  {
    icon: Wand2,
    title: "Personalized stories",
    body: "Choose interests, themes, reading level, and goals so each story feels relevant to the child.",
  },
  {
    icon: BookOpen,
    title: "Sight word practice",
    body: "Add target words and let the story naturally weave them into repeated, meaningful reading.",
  },
  {
    icon: Sparkles,
    title: "Fluency support",
    body: "Use reading sessions to support accuracy, pace, confidence, and smoother expression.",
  },
  {
    icon: Heart,
    title: "Meaningful lessons",
    body: "Build stories around values, choices, emotions, and real-life lessons without turning them into lectures.",
  },
];

const educatorFeatures = [
  { icon: LineChart, text: "Oral reading fluency support" },
  { icon: LineChart, text: "Words-correct-per-minute and accuracy tracking if available" },
  { icon: BookOpen, text: "Sight word mastery lists" },
  { icon: Accessibility, text: "Dyslexia-friendly font and visual comfort options" },
  { icon: GraduationCap, text: "Reading level adjustment" },
  { icon: LineChart, text: "Progress reporting for tutoring, RTI, and IEP conversations" },
];

const bestFor = [
  "Reluctant readers",
  "Sight word practice",
  "Early readers",
  "Tutors",
  "Homeschool families",
  "Special education support",
  "Dyslexia-friendly reading settings",
  "Parent-led practice",
];

export default function VibeTales() {
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
        title="VibeTales — Personalized Reading Practice & AI Stories | ValorWell"
        description="Create personalized reading stories with sight word practice, fluency support, and progress insights. 100% of revenue funds veteran mental health care through ValorWell."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-violet-50 via-[hsl(40_50%_98%)] to-amber-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-200/40 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
        <Sparkles className="absolute top-16 left-1/4 h-6 w-6 text-amber-400/70" aria-hidden />
        <Sparkles className="absolute bottom-24 right-1/3 h-5 w-5 text-violet-400/70" aria-hidden />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <Badge className="bg-violet-900 text-violet-50 hover:bg-violet-900/90">VibeTales</Badge>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-violet-950 leading-[1.05]">
                Make reading practice feel like story time again.
              </h1>
              <p className="text-lg md:text-xl text-violet-900/80 leading-relaxed max-w-2xl">
                VibeTales creates personalized stories that blend your child's interests, reading level, sight words, and meaningful lessons — so practice feels less like a worksheet and more like an adventure.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-violet-800 hover:bg-violet-700 text-violet-50"
                  onClick={() => trackVibeTalesOutboundClick(webUrl)}
                >
                  Create a Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-violet-800/30 text-violet-900 hover:bg-violet-100"
                >
                  <a href="#educators">For Tutors and Educators</a>
                </Button>
              </div>
            </div>

            {/* Storybook visual */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative rounded-3xl bg-gradient-to-br from-[hsl(40_60%_97%)] to-violet-50 border border-violet-200/70 p-8 shadow-2xl shadow-violet-900/10 -rotate-1">
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-violet-200/80" aria-hidden />
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <img
                      src={vibetalesLogo}
                      alt="VibeTales app icon"
                      className="w-12 h-12 rounded-xl shadow-sm"
                      width={48}
                      height={48}
                    />
                    <p className="font-serif text-sm leading-relaxed text-violet-950">
                      Once upon a time, a brave young coder named{" "}
                      <span className="bg-amber-200/70 rounded px-1">Mia</span> set off to find...
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-violet-700">
                      Tonight's words
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["brave", "find", "their", "would", "again"].map((w) => (
                        <span
                          key={w}
                          className="text-xs px-2 py-1 rounded-full bg-violet-100 text-violet-900 font-medium"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 flex items-center gap-2 text-violet-700">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-xs font-medium">Level 2 · 4 min read</span>
                    </div>
                  </div>
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
            100% of all VibeTales revenue funds mental health treatment for veterans through ValorWell.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-violet-950">The problem</h2>
            <p className="text-lg text-violet-900/75 leading-relaxed">
              Reading practice can become repetitive fast. Flashcards, worksheets, and generic passages may build skills, but they often fail to hold a child's attention. VibeTales turns practice into personalized stories kids actually want to read.
            </p>
          </div>
        </div>
      </section>

      {/* How VibeTales helps */}
      <section className="py-16 md:py-24 bg-violet-50/60">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-violet-950">How VibeTales helps</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {helps.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white border border-violet-200/70 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-violet-700" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-violet-950 mb-2">{title}</h3>
                  <p className="text-sm text-violet-900/75 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educators */}
      <section id="educators" className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100 border border-amber-300">
                For professionals
              </Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-violet-950">
                For tutors, educators, and special education support
              </h2>
              <p className="text-lg text-violet-900/75 leading-relaxed">
                VibeTales can also support structured reading progress monitoring with fluency metrics, custom word lists, dyslexia-friendly reading settings, and data-rich reports for instruction and parent conversations.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-amber-50 border border-violet-200/70 p-8 md:p-10 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                {educatorFeatures.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="mt-0.5 w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-violet-700" />
                    </div>
                    <p className="text-violet-950 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-300/70 bg-amber-50/70 p-5 flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-950 leading-relaxed">
                VibeTales supports reading practice and progress monitoring. It is not a medical diagnosis tool and does not replace evaluation by qualified education or clinical professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="py-16 md:py-20 bg-violet-50/60">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-violet-950">Best for</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {bestFor.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="px-4 py-2 text-sm bg-white border-violet-300 text-violet-900 rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-violet-900 text-violet-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
              Turn today's practice words into tonight's story.
            </h2>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-amber-200 text-violet-950 hover:bg-amber-100"
                onClick={() => trackVibeTalesOutboundClick(webUrl)}
              >
                Open VibeTales
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm uppercase tracking-widest text-violet-200/80 font-semibold">
                Available on
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-violet-50/40 text-violet-50 hover:bg-violet-50/10 hover:text-violet-50"
                  onClick={() => trackVibeTalesOutboundClick(webUrl)}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Web App
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-violet-50/40 text-violet-50 hover:bg-violet-50/10 hover:text-violet-50"
                  onClick={() => trackVibeTalesOutboundClick(androidUrl)}
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Get it on Google Play
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-violet-50/40 text-violet-50 hover:bg-violet-50/10 hover:text-violet-50"
                  onClick={() => trackVibeTalesOutboundClick(iosUrl)}
                >
                  <Apple className="mr-2 h-5 w-5" />
                  Download on the App Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
