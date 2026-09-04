import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  HeartHandshake,
  Network,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Video,
  type LucideIcon,
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

const FORM_ANCHOR = "bty-story-form";
const LATEST_VIDEO_URL = "https://www.youtube.com/watch?v=A4CUe3c8rJE";

type LaneValue = "share-story" | "nominate";

type StandardCard = {
  title: string;
  copy: string;
  Icon: LucideIcon;
};

const featuredOrganizations = [
  {
    name: "Veterans Breakfast Club",
    route: "/veteransbreakfastclub",
    statement:
      "Creating spaces where veterans can tell the stories they have carried—and where families and civilians can finally hear them.",
  },
  {
    name: "GallantFew",
    route: "/gallantfew",
    statement:
      "Helping veterans find direction, connection, and purpose after military service.",
  },
  {
    name: "Veterans Outreach of Wisconsin",
    route: "/VOW",
    statement:
      "Tiny homes, food access, peer support, and a path back to permanent stability.",
  },
  {
    name: "Military Missions in Action",
    route: "/mmia",
    statement:
      "Ramps, furnished homes, transportation, and practical help veterans can actually feel.",
  },
  {
    name: "VETS2INDUSTRY",
    route: "/vets2industry",
    statement:
      "Making the enormous ecosystem of military resources easier to find and actually use.",
  },
];

const standards: StandardCard[] = [
  {
    title: "There is real action",
    copy: "The story centers on something a person or community can actually experience—not only awareness, branding, or stated intent.",
    Icon: Target,
  },
  {
    title: "There is something to learn",
    copy: "The conversation should help people understand the problem, the work, the choices behind it, or what effective support looks like in practice.",
    Icon: Sparkles,
  },
  {
    title: "The work can stand on its own",
    copy: "A feature should be worth watching even if the audience never donates, volunteers, becomes a customer, or takes another action afterward.",
    Icon: BadgeCheck,
  },
  {
    title: "The claims are supportable",
    copy: "Beyond The Yellow does not need inflated reach, impact, or outcome claims to make a story matter. Precision is part of credibility.",
    Icon: ShieldCheck,
  },
];

