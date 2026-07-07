import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Phone } from "lucide-react";

const PORTAL_URL = "https://clients.valorwell.org";

const editorialLines = [
  "I have CHAMPVA. I just need to know where to start.",
  "I do not want to call ten therapists.",
  "I need care for my child, teen, myself, or someone in my family.",
  "I want telehealth care that fits real life.",
];

const ledger = [
  "We bill CHAMPVA directly.",
  "No upfront private-pay therapy bill.",
  "Your CHAMPVA cost share may apply.",
  "We verify your information before care begins.",
  "We help you understand what to expect.",
];

const serviceGroups = [
  {
    title: "Emotional weight of daily life",
    body: "Overwhelm, burnout, identity shifts, life transitions, and the quiet stress no one else sees.",
  },
  {
    title: "Anxiety, depression, grief, stress",
    body: "The mental health concerns most people carry at some point — treated with real clinical care, not a script.",
  },
  {
    title: "Trauma and PTSD-related concerns",
    body: "Care for the parts of your story that do not go away on their own, at a pace that respects you.",
  },
  {
    title: "Family, caregiver, and military-family stress",
    body: "For the people holding the household together while someone else is being cared for.",
  },
  {
    title: "Child and teen support",
    body: "Therapy for kids and teens navigating anxiety, mood, school, family change, or being part of a military-connected family.",
  },
];

const faqs = [
  {
    q: "How does CHAMPVA payment work at ValorWell?",
    a: "We bill CHAMPVA directly for eligible telehealth mental health services. You do not get an upfront private-pay therapy bill. Your CHAMPVA cost share may apply depending on your specific coverage and situation.",
  },
  {
    q: "Is care actually telehealth?",
    a: "Yes. ValorWell provides mental health care via secure telehealth so you can meet with a licensed clinician from home, without commuting to an office.",
  },
  {
    q: "Do you see all ages?",
    a: "We provide care for children, teens, adults, and families, subject to clinician scope, licensure, availability, and clinical fit.",
  },
  {
    q: "What kinds of mental health concerns do you treat?",
    a: "Broad mental health needs including anxiety, depression, grief, stress, trauma and PTSD-related concerns, family and caregiver stress, and child and teen support. We do not provide psychiatry, medication management, psychological testing, or inpatient care.",
  },
  {
    q: "Is care available in every state?",
    a: "Not yet. ValorWell provides CHAMPVA telehealth mental health care in states where we have licensed clinician availability. We are actively expanding our clinician network across the country.",
  },
  {
    q: "I have TRICARE. Can I use ValorWell?",
    a: "TRICARE is coming soon. You can raise your hand on this page so we can reach out when a TRICARE pathway is available.",
  },
  {
    q: "I need VA Community Care. Can you help?",
    a: "A VA Community Care pathway is coming soon. You can raise your hand on this page. ValorWell does not guarantee VA authorization, referral, placement, disability outcomes, claim approval, or any VA outcome.",
  },
  {
    q: "What if I am in crisis?",
    a: "ValorWell is not a crisis service. If you need immediate support, call or text 988. Veterans and their loved ones can call 988 and press 1, or text 838255.",
  },
  {
    q: "How do I actually start?",
    a: "Start your intake in the ValorWell client portal. We review your CHAMPVA information, your state, clinician availability, and fit, then move you into the next real care step.",
  },
];

const startHref = PORTAL_URL;

