import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { DonateButton } from "@/components/DonateButton";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
    {children}
  </div>
);

const Rule = () => (
  <div className="h-px w-full bg-[color:var(--cl-evergreen)]/25" />
);

const PrimaryCTA = ({ children, to = "/contact" }: { children: React.ReactNode; to?: string }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)] px-7 py-4 text-sm font-bold tracking-wide uppercase hover:bg-[color:var(--cl-ink)] transition-colors"
  >
    {children}
  </Link>
);

const SecondaryCTA = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center border border-[color:var(--cl-evergreen)] text-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold tracking-wide uppercase hover:bg-[color:var(--cl-evergreen)] hover:text-[color:var(--cl-canvas)] transition-colors"
  >
    {children}
  </Link>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-evergreen)]/70">
    {children}
  </div>
);

const paths: { title: string; body: string; cta: string; to: string }[] = [
  {
    title: "Build Around the Veteran Mission",
    body: "Align with Operation Claims Success and help expand real veteran and family support.",
    cta: "Explore the Mission",
    to: "/operation-claims-success",
  },
  {
    title: "Tell a Real Action Story",
    body: "Bring the work you are already doing. If it is real, Beyond The Yellow may want to spotlight it.",
    cta: "Share Your Story",
    to: "/beyondtheyellow",
  },
  {
    title: "Donate to Operation Claims Success",
    body: "The lowest-friction way to move the mission. Every dollar funds real care, honest education, and provider pathways.",
    cta: "Donate to OCS",
    to: "/donate?utm_source=partner-lane&utm_medium=site&utm_campaign=ocs",
  },
];

const noEmpty = [
  "Logo swaps with no plan.",
  "Pay-to-play recognition.",
  "Paid referrals or kickbacks.",
  "Sponsor control over clinical judgment.",
  "Guaranteed views, leads, introductions, or outcomes.",
  "Fake co-branding built for optics.",
];

const audiences = [
  "Veteran and military-family organizations",
  "Nonprofits doing real work",
  "Brands with a real reason to show up",
  "Clinical groups and provider networks",
  "Media partners and creators",
  "Sponsors and funders",
  "Connectors and relationship-holders",
];

