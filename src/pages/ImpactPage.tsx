import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  HeartHandshake,
  MapPinned,
  Quote,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";

const SNAPSHOT_DATE = "September 5, 2026";

const testimonials = [
  {
    initials: "J.B.",
    branch: "U.S. Army",
    state: "Michigan",
    quote:
      "For years, I was just a name on a VA waiting list. I was a soldier, a wife, and a mother, but I felt like I was disappearing. ValorWell stepped in when the system failed, providing the therapy I desperately needed to be present for my children again. They didn't just provide a service; they gave me my family back.",
  },
  {
    initials: "M.G.",
    branch: "U.S. Marine Corps",
    state: "Nevada",
    quote:
      "I spent years believing I had to fight the war in my head alone. When I finally asked for help, the VA told me I was on a list—but while I waited, the walls were closing in. I felt invisible to the country I served. ValorWell didn't just find me a therapist; they gave me a lifeline when I was at my lowest point. For the first time in a decade, I feel like I’m finally coming home.",
  },
  {
    initials: "B.F.",
    branch: "U.S. Navy",
    state: "Arkansas",
    quote:
      "I could feel my family slipping away from me. My marriage was fracturing, and I was becoming a stranger to my own children. I reached out to the VA repeatedly, but my crisis was treated like a clerical error—I was told to wait, over and over, while my home life fell apart. ValorWell stepped in when I had nothing left to give. They provided the therapy that gave me the tools to understand my trauma and, more importantly, how to communicate through it. Because of ValorWell, I didn't just get help—I got my family back.",
  },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3B5147]">
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
      onClick={() => trackHomeEvent(event, { page: "impact" })}
      className={className}
    >
      {children}
    </Link>
  );
}

