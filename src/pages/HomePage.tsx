import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleAlert,
  Eye,
  HeartHandshake,
  Network,
  PlayCircle,
  ShieldCheck,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, OrganizationSchema } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";
import homepageHero from "@/assets/homepage-hero.png.asset.json";
import btyHomepage from "@/assets/bty-homepage.png.asset.json";
import valorwellClinic from "@/assets/valorwell-clinic.png.asset.json";

type Tone = "evergreen" | "yellow" | "ember";

interface RouteCard {
  title: string;
  copy: string;
  cta: string;
  to: string;
  event: string;
  Icon: LucideIcon;
}

const routeCards: RouteCard[] = [
  {
    title: "I need mental health care",
    copy: "See the care pathways ValorWell can responsibly support right now.",
    cta: "Find Care",
    to: "/get-care",
    event: "homepage_route_care",
    Icon: Stethoscope,
  },
  {
    title: "I'm a clinician",
    copy: "Help build ethical, care-first clinical infrastructure with ValorWell.",
    cta: "Explore Clinician Roles",
    to: "/clinicians",
    event: "homepage_route_clinician",
    Icon: Users,
  },
  {
    title: "I represent an organization",
    copy: "Bring collaboration, relationships, reach, resources, or aligned infrastructure.",
    cta: "Partner With ValorWell",
    to: "/partner",
    event: "homepage_route_partner",
    Icon: Building2,
  },
  {
    title: "I want to share a story",
    copy: "Nominate a person or organization taking real action through Beyond The Yellow.",
    cta: "Share a Story",
    to: "/beyond-the-yellow",
    event: "homepage_route_bty",
    Icon: HeartHandshake,
  },
  {
    title: "I want to find organizations",
    copy: "Discover organizations already featured by Beyond The Yellow.",
    cta: "Explore the Network",
    to: "/network",
    event: "homepage_route_network",
    Icon: Network,
  },
  {
    title: "I want to support the work",
    copy: "Help fund direct therapy for veterans who need another path to treatment.",
    cta: "Support ValorWell",
    to: "/support",
    event: "homepage_route_support",
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
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] ${classes[tone]}`}
    >
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
    <Link
      to={to}
      onClick={() => trackHomeEvent(event)}
      className={className}
    >
      {children}
    </Link>
  );
}

function scrollToModel() {
  if (typeof window === "undefined") return;
  const target = document.getElementById("how-valorwell-works");
  if (!target) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export default function HomePage() {
  useEffect(() => {
    trackHomeEvent("homepage_view");
  }, []);

  return (
    <Layout>
      <SEO
        title="ValorWell | Better Systems, Real Care, Real Action"
        description="ValorWell builds better systems around veteran and family mental well-being through real care, transparent impact, Beyond The Yellow, and community action."
        canonical="/"
      />
      <OrganizationSchema />

      <div className="home-theme bg-[#F4F1E8] text-[#111814]">
        <style>{`
          .home-theme {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }

          .home-theme h1,
          .home-theme h2,
          .home-theme h3,
          .home-theme h4 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.025em;
          }
        `}</style>

        <section className="relative overflow-hidden border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-36 -top-40 h-96 w-96 rounded-full bg-[#3B5147]/[0.07] blur-3xl" />
            <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#D7A92E]/[0.08] blur-3xl" />
          </div>

          <div className="container-wide relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-7">
              <Eyebrow>Care. Proof. Community.</Eyebrow>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.03] text-[#111814] sm:text-5xl md:text-6xl lg:text-7xl">
                Better systems are built by people willing to do more than talk
                about what&apos;s broken.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#111814]/70 md:text-xl">
                ValorWell is building better pathways around mental well-being,
                veteran and family care, and real community action. We operate
                real care, show the work, and spotlight people and organizations
                doing something that matters.
              </p>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#3B5147]">
                Care that works. Impact that can be shown. Community that moves.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackHomeEvent("homepage_hero_model");
                    scrollToModel();
                  }}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#31443B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2"
                >
                  See How ValorWell Works
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <TrackedLink
                  to="/watch"
                  event="homepage_hero_watch"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#3B5147]/35 px-5 py-3 text-sm font-bold text-[#3B5147] transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Watch ValorWell
                </TrackedLink>
              </div>

              <TrackedLink
                to="/get-care"
                event="homepage_hero_care"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-[#3B5147] underline decoration-[#3B5147]/30 underline-offset-4 hover:decoration-[#3B5147]"
              >
                Need mental health care? Find care.
              </TrackedLink>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-[#3B5147]/15 bg-white shadow-xl">
                <img
                  src={homepageHero.url}
                  alt="ValorWell mission"
                  className="aspect-[4/5] h-full w-full object-cover lg:aspect-[5/6]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide py-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
                  Looking for care?
                </p>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                  Start with what is actually available.
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  ValorWell will tell you what is active, what is limited, and
                  what is not currently available.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:col-span-6">
                <div className="rounded-xl border border-white/15 bg-white/[0.07] p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#D7A92E]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold">CHAMPVA</p>
                  <p className="mt-1 text-xs leading-5 text-white/65">
                    Active general care pathway, subject to provider availability and fit.
                  </p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/[0.07] p-4">
                  <ShieldCheck className="h-5 w-5 text-[#D7A92E]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold">VA Community Care</p>
                  <p className="mt-1 text-xs leading-5 text-white/65">
                    Limited and clinician- and region-specific.
                  </p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/[0.07] p-4">
                  <CircleAlert className="h-5 w-5 text-[#D7A92E]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold">TRICARE</p>
                  <p className="mt-1 text-xs leading-5 text-white/65">
                    Not currently active. No promised launch timeline.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 lg:text-right">
                <TrackedLink
                  to="/get-care"
                  event="homepage_care_options"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-[#3B5147] transition hover:bg-[#F4F1E8]"
                >
                  See Care Options
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <p className="mt-3 text-xs leading-5 text-white/55">
                  ValorWell does not currently offer private-pay therapy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-valorwell-works"
          className="scroll-mt-24 border-b border-[#3B5147]/15 bg-[#F4F1E8]"
        >
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow>How ValorWell Works</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  One organization. Three jobs.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#111814]/68">
                  ValorWell is easier to understand when the work is separated
                  by what it is supposed to accomplish: deliver care, prove
                  impact, and build a community around real action.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <TrackedLink
                  to="/mission"
                  event="homepage_model_mission"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147] underline decoration-[#3B5147]/30 underline-offset-4 hover:decoration-[#3B5147]"
                >
                  Why ValorWell Exists
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3B5147]/10 text-[#3B5147]">
                  <Stethoscope className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">
                  Care
                </p>
                <h3 className="mt-3 text-2xl font-bold">Real care and the systems behind it.</h3>
                <p className="mt-4 leading-7 text-[#111814]/65">
                  Mental-health care, access pathways, clinician infrastructure,
                  and the operating systems required to deliver care responsibly.
                </p>
                <TrackedLink
                  to="/get-care"
                  event="homepage_model_care"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Find Care
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>

              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#111814] p-7 text-white shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#D7A92E]">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                  Impact
                </p>
                <h3 className="mt-3 text-2xl font-bold">Proof you can point to.</h3>
                <p className="mt-4 leading-7 text-white/65">
                  In 2026, Foundation supporters have funded 540+ hours of direct therapy for 45+ veterans across 11 states.
                </p>
                <TrackedLink
                  to="/impact"
                  event="homepage_model_impact"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white"
                >
                  See Verified Impact
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D7A92E]/15 text-[#8A6814]">
                  <Network className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">
                  Community
                </p>
                <h3 className="mt-3 text-2xl font-bold">Make real action easier to find.</h3>
                <p className="mt-4 leading-7 text-[#111814]/65">
                  Beyond The Yellow, Watch, Network, partners, guests, and
                  supporters connect people doing useful work to people who want
                  to participate.
                </p>
                <TrackedLink
                  to="/beyond-the-yellow"
                  event="homepage_bty_explore"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Explore the Community
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">
                  Proof Before Promotion
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  We waited until we could show the work. Now we can.
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                  These are 2026 results from therapy paid for through ValorWell Foundation funding. They represent direct care that has already happened—not projections or an all-time estimate.
                </p>
              </div>
              <div className="lg:col-span-6 lg:text-right">
                <TrackedLink
                  to="/impact"
                  event="homepage_proof_impact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  See the Full Impact
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-white/12 bg-white/[0.05] p-7">
                <p className="text-5xl font-bold text-[#D7A92E]">540+</p>
                <h3 className="mt-4 text-xl font-bold">hours of direct therapy</h3>
              </article>
              <article className="rounded-3xl border border-white/12 bg-white/[0.05] p-7">
                <p className="text-5xl font-bold text-[#D7A92E]">45+</p>
                <h3 className="mt-4 text-xl font-bold">unique veterans reached</h3>
              </article>
              <article className="rounded-3xl border border-white/12 bg-white/[0.05] p-7">
                <p className="text-5xl font-bold text-[#D7A92E]">11</p>
                <h3 className="mt-4 text-xl font-bold">states served</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-[#D7A92E]/30 bg-white shadow-lg">
                <img
                  src={btyHomepage.url}
                  alt="Beyond The Yellow"
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <Eyebrow tone="yellow">Beyond The Yellow</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Support is not a symbol. Support is behavior.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#111814]/68">
                Beyond The Yellow is the ValorWell-powered movement spotlighting
                people and organizations taking real action instead of stopping
                at symbolic support.
              </p>
              <blockquote className="mt-7 border-l-4 border-[#D7A92E] pl-5 text-xl font-bold leading-snug md:text-2xl">
                If the support stopped tomorrow, would anyone be worse off?
                Would they even know?
              </blockquote>
              <p className="mt-6 leading-7 text-[#111814]/65">
                The goal is not to shame people for caring. It is to make useful
                action visible, give the people doing the work a platform, and
                make participation feel contagious.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  to="/beyond-the-yellow"
                  event="homepage_bty_explore"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#31443B]"
                >
                  Explore Beyond The Yellow
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  to="/network"
                  event="homepage_bty_network"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#3B5147]/30 px-5 py-3 text-sm font-bold text-[#3B5147] transition hover:bg-white/60"
                >
                  Find Featured Organizations
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Community Destinations</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Watch the work. Find the people doing it.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                Watch and Network serve different jobs. One is for media. The
                other is for discovering organizations.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl bg-[#111814] p-8 text-white md:p-10">
                <PlayCircle className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                  Watch
                </p>
                <h3 className="mt-3 text-3xl font-bold">Stories, interviews, practical help, and the build.</h3>
                <p className="mt-5 max-w-xl leading-7 text-white/65">
                  Watch is ValorWell&apos;s media destination for Beyond The Yellow
                  conversations, practical content, and the work being shown in public.
                </p>
                <TrackedLink
                  to="/watch"
                  event="homepage_watch"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#111814]"
                >
                  Watch ValorWell
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>

              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8 md:p-10">
                <Network className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">
                  Network
                </p>
                <h3 className="mt-3 text-3xl font-bold">Organizations first. Media second.</h3>
                <p className="mt-5 max-w-xl leading-7 text-[#111814]/65">
                  Network starts with real organizations already featured by
                  Beyond The Yellow and is structured to grow into a useful
                  veteran-resource discovery destination.
                </p>
                <TrackedLink
                  to="/network"
                  event="homepage_network"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white"
                >
                  Explore the Network
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Find Your Place</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                What brought you here?
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                You do not need to understand every part of ValorWell. Start
                with the reason you showed up.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {routeCards.map(({ title, copy, cta, to, event, Icon }) => (
                <TrackedLink
                  key={title}
                  to={to}
                  event={event}
                  className="group rounded-2xl border border-[#3B5147]/15 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#3B5147]/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2"
                >
                  <Icon className="h-6 w-6 text-[#3B5147]" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-[#111814]/62">{copy}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3B5147]">
                    {cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Real Care Underneath the Mission</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Care-first only means something when real care exists.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#111814]/68">
                ValorWell operates real mental-health care and clinician
                infrastructure. That gives people a place to receive care and
                gives the wider mission operating substance instead of slogans.
              </p>
              <p className="mt-4 leading-7 text-[#111814]/62">
                CHAMPVA is the active general care pathway where licensed
                clinician availability, capacity, pathway verification, and
                clinical fit align. VA Community Care remains clinician- and
                region-specific. TRICARE is not currently active.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  to="/get-care"
                  event="homepage_clinic_care"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white"
                >
                  Find Mental Health Care
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  to="/clinicians"
                  event="homepage_clinic_clinicians"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#3B5147]/30 px-5 py-3 text-sm font-bold text-[#3B5147]"
                >
                  Work With ValorWell
                </TrackedLink>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] shadow-lg">
                <img
                  src={valorwellClinic.url}
                  alt="ValorWell mental health care"
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="mx-auto max-w-4xl">
              <Eyebrow>Founder Standard</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                We&apos;re not interested in talking around broken systems.
                We&apos;re building through them.
              </h2>
              <p className="mt-7 text-lg leading-8 text-[#111814]/68">
                ValorWell exists because too many people are forced to become
                experts in systems they never should have had to navigate alone.
                We cannot fix every system at once. We can build better paths,
                operate real care, show what is working, admit what is not
                finished, and give more attention to people doing real work.
              </p>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.14em] text-[#3B5147]">
                Luke — Founder, ValorWell · Host, Beyond The Yellow
              </p>
              <TrackedLink
                to="/mission"
                event="homepage_founder_mission"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
              >
                Why ValorWell Exists
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="bg-[#3B5147] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">
              Start Where You Fit
            </p>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Watch the work. Find care. Join the people doing something.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
              ValorWell is building better systems in public. Start with the
              part that matters to you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedLink
                to="/watch"
                event="homepage_final_watch"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#3B5147]"
              >
                Watch ValorWell
              </TrackedLink>
              <TrackedLink
                to="/mission"
                event="homepage_final_mission"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/35 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Why ValorWell Exists
              </TrackedLink>
              <TrackedLink
                to="/get-care"
                event="homepage_final_care"
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
