import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
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
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";

type WorkCard = {
  title: string;
  copy: string;
  cta: string;
  to: string;
  event: string;
  Icon: LucideIcon;
};

const workCards: WorkCard[] = [
  {
    title: "Care",
    copy: "Real mental-health care, clinician infrastructure, access pathways, and the operating systems required to make support usable.",
    cta: "Find Care",
    to: "/get-care",
    event: "about_care",
    Icon: Stethoscope,
  },
  {
    title: "Impact",
    copy: "In 2026, ValorWell Foundation supporters have funded 540+ hours of direct therapy for 45+ veterans across 11 states.",
    cta: "See Impact",
    to: "/impact",
    event: "about_impact",
    Icon: Eye,
  },
  {
    title: "Community",
    copy: "Beyond The Yellow, Watch, Network, partnerships, guests, viewers, and supporters connecting around useful action.",
    cta: "Explore Beyond The Yellow",
    to: "/beyond-the-yellow",
    event: "about_community",
    Icon: Network,
  },
];

function Eyebrow({ children, yellow = false }: { children: ReactNode; yellow?: boolean }) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] ${
        yellow ? "text-[#D7A92E]" : "text-[#3B5147]"
      }`}
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
      onClick={() => trackHomeEvent(event, { page: "about" })}
      className={className}
    >
      {children}
    </Link>
  );
}

export default function AboutPage() {
  useEffect(() => {
    trackHomeEvent("about_page_view", { page: "about" });
  }, []);

  return (
    <Layout>
      <SEO
        title="About ValorWell | Care, Impact & Community"
        description="Learn what ValorWell is building around veteran and family mental well-being through real care, transparent impact, Beyond The Yellow, and community action."
        canonical="/about"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About ValorWell", url: "/about" },
        ]}
      />

      <div className="about-theme bg-[#F4F1E8] text-[#111814]">
        <style>{`
          .about-theme {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .about-theme h1,
          .about-theme h2,
          .about-theme h3,
          .about-theme h4 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.025em;
          }
        `}</style>

        <section className="relative overflow-hidden border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-36 -top-40 h-96 w-96 rounded-full bg-[#D7A92E]/[0.08] blur-3xl" />
            <div className="absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#3B5147]/[0.08] blur-3xl" />
          </div>

          <div className="container-wide relative py-16 md:py-24 lg:py-28">
            <div className="max-w-5xl">
              <Eyebrow>About ValorWell</Eyebrow>
              <h1 className="mt-6 text-4xl font-bold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                ValorWell is building better systems around mental well-being, care, and community action.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#111814]/70 md:text-xl">
                The work starts with veterans and families because that is where ValorWell&apos;s current public focus is most concrete. We operate real mental-health care, show what can be verified, and build community around people and organizations doing useful work.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <TrackedLink
                  to="/mission"
                  event="about_hero_mission"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#31443B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2"
                >
                  Why ValorWell Exists
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  to="/watch"
                  event="about_hero_watch"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#3B5147]/30 px-6 py-3 text-sm font-bold text-[#3B5147] transition hover:bg-white/60"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Watch ValorWell
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow yellow>What ValorWell Is</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Not one program. One organization doing three different jobs.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-8 text-white/72">
                ValorWell is easier to understand when the work is separated by what it is supposed to accomplish. Care makes support usable. Impact makes proof visible. Community makes useful action easier to find and join.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Those layers are connected, but they are not interchangeable. A media feature is not clinical care. A donation by itself is not proof of impact. A partnership is not an outcome. Keeping those distinctions clear is part of how ValorWell protects trust.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>How the Work Fits Together</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Care. Impact. Community.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                Each layer solves a different part of the same problem: helping people reach something useful, understand what is real, and find a meaningful next step.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {workCards.map(({ title, copy, cta, to, event, Icon }) => (
                <article key={title} className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8">
                  <Icon className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                  <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-7 text-[#111814]/64">{copy}</p>
                  <TrackedLink
                    to={to}
                    event={event}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Where the Work Starts</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Veterans and families are the current public priority. The standard is broader than one population.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#111814]/68">
                ValorWell&apos;s current care and public-system work is concentrated around veterans and their families. That focus gives the organization a real place to operate, learn, improve, and build infrastructure instead of keeping the mission abstract.
              </p>
              <p className="mt-4 max-w-3xl leading-7 text-[#111814]/62">
                Beyond The Yellow carries the same action-first standard into a wider community. Veteran-serving and military-family organizations are a priority, but the series can spotlight useful work in other cause areas too.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8">
                <HeartHandshake className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">
                  Beyond The Yellow Standard
                </p>
                <blockquote className="mt-4 text-2xl font-bold leading-snug">
                  Support is not a symbol. Support is behavior.
                </blockquote>
                <p className="mt-5 leading-7 text-[#111814]/64">
                  If the support stopped tomorrow, would anyone be worse off? Would they even know?
                </p>
                <TrackedLink
                  to="/beyond-the-yellow"
                  event="about_focus_bty"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Explore Beyond The Yellow
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow yellow>How ValorWell Tries to Operate</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                The standard matters as much as the ambition.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {[
                  "Put real infrastructure underneath the promise before treating it like a solved problem.",
                  "Describe what is active, limited, blocked, or unfinished instead of making every pathway sound ready.",
                  "Use evidence before persuasive impact numbers and keep definitions and time periods understandable.",
                  "Keep financial support separate from clinical judgment, editorial selection, referrals, and partnership status.",
                ].map((item) => (
                  <div key={item} className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#D7A92E]" aria-hidden="true" />
                    <p className="leading-7 text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3B5147]/10">
                <Users className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
              </div>
            </div>
            <div className="lg:col-span-8">
              <Eyebrow>Founder</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Luke — Founder, ValorWell · Host, Beyond The Yellow
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#111814]/68">
                The founder role is intentionally visible because ValorWell is built in public. Founder-led content explains decisions, friction, changes, and the work behind the organization instead of presenting ValorWell as a finished system with every answer already solved.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <TrackedLink
                  to="/mission"
                  event="about_founder_mission"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Read the Mission
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  to="/watch"
                  event="about_founder_watch"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Watch ValorWell
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#111814] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <Eyebrow yellow>Start Where You Fit</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Understand the mission. See the proof. Find care. Join the work.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedLink
                to="/mission"
                event="about_final_mission"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#111814]"
              >
                Mission
              </TrackedLink>
              <TrackedLink
                to="/impact"
                event="about_final_impact"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Impact
              </TrackedLink>
              <TrackedLink
                to="/get-care"
                event="about_final_care"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Find Care
              </TrackedLink>
              <TrackedLink
                to="/support"
                event="about_final_support"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Support ValorWell
              </TrackedLink>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
