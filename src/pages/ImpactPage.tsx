import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPinned,
  Quote,
  ShieldCheck,
  Stethoscope,
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

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
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
        description="See how donations to ValorWell paid for 540+ hours of direct therapy for 45+ veterans across 11 states in 2026."
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
                When veterans could not get seen, your donations paid for their therapy.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#111814]/72 md:text-xl">
                People donated money to ValorWell. We used those donations to pay therapists to provide mental-health care to veterans who had already tried to get care through the VA but still could not get seen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  to="/donate"
                  event="impact_hero_donate"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-sm font-bold text-white hover:bg-[#31443b]"
                >
                  Help Pay for the Next Veteran&apos;s Therapy
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-5xl font-bold text-[#D7A92E]">540+</p>
                    <p className="mt-1 text-sm text-white/65">hours of direct therapy</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/12 pt-5">
                    <div>
                      <p className="text-3xl font-bold">45+</p>
                      <p className="mt-1 text-sm text-white/55">veterans</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">11</p>
                      <p className="mt-1 text-sm text-white/55">states</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <Eyebrow light>Why Veterans Still Needed Help</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  They asked the VA for help. They still couldn&apos;t get a therapist.
                </h2>
              </div>

              <div className="lg:col-span-7">
                <p className="text-lg leading-8 text-white/75">
                  The veterans represented here had already sought mental-health care through the VA. Many were denied access to VA Community Care. Others reached the Community Care pathway but could not find a provider who was available or willing to work with them.
                </p>
                <p className="mt-5 text-lg leading-8 text-white/75">
                  The circumstances were different, but the result was the same: they had asked for help and still did not have a therapist.
                </p>
              </div>
            </div>

            <div className="mt-14 rounded-3xl border border-white/15 bg-white/[0.06] p-7 md:p-9">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                  What VA Community Care is supposed to do
                </p>
                <p className="mt-4 text-lg leading-8 text-white/72">
                  VA Community Care can allow eligible veterans to receive treatment from providers outside the VA. But several things still have to line up before a veteran actually reaches a therapist.
                </p>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-4">
                {[
                  ["01", "VA mental-health care", "The veteran asks for help."],
                  ["02", "Eligibility & authorization", "The Community Care path has to be approved and authorized."],
                  ["03", "Available provider", "A provider has to be available and able to accept the veteran."],
                  ["04", "Actual therapy", "Only then does the veteran finally get seen."],
                ].map(([number, title, copy]) => (
                  <article key={number} className="rounded-2xl border border-white/12 bg-[#111814]/35 p-5">
                    <p className="text-sm font-bold text-[#D7A92E]">{number}</p>
                    <h3 className="mt-3 text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/60">{copy}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#111814] p-6 md:p-8">
                <p className="text-2xl font-bold leading-snug md:text-3xl">
                  If any part of that path breaks, a veteran can still end up without care.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow>Where Donations Enter the Story</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                When the normal path stopped, donors helped create another one.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#111814]/65">
                ValorWell used donated funds to pay the therapist so the veteran did not have to. That turned a failed care pathway into an actual therapy session.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8 text-center">
                <HeartHandshake className="mx-auto h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">Step 1</p>
                <h3 className="mt-3 text-2xl font-bold">People donate.</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">Supporters give money to ValorWell to help veterans get mental-health care.</p>
              </article>

              <article className="rounded-3xl bg-[#111814] p-8 text-center text-white">
                <Stethoscope className="mx-auto h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">Step 2</p>
                <h3 className="mt-3 text-2xl font-bold">ValorWell pays the therapist.</h3>
                <p className="mt-3 leading-7 text-white/62">Donated funds pay for the therapist&apos;s time instead of asking the veteran to cover the session.</p>
              </article>

              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">Step 3</p>
                <h3 className="mt-3 text-2xl font-bold">The veteran gets therapy.</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">The donation becomes real time between a veteran and a therapist.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>What Your Donations Made Possible</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                These are not projections. This care already happened.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                These 2026 numbers measure the donor-funded therapy described above. They do not represent all care provided by ValorWell.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-white p-8">
                <Clock className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-6 text-5xl font-bold text-[#3B5147]">540+</p>
                <h3 className="mt-4 text-xl font-bold">Hours of direct therapy</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Actual time spent directly between veterans and therapists. Administrative work, case management, and other operating activity are not included.
                </p>
              </article>

              <article className="rounded-3xl bg-[#111814] p-8 text-white">
                <Users className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-6 text-5xl font-bold text-[#D7A92E]">45+</p>
                <h3 className="mt-4 text-xl font-bold">Veterans who received care</h3>
                <p className="mt-3 leading-7 text-white/65">
                  Unique veterans who had already sought VA mental-health care but were still unable to get seen.
                </p>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8">
                <MapPinned className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-6 text-5xl font-bold text-[#8A6814]">11</p>
                <h3 className="mt-4 text-xl font-bold">States served</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Veterans across 11 states received this donor-funded therapy in 2026.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow light>The Problem Beneath the Problem</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                The veteran should not have to become the project manager.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-lg leading-8 text-white/72">
                Asking for help should be the hard part. Veterans should not then have to navigate eligibility rules, referrals, authorizations, provider directories, unanswered calls, and availability problems just to reach a therapist.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Some veterans make it through several steps of that process and still end up without anyone to see them. ValorWell cannot fix every part of that system, but when donated funds are available, we can help make sure a broken pathway does not automatically mean going without therapy.
              </p>
              <p className="mt-5 text-lg font-semibold leading-8 text-white">
                When a veteran has already asked for mental-health help, leaving them without care is not a harmless delay. Donor-funded therapy gives us another opportunity to intervene—potentially preventing another veteran from becoming another statistic.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Real Veterans. Real Impact.</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                The numbers tell us how much care was provided. These veterans tell us what that care meant.
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

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Eyebrow light>Where Your Donation Goes</Eyebrow>
                <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                  100%* of donated funds go toward paying therapists for therapy sessions.
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                  ValorWell&apos;s administrative, technology, marketing, staffing, and other operating expenses are funded separately. Donated funds are reserved for paying therapists.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-8">
                  <ShieldCheck className="h-9 w-9 text-[#D7A92E]" aria-hidden="true" />
                  <p className="mt-6 text-2xl font-bold leading-snug">
                    You are not paying for our website. You are not paying for advertising. You are helping pay a therapist to sit down with a veteran who needs care.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-10 max-w-5xl border-t border-white/10 pt-6 text-sm leading-6 text-white/55">
              *Charitable donations to ValorWell are received through the ValorWell Foundation, a 501(c)(3) nonprofit organization. The 100% statement excludes unavoidable third-party payment-processing fees deducted before funds are received. ValorWell does not retain or redirect donated funds for administrative or other operating costs.
            </p>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>You Do Not Have to Solve the Whole Problem Yourself</Eyebrow>
              <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                Most supporters are building this one manageable monthly gift at a time.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#111814]/68">
                Most donors are not funding an entire course of therapy by themselves. Their donations combine with support from other people to make the care possible.
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
                  Small recurring gifts matter because many supporters funding care together can do what one donor does not have to do alone.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#111814] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <HeartHandshake className="mx-auto h-10 w-10 text-[#D7A92E]" aria-hidden="true" />
            <Eyebrow light>Help Pay for the Next Veteran&apos;s Therapy</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Another veteran will ask for help and still find themselves without a therapist.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Your donation can help ValorWell pay the therapist and give that veteran another path into care.
            </p>
            <TrackedLink
              to="/donate"
              event="impact_final_donate"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-sm font-bold text-[#111814] hover:bg-[#e2b943]"
            >
              Donate to ValorWell <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </div>
    </Layout>
  );
}