export default function ImpactPage() {
  useEffect(() => {
    trackHomeEvent("impact_page_view", { page: "impact" });
  }, []);

  return (
    <Layout>
      <SEO
        title="ValorWell Impact | Donations Put Veterans in Therapy"
        description="See how ValorWell Foundation supporters have funded 540+ hours of direct therapy for 45+ veterans across 11 states in 2026."
        canonical="/impact"
      />

      <div className="impact-theme bg-[#F4F1E8] text-[#111814]">
        <style>{`
          .impact-theme {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .impact-theme h1,
          .impact-theme h2,
          .impact-theme h3,
          .impact-theme h4 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.025em;
          }
        `}</style>

        <section className="relative overflow-hidden border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#D7A92E]/[0.10] blur-3xl" />
            <div className="absolute -bottom-40 -left-28 h-80 w-80 rounded-full bg-[#3B5147]/[0.09] blur-3xl" />
          </div>

          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
            <div className="lg:col-span-8">
              <Eyebrow>2026 Impact</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                When the system says wait, your support helps us say yes.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#111814]/72 md:text-xl">
                Veterans have come to ValorWell after seeking help through the VA and being denied Community Care. Donations to the ValorWell Foundation allow us to pay therapists so those veterans can get into care instead of continuing to wait.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  to="/donate"
                  event="impact_hero_donate"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-sm font-bold text-white hover:bg-[#31443b]"
                >
                  Help Fund the Next Hour <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <div className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#3B5147]/20 bg-white/70 px-5 py-3 text-sm font-bold text-[#3B5147]">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Impact snapshot {SNAPSHOT_DATE}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#111814] p-8 text-white shadow-xl">
                <HeartHandshake className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                  What donations did in 2026
                </p>
                <p className="mt-4 text-3xl font-bold leading-snug">
                  540+ hours of direct therapy for veterans who needed somewhere else to turn.
                </p>
                <p className="mt-5 leading-7 text-white/68">
                  Those hours represent real time between a veteran and a therapist—funded by people who chose to help.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>What Your Support Has Made Possible</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                These are not projections. This care already happened.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                So far in 2026, donor funding has paid for direct therapy for veterans who came to ValorWell after trying to access care through the VA.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8">
                <Clock className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-6 text-5xl font-bold text-[#3B5147]">540+</p>
                <h3 className="mt-4 text-xl font-bold">Hours of direct therapy</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Direct time in therapy paid for through ValorWell Foundation funding in 2026.
                </p>
              </article>

              <article className="rounded-3xl bg-[#111814] p-8 text-white">
                <Users className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-6 text-5xl font-bold text-[#D7A92E]">45+</p>
                <h3 className="mt-4 text-xl font-bold">Veterans reached</h3>
                <p className="mt-3 leading-7 text-white/65">
                  Unique veterans who received donor-funded care when they needed another path to treatment.
                </p>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8">
                <MapPinned className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-6 text-5xl font-bold text-[#8A6814]">11</p>
                <h3 className="mt-4 text-xl font-bold">States served</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Veterans across 11 states have received therapy through this donor-funded care program.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">
                Why This Care Exists
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                They asked the VA for help. They were denied Community Care. We saw them.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-lg leading-8 text-white/75">
                The veterans represented here reached out to ValorWell after going to the VA for care, trying to get seen, and being denied access through Community Care. Waiting longer was not an acceptable answer.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/75">
                Supporters gave the ValorWell Foundation the ability to pay therapists directly and create another path into treatment—helping veterans get care when they needed it and potentially preventing them from becoming another statistic.
              </p>
              <TrackedLink
                to="/donate"
                event="impact_gap_donate"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-sm font-bold text-[#111814] hover:bg-[#e2b943]"
              >
                Help Us Keep Saying Yes <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Real Veterans. Real Impact.</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Behind every hour is a person trying to get part of their life back.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.initials}
                  className={
                    index === 1
                      ? "flex h-full flex-col rounded-3xl bg-[#111814] p-8 text-white"
                      : "flex h-full flex-col rounded-3xl border border-[#3B5147]/15 bg-white p-8"
                  }
                >
                  <Quote
                    className={index === 1 ? "h-8 w-8 text-[#D7A92E]" : "h-8 w-8 text-[#3B5147]"}
                    aria-hidden="true"
                  />
                  <blockquote
                    className={
                      index === 1
                        ? "mt-6 flex-1 text-lg leading-8 text-white/78"
                        : "mt-6 flex-1 text-lg leading-8 text-[#111814]/68"
                    }
                  >
                    “{testimonial.quote}”
                  </blockquote>
                  <div className={index === 1 ? "mt-8 border-t border-white/12 pt-5" : "mt-8 border-t border-[#3B5147]/12 pt-5"}>
                    <p className={index === 1 ? "font-bold text-white" : "font-bold text-[#111814]"}>
                      {testimonial.initials}
                    </p>
                    <p className={index === 1 ? "mt-1 text-sm text-white/55" : "mt-1 text-sm text-[#111814]/55"}>
                      {testimonial.branch} · {testimonial.state}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>You Do Not Have to Give a Lot to Matter</Eyebrow>
              <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                Most of this impact is being built one manageable monthly gift at a time.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#111814]/68">
                Some supporters give what they might otherwise spend on a few coffees. Others give up one meal out. The point is not the sacrifice—it is what happens when enough people decide that a veteran should not have to wait alone.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-7">
                <p className="text-5xl font-bold text-[#3B5147]">72%</p>
                <h3 className="mt-4 text-xl font-bold">of 2026 donors give monthly</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Recurring support gives ValorWell a more dependable way to keep therapy available when veterans reach out.
                </p>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-7">
                <p className="text-5xl font-bold text-[#8A6814]">$25</p>
                <h3 className="mt-4 text-xl font-bold">is the most common monthly gift</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  You do not have to fund an entire course of care by yourself. You join other supporters who are funding it together.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">
                  Where Your Donation Goes
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                  100%* of Foundation funds go to pay therapists for therapy sessions.
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                  ValorWell and the ValorWell Foundation do not use donated funds for administrative costs, staffing overhead, technology, marketing, or other operating expenses.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-8">
                  <ShieldCheck className="h-9 w-9 text-[#D7A92E]" aria-hidden="true" />
                  <p className="mt-6 text-2xl font-bold leading-snug">
                    You are not paying for our office. You are not paying for advertising. You are helping pay a therapist to be there for a veteran who needs someone there.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-10 max-w-5xl border-t border-white/10 pt-6 text-sm leading-6 text-white/50">
              *Excludes unavoidable third-party payment-processing fees deducted before funds are received by the Foundation. ValorWell and the ValorWell Foundation do not retain or redirect donated funds for administrative or other operating costs.
            </p>
          </div>
        </section>

        <section className="bg-[#3B5147] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <HeartHandshake className="mx-auto h-10 w-10 text-[#D7A92E]" aria-hidden="true" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">
              Fund the Next Hour
            </p>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              The next veteran who is told to wait should still have somewhere to turn.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Your donation joins other supporters in paying therapists so ValorWell can keep opening another door to care.
            </p>
            <TrackedLink
              to="/donate"
              event="impact_final_donate"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#3B5147] hover:bg-[#F4F1E8]"
            >
              Donate to the ValorWell Foundation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </div>
    </Layout>
  );
}
