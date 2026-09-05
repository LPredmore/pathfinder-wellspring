import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Eye,
  HeartHandshake,
  Network,
  PlayCircle,
  ShieldCheck,
  Stethoscope,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";
import missionCoverAsset from "@/assets/mission-cover-new.png.asset.json";

type Tone = "evergreen" | "yellow" | "ember";

interface PathCard {
  title: string;
  copy: string;
  cta: string;
  to: string;
  event: string;
  Icon: LucideIcon;
}

const pathCards: PathCard[] = [
  {
    title: "I need mental health care",
    copy: "See the care pathways ValorWell can responsibly support right now.",
    cta: "Find Care",
    to: "/get-care",
    event: "mission_path_care",
    Icon: Stethoscope,
  },
  {
    title: "I'm a clinician",
    copy: "Help build the clinical infrastructure underneath the mission.",
    cta: "Work With ValorWell",
    to: "/clinicians",
    event: "mission_path_clinician",
    Icon: Users,
  },
  {
    title: "I represent an organization",
    copy: "Build a useful relationship around access, service, reach, or community action.",
    cta: "Partner With ValorWell",
    to: "/partner",
    event: "mission_path_partner",
    Icon: Building2,
  },
  {
    title: "I want to see real action",
    copy: "Watch the people and organizations going Beyond The Yellow.",
    cta: "Explore Beyond The Yellow",
    to: "/beyond-the-yellow",
    event: "mission_path_bty",
    Icon: HeartHandshake,
  },
  {
    title: "I want to find organizations",
    copy: "Discover organizations already featured by Beyond The Yellow.",
    cta: "Explore the Network",
    to: "/network",
    event: "mission_path_network",
    Icon: Network,
  },
  {
    title: "I want to support the work",
    copy: "Help fund direct therapy for veterans who need another path to treatment.",
    cta: "Support ValorWell",
    to: "/support",
    event: "mission_path_support",
    Icon: HeartHandshake,
  },
];

function Eyebrow({
  children,
  tone = "evergreen",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const classes: Record<Tone, string> = {
    evergreen: "text-[#3B5147]",
    yellow: "text-[#8A6814]",
    ember: "text-[#B24A3A]",
  };

  return (
    <p className={`text-xs font-bold uppercase tracking-[0.2em] ${classes[tone]}`}>
      {children}
    </p>
  );
}

function TrackedLink({
  to,
  event,
  children,
  className = "",
}: {
  to: string;
  event: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} onClick={() => trackHomeEvent(event, { page: "mission" })} className={className}>
      {children}
    </Link>
  );
}

