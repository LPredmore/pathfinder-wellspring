import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import btyHeroAsset from "@/assets/bty-hero.png.asset.json";
import btyCreatorInActionAsset from "@/assets/bty-creator-in-action.png.asset.json";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Handshake,
  HeartHandshake,
  Image as ImageIcon,
  Megaphone,
  Mic2,
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

const FORM_ANCHOR = "bty-guest-interest";

type LaneValue = "share-story" | "nominate" | "promote-valorwell";
type EyebrowTone = "yellow" | "navy" | "red";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, {
    page: "beyond-the-yellow",
    phase: "first-guests",
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
    <p
      className={`text-xs font-bold uppercase tracking-[0.22em] ${toneClass}`}
    >
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
      className={`mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

function VisualPlaceholder({
  label,
  guidance,
  aspectClass = "aspect-[4/3]",
  dark = false,
}: {
  label: string;
  guidance: string;
  aspectClass?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}. ${guidance}`}
      data-image-placeholder={label}
      className={`relative overflow-hidden rounded-3xl border border-dashed ${
        dark
          ? "border-white/25 bg-gradient-to-br from-white/10 to-white/[0.03] text-white"
          : "border-[hsl(var(--navy))]/25 bg-gradient-to-br from-[hsl(var(--gold-accent))]/15 via-background to-[hsl(var(--navy))]/5 text-foreground"
      } ${aspectClass}`}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full border ${
            dark
              ? "border-white/20 bg-black/20"
              : "border-[hsl(var(--navy))]/15 bg-background/80"
          }`}
        >
          <ImageIcon className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-5 max-w-sm text-base font-bold">{label}</p>
        <p
          className={`mt-2 max-w-md text-sm leading-relaxed ${
            dark ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {guidance}
        </p>
      </div>
    </div>
  );
}

const faqs = [
  {
    value: "launched",
    question: "Has Beyond The Yellow launched yet?",
    answer:
      "Not yet. The first conversations have not been recorded or published. ValorWell is currently inviting and selecting the guests who will help establish the tone and standard of the series.",
  },
  {
    value: "following",
    question: "Do I need a large following?",
    answer:
      "No. There is no public follower minimum. We care more about the work, the story behind it, the people affected, and whether the conversation can be useful. Small and mid-size creators are explicitly welcome.",
  },
  {
    value: "conversation",
    question: "What will the conversation be like?",
    answer:
      "Selected guests will join Luke for a prerecorded remote conversation. The focus is the problem you saw, why you acted, what you are doing now, who benefits, what you have learned, and how other people can help. This is not a gotcha interview or a debate format.",
  },
  {
    value: "benefit",
    question: "What does a selected guest receive?",
    answer:
      "The core feature is a thoughtfully produced long-form conversation. Depending on the final production plan, that conversation may also support short clips, quotes, written spotlights, and other shareable assets. ValorWell does not promise a specific audience size, reach, number of assets, or publication date before production is agreed upon.",
  },
  {
    value: "promotion",
    question: "Can I talk about my organization, project, or fundraiser?",
    answer:
      "Yes, when it is genuinely connected to the work being discussed. Guests should be able to tell people how to follow, participate, volunteer, donate, buy, refer, or otherwise help. The conversation cannot become a disguised infomercial.",
  },
  {
    value: "fee",
    question: "Is there a fee to apply or participate?",
    answer:
      "No. There is no fee to submit interest, be nominated, or participate as an editorial guest. Sponsorship cannot buy a guest feature or influence selection.",
  },
  {
    value: "selection",
    question: "Does an invitation or submission guarantee an episode?",
    answer:
      "No. Beyond The Yellow is curated. ValorWell reviews the work, story, guest fit, production capacity, and launch schedule before confirming a recording.",
  },
  {
    value: "rights",
    question: "How will my interview and clips be used?",
    answer:
      "Recording, editing, publishing, promotional use, and guest expectations will be discussed before production. Submitting interest does not itself grant ValorWell content rights or guarantee publication.",
  },
];

