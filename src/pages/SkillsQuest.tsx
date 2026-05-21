import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Compass,
  Map as MapIcon,
  Key,
  Trophy,
  Globe,
  Apple,
  Smartphone,
  Quote,
} from "lucide-react";
import skillsquestLogo from "@/assets/skillsquest-logo.png";
import { trackAppOutboundClick } from "@/lib/tracking";

const webUrl = "https://skillsquest.bestselfs.com";
const iosUrl = "https://apps.apple.com/us/app/skillsquest/id6754609969";
const androidUrl = "https://play.google.com/store/apps/details?id=com.SkillsQuest";

const steps = [
  {
    icon: Compass,
    title: "Choose the child's age range",
    body: "Start with developmentally appropriate expectations instead of guessing what should come next.",
  },
  {
    icon: MapIcon,
    title: "Review life-skill tracks",
    body: "Kids see the responsibilities they are working toward and what mastery looks like.",
  },
  {
    icon: Key,
    title: "Connect skills to privileges",
    body: "Privileges are unlocked through readiness, not random negotiation.",
  },
  {
    icon: Trophy,
    title: "Track progress without constant conflict",
    body: "Parents can guide the process while kids see what is expected and what comes next.",
  },
];

const bestFor = [
  "Chores",
  "Hygiene",
  "Homework responsibility",
  "Device privileges",
  "Allowance readiness",
  "Independence milestones",
  "Kids who ask for more freedom",
  "Parents tired of repeating expectations",
];

const parentLanguage = [
  "You are not being punished. You are practicing the skill that unlocks the next privilege.",
  "Freedom grows when responsibility grows.",
  "This is not about being perfect. It is about showing readiness.",
];

