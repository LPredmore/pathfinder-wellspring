import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Eye,
  Handshake,
  HeartHandshake,
  Megaphone,
  Mic2,
  PlayCircle,
  Share2,
  Sparkles,
  Target,
  Users,
  Video,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BtyNominationForm } from "@/components/intake/BtyNominationForm";
import { UnifiedBtyForm } from "@/components/intake/UnifiedBtyForm";
import { trackHomeEvent } from "@/lib/tracking";

const FORM_ANCHOR = "bty-guest-interest";
const LATEST_VIDEO_URL = "https://www.youtube.com/watch?v=zsaTKjNVeew";

type LaneValue = "share-story" | "nominate";
type EyebrowTone = "yellow" | "navy" | "red";

const featuredOrganizations = [
  {
    name: "GallantFew",
    route: "/gallantfew",
    statement: "Helping veterans find direction, connection, and purpose after military service.",
  },
  {
    name: "Veterans Outreach of Wisconsin",
    route: "/VOW",
    statement: "Tiny homes, food access, peer support, and a path back to permanent stability.",
  },
  {
    name: "Military Missions in Action",
    route: "/mmia",
    statement: "Ramps, furnished homes, transportation, and practical help veterans can actually feel.",
  },
  {
    name: "VETS2INDUSTRY",
    route: "/vets2industry",
    statement: "Making the enormous ecosystem of military resources easier to find and actually use.",
  },
];

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, {
    page: "beyond-the-yellow",
    phase: "active-series",
    ...params,
  });

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  element.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
};

