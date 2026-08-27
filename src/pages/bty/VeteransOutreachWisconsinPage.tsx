import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  HeartHandshake,
  Home,
  PlayCircle,
  Quote,
  ShoppingBasket,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const videoUrl =
  "https://www.youtube.com/watch?v=hLvZfGcycOQ&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=1";

const villageImage = "https://vowvillages.com/sites/default/files/James-A.jpg";
const marketplaceImage =
  "https://vowvillages.com/sites/default/files/20250825_132043_0.jpg";

const interviewQuote: { text: string; timestamp: string } | null = null;

const impact = [
  { value: "837,898", label: "Pounds of food distributed in 2025" },
  { value: "850+", label: "Veteran families served by the Marketplace" },
  { value: "32", label: "Veterans housed in the Village in 2025" },
  { value: "10", label: "Transitions to permanent housing in 2025" },
];

const work = [
  {
    number: "01",
    icon: Home,
    title: "A private place to stabilize",
    body: "The James A. Peterson Veteran Village gives homeless and at-risk veterans private tiny-home living space instead of asking them to rebuild while cycling through a transient shelter environment.",
  },
  {
    number: "02",
    icon: ShoppingBasket,
    title: "Food without the loss of dignity",
    body: "The Veterans Marketplace operates like a grocery store rather than a handout line, allowing veterans and eligible surviving spouses to choose fresh food, household essentials, and personal-care items their families actually need.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Support after the immediate crisis",
    body: "Peer support, case management, financial literacy, job assistance, wellness activities, and permanent-housing placement help turn temporary stability into a realistic path forward.",
  },
];

