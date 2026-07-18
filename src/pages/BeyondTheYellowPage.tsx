import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleDot,
  Handshake,
  HeartHandshake,
  Megaphone,
  Mic2,
  Network,
  Quote,
  Share2,
  Sparkles,
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

const FORM_ANCHOR = "bty-founding-story-application";
const FOUNDING_STORY_COUNT = 12;

type LaneValue = "share-story" | "nominate" | "promote-valorwell";
type EyebrowTone = "yellow" | "navy" | "red";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "beyond-the-yellow", phase: "founding-stories", ...params });

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
};

function Eyebrow({ children, tone = "yellow" }: { children: ReactNode; tone?: EyebrowTone }) {
  const toneClass =
    tone === "red"
      ? "text-accent"
      : tone === "navy"
        ? "text-[hsl(var(--navy))]"
        : "text-[hsl(var(--gold-accent))]";

  return <p className={`text-xs font-bold uppercase tracking-[0.22em] ${toneClass}`}>{children}</p>;
}

function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

const movementGuide = [
  {
    value: "meaning",
    title: "What does going Beyond The Yellow mean?",
    preview: "Moving from public support into action a real person, family, or community can feel.",
    content: (
      <div className="space-y-4">
        <p>
          The yellow ribbon represents awareness and public support. Beyond The Yellow asks what happens after the symbol.
          Did someone receive care? Was access created? Did a family get help? Did someone give time, skill, resources,
          money, service, infrastructure, or relationships in a way that changed something real?
        </p>
        <p>
          The movement exists to make that work visible and make meaningful action more contagious.
        </p>
      </div>
    ),
  },
  {
    value: "counts",
    title: "What counts as real action?",
    preview: "Direct help, useful services, access, resources, consistent service, or systems that keep helping.",
    content: (
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-foreground">Direct support</h3>
          <p className="mt-2">Helping a person or family, delivering care or services, mentoring, or volunteering consistently.</p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Creating access</h3>
          <p className="mt-2">Connecting people with care, funding tools or opportunities, hiring, or opening doors.</p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Building something lasting</h3>
          <p className="mt-2">Creating programs, education, infrastructure, or repeatable solutions that continue after the post.</p>
        </div>
      </div>
    ),
  },
  {
    value: "not-count",
    title: "What does not go Beyond The Yellow?",
    preview: "Support that remains entirely symbolic, performative, or disconnected from a real beneficiary.",
    content: (
      <div className="space-y-4">
        <p>
          Awareness can matter. Symbols can matter. The problem is when the public display becomes the entire contribution.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Awareness with no follow-through",
            "Outrage with no attempt at a solution",
            "Vague support claims with no beneficiary",
            "Cause-washing or image management",
            "Fundraising with no visible benefit",
            "Political fighting presented as service",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-lg border border-border bg-background p-3">
              <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="font-medium text-foreground">
          This is not a shame wall. The goal is to spotlight people doing something useful and challenge more of us to join them.
        </p>
      </div>
    ),
  },
  {
    value: "veterans",
    title: "Is Beyond The Yellow only about veterans?",
    preview: "Veteran and military-family work is prioritized, but real action can come from any positive cause or community.",
    content: (
      <div className="space-y-4">
        <p>
          Veterans and families are central to ValorWell, so veteran-serving work receives special priority. But Beyond The
          Yellow is intentionally broader than one population, profession, or cause area.
        </p>
        <p>
          The category does not decide whether someone belongs. The action does.
        </p>
      </div>
    ),
  },
];