function PrimaryCTA({ label = "Start CHAMPVA Care" }: { label?: string }) {
  return (
    <a
      href={startHref}
      className="inline-flex items-center gap-2 rounded-none bg-[color:var(--cl-ember)] px-7 py-4 text-base font-semibold tracking-wide text-[color:var(--cl-canvas)] transition-transform hover:-translate-y-0.5"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

const GetCare = () => {
  return (
    <Layout>
      <SEO
        title="CHAMPVA Mental Health Care | ValorWell"
        description="Telehealth mental health care for people with CHAMPVA. ValorWell bills CHAMPVA directly, serves all ages, and is expanding licensed clinician access across the country."
        canonical="/get-care"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "CHAMPVA Care", url: "/get-care" }]} />

      <div className="clinicians-theme bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]">
        {/* CRISIS STRIP */}
        <div className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide flex flex-col gap-3 py-3 text-sm md:flex-row md:items-center md:justify-between">
            <p className="leading-snug">
              <span className="font-semibold">Need immediate support right now?</span> ValorWell is not a crisis service. Call or text 988. Veterans and their loved ones can call 988 and press 1 or text 838255.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="tel:988" className="inline-flex items-center gap-2 border border-[color:var(--cl-canvas)]/40 px-3 py-1.5 hover:bg-[color:var(--cl-canvas)]/10">
                <Phone className="h-3.5 w-3.5" /> Call or Text 988
              </a>
              <a href="tel:988" className="inline-flex items-center gap-2 border border-[color:var(--cl-canvas)]/40 px-3 py-1.5 hover:bg-[color:var(--cl-canvas)]/10">
                Veterans Crisis Line
              </a>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="border-b border-[color:var(--cl-ink)]/10">
          <div className="container-wide grid gap-10 py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--cl-ember)]">
                CHAMPVA Mental Health Care
              </p>
              <h1 className="mt-5 text-4xl leading-[1.05] md:text-6xl">
                Mental health care for people with CHAMPVA.
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl">
                You spend enough time navigating systems built around the veteran you love. Getting care for yourself shouldn't become another one.
              </p>
              <p className="mt-4 max-w-2xl text-base md:text-lg text-[color:var(--cl-ink)]/80">
                ValorWell provides telehealth mental health care for people with CHAMPVA. We bill CHAMPVA directly, verify your information before care begins, and help you understand what to expect before your first session.
              </p>
              <p className="mt-6 max-w-2xl text-sm text-[color:var(--cl-ink)]/70">
                ValorWell currently provides telehealth mental health care through the CHAMPVA pathway in states where we have licensed clinician availability.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <PrimaryCTA />
                <a
                  href="#how-it-works"
                  className="text-sm font-semibold uppercase tracking-widest underline decoration-[color:var(--cl-ember)] underline-offset-8"
                >
                  See How CHAMPVA Care Works
                </a>
              </div>
              <p className="mt-4 text-xs text-[color:var(--cl-ink)]/60">Your CHAMPVA cost share may apply.</p>
            </div>

            <aside className="md:col-span-4 md:border-l md:border-[color:var(--cl-ink)]/15 md:pl-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--cl-ink)]/60">
                What this means
              </p>
              <ul className="mt-4 space-y-4 text-sm">
                <li>— We bill CHAMPVA directly</li>
                <li>— No upfront private-pay therapy bill</li>
                <li>— Telehealth</li>
                <li>— All ages</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* RECOGNITION */}
        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <h2 className="max-w-4xl text-3xl leading-tight md:text-5xl">
              You already carry enough. Finding a therapist should not become another benefits project.
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-[color:var(--cl-canvas)]/80">
              You are tired of acronyms, paperwork, provider directories, and calling therapists just to ask whether they take CHAMPVA.
            </p>

            <ul className="mt-14 grid gap-8 md:grid-cols-2">
              {editorialLines.map((line) => (
                <li
                  key={line}
                  className="border-t border-[color:var(--cl-canvas)]/25 pt-5 text-xl md:text-2xl"
                >
                  “{line}”
                </li>
              ))}
            </ul>

            <div className="mt-16 border-l-2 border-[color:var(--cl-ember)] pl-5 text-lg md:text-xl">
              Have CHAMPVA? Start there. We will help make the next step clearer.
            </div>
          </div>
        </section>

        {/* CHAMPVA CLARITY */}
        <section className="border-b border-[color:var(--cl-ink)]/10">
          <div className="container-wide grid gap-12 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--cl-ember)]">
                CHAMPVA Clarity
              </p>
              <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
                No insurance-logo wall. Here is what you actually want to know.
              </h2>
              <p className="mt-8 text-lg italic text-[color:var(--cl-ink)]/80">
                Less decoding the system. More getting to the care you came for.
              </p>
              <div className="mt-8">
                <PrimaryCTA />
              </div>
            </div>
            <div className="md:col-span-7">
              <dl className="divide-y divide-[color:var(--cl-ink)]/15 border-t border-b border-[color:var(--cl-ink)]/15">
                {ledger.map((line, i) => (
                  <div key={line} className="flex gap-6 py-5">
                    <dt className="w-10 shrink-0 font-mono text-sm text-[color:var(--cl-ember)]">
                      {String(i + 1).padStart(2, "0")}
                    </dt>
                    <dd className="text-lg md:text-xl">{line}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* THERAPY SERVICES */}
        <section className="bg-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--cl-ember)]">
              Real Therapy for Real Life
            </p>
            <h2 className="mt-4 max-w-4xl text-3xl leading-tight md:text-5xl">
              Mental health does not fit into one age, one diagnosis, or one military-family story.
            </h2>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-[color:var(--cl-ink)]/80">
              ValorWell provides telehealth therapy for children, teens, adults, and families across a broad range of mental health needs — subject to clinician scope, fit, licensure, availability, and clinical need.
            </p>

            <div className="mt-14 grid gap-px bg-[color:var(--cl-ink)]/15 md:grid-cols-2 lg:grid-cols-3">
              {serviceGroups.map((g) => (
                <div key={g.title} className="bg-[color:var(--cl-canvas)] p-8">
                  <h3 className="text-xl md:text-2xl">{g.title}</h3>
                  <p className="mt-3 text-[color:var(--cl-ink)]/80">{g.body}</p>
                </div>
              ))}
              <div className="bg-[color:var(--cl-canvas)] p-8 text-sm text-[color:var(--cl-ink)]/60">
                We do not provide psychiatry, medication management, psychological testing, or inpatient care.
              </div>
            </div>
          </div>
        </section>

        {/* CARE PROCESS */}
        <section id="how-it-works" className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--cl-ember)]">
              One Clear Place to Start
            </p>
            <h2 className="mt-4 max-w-4xl text-3xl leading-tight md:text-5xl">
              Ready for care? Start in the ValorWell client portal.
            </h2>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-[color:var(--cl-canvas)]/80">
              ValorWell does not need another marketing form between you and the actual care process.
            </p>

            <ol className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                "Start your intake.",
                "ValorWell reviews CHAMPVA information, state, clinician availability, and fit.",
                "Move into the next real care step.",
              ].map((step, i) => (
                <li key={step} className="border-t border-[color:var(--cl-canvas)]/25 pt-5">
                  <div className="font-mono text-sm text-[color:var(--cl-ember)]">STEP {i + 1}</div>
                  <p className="mt-3 text-xl md:text-2xl">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <PrimaryCTA />
            </div>
          </div>
        </section>

        {/* NATIONWIDE GROWTH */}
        <section className="border-b border-[color:var(--cl-ink)]/10">
          <div className="container-wide py-20 md:py-28">
            <h2 className="max-w-4xl text-3xl leading-tight md:text-5xl">
              CHAMPVA families are nationwide. ValorWell is building the clinician network to meet them there.
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <p className="text-lg text-[color:var(--cl-ink)]/85">
                ValorWell is aggressively expanding its licensed clinician network so more people with CHAMPVA can access telehealth mental health care across the country.
              </p>
              <p className="text-lg text-[color:var(--cl-ink)]/85">
                Today, care is available in states where ValorWell has licensed clinician capacity.
              </p>
            </div>
            <div className="mt-10 inline-block border border-[color:var(--cl-ember)] px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--cl-ember)]">
              Nationwide mission · State-by-state licensed care · Growing fast
            </div>
          </div>
        </section>

        {/* CARE FIRST */}
        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <h2 className="max-w-4xl text-3xl leading-tight md:text-5xl">
              You are a person before you are a claim, a benefit, or a piece of paperwork.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-4">
              {[
                "Licensed clinical care",
                "Clinical judgment and fit",
                "Real telehealth relationships",
                "Documentation only when clinically appropriate",
              ].map((v) => (
                <div key={v} className="border-t border-[color:var(--cl-canvas)]/25 pt-4 text-lg">
                  {v}
                </div>
              ))}
            </div>
            <p className="mt-12 text-xl md:text-2xl italic">
              Care first. Not paperwork first. Not throughput first.
            </p>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="border-b border-[color:var(--cl-ink)]/10">
          <div className="container-wide py-20 md:py-28">
            <h2 className="max-w-4xl text-3xl leading-tight md:text-5xl">
              Have TRICARE or need a VA Community Care path? Raise your hand.
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {[
                {
                  tag: "TRICARE — Coming Soon",
                  heading: "Have TRICARE? Raise your hand.",
                  cta: "I Have TRICARE",
                },
                {
                  tag: "VA Community Care — Coming Soon",
                  heading: "Trying to use VA Community Care? Raise your hand.",
                  cta: "I Need VA Community Care",
                },
              ].map((p) => (
                <div
                  key={p.tag}
                  className="flex flex-col justify-between border border-[color:var(--cl-ink)]/20 bg-[color:var(--cl-canvas)] p-8 md:p-10"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--cl-ember)]">
                      {p.tag}
                    </p>
                    <h3 className="mt-4 text-2xl md:text-3xl">{p.heading}</h3>
                  </div>
                  <button
                    type="button"
                    className="mt-10 inline-flex w-fit items-center gap-2 border-2 border-[color:var(--cl-ink)] px-5 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-[color:var(--cl-ink)] hover:text-[color:var(--cl-canvas)]"
                  >
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-sm text-[color:var(--cl-ink)]/70">
              ValorWell does not guarantee VA authorization, referral, placement, disability outcomes, claim approval, or any VA outcome.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[color:var(--cl-canvas)]">
          <div className="container-narrow py-20 md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--cl-ember)]">
              Questions
            </p>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
              Answers before your first click.
            </h2>

            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="border-b border-[color:var(--cl-ink)]/20"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-[color:var(--cl-ink)]/80">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <h2 className="max-w-4xl text-3xl leading-tight md:text-5xl">
              Have CHAMPVA? You already know enough to take the first step.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[color:var(--cl-canvas)]/85">
              You do not need another therapist directory or ten phone calls.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-[color:var(--cl-canvas)]/85">
              Start your ValorWell intake. We bill CHAMPVA directly, verify your information before care begins, and help make the next step clearer.
            </p>
            <div className="mt-10">
              <PrimaryCTA />
            </div>
            <p className="mt-10 max-w-2xl text-base italic text-[color:var(--cl-canvas)]/70">
              Your mental health care should not become another system you have to navigate alone.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default GetCare;