export default function VeteransOutreachWisconsinPage() {
  return (
    <>
      <Helmet>
        <title>Veterans Outreach of Wisconsin | Beyond The Yellow | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow features Veterans Outreach of Wisconsin and John Shaw: a community-built model combining tiny-home housing, food access, peer support, and a path toward permanent stability."
        />
        <meta
          property="og:title"
          content="A tiny home is the beginning. The real work is what comes next. | VOW"
        />
        <meta
          property="og:description"
          content="See how Veterans Outreach of Wisconsin combines shelter, food, peer support, and practical programming to help veterans rebuild stability."
        />
        <meta property="og:image" content={villageImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/VOW" />
      </Helmet>

      <Header />
      <main id="main" className="overflow-hidden bg-background">
        <section className="relative border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-36 top-20 h-96 w-96 rounded-full bg-[hsl(var(--gold-accent))]/10 blur-3xl" />
            <div className="absolute -right-24 -top-28 h-[32rem] w-[32rem] rounded-full bg-white/[0.04] blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold-accent))]/60 to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--gold-accent))]">
                <span className="h-px w-10 bg-[hsl(var(--gold-accent))]" />
                Beyond The Yellow · Feature Story
              </div>

              <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
                A tiny home is the beginning.
                <span className="mt-2 block text-[hsl(var(--gold-accent))]">
                  The real work is what comes next.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Veterans Outreach of Wisconsin built a place where shelter is not treated as the finish line. Housing creates the breathing room. Food, peer support, routine, skills, and a path toward permanent housing are what turn that room into forward motion.
              </p>

              <div className="mt-8 border-l-2 border-[hsl(var(--gold-accent))] pl-5">
                <p className="text-sm font-bold text-white">John Shaw</p>
                <p className="mt-1 text-sm text-white/60">
                  Peer Support Specialist · Veterans Outreach of Wisconsin
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] border border-[hsl(var(--gold-accent))]/20" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/40">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/hLvZfGcycOQ?rel=0"
                      title="Beyond The Yellow conversation with John Shaw of Veterans Outreach of Wisconsin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
                >
                  <PlayCircle className="h-4 w-4 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                  Watch the full conversation on YouTube
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Why we featured them
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="max-w-4xl text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                The most interesting thing about the tiny homes is everything VOW refuses to stop doing once the key is handed over.
              </p>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Veterans Outreach of Wisconsin treats homelessness as more than the absence of a roof. A veteran may also be dealing with food insecurity, isolation, lost routine, employment barriers, trauma, financial pressure, or the simple problem of not knowing what the next stable step looks like. VOW puts those needs in one community instead of forcing the veteran to solve each one alone.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[2rem] bg-muted shadow-xl">
                <img
                  src={villageImage}
                  alt="The James A. Peterson Veteran Village tiny homes in Racine, Wisconsin"
                  className="aspect-[16/10] h-full w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                James A. Peterson Veteran Village. Image: Veterans Outreach of Wisconsin.
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                The point isn’t the tiny house
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                Stability creates enough quiet to start planning a future again.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Each veteran has private living space, while the SC Johnson Community Center provides the full-sized kitchen, laundry, showers, recreation, and shared space that make the Village function like a community rather than a row of shelters.
              </p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                VOW’s own description is explicit: building the tiny homes is the foundation. Once immediate survival is less consuming, residents can focus on financial literacy, employment, peer support, wellness, community engagement, and permanent housing.
              </p>
              <a
                href="https://vowvillages.com/veteran-village"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-bold text-[hsl(var(--navy))] underline decoration-[hsl(var(--gold-accent))] decoration-2 underline-offset-4 transition hover:opacity-70"
              >
                Explore the Veteran Village
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="relative bg-[hsl(var(--navy))] py-16 text-white md:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--gold-accent))] to-transparent" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {impact.map((item) => (
                <div key={item.label} className="border-l border-white/15 pl-5">
                  <p className="text-4xl font-black tracking-tight text-[hsl(var(--gold-accent))] md:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[14rem] text-sm leading-6 text-white/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs text-white/45">
              2025 impact figures reported by Veterans Outreach of Wisconsin.
            </p>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              {interviewQuote ? (
                <>
                  <Quote className="mx-auto h-9 w-9 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                  <blockquote className="mt-7 text-4xl font-black leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
                    “{interviewQuote.text}”
                  </blockquote>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    John Shaw · Beyond The Yellow · {interviewQuote.timestamp}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                    The idea at the center of the work
                  </p>
                  <h2 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
                    The tiny home is the foundation. The next chapter is the point.
                  </h2>
                  <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                    This section is structurally reserved for a verified line from the BTY conversation. Until the transcript is available, the page uses an editorial thesis drawn from VOW’s published program model rather than attributing words to John Shaw that we cannot verify.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                  The work in action
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                  Shelter. Food. Support. Each one makes the others more useful.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-8 text-muted-foreground">
                  VOW’s strength is not one unusual program. It is the way the programs reinforce one another around the veteran household instead of operating as isolated services.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="relative overflow-hidden rounded-[2rem] bg-[hsl(var(--navy))] lg:col-span-7">
                <img
                  src={marketplaceImage}
                  alt="Veterans Marketplace at Veterans Outreach of Wisconsin"
                  className="h-full min-h-[28rem] w-full object-cover opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-accent))]">
                    <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
                    Veterans Marketplace
                  </div>
                  <h3 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                    Food assistance designed to feel like shopping—not being handed whatever is left.
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                    Veterans and eligible surviving spouses can choose from fresh produce, meat, bakery items, pantry staples, hygiene products, and household essentials on a weekly basis.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-0 border-t border-border">
                  {work.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-7">
                        <div>
                          <span className="text-xs font-black tracking-[0.16em] text-[hsl(var(--gold-accent))]">
                            {item.number}
                          </span>
                          <Icon className="mt-4 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-foreground">{item.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex min-h-[20rem] flex-col justify-between rounded-[2rem] bg-[hsl(var(--navy))] p-8 text-white md:p-10">
                <Users className="h-8 w-8 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    Community-built
                  </p>
                  <p className="mt-4 text-3xl font-black leading-tight tracking-tight">
                    The village works because the community keeps showing up around it.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Beyond a service provider
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                VOW was built by neighbors who saw a local problem and decided it belonged to them too.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                The organization began with community volunteers in 2013 and still describes itself as grassroots and community-supported. Local businesses, schools, civic groups, tradespeople, donors, and volunteers help stock shelves, maintain the campus, build and install homes, teach skills, prepare meals, and keep the model functioning.
              </p>
              <a
                href="https://vowvillages.com/veterans-marketplace"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-bold text-[hsl(var(--navy))] underline decoration-[hsl(var(--gold-accent))] decoration-2 underline-offset-4 transition hover:opacity-70"
              >
                Explore the Veterans Marketplace
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[hsl(var(--navy))] py-16 text-white md:py-24">
          <div className="pointer-events-none absolute -right-28 -top-36 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--gold-accent))]/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Keep following the work
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
                The episode ends. The Village, Marketplace, and next move to permanent housing keep going.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                Learn more about Veterans Outreach of Wisconsin, support the Marketplace and Village, or see how a community in Racine turned concern about veteran homelessness into something people can actually use.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href="https://vowvillages.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-black text-[hsl(var(--navy))] transition hover:brightness-95"
              >
                Visit Veterans Outreach of Wisconsin
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-12">
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-7">
                {[
                  { label: "Website", url: "https://vowvillages.com/" },
                  { label: "Facebook", url: "https://www.facebook.com/VOWNonProfit" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-white"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