const faqs = [
  {
    value: "following",
    question: "Do I need a large audience or following?",
    answer:
      "No public minimum is required. ValorWell considers the action, the story, the people helped, the potential value to the movement, and whether the participant can help the story reach others.",
  },
  {
    value: "small",
    question: "Can a small local organization or individual apply?",
    answer:
      "Yes. The work does not have to be large. It has to be real, understandable, and meaningful to a specific person, group, or community.",
  },
  {
    value: "recording",
    question: "What will the conversation be like?",
    answer:
      "Selected guests will be invited to a prerecorded conversation hosted by Luke. The discussion will focus on the problem you saw, why you acted, what you actually do, who benefits, and how other people can help.",
  },
  {
    value: "promotion",
    question: "Can I promote my organization, initiative, product, service, or fundraiser?",
    answer:
      "Relevant promotion may be included as part of the story, but it remains secondary to the real action. The conversation cannot become an infomercial.",
  },
  {
    value: "fee",
    question: "Is there a fee to apply or participate?",
    answer:
      "There is no fee to submit a story or nomination. Financial support or sponsorship does not guarantee selection or influence editorial decisions.",
  },
  {
    value: "guarantee",
    question: "Does submitting guarantee a feature?",
    answer:
      "No. Beyond The Yellow is curated. ValorWell reviews the action, the story, launch fit, production capacity, and whether the feature can be responsibly produced.",
  },
  {
    value: "sponsor",
    question: "Can a sponsor pay to be featured?",
    answer:
      "No. Sponsorship may support production and distribution, but it cannot buy credibility, recognition, a feature, an endorsement, clinical influence, documentation, or any VA outcome.",
  },
  {
    value: "content-rights",
    question: "How will the interview and clips be used?",
    answer:
      "If you are selected, ValorWell will discuss the recording, editing, publishing, and promotional plan before production. Submitting an application by itself does not create a content license or guarantee publication.",
  },
];

