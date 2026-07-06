import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Stethoscope,
  FileText,
  Wrench,
  Users,
  Building2,
  Video,
  Radio,
  Check,
  X,
  ChevronDown,
  Loader2,
  Scale,
  DollarSign,
  ClipboardList,
  HeartHandshake,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { trackHomeEvent } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";

/* ---------- Brand palette (page-scoped)
   Evergreen  #3B5147   Warm Canvas #F4F1E8
   Ember      #B24A3A   Ink         #111814
   Signal Yellow #D7A92E (BTY only)
---------- */

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "operation-claims-success", ...params });

const FORM_ANCHOR = "ocs-routing-form";
const BETTER_PATH_ANCHOR = "the-better-path";
const CYCLE_ANCHOR = "the-cycle";

/* ---------- Small primitives ---------- */

function Eyebrow({
  children,
  tone = "evergreen",
}: {
  children: ReactNode;
  tone?: "evergreen" | "ember" | "yellow" | "canvas";
}) {
  const cls =
    tone === "ember"
      ? "text-[#B24A3A]"
      : tone === "yellow"
      ? "text-[#D7A92E]"
      : tone === "canvas"
      ? "text-[#F4F1E8]/80"
      : "text-[#3B5147]";
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${cls}`}>{children}</p>
  );
}

function SectionHeading({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      className={`mt-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl ${
        light ? "text-white" : "text-[#111814]"
      }`}
    >
      {children}
    </h2>
  );
}

function Guardrail({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "warn" }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border-l-4 px-5 py-4 text-sm leading-relaxed md:text-base ${
        tone === "warn"
          ? "border-[#B24A3A] bg-[#B24A3A]/5 text-[#111814]"
          : "border-[#3B5147] bg-[#F4F1E8] text-[#111814]"
      }`}
    >
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#3B5147]" />
      <p>{children}</p>
    </div>
  );
}

/* ---------- Scroll helpers ---------- */

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
};

/* ---------- Data ---------- */

const cycleStages = [
  { n: 1, title: "Confusion", body: "A system that is too hard to navigate for the people inside it." },
  { n: 2, title: "Desperation", body: "Delays, denials, and conflicting information wear people down." },
  { n: 3, title: "Profitable Workaround", body: "Somebody finds a shortcut. It gets packaged, marketed, and sold." },
  { n: 4, title: "Mass Adoption or Exploitation", body: "The workaround spreads. Veterans in real need get mixed in with the volume." },
  { n: 5, title: "More Scrutiny & Friction", body: "The system responds with more controls, more paperwork, more denials." },
  { n: 6, title: "More Confusion", body: "The legitimate path is harder than it was before. And the cycle restarts." },
];

const shortcutCategories = [
  {
    icon: Scale,
    eyebrow: "VA ACCREDITED ATTORNEYS",
    title: "When the eventual back pay grows, who benefits?",
    body:
      "Certain VA representation fee arrangements can connect compensation to a veteran's past-due benefits after an initial VA decision. The legal structure may be permitted. The incentive structure still deserves scrutiny. Veterans need diligent, prompt movement and honest communication. Any model where compensation grows alongside accumulated past-due benefits creates a financial tension worth talking about.",
    pull: "Legal does not automatically mean well-designed for the person inside the system.",
  },
  {
    icon: DollarSign,
    eyebrow: "PAID STRATEGISTS",
    title: "Basic confusion has become an expensive product.",
    body:
      "A veteran who cannot understand the process is a perfect customer for somebody selling the secret. Education becomes a high-ticket program. Rating strategy becomes the product. Confidence becomes the pitch. The problem is not helping veterans understand the system. The problem is educating them with \"creative\" workarounds that cause the VA to respond with new measures. Telling veterans to pursue based on reimbursement, rather than the actual conditions.",
    pull: "The harder the system is to understand, the easier confusion is to monetize.",
  },
  {
    icon: ClipboardList,
    eyebrow: "NEXUS LETTER FACTORIES",
    title: "A clinical opinion should not feel like a retail product.",
    body:
      "Veterans may need legitimate clinical documentation. Nexus-related documentation can matter. ValorWell is not pretending otherwise. The problem begins when the person becomes secondary to the paperwork. One encounter. One transaction. One document. Then another fee for an appeal when it gets denied. That is the opposite of the care relationship ValorWell is trying to build. And no clinican care throughout the whole process.",
    pull: "Documentation can be part of the answer. Turning it into the entire business model is part of the problem.",
  },
];

const refusalPoints = [
  "We will not teach veterans how to game a disability rating.",
  "We will not turn clinical documentation into an on-demand retail product.",
  "We will not put paperwork ahead of the person.",
  "We will not build a business that depends on veterans staying confused.",
];

const betterPathSteps = [
  {
    n: "01",
    title: "Understand the real pathway.",
    body: "Give veterans and families honest education about legitimate access and support pathways without pretending ValorWell controls VA decisions.",
  },
  {
    n: "02",
    title: "Build provider access infrastructure.",
    body: "Document provider registration, regional requirements, blockers, and repeatable systems required to expand legitimate access over time.",
  },
  {
    n: "03",
    title: "Create real clinical relationships.",
    body: "Put veterans who need mental health care into real care relationships with mission-aligned clinicians when the appropriate care path is available.",
  },
  {
    n: "04",
    title: "Document what is clinically true.",
    body: "When documentation is clinically appropriate, support clinicians with responsible systems that preserve clinical judgment and care context.",
  },
  {
    n: "05",
    title: "Let the VA make the VA decision.",
    body: "ValorWell does not control disability ratings, service connection, claim approval, eligibility, authorization, or any other VA outcome.",
  },
];

const ocsBuilds = [
  "Veteran and family education.",
  "VA-aligned pathway education.",
  "VA Community Care provider pathway infrastructure.",
  "Provider registration workflows.",
  "Repeatable operating systems.",
  "Real mental health care infrastructure.",
  "Mission-aligned clinician recruitment.",
  "Ethical clinical documentation systems.",
  "Documentation when clinically appropriate.",
  "Public anti-predatory education.",
  "Veteran-organization relationships.",
  "Transparent build-in-public content.",
];

