import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Play,
  Flag,
  Megaphone,
  Radio,
  Wrench,
  Users,
  Handshake,
  Stethoscope,
  Video,
  Share2,
  UserPlus,
  Heart,
  Compass,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { trackHomeEvent } from "@/lib/tracking";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "mission", ...params });

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

function CalloutQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border-l-4 border-accent bg-[hsl(var(--section-alt))] px-6 py-8 md:px-10 md:py-10">
      <p className="text-2xl font-semibold leading-snug text-foreground md:text-3xl">
        {children}
      </p>
    </div>
  );
}

interface Path {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  href: string;
  event: string;
}

const participationPaths: Path[] = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Veteran or Family Member",
    desc: "Understand the care-first mission, explore OCS, watch the build, and find the right next path.",
    cta: "Explore Veteran Support",
    href: "/veterans",
    event: "mission_route_veteran",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Viewer / Follower",
    desc: "Watch the mission, share useful content, and help the right people discover the work.",
    cta: "Watch ValorWell",
    href: "/watch",
    event: "mission_route_viewer",
  },
  {
    icon: <Megaphone className="h-5 w-5" />,
    title: "Beyond The Yellow Guest or Nominator",
    desc: "Know someone doing real work — or are you doing the work yourself?",
    cta: "Share a Beyond The Yellow Story",
    href: "/beyondtheyellow",
    event: "mission_route_bty",
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Clinician",
    desc: "Help build ethical, care-first support and stronger clinical infrastructure.",
    cta: "Join the Clinician Mission",
    href: "/clinicians",
    event: "mission_route_clinician",
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "Organization / Partner",
    desc: "Bring collaboration, distribution, access, relationships, or aligned infrastructure.",
    cta: "Partner With ValorWell",
    href: "/partner",
    event: "mission_route_partner",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Supporter / Sponsor",
    desc: "Help the education, content, infrastructure, and mission reach farther — without buying influence or fake recognition.",
    cta: "Explore Support Opportunities",
    href: "/partner",
    event: "mission_route_support",
  },
  {
    icon: <Video className="h-5 w-5" />,
    title: "Creator / Media",
    desc: "Help useful stories, practical education, and mission content reach new audiences.",
    cta: "Collaborate With ValorWell",
    href: "/partner",
    event: "mission_route_creator",
  },
  {
    icon: <UserPlus className="h-5 w-5" />,
    title: "Connector",
    desc: "Know a clinician, veteran organization, funder, sponsor, creator, or partner ValorWell should meet?",
    cta: "Make an Introduction",
    href: "/partner",
    event: "mission_route_connector",
  },
];