export default function SkillsQuest() {
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
        title="SkillsQuest — Life Skills & Privileges Tracker for Kids | ValorWell"
        description="Help kids unlock privileges through age-appropriate life skills, responsibility, accountability, and independence. Free from ValorWell."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-8 md:py-14 bg-gradient-to-br from-emerald-50 via-stone-50 to-teal-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-teal-200/30 blur-3xl" aria-hidden />
        <div className="container-wide relative">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <Badge className="bg-emerald-900 text-emerald-50 hover:bg-emerald-900/90">SkillsQuest</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-950 leading-[1.05]">
                Freedom feels better when kids are ready for it.
              </h1>
              <p className="text-lg md:text-xl text-emerald-900/80 leading-relaxed max-w-2xl">
                SkillsQuest gives kids a clear path from life skills to privileges, helping parents replace arguments with visible expectations, progress, and accountability.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-emerald-800 hover:bg-emerald-700 text-emerald-50"
                  onClick={() => trackAppOutboundClick(webUrl)}
                >
                  Start SkillsQuest
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-emerald-800/30 text-emerald-900 hover:bg-emerald-100"
                >
                  <a href="#how-it-works">See the Skill Path</a>
                </Button>
              </div>
            </div>

            {/* Quest path visual */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-3xl bg-gradient-to-br from-stone-50 to-emerald-50 border border-emerald-200/70 p-8 shadow-2xl shadow-emerald-900/10">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={skillsquestLogo}
                    alt="SkillsQuest app icon"
                    className="w-12 h-12 rounded-xl shadow-sm"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">Skill path</p>
                    <p className="font-bold text-emerald-950">Age 9 · Independence</p>
                  </div>
                </div>
                <svg viewBox="0 0 320 240" className="w-full h-auto">
                  <path
                    d="M 30 200 Q 90 80 160 140 T 290 50"
                    fill="none"
                    stroke="hsl(160 50% 75%)"
                    strokeWidth="4"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                  />
                  {[
                    { x: 30, y: 200, label: "Hygiene", done: true },
                    { x: 130, y: 130, label: "Chores", done: true },
                    { x: 210, y: 110, label: "Homework", done: false },
                    { x: 290, y: 50, label: "Device", done: false },
                  ].map((m, i) => (
                    <g key={i}>
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r="18"
                        fill={m.done ? "hsl(160 65% 35%)" : "hsl(40 30% 96%)"}
                        stroke={m.done ? "hsl(160 60% 80%)" : "hsl(160 30% 70%)"}
                        strokeWidth="4"
                      />
                      <text
                        x={m.x}
                        y={m.y + 5}
                        textAnchor="middle"
                        className="text-sm font-bold"
                        fill={m.done ? "white" : "hsl(160 40% 30%)"}
                      >
                        {i + 1}
                      </text>
                      <text
                        x={m.x}
                        y={m.y + 38}
                        textAnchor="middle"
                        className="text-[11px] font-semibold"
                        fill="hsl(160 40% 25%)"
                      >
                        {m.label}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="mt-4 flex items-center justify-between text-sm font-medium text-emerald-900">
                  <span>Privileges unlocked</span>
                  <span className="tabular-nums">2 / 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* The everyday problem */}
      <section className="py-8 md:py-14">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">The everyday problem</h2>
            <p className="text-lg text-emerald-900/75 leading-relaxed">
              Kids often want more freedom before they have mastered the habits that make that freedom work. Parents end up repeating the same reminders: clean your room, finish homework, manage hygiene, help around the house, be responsible with devices. SkillsQuest turns those repeated arguments into a visible growth path.
            </p>
          </div>
        </div>
      </section>

      {/* How it works — milestone path */}
      <section id="how-it-works" className="py-8 md:py-14 bg-emerald-50/60">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">How SkillsQuest works</h2>
              <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto">
                Four milestones that turn responsibility into a path your child can see.
              </p>
            </div>

            <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-emerald-300" aria-hidden />
              {steps.map(({ icon: Icon, title, body }, i) => (
                <div
                  key={title}
                  className="relative rounded-2xl bg-white border border-emerald-200/70 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative z-10 mx-auto -mt-12 w-16 h-16 rounded-full bg-emerald-800 text-emerald-50 font-bold text-xl flex items-center justify-center ring-8 ring-emerald-50 mb-4">
                    {i + 1}
                  </div>
                  <div className="flex items-center gap-2 mb-2 justify-center text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg text-emerald-950 mb-2 text-center">{title}</h3>
                  <p className="text-sm text-emerald-900/75 leading-relaxed text-center">{body}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Best for</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {bestFor.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="px-4 py-2 text-sm bg-emerald-50 border-emerald-300 text-emerald-900 rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core promise */}
      <section className="py-8 md:py-14 bg-emerald-900 text-emerald-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm uppercase tracking-widest text-emerald-200/80 font-semibold">Core promise</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Not a chore chart. A readiness map.
            </h2>
            <p className="text-lg md:text-xl text-emerald-100/90 leading-relaxed">
              SkillsQuest helps families shift from enforcement to accountability. The question becomes less "Why won't you do this?" and more "What skill are you building next?"
            </p>
          </div>
        </div>
      </section>

      {/* Parent language */}
      <section className="py-8 md:py-14">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Parent language built into the product</h2>
              <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto">
                Phrases SkillsQuest uses to keep the conversation about readiness — not punishment.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {parentLanguage.map((quote) => (
                <div
                  key={quote}
                  className="relative rounded-2xl bg-gradient-to-br from-stone-50 to-emerald-50 border border-emerald-200/70 p-6 shadow-sm"
                >
                  <Quote className="h-7 w-7 text-emerald-400 mb-3" />
                  <p className="text-base text-emerald-950 leading-relaxed italic">"{quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 md:py-14 bg-gradient-to-br from-emerald-50 via-stone-50 to-teal-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-950 leading-tight">
              Give your child a clear path to more independence.
            </h2>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-emerald-800 hover:bg-emerald-700 text-emerald-50"
                onClick={() => trackAppOutboundClick(webUrl)}
              >
                Open SkillsQuest
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm uppercase tracking-widest text-emerald-700 font-semibold">Available on</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-800/30 text-emerald-900 hover:bg-emerald-100"
                  onClick={() => trackAppOutboundClick(webUrl)}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Web App
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-800/30 text-emerald-900 hover:bg-emerald-100"
                  onClick={() => trackAppOutboundClick(iosUrl)}
                >
                  <Apple className="mr-2 h-5 w-5" />
                  Download on the App Store
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-800/30 text-emerald-900 hover:bg-emerald-100"
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
