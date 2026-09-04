import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CircleHelp,
  Eye,
  HeartHandshake,
  MapPinned,
  Network,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";

const SNAPSHOT_DATE = "September 4, 2026";

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
        title="ValorWell Impact | What We Can Verify"
        description="See the current evidence ValorWell can verify, how the numbers are defined, and what we are not claiming until the underlying history is fully reconciled."
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
            <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#D7A92E]/[0.09] blur-3xl" />
            <div className="absolute -bottom-40 -left-28 h-80 w-80 rounded-full bg-[#3B5147]/[0.08] blur-3xl" />
          </div>

          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
            <div className="lg:col-span-8">
              <Eyebrow>Impact</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                Impact should be visible, not assumed.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#111814]/70 md:text-xl">
                This page is built around evidence ValorWell can define and support right now. When the record is incomplete or two systems measure different things, we will say that instead of turning uncertainty into a bigger number.
              </p>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#3B5147]/20 bg-white/70 px-4 py-2 text-sm font-bold text-[#3B5147]">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Production snapshot verified {SNAPSHOT_DATE}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#111814] p-8 text-white shadow-xl">
                <Eye className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                  Our rule
                </p>
                <p className="mt-4 text-2xl font-bold leading-snug">
                  Define the measure. Show the date. Explain the limitation.
                </p>
                <p className="mt-5 leading-7 text-white/65">
                  If we cannot do those three things, it is not ready to become an impact claim.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>What the Current Production Record Shows</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                A snapshot, not an inflated all-time total.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                The figures below come from ValorWell&apos;s current production EHR. They describe the records that are present today and are intentionally labeled by what they actually measure.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-7">
                <p className="text-5xl font-bold text-[#3B5147]">233</p>
                <h3 className="mt-5 text-xl font-bold">Documented appointment records</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Appointment records currently marked documented in the production EHR.
                </p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#3B5147]/75">
                  Jan. 16, 2025 – Aug. 31, 2026
                </p>
              </article>

              <article className="rounded-3xl bg-[#111814] p-7 text-white">
                <p className="text-5xl font-bold text-[#D7A92E]">55</p>
                <h3 className="mt-5 text-xl font-bold">Qualifying-session ledger records</h3>
                <p className="mt-3 leading-7 text-white/62">
                  Sessions reconciled into the newer qualifying-session ledger used by the current clinical-completion architecture.
                </p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                  Mar. 18, 2026 – Aug. 31, 2026
                </p>
              </article>

              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-7">
                <Users className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-5 text-5xl font-bold text-[#3B5147]">5</p>
                <h3 className="mt-4 text-xl font-bold">Clinicians represented</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Distinct clinicians attached to the documented appointment history currently present in production.
                </p>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-7">
                <MapPinned className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-5 text-5xl font-bold text-[#8A6814]">5</p>
                <h3 className="mt-4 text-xl font-bold">Client states represented</h3>
                <p className="mt-3 leading-7 text-[#111814]/62">
                  Distinct client states represented among the documented appointment records in the current production history.
                </p>
              </article>
            </div>

            <p className="mt-7 max-w-4xl text-sm leading-6 text-[#111814]/55">
              Snapshot captured September 4, 2026. The documented appointment history currently contains 13 distinct client records and 5 distinct clinicians. These counts describe the production data present now; they are not presented as a complete all-time history of ValorWell.
            </p>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">
                Why Two Care Numbers?
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Because the records measure different things.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-lg leading-8 text-white/72">
                ValorWell&apos;s current production EHR contains a broader historical set of appointments marked documented. In 2026, ValorWell introduced a stricter clinical-finalization and qualifying-session ledger. Historical records have not all been reconciled into that newer ledger.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/72">
                That is why 233 and 55 are shown separately. Combining them, treating them as equivalent, or presenting either as an all-time sessions-delivered total would overstate what the current evidence proves.
              </p>
              <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-6">
                <div className="flex gap-4">
                  <CircleHelp className="mt-1 h-6 w-6 shrink-0 text-[#D7A92E]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold">What would make an all-time total publishable?</h3>
                    <p className="mt-3 leading-7 text-white/65">
                      A reconciled historical ledger with a stable definition, duplicate controls, clear inclusion rules, and a repeatable way to reproduce the number later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>What We Are Not Claiming Yet</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                A smaller honest claim is stronger than a bigger uncertain one.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {[
                [
                  "All-time people served",
                  "The current production record does not yet support a clean all-time people-served number across every historical system and migration period.",
                ],
                [
                  "All-time sessions delivered",
                  "The documented appointment history and the newer qualifying-session ledger are not yet fully reconciled, so neither is being relabeled as the lifetime total.",
                ],
                [
                  "Donation-to-care attribution",
                  "ValorWell is not claiming that every contribution funded a session or a specific amount of care without accounting evidence that supports that attribution.",
                ],
                [
                  "Clinical outcome improvement",
                  "Service delivery is not the same thing as proving symptom improvement or comparative clinical outcomes. Those claims require a defined measurement system and evidence.",
                ],
              ].map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[#3B5147]/15 bg-white p-7">
                  <ShieldCheck className="h-6 w-6 text-[#3B5147]" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-[#111814]/62">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Impact Is Bigger Than One Number</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Care, infrastructure, and community each leave different evidence.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8">
                <Stethoscope className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">Care</p>
                <h3 className="mt-3 text-2xl font-bold">Did real care happen?</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Service records, clinician-finalized care, access pathways, and eventually responsibly measured outcomes belong here.
                </p>
                <TrackedLink
                  to="/get-care"
                  event="impact_care"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Find Care <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>

              <article className="rounded-3xl bg-[#111814] p-8 text-white">
                <Building2 className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">Infrastructure</p>
                <h3 className="mt-3 text-2xl font-bold">Did the path become more usable?</h3>
                <p className="mt-4 leading-7 text-white/64">
                  Better workflows, clinician systems, clearer routing, and operating controls matter because they determine whether care can be delivered responsibly and repeatedly.
                </p>
                <TrackedLink
                  to="/mission"
                  event="impact_mission"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white"
                >
                  Read the Mission <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8">
                <Network className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">Community</p>
                <h3 className="mt-3 text-2xl font-bold">Did useful action become easier to find?</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Beyond The Yellow, Watch, and Network help surface people and organizations doing real work and give others a way to find and join it.
                </p>
                <TrackedLink
                  to="/network"
                  event="impact_network"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  Explore the Network <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">What Comes Next</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Make the evidence better, then make the page stronger.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-5">
                {[
                  "Reconcile historical service records into one reproducible all-time ledger.",
                  "Publish metric definitions and as-of dates beside material numbers.",
                  "Add human stories only with appropriate permission and privacy protection.",
                  "Add support-enabled care or funding attribution only when accounting can prove the connection.",
                  "Add clinical outcome reporting only after the measurement method is defined and consistently collected.",
                ].map((item, index) => (
                  <div key={item} className="grid gap-4 border-b border-white/10 pb-5 last:border-b-0 sm:grid-cols-[44px_1fr]">
                    <p className="text-sm font-bold text-[#D7A92E]">0{index + 1}</p>
                    <p className="leading-7 text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#3B5147] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <HeartHandshake className="mx-auto h-9 w-9 text-[#D7A92E]" aria-hidden="true" />
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              See the work. Use the care. Help strengthen what comes next.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Impact is not a finish line. It is the record of whether the mission is becoming real.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedLink
                to="/watch"
                event="impact_final_watch"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#3B5147]"
              >
                Watch ValorWell
              </TrackedLink>
              <TrackedLink
                to="/get-care"
                event="impact_final_care"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/35 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Find Care
              </TrackedLink>
              <TrackedLink
                to="/donate"
                event="impact_final_donate"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/35 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Support the Work
              </TrackedLink>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