export default function BeyondTheYellowPage() {
  const [selectedLane, setSelectedLane] =
    useState<LaneValue>("share-story");
  const [showSticky, setShowSticky] = useState(false);

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
        <title>Be a Guest on Beyond The Yellow | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow is inviting its first guests: creators, community builders, founders, and local leaders whose work makes a real difference people can feel."
        />
        <meta
          property="og:title"
          content="Your Work Deserves More Than a Passing Post"
        />
        <meta
          property="og:description"
          content="ValorWell is inviting the first guests for Beyond The Yellow, a new conversation series about people turning support into real community action."
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
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[hsl(var(--gold-accent))]/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>The first guest invitations are going out now</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-tight md:text-6xl lg:text-7xl">
                You are already doing the work. Let&apos;s help more people understand
                why it matters.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
                Beyond The Yellow is a new conversation series for creators,
                founders, organizers, and community leaders whose support produces
                something real. We are inviting the first guests now—before the
                first episode has been recorded.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => apply("bty_hero_guest")}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--navy))] shadow-lg transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  I Was Invited / I Want to Be a Guest
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    chooseLane("nominate", "bty_hero_nominate")
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
                >
                  Nominate Someone
                </button>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60">
                No published episodes yet. No inflated audience claims. No fee to
                participate. The first guests will help establish what this becomes.
              </p>
            </div>

            <div className="lg:col-span-5">
              <img
                src={btyHeroAsset.url}
                alt="Beyond The Yellow: a mission-driven platform where real stories lead to real action"
                className="h-auto w-full rounded-3xl object-contain"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-8">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
            {[
              ["A new series", "The first conversations have not been recorded."],
              ["A curated launch group", "Guest fit matters more than follower count."],
              ["A real story platform", "The work—not manufactured controversy—is the point."],
            ].map(([title, body]) => (
              <div key={title} className="flex items-start gap-3 py-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-accent))]"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-bold text-foreground">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow tone="navy">Why this may be worth your time</Eyebrow>
                <SectionHeading>
                  Your community may know what you do. Most people still do not know
                  the story that made you do it.
                </SectionHeading>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-5">
                Beyond The Yellow is designed to give useful work more context than a
                short caption, fundraising post, or thirty-second clip can carry.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Mic2,
                  title: "Tell the full story",
                  body: "Explain the problem, the turning point, the work, the people affected, and what you have learned along the way.",
                },
                {
                  icon: Share2,
                  title: "Create useful content",
                  body: "A selected conversation may support edited clips, quotes, written features, and assets you can share with your own audience.",
                },
                {
                  icon: Megaphone,
                  title: "Give people a next step",
                  body: "Invite people to follow, volunteer, donate, participate, buy, refer, or otherwise help the work continue.",
                },
                {
                  icon: Sparkles,
                  title: "Help shape the beginning",
                  body: "The first guests will influence the tone, standards, questions, and kinds of action the series becomes known for.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--gold-accent))]/15 text-[hsl(var(--navy))]">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
              ValorWell will agree on the production plan before recording. Selection
              does not guarantee a particular audience size, reach, publication date,
              or number of promotional assets.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <VisualPlaceholder
                label="Creator-in-action image placeholder"
                guidance="Recommended: documentary-style imagery showing a creator, organizer, founder, or volunteer actively serving people, building something, teaching, delivering resources, or leading a real local effort."
                aspectClass="aspect-[4/3]"
              />
            </div>
            <div className="lg:col-span-6">
              <Eyebrow tone="navy">Who belongs here</Eyebrow>
              <SectionHeading>
                We are not looking for the biggest name. We are looking for work
                worth knowing about.
              </SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Small and mid-size creators often have the closest relationship to the
                people and communities they serve. That proximity is an advantage—not
                something you need to apologize for.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [Users, "Local creators and storytellers"],
                  [HeartHandshake, "Community builders and volunteers"],
                  [Building2, "Mission-driven founders and organizations"],
                  [BadgeCheck, "Veteran and military-family advocates"],
                  [Megaphone, "Educators and issue-focused creators"],
                  [Handshake, "Businesses creating measurable local good"],
                ].map(([Icon, label]) => (
                  <div
                    key={String(label)}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <Icon
                      className="h-5 w-5 shrink-0 text-[hsl(var(--gold-accent))]"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-foreground">
                      {String(label)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-semibold text-[hsl(var(--navy))]">
                The category does not qualify you. The action and the story do.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow tone="navy">The conversation</Eyebrow>
              <SectionHeading>
                No gotcha questions. No manufactured outrage. No demand that you
                perform your mission for the camera.
              </SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                This is a prerecorded remote conversation built to help people
                understand the work and the person behind it.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "What did you see?", "The problem, need, or gap that became impossible for you to ignore."],
                ["02", "Why did you act?", "The personal experience, conviction, or moment that moved you from concern to action."],
                ["03", "What do you actually do?", "The real work, who it reaches, what is difficult, and what changes because it exists."],
                ["04", "How can people help?", "The next step your audience and ours can take without turning the feature into an advertisement."],
              ].map(([number, title, body]) => (
                <article
                  key={number}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <span className="text-sm font-extrabold tracking-[0.18em] text-[hsl(var(--gold-accent))]">
                    {number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12">
              <VisualPlaceholder
                label="Remote conversation image placeholder"
                guidance="Recommended: a polished but natural split-screen or behind-the-scenes image of Luke speaking with a community creator remotely. It should feel conversational and credible, not like a cable-news debate."
                aspectClass="aspect-video"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--navy))] py-20 text-white md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow>What the feature can become</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                One real conversation. Multiple ways for the story to travel.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                The long-form conversation is the source. The strongest moments can
                then be shaped for the places where people actually discover and share
                stories.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  [Video, "Long-form conversation"],
                  [Share2, "Short-form clips"],
                  [Megaphone, "Quotes and social assets"],
                  [Building2, "Written feature or guest profile"],
                ].map(([Icon, label]) => (
                  <div key={String(label)} className="flex items-center gap-3">
                    <Icon
                      className="h-5 w-5 text-[hsl(var(--gold-accent))]"
                      aria-hidden="true"
                    />
                    <span className="font-semibold">{String(label)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <VisualPlaceholder
                label="Beyond The Yellow content-package placeholder"
                guidance="Recommended: a designed mockup showing one future guest across a long-form episode frame, vertical clip, quote card, and written story card. Clearly label it as a sample format until real episodes exist."
                aspectClass="aspect-[4/3]"
                dark
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <Eyebrow tone="navy">The honest launch-stage opportunity</Eyebrow>
            <SectionHeading>
              Joining now is not about borrowing an established audience. It is about
              helping establish what the audience will come for.
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              There are no published episodes to point to yet. The advantage is that
              the first guests will not be squeezed into a format someone else already
              defined. Their conversations will help define it.
            </p>
            <div className="mt-10 grid gap-5 text-left md:grid-cols-3">
              {[
                ["Shape the standard", "Help show what meaningful community action looks like without reducing it to a slogan."],
                ["Shape the format", "Give honest feedback on the conversation, guest experience, clips, and presentation while the system is still flexible."],
                ["Be part of the first chapter", "Early guests will remain part of the launch record as Beyond The Yellow develops."],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[hsl(var(--gold-accent))]/35 bg-[hsl(var(--gold-accent))]/8 p-6"
                >
                  <h3 className="text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id={FORM_ANCHOR}
          className="scroll-mt-24 border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow tone="navy">Guest interest</Eyebrow>
              <SectionHeading>
                Were you invited—or does your work belong in this conversation?
              </SectionHeading>
              <p className="mt-5 text-lg text-muted-foreground">
                Tell us enough to understand you, the work, and what people should
                know. You do not need a polished media pitch.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  lane: "share-story" as const,
                  icon: Mic2,
                  title: "I was invited or want to be a guest",
                  body: "I am doing the work or represent the person or organization responsible for it.",
                },
                {
                  lane: "nominate" as const,
                  icon: Users,
                  title: "I want to nominate someone",
                  body: "I know a creator, leader, or organization whose work deserves consideration.",
                },
                {
                  lane: "promote-valorwell" as const,
                  icon: Handshake,
                  title: "I want to help launch the series",
                  body: "I can introduce guests, collaborate, distribute, sponsor production, or connect aligned communities.",
                },
              ].map((item) => {
                const selected = selectedLane === item.lane;
                return (
                  <button
                    key={item.lane}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      chooseLane(item.lane, `bty_lane_${item.lane}`)
                    }
                    className={`rounded-2xl border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--navy))] ${
                      selected
                        ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/12 shadow-md"
                        : "border-border bg-card hover:-translate-y-0.5 hover:border-[hsl(var(--navy))]/40 hover:shadow-md"
                    }`}
                  >
                    <item.icon
                      className="h-6 w-6 text-[hsl(var(--navy))]"
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mx-auto mt-8 max-w-4xl">
              <div className="mb-5 rounded-xl border border-border bg-background px-5 py-4 text-sm text-muted-foreground">
                Beyond The Yellow is curated. An invitation or submission does not
                guarantee recording, publication, partnership, funding, endorsement,
                or audience reach. There is no fee to apply or participate as an
                editorial guest.
              </div>
              {selectedLane === "nominate" ? (
                <BtyNominationForm key="nominate" />
              ) : (
                <UnifiedBtyForm key={selectedLane} initialLane={selectedLane} />
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow tone="navy">What happens next</Eyebrow>
              <SectionHeading>A clear launch-stage process.</SectionHeading>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "We review the work", "We look at what is actually being done, who benefits, and whether the work fits the series."],
                ["02", "We review the story", "We consider whether the conversation can be clear, useful, honest, and meaningful to viewers."],
                ["03", "We confirm the guest", "Selected people receive a direct conversation about fit, expectations, recording, and production."],
                ["04", "We build the feature", "The prerecorded conversation becomes the source for the agreed episode and supporting content."],
              ].map(([number, title, body]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <span className="text-sm font-extrabold tracking-[0.18em] text-[hsl(var(--gold-accent))]">
                    {number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <Eyebrow tone="navy">Questions before you respond</Eyebrow>
            <SectionHeading>Straight answers.</SectionHeading>
            <Accordion
              type="single"
              collapsible
              className="mt-10 space-y-3"
              onValueChange={(value) =>
                value && track("bty_faq_expand", { item: value })
              }
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.value}
                  value={faq.value}
                  className="rounded-2xl border border-border bg-card px-5"
                >
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
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[hsl(var(--gold-accent))]/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-5xl px-4 text-center">
            <Eyebrow>The first conversations</Eyebrow>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              The work is already real. The series is ready to start telling the
              stories behind it.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/75 md:text-xl">
              An enormous following is not required. A real story, real action, and a
              willingness to have an honest conversation are.
            </p>
            <button
              type="button"
              onClick={() => apply("bty_final_guest")}
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-7 py-3.5 text-sm font-bold text-[hsl(var(--navy))] hover:brightness-95"
            >
              Respond to the Invitation
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
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-5 py-3 text-sm font-bold text-[hsl(var(--navy))]"
          >
            I Want to Be a Guest
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