function Eyebrow({
  children,
  tone = "yellow",
}: {
  children: ReactNode;
  tone?: EyebrowTone;
}) {
  const toneClass =
    tone === "red"
      ? "text-accent"
      : tone === "navy"
        ? "text-[hsl(var(--navy))]"
        : "text-[hsl(var(--gold-accent))]";

  return (
    <p className={`text-xs font-bold uppercase tracking-[0.22em] ${toneClass}`}>
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

const faqs = [
  {
    value: "cost",
    question: "Is there a cost to be featured?",
    answer:
      "No. There is no fee to submit an organization, be selected, record the conversation, or participate as an editorial guest. Beyond The Yellow is not pay-to-play media, and sponsorship cannot buy a feature or influence selection.",
  },
  {
    value: "promotion",
    question: "Does ValorWell really put paid promotion behind the feature?",
    answer:
      "Selected Beyond The Yellow stories may receive paid promotional support from ValorWell to help more people discover the work. The purpose is to reduce the pressure on mission-driven organizations to divert service dollars into advertising. Promotion does not guarantee a particular number of views, donations, volunteers, referrals, or other outcomes.",
  },
  {
    value: "receive",
    question: "What does my organization receive if selected?",
    answer:
      "The core feature includes a produced long-form Beyond The Yellow conversation and a permanent editorial feature page on ValorWell. The conversation may also support promotional clips, quotes, social posts, and other campaign assets depending on the production plan for that feature.",
  },
  {
    value: "selection",
    question: "How are organizations selected?",
    answer:
      "Beyond The Yellow is curated. We look for veteran and military-connected organizations doing tangible work, a clear story behind that work, a useful conversation for viewers, and a mission that would benefit from greater visibility. Not every submission will become a feature.",
  },
  {
    value: "time",
    question: "How much time does participation require?",
    answer:
      "The main commitment is a prerecorded remote conversation plus reasonable coordination before and after production. If an organization is selected, we discuss the exact format, timing, guest expectations, and promotional plan before recording.",
  },
  {
    value: "cta",
    question: "Can we talk about donating, volunteering, or supporting our organization?",
    answer:
      "Yes. If the work is the reason for the feature, viewers should also know how to support it. Guests can explain how people can donate, volunteer, refer veterans, partner, participate, or otherwise help. The conversation still needs to remain a real editorial discussion rather than becoming an infomercial.",
  },
  {
    value: "sharing",
    question: "Can our organization share the finished video and feature?",
    answer:
      "Yes. Beyond The Yellow is designed to give selected organizations something useful to point people toward. Specific recording, editing, publication, promotional use, and content-rights expectations are discussed before production.",
  },
  {
    value: "guarantee",
    question: "Does paid promotion guarantee a certain result?",
    answer:
      "No. Paid promotion can create additional opportunities for discovery, but it cannot guarantee views, donations, volunteer signups, referrals, partnerships, press coverage, or any other specific outcome. We would rather be precise about that than promise numbers we cannot control.",
  },
];

export default function BeyondTheYellowPage() {
  const [selectedLane, setSelectedLane] = useState<LaneValue>("share-story");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("form");
    if (requested !== "guest" && requested !== "nomination") return;
    setSelectedLane(requested === "nomination" ? "nominate" : "share-story");
    window.setTimeout(() => scrollToId(FORM_ANCHOR), 120);
  }, []);

  useEffect(() => {
    track("bty_page_view");
    const hero = document.getElementById("bty-hero");
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const chooseLane = (lane: LaneValue, event: string) => {
    setSelectedLane(lane);
    track(event, { lane });
    window.setTimeout(() => scrollToId(FORM_ANCHOR), 40);
  };

  const apply = (event: string) => {
    setSelectedLane("share-story");
    track(event, { lane: "share-story" });
    window.setTimeout(() => scrollToId(FORM_ANCHOR), 40);
  };

  return (
    <>
      <Helmet>
        <title>Beyond The Yellow | Visibility for Veteran Nonprofits | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow features veteran organizations doing work worth seeing, tells the story behind their impact, and puts promotional support behind selected features so more people can discover them."
        />
        <meta
          property="og:title"
          content="You Put the Money Into the Mission. We’ll Help Put Attention Behind the Story."
        />
        <meta
          property="og:description"
          content="Beyond The Yellow gives mission-first veteran organizations a way to earn visibility without diverting service dollars into advertising."
        />
        <meta
          property="og:image"
          content="https://i.ytimg.com/vi/zsaTKjNVeew/maxresdefault.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/beyondtheyellow" />
      </Helmet>

      <Header />
      <main id="main" className="bg-background">
        <section
          id="bty-hero"
          className="relative overflow-hidden border-b border-white/10 bg-[hsl(var(--navy))] text-white"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-20 -top-24 h-[30rem] w-[30rem] rounded-full bg-[hsl(var(--gold-accent))]/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Beyond The Yellow · For veteran organizations doing the work</Eyebrow>
              <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.035em] md:text-6xl lg:text-7xl">
                You put the money into the mission.
                <span className="mt-2 block text-[hsl(var(--gold-accent))]">
                  We’ll help put attention behind the story.
                </span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/82 md:text-xl">
                Some of the best veteran nonprofits receive the least publicity for a simple reason: they spend their money helping veterans instead of advertising themselves. Beyond The Yellow features organizations creating real impact, tells the story behind their work, and puts promotional support behind selected stories so more people can find them.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => apply("bty_hero_guest")}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-black text-[hsl(var(--navy))] shadow-lg transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Get Your Organization Featured
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a
                  href={LATEST_VIDEO_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("bty_hero_latest_video")}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Watch the Latest Feature
                </a>
              </div>
              <p className="mt-5 text-sm text-white/55">
                No fee to apply. No fee to be featured. 
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-accent))]">
                      Already featured
                    </p>
                    <p className="mt-2 text-2xl font-black tracking-tight">
                      The archive is growing.
                    </p>
                  </div>
                  <Eye className="h-7 w-7 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                </div>
                <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
                  {featuredOrganizations.map((org) => (
                    <a
                      key={org.name}
                      href={org.route}
                      onClick={() => track("bty_featured_org_click", { organization: org.name })}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="font-bold text-white/85 transition group-hover:text-white">
                        {org.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-6 text-white/60">
                  Strong organizations are already being documented, promoted, and added to the permanent Beyond The Yellow record. The natural question is whether your work belongs there too.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-black shadow-2xl">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube-nocookie.com/embed/zsaTKjNVeew?rel=0"
                    title="Latest Beyond The Yellow feature: GallantFew"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Eyebrow tone="navy">Latest Beyond The Yellow feature</Eyebrow>
              <SectionHeading>GallantFew</SectionHeading>
              <p className="mt-3 text-2xl font-bold leading-tight text-[hsl(var(--navy))]">
                The mission ends. The need for direction doesn’t.
              </p>
              <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
                Founder Karl Monger talks about what happens when military structure, identity, accountability, and mission disappear—and how GallantFew helps veterans reconnect, find direction, and deliberately build what comes next.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={LATEST_VIDEO_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("bty_latest_watch")}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Watch GallantFew
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="/videos"
                  onClick={() => track("bty_view_archive")}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-bold text-foreground transition hover:border-[hsl(var(--navy))]/40"
                >
                  View Past Features
                  <Video className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="/gallantfew"
                  onClick={() => track("bty_latest_feature_story")}
                  className="inline-flex items-center gap-2 px-1 py-3 text-sm font-bold text-[hsl(var(--navy))]"
                >
                  Read the feature
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow tone="navy">The visibility problem</Eyebrow>
              <SectionHeading>
                Some of the organizations most worth discovering are the least advertised.
              </SectionHeading>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
                Nonprofits face an uncomfortable tradeoff. Advertising can bring attention, donors, volunteers, referrals, and partners—but the same money could also feed another family, build another ramp, fund another counseling session, provide another ride, or keep another veteran housed.
              </p>
              <p className="mx-auto mt-5 max-w-3xl text-xl font-bold leading-8 text-foreground">
                Good organizations often choose the mission. The consequence is that extraordinary work can remain nearly invisible.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                [HeartHandshake, "Mission first", "Responsible organizations keep pushing dollars toward direct service instead of marketing overhead."],
                [Eye, "Visibility still matters", "Veterans cannot use a resource they never discover. Donors and volunteers cannot support work they never see."],
                [Megaphone, "That gap can be closed", "Beyond The Yellow gives selected organizations a way to earn attention without turning their own mission budget into an ad budget."],
              ].map(([Icon, title, body]) => (
                <article key={String(title)} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--gold-accent))]/15 text-[hsl(var(--navy))]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-foreground">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{String(body)}</p>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] bg-[hsl(var(--navy))] p-8 text-center text-white md:p-12">
              <p className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Beyond The Yellow exists to help make sure doing the right thing doesn’t make great work invisible.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow tone="navy">What being featured means</Eyebrow>
              <SectionHeading>This isn’t just an interview.</SectionHeading>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                The interview is the raw material. The value comes from turning the work into a story people can understand, find, share, and come back to.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", Mic2, "Conversation", "A long-form discussion gives your organization enough room to explain the problem, the work, who benefits, and why it matters."],
                ["02", Building2, "Feature story", "A permanent editorial page presents the organization as work worth understanding—not as a directory listing or sponsor logo."],
                ["03", Share2, "Promotion", "ValorWell can put paid promotional support behind selected stories rather than expecting the nonprofit to divert mission dollars into advertising."],
                ["04", Eye, "Evergreen discovery", "The organization remains part of the growing Beyond The Yellow archive for veterans, donors, volunteers, partners, and other organizations to discover later."],
              ].map(([number, Icon, title, body]) => (
                <article key={String(number)} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-[0.18em] text-[hsl(var(--gold-accent))]">{String(number)}</span>
                    <Icon className="h-5 w-5 text-[hsl(var(--navy))]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-foreground">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{String(body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/10 bg-[hsl(var(--navy))] py-20 text-white md:py-28">
          <div className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-[hsl(var(--gold-accent))]/12 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Paid promotional support</Eyebrow>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                We don’t ask the nonprofit to buy the spotlight.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Selected Beyond The Yellow features may receive paid promotional support from ValorWell. The point is simple: a mission-first organization should not have to choose between serving one more veteran and giving its work a chance to be discovered.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="space-y-4 rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 md:p-8">
                {[
                  "No fee to apply or participate as an editorial guest.",
                  "Selection is based on impact.",
                  "Promotional support is designed to create more opportunities for discovery.",
                  "That's it. More views and attention for you = more opportunities for donations, volunteers, referrals, or partnerships.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                    <p className="text-sm leading-6 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow tone="navy">The organizations already getting the spotlight</Eyebrow>
                <SectionHeading>See what we’re choosing to put attention behind.</SectionHeading>
              </div>
              <div className="lg:col-span-4">
                <p className="text-base leading-7 text-muted-foreground">
                  These are not sponsor placements. They are examples of the kind of tangible veteran-community work Beyond The Yellow is built to surface.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {featuredOrganizations.map((org) => (
                <a
                  key={org.name}
                  href={org.route}
                  onClick={() => track("bty_case_study_click", { organization: org.name })}
                  className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:border-[hsl(var(--navy))]/35 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">Featured organization</p>
                      <h3 className="mt-3 text-2xl font-black tracking-tight text-foreground">{org.name}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-[hsl(var(--navy))]" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-base leading-7 text-muted-foreground">{org.statement}</p>
                  <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--navy))]">
                    See the feature
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow tone="navy">Does your organization belong here?</Eyebrow>
              <SectionHeading>You do not need a massive marketing budget to be worth finding.</SectionHeading>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                In many cases, the organizations without a large advertising budget or marketing department are exactly the ones we want people to discover.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {[
                  [BadgeCheck, "You serve veterans, military families, or the military-connected community.", "The work is directly relevant to the people Beyond The Yellow is built around."],
                  [HeartHandshake, "Your work creates something people can actually feel.", "Housing, care, food, transportation, employment, connection, access, support, opportunity, or another tangible outcome—not awareness alone."],
                  [Target, "More visibility could help you do more.", "The right veterans, donors, volunteers, supporters, referral partners, employers, or collaborators finding you would matter."],
                ].map(([Icon, title, body]) => (
                  <div key={String(title)} className="flex gap-5 rounded-2xl border border-border bg-card p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--gold-accent))]/15 text-[hsl(var(--navy))]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-foreground">{String(title)}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{String(body)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow tone="navy">Curated on purpose</Eyebrow>
              <SectionHeading>We cannot feature every organization.</SectionHeading>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                Every feature takes interviewing, editing, editorial work, promotion, and permanent presentation. That makes selection part of the value. We are looking for organizations with a clear mission, tangible work, a compelling story, and something viewers should know exists.
              </p>
              <p className="mt-6 text-xl font-black text-[hsl(var(--navy))]">
                If your organization is doing work that deserves to be part of this record, submit it.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[2rem] bg-[hsl(var(--navy))] p-8 text-white shadow-xl">
                <Sparkles className="h-8 w-8 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                <p className="mt-6 text-3xl font-black leading-tight tracking-tight">
                  The strongest FOMO should be simple:
                </p>
                <p className="mt-5 text-lg leading-8 text-white/70">
                  good organizations are being featured, their stories are being promoted, and the archive keeps growing.
                </p>
                <button
                  type="button"
                  onClick={() => apply("bty_curated_guest")}
                  className="mt-7 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-5 py-3 text-sm font-black text-[hsl(var(--navy))]"
                >
                  Submit Your Organization
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id={FORM_ANCHOR}
          className="scroll-mt-24 border-b border-border bg-background py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow tone="navy">Feature consideration</Eyebrow>
              <SectionHeading>Should your organization be one of the next stories people discover?</SectionHeading>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Tell us enough to understand the work, the people it helps, and why more visibility would matter. You do not need a polished media pitch.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                {
                  lane: "share-story" as const,
                  icon: Mic2,
                  title: "Submit my organization",
                  body: "I represent the organization or the person responsible for the work and want to be considered for a feature.",
                },
                {
                  lane: "nominate" as const,
                  icon: Users,
                  title: "Nominate an organization",
                  body: "I know a veteran organization whose work deserves more visibility and should be considered.",
                },
              ].map((item) => {
                const selected = selectedLane === item.lane;
                return (
                  <button
                    key={item.lane}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseLane(item.lane, `bty_lane_${item.lane}`)}
                    className={`rounded-2xl border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--navy))] ${
                      selected
                        ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/12 shadow-md"
                        : "border-border bg-card hover:-translate-y-0.5 hover:border-[hsl(var(--navy))]/40 hover:shadow-md"
                    }`}
                  >
                    <item.icon className="h-6 w-6 text-[hsl(var(--navy))]" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-black text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </button>
                );
              })}
            </div>

            <div className="mx-auto mt-8 max-w-4xl">
              {selectedLane === "nominate" ? (
                <BtyNominationForm key="nominate" />
              ) : (
                <UnifiedBtyForm key={selectedLane} initialLane={selectedLane} />
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <Eyebrow tone="navy">Questions before you submit</Eyebrow>
            <SectionHeading>Straight answers.</SectionHeading>
            <Accordion
              type="single"
              collapsible
              className="mt-10 space-y-3"
              onValueChange={(value) => value && track("bty_faq_expand", { item: value })}
            >
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value} className="rounded-2xl border border-border bg-card px-5">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[hsl(var(--navy))] py-24 text-white md:py-32">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[hsl(var(--gold-accent))]/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl px-4 text-center">
            <Eyebrow>The work is already happening</Eyebrow>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              The organizations doing the most good are not always the organizations getting the most attention.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
              Sometimes that is because they chose to spend the money on the mission instead of the marketing. Beyond The Yellow exists to help make sure that choice does not leave great work invisible.
            </p>
            <button
              type="button"
              onClick={() => apply("bty_final_guest")}
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-7 py-3.5 text-sm font-black text-[hsl(var(--navy))] hover:brightness-95"
            >
              Submit Your Organization
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
      <Footer />

      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => apply("bty_sticky_guest")}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-5 py-3 text-sm font-black text-[hsl(var(--navy))]"
          >
            Get Your Organization Featured
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