const faqs = [
  {
    value: "veterans-only",
    question: "Is Beyond The Yellow only for veteran organizations?",
    answer:
      "No. Veteran-serving and military-family organizations are a priority because they are closely connected to ValorWell's current public mission, but they are not the only stories Beyond The Yellow can feature. The series can include people and organizations from other cause areas when the work reflects the same action-first standard.",
  },
  {
    value: "cost",
    question: "Is there a cost to be considered or featured?",
    answer:
      "No. There is no fee to submit a story, nominate someone, be selected, record the conversation, or participate as an editorial guest. Beyond The Yellow is not pay-to-play media, and financial support cannot purchase a feature or influence editorial selection.",
  },
  {
    value: "selection",
    question: "How are stories selected?",
    answer:
      "Beyond The Yellow is curated. We look for tangible work, a clear reason the story matters, a useful conversation for viewers, and enough substance to show what action looks like beyond slogans or awareness. Not every submission will become a feature.",
  },
  {
    value: "receive",
    question: "What does a selected guest receive?",
    answer:
      "The core feature is a produced long-form conversation and, when appropriate, a permanent editorial feature page on ValorWell. A feature may also support clips, quotes, social posts, and additional distribution depending on the production plan. ValorWell does not guarantee a specific number of views, donations, referrals, volunteers, press mentions, or other outcomes.",
  },
  {
    value: "support",
    question: "Can a guest tell people how to support the work?",
    answer:
      "Yes. If the work is the reason for the feature, viewers should be able to understand how to support, volunteer, participate, refer someone, collaborate, or learn more. The conversation still needs to remain an editorial discussion rather than becoming an infomercial.",
  },
  {
    value: "nominate",
    question: "Can I nominate someone else?",
    answer:
      "Yes. You can nominate an individual or organization even if you are not part of it. Give us enough information to understand the work and identify the right person to contact.",
  },
];

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, {
    page: "beyond-the-yellow",
    phase: "action-first-movement",
    ...params,
  });

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] ${
        light ? "text-[#D7A92E]" : "text-[#3B5147]"
      }`}
    >
      {children}
    </p>
  );
}

function scrollToForm() {
  if (typeof window === "undefined") return;
  const target = document.getElementById(FORM_ANCHOR);
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export default function BeyondTheYellowPage() {
  const [selectedLane, setSelectedLane] = useState<LaneValue>("share-story");

  useEffect(() => {
    track("bty_page_view");

    const requested = new URLSearchParams(window.location.search).get("form");
    if (requested !== "guest" && requested !== "nomination") return;

    setSelectedLane(requested === "nomination" ? "nominate" : "share-story");
    window.setTimeout(scrollToForm, 120);
  }, []);

  const chooseLane = (lane: LaneValue, event: string) => {
    setSelectedLane(lane);
    track(event, { lane });
    window.setTimeout(scrollToForm, 40);
  };

  return (
    <>
      <Helmet>
        <title>Beyond The Yellow | Real Action Worth Seeing | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow is ValorWell's action-first feature series spotlighting people and organizations doing useful work that goes beyond awareness, slogans, and symbolic support."
        />
        <meta
          property="og:title"
          content="Beyond The Yellow | Real Action Worth Seeing"
        />
        <meta
          property="og:description"
          content="Meet the people and organizations turning support into something communities can actually feel."
        />
        <meta
          property="og:image"
          content="https://i.ytimg.com/vi/A4CUe3c8rJE/maxresdefault.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/beyond-the-yellow" />
      </Helmet>

      <Header />
      <main className="bg-[#F4F1E8] text-[#111814]">
        <div className="bty-theme">
          <style>{`
            .bty-theme {
              font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            }
            .bty-theme h1,
            .bty-theme h2,
            .bty-theme h3,
            .bty-theme h4 {
              font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
              letter-spacing: -0.025em;
            }
          `}</style>

          <section className="relative overflow-hidden border-b border-white/10 bg-[#111814] text-white">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -right-36 -top-44 h-[30rem] w-[30rem] rounded-full bg-[#D7A92E]/10 blur-3xl" />
              <div className="absolute -bottom-48 -left-36 h-[30rem] w-[30rem] rounded-full bg-[#3B5147]/35 blur-3xl" />
            </div>

            <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
              <div className="lg:col-span-7">
                <Eyebrow light>Beyond The Yellow</Eyebrow>
                <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
                  Awareness is where the conversation starts.
                  <span className="mt-2 block text-[#D7A92E]">Action is where it becomes useful.</span>
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
                  Beyond The Yellow spotlights people and organizations turning concern, support, and good intentions into work a community can actually feel.
                </p>
                <p className="mt-5 max-w-3xl leading-7 text-white/60">
                  Veteran-serving organizations are an important priority because of ValorWell's mission. They are not the boundary of the series. The standard is the work.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => chooseLane("share-story", "bty_hero_share")}
                    className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-sm font-bold text-[#111814] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Share Your Work
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => chooseLane("nominate", "bty_hero_nominate")}
                    className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Nominate Someone
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                    The question behind every feature
                  </p>
                  <blockquote className="mt-5 text-2xl font-bold leading-snug md:text-3xl">
                    If the support disappeared tomorrow, would anyone be worse off?
                  </blockquote>
                  <p className="mt-5 leading-7 text-white/65">
                    Beyond The Yellow looks for the people who can answer that question by pointing to something real they built, changed, delivered, protected, taught, connected, or made possible.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#3B5147]/15 bg-white">
            <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <a
                  href={LATEST_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("bty_latest_watch")}
                  className="group block overflow-hidden rounded-3xl border border-[#3B5147]/15 bg-[#111814] shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src="https://i.ytimg.com/vi/A4CUe3c8rJE/maxresdefault.jpg"
                      alt="Veterans Breakfast Club Beyond The Yellow conversation"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#111814] shadow-lg">
                        <PlayCircle className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#D7A92E]">
                        Featured conversation
                      </p>
                      <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
                        Veterans Breakfast Club
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="lg:col-span-5">
                <Eyebrow>See the Standard in Practice</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  Real stories are more useful than another mission statement.
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#111814]/66">
                  Veterans Breakfast Club creates low-pressure spaces where veterans can tell the ordinary, funny, painful, and historically important stories of service—and where families and communities can listen.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/veteransbreakfastclub"
                    onClick={() => track("bty_latest_feature")}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white"
                  >
                    Read the Feature
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/watch"
                    onClick={() => track("bty_latest_watch_hub")}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#3B5147]/25 px-5 py-3 text-sm font-bold text-[#3B5147]"
                  >
                    <Video className="h-4 w-4" aria-hidden="true" />
                    Watch More
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
            <div className="container-wide py-20 md:py-28">
              <div className="max-w-3xl">
                <Eyebrow>What Counts as Beyond The Yellow?</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  The cause can change. The standard does not.
                </h2>
                <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                  Beyond The Yellow is not a directory of people who care about something. It is an editorial series about people who can show what they are doing about it.
                </p>
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {standards.map(({ title, copy, Icon }) => (
                  <article
                    key={title}
                    className="rounded-3xl border border-[#3B5147]/15 bg-white p-8 shadow-sm"
                  >
                    <Icon className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                    <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                    <p className="mt-4 leading-7 text-[#111814]/64">{copy}</p>
                  </article>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-6 md:p-8">
                <div className="flex gap-4">
                  <HeartHandshake className="mt-1 h-6 w-6 shrink-0 text-[#8A6814]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold">Veteran stories are prioritized, not required.</h3>
                    <p className="mt-2 leading-7 text-[#111814]/64">
                      ValorWell's current public work is deeply rooted in veterans and military families, so those organizations will remain a major part of Beyond The Yellow. But a strong community story does not become ineligible because it serves a different population.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[#3B5147] text-white">
            <div className="container-wide py-20 md:py-28">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <Eyebrow light>Featured Organizations</Eyebrow>
                  <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                    Start with the organizations already doing the work.
                  </h2>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
                    These organizations entered ValorWell through Beyond The Yellow. The growing Network is the discovery layer for organizations and resources; Watch is the media layer for conversations and videos.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <Link
                    to="/network"
                    onClick={() => track("bty_network")}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#3B5147]"
                  >
                    <Network className="h-4 w-4" aria-hidden="true" />
                    Explore the Network
                  </Link>
                  <Link
                    to="/watch"
                    onClick={() => track("bty_watch")}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-bold text-white"
                  >
                    <Video className="h-4 w-4" aria-hidden="true" />
                    Watch Conversations
                  </Link>
                </div>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {featuredOrganizations.map((organization) => (
                  <Link
                    key={organization.name}
                    to={organization.route}
                    onClick={() => track("bty_feature_card", { organization: organization.name })}
                    className="group rounded-2xl border border-white/12 bg-white/[0.06] p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7A92E] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <Building2 className="h-6 w-6 text-[#D7A92E]" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-bold">{organization.name}</h3>
                    <p className="mt-3 leading-7 text-white/64">{organization.statement}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
                      Read the feature
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-[#3B5147]/15 bg-white">
            <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <Eyebrow>Editorial Independence</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  Attention should follow the work—not the check.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-5">
                  {[
                    "There is no fee to submit, be selected, record, or participate as an editorial guest.",
                    "Donations, sponsorships, or partnerships cannot purchase a feature or editorial preference.",
                    "A feature does not guarantee views, donations, referrals, volunteers, press, or other outcomes.",
                    "ValorWell may decline a story when the work, claims, fit, or available evidence do not support a responsible feature.",
                  ].map((item) => (
                    <div key={item} className="flex gap-4 border-b border-[#3B5147]/12 pb-5 last:border-b-0">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#3B5147]" aria-hidden="true" />
                      <p className="leading-7 text-[#111814]/68">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id={FORM_ANCHOR} className="scroll-mt-24 border-b border-[#3B5147]/15 bg-[#F4F1E8]">
            <div className="container-wide py-20 md:py-28">
              <div className="mx-auto max-w-3xl text-center">
                <Eyebrow>Bring Us the Next Story</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  Share your work—or nominate someone worth finding.
                </h2>
                <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                  You do not need a polished pitch. Give us enough to understand what is happening, why it matters, and who we should talk to.
                </p>
              </div>

              <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 rounded-xl border border-[#3B5147]/15 bg-white p-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLane("share-story");
                    track("bty_form_tab", { lane: "share-story" });
                  }}
                  aria-pressed={selectedLane === "share-story"}
                  className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                    selectedLane === "share-story"
                      ? "bg-[#3B5147] text-white"
                      : "text-[#3B5147] hover:bg-[#F4F1E8]"
                  }`}
                >
                  Share My Work
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLane("nominate");
                    track("bty_form_tab", { lane: "nominate" });
                  }}
                  aria-pressed={selectedLane === "nominate"}
                  className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                    selectedLane === "nominate"
                      ? "bg-[#3B5147] text-white"
                      : "text-[#3B5147] hover:bg-[#F4F1E8]"
                  }`}
                >
                  Nominate Someone
                </button>
              </div>

              <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-[#3B5147]/15 bg-white p-5 shadow-sm md:p-8">
                {selectedLane === "share-story" ? <UnifiedBtyForm /> : <BtyNominationForm />}
              </div>
            </div>
          </section>

          <section className="border-b border-[#3B5147]/15 bg-white">
            <div className="container-wide py-20 md:py-24">
              <div className="mx-auto max-w-3xl">
                <Eyebrow>Common Questions</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                  What to know before you submit.
                </h2>
                <Accordion type="single" collapsible className="mt-10">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.value} value={faq.value}>
                      <AccordionTrigger className="text-left text-base font-bold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-7 text-[#111814]/65">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          <section className="bg-[#111814] text-white">
            <div className="container-wide py-20 text-center md:py-24">
              <Users className="mx-auto h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                Others are going Beyond The Yellow. How about you?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">
                Show us the work, nominate the person doing it, or start by seeing the people already proving what action looks like.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => chooseLane("share-story", "bty_final_share")}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-sm font-bold text-[#111814]"
                >
                  Share a Story
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <Link
                  to="/network"
                  onClick={() => track("bty_final_network")}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 px-6 py-3 text-sm font-bold text-white"
                >
                  Explore the Network
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
