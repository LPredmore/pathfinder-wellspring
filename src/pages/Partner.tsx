import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Network,
  ShieldCheck,
  Users,
  Waypoints,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";
import partnerCareAccessCommunityAsset from "@/assets/partner-care-access-community.png.asset.json";

type CollaborationPath = {
  title: string;
  copy: string;
  examples: string;
  Icon: LucideIcon;
};

const collaborationPaths: CollaborationPath[] = [
  {
    title: "Veteran & military-family organizations",
    copy: "Work together where clearer care access, useful education, resource discovery, introductions, or community visibility can create a better next step.",
    examples: "Education · resource connections · introductions · shared outreach",
    Icon: Users,
  },
  {
    title: "Community organizations & employers",
    copy: "Create practical connections around mental well-being, veteran-family support, community action, or a specific problem both organizations are equipped to address.",
    examples: "Community resources · employee/veteran support · local collaboration",
    Icon: Building2,
  },
  {
    title: "Creators, media & storytellers",
    copy: "Help useful stories travel farther through interviews, guest introductions, distribution, education, and conversations worth putting in front of more people.",
    examples: "Beyond The Yellow · interviews · distribution · guest introductions",
    Icon: Lightbulb,
  },
  {
    title: "Connectors & infrastructure partners",
    copy: "Introduce ValorWell to people, systems, organizations, clinicians, tools, or relationships that can make care, impact, or community work more effective.",
    examples: "Introductions · technology · operational resources · strategic relationships",
    Icon: Waypoints,
  },
];

const fitChecks = [
  {
    title: "There is a useful outcome",
    copy: "The relationship should create something more concrete than two logos appearing next to each other.",
  },
  {
    title: "The roles are clear",
    copy: "We should be able to explain what ValorWell contributes, what the other organization contributes, and what happens next.",
  },
  {
    title: "The claims are supportable",
    copy: "A partnership cannot become permission to exaggerate reach, access, outcomes, funding, or impact.",
  },
  {
    title: "The relationship protects trust",
    copy: "Clinical judgment, editorial selection, and care access cannot be bought or traded for visibility, referrals, or financial support.",
  },
];

function Eyebrow({ children, yellow = false }: { children: ReactNode; yellow?: boolean }) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] ${
        yellow ? "text-[#D7A92E]" : "text-[#3B5147]"
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
      onClick={() => trackHomeEvent(event, { page: "partner" })}
      className={className}
    >
      {children}
    </Link>
  );
}