const ocsRefuses = [
  "Guaranteed VA outcomes.",
  "Rating-maximization promises.",
  "Pay-for-letter framing.",
  "Documentation on demand.",
  "Shortcut marketing.",
  "Promises of VA Community Care authorization.",
  "Promises of VA referrals.",
  "Claims-consultant positioning.",
  "Clinical conclusions decided before clinical evaluation.",
  "Business models that depend on veterans remaining confused.",
];

const buildoutAreas = [
  { icon: Wrench, title: "Provider Registration", body: "Mapping the setup steps by provider, state, region, and applicable pathway." },
  { icon: FileText, title: "Process Documentation", body: "Turning repeated discoveries into SOPs so the process does not live in one person's head." },
  { icon: Compass, title: "Access Expansion", body: "Working toward a stronger foundation for legitimate mental health care access over time." },
  { icon: Radio, title: "Transparency", body: "Sharing the mission publicly without promising what is not yet controlled." },
];

const ethicalPrinciples = [
  { title: "Clinically Appropriate", body: "The clinical situation and clinician judgment determine whether documentation is appropriate." },
  { title: "Real Care Context", body: "Evaluation, treatment, history, and clinical understanding matter." },
  { title: "No Pre-Sold Conclusion", body: "A veteran should not be sold confidence in a specific clinical conclusion or VA result before responsible clinical evaluation." },
  { title: "Clinician Judgment Stays Clinical", body: "AI, templates, software, and workflows may support the process. They do not replace the clinician." },
];

const clinicianValues = [
  { title: "Clinical Judgment", body: "Your judgment stays clinical. No pay-for-letter pressure. No promised VA outcomes." },
  { title: "Mission", body: "Help build a care-first alternative to an industry of shortcuts." },
  { title: "Infrastructure", body: "Work inside an organization trying to build repeatable systems around the clinical work." },
  { title: "Veteran & Family Impact", body: "Help build a legitimate path through systems too many people are forced to figure out alone." },
];

const leveragePaths = [
  {
    lane: "veteran_org",
    icon: Users,
    title: "Veteran & Community Organizations",
    body: "Help improve education, create legitimate connections, surface gaps, and get useful information in front of veterans and families.",
    cta: "Join the Mission",
    event: "ocs_lane_veteran_org",
  },
  {
    lane: "clinician",
    icon: Stethoscope,
    title: "Clinical & Provider Groups",
    body: "Help build clinician capacity, responsible documentation standards, and real access infrastructure.",
    cta: "Join the Mission",
    event: "ocs_lane_clinical",
  },
  {
    lane: "creator",
    icon: Video,
    title: "Creators & Media",
    body: "Help expose the workaround cycle and put the better-path conversation in front of more people.",
    cta: "Join the Mission",
    event: "ocs_lane_media",
  },
  {
    lane: "supporter",
    icon: HeartHandshake,
    title: "Supporters & Connectors",
    body: "Help fund, distribute, introduce, or strengthen the infrastructure required to move the mission.",
    cta: "Join the Mission",
    event: "ocs_lane_supporter",
  },
];

const laneOptions: { value: string; label: string; tag: string }[] = [
  { value: "veteran", label: "Veteran or family member looking for education", tag: "veteran-interest" },
  { value: "clinician", label: "Clinician or provider interested in the mission", tag: "clinician-lead" },
  { value: "veteran_org", label: "Veteran organization", tag: "veteran-org-lead" },
  { value: "community_org", label: "Community organization, employer, church, or nonprofit", tag: "partner-lead" },
  { value: "supporter", label: "Supporter or sponsor", tag: "supporter-lead" },
  { value: "creator", label: "Creator, media outlet, podcast, or storyteller", tag: "creator-lead" },
  { value: "intro", label: "Introduction / connector", tag: "intro-lead" },
  { value: "general", label: "I want to help move the mission, but I'm not sure where I fit", tag: "ocs-lead" },
];

const faqs = [
  {
    q: "Is Operation Claims Success a Nexus Letter service?",
    a: "No. Nexus-related clinical documentation may be supported when clinically appropriate and connected to legitimate clinical context. OCS is a broader systems mission focused on breaking the cycle of confusion, shortcuts, and increasingly difficult veteran pathways.",
  },
  {
    q: "Is ValorWell against Nexus Letters?",
    a: "No. A Nexus-related clinical opinion may be legitimate and important. ValorWell opposes turning clinical documentation into a guaranteed, transactional, pay-for-result product disconnected from responsible clinical judgment.",
  },
  {
    q: "Is ValorWell against attorneys helping veterans?",
    a: "No. Veterans may need qualified representation, especially in appeals and complex matters. ValorWell's concern is with incentive structures and business models that may profit from prolonged confusion, accumulated back benefits, or veterans' lack of clear education. OCS is not a law firm and does not provide legal representation.",
  },
  {
    q: "Why does ValorWell criticize the claims-help industry?",
    a: "Because veteran confusion has become a market. ValorWell believes the answer to a hard-to-navigate system cannot always be another expensive workaround built around the next loophole.",
  },
  {
    q: "Does ValorWell guarantee VA claim approval?",
    a: "No. ValorWell does not control VA claim decisions, disability ratings, service connection, or claim approval and does not guarantee any VA outcome.",
  },
  {
    q: "Can ValorWell guarantee VA Community Care access?",
    a: "No. VA Community Care eligibility, authorization, referrals, and related decisions depend on VA processes and other factors ValorWell does not independently control. ValorWell can provide general education about the pathway and is working to build and document provider access infrastructure over time.",
  },
  {
    q: "What does \u201CCare first. Not letter first.\u201D mean?",
    a: "The person comes before the paperwork. Clinical evaluation, understanding, care context, and clinician judgment come before documentation support.",
  },
  {
    q: "Can clinicians join Operation Claims Success?",
    a: "Yes. Mission-aligned clinicians and providers can express interest in helping ValorWell build ethical, care-first support for veterans and families.",
    cta: { label: "Join the Clinician Mission", href: "/clinicians" },
  },
  {
    q: "Can veteran organizations participate?",
    a: "Yes. ValorWell is interested in education, collaboration, introductions, shared content, Beyond The Yellow stories, and other aligned veteran-support relationships.",
    cta: { label: "Join the Mission", href: "#ocs-routing-form" },
  },
  {
    q: "Can supporters, creators, or connectors help?",
    a: "Yes. Bring what you have — reach, funding, introductions, infrastructure, media, or technical expertise. Choose your lane on the routing form.",
    cta: { label: "Join the Mission", href: "#ocs-routing-form" },
  },
  {
    q: "Is support or sponsorship tax-deductible?",
    a: "Contact ValorWell to discuss current support and sponsorship options.",
  },
];

