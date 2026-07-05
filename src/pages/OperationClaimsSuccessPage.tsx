import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Stethoscope,
  FileText,
  Wrench,
  Users,
  Handshake,
  Megaphone,
  Radio,
  Heart,
  UserPlus,
  Building2,
  Video,
  Share2,
  Check,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { trackHomeEvent } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "operation-claims-success", ...params });

const FORM_ANCHOR = "ocs-routing-form";
const PATHWAY_ANCHOR = "care-first-path";

/* ---------- Small primitives ---------- */

function Eyebrow({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "red" | "yellow" }) {
  const cls =
    tone === "red"
      ? "text-accent"
      : tone === "yellow"
      ? "text-[hsl(var(--gold-accent))]"
      : "text-[hsl(var(--navy))]";
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${cls}`}>{children}</p>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
      {children}
    </h2>
  );
}

function Guardrail({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "warn" }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border-l-4 px-5 py-4 text-sm leading-relaxed md:text-base ${
        tone === "warn"
          ? "border-accent bg-accent/5 text-foreground"
          : "border-[hsl(var(--navy))] bg-[hsl(var(--section-alt))] text-foreground"
      }`}
    >
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--navy))]" />
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

const problems = [
  { title: "Access Is Confusing", body: "Veterans are often left trying to navigate the system alone." },
  { title: "Delays Create Pressure", body: "When care feels out of reach, shortcuts start to look attractive." },
  { title: "Documentation Gets Exploited", body: "Documentation should not be disconnected from care." },
  { title: "Veterans Deserve Better", body: "The better answer is infrastructure." },
];

const pathwaySteps = [
  {
    title: "Start With the Local VA / Care Team",
    body: "A veteran generally begins through their local VA or established VA care pathway.",
  },
  {
    title: "A Relevant Referral Pathway May Be Involved",
    body: "Behavioral Health or another appropriate referral pathway may become relevant.",
  },
  {
    title: "VA Community Care May Become Relevant",
    body: "Community Care may be an option when applicable eligibility and access criteria are met.",
  },
  {
    title: "Authorization and Provider Availability Must Be Confirmed",
    body: "ValorWell does not independently control VA authorization or eligibility.",
  },
  {
    title: "Care Is Delivered Through Legitimate Clinical Channels",
    body: "Real clinical care comes before documentation-first shortcuts.",
  },
  {
    title: "Documentation May Be Created When Clinically Appropriate",
    body: "Documentation depends on clinical judgment and appropriate care context.",
  },
  {
    title: "VA Outcomes Remain VA Decisions",
    body: "ValorWell does not determine disability ratings, service connection, or claim approval.",
  },
];

const buildoutAreas = [
  { icon: Wrench, title: "Provider Registration", body: "Identifying the right setup steps by provider, state, region, and applicable pathway." },
  { icon: FileText, title: "Process Documentation", body: "Turning repeated discoveries into SOPs so the process does not live in one person's head." },
  { icon: Compass, title: "Access Expansion", body: "Working toward a stronger foundation for legitimate mental health care access over time." },
  { icon: Radio, title: "Transparency", body: "Sharing the mission publicly without promising what is not yet controlled." },
];

const ethicalPrinciples = [
  { title: "Clinically Appropriate Only", body: "Documentation should only be created when clinically appropriate." },
  { title: "Real Care Context", body: "Documentation should be connected to actual evaluation, treatment, and clinical understanding." },
  { title: "No Outcome Guarantees", body: "No provider or organization should promise a VA claim result they do not control." },
  { title: "Clinician Judgment Matters", body: "AI, templates, and systems may support workflow, but they cannot replace clinician judgment." },
];

const clinicianValues = [
  { title: "Mission", body: "Be part of a care-first alternative to predatory documentation models." },
  { title: "Impact", body: "Help veterans and families access legitimate mental health care and responsible support." },
  { title: "Infrastructure", body: "Join a team building systems, not just chasing sessions." },
  { title: "Standards", body: "Work inside a model that respects clinical judgment and avoids outcome guarantees." },
];

