import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  CircleDot,
  HeartHandshake,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, OrganizationSchema } from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackHomeEvent } from "@/lib/tracking";
import homepageHero from "@/assets/homepage-hero.png.asset.json";
import btyHomepage from "@/assets/bty-homepage.png.asset.json";




type CarePath = "champva" | "vaccn" | "tricare" | "unsure";
type VisualTone = "evergreen" | "yellow" | "ember" | "care";

interface CarePathDetail {
  name: string;
  status: string;
  statusClass: string;
  description: string;
  note?: string;
  cta: string;
  href: string;
  external?: boolean;
}

const carePathDetails: Record<CarePath, CarePathDetail> = {
  champva: {
    name: "CHAMPVA",
    status: "Active care pathway",
    statusClass: "bg-primary/10 text-primary",
    description:
      "ValorWell currently provides telehealth mental health care through CHAMPVA in states where licensed clinician availability, capacity, pathway verification, and clinical fit align.",
    note: "ValorWell bills CHAMPVA directly. Cost share or other patient responsibility may apply.",
    cta: "Start CHAMPVA Care",
    href: "https://clients.valorwell.org",
    external: true,
  },
  vaccn: {
    name: "VA Community Care",
    status: "Limited and region-specific",
    statusClass: "bg-[hsl(42_71%_51%/0.16)] text-[hsl(42_71%_30%)]",
    description:
      "ValorWell is registering clinicians individually in VA Community Care Regions 1–3. Current access still requires a specific registered clinician, state licensure, availability, and an actual VA referral or authorization.",
    note: "Regions 4–5 remain blocked by the unresolved TriWest contracting and credentialing pathway.",
    cta: "View VA Community Care Details",
    href: "/get-care",
  },
  tricare: {
    name: "TRICARE",
    status: "Not currently active",
    statusClass: "bg-accent/10 text-accent",
    description:
      "ValorWell does not currently accept TRICARE. Our TriWest contract remains under credentialing review, and TriWest has provided no status update or specific turnaround time.",
    note: "We will not describe this pathway as available until the required contracting and activation work is complete.",
    cta: "View TRICARE Status",
    href: "/get-care",
  },
  unsure: {
    name: "Not sure which pathway applies?",
    status: "Start with the current pathway overview",
    statusClass: "bg-muted text-foreground",
    description:
      "CHAMPVA is ValorWell's active general care pathway. VA Community Care availability is clinician- and region-specific, and TRICARE is not currently active.",
    note: "ValorWell does not currently offer private-pay therapy.",
    cta: "Compare Care Pathways",
    href: "/get-care",
  },
};