function scrollToModel() {
  if (typeof window === "undefined") return;
  const target = document.getElementById("mission-model");
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

export default function MissionPage() {
  useEffect(() => {
    trackHomeEvent("mission_page_view", { page: "mission" });
  }, []);

  return (
    <Layout>
      <SEO
        title="ValorWell Mission | Build Better Paths, Not Better Promises"
        description="ValorWell exists to build better systems around mental well-being, starting with veterans and families through real care, transparent impact, and community action."
        canonical="/mission"
      />

      <div className="mission-theme bg-[#F4F1E8] text-[#111814]">
        <style>{`
          .mission-theme {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .mission-theme h1,
          .mission-theme h2,
          .mission-theme h3,
          .mission-theme h4 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.025em;
          }
        `}</style>

        <section className="relative overflow-hidden border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D7A92E]/[0.09] blur-3xl" />
            <div className="absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#3B5147]/[0.08] blur-3xl" />
          </div>

          <div className="container-wide relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-7">
              <Eyebrow>Why ValorWell Exists</Eyebrow>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                People should not have to become experts in broken systems just to get help.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#111814]/70 md:text-xl">
                ValorWell exists to make support more usable. We build real care, clearer pathways,
                stronger infrastructure, and a community that treats action as more important than appearance.
              </p>
              <p className="mt-5 max-w-2xl text-sm font-bold uppercase tracking-[0.14em] text-[#3B5147]">
                Build the path people should have had.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackHomeEvent("mission_hero_model", { page: "mission" });
                    scrollToModel();
                  }}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#31443B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2"
                >
                  See How the Mission Works
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <TrackedLink
                  to="/get-care"
                  event="mission_hero_care"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#3B5147]/30 px-5 py-3 text-sm font-bold text-[#3B5147] transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2"
                >
                  Find Care
                </TrackedLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-[#3B5147]/15 bg-white shadow-xl">
                <img
                  src={missionCoverAsset.url}
                  alt="ValorWell mission"
                  className="aspect-[4/5] h-full w-full object-cover lg:aspect-[5/6]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">The Problem We Are Solving</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Help becomes less useful when the person needing it has to assemble the system themselves.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/68">
                ValorWell is built around a simple observation: a service can exist and still be hard to reach,
                hard to understand, or disconnected from the person it is supposed to help.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                [
                  "01",
                  "Too much burden gets pushed onto the person.",
                  "People should not have to decode every rule, handoff, provider pathway, and next step before they can move forward.",
                ],
                [
                  "02",
                  "Infrastructure matters as much as intention.",
                  "Good intentions do not replace the clinicians, workflows, relationships, and operating systems required to make support usable.",
                ],
                [
                  "03",
                  "Visibility is not the same as impact.",
                  "Awareness has value, but support has to eventually create something a person or community can actually feel.",
                ],
              ].map(([number, title, copy]) => (
                <article key={number} className="rounded-2xl border border-white/12 bg-white/[0.05] p-7">
                  <p className="text-sm font-bold text-[#D7A92E]">{number}</p>
                  <h3 className="mt-5 text-xl font-bold leading-snug">{title}</h3>
                  <p className="mt-4 leading-7 text-white/62">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Our Operating Standard</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Build something useful before asking people to believe in it.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-[#3B5147]/12 border-y border-[#3B5147]/12">
                {[
                  [
                    "Make the next step clearer",
                    "Better systems reduce unnecessary navigation burden instead of creating another layer people have to learn.",
                  ],
                  [
                    "Put real infrastructure underneath the promise",
                    "ValorWell operates actual mental-health care and builds the clinical, technical, and relationship infrastructure needed to support the wider mission.",
                  ],
                  [
                    "Tell the truth about what is ready",
                    "We would rather describe a limitation clearly than make a pathway, outcome, or capability sound more available than it is.",
                  ],
                  [
                    "Show evidence before celebrating impact",
                    "Results should be defined, dated, and supportable before they become persuasive numbers on a page.",
                  ],
                ].map(([title, copy]) => (
                  <div key={title} className="grid gap-3 py-7 sm:grid-cols-[42px_1fr]">
                    <ShieldCheck className="mt-1 h-6 w-6 text-[#3B5147]" aria-hidden="true" />
                    <div>
                      <h3 className="text-xl font-bold">{title}</h3>
                      <p className="mt-2 leading-7 text-[#111814]/64">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Where We Are Starting</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Veterans and families are the current public priority. The mission is bigger than one population.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#111814]/68">
                ValorWell is currently focused on building better mental-health and support pathways for veterans
                and their families. That focus is deliberate. It gives the broader mission a real place to build,
                test, operate, and improve instead of remaining abstract.
              </p>
              <p className="mt-4 max-w-3xl leading-7 text-[#111814]/62">
                Beyond The Yellow extends the same action-first standard beyond veteran causes by spotlighting
                people and organizations doing useful work in their own communities.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#D7A92E]/30 bg-[#F8F3E4] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">The Standard</p>
                <blockquote className="mt-5 text-2xl font-bold leading-snug md:text-3xl">
                  Support is not a symbol. Support is behavior.
                </blockquote>
                <p className="mt-5 leading-7 text-[#111814]/64">
                  If support disappeared tomorrow, would anyone be worse off? Would they even know?
                </p>
                <TrackedLink
                  to="/beyond-the-yellow"
                  event="mission_focus_bty"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Explore Beyond The Yellow
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section id="mission-model" className="scroll-mt-24 border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>How the Mission Works</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Care. Impact. Community.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                The three layers solve different parts of the same problem. None of them works as well in isolation.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8">
                <Stethoscope className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">Care</p>
                <h3 className="mt-3 text-2xl font-bold">Make help real.</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Mental-health care, clinician infrastructure, access pathways, and operational systems turn a mission into something people can actually use.
                </p>
                <TrackedLink
                  to="/get-care"
                  event="mission_model_care"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Find Care
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>

              <article className="rounded-3xl bg-[#111814] p-8 text-white">
                <Eye className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">Impact</p>
                <h3 className="mt-3 text-2xl font-bold">Make the proof visible.</h3>
                <div className="mt-5 grid grid-cols-3 gap-3 border-y border-white/12 py-5">
                  <div>
                    <p className="text-2xl font-bold text-[#D7A92E]">540+</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">therapy hours</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#D7A92E]">45+</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">veterans</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#D7A92E]">11</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">states</p>
                  </div>
                </div>
                <p className="mt-5 leading-7 text-white/64">
                  In 2026, ValorWell Foundation supporters have funded direct therapy for veterans who needed another path to treatment.
                </p>
                <TrackedLink
                  to="/impact"
                  event="mission_model_impact"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white"
                >
                  See Verified Impact
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8">
                <Network className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">Community</p>
                <h3 className="mt-3 text-2xl font-bold">Make action easier to find and join.</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Beyond The Yellow, Watch, Network, partners, guests, viewers, and supporters connect people doing useful work with people who want to participate.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <TrackedLink to="/watch" event="mission_model_watch" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]">
                    Watch <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink to="/network" event="mission_model_network" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]">
                    Network <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">What We Refuse to Fake</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Credibility comes from boundaries too.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {[
                  "We do not promise outcomes controlled by the VA, payers, clinicians, or other outside systems.",
                  "We do not publish impact numbers simply because a bigger number would make the mission sound stronger.",
                  "We do not treat a symbol, a post, a logo, or a partnership announcement as proof that someone was helped.",
                  "We do not make the clinic the whole identity of ValorWell simply because care is one of the most concrete parts of the work.",
                ].map((item) => (
                  <div key={item} className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0">
                    <Waypoints className="mt-1 h-5 w-5 shrink-0 text-[#D7A92E]" aria-hidden="true" />
                    <p className="leading-7 text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Find Your Place</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                A mission only matters if people can enter it somewhere useful.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                Start with the role that brought you here. You do not need to understand every part of ValorWell first.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pathCards.map(({ title, copy, cta, to, event, Icon }) => (
                <TrackedLink
                  key={title}
                  to={to}
                  event={event}
                  className="group rounded-2xl border border-[#3B5147]/15 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#3B5147]/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <Icon className="h-6 w-6 text-[#3B5147]" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-[#111814]/62">{copy}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3B5147]">
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#111814] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">The Mission in One Line</p>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Build better paths. Prove what they do. Help more people find the work that matters.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedLink
                to="/watch"
                event="mission_final_watch"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#111814]"
              >
                Watch ValorWell
              </TrackedLink>
              <TrackedLink
                to="/get-care"
                event="mission_final_care"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/35 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Find Care
              </TrackedLink>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