export default function MissionPage() {
  useEffect(() => {
    track("mission_page_view");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>ValorWell Mission | Building Better Systems for Veterans, Families, and Human Well-Being</title>
        <meta
          name="description"
          content="See how ValorWell is building a care-first path for veterans and families through Operation Claims Success, Beyond The Yellow, public content, and real clinical infrastructure."
        />
        <link rel="canonical" href="https://valorwell.org/mission" />
        <meta property="og:title" content="ValorWell Mission | Building Better Systems" />
        <meta property="og:description" content="Care-first, not letter-first. Watch ValorWell build a better path for veterans and families." />
        <meta property="og:url" content="https://valorwell.org/mission" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main>
        {/* 1. HERO */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-[hsl(var(--section-alt))] to-background">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Eyebrow>The ValorWell Mission</Eyebrow>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
                We build better paths through systems people should not have to navigate alone.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                ValorWell is a mission-driven mental well-being organization building better systems around human well-being, care access, ethical support, and real community action.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Our biggest public mission right now is helping transform the way veterans and families navigate mental health care, VA-aligned access, and predatory documentation systems.
              </p>

              <p className="mt-8 inline-block rounded-md bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-foreground/90">
                Mission first. Real infrastructure underneath it. The work built in public.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/watch"
                  onClick={() => track("mission_hero_watch")}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Play className="h-4 w-4" /> Watch the Mission Being Built
                </Link>
                <Link
                  to="/operation-claims-success"
                  onClick={() => track("mission_hero_ocs")}
                  className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-6 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Explore Operation Claims Success <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Need mental health care?{" "}
                <Link
                  to="/get-care"
                  onClick={() => track("mission_hero_care")}
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-accent"
                >
                  Find care.
                </Link>
              </p>
            </div>

            {/* Editorial text-led hero side */}
            <aside className="lg:col-span-4">
              <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Built in public</p>
                <p className="mt-4 text-2xl font-semibold leading-snug text-foreground">
                  “We are not selling the shortcut. We are building the better path.”
                </p>
                <div className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                  Luke — Founder, ValorWell &middot; Host, Beyond The Yellow
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 2. WHAT WE BELIEVE */}
        <section className="border-b border-border/60 py-20 md:py-28">
          <div className="container-wide grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>What We Believe</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Support should be felt by the people it is supposed to help.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                ValorWell believes awareness matters only when someone is willing to carry the work farther. Real support takes time, skill, access, infrastructure, care, resources, or relationships and turns them into something another person would actually miss if it stopped.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                That belief shapes how we think about mental well-being, veteran support, clinical care, public education, media, partnerships, and community action.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ol className="space-y-6">
                {[
                  ["Action Over Symbolism", "Caring publicly is not the finish line. The work has to reach someone."],
                  ["Care Before Transactions", "People come before paperwork, documentation, shortcuts, and outcome promises."],
                  ["Build the Infrastructure", "When a system is confusing or broken, awareness alone does not solve the navigation problem."],
                  ["Tell the Truth Louder", "We can promote the mission aggressively without pretending we control outcomes or have finished work that is still being built."],
                ].map(([title, desc], i) => (
                  <li key={title} className="flex gap-5 border-b border-border/60 pb-6 last:border-none">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                      <p className="mt-1 text-muted-foreground">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10">
                <CalloutQuote>
                  The question is not whether we care. The question is what changes because we cared.
                </CalloutQuote>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE CURRENT PROBLEM */}
        <section className="border-b border-border/60 bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl">
              <Eyebrow>Where We're Starting</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Veterans and families are forced to figure out too much alone.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Mental health care access, VA-aligned pathways, provider availability, documentation questions, and confusing systems can leave veterans and families stuck between delays and expensive shortcuts.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Confusion creates desperation. Desperation creates an opening for transactional models that put the letter before the person.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                ValorWell is starting here because this is a problem where real care, honest education, provider infrastructure, ethical clinical standards, media, and community relationships can work together.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                ["Confusing Access", "People often do not know what pathway is legitimate, what questions to ask, or where responsibility changes from one system to another."],
                ["Delayed Care", "When legitimate care feels difficult to reach, desperation makes shortcuts more attractive."],
                ["Transactional Documentation", "Documentation can become separated from care and marketed as though a purchased artifact can guarantee an outside decision."],
                ["Families Carry the Confusion Too", "Veterans are not the only people affected. Families often absorb the stress, navigation burden, and uncertainty around broken support pathways."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-background p-6">
                  <h3 className="text-lg font-semibold text-foreground">{t}</h3>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. THE CURRENT MISSION */}
        <section className="border-b border-border/60 py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl">
              <Eyebrow>The Mission Right Now</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Build the better care-first path for veterans and families.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                ValorWell's current primary public mission is transforming how veterans and their families navigate mental health care access, VA-aligned pathways, and predatory documentation ecosystems.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                The goal is not to create another shortcut company. The goal is to build a better system around real care, legitimate access education, provider pathways, ethical clinical support, and documentation only when clinically appropriate.
              </p>
            </div>

            {/* Mission formula */}
            <div className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">The mission formula</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-lg font-semibold text-foreground md:text-xl">
                {[
                  "Honest education",
                  "Real care",
                  "Provider infrastructure",
                  "Ethical documentation",
                  "Public accountability",
                ].map((piece, i, arr) => (
                  <span key={piece} className="flex items-center gap-3">
                    <span className="rounded-lg bg-background px-4 py-2 shadow-sm ring-1 ring-border">{piece}</span>
                    {i < arr.length - 1 && <span className="text-accent">+</span>}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-lg text-muted-foreground">
                That is the better path ValorWell is building.
              </p>
              <div className="mt-8">
                <Link
                  to="/operation-claims-success"
                  onClick={() => track("mission_current_focus_view")}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Explore Operation Claims Success <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              ValorWell does not guarantee VA Community Care authorization, referrals, Nexus Letters, disability ratings, service connection, claim approval, or any VA outcome.
            </p>
          </div>
        </section>

        {/* 5. OPERATION CLAIMS SUCCESS — mission spine */}
        <section className="border-b border-border/60 bg-primary text-primary-foreground py-20 md:py-28">
          <div className="container-wide">
            <div className="flex items-center gap-3">
              <Flag className="h-5 w-5 text-accent" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">The Public Mission Spine</p>
            </div>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Care first. Not letter first.
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-primary-foreground/85">
              Operation Claims Success is the flag ValorWell is planting in the ground right now. It is our work to build a care-first alternative to predatory veteran documentation models and to make the better pathway visible while the infrastructure is built responsibly.
            </p>
            <p className="mt-4 max-w-3xl text-lg text-primary-foreground/85">
              OCS connects honest VA-aligned access education, provider pathway work, real mental health care, ethical clinical systems, and documentation when clinically appropriate.
            </p>

            <div className="mt-10 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-8">
              <p className="text-2xl font-semibold md:text-3xl">
                We are not selling the shortcut. We are building the better path.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Category Definition", "Make it clear what ValorWell stands for and what we refuse to become."],
                ["Infrastructure Build", "Document provider registration, pathways, blockers, and repeatable systems over time."],
                ["Veteran / Family Education", "Explain confusing systems honestly without promising access or VA outcomes."],
                ["Clinician Mission", "Recruit clinicians who want to help build ethical, care-first support rather than simply fill appointment slots."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6">
                  <h3 className="text-base font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/75">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/operation-claims-success"
                onClick={() => track("mission_ocs_explore")}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90"
              >
                Explore Operation Claims Success <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/watch"
                onClick={() => track("mission_ocs_follow_build")}
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                Follow the Build <Play className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. BUILD IN PUBLIC */}
        <section className="border-b border-border/60 py-20 md:py-28">
          <div className="container-wide grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Public by Design</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                We're showing what we're building, what is blocked, and what we still have to learn.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Better systems need more than internal meetings and private plans. ValorWell is using founder-led content, practical education, progress updates, and public mission content to explain the problem, show the work, attract the right people, and create accountability around the build.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                We will tell the truth louder. We will not pretend unfinished infrastructure is complete.
              </p>
              <Link
                to="/watch"
                onClick={() => track("mission_build_watch")}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Play className="h-4 w-4" /> Watch the Build
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: <Wrench className="h-5 w-5" />, t: "Show the Work", d: "Explain what ValorWell is actively building and why it matters." },
                  { icon: <ShieldCheck className="h-5 w-5" />, t: "Name the Blockers", d: "Be honest about what is controlled by ValorWell and what depends on outside systems." },
                  { icon: <Compass className="h-5 w-5" />, t: "Share What We Learn", d: "Turn hard-won understanding into education, content, and repeatable processes." },
                  { icon: <Users className="h-5 w-5" />, t: "Attract the Right People", d: "Use transparency to find clinicians, veteran organizations, creators, supporters, partners, and connectors who can move the work farther." },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-border bg-card p-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
                      {x.icon}
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">{x.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. BEYOND THE YELLOW */}
        <section className="relative border-b border-border/60 py-20 md:py-28">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-yellow-400" aria-hidden />
          <div className="container-wide">
            <div className="flex items-center gap-3">
              <Megaphone className="h-5 w-5 text-yellow-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-700 dark:text-yellow-500">The Movement Standard</p>
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Support is not a symbol. Support is behavior.
            </h2>

            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4 text-lg text-muted-foreground">
                <p>
                  Beyond The Yellow is the broad ValorWell-powered movement that takes our action-first worldview beyond ValorWell's own work.
                </p>
                <p>
                  It spotlights people and organizations taking real action for their communities and asks one hard question: if the support stopped tomorrow, would anyone be worse off? Would they even know?
                </p>
                <p>
                  Operation Claims Success is one of ValorWell's clearest examples of going Beyond The Yellow: not just saying veterans deserve better, but building a care-first alternative.
                </p>
                <p>
                  Beyond The Yellow then turns the lens outward. It gives other people doing real work a platform, helps their stories travel, borrows audience through real relationships, and makes action feel contagious.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-50 p-8 dark:bg-yellow-950/20">
                  <p className="text-2xl font-bold leading-snug text-foreground md:text-3xl">
                    People are out there actually doing something. Go be one of them.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/watch"
                onClick={() => track("mission_bty_watch")}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Play className="h-4 w-4" /> Watch Beyond The Yellow
              </Link>
              <Link
                to="/beyondtheyellow"
                onClick={() => track("mission_bty_story")}
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-6 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Share Your Beyond The Yellow Story
              </Link>
              <Link
                to="/beyondtheyellow"
                onClick={() => track("mission_bty_go")}
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-foreground underline underline-offset-4 hover:text-accent"
              >
                Go Beyond The Yellow <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 8. CONTENT ENGINE */}
        <section className="border-b border-border/60 bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl">
              <Eyebrow>How the Mission Travels</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Media is not a side function. It is part of how the mission grows.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                People cannot follow, support, join, share, or partner with a mission they do not understand. ValorWell uses content to make the work visible, useful, and easy to carry into new audiences.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: <Megaphone className="h-5 w-5" />, tag: "Borrowed audience", t: "Beyond The Yellow Interviews", d: "Spotlight real action, create guest value, and bring new people into ValorWell's orbit." },
                { icon: <Video className="h-5 w-5" />, tag: "Trust & positioning", t: "ValorWell Long-Form Video", d: "Explain the mission, OCS, practical help, what is being built, and what ValorWell refuses to become." },
                { icon: <Share2 className="h-5 w-5" />, tag: "Reach & distribution", t: "Short-Form Content", d: "Carry the strongest ideas, lessons, stories, and practical tools farther." },
                { icon: <Radio className="h-5 w-5" />, tag: "Owned home", t: "The Website", d: "Give the audience a place to watch, understand, return, choose a lane, and act." },
              ].map((x, i) => (
                <div key={x.t} className="relative rounded-xl border border-border bg-background p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
                      {x.icon}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">0{i + 1}</span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">{x.tag}</p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{x.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/watch"
                onClick={() => track("mission_content_watch")}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Play className="h-4 w-4" /> Watch ValorWell
              </Link>
            </div>
          </div>
        </section>

        {/* 9. OPERATING ENGINE */}
        <section className="border-b border-border/60 py-20 md:py-28">
          <div className="container-wide grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>The Infrastructure Underneath the Mission</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Care-first only means something if real care exists underneath it.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                ValorWell operates real mental health care because the broader mission needs legitimate clinical infrastructure. The clinic creates care relationships, clinician capacity, clinical context, operating revenue, and the ability to build responsibly around problems that involve mental well-being.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                The clinic is essential. It is the operating engine. It is not the master public identity of ValorWell.
              </p>
              <div className="mt-8">
                <CalloutQuote>
                  The mission is bigger than the clinic. The clinic makes the mission real.
                </CalloutQuote>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/get-care"
                  onClick={() => track("mission_care_click")}
                  className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-6 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Find Mental Health Care <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/clinicians"
                  onClick={() => track("mission_clinician_click")}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Join the Clinician Mission
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { t: "Deliver Real Care", d: "Provide legitimate mental health support through clinical relationships and mission-aligned professionals." },
                  { t: "Create Clinical Context", d: "Make care-first and clinically appropriate documentation standards operational rather than rhetorical." },
                  { t: "Build Provider Capacity", d: "Recruit, coordinate, and support clinicians who can participate in the larger mission." },
                  { t: "Create Operating Capacity", d: "Care delivery and revenue help ValorWell continue building the wider system." },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="text-base font-semibold text-foreground">{x.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. VALORWELL SYSTEM COMPOUNDS */}
        <section className="border-b border-border/60 bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl">
              <Eyebrow>The ValorWell System</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Each part of ValorWell should make the other parts stronger.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                ValorWell is not trying to build disconnected programs. The goal is a system where public mission, real action, media, relationships, care infrastructure, and operating capacity reinforce each other.
              </p>
            </div>

            <ol className="mt-12 space-y-4">
              {[
                { t: "Operation Claims Success", d: "Defines the mission tension and plants the flag." },
                { t: "Build in Public", d: "Explains the work, names the blockers, and builds trust." },
                { t: "Beyond The Yellow", d: "Borrows audience and grows movement energy through real action." },
                { t: "Short-Form Distribution", d: "Expands reach — the strongest ideas travel farther." },
                { t: "The Website", d: "Captures attention and routes people into the right lane." },
                { t: "The People Who Show Up", d: "Clinicians, veterans, families, partners, supporters, sponsors, creators, and connectors enter the system." },
                { t: "Clinical & Operating Infrastructure", d: "Creates the real capacity to keep building — and loops back into the mission." },
              ].map((s, i, arr) => (
                <li key={s.t} className="relative rounded-xl border border-border bg-background p-6 md:flex md:items-center md:gap-6">
                  <div className="flex flex-none items-center gap-4 md:w-72">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{s.t}</h3>
                  </div>
                  <p className="mt-3 text-muted-foreground md:mt-0">{s.d}</p>
                  {i === arr.length - 1 && (
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent md:ml-auto md:mt-0">
                      Loops back into the mission ↺
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 11. CHOOSE HOW YOU ENTER */}
        <section className="border-b border-border/60 py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                You do not need to fit one type of supporter to matter here.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start with what you can bring or what brought you here.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {participationPaths.map((p) => (
                <Link
                  key={p.title}
                  to={p.href}
                  onClick={() => track(p.event)}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                    {p.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 12. FOUNDER VOICE */}
        <section className="border-b border-border/60 bg-primary text-primary-foreground py-20 md:py-28">
          <div className="container-wide grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Founder</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                We're not interested in talking around broken systems. We're building through them.
              </h2>
              <div className="mt-6 space-y-4 text-lg text-primary-foreground/85">
                <p>
                  ValorWell started with a simple frustration: too many people need real support, and too many systems make reaching that support harder than it should be.
                </p>
                <p>
                  We cannot fix every system overnight. We can build better pathways, recruit the right clinicians, explain what we learn, challenge predatory models, spotlight people taking real action, and put real work behind the causes we say matter.
                </p>
                <p className="font-semibold text-primary-foreground">
                  That's the standard behind ValorWell.
                </p>
              </div>
              <Link
                to="/watch"
                onClick={() => track("mission_founder_watch")}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90"
              >
                <Play className="h-4 w-4" /> Watch the Mission Being Built
              </Link>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-6">
                <div className="text-6xl font-bold leading-none text-accent">L</div>
                <div className="mt-6">
                  <div className="text-lg font-semibold">Luke</div>
                  <div className="text-sm text-primary-foreground/70">Founder, ValorWell</div>
                  <div className="text-sm text-primary-foreground/70">Host, Beyond The Yellow</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. FINAL CTA */}
        <section className="py-20 md:py-28">
          <div className="container-wide text-center">
            <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Watch the work. Join the mission. Bring what you can.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Better systems are built by people willing to stop at something broken and do more than complain about it.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/watch"
                onClick={() => track("mission_final_watch")}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Play className="h-4 w-4" /> Watch the Mission Being Built
              </Link>
              <Link
                to="/operation-claims-success"
                onClick={() => track("mission_final_ocs")}
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-6 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Explore Operation Claims Success
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              {[
                { label: "Share a Beyond The Yellow Story", href: "/beyondtheyellow", event: "mission_final_bty" },
                { label: "Join the Clinician Mission", href: "/clinicians", event: "mission_final_clinician" },
                { label: "Partner With ValorWell", href: "/partner", event: "mission_final_partner" },
                { label: "Find Care", href: "/get-care", event: "mission_final_care" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => track(l.event)}
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-accent"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-[hsl(var(--section-alt))] px-8 py-8">
              <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">
                Real care is the operating engine. Better systems are the mission. Real action is the standard.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