function Eyebrow({
  children,
  tone = "evergreen",
}: {
  children: ReactNode;
  tone?: VisualTone;
}) {
  const toneClasses: Record<VisualTone, string> = {
    evergreen: "text-primary",
    yellow: "text-[hsl(42_71%_34%)]",
    ember: "text-accent",
    care: "text-[hsl(202_36%_31%)]",
  };

  const lineClasses: Record<VisualTone, string> = {
    evergreen: "bg-primary/60",
    yellow: "bg-[hsl(42_71%_51%)]",
    ember: "bg-accent",
    care: "bg-[hsl(202_36%_42%)]",
  };

  return (
    <div
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${toneClasses[tone]}`}
    >
      <span className={`h-px w-8 ${lineClasses[tone]}`} aria-hidden="true" />
      {children}
    </div>
  );
}

function SectionLink({
  to,
  event,
  children,
}: {
  to: string;
  event: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={() => trackHomeEvent(event)}
      className="group inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function VisualPlaceholder({
  label,
  guidance,
  tone,
  aspectClass = "aspect-[4/3]",
}: {
  label: string;
  guidance: string;
  tone: VisualTone;
  aspectClass?: string;
}) {
  const toneClasses: Record<VisualTone, string> = {
    evergreen: "from-primary/[0.16] via-primary/[0.08] to-transparent text-primary",
    yellow:
      "from-[hsl(42_71%_51%/0.24)] via-[hsl(42_71%_51%/0.1)] to-transparent text-[hsl(42_71%_30%)]",
    ember: "from-accent/[0.18] via-accent/[0.08] to-transparent text-accent",
    care: "from-[hsl(202_36%_42%/0.2)] via-[hsl(202_36%_42%/0.08)] to-transparent text-[hsl(202_36%_31%)]",
  };

  return (
    <div
      role="img"
      aria-label={`${label}. ${guidance}`}
      data-image-placeholder={label}
      className={`relative overflow-hidden rounded-2xl border border-dashed border-foreground/25 bg-gradient-to-br ${toneClasses[tone]} ${aspectClass}`}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-current/20 bg-background/80 shadow-sm">
          <ImageIcon className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-5 max-w-sm text-base font-bold text-foreground">
          {label}
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {guidance}
        </p>
      </div>
    </div>
  );
}

function CarePathAction({
  detail,
  path,
}: {
  detail: CarePathDetail;
  path: CarePath;
}) {
  const className =
    "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto";

  const handleClick = () =>
    trackHomeEvent(`homepage_care_path_${path}_action`, { pathway: path });

  if (detail.external) {
    return (
      <a href={detail.href} onClick={handleClick} className={className}>
        {detail.cta}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <Link to={detail.href} onClick={handleClick} className={className}>
      {detail.cta}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function HomePage() {
  const [selectedCarePath, setSelectedCarePath] = useState<CarePath | null>(
    null,
  );
  const selectedDetail = selectedCarePath
    ? carePathDetails[selectedCarePath]
    : null;

  useEffect(() => {
    trackHomeEvent("homepage_view");
  }, []);

  const openCarePath = (path: CarePath) => {
    setSelectedCarePath(path);
    trackHomeEvent(`homepage_care_path_${path}_open`, { pathway: path });
  };

  return (
    <Layout>
      <SEO
        title="Better Care, Better Pathways, Real Action"
        description="ValorWell is building better pathways for veterans and families through Beyond The Yellow, Operation Claims Success, and a real telehealth mental health clinic serving CHAMPVA families."
        canonical="/"
      />
      <OrganizationSchema />

      <div className="home-theme">
        <style>{`
          .home-theme {
            --background: 43 40% 93%;
            --foreground: 145 9% 15%;
            --card: 43 40% 96%;
            --card-foreground: 145 9% 15%;
            --popover: 43 40% 96%;
            --popover-foreground: 145 9% 15%;
            --primary: 145 15% 27%;
            --primary-foreground: 43 40% 96%;
            --secondary: 44 33% 88%;
            --secondary-foreground: 145 9% 15%;
            --muted: 44 33% 88%;
            --muted-foreground: 145 9% 35%;
            --accent: 9 51% 46%;
            --accent-foreground: 43 40% 96%;
            --border: 145 9% 80%;
            --input: 145 9% 80%;
            --ring: 145 15% 27%;
            --section-alt: 44 33% 88%;
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .home-theme h1,
          .home-theme h2,
          .home-theme h3,
          .home-theme h4,
          .home-theme h5,
          .home-theme h6 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.02em;
          }
        `}</style>

        {/* Hero: intentionally no CTA. Its job is to create belief and curiosity. */}
        <section className="relative overflow-hidden border-b border-border/60 bg-background">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/[0.08] blur-3xl" />
            <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-accent/[0.07] blur-3xl" />
          </div>

          <div className="container-wide relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-7">
              <Eyebrow tone="ember">
                Better care. Better pathways. Real action.
              </Eyebrow>
              <h1 className="mt-6 text-4xl font-bold leading-[1.04] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Veterans and their families deserve better than systems they
                have to fight just to use.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                ValorWell is building a better way to reach mental health care,
                navigate VA-aligned pathways, and turn support into something
                people can actually feel.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border shadow-sm aspect-[4/5] lg:aspect-[5/6]">
                <img
                  src={homepageHero.url}
                  alt="ValorWell — We're rebuilding veteran mental health care together."
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </section>

        {/* High-intent utility: helps care seekers without redefining the master brand. */}
        <section className="border-b border-border/60 bg-[hsl(var(--section-alt))]">
          <div className="container-wide py-12 md:py-16">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-4">
                  <Eyebrow tone="care">Looking for mental health care?</Eyebrow>
                  <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
                    Start with the pathway you are trying to use.
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Choose an option and we will show you what is active, what
                    is still being built, and the right next step.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
                  {[
                    {
                      path: "champva" as const,
                      label: "CHAMPVA",
                      sublabel: "Active pathway",
                      icon: CheckCircle2,
                    },
                    {
                      path: "vaccn" as const,
                      label: "VA Community Care",
                      sublabel: "Region-specific",
                      icon: ShieldCheck,
                    },
                    {
                      path: "tricare" as const,
                      label: "TRICARE",
                      sublabel: "Not active",
                      icon: CircleAlert,
                    },
                    {
                      path: "unsure" as const,
                      label: "I'm Not Sure",
                      sublabel: "Compare pathways",
                      icon: CircleDot,
                    },
                  ].map((option) => (
                    <button
                      key={option.path}
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => openCarePath(option.path)}
                      className="group flex min-h-28 flex-col items-start justify-between rounded-xl border border-border bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option.icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm font-bold text-foreground">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {option.sublabel}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beyond The Yellow: the worldview and movement behind ValorWell. */}
        <section
          id="beyond-the-yellow"
          className="border-b border-border/60 bg-background"
        >
          <div className="container-wide grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-6">
              {/* IMAGE PLACEHOLDER: replace with a broad community-action visual. */}
              <VisualPlaceholder
                label="Beyond The Yellow image placeholder"
                guidance="Recommended: a wide, human image showing people and organizations taking visible action across communities—not a ribbon-only visual."
                tone="yellow"
              />
            </div>

            <div className="lg:col-span-6">
              <Eyebrow tone="yellow">The movement behind ValorWell</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                Support is not a symbol. Support is behavior.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Beyond The Yellow is built on a simple standard: support should
                create something people can actually feel. It should provide
                care, open a door, solve a problem, build something useful, or
                make life meaningfully better.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                ValorWell is putting that belief into action—and giving a
                platform to the people and organizations doing the same.
              </p>
              <blockquote className="mt-8 border-l-4 border-[hsl(42_71%_51%)] pl-5 text-xl font-bold leading-snug text-foreground md:text-2xl">
                If the support stopped tomorrow, would anyone be worse off?
                Would they even know?
              </blockquote>
              <div className="mt-10">
                <SectionLink to="/beyondtheyellow" event="homepage_bty_explore">
                  Explore Beyond The Yellow
                </SectionLink>
              </div>
            </div>
          </div>
        </section>

        {/* Operation Claims Success: ValorWell's Beyond The Yellow mission for veterans. */}
        <section
          id="operation-claims-success"
          className="border-b border-border/60 bg-[hsl(var(--section-alt))]"
        >
          <div className="container-wide grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow tone="ember">Our Beyond The Yellow mission</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                Care first. Not letter first.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Veterans should not have to choose between waiting indefinitely
                for legitimate care and paying for expensive documentation
                shortcuts.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Operation Claims Success is ValorWell's work to build a better
                path through real mental health care, honest VA-aligned access
                education, legitimate provider infrastructure, and ethical
                documentation when clinically appropriate.
              </p>
              <blockquote className="mt-8 border-l-4 border-accent pl-5 text-xl font-bold leading-snug text-foreground md:text-2xl">
                We are not selling the shortcut. We are building the better
                path.
              </blockquote>
              <div className="mt-10">
                <SectionLink
                  to="/operation-claims-success"
                  event="homepage_ocs_explore"
                >
                  Explore Operation Claims Success
                </SectionLink>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                ValorWell does not guarantee VA Community Care authorization,
                referrals, Nexus Letters, disability ratings, service
                connection, claim approval, or any VA outcome.
              </p>
            </div>

            <div className="lg:col-span-6">
              {/* IMAGE PLACEHOLDER: replace with a veteran-centered care-path visual. */}
              <VisualPlaceholder
                label="Operation Claims Success image placeholder"
                guidance="Recommended: a veteran-centered image representing a broken care and documentation path being rebuilt with legitimate clinical infrastructure."
                tone="ember"
              />
            </div>
          </div>
        </section>

        {/* The clinic: real care delivery and the operating infrastructure behind the mission. */}
        <section
          id="mental-health-care"
          className="border-b border-border/60 bg-background"
        >
          <div className="container-wide py-20 md:py-28">
            <div className="grid items-start gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                {/* IMAGE PLACEHOLDER: replace with authentic telehealth-care imagery. */}
                <VisualPlaceholder
                  label="ValorWell clinic image placeholder"
                  guidance="Recommended: credible, human telehealth imagery involving licensed clinicians and veterans or family members. Avoid generic hospital or sad-person stock photography."
                  tone="care"
                  aspectClass="aspect-[4/5]"
                />
              </div>

              <div className="lg:col-span-7">
                <Eyebrow tone="care">Real mental health care</Eyebrow>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                  The mission has a real healthcare clinic behind it.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  ValorWell provides telehealth mental health care for children,
                  teens, adults, and families through licensed clinicians. The
                  clinic is how care-first becomes actual care—not just another
                  statement about what people deserve.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  CHAMPVA is active today. We are executing clinician
                  registration for VA Community Care in Regions 1–3 and
                  continuing the TriWest contracting work required to expand
                  through TRICARE and VA Community Care Regions 4–5.
                </p>

                <div className="mt-9 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      <h3 className="font-bold">CHAMPVA</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Active where qualifying licensed clinicians, capacity,
                      pathway verification, and clinical fit align.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[hsl(42_71%_51%/0.4)] bg-[hsl(42_71%_51%/0.08)] p-5">
                    <div className="flex items-center gap-2 text-[hsl(42_71%_30%)]">
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                      <h3 className="font-bold">VA Community Care</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Clinician registration is underway in Regions 1–3. Regions
                      4–5 remain blocked through TriWest.
                    </p>
                  </div>

                  <div className="rounded-xl border border-accent/25 bg-accent/5 p-5">
                    <div className="flex items-center gap-2 text-accent">
                      <CircleAlert className="h-5 w-5" aria-hidden="true" />
                      <h3 className="font-bold">TRICARE</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Not currently active. ValorWell's TriWest contract remains
                      under review with no stated timeline.
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <SectionLink to="/get-care" event="homepage_clinic_find_care">
                    Find Mental Health Care
                  </SectionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact closing statement without adding another competing CTA. */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-wide py-14 text-center md:py-16">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
              <HeartHandshake className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mx-auto mt-5 max-w-3xl text-xl font-bold leading-relaxed md:text-2xl">
              Beyond The Yellow is the standard. Operation Claims Success is our
              mission in action. The clinic is how real care reaches real
              people.
            </p>
          </div>
        </section>
      </div>

      <Dialog
        open={selectedCarePath !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCarePath(null);
        }}
      >
        {selectedDetail && selectedCarePath ? (
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
            <DialogHeader>
              <div
                className={`mb-2 w-fit rounded-full px-3 py-1 text-xs font-bold ${selectedDetail.statusClass}`}
              >
                {selectedDetail.status}
              </div>
              <DialogTitle className="text-2xl">
                {selectedDetail.name}
              </DialogTitle>
              <DialogDescription className="pt-2 text-base leading-relaxed">
                {selectedDetail.description}
              </DialogDescription>
            </DialogHeader>

            {selectedDetail.note ? (
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
                {selectedDetail.note}
              </div>
            ) : null}

            <div className="pt-2">
              <CarePathAction detail={selectedDetail} path={selectedCarePath} />
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </Layout>
  );
}
