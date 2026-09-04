import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  HeartHandshake,
  Network,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";

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
      onClick={() => trackHomeEvent(event, { page: "support" })}
      className={className}
    >
      {children}
    </Link>
  );
}

export default function Support() {
  useEffect(() => {
    trackHomeEvent("support_page_view", { page: "support" });
  }, []);

  return (
    <Layout>
      <SEO
        title="Support ValorWell | Fund the Work Without Buying the Outcome"
        description="Support ValorWell's care, evidence, and community work. See what can be verified, understand the boundaries, and continue to the donation page when you are ready."
        canonical="/support"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support ValorWell", url: "/support" },
        ]}
      />

      <div className="support-theme bg-[#F4F1E8] text-[#111814]">
        <style>{`
          .support-theme {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .support-theme h1,
          .support-theme h2,
          .support-theme h3,
          .support-theme h4 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.025em;
          }
        `}</style>

        <section className="relative overflow-hidden border-b border-white/10 bg-[#111814] text-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#D7A92E]/10 blur-3xl" />
            <div className="absolute -bottom-44 -left-36 h-96 w-96 rounded-full bg-[#3B5147]/35 blur-3xl" />
          </div>

          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
            <div className="lg:col-span-7">
              <Eyebrow light>Support ValorWell</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                Support the work.
                <span className="mt-2 block text-[#D7A92E]">Do not buy the story.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
                Financial support helps ValorWell build and sustain the work across care, evidence, and community. It does not purchase editorial selection, preferred treatment, referrals, outcomes, or a more flattering version of the numbers.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <TrackedLink
                  to="/donate?vw_entry_source=support-hero&vw_entry_medium=site&vw_entry_campaign=support-valorwell&vw_entry_content=hero"
                  event="support_hero_donate"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-sm font-bold text-[#111814] transition hover:brightness-95"
                >
                  Continue to Donate
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  to="/impact"
                  event="support_hero_impact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  See Verified Impact
                </TrackedLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                  The support standard
                </p>
                <blockquote className="mt-5 text-2xl font-bold leading-snug md:text-3xl">
                  A gift can strengthen the mission without becoming permission to exaggerate the impact.
                </blockquote>
                <p className="mt-5 leading-7 text-white/65">
                  ValorWell will only publish attribution or outcome claims when the underlying records support them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>What Support Strengthens</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                The mission has three jobs. Financial support can strengthen all three.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                We do not reduce every contribution to a one-line equivalency. The public model is broader and more accurate: Care, Impact, and Community each require infrastructure to work well.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8">
                <Stethoscope className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">
                  Care
                </p>
                <h3 className="mt-3 text-2xl font-bold">Real care and the infrastructure underneath it.</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Clinical operations, access pathways, technology, coordination, and the systems required to make care usable and responsible.
                </p>
              </article>

              <article className="rounded-3xl border border-[#3B5147]/15 bg-[#111814] p-8 text-white">
                <Eye className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">
                  Impact
                </p>
                <h3 className="mt-3 text-2xl font-bold">Measurement before marketing.</h3>
                <p className="mt-4 leading-7 text-white/64">
                  Better records, cleaner definitions, reconciliation, and reporting so public impact claims are tied to evidence rather than aspiration.
                </p>
              </article>

              <article className="rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8">
                <Network className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">
                  Community
                </p>
                <h3 className="mt-3 text-2xl font-bold">Useful stories, connections, and discovery.</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Beyond The Yellow, the growing Network, public education, and community relationships that help useful work become easier to find.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow light>What Support Does Not Buy</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Some boundaries are more important than fundraising convenience.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-5">
                {[
                  "A donation does not purchase a Beyond The Yellow feature, endorsement, or editorial preference.",
                  "A donor does not receive preferred treatment, clinical decisions, referrals, documentation, or care access.",
                  "A contribution does not guarantee a specific number of sessions, people served, outcomes, views, or other results unless ValorWell explicitly publishes a supportable attribution model.",
                  "Financial support does not turn a partnership announcement, campaign, or activity into proof of impact.",
                ].map((item) => (
                  <div key={item} className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#D7A92E]" aria-hidden="true" />
                    <p className="leading-7 text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <Eyebrow>Transparency Before the Ask</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                See what ValorWell can verify before deciding to support it.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#111814]/66">
                The Impact page is where ValorWell separates documented production records from newer reconciled ledgers and explains what the organization is not yet prepared to call an all-time total.
              </p>
              <TrackedLink
                to="/impact"
                event="support_transparency_impact"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147] underline decoration-[#3B5147]/30 underline-offset-4"
              >
                Review the Current Impact Snapshot
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-[#3B5147]/15 bg-white p-8 shadow-sm">
                <HeartHandshake className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-bold">Ready to contribute?</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Continue to the donation handoff when you are comfortable with the work, the current evidence, and the boundaries above.
                </p>
                <TrackedLink
                  to="/donate?vw_entry_source=support-final&vw_entry_medium=site&vw_entry_campaign=support-valorwell&vw_entry_content=final"
                  event="support_final_donate"
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-sm font-bold text-white"
                >
                  Continue to Donate
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