const sectionNav = [
  { id: CYCLE_ANCHOR, label: "The Cycle" },
  { id: "veterans-not-problem", label: "Not the Problem" },
  { id: "shortcut-industry", label: "The Industry" },
  { id: "refusal", label: "Our Refusal" },
  { id: BETTER_PATH_ANCHOR, label: "The Better Path" },
  { id: FORM_ANCHOR, label: "Join the Mission" },
];

/* ---------- Routing Form (preserved infrastructure) ---------- */

type LaneValue = (typeof laneOptions)[number]["value"];

interface FormState {
  lane: LaneValue | "";
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  role_title: string;
  website: string;
  social_link: string;
  responses: Record<string, string>;
  consent: boolean;
}

const initialForm: FormState = {
  lane: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  organization: "",
  role_title: "",
  website: "",
  social_link: "",
  responses: {},
  consent: false,
};

function RoutingForm({ initialLane }: { initialLane?: LaneValue }) {
  const [form, setForm] = useState<FormState>({ ...initialForm, lane: initialLane ?? "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (initialLane && initialLane !== form.lane) {
      setForm((prev) => ({ ...prev, lane: initialLane }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLane]);

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("ocs_form_start");
    }
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const setResponse = (key: string, val: string) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("ocs_form_start");
    }
    setForm((prev) => ({ ...prev, responses: { ...prev.responses, [key]: val } }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.lane || !form.consent) return;
    setStatus("loading");
    setErrorMsg("");

    const laneMeta = laneOptions.find((l) => l.value === form.lane);
    const tags = ["ocs-lead", laneMeta?.tag ?? "ocs-lead"].filter(Boolean);
    if (form.lane === "veteran") tags.push("va-community-care-interest", "documentation-education-interest");

    try {
      const { error } = await (supabase as any).from("ocs_inquiries").insert({
        lane: form.lane,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        organization: form.organization.trim() || null,
        role_title: form.role_title.trim() || null,
        website: form.website.trim() || null,
        social_link: form.social_link.trim() || null,
        responses: form.responses,
        tags,
        source_page: "/operation-claims-success",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
      if (error) throw error;
      track("ocs_form_submit", { lane: form.lane });
      track(`ocs_form_submit_${form.lane}`);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#3B5147]/20 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3B5147] text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-[#111814]">Thanks for reaching out.</h3>
        <p className="mx-auto mt-3 max-w-xl text-[#111814]/70">
          We&rsquo;ll review what you shared and route it to the right next step. Operation Claims Success is being built in public, and the mission is bigger than any one organization. Thanks for raising your hand.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8 rounded-2xl border border-[#3B5147]/20 bg-white p-6 shadow-sm md:p-8">
      {/* Lane */}
      <fieldset>
        <legend className="text-lg font-semibold text-[#111814]">1. Choose your lane</legend>
        <p className="mt-1 text-sm text-[#111814]/70">
          This is a mission-routing form, not a clinical intake. Do not upload medical records, VA claim files, or diagnoses.
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {laneOptions.map((opt) => {
            const active = form.lane === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                  active
                    ? "border-[#3B5147] bg-[#3B5147]/5"
                    : "border-[#3B5147]/20 bg-white hover:border-[#3B5147]/50"
                }`}
              >
                <input
                  type="radio"
                  name="lane"
                  className="mt-1 accent-[#3B5147]"
                  value={opt.value}
                  checked={active}
                  onChange={() => {
                    update("lane", opt.value);
                    track("ocs_form_lane_select", { lane: opt.value });
                  }}
                />
                <span className="text-[#111814]">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {form.lane && (
        <>
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="col-span-full text-lg font-semibold text-[#111814]">2. Contact details</legend>
            <TextField label="First name" required value={form.first_name} onChange={(v) => update("first_name", v)} />
            <TextField label="Last name" required value={form.last_name} onChange={(v) => update("last_name", v)} />
            <TextField label="Email" required type="email" value={form.email} onChange={(v) => update("email", v)} />
            <TextField label="Phone (optional)" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
            <TextField label="Organization (optional)" value={form.organization} onChange={(v) => update("organization", v)} />
            <TextField label="Role / title (optional)" value={form.role_title} onChange={(v) => update("role_title", v)} />
            <TextField label="Website (optional)" value={form.website} onChange={(v) => update("website", v)} />
            <TextField label="Social link (optional)" value={form.social_link} onChange={(v) => update("social_link", v)} />
          </fieldset>

          <ConditionalFields lane={form.lane} responses={form.responses} setResponse={setResponse} />

          <label className="flex items-start gap-3 text-sm text-[#111814]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#3B5147]"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              required
            />
            <span>
              I understand submitting this form does not guarantee clinical care, VA Community Care access, documentation, partnership, sponsorship, being featured, or any VA outcome.
            </span>
          </label>

          {status === "error" && (
            <div role="alert" className="rounded-md border border-[#B24A3A]/40 bg-[#B24A3A]/5 p-3 text-sm text-[#B24A3A]">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !form.consent}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#2f4239] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Join the Mission
          </button>
        </>
      )}
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = useMemo(() => `f_${label.replace(/\W+/g, "_").toLowerCase()}`, [label]);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#111814]">
        {label} {required && <span className="text-[#B24A3A]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-[#3B5147]/25 bg-white px-3 py-2 text-sm text-[#111814] focus:border-[#3B5147] focus:outline-none focus:ring-2 focus:ring-[#3B5147]/30"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useMemo(() => `f_${label.replace(/\W+/g, "_").toLowerCase()}`, [label]);
  return (
    <div className="md:col-span-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#111814]">
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-[#3B5147]/25 bg-white px-3 py-2 text-sm text-[#111814] focus:border-[#3B5147] focus:outline-none focus:ring-2 focus:ring-[#3B5147]/30"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const id = useMemo(() => `f_${label.replace(/\W+/g, "_").toLowerCase()}`, [label]);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#111814]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-[#3B5147]/25 bg-white px-3 py-2 text-sm text-[#111814] focus:border-[#3B5147] focus:outline-none focus:ring-2 focus:ring-[#3B5147]/30"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ConditionalFields({
  lane,
  responses,
  setResponse,
}: {
  lane: LaneValue;
  responses: Record<string, string>;
  setResponse: (k: string, v: string) => void;
}) {
  const r = (k: string) => responses[k] ?? "";

  return (
    <fieldset className="grid gap-4 md:grid-cols-2">
      <legend className="col-span-full text-lg font-semibold text-[#111814]">3. A little more context</legend>

      {lane === "veteran" && (
        <>
          <SelectField
            label="Your relationship to the veteran community"
            value={r("relationship")}
            onChange={(v) => setResponse("relationship", v)}
            options={["Veteran", "Active duty", "Family member", "Caregiver", "Friend/ally", "Other"]}
          />
          <TextField label="Topic you're trying to better understand" value={r("topic")} onChange={(v) => setResponse("topic", v)} />
          <TextField label="State (optional)" value={r("state")} onChange={(v) => setResponse("state", v)} />
          <SelectField
            label="Current connection to VA care (optional)"
            value={r("va_connection")}
            onChange={(v) => setResponse("va_connection", v)}
            options={["Currently receiving VA care", "Previously received VA care", "Exploring VA care", "Not connected to VA", "Not sure"]}
          />
          <SelectField
            label="What kind of next step would be most useful?"
            value={r("next_step")}
            onChange={(v) => setResponse("next_step", v)}
            options={[
              "VA Community Care education",
              "Understanding the care-first model",
              "Mental health care information",
              "Ethical documentation education",
              "Operation Claims Success updates",
              "Not sure",
            ]}
          />
        </>
      )}

      {lane === "clinician" && (
        <>
          <TextField label="License type" value={r("license_type")} onChange={(v) => setResponse("license_type", v)} />
          <TextField label="Licensed states" value={r("licensed_states")} onChange={(v) => setResponse("licensed_states", v)} />
          <TextField label="Current practice or employer" value={r("practice")} onChange={(v) => setResponse("practice", v)} />
          <SelectField
            label="Veteran or military-family experience"
            value={r("vet_experience")}
            onChange={(v) => setResponse("vet_experience", v)}
            options={["Extensive", "Some", "Limited", "None yet"]}
          />
          <SelectField
            label="Trauma experience"
            value={r("trauma_experience")}
            onChange={(v) => setResponse("trauma_experience", v)}
            options={["Extensive", "Some", "Limited"]}
          />
          <SelectField
            label="Telehealth experience"
            value={r("telehealth_experience")}
            onChange={(v) => setResponse("telehealth_experience", v)}
            options={["Extensive", "Some", "Limited"]}
          />
          <SelectField
            label="Disability-documentation experience"
            value={r("doc_experience")}
            onChange={(v) => setResponse("doc_experience", v)}
            options={["Extensive", "Some", "Limited", "None"]}
          />
          <SelectField
            label="VA-adjacent experience"
            value={r("va_experience")}
            onChange={(v) => setResponse("va_experience", v)}
            options={["VA employee/contractor", "Community Care provider", "Referral relationships", "None"]}
          />
          <SelectField
            label="Interest level"
            value={r("interest_level")}
            onChange={(v) => setResponse("interest_level", v)}
            options={["Exploring", "Interested in joining", "Ready to onboard"]}
          />
          <TextField label="LinkedIn, resume, or practice-site URL" value={r("linkedin")} onChange={(v) => setResponse("linkedin", v)} />
          <TextArea label="Why does this mission interest you?" value={r("why")} onChange={(v) => setResponse("why", v)} />
          <SelectField
            label="Preferred next step"
            value={r("next_step")}
            onChange={(v) => setResponse("next_step", v)}
            options={["Intro call", "Application info", "Keep me on the list"]}
          />
        </>
      )}

      {(lane === "veteran_org" || lane === "community_org") && (
        <>
          <TextField label="Organization type" value={r("org_type")} onChange={(v) => setResponse("org_type", v)} />
          <TextField label="Who does the organization serve?" value={r("org_serves")} onChange={(v) => setResponse("org_serves", v)} />
          <SelectField
            label="Focus"
            value={r("org_focus")}
            onChange={(v) => setResponse("org_focus", v)}
            options={["Veteran-serving", "Veteran-adjacent", "Broader community impact"]}
          />
          <SelectField
            label="What collaboration are you interested in?"
            value={r("collab")}
            onChange={(v) => setResponse("collab", v)}
            options={[
              "Veteran education",
              "Shared content",
              "Referrals or resource awareness",
              "Beyond The Yellow story",
              "Operation Claims Success awareness",
              "Clinician/provider collaboration",
              "Community education",
              "Introduction",
              "Other",
            ]}
          />
          <TextArea label="What real support are you currently delivering?" value={r("current_support")} onChange={(v) => setResponse("current_support", v)} />
        </>
      )}

      {lane === "supporter" && (
        <>
          <SelectField
            label="Individual or organization?"
            value={r("supporter_type")}
            onChange={(v) => setResponse("supporter_type", v)}
            options={["Individual", "Organization"]}
          />
          <SelectField
            label="Type of support being explored"
            value={r("support_type")}
            onChange={(v) => setResponse("support_type", v)}
            options={[
              "Mission support",
              "Education content support",
              "Sponsorship conversation",
              "Distribution or reach",
              "Infrastructure support",
              "Introduction",
              "Not sure",
            ]}
          />
          <TextField label="Mission area of interest" value={r("mission_area")} onChange={(v) => setResponse("mission_area", v)} />
          <TextField label="Support range (optional)" value={r("support_range")} onChange={(v) => setResponse("support_range", v)} />
          <TextArea label="Anything ValorWell should know?" value={r("notes")} onChange={(v) => setResponse("notes", v)} />
        </>
      )}

      {lane === "creator" && (
        <>
          <TextField label="Platform or outlet" value={r("platform")} onChange={(v) => setResponse("platform", v)} />
          <TextField label="Audience size (optional)" value={r("audience")} onChange={(v) => setResponse("audience", v)} />
          <TextField label="Topic or story angle" value={r("angle")} onChange={(v) => setResponse("angle", v)} />
          <SelectField
            label="Interest area"
            value={r("interest_area")}
            onChange={(v) => setResponse("interest_area", v)}
            options={[
              "Interview Luke",
              "Operation Claims Success",
              "Veteran education",
              "Beyond The Yellow",
              "Build in public",
              "Content collaboration",
              "Guest introduction",
              "Other",
            ]}
          />
          <TextField label="Relevant links" value={r("links")} onChange={(v) => setResponse("links", v)} />
          <TextField label="Timeline (optional)" value={r("timeline")} onChange={(v) => setResponse("timeline", v)} />
        </>
      )}

      {lane === "intro" && (
        <>
          <TextField label="Who should ValorWell know?" value={r("who")} onChange={(v) => setResponse("who", v)} />
          <SelectField
            label="Person or organization type"
            value={r("intro_type")}
            onChange={(v) => setResponse("intro_type", v)}
            options={["Individual", "Organization", "Clinician", "Funder", "Sponsor", "Creator", "Other"]}
          />
          <TextArea label="Why are they a fit?" value={r("fit")} onChange={(v) => setResponse("fit", v)} />
          <SelectField
            label="Can you make a warm introduction?"
            value={r("warm")}
            onChange={(v) => setResponse("warm", v)}
            options={["Yes", "Maybe", "No"]}
          />
          <TextField label="Contact or profile link (optional)" value={r("intro_link")} onChange={(v) => setResponse("intro_link", v)} />
          <TextArea label="Additional context" value={r("context")} onChange={(v) => setResponse("context", v)} />
        </>
      )}

      {lane === "general" && (
        <TextArea label="Anything you want ValorWell to know? (optional)" value={r("notes")} onChange={(v) => setResponse("notes", v)} />
      )}
    </fieldset>
  );
}

/* ---------- FAQ ---------- */

function FAQItem({ q, a, cta }: { q: string; a: string; cta?: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#3B5147]/15">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) track("ocs_faq_expand", { q });
        }}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-[#111814] md:text-lg">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#3B5147] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-6">
          <p className="text-[#111814]/75">{a}</p>
          {cta && (
            <Link
              to={cta.href.startsWith("#") ? "#" : cta.href}
              onClick={(e) => {
                if (cta.href.startsWith("#")) {
                  e.preventDefault();
                  scrollToId(cta.href.slice(1));
                }
                track("ocs_faq_cta", { q, cta: cta.label });
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3B5147] hover:underline"
            >
              {cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Page ---------- */

export default function OperationClaimsSuccessPage() {
  const [preselectLane, setPreselectLane] = useState<LaneValue | undefined>(undefined);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    track("ocs_page_view");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
      setShowSticky(pct > 0.35 && pct < 0.9);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToForm = (lane?: LaneValue, event?: string) => {
    if (lane) setPreselectLane(lane);
    if (event) track(event);
    scrollToId(FORM_ANCHOR);
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#111814]">
      <Helmet>
        <title>Operation Claims Success | Breaking the Veteran Workaround Cycle | ValorWell</title>
        <meta
          name="description"
          content="Operation Claims Success is ValorWell's mission to break the cycle of veteran confusion, predatory shortcuts, and transactional documentation by building legitimate care pathways, provider infrastructure, honest education, and ethical clinical support."
        />
        <link rel="canonical" href="https://valorwell.org/operation-claims-success" />
        <meta property="og:title" content="Operation Claims Success | ValorWell" />
        <meta
          property="og:description"
          content="The system is broken. The workaround industry is making it worse. ValorWell is building the better path."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://valorwell.org/operation-claims-success" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />

      <main>
        {/* ================= 1. HERO ================= */}
        <section className="relative overflow-hidden bg-[#3B5147] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #F4F1E8 1px, transparent 1px), radial-gradient(circle at 80% 60%, #F4F1E8 1px, transparent 1px)",
              backgroundSize: "48px 48px, 72px 72px",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 lg:py-32">
            <Eyebrow tone="yellow">Operation Claims Success · By ValorWell</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              The system is broken.{" "}
              <span className="text-[#E8A798]">
                The workaround industry is making it worse.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/85 md:text-xl">
              Veterans are trapped in an arms race between a system that is too hard to navigate and an industry that keeps selling the next way around it. The shortcut may look like help today. When the workaround becomes the business model, veterans inherit more scrutiny, more friction, and another system they have to figure out.
            </p>
            <p className="mt-6 max-w-3xl text-xl font-semibold text-white md:text-2xl">
              ValorWell is not building another shortcut. We&rsquo;re building the better path.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  track("ocs_hero_see_better_path");
                  scrollToId(BETTER_PATH_ANCHOR);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-base font-semibold text-[#111814] transition hover:brightness-95"
              >
                See the Better Path <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goToForm(undefined, "ocs_hero_join_mission")}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Join the Mission
              </button>
            </div>

          </div>
        </section>

        {/* Section nav */}
        <nav aria-label="On this page" className="sticky top-16 z-30 hidden border-y border-[#3B5147]/15 bg-[#F4F1E8]/95 backdrop-blur md:block">
          <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm">
            {sectionNav.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToId(s.id)}
                className="whitespace-nowrap text-[#111814]/70 transition hover:text-[#3B5147]"
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ================= 2. THE WORKAROUND CYCLE ================= */}
        <section id={CYCLE_ANCHOR} className="border-t border-[#3B5147]/10 bg-[#F4F1E8]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow tone="ember">The Cycle</Eyebrow>

            {/* Cycle visualization */}
            <div className="relative mt-14">
              <img
                src="/cycle-diagram.png"
                alt="The Cycle: Every shortcut teaches the system to build another wall."
                className="mx-auto w-full max-w-5xl rounded-2xl border border-[#3B5147]/10 shadow-sm"
              />
            </div>

          </div>
        </section>

        {/* ================= 3. VETERANS ARE NOT THE PROBLEM ================= */}
        <section id="veterans-not-problem" className="border-t border-[#3B5147]/10 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
            <Eyebrow>Let&rsquo;s be clear</Eyebrow>
            <SectionHeading>The veteran looking for help is not the problem.</SectionHeading>
            <div className="mt-6 space-y-5 text-lg text-[#111814]/80">
              <p>We understand why veterans use these systems.</p>
              <p>
                When you&rsquo;ve waited, been denied, received conflicting information, or spent months trying to understand a process nobody explains clearly, the person promising a faster answer starts to sound pretty damn reasonable.
              </p>
              <p>Veterans did not create this market.</p>
              <p>Confusion created the demand. Bad incentives learned how to monetize it.</p>
            </div>
            <p className="mt-10 rounded-2xl border-l-4 border-[#3B5147] bg-[#F4F1E8] px-6 py-5 text-lg font-semibold text-[#111814] md:text-xl">
              Our anger is not aimed at veterans trying to find a way through. It is aimed at systems that profit when veterans stay confused.
            </p>
          </div>
        </section>

        {/* ================= 4. THE SHORTCUT INDUSTRY ================= */}
        <section id="shortcut-industry" className="border-t border-[#3B5147]/10 bg-[#F4F1E8]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow tone="ember">Who benefits from the cycle?</Eyebrow>
            <SectionHeading>An entire economy has grown around veteran confusion.</SectionHeading>
            <div className="mt-6 max-w-3xl space-y-4 text-lg text-[#111814]/80">
              <p>Not every attorney is predatory. Not every consultant started with bad intentions. Not every clinician providing documentation is acting unethically.</p>
              <p>But good intentions do not automatically create good incentives.</p>
              <p>We need to be willing to look directly at the business models the current system has produced.</p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {shortcutCategories.map(({ icon: Icon, eyebrow, title, body, pull }, i) => (
                <div
                  key={title}
                  className="flex flex-col rounded-2xl border border-[#3B5147]/15 bg-white p-6 md:p-7"
                  onMouseEnter={() => track(`ocs_category_${["fee_structure", "claims_coaching", "transactional_docs"][i]}_view`)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B24A3A]/10">
                    <Icon className="h-5 w-5 text-[#B24A3A]" />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#B24A3A]">{eyebrow}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#111814]">{title}</h3>
                  <p className="mt-3 text-[#111814]/75">{body}</p>
                  <p className="mt-5 border-l-2 border-[#B24A3A] pl-4 text-sm font-semibold italic text-[#111814]">
                    {pull}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Guardrail>
                ValorWell may support Nexus-related and other clinical documentation when it is clinically appropriate and connected to real care. The enemy is not the document. It is the transaction-first model and the broader workaround cycle.
              </Guardrail>
            </div>
          </div>
        </section>

        {/* ================= 5. VALORWELL'S REFUSAL ================= */}
        <section id="refusal" className="border-t border-[#3B5147]/10 bg-[#111814] text-white">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <Eyebrow tone="ember">Our line in the sand</Eyebrow>
            <SectionHeading light>We&rsquo;re done participating in the workaround cycle.</SectionHeading>

            <ul className="mt-10 space-y-3">
              {refusalPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-lg">
                  <X className="mt-1 h-5 w-5 shrink-0 text-[#E8A798]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <p className="mt-12 text-xl text-white/80">
              We are not trying to find the next hole in the fence.
            </p>
            <p className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              We&rsquo;re building a path{" "}
              <span className="text-[#D7A92E]">the system should not have to close</span> behind us.
            </p>
          </div>
        </section>

        {/* ================= 6. CARE FIRST. NOT LETTER FIRST. ================= */}
        <section className="border-t border-[#3B5147]/10 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
            <Eyebrow>The clinical standard</Eyebrow>
            <SectionHeading>Care first. Not letter first.</SectionHeading>
            <div className="mt-6 max-w-3xl space-y-4 text-lg text-[#111814]/80">
              <p>
                This is not the entire Operation Claims Success mission. It is the clinical standard underneath it.
              </p>
              <p>
                When mental health documentation is appropriate, the person should come before the paperwork. Clinical understanding should come before a requested conclusion. Clinician judgment should come before a promised outcome.
              </p>
              <p className="pt-2 text-[#111814]">
                <span className="font-semibold">Nexus-related documentation is not the enemy.</span>{" "}
                A letter-first business model is.
              </p>
            </div>
            <p className="mt-10 rounded-2xl bg-[#3B5147] px-6 py-6 text-lg font-semibold text-white md:text-xl">
              Documentation should reflect clinically supported reality. It should not manufacture the result somebody promised before the appointment started.
            </p>

            <div className="mt-8">
              <Guardrail tone="warn">
                ValorWell does not guarantee Nexus Letters, VA disability ratings, service connection, claim approval, VA Community Care authorization, or any VA outcome. Documentation, when available, depends on clinical appropriateness and proper care context.
              </Guardrail>
            </div>
          </div>
        </section>

        {/* ================= 7. THE BETTER PATH ================= */}
        <section id={BETTER_PATH_ANCHOR} className="border-t border-[#3B5147]/10 bg-[#F4F1E8]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow>What we&rsquo;re building instead</Eyebrow>
            <SectionHeading>Stop looking for the next shortcut. Build a legitimate path.</SectionHeading>

            <ol className="mt-12 space-y-4">
              {betterPathSteps.map((s) => (
                <li
                  key={s.n}
                  className="flex gap-6 rounded-2xl border border-[#3B5147]/15 bg-white p-6 md:p-7"
                  onMouseEnter={() => track("ocs_better_path_step_view", { step: s.n })}
                >
                  <span className="text-3xl font-bold text-[#3B5147]/40 md:text-4xl">{s.n}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#111814]">{s.title}</h3>
                    <p className="mt-2 text-[#111814]/75">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-2xl font-bold text-[#3B5147] md:text-3xl">
              A better path does not require pretending we control the destination.
            </p>
          </div>
        </section>

        {/* ================= 8. WHAT OCS ACTUALLY IS ================= */}
        <section className="border-t border-[#3B5147]/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow>What Operation Claims Success actually is</Eyebrow>
            <SectionHeading>Operation Claims Success is a systems mission.</SectionHeading>

            <div className="mt-6 max-w-3xl space-y-4 text-lg text-[#111814]/80">
              <p>
                Operation Claims Success is ValorWell&rsquo;s work to break the veteran workaround cycle by building clearer education, legitimate care pathways, provider infrastructure, mission-aligned clinical capacity, and ethical documentation systems.
              </p>
              <p>It is bigger than a Nexus Letter.</p>
              <p>It is bigger than VA Community Care registration.</p>
              <p>It is bigger than mental health treatment alone.</p>
              <p>
                It is ValorWell&rsquo;s attempt to build a veteran support pathway that becomes more legitimate as it grows &mdash; not more dependent on the next loophole.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#3B5147]/20 bg-[#F4F1E8] p-6 md:p-8">
                <div className="flex items-center gap-2 text-[#3B5147]">
                  <Check className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-widest">What OCS builds</p>
                </div>
                <ul className="mt-4 space-y-3">
                  {ocsBuilds.map((t) => (
                    <li key={t} className="flex gap-3 text-[#111814]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#3B5147]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#B24A3A]/25 bg-white p-6 md:p-8">
                <div className="flex items-center gap-2 text-[#B24A3A]">
                  <X className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-widest">What OCS refuses</p>
                </div>
                <ul className="mt-4 space-y-3">
                  {ocsRefuses.map((t) => (
                    <li key={t} className="flex gap-3 text-[#111814]">
                      <X className="mt-1 h-4 w-4 shrink-0 text-[#B24A3A]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 9. VA COMMUNITY CARE BUILDOUT ================= */}
        <section id="buildout" className="border-t border-[#3B5147]/10 bg-[#F4F1E8]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow>Building the infrastructure</Eyebrow>
            <SectionHeading>A legitimate path has to exist before we can tell veterans to use it.</SectionHeading>

            <div className="mt-6 max-w-3xl space-y-4 text-lg text-[#111814]/80">
              <p>
                One of the largest Operation Claims Success workstreams is the provider pathway behind VA Community Care.
              </p>
              <p>
                ValorWell is documenting registration steps, regional requirements, provider-specific blockers, and the pieces controlled by outside systems.
              </p>
              <p>This is slow work.</p>
              <p>
                It is also exactly the work shortcut businesses avoid because infrastructure is harder to sell than a promise.
              </p>
            </div>

            <p className="mt-8 text-xl font-semibold text-[#3B5147] md:text-2xl">
              We would rather build the boring system correctly than sell the exciting promise early.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {buildoutAreas.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-[#3B5147]/15 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B5147]/10">
                    <Icon className="h-5 w-5 text-[#3B5147]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#111814]">{title}</h3>
                  <p className="mt-2 text-sm text-[#111814]/75">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Guardrail>
                ValorWell is working to build and document the provider registration pathway so legitimate VA Community Care access can expand over time. ValorWell does not control eligibility, authorization, referral decisions, VA Community Care decisions, or claim decisions.
              </Guardrail>
            </div>
          </div>
        </section>

        {/* ================= 10. ETHICAL DOCUMENTATION ================= */}
        <section id="ethics" className="border-t border-[#3B5147]/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow>Ethical clinical documentation</Eyebrow>
            <SectionHeading>Documentation should come from clinical reality &mdash; not a sales promise.</SectionHeading>

            <div className="mt-6 max-w-3xl space-y-4 text-lg text-[#111814]/80">
              <p>
                ValorWell is building systems that may support Nexus-related and other clinical documentation when the documentation is clinically appropriate and connected to legitimate care and clinician judgment.
              </p>
              <p>We are not anti-documentation.</p>
              <p>
                We are anti-transactional documentation that decides what the answer should be before the clinical work begins.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ethicalPrinciples.map((p) => (
                <div key={p.title} className="rounded-xl border border-[#3B5147]/15 bg-[#F4F1E8] p-6">
                  <h3 className="text-lg font-semibold text-[#3B5147]">{p.title}</h3>
                  <p className="mt-2 text-[#111814]/80">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Guardrail tone="warn">
                ValorWell does not guarantee Nexus Letters, VA disability ratings, service connection, claim approval, VA Community Care authorization, or any VA outcome. Documentation, when available, depends on clinical appropriateness and proper care context.
              </Guardrail>
            </div>
          </div>
        </section>

        {/* ================= 11. CLINICIAN MISSION ================= */}
        <section className="border-t border-[#3B5147]/10 bg-[#F4F1E8]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow>Clinicians</Eyebrow>
            <SectionHeading>Clinicians: help us end the workaround cycle.</SectionHeading>

            <div className="mt-6 max-w-3xl space-y-4 text-lg text-[#111814]/80">
              <p className="font-semibold text-[#111814]">This is bigger than filling appointment slots.</p>
              <p>
                Operation Claims Success needs clinicians who believe real care, ethical documentation, and better access pathways belong together.
              </p>
              <p>Your sessions matter.</p>
              <p>So does the system around them.</p>
              <p>
                If you want your clinical work to matter beyond the session, help us build a model where veterans do not have to choose between confusion and a transactional shortcut.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {clinicianValues.map((v) => (
                <div key={v.title} className="rounded-xl border border-[#3B5147]/15 bg-white p-5">
                  <h3 className="text-base font-semibold text-[#3B5147]">{v.title}</h3>
                  <p className="mt-2 text-sm text-[#111814]/75">{v.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/clinicians"
                onClick={() => track("ocs_clinician_click")}
                className="inline-flex items-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-base font-semibold text-white hover:bg-[#2f4239]"
              >
                Join the Clinician Mission <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => goToForm("clinician", "ocs_clinician_talk")}
                className="inline-flex items-center gap-2 rounded-md border border-[#3B5147] bg-white px-6 py-3 text-base font-semibold text-[#3B5147] hover:bg-[#3B5147]/5"
              >
                Talk to ValorWell
              </button>
            </div>
          </div>
        </section>

        {/* ================= 12. ORGANIZATIONS / LEVERAGE ================= */}
        <section id="partners" className="border-t border-[#3B5147]/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow>Help move the work</Eyebrow>
            <SectionHeading>We do not need more organizations agreeing that the system is broken.</SectionHeading>
            <p className="mt-4 text-xl font-semibold text-[#B24A3A]">
              We need people willing to help build what comes next.
            </p>

            <div className="mt-6 max-w-3xl space-y-3 text-lg text-[#111814]/80">
              <p>Maybe you operate a veteran organization.</p>
              <p>Maybe you have reach.</p>
              <p>Maybe you know clinicians.</p>
              <p>Maybe you understand VA systems.</p>
              <p>Maybe you have infrastructure, funding, media, technical expertise, or the right introduction.</p>
              <p className="font-semibold text-[#111814]">Bring what you have.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {leveragePaths.map(({ icon: Icon, title, body, cta, lane, event }) => (
                <div key={title} className="flex flex-col justify-between rounded-2xl border border-[#3B5147]/15 bg-[#F4F1E8] p-6 md:p-7">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B5147]/10">
                      <Icon className="h-5 w-5 text-[#3B5147]" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#111814]">{title}</h3>
                    <p className="mt-2 text-[#111814]/75">{body}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToForm(lane as LaneValue, event)}
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-md border border-[#3B5147] bg-white px-4 py-2 text-sm font-semibold text-[#3B5147] hover:bg-[#3B5147]/5"
                  >
                    {cta} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => goToForm(undefined, "ocs_join_mission_click")}
                className="inline-flex items-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-base font-semibold text-white hover:bg-[#2f4239]"
              >
                Join the Mission <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goToForm("intro", "ocs_intro_click")}
                className="inline-flex items-center gap-2 rounded-md border border-[#3B5147] px-6 py-3 text-base font-semibold text-[#3B5147] hover:bg-[#3B5147]/5"
              >
                Make an Introduction
              </button>
            </div>
          </div>
        </section>

        {/* ================= 13. BEYOND THE YELLOW ================= */}
        <section className="border-t border-[#3B5147]/10 bg-[#3B5147] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow tone="yellow">Beyond The Yellow</Eyebrow>
            <SectionHeading light>This is ValorWell going Beyond The Yellow.</SectionHeading>

            <div className="mt-6 max-w-3xl space-y-4 text-lg text-white/85">
              <p>
                Beyond The Yellow asks a simple question: are you actually doing something that helps?
              </p>
              <p>
                Operation Claims Success is ValorWell&rsquo;s answer to that question in the veteran support ecosystem.
              </p>
              <p>We could post another ribbon.</p>
              <p>We could say veterans deserve better.</p>
              <p>We could complain about claims companies, long waits, confusing systems, and predatory models.</p>
              <p className="text-white">Or we can build.</p>
            </div>

            <p className="mt-10 text-2xl font-bold text-[#D7A92E] md:text-3xl">
              Operation Claims Success is what action looks like when the problem is a system.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/beyondtheyellow"
                onClick={() => track("ocs_bty_click")}
                className="inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-base font-semibold text-[#111814] hover:brightness-95"
              >
                Go Beyond The Yellow <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/beyondtheyellow"
                onClick={() => track("ocs_bty_story")}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Share Your Beyond The Yellow Story
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 14. WHAT HAPPENS NEXT ================= */}
        <section className="border-t border-[#3B5147]/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Eyebrow>What happens next</Eyebrow>
            <SectionHeading>You do not have to solve the whole system. Pick the part you can move.</SectionHeading>

            <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {[
                { t: "Choose your lane.", b: "Veteran, clinician, organization, supporter, creator, or connector." },
                { t: "Tell ValorWell why you are here.", b: "A few short answers so we can route the inquiry to the right person." },
                { t: "We review and route.", b: "Real humans read every submission and direct it to the correct next step." },
                { t: "The next step depends on fit and current capability.", b: "Sometimes that means care, sometimes partnership, sometimes an intro, sometimes staying in the loop." },
                { t: "The mission keeps moving.", b: "Even when timing is not right today, the work continues in public." },
              ].map((s, i) => (
                <li key={s.t} className="rounded-2xl border border-[#3B5147]/15 bg-[#F4F1E8] p-6">
                  <span className="text-sm font-bold text-[#B24A3A]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-base font-semibold text-[#111814]">{s.t}</h3>
                  <p className="mt-2 text-sm text-[#111814]/75">{s.b}</p>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-3xl text-sm text-[#111814]/70">
              Reaching out does not guarantee clinical care, VA Community Care access, documentation, partnership, sponsorship, being featured, or any VA outcome.
            </p>
          </div>
        </section>

        {/* ================= 15. ROUTING FORM ================= */}
        <section id={FORM_ANCHOR} className="border-t border-[#3B5147]/10 bg-[#F4F1E8]">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
            <Eyebrow>Find your place</Eyebrow>
            <SectionHeading>What can you help move?</SectionHeading>
            <p className="mt-4 max-w-2xl text-[#111814]/75">
              You do not need to understand every part of Operation Claims Success. Start with why you are here.
            </p>
            <div className="mt-8">
              <RoutingForm initialLane={preselectLane} />
            </div>
          </div>
        </section>

        {/* ================= 16. FAQ ================= */}
        <section className="border-t border-[#3B5147]/10 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
            <Eyebrow>FAQ &amp; guardrails</Eyebrow>
            <SectionHeading>Questions we want to be clear about.</SectionHeading>
            <div className="mt-10">
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} cta={f.cta} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= 17. FINAL CTA ================= */}
        <section className="border-t border-[#3B5147]/10 bg-[#3B5147] text-white">
          <div className="mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
            <Eyebrow tone="yellow">Break the cycle. Build the path.</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              The workaround cycle does not stop on its own.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/85">
              The system is already hard to navigate. Entire business models have already learned how to profit from the confusion. Waiting for the next shortcut will only give us another shortcut.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold text-white md:text-2xl">
              We&rsquo;re building the better path.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goToForm(undefined, "ocs_final_join_mission")}
                className="inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-base font-semibold text-[#111814] hover:brightness-95"
              >
                Join the Mission <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  track("ocs_final_better_path");
                  scrollToId(BETTER_PATH_ANCHOR);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Explore the Better Path
              </button>
              <Link
                to="/clinicians"
                onClick={() => track("ocs_final_clinician")}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Join the Clinician Mission
              </Link>
            </div>
            <p className="mt-12 text-2xl font-bold text-[#D7A92E] md:text-3xl">
              Break the cycle. Build the path. Care first.
            </p>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      {showSticky && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:bottom-6">
          <button
            type="button"
            onClick={() => goToForm(undefined, "ocs_sticky_join_mission")}
            className="inline-flex items-center gap-2 rounded-full bg-[#3B5147] px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 hover:bg-[#2f4239]"
          >
            Join the Mission <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