const partnerPaths = [
  {
    lane: "veteran_org",
    icon: Users,
    title: "Veteran Organizations",
    body: "Education, referrals, shared content, introductions, Beyond The Yellow stories, and Operation Claims Success awareness.",
    cta: "Partner Around Veteran Support",
    event: "ocs_partner_veteran_org",
  },
  {
    lane: "clinician",
    icon: Stethoscope,
    title: "Clinician / Provider Groups",
    body: "Clinician recruitment, provider education, ethical documentation standards, and access pathway buildout.",
    cta: "Connect as a Clinical Partner",
    event: "ocs_partner_clinical",
  },
  {
    lane: "community_org",
    icon: Building2,
    title: "Community / Faith / Employer Groups",
    body: "Awareness, introductions, support, education distribution, and local trust-building.",
    cta: "Start a Community Conversation",
    event: "ocs_partner_community",
  },
  {
    lane: "creator",
    icon: Video,
    title: "Media / Creator Partners",
    body: "Interviews, distribution, education, storytelling, and mission amplification.",
    cta: "Collaborate on the Mission",
    event: "ocs_partner_media",
  },
];

const supporterPaths = [
  { lane: "supporter", title: "Mission Support", body: "Support ValorWell's broader care-first veteran mission.", cta: "Support the Mission", event: "ocs_support_mission" },
  { lane: "supporter", title: "Sponsor Education Content", body: "Support public education around care-first support, ethical documentation, and avoiding predatory models.", cta: "Sponsor Education Content", event: "ocs_support_content" },
  { lane: "intro", title: "Introduce a Partner", body: "Connect ValorWell to veteran organizations, clinicians, funders, sponsors, or creators.", cta: "Make an Introduction", event: "ocs_support_intro" },
  { lane: "general", title: "Share the Mission", body: "Follow, comment, repost, and help the right people discover the build.", cta: "Watch & Share", event: "ocs_support_share", href: "/watch" as const },
];

const laneOptions: { value: string; label: string; tag: string }[] = [
  { value: "veteran", label: "Veteran or family member looking for education", tag: "veteran-interest" },
  { value: "clinician", label: "Clinician or provider interested in the mission", tag: "clinician-lead" },
  { value: "veteran_org", label: "Veteran organization", tag: "veteran-org-lead" },
  { value: "community_org", label: "Community organization, employer, church, or nonprofit", tag: "partner-lead" },
  { value: "supporter", label: "Supporter or sponsor", tag: "supporter-lead" },
  { value: "creator", label: "Creator, media outlet, podcast, or storyteller", tag: "creator-lead" },
  { value: "intro", label: "Introduction / connector", tag: "intro-lead" },
  { value: "general", label: "Not sure, but want to follow the build", tag: "ocs-lead" },
];

const faqs = [
  {
    q: "Is Operation Claims Success a Nexus Letter service?",
    a: "No. Operation Claims Success is ValorWell's care-first mission to build better veteran and family support pathways. Ethical clinical documentation may be supported when clinically appropriate and connected to proper care context, but ValorWell is not building a transactional letter-on-demand service.",
  },
  {
    q: "Can ValorWell guarantee my VA claim will be approved?",
    a: "No. ValorWell does not control VA claim decisions, disability ratings, service connection, or claim approval and does not guarantee any VA outcome.",
  },
  {
    q: "Can ValorWell guarantee VA Community Care access?",
    a: "No. VA Community Care eligibility, authorization, referrals, and related decisions depend on VA processes and other factors ValorWell does not independently control. ValorWell can provide general education about the pathway and is working to build and document provider access infrastructure over time.",
  },
  {
    q: "What does \u201Ccare first\u201D mean?",
    a: "It means the person comes before the paperwork. Real care, appropriate evaluation, clinical understanding, and clinician judgment should come before documentation support.",
  },
  {
    q: "Why does ValorWell talk about predatory documentation models?",
    a: "Confusing systems and delayed access can make veterans vulnerable to expensive documentation-first shortcuts. ValorWell believes the better response is to build legitimate care pathways, provide honest education, and connect documentation to real clinical context when appropriate.",
  },
  {
    q: "Can clinicians join the mission?",
    a: "Yes. Mission-aligned clinicians and providers can express interest in helping ValorWell build ethical, care-first support for veterans and families.",
    cta: { label: "Join the Clinician Mission", href: "/clinicians" },
  },
  {
    q: "Can veteran organizations partner with ValorWell?",
    a: "Yes. ValorWell is interested in education, collaboration, introductions, shared content, Beyond The Yellow stories, and other aligned veteran-support relationships.",
    cta: { label: "Partner Around Veteran Support", href: "#ocs-routing-form" },
  },
  {
    q: "Is support or sponsorship tax-deductible?",
    a: "Contact ValorWell to discuss current support and sponsorship options.",
  },
];