export default function Partner() {
  useEffect(() => {
    trackHomeEvent("partner_page_view", { page: "partner" });
  }, []);

  return (
    <Layout>
      <SEO
        title="Partner With ValorWell | Build Something Useful Together"
        description="Partner with ValorWell on care access, veteran and family resources, community action, storytelling, introductions, and practical collaboration."
        canonical="/partner"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Partner With ValorWell", url: "/partner" },
        ]}
      />

      <div className="partner-theme bg-[#F4F1E8] text-[#111814]">
        <style>{`
          .partner-theme {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .partner-theme h1,
          .partner-theme h2,
          .partner-theme h3,
          .partner-theme h4 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.025em;
          }
        `}</style>

        <section className="relative overflow-hidden border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#D7A92E]/[0.08] blur-3xl" />
            <div className="absolute -bottom-44 -left-32 h-96 w-96 rounded-full bg-[#3B5147]/[0.08] blur-3xl" />
          </div>

          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
            <div className="lg:col-span-7">
              <Eyebrow>Partner With ValorWell</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                We do not need more logos around the mission. We need relationships that move something.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#111814]/70 md:text-xl">
                ValorWell works with organizations, creators, employers, community groups, connectors, and aligned infrastructure partners when the relationship can create a clearer path, a useful resource, stronger reach, or real action.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <TrackedLink
                  to="/contact"
                  event="partner_hero_contact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#31443B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2"
                >
                  Start a Partnership Conversation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  to="/impact"
                  event="partner_hero_impact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#3B5147]/30 px-6 py-3 text-sm font-bold text-[#3B5147] transition hover:bg-white/60"
                >
                  See What ValorWell Can Verify
                </TrackedLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-[#3B5147]/15 bg-white shadow-xl">
                <img
                  src={partnerCareAccessCommunityAsset.url}
                  alt="Care, access, and community connections"
                  className="h-auto w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow yellow>What Partnership Means Here</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Find the overlap. Define the work. Make it useful.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-8 text-white/72">
                ValorWell is not looking for partnership announcements as an end in themselves. A useful partnership has a specific reason to exist: improve a pathway, connect people to a resource, introduce the right organizations, share credible information, amplify real work, or build infrastructure neither side should build alone.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/72">
                The relationship can be small. It just needs to produce something more meaningful than mutual branding.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Where Collaboration Can Fit</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Bring the thing your organization is actually good at.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                ValorWell does not expect every partner to fit the same template. Start with the useful capability, relationship, audience, resource, or problem you can move.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {collaborationPaths.map(({ title, copy, examples, Icon }) => (
                <article key={title} className="rounded-3xl border border-[#3B5147]/15 bg-[#F4F1E8] p-8">
                  <Icon className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                  <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-7 text-[#111814]/64">{copy}</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#3B5147]/65">
                    {examples}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Existing Ways Into the Ecosystem</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Not every useful relationship needs a custom program.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <TrackedLink
                to="/beyondtheyellow"
                event="partner_path_bty"
                className="group rounded-3xl border border-[#D7A92E]/35 bg-[#F8F3E4] p-8 transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
              >
                <HeartHandshake className="h-8 w-8 text-[#8A6814]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#8A6814]">Beyond The Yellow</p>
                <h3 className="mt-3 text-2xl font-bold">Have a real-action story worth amplifying?</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Share or nominate the work. Editorial selection remains independent from sponsorship or financial support.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3B5147]">
                  Explore Beyond The Yellow <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </TrackedLink>

              <TrackedLink
                to="/network"
                event="partner_path_network"
                className="group rounded-3xl border border-[#3B5147]/15 bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
              >
                <Network className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">Network</p>
                <h3 className="mt-3 text-2xl font-bold">Looking for organizations already in the orbit?</h3>
                <p className="mt-4 leading-7 text-[#111814]/64">
                  Discover organizations featured by Beyond The Yellow and the work they are doing.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3B5147]">
                  Explore the Network <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </TrackedLink>

              <TrackedLink
                to="/watch"
                event="partner_path_watch"
                className="group rounded-3xl border border-[#3B5147]/15 bg-[#111814] p-8 text-white transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
              >
                <Wrench className="h-8 w-8 text-[#D7A92E]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D7A92E]">Watch</p>
                <h3 className="mt-3 text-2xl font-bold">Want to understand the work before reaching out?</h3>
                <p className="mt-4 leading-7 text-white/64">
                  Watch current ValorWell content, Beyond The Yellow conversations, and founder-led explanations of the work.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
                  Watch ValorWell <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#3B5147] text-white">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <Eyebrow yellow>Partnership Boundaries</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  Some things should never be part of the deal.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-5">
                  {[
                    "Financial support does not purchase a Beyond The Yellow feature, endorsement, referral, or preferred treatment.",
                    "A partner does not control clinician judgment, documentation, care decisions, or patient access.",
                    "ValorWell will not promise reach, donations, referrals, clinical outcomes, VA outcomes, or other results it cannot control.",
                    "A relationship does not become evidence of impact simply because both organizations announce it.",
                  ].map((item) => (
                    <div key={item} className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#D7A92E]" aria-hidden="true" />
                      <p className="leading-7 text-white/72">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>How We Evaluate a Fit</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                A good relationship should be understandable before it is impressive.
              </h2>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[#3B5147]/15 bg-[#3B5147]/15 md:grid-cols-2">
              {fitChecks.map(({ title, copy }, index) => (
                <article key={title} className="bg-[#F4F1E8] p-8 md:p-10">
                  <p className="text-sm font-bold text-[#3B5147]/60">0{index + 1}</p>
                  <h3 className="mt-5 text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-7 text-[#111814]/64">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Partnership vs. Financial Support</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Those are different reasons to be here.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#111814]/66">
                This page is for organizations and people who want to build a useful relationship with ValorWell. If your goal is simply to contribute financially, you do not need to invent a partnership around the gift.
              </p>
              <p className="mt-4 max-w-3xl leading-7 text-[#111814]/60">
                ValorWell keeps financial support separate from editorial selection, clinical decisions, referrals, and partnership status.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#3B5147]/15 bg-white p-8">
                <HeartHandshake className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-bold">Want to support the work financially?</h3>
                <p className="mt-4 leading-7 text-[#111814]/62">
                  Use the donation path directly. Impact reporting explains what ValorWell can currently verify without turning a contribution into an unsupported care-outcome claim.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <TrackedLink
                    to="/donate"
                    event="partner_donate"
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                  >
                    Donate <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink
                    to="/impact"
                    event="partner_impact"
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                  >
                    Review Impact
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#111814] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <Handshake className="mx-auto h-10 w-10 text-[#D7A92E]" aria-hidden="true" />
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              If you can help move something useful, that is enough reason to talk.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Tell us what your organization does well, what you are trying to solve, and where you think the overlap might be.
            </p>
            <TrackedLink
              to="/contact"
              event="partner_final_contact"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#111814]"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </div>
    </Layout>
  );
}
