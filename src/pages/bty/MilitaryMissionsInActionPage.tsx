import { Helmet } from "react-helmet-async";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Car,
  ExternalLink,
  Home,
  Package,
  PlayCircle,
  Quote,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const videoUrl =
  "https://www.youtube.com/watch?v=19JpCgF-d9Q&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=2";

const suppliesImage =
  "https://static.wixstatic.com/media/741bf1_4939fae2dd8a4cf4b56d3124491be958~mv2.jpg/v1/fill/w_980,h_551,al_c,q_85,usm_0.66_1.00_0.01,quality_auto/741bf1_4939fae2dd8a4cf4b56d3124491be958~mv2.jpg";

const impact = [
  { value: "126,463", label: "Veterans of all eras served" },
  { value: "832", label: "Building projects completed" },
  { value: "767", label: "Veterans’ homes furnished" },
  { value: "87%", label: "Of every dollar to programs & service" },
];

const programs = [
  {
    number: "01",
    icon: Accessibility,
    title: "Operation Building Hope",
    body: "MMIA removes physical barriers inside and around the home—building wheelchair ramps and making accessibility modifications so Veterans with disabilities can live more safely and independently.",
  },
  {
    number: "02",
    icon: Home,
    title: "Homes for Healing",
    body: "Housing is only the first step. MMIA delivers furniture and household essentials to formerly homeless Veterans so an apartment can become a functional home instead of an empty room.",
  },
  {
    number: "03",
    icon: Package,
    title: "Fill The Footlocker",
    body: "The program turns community donations into practical essentials for homeless Veterans and holiday support for low-income military and Veteran families.",
  },
  {
    number: "04",
    icon: Car,
    title: "Warrior Wagon",
    body: "A no-cost, handicap-accessible rideshare closes the transportation gap between Veterans and medical care, employment, groceries, government services, and other essential destinations.",
  },
];

export default function MilitaryMissionsInActionPage() {
  return (
    <>
      <Helmet>
        <title>Military Missions in Action | Beyond The Yellow | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow features Military Missions in Action and Executive Director Zak Keisler: practical veteran support through accessibility projects, home furnishings, essential supplies, and transportation."
        />
        <meta
          property="og:title"
          content="Support isn’t a slogan. It’s a ramp, a furnished room, and a ride. | MMIA"
        />
        <meta
          property="og:description"
          content="See how Military Missions in Action turns support for Veterans into concrete work across North Carolina."
        />
        <meta property="og:image" content={suppliesImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/mmia" />
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
                Support isn’t a slogan.
                <span className="mt-2 block text-[hsl(var(--gold-accent))]">
                  It’s a ramp. A furnished room. A ride that shows up.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Military Missions in Action turns broad support for Veterans into specific, physical solutions across North Carolina—removing the practical barriers that can remain long after someone has been told help is available.
              </p>

              <div className="mt-8 border-l-2 border-[hsl(var(--gold-accent))] pl-5">
                <p className="text-sm font-bold text-white">Zak Keisler</p>
                <p className="mt-1 text-sm text-white/60">
                  Executive Director · Military Missions in Action
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
                      src="https://www.youtube-nocookie.com/embed/19JpCgF-d9Q?rel=0"
                      title="Beyond The Yellow conversation with Zak Keisler of Military Missions in Action"
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
                “Support” means very little if the last barrier is still standing between a Veteran and everyday life.
              </p>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                MMIA works in the unglamorous space between a program existing and a person actually being able to use it. A housing voucher does not furnish an apartment. A medical appointment does not provide transportation. A front door does not create independence when a wheelchair cannot reach it. Their work closes those last-mile gaps with something tangible.
              </p>
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
                  <p className="mt-2 max-w-[13rem] text-sm leading-6 text-white/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs text-white/45">
              Current impact figures reported by Military Missions in Action on its public website.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Quote className="mx-auto h-9 w-9 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
              <blockquote className="mt-7 text-4xl font-black leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
                “I would rather our work speak for us.”
              </blockquote>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Zak Keisler · Beyond The Yellow · 52:00
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                For MMIA, the work is the proof: the ramp gets built, the empty apartment gets furnished, the ride shows up, and the backpack reaches the person who needs it. The question is not whether support sounds good. It is whether a Veteran is materially better off because somebody acted.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                  The work in action
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                  Four programs. One simple test: did the barrier actually get removed?
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-8 text-muted-foreground">
                  MMIA’s programs address different needs, but they share the same operating principle: practical help should change what a Veteran can do tomorrow.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="relative overflow-hidden rounded-[2rem] bg-[hsl(var(--navy))] lg:col-span-7">
                <img
                  src={suppliesImage}
                  alt="Supplies prepared through Military Missions in Action's Fill The Footlocker program"
                  className="h-full min-h-[28rem] w-full object-cover opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-accent))]">
                    <Package className="h-4 w-4" aria-hidden="true" />
                    Practical support
                  </div>
                  <h3 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                    The small things stop being small when you do not have them.
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                    Hygiene products, household basics, furniture, mobility access, transportation—MMIA’s model is built around the things that are easy to overlook until their absence becomes the barrier.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-0 border-t border-border">
                  {programs.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-6">
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

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex h-full min-h-[19rem] flex-col justify-between rounded-[2rem] bg-[hsl(var(--navy))] p-8 text-white md:p-10">
                <Car className="h-8 w-8 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    Warrior Wagon
                  </p>
                  <p className="mt-4 text-3xl font-black leading-tight tracking-tight">
                    Sometimes the barrier is simply getting there.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Access has a last mile
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                A resource only matters if the Veteran can reach it.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Warrior Wagon provides no-cost, handicap-accessible rides to medical and mental-health appointments, job interviews, employment, grocery stores, government offices, and other essential destinations. MMIA currently offers the service in Wake, Durham, Johnston, Harnett, Moore, and Orange counties.
              </p>
              <a
                href="https://www.militarymissionsinaction.org/warriorwagon"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-bold text-[hsl(var(--navy))] underline decoration-[hsl(var(--gold-accent))] decoration-2 underline-offset-4 transition hover:opacity-70"
              >
                Learn about Warrior Wagon
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
                The conversation ends. The next ramp, delivery, and ride still have to happen.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                Learn more about Military Missions in Action’s programs, volunteer opportunities, and ways to support practical work for Veterans across North Carolina.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href="https://www.militarymissionsinaction.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-black text-[hsl(var(--navy))] transition hover:brightness-95"
              >
                Visit MMIA
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-12">
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-7">
                {[
                  { label: "Website", url: "https://www.militarymissionsinaction.org/" },
                  { label: "YouTube", url: "https://www.youtube.com/channel/UCEJdMO3nmmy6hdJlZ-oE2Zg" },
                  { label: "Facebook", url: "https://www.facebook.com/MilitaryMissionsInAction/" },
                  { label: "Instagram", url: "https://www.instagram.com/mmia27526/" },
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