export default function Partner() {
  return (
    <Layout>
      <SEO
        title="Partner With ValorWell | Build Something Useful"
        description="Partner with ValorWell on the veteran mission, Beyond The Yellow storytelling, and real clinical infrastructure. Bring the work. We'll look for the overlap."
        canonical="/partner"
        noIndex
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Partner", url: "/partner" },
        ]}
      />

      <div className="clinicians-theme bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]">
        {/* HERO */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-16 md:py-24">
            <div className="max-w-4xl">
              <Eyebrow>Partnerships Built Around Real Action</Eyebrow>
              <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[color:var(--cl-evergreen)]">
                The right partnership should make both missions harder to ignore.
              </h1>
              <div className="mt-8 space-y-5 text-lg md:text-xl leading-relaxed max-w-3xl">
                <p>
                  ValorWell is building a public mission, a growing media and movement engine, and real clinical infrastructure underneath the work. We want to work with organizations that see partnership as more than a logo swap.
                </p>
                <p>
                  Bring the work you are already doing. Let's find the overlap and build something useful enough that both organizations are stronger because it exists.
                </p>
              </div>
              <div className="mt-10">
                <PrimaryCTA to="/beyondtheyellow">Tell Us What You're Building</PrimaryCTA>
              </div>
            </div>
          </div>
        </section>

        {/* WHY VALORWELL */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-16 md:py-24">
            <SectionLabel>More Than a Clinic. More Than a Campaign.</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight max-w-4xl text-[color:var(--cl-evergreen)]">
              We are not asking organizations to partner with an idea. We are building the mission, the platform, and the operating engine in public.
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  label: "Mission",
                  title: "Operation Claims Success",
                  body: "A care-first veteran and family mission focused on real support, not talking points.",
                },
                {
                  label: "Platform",
                  title: "Beyond The Yellow",
                  body: "Interviews, clips, stories, distribution, and visibility for people doing real work.",
                },
                {
                  label: "Engine",
                  title: "Real Clinical Infrastructure",
                  body: "Licensed care, clinicians, provider growth, and operations that make the mission credible.",
                },
              ].map((c) => (
                <div key={c.title} className="border-t-2 border-[color:var(--cl-evergreen)] pt-6">
                  <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">{c.label}</div>
                  <h3 className="mt-3 text-xl md:text-2xl font-bold text-[color:var(--cl-evergreen)]">{c.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 border-l-4 border-[color:var(--cl-ember)] pl-6 max-w-3xl">
              <p className="text-lg md:text-xl font-medium leading-relaxed italic">
                A sharp mission gets attention. Real operations build trust. Content gives the work somewhere to travel.
              </p>
            </div>
          </div>
        </section>

        {/* MUTUAL VALUE */}
        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-16 md:py-24">
            <div className="max-w-4xl">
              <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-canvas)]/70">
                Let's Be Honest About Partnership
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
                Your organization needs value too. Good.
              </h2>
              <p className="mt-8 text-lg md:text-xl leading-relaxed">
                We know a partnership only lasts when both sides get something real from it. Value shows up through storytelling, content, shared distribution, visibility, useful pathways, and association with a mission people can actually explain.
              </p>
              <div className="mt-10 border-l-4 border-[color:var(--cl-ember)] pl-6">
                <p className="text-lg md:text-xl leading-relaxed">
                  We will not promise reach we do not have. We can build strong stories, create useful content, share distribution opportunities, open real conversations, and give the right collaboration a reason to matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE WORK WITH */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-16 md:py-24">
            <SectionLabel>Who We Work With</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[color:var(--cl-evergreen)] max-w-3xl">
              Veteran organizations are a priority. Real action is the broader filter.
            </h2>
            <ul className="mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2 max-w-4xl">
              {audiences.map((a) => (
                <li key={a} className="flex items-start gap-3 border-b border-[color:var(--cl-evergreen)]/15 pb-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--cl-ember)]" />
                  <span className="text-base md:text-lg">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PARTNERSHIP PATHS */}
        <section className="bg-[color:var(--cl-canvas)] border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-16 md:py-24">
            <SectionLabel>Partnership Paths</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight max-w-4xl text-[color:var(--cl-evergreen)]">
              Start with the overlap. Not a 40-page partnership deck.
            </h2>

            <div className="mt-12 grid gap-px bg-[color:var(--cl-evergreen)]/20 md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--cl-evergreen)]/20">
              {paths.map((p, i) => (
                <div key={p.title} className="bg-[color:var(--cl-canvas)] p-8 flex flex-col">
                  <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
                    Lane {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-xl md:text-2xl font-bold text-[color:var(--cl-evergreen)]">{p.title}</h3>
                  <p className="mt-3 text-base leading-relaxed flex-1">{p.body}</p>
                  <Link
                    to={p.to}
                    className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-wide text-[color:var(--cl-ember)] hover:text-[color:var(--cl-ink)]"
                  >
                    {p.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEVERAGE SYSTEM */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-16 md:py-24">
            <SectionLabel>The Leverage System</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight max-w-4xl text-[color:var(--cl-evergreen)]">
              One organization. Three ways a collaboration can create value.
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { n: "01", title: "Operation Claims Success", body: "Mission and veteran relevance." },
                { n: "02", title: "Beyond The Yellow", body: "Storytelling, content, distribution, visibility." },
                { n: "03", title: "Real Clinical Infrastructure", body: "Care delivery, clinicians, provider growth, credibility." },
              ].map((n) => (
                <div key={n.n} className="border border-[color:var(--cl-evergreen)]/30 p-8 bg-[color:var(--cl-canvas)]">
                  <div className="text-5xl font-bold text-[color:var(--cl-ember)]">{n.n}</div>
                  <h3 className="mt-4 text-xl font-bold text-[color:var(--cl-evergreen)]">{n.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">{n.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-3xl">
              <Rule />
              <p className="mt-6 text-lg md:text-xl leading-relaxed">
                The mission gives the partnership meaning. The platform gives it a story. The operating engine proves ValorWell is actually building.
              </p>
            </div>
          </div>
        </section>

        {/* NO EMPTY PARTNERSHIPS */}
        <section className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-16 md:py-24">
            <div className="max-w-4xl">
              <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
                What We Are Not Building
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
                We are not interested in empty partnerships.
              </h2>
              <ul className="mt-10 space-y-4">
                {noEmpty.map((n) => (
                  <li key={n} className="flex items-start gap-4 border-b border-[color:var(--cl-canvas)]/15 pb-4">
                    <span className="mt-1 text-[color:var(--cl-ember)] font-bold">✕</span>
                    <span className="text-base md:text-lg">{n}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-l-4 border-[color:var(--cl-ember)] pl-6">
                <p className="text-lg md:text-xl leading-relaxed italic">
                  A smaller useful collaboration is more valuable than a big announcement nobody can explain three months later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BEYOND THE YELLOW */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-16 md:py-24">
            <div className="grid gap-12 md:grid-cols-2 items-start">
              <div>
                <SectionLabel>Already Doing Real Work?</SectionLabel>
                <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-[color:var(--cl-evergreen)]">
                  We may want to put a microphone in front of you.
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed">
                <p>
                  Beyond The Yellow spotlights people and organizations doing real work. Veteran groups are prioritized, but strong action in any cause area may be a fit.
                </p>
                <p className="font-medium">
                  Sponsorship does not buy a feature. The work has to be real.
                </p>
                <div className="pt-4">
                  <PrimaryCTA to="/beyondtheyellow">Share Your Beyond The Yellow Story</PrimaryCTA>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <section className="bg-[color:var(--cl-canvas)] border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-16 md:py-24">
            <SectionLabel>What Happens Next</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-[color:var(--cl-evergreen)] max-w-3xl">
              Start with one useful conversation.
            </h2>

            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                { n: "1", t: "Tell us what you are building." },
                { n: "2", t: "We look for overlap." },
                { n: "3", t: "If there is fit, define one real next step." },
              ].map((s) => (
                <li key={s.n} className="border-t-2 border-[color:var(--cl-evergreen)] pt-6">
                  <div className="text-4xl font-bold text-[color:var(--cl-ember)]">{s.n}</div>
                  <p className="mt-4 text-lg md:text-xl font-medium leading-snug">{s.t}</p>
                </li>
              ))}
            </ol>

            <p className="mt-12 text-base text-[color:var(--cl-ink)]/70 max-w-2xl">
              Not every inquiry becomes a partnership or collaboration. That is part of taking this seriously.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-4xl">
              <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-canvas)]/70">
                Build Something Useful
              </div>
              <h2 className="mt-4 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                Do not send us a logo and call it a partnership. Tell us what you are building.
              </h2>
              <div className="mt-8 space-y-5 text-lg md:text-xl leading-relaxed">
                <p>
                  If your organization is doing real work, serving people, building access, creating useful resources, telling important stories, or holding a relationship ValorWell should know about, start there.
                </p>
                <p>
                  The right collaboration should create value on both sides and something real for the people the work is supposed to serve.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to="/beyondtheyellow"
                  className="inline-flex items-center justify-center bg-[color:var(--cl-canvas)] text-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold tracking-wide uppercase hover:bg-[color:var(--cl-ember)] hover:text-[color:var(--cl-canvas)] transition-colors"
                >
                  Share Your Beyond The Yellow Story
                </Link>
              </div>

              <p className="mt-8 text-base text-[color:var(--cl-canvas)]/80">
                Represent a veteran organization?{" "}
                <Link to="/operation-claims-success" className="underline underline-offset-4 hover:text-[color:var(--cl-ember)]">
                  Explore Operation Claims Success →
                </Link>
              </p>

              <div className="mt-12 border-t border-[color:var(--cl-canvas)]/25 pt-8">
                <p className="text-xl md:text-2xl font-bold tracking-tight">
                  Bring the work. We'll look for the overlap.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