const sectionNav = [
  { id: "the-problem", label: "The Problem" },
  { id: PATHWAY_ANCHOR, label: "Care-First Path" },
  { id: "buildout", label: "What We're Building" },
  { id: "ethics", label: "Ethical Documentation" },
  { id: FORM_ANCHOR, label: "Join the Mission" },
];

/* ---------- Routing Form ---------- */

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
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--navy))] text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Thanks for reaching out.</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          We&rsquo;ll review your submission and route it to the right next step. In the meantime, follow ValorWell and watch Beyond The Yellow to see the mission in motion.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/watch"
            onClick={() => track("ocs_form_confirm_watch")}
            className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
          >
            Watch ValorWell <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/beyondtheyellow"
            onClick={() => track("ocs_form_confirm_bty")}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Watch Beyond The Yellow
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      {/* Lane */}
      <fieldset>
        <legend className="text-lg font-semibold text-foreground">1. Choose your lane</legend>
        <p className="mt-1 text-sm text-muted-foreground">
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
                    ? "border-[hsl(var(--navy))] bg-[hsl(var(--navy))]/5"
                    : "border-border bg-background hover:border-[hsl(var(--navy))]/50"
                }`}
              >
                <input
                  type="radio"
                  name="lane"
                  className="mt-1 accent-[hsl(var(--navy))]"
                  value={opt.value}
                  checked={active}
                  onChange={() => {
                    update("lane", opt.value);
                    track("ocs_form_lane_select", { lane: opt.value });
                  }}
                />
                <span className="text-foreground">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {form.lane && (
        <>
          {/* Contact */}
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="col-span-full text-lg font-semibold text-foreground">2. Contact details</legend>
            <TextField label="First name" required value={form.first_name} onChange={(v) => update("first_name", v)} />
            <TextField label="Last name" required value={form.last_name} onChange={(v) => update("last_name", v)} />
            <TextField label="Email" required type="email" value={form.email} onChange={(v) => update("email", v)} />
            <TextField label="Phone (optional)" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
            <TextField label="Organization (optional)" value={form.organization} onChange={(v) => update("organization", v)} />
            <TextField label="Role / title (optional)" value={form.role_title} onChange={(v) => update("role_title", v)} />
            <TextField label="Website (optional)" value={form.website} onChange={(v) => update("website", v)} />
            <TextField label="Social link (optional)" value={form.social_link} onChange={(v) => update("social_link", v)} />
          </fieldset>

          {/* Conditional */}
          <ConditionalFields lane={form.lane} responses={form.responses} setResponse={setResponse} />

          {/* Consent */}
          <label className="flex items-start gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[hsl(var(--navy))]"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              required
            />
            <span>
              I understand submitting this form does not guarantee clinical care, VA Community Care access, documentation, partnership, sponsorship, being featured, or any VA outcome.
            </span>
          </label>

          {status === "error" && (
            <div role="alert" className="rounded-md border border-accent/40 bg-accent/5 p-3 text-sm text-accent">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !form.consent}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-base font-semibold text-white transition hover:bg-[hsl(var(--navy-light))] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Follow the Build
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
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useMemo(() => `f_${label.replace(/\W+/g, "_").toLowerCase()}`, [label]);
  return (
    <div className="md:col-span-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30"
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
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30"
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
      <legend className="col-span-full text-lg font-semibold text-foreground">3. A little more context</legend>

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
    <div className="border-b border-border">
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
        <span className="text-base font-semibold text-foreground md:text-lg">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-6">
          <p className="text-muted-foreground">{a}</p>
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
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--navy))] hover:underline"
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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Operation Claims Success | Care-First Veteran Support by ValorWell</title>
        <meta
          name="description"
          content="Operation Claims Success is ValorWell's care-first mission to help veterans and families understand mental health care access, VA Community Care education, and ethical documentation support when clinically appropriate."
        />
        <link rel="canonical" href="https://valorwell.org/operation-claims-success" />
        <meta property="og:title" content="Operation Claims Success | ValorWell" />
        <meta
          property="og:description"
          content="Care first. Not letter first. ValorWell's care-first alternative to predatory veteran documentation models."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />

      <main>
        {/* ================= 1. HERO ================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--hero-gradient-start))] via-background to-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 lg:py-28">
            <Eyebrow>Operation Claims Success · By ValorWell</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Care first. <span className="text-accent">Not letter first.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Operation Claims Success is ValorWell&rsquo;s work to build a care-first, ethical pathway for veterans and families navigating mental health care access, VA Community Care education, and clinical documentation support when appropriate. No shortcuts. No guarantees. No letter-first model. Real care first.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => goToForm(undefined, "ocs_hero_follow_build")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-base font-semibold text-white transition hover:bg-[hsl(var(--navy-light))]"
              >
                Follow the Build <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/clinicians"
                onClick={() => track("ocs_hero_clinician")}
                className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--navy))] bg-background px-6 py-3 text-base font-semibold text-[hsl(var(--navy))] transition hover:bg-[hsl(var(--navy))]/5"
              >
                Join the Clinician Mission
              </Link>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Represent a veteran organization?{" "}
              <button
                type="button"
                onClick={() => goToForm("veteran_org", "ocs_hero_veteran_org")}
                className="font-semibold text-[hsl(var(--navy))] underline underline-offset-4 hover:text-[hsl(var(--navy-light))]"
              >
                Partner around veteran support.
              </button>
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-2 text-xs">
              {["Real Care", "Ethical Documentation", "VA-Aligned Education"].map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-3 py-1 font-medium text-foreground">
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-2xl border-l-2 border-accent pl-4 text-sm italic text-muted-foreground">
              We are building the pathway publicly. We will not promise what we do not control.
            </p>
          </div>
        </section>

        {/* Section nav */}
        <nav aria-label="On this page" className="sticky top-16 z-30 hidden border-y border-border bg-background/95 backdrop-blur md:block">
          <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm">
            {sectionNav.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToId(s.id)}
                className="whitespace-nowrap text-muted-foreground transition hover:text-[hsl(var(--navy))]"
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ================= 2. THE PROBLEM ================= */}
        <section id="the-problem" className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow tone="red">The Problem</Eyebrow>
            <SectionHeading>Confusion creates desperation. Desperation creates predators.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Too many veterans and families are stuck between slow access, unclear pathways, and expensive companies selling documentation-first shortcuts. When people cannot figure out how to get legitimate care or responsible documentation, they become vulnerable to models that put the letter before the person.
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
              {problems.map((p, i) => (
                <div key={p.title} className="bg-background p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
              The category enemy is the letter-first model and the ecosystem conditions that make predatory shortcuts attractive &mdash; not the veterans caught in it.
            </p>
          </div>
        </section>

        {/* ================= 3. CARE-FIRST ALTERNATIVE ================= */}
        <section className="border-t border-border bg-[hsl(var(--section-alt))]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>The Alternative</Eyebrow>
            <SectionHeading>The alternative starts with care.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Operation Claims Success is built around a simple standard: care comes first, and documentation only happens when clinically appropriate. ValorWell is not building another pay-for-letter funnel. We are building legitimate access education, provider setup workflows, clinical documentation systems, and a mission-aligned provider network.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { icon: Compass, title: "Access Education", body: "Help veterans and families better understand legitimate VA-aligned pathways, including how VA Community Care may become relevant." },
                { icon: Stethoscope, title: "Real Mental Health Care", body: "Build access to mission-aligned clinicians who can provide actual care, not just paperwork." },
                { icon: FileText, title: "Ethical Documentation", body: "Support responsible clinical documentation when clinically appropriate, with no promises of VA outcomes." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border bg-background p-6 md:p-7">
                  <Icon className="h-6 w-6 text-[hsl(var(--navy))]" />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            {/* Process flow */}
            <div className="mt-12 rounded-2xl border border-border bg-background p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">The shift</p>
              <div className="mt-4 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
                {[
                  { label: "Confusion / Predatory Shortcut", tone: "bad" },
                  { label: "Care-First Pathway", tone: "good" },
                  { label: "Ethical Clinical Support", tone: "good" },
                  { label: "Better Veteran Infrastructure", tone: "good" },
                ].map((step, idx, arr) => (
                  <div key={step.label} className="flex items-center gap-3 md:flex-1">
                    <div
                      className={`flex-1 rounded-lg border px-4 py-3 text-sm font-semibold ${
                        step.tone === "bad"
                          ? "border-accent/40 bg-accent/5 text-accent"
                          : "border-[hsl(var(--navy))]/40 bg-[hsl(var(--navy))]/5 text-[hsl(var(--navy))]"
                      }`}
                    >
                      {step.label}
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  track("ocs_care_first_path_click");
                  scrollToId(PATHWAY_ANCHOR);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-base font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
              >
                Learn the Care-First Path <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= 4. WHAT OCS IS ================= */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>Definition</Eyebrow>
            <SectionHeading>What is Operation Claims Success?</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Operation Claims Success is ValorWell&rsquo;s care-first system for helping veterans and families understand legitimate mental health care access pathways, avoid predatory documentation models, and receive ethical clinical documentation support when appropriate.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-6 md:p-8">
                <div className="flex items-center gap-2 text-[hsl(var(--navy))]">
                  <Check className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-widest">What OCS is</p>
                </div>
                <ul className="mt-4 space-y-3 text-foreground">
                  {[
                    "VA Community Care access education.",
                    "Provider registration pathway buildout.",
                    "Veteran and family education.",
                    "Mission-aligned clinician recruitment.",
                    "Ethical clinical documentation systems.",
                    "Documentation only when clinically appropriate.",
                    "Anti-predatory public education.",
                    "Partner and community awareness.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--navy))]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
                <div className="flex items-center gap-2 text-accent">
                  <X className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-widest">What OCS does not promise</p>
                </div>
                <ul className="mt-4 space-y-3 text-foreground">
                  {[
                    "Guaranteed VA Community Care authorization.",
                    "Guaranteed referral to ValorWell.",
                    "Guaranteed Nexus Letters.",
                    "Guaranteed VA disability claim approval.",
                    "Guaranteed service connection.",
                    "Paid documentation on demand.",
                    "Any legal, medical, or VA outcome guarantee.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-7">
              <p className="text-lg font-semibold text-foreground md:text-xl">
                It is not a claim approval service. It is not a Nexus Letter store. It is not a VA shortcut.
              </p>
              <p className="mt-3 text-lg text-foreground md:text-xl">
                It is ValorWell&rsquo;s mission to build a better, ethical care-and-documentation pathway for veterans and families.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 5. PATHWAY EDUCATION ================= */}
        <section id={PATHWAY_ANCHOR} className="border-t border-border bg-[hsl(var(--section-alt))]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>Pathway Education</Eyebrow>
            <SectionHeading>The pathway has to be built the right way.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              ValorWell is working to build and document the provider registration pathway so legitimate access can expand over time. Some parts are controlled by ValorWell. Some parts depend on providers, TPAs, VA Community Care processes, VA Medical Centers, eligibility, authorizations, and other outside systems.
            </p>

            <ol className="mt-10 space-y-4">
              {pathwaySteps.map((s, i) => (
                <li key={s.title} className="flex gap-5 rounded-xl border border-border bg-background p-5 md:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--navy))] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <Guardrail>
                This is education, not a guarantee. ValorWell does not control VA authorization, eligibility, referral decisions, or claim outcomes.
              </Guardrail>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => goToForm("veteran", "ocs_pathway_updates_click")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-base font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
              >
                Get Updates on the Pathway <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= 6. VA COMMUNITY CARE BUILDOUT ================= */}
        <section id="buildout" className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>Build in Public</Eyebrow>
            <SectionHeading>We are building the provider pathway behind the scenes.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              A major part of Operation Claims Success is the VA Community Care setup work required to make legitimate access more repeatable over time. That includes mapping provider states, understanding regional TPA requirements, documenting registration steps, tracking blockers, and turning repeated steps into SOPs.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {buildoutAreas.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                    <Icon className="h-5 w-5 text-[hsl(var(--navy))]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-3xl border-l-2 border-[hsl(var(--navy))] pl-4 text-base text-foreground">
              ValorWell is working to build and document the provider registration pathway so we can expand legitimate VA Community Care access over time.
            </p>
          </div>
        </section>

        {/* ================= 7. ETHICAL DOCUMENTATION ================= */}
        <section id="ethics" className="border-t border-border bg-[hsl(var(--section-alt))]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow tone="red">Ethical Documentation</Eyebrow>
            <SectionHeading>Documentation should come from care, not a transaction.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Veterans should not be pushed into expensive, one-off documentation models that separate the letter from the person. ValorWell&rsquo;s standard is different: documentation support must be connected to real care, clinical judgment, and appropriate clinical context.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ethicalPrinciples.map((p) => (
                <div key={p.title} className="rounded-xl border border-border bg-background p-6">
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Guardrail tone="warn">
                ValorWell does not guarantee Nexus Letters, VA disability ratings, service connection, claim approval, VA Community Care authorization, or any VA outcome. Documentation, when available, depends on clinical appropriateness and proper care context.
              </Guardrail>
            </div>
          </div>
        </section>

        {/* ================= 8. CLINICIAN MISSION ================= */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>Clinicians</Eyebrow>
            <SectionHeading>Clinicians: this is bigger than filling appointment slots.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              ValorWell is looking for mission-aligned clinicians who want to help build ethical, care-first support for veterans and families. Operation Claims Success needs providers who understand that documentation support should be responsible, clinically grounded, and connected to real care.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {clinicianValues.map((v) => (
                <div key={v.title} className="rounded-xl border border-border bg-[hsl(var(--section-alt))] p-5">
                  <h3 className="text-base font-semibold text-[hsl(var(--navy))]">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/clinicians"
                onClick={() => track("ocs_clinician_click")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-base font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
              >
                Join the Clinician Mission <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => goToForm("clinician", "ocs_clinician_talk")}
                className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--navy))] bg-background px-6 py-3 text-base font-semibold text-[hsl(var(--navy))] hover:bg-[hsl(var(--navy))]/5"
              >
                Talk to ValorWell
              </button>
            </div>
          </div>
        </section>

        {/* ================= 9. PARTNERS ================= */}
        <section id="partners" className="border-t border-border bg-[hsl(var(--section-alt))]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>Partner Paths</Eyebrow>
            <SectionHeading>Veteran support takes more than one organization.</SectionHeading>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {partnerPaths.map(({ icon: Icon, title, body, cta, lane, event }) => (
                <div key={title} className="flex flex-col justify-between rounded-2xl border border-border bg-background p-6 md:p-7">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--navy))]/10">
                      <Icon className="h-5 w-5 text-[hsl(var(--navy))]" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{body}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToForm(lane as LaneValue, event)}
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-md border border-[hsl(var(--navy))] px-4 py-2 text-sm font-semibold text-[hsl(var(--navy))] hover:bg-[hsl(var(--navy))]/5"
                  >
                    {cta} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 10. SUPPORTERS ================= */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>Supporters & Sponsors</Eyebrow>
            <SectionHeading>Help build the better path.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Supporters and sponsors can help ValorWell grow the education, infrastructure, clinician network, content, and public trust required to challenge predatory documentation models. Support should fund the ecosystem shift, not buy fake recognition or promised outcomes.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {supporterPaths.map((p) => (
                <div key={p.title} className="flex flex-col justify-between rounded-xl border border-border bg-[hsl(var(--section-alt))] p-5">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                  {"href" in p && p.href ? (
                    <Link
                      to={p.href}
                      onClick={() => track(p.event)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--navy))] hover:underline"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToForm(p.lane as LaneValue, p.event)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--navy))] hover:underline"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 11. BEYOND THE YELLOW ================= */}
        <section className="border-t border-border bg-[hsl(var(--navy))] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-accent))]">
              Beyond The Yellow
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              This is ValorWell going Beyond The Yellow.
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-white/80">
              Beyond The Yellow is ValorWell&rsquo;s movement spotlighting people and organizations taking real action instead of stopping at symbolic support. Operation Claims Success is one of ValorWell&rsquo;s clearest examples: not just saying veterans deserve better, but building a care-first alternative to predatory documentation practices.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { title: "Real Care", body: "Building clinical infrastructure for veterans and families." },
                { title: "Real Standards", body: "Promoting ethical documentation only when clinically appropriate." },
                { title: "Real Action", body: "Challenging performative support by building systems that would be missed if they stopped." },
              ].map((t) => (
                <div key={t.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                  <div className="h-1 w-10 rounded-full bg-[hsl(var(--gold-accent))]" />
                  <h3 className="mt-4 text-xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-white/80">{t.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/watch"
                onClick={() => track("ocs_bty_watch")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3 text-base font-semibold text-[hsl(var(--navy))] hover:brightness-95"
              >
                Watch Beyond The Yellow <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/beyondtheyellow"
                onClick={() => track("ocs_bty_story")}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Share a Beyond The Yellow Story
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 12. WHAT HAPPENS NEXT ================= */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Eyebrow>Next Steps</Eyebrow>
            <SectionHeading>What happens if you reach out?</SectionHeading>

            <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "Pick Your Lane", b: "Veteran or family member, clinician, partner organization, supporter, sponsor, creator, or connector." },
                { t: "We Route the Inquiry", b: "ValorWell reviews the submission and directs it to the right next step." },
                { t: "We Respond Based on Fit", b: "The next step may involve clinician interest, partnership, support, sponsorship, education, or introductions." },
                { t: "We Keep Building", b: "Even when a pathway is not ready for an exact need today, visitors can follow the mission and stay connected." },
              ].map((s, i) => (
                <li key={s.t} className="rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-6">
                  <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
              Not every inquiry will become a clinical relationship, partnership, feature, sponsorship, or documentation pathway. That is how ValorWell protects trust and keeps the mission clean.
            </p>
          </div>
        </section>

        {/* ================= 13. ROUTING FORM ================= */}
        <section id={FORM_ANCHOR} className="border-t border-border bg-[hsl(var(--section-alt))]">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
            <Eyebrow>Follow the Build</Eyebrow>
            <SectionHeading>Follow the build. Choose your lane.</SectionHeading>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              This is a mission-routing form. Not a clinical intake. Not a VA claim form. Not a Nexus Letter request. Tell us who you are and how you want to engage.
            </p>
            <div className="mt-8">
              <RoutingForm initialLane={preselectLane} />
            </div>
          </div>
        </section>

        {/* ================= 14. FAQ ================= */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
            <Eyebrow>FAQ &amp; Guardrails</Eyebrow>
            <SectionHeading>Questions we want to be clear about.</SectionHeading>

            <div className="mt-10">
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} cta={f.cta} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= 15. FINAL CTA STRIP ================= */}
        <section className="border-t border-border bg-[hsl(var(--navy))] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-20">
            <Eyebrow tone="yellow">Care first. Not letter first.</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">Help build the better path.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Operation Claims Success is ValorWell&rsquo;s work to build a care-first alternative for veterans and families. Follow the build, bring the right people into the mission, and help real support become real infrastructure.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goToForm(undefined, "ocs_final_follow_build")}
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-[hsl(var(--navy))] hover:bg-white/90"
              >
                Follow the Build <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/clinicians"
                onClick={() => track("ocs_final_clinician")}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Join the Clinician Mission
              </Link>
              <button
                type="button"
                onClick={() => goToForm("veteran_org", "ocs_final_partner")}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Partner Around Veteran Support
              </button>
              <Link
                to="/watch"
                onClick={() => track("ocs_final_bty")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3 text-base font-semibold text-[hsl(var(--navy))] hover:brightness-95"
              >
                Watch Beyond The Yellow
              </Link>
            </div>
            <p className="mt-10 text-2xl font-bold md:text-3xl">Care first. Not letter first.</p>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      {showSticky && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:bottom-6">
          <button
            type="button"
            onClick={() => goToForm(undefined, "ocs_sticky_follow_build")}
            className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 hover:bg-[hsl(var(--navy-light))]"
          >
            Follow the Build <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