export default function BeyondTheYellowPage() {
  const [selectedLane, setSelectedLane] = useState<LaneValue | undefined>();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    track("bty_page_view");
    const hero = document.getElementById("bty-hero");
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const chooseLane = (lane: LaneValue, event: string) => {
    setSelectedLane(lane);
    track(event, { lane });
    window.setTimeout(() => scrollToId(FORM_ANCHOR), 40);
  };

  const apply = (event: string) => {
    track(event);
    scrollToId(FORM_ANCHOR);
  };

  return (
    <>
      <Helmet>
        <title>Beyond The Yellow Founding Stories | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow is selecting its first 12 Founding Stories: people and organizations turning public support into real action that communities can feel."
        />
        <meta property="og:title" content="Become a Founding Story of Beyond The Yellow" />
        <meta
          property="og:description"
          content="ValorWell is selecting the first 12 stories that will help define a national movement built around real action over symbolic support."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/beyondtheyellow" />
      </Helmet>

      <Header />
      <main id="main" className="bg-background">
        <section id="bty-hero" className="relative overflow-hidden border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[hsl(var(--gold-accent))]/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Now selecting the founding stories</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-tight md:text-6xl lg:text-7xl">
                Support is not a symbol. <span className="text-[hsl(var(--gold-accent))]">Support is behavior.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
                Beyond The Yellow is a national movement spotlighting people and organizations whose support creates
                something real. ValorWell is now selecting the first {FOUNDING_STORY_COUNT} stories that will help define
                what this movement becomes.
              </p>
              <button
                type="button"
                onClick={() => apply("bty_hero_apply")}
                className="mt-9 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--navy))] shadow-lg transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--navy))]"
              >
                Apply to Be a Founding Story <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <p className="mt-4 max-w-2xl text-sm text-white/65">
                Individuals, organizations, businesses, clinicians, creators, and community leaders are invited to apply.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-accent))]">Founding Stories</p>
                    <p className="mt-1 text-sm text-white/70">The first chapter is open.</p>
                  </div>
                  <span className="rounded-full bg-[hsl(var(--gold-accent))] px-3 py-1 text-xs font-bold text-[hsl(var(--navy))]">
                    01—{FOUNDING_STORY_COUNT}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["01", "YOUR WORK"],
                    ["02", "YOUR STORY"],
                    ["03", "YOUR IMPACT"],
                    ["04", "YOUR COMMUNITY"],
                  ].map(([number, label]) => (
                    <div key={number} className="aspect-[4/5] rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-4">
                      <div className="flex h-full flex-col justify-between">
                        <span className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--gold-accent))]">STORY {number}</span>
                        <div>
                          <div className="mb-3 h-px w-10 bg-[hsl(var(--gold-accent))]" />
                          <p className="text-sm font-bold leading-tight text-white">{label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-white/50">Illustrative launch treatment. No guests are being implied.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <Eyebrow tone="navy">Be there at the beginning</Eyebrow>
                <SectionHeading>The first stories will establish what going Beyond The Yellow means.</SectionHeading>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Every movement is eventually associated with the people who showed up before everyone else understood
                  where it was going. These will not be placeholder episodes. They will become the founding record of
                  Beyond The Yellow.
                </p>
                <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-[hsl(var(--gold-accent))]/40 bg-[hsl(var(--gold-accent))]/10 px-5 py-4">
                  <span className="text-4xl font-extrabold text-[hsl(var(--navy))]">{FOUNDING_STORY_COUNT}</span>
                  <span className="max-w-[14rem] text-sm font-semibold text-foreground">Founding Stories will define the first chapter of the movement.</span>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
                {[
                  {
                    icon: Sparkles,
                    title: "Help define the movement",
                    body: "Your work can help establish the standard other people and organizations will be challenged to follow.",
                  },
                  {
                    icon: Mic2,
                    title: "Tell the story behind the work",
                    body: "Explain the problem you saw, what you decided to do, who benefits, and what would happen if the work stopped.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Become part of the beginning",
                    body: "Early featured participants will always be among the first stories associated with Beyond The Yellow.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--gold-accent))]/15 text-[hsl(var(--navy))]">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-border bg-[hsl(var(--section-alt))] py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <Eyebrow>The real-support test</Eyebrow>
            <p className="mt-7 text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              If your support stopped tomorrow, would anyone be <span className="text-accent">worse off</span>? Would they even know?
            </p>
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-sm">
              <p className="text-xl font-semibold text-foreground">It does not need to be enormous.</p>
              <p className="mt-2 text-xl font-bold text-[hsl(var(--gold-accent))]">It does need to be real.</p>
              <p className="mt-5 text-muted-foreground">
                If the answer is yes, your story may belong among the first Beyond The Yellow spotlights.
              </p>
            </div>
            <button
              type="button"
              onClick={() => apply("bty_test_apply")}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
            >
              Put Your Story Forward <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow tone="navy">Your story, amplified</Eyebrow>
              <SectionHeading>One conversation. An entire story platform.</SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Every selected story begins with a prerecorded conversation hosted by Luke. The goal is to turn that
                conversation into a durable package that helps more people discover the work.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  [Video, "Tell the full story", "Move beyond a short social caption and explain why the work exists."],
                  [Share2, "Create shareable content", "The conversation can support clips, written spotlights, quotes, and community posts."],
                  [Megaphone, "Promote the mission", "Show people how they can participate, volunteer, donate, refer, buy, or help."],
                  [Network, "Reach new relationships", "Enter the growing network forming around people who take meaningful action."],
                ].map(([Icon, title, body]) => (
                  <div key={String(title)} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-accent))]" aria-hidden />
                    <div>
                      <h3 className="font-semibold text-foreground">{String(title)}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{String(body)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-border bg-[hsl(var(--navy))] p-4 shadow-xl">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-[hsl(var(--gold-accent))] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[hsl(var(--navy))]">
                      Example feature package
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white/55">A prospective format, not a published episode</span>
                  </div>
                  <div className="mt-5 aspect-video rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-black/20 p-6">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
                        <Mic2 className="h-4 w-4" aria-hidden /> Full conversation
                      </div>
                      <div>
                        <p className="text-3xl font-extrabold md:text-4xl">Your work could live here.</p>
                        <p className="mt-3 max-w-xl text-sm text-white/70">The problem you saw. The action you take. The people who are better off because you showed up.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      ["VERTICAL CLIP", "A focused moment built for short-form discovery."],
                      ["WRITTEN STORY", "A durable explanation people can read and share."],
                      ["QUOTE ASSET", "A clear idea that can travel beyond the episode."],
                    ].map(([title, body]) => (
                      <div key={title} className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                        <p className="text-xs font-bold tracking-wider text-[hsl(var(--gold-accent))]">{title}</p>
                        <p className="mt-2 text-sm text-white/65">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow tone="navy">Who we are looking for</Eyebrow>
              <SectionHeading>We want people whose actions deserve more attention than their claims.</SectionHeading>
              <p className="mt-6 text-lg text-muted-foreground">
                Veteran-serving work receives special priority because veterans and families are central to ValorWell. But
                the Founding Stories can come from any positive cause or community.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                [Users, "Veteran and military-family organizations", "People building real care, access, belonging, opportunity, or support."],
                [HeartHandshake, "Community builders", "Nonprofits, volunteers, organizers, faith communities, and local leaders doing the work."],
                [Building2, "Care and access creators", "Clinicians, founders, employers, and organizations opening doors people could not open alone."],
                [Megaphone, "Creators and businesses", "Platforms and companies using reach, products, services, resources, or influence to materially help."],
              ].map(([Icon, title, body]) => (
                <div key={String(title)} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <Icon className="h-6 w-6 text-[hsl(var(--gold-accent))]" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold text-foreground">{String(title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{String(body)}</p>
                </div>
              ))}
            </div>
            <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-card px-5">
              <AccordionItem value="full-range" className="border-0">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline md:text-lg">
                  See the full range of people and organizations that may belong
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Veteran organizations, military-family organizations, nonprofits, small businesses, employers, clinicians,
                  creators, media, law firms, churches, civic groups, volunteers, advocates, founders, local companies,
                  community groups, social-responsibility leaders, and individuals doing hands-on work may all fit. The category
                  does not decide. The action does.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow>Why be featured</Eyebrow>
              <SectionHeading>The work deserves more than another post that disappears tomorrow.</SectionHeading>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                [Quote, "Credibility", "Tell the story in a serious editorial format centered on what you actually do."],
                [Megaphone, "Visibility", "Create a durable conversation and supporting content people can discover and share."],
                [Handshake, "Connection", "Enter a growing network of people and organizations committed to meaningful action."],
                [BadgeCheck, "Founding recognition", "Become one of the first stories that helped establish the Beyond The Yellow movement."],
              ].map(([Icon, title, body]) => (
                <div key={String(title)} className="rounded-2xl border border-border bg-card p-6">
                  <Icon className="h-6 w-6 text-[hsl(var(--gold-accent))]" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold text-foreground">{String(title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{String(body)}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
              Selection is based on the action and story. Financial support, sponsorship, organizational size, or audience size does not guarantee a feature.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <Eyebrow tone="navy">Understand the movement</Eyebrow>
            <SectionHeading>Enough to understand it. More when you need it.</SectionHeading>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              The movement is simple. The details below explain the standard without turning the page into a wall of copy.
            </p>
            <Accordion
              type="single"
              collapsible
              className="mt-10 space-y-3"
              onValueChange={(value) => value && track("bty_movement_guide_expand", { item: value })}
            >
              {movementGuide.map((item) => (
                <AccordionItem key={item.value} value={item.value} className="rounded-2xl border border-border bg-card px-5">
                  <AccordionTrigger className="gap-6 py-5 text-left hover:no-underline">
                    <span>
                      <span className="block text-base font-bold text-foreground md:text-lg">{item.title}</span>
                      <span className="mt-1 block pr-4 text-sm font-normal text-muted-foreground">{item.preview}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow tone="navy">We live the standard too</Eyebrow>
              <SectionHeading>ValorWell is not only spotlighting the work. We are doing it.</SectionHeading>
              <p className="mt-6 text-lg text-muted-foreground">
                Beyond The Yellow is not a campaign ValorWell created to tell other people what to do. It is the standard we use to judge our own work.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col rounded-2xl border border-border bg-[hsl(var(--navy))] p-7 text-white shadow-sm">
                <Eyebrow>Our veteran mission</Eyebrow>
                <h3 className="mt-4 text-3xl font-bold">Operation Claims Success</h3>
                <p className="mt-4 flex-1 text-white/75">
                  ValorWell's Beyond The Yellow mission for veterans: building a care-first alternative through legitimate
                  mental health care, better access pathways, honest education, and ethical documentation when clinically appropriate.
                </p>
                <Link
                  to="/operation-claims-success"
                  onClick={() => track("bty_ocs_click")}
                  className="mt-7 inline-flex items-center gap-2 self-start rounded-md bg-[hsl(var(--gold-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--navy))] hover:brightness-95"
                >
                  Explore Operation Claims Success <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                <Eyebrow tone="navy">The operating infrastructure</Eyebrow>
                <h3 className="mt-4 text-3xl font-bold text-foreground">The ValorWell Clinic</h3>
                <p className="mt-4 flex-1 text-muted-foreground">
                  Real telehealth mental health care for veterans and families. CHAMPVA is active, while ValorWell continues
                  working toward legitimate VA Community Care and TRICARE pathways as those systems become operationally available.
                </p>
                <Link
                  to="/get-care"
                  onClick={() => track("bty_care_click")}
                  className="mt-7 inline-flex items-center gap-2 self-start rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
                >
                  Learn About ValorWell Care <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
            <p className="mt-8 text-center text-lg font-semibold text-foreground">
              Beyond The Yellow is the standard. Operation Claims Success is our mission. The clinic is how we put it into practice.
            </p>
          </div>
        </section>

        <section id={FORM_ANCHOR} className="scroll-mt-24 border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow tone="navy">Founding Story application</Eyebrow>
              <SectionHeading>Is your work one of the stories that should define the beginning?</SectionHeading>
              <p className="mt-5 text-lg text-muted-foreground">
                Select the path that fits. ValorWell will review the submission and reach out when the work, story, and launch schedule align.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                {
                  lane: "share-story" as const,
                  icon: Mic2,
                  title: "I want to share my story",
                  body: "I am doing the work or represent the organization responsible for it.",
                  cta: "Share My Story",
                },
                {
                  lane: "nominate" as const,
                  icon: Users,
                  title: "I want to nominate someone",
                  body: "I know a person or organization whose work should be considered.",
                  cta: "Nominate Someone",
                },
                {
                  lane: "promote-valorwell" as const,
                  icon: Handshake,
                  title: "I want to help launch the movement",
                  body: "I can collaborate, distribute, sponsor, introduce guests, or connect aligned organizations.",
                  cta: "Help Move It Forward",
                },
              ].map((item) => {
                const selected = selectedLane === item.lane;
                return (
                  <button
                    key={item.lane}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseLane(item.lane, `bty_lane_${item.lane}`)}
                    className={`group flex min-h-[17rem] flex-col rounded-2xl border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--navy))] ${
                      selected
                        ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/12 shadow-md"
                        : "border-border bg-card hover:-translate-y-0.5 hover:border-[hsl(var(--navy))]/40 hover:shadow-md"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--gold-accent))]/15 text-[hsl(var(--navy))]">
                      <item.icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 flex-1 text-muted-foreground">{item.body}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--navy))]">
                      {item.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
              {selectedLane ? (
                <div>
                  <div className="mb-5 rounded-xl border border-border bg-background px-5 py-4 text-sm text-muted-foreground">
                    Beyond The Yellow is curated. Submission does not guarantee selection, publication, partnership, sponsorship,
                    endorsement, clinical care, documentation, funding, or any VA outcome. There is no fee to apply.
                  </div>
                  {selectedLane === "nominate" ? (
                    <BtyNominationForm key="nominate" />
                  ) : (
                    <UnifiedBtyForm key={selectedLane} initialLane={selectedLane} />
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-background p-8 text-center">
                  <p className="font-semibold text-foreground">Choose a path above to open the appropriate application.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Only the form you need will appear.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow tone="navy">What happens next</Eyebrow>
              <SectionHeading>A real selection and production process.</SectionHeading>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "ValorWell reviews the action", "We look at what is being done, who benefits, and whether the work fits the movement."],
                ["02", "We review the story", "Strong action matters most, but the story also needs to be understandable and useful to an audience."],
                ["03", "Selected guests are invited", "Conversations are prerecorded so the final story can be responsibly planned and produced."],
                ["04", "The spotlight is built", "The primary conversation may support clips, written content, quotes, and social distribution."],
              ].map(([number, title, body]) => (
                <div key={number} className="rounded-2xl border border-border bg-card p-6">
                  <span className="text-sm font-extrabold tracking-[0.18em] text-[hsl(var(--gold-accent))]">{number}</span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--navy))] py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[hsl(var(--gold-accent))]">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Founding Story applications are open</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold">The first chapter is being selected now.</h2>
              <p className="mt-3 max-w-2xl text-white/70">
                As the launch progresses, this page will move from applications open, to guests selected, to Founding Stories in production, and finally to the published first season.
              </p>
            </div>
            <button
              type="button"
              onClick={() => apply("bty_status_apply")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3 text-sm font-bold text-[hsl(var(--navy))] hover:brightness-95"
            >
              Apply Now <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <Eyebrow tone="navy">Questions before you apply</Eyebrow>
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
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[hsl(var(--gold-accent))]/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 text-center">
            <Eyebrow>Founding Stories</Eyebrow>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Movements are remembered by the people who showed up first.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/75 md:text-xl">
              If your work would be missed if it stopped, this may be the moment to put it forward.
            </p>
            <button
              type="button"
              onClick={() => apply("bty_final_apply")}
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-7 py-3.5 text-sm font-bold text-[hsl(var(--navy))] hover:brightness-95"
            >
              Apply to Be a Founding Story <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </section>
      </main>
      <Footer />

      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => apply("bty_sticky_apply")}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-5 py-3 text-sm font-bold text-[hsl(var(--navy))]"
          >
            Apply to Be a Founding Story <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
