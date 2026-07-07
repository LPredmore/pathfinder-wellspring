import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Check,
  X,
  Loader2,
  Play,
  Users,
  Megaphone,
  Handshake,
  ChevronDown,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { trackHomeEvent } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";
import { DonateButton } from "@/components/DonateButton";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "beyond-the-yellow", ...params });

const FORM_ANCHOR = "bty-story-form";


const scrollToId = (id: string, opts: Record<string, unknown> = {}) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  track("bty_scroll_to", { target: id, ...opts });
};

/* ---------- Primitives ---------- */

function Eyebrow({ children, tone = "yellow" }: { children: ReactNode; tone?: "yellow" | "navy" | "red" }) {
  const cls =
    tone === "red"
      ? "text-accent"
      : tone === "navy"
      ? "text-[hsl(var(--navy))]"
      : "text-[hsl(var(--gold-accent))]";
  return <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${cls}`}>{children}</p>;
}

function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

/* ---------- Lanes ---------- */

const lanes = [
  { value: "share-story", label: "Share My BTY Story", tag: "share-story", event: "bty_share_story_submit" },
  { value: "nominate", label: "Nominate Someone Else to BTY", tag: "nomination", event: "bty_nomination_submit" },
  { value: "promote-valorwell", label: "Join ValorWell's BTY", tag: "promote-valorwell", event: "bty_promote_valorwell_submit" },
] as const;

type LaneValue = (typeof lanes)[number]["value"];

type FormState = {
  lane: LaneValue | "";
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  role_title: string;
  website: string;
  social_link: string;
  subject_name: string;
  responses: Record<string, string>;
  consent: boolean;
};

const emptyForm: FormState = {
  lane: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  organization: "",
  role_title: "",
  website: "",
  social_link: "",
  subject_name: "",
  responses: {},
  consent: false,
};

/* ---------- Story / Nomination Form ---------- */

function StoryForm({ initialLane }: { initialLane?: LaneValue }) {
  const [form, setForm] = useState<FormState>({ ...emptyForm, lane: initialLane ?? "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const startedRef = useRef(false);
  const laneCompleteFiredRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialLane && initialLane !== form.lane) {
      setForm((p) => ({ ...p, lane: initialLane }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLane]);

  useEffect(() => {
    const onLeave = () => {
      if (startedRef.current && status !== "success" && status !== "loading") {
        track("bty_form_abandon", { lane: form.lane || "unselected" });
      }
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [form.lane, status]);

  const markStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("bty_story_start");
    }
  };

  const setLane = (val: LaneValue) => {
    markStart();
    setForm((p) => ({ ...p, lane: val }));
    track("bty_lane_selected", { lane: val });
    if (laneCompleteFiredRef.current !== val) {
      laneCompleteFiredRef.current = val;
      track("bty_form_step_complete", { step: "lane" });
    }
  };

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    markStart();
    setForm((p) => ({ ...p, [k]: v }));
  };

  const setResponse = (k: string, v: string) => {
    markStart();
    setForm((p) => ({ ...p, responses: { ...p.responses, [k]: v } }));
  };

  const laneMeta = lanes.find((l) => l.value === form.lane);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.lane || !form.consent) return;
    setStatus("loading");
    setErrorMsg("");
    const tags = ["bty-lead", laneMeta?.tag ?? "bty-lead"].filter(Boolean);

    try {
      const { error } = await (supabase as any).from("bty_submissions").insert({
        lane: form.lane,
        first_name: form.first_name.trim() || null,
        last_name: form.last_name.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        organization: form.organization.trim() || null,
        role_title: form.role_title.trim() || null,
        website: form.website.trim() || null,
        social_link: form.social_link.trim() || null,
        subject_name: form.subject_name.trim() || null,
        responses: form.responses,
        tags,
        consent: form.consent,
        source_page: "/beyondtheyellow",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
      if (error) throw error;
      track("bty_form_submit", { lane: form.lane });
      if (laneMeta?.event) track(laneMeta.event);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--navy))]">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Thanks for sharing the story.</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          ValorWell will review the submission and follow up if there is a fit. In the meantime, follow ValorWell, watch Beyond
          The Yellow, and keep doing the work people would actually miss if it stopped.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/watch"
            onClick={() => track("bty_follow_click", { location: "form_success" })}
            className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
          >
            Watch Beyond The Yellow <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isShare = form.lane === "share-story";
  const isNominate = form.lane === "nominate";
  const isPromote = form.lane === "promote-valorwell";
  const nominationType = form.responses.nomination_type ?? "";
  const withOrg = form.responses.with_organization === "yes";
  const showNominateIndividual = isNominate && nominationType === "individual";
  const showNominateOrganization = isNominate && nominationType === "organization";
  const showFields = isShare || isPromote || showNominateIndividual || showNominateOrganization;

  const inputCls =
    "mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30";

  const canSubmit = (() => {
    if (!form.consent || !form.lane) return false;
    if (isNominate && !nominationType) return false;
    return true;
  })();

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" noValidate>
      <fieldset>
        <legend className="text-lg font-semibold text-foreground">What brings you here?</legend>
        <p className="mt-1 text-sm text-muted-foreground">Pick the lane that fits best. Fields adjust after you choose.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {lanes.map((l) => {
            const active = form.lane === l.value;
            return (
              <button
                key={l.value}
                type="button"
                onClick={() => setLane(l.value)}
                aria-pressed={active}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  active
                    ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/15 text-foreground"
                    : "border-border bg-background text-foreground hover:border-[hsl(var(--navy))] hover:bg-muted"
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {isNominate && (
        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-foreground">Are you nominating an individual or an organization?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              { value: "individual", label: "Individual" },
              { value: "organization", label: "Organization" },
            ].map((opt) => {
              const active = nominationType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setResponse("nomination_type", opt.value)}
                  aria-pressed={active}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                    active
                      ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/15 text-foreground"
                      : "border-border bg-background text-foreground hover:border-[hsl(var(--navy))] hover:bg-muted"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {showFields && (
        <div className="mt-8 space-y-6">
          {/* --- SHARE MY BTY STORY --- */}
          {isShare && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-foreground">First name</label>
                  <input id="first_name" type="text" required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-foreground">Last name</label>
                  <input id="last_name" type="text" required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone <span className="text-muted-foreground">(optional)</span></label>
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="action" className="block text-sm font-medium text-foreground">What real action are you doing? Who is measurably better off?</label>
                <textarea id="action" required rows={5} value={form.responses.action ?? ""} onChange={(e) => setResponse("action", e.target.value)} className={inputCls} placeholder="Be specific. What happens, who benefits, and what would break if it stopped." />
                <p className="mt-1 text-xs text-muted-foreground">Please do not include medical records, SSNs, VA file numbers, or clinical/claim evidence.</p>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
                <input id="with_org" type="checkbox" checked={withOrg} onChange={(e) => setResponse("with_organization", e.target.checked ? "yes" : "no")} className="mt-1 h-4 w-4 rounded border-input" />
                <label htmlFor="with_org" className="text-sm text-foreground">I am working as part of an organization</label>
              </div>
              {withOrg && (
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-foreground">Name of the organization you're with</label>
                  <input id="organization" type="text" required value={form.organization} onChange={(e) => update("organization", e.target.value)} className={inputCls} />
                </div>
              )}
            </>
          )}

          {/* --- NOMINATE INDIVIDUAL --- */}
          {showNominateIndividual && (
            <>
              <div>
                <label htmlFor="subject_name" className="block text-sm font-medium text-foreground">Who are you nominating?</label>
                <input id="subject_name" type="text" required value={form.subject_name} onChange={(e) => update("subject_name", e.target.value)} className={inputCls} placeholder="Their name" />
              </div>
              <div>
                <label htmlFor="social_link" className="block text-sm font-medium text-foreground">Their best social / video link</label>
                <input id="social_link" type="url" value={form.social_link} onChange={(e) => update("social_link", e.target.value)} placeholder="https://" className={inputCls} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-foreground">Your first name</label>
                  <input id="first_name" type="text" required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-foreground">Your last name</label>
                  <input id="last_name" type="text" required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Your email</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">Your phone <span className="text-muted-foreground">(optional)</span></label>
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="action" className="block text-sm font-medium text-foreground">What real action are they doing? Who is measurably better off?</label>
                <textarea id="action" required rows={5} value={form.responses.action ?? ""} onChange={(e) => setResponse("action", e.target.value)} className={inputCls} placeholder="Be specific. What happens, who benefits, and what would break if it stopped." />
                <p className="mt-1 text-xs text-muted-foreground">Please do not include medical records, SSNs, VA file numbers, or clinical/claim evidence.</p>
              </div>
            </>
          )}

          {/* --- NOMINATE ORGANIZATION --- */}
          {showNominateOrganization && (
            <>
              <div>
                <label htmlFor="subject_name" className="block text-sm font-medium text-foreground">Organization</label>
                <input id="subject_name" type="text" required value={form.subject_name} onChange={(e) => update("subject_name", e.target.value)} className={inputCls} placeholder="Organization name" />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-foreground">Website or social media link</label>
                <input id="website" type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://" className={inputCls} />
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
                <p className="text-sm font-medium text-foreground">Point of contact information</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-foreground">First name</label>
                    <input id="first_name" type="text" required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-foreground">Last name</label>
                    <input id="last_name" type="text" required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="role_title" className="block text-sm font-medium text-foreground">Role / title</label>
                  <input id="role_title" type="text" value={form.role_title} onChange={(e) => update("role_title", e.target.value)} className={inputCls} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                    <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone <span className="text-muted-foreground">(optional)</span></label>
                    <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="action" className="block text-sm font-medium text-foreground">What real action are they doing? Who is measurably better off?</label>
                <textarea id="action" required rows={5} value={form.responses.action ?? ""} onChange={(e) => setResponse("action", e.target.value)} className={inputCls} placeholder="Be specific. What happens, who benefits, and what would break if it stopped." />
                <p className="mt-1 text-xs text-muted-foreground">Please do not include medical records, SSNs, VA file numbers, or clinical/claim evidence.</p>
              </div>
            </>
          )}

          {/* --- PROMOTE VALORWELL --- */}
          {isPromote && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-foreground">First name</label>
                  <input id="first_name" type="text" required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-foreground">Last name</label>
                  <input id="last_name" type="text" required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone <span className="text-muted-foreground">(optional)</span></label>
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-foreground">Organization</label>
                  <input id="organization" type="text" value={form.organization} onChange={(e) => update("organization", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="role_title" className="block text-sm font-medium text-foreground">Role / title</label>
                  <input id="role_title" type="text" value={form.role_title} onChange={(e) => update("role_title", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-foreground">Website</label>
                  <input id="website" type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="social_link" className="block text-sm font-medium text-foreground">Best social / video link</label>
                  <input id="social_link" type="url" value={form.social_link} onChange={(e) => update("social_link", e.target.value)} placeholder="https://" className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="action" className="block text-sm font-medium text-foreground">What real action are you doing? Who is measurably better off?</label>
                <textarea id="action" required rows={5} value={form.responses.action ?? ""} onChange={(e) => setResponse("action", e.target.value)} className={inputCls} placeholder="Be specific. What happens, who benefits, and what would break if it stopped." />
                <p className="mt-1 text-xs text-muted-foreground">Please do not include medical records, SSNs, VA file numbers, or clinical/claim evidence.</p>
              </div>
              <div>
                <label htmlFor="support" className="block text-sm font-medium text-foreground">How do you want to help the movement travel farther?</label>
                <textarea id="support" rows={3} value={form.responses.support ?? ""} onChange={(e) => setResponse("support", e.target.value)} className={inputCls} />
              </div>
            </>
          )}

          <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
            <input
              id="consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-input"
              required
            />
            <label htmlFor="consent" className="text-sm text-foreground">
              I'm okay with ValorWell contacting me using the info I've provided. If I'm nominating someone else, I confirm that person or organization is okay with being contacted this way.
            </label>
          </div>

          {status === "error" && (
            <div className="flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 p-3 text-sm text-accent">
              <X className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{errorMsg || "Submission failed. Please try again."}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading" || !canSubmit}
              className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3 text-sm font-semibold text-[hsl(var(--navy))] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send it to ValorWell <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <span className="text-xs text-muted-foreground">We reply if there's a fit.</span>
          </div>
        </div>
      )}
    </form>
  );
}

/* ---------- FAQ ---------- */

const faqs = [
  {
    q: "Who can be featured on Beyond The Yellow?",
    a: "People, organizations, creators, clinicians, businesses, and communities taking real action instead of stopping at symbolic support. The category does not decide whether you belong. The action does. Veteran-serving and military-family work is prioritized, but real action from any community may belong.",
  },
  {
    q: "How is this different from an awareness campaign?",
    a: "Awareness ends at the symbol. Beyond The Yellow starts where awareness stops — with people doing work someone would actually miss if it stopped tomorrow.",
  },
  {
    q: "Is Beyond The Yellow the same as Operation Claims Success?",
    a: "No. Operation Claims Success is ValorWell's care-first veteran documentation initiative and one of the clearest examples of ValorWell going Beyond The Yellow. BTY is the broader movement spotlighting real action across many categories.",
  },
  {
    q: "Can I pay to be featured?",
    a: "No. Sponsorship helps ValorWell produce and distribute Beyond The Yellow stories, but it cannot buy credibility, a feature, recognition, endorsement, clinical influence, documentation influence, or VA outcomes.",
  },
  {
    q: "Does submitting a story guarantee I'll be featured?",
    a: "No. Submissions are reviewed. ValorWell follows up if there is a fit.",
  },
  {
    q: "Does BTY promise VA outcomes?",
    a: "No. Beyond The Yellow does not guarantee VA Community Care, referrals, Nexus Letters, ratings, service connection, claim approval, documentation, or any VA outcome.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => {
                const next = isOpen ? null : i;
                setOpen(next);
                if (next !== null) track("bty_faq_expand", { index: i });
              }}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-base font-semibold text-foreground md:text-lg">{f.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Page ---------- */

export default function BeyondTheYellowPage() {
  const [initialLane, setInitialLane] = useState<LaneValue | undefined>(undefined);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    track("bty_page_view");
    let observer: IntersectionObserver | null = null;
    const heroEl = document.getElementById("bty-hero");
    if (heroEl && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => setShowSticky(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(heroEl);
    }
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById("bty-real-support-test");
    if (!el || !("IntersectionObserver" in window)) return;
    let fired = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !fired) {
          fired = true;
          track("bty_real_support_test_view");
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goToFormWithLane = (lane: LaneValue, event: string) => {
    setInitialLane(lane);
    track(event);
    setTimeout(() => scrollToId(FORM_ANCHOR), 30);
  };


  return (
    <>
      <Helmet>
        <title>Beyond The Yellow — Support is not a symbol. Support is behavior.</title>
        <meta
          name="description"
          content="Beyond The Yellow is a ValorWell-powered movement and spotlight series featuring people, organizations, creators, clinicians, and communities taking real action instead of stopping at symbolic support."
        />
        <meta property="og:title" content="Beyond The Yellow — Support is behavior." />
        <meta
          property="og:description"
          content="A ValorWell-powered movement spotlighting real action over symbolic support. Share your story or nominate someone doing the work."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/beyondtheyellow" />
      </Helmet>

      <Header />
      <main id="main" className="bg-background">
        {/* 1. HERO */}
        <section
          id="bty-hero"
          className="relative overflow-hidden border-b border-border bg-[hsl(var(--navy))] text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[hsl(var(--gold-accent))]/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[hsl(var(--gold-accent))]/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
            <Eyebrow>A ValorWell-powered movement</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Support is not a symbol.{" "}
              <span className="text-[hsl(var(--gold-accent))]">Support is behavior.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/85 md:text-xl">
              Beyond The Yellow is a ValorWell-powered movement and spotlight series featuring people, organizations,
              creators, clinicians, businesses, and communities taking real action instead of stopping at symbolic
              support.
            </p>
            <p className="mt-10 max-w-2xl border-l-4 border-[hsl(var(--gold-accent))] pl-4 text-base italic text-white/85 md:text-lg">
              Am I someone who only posts the ribbon, or am I someone who goes beyond it?
            </p>
          </div>
        </section>


        {/* 3. THE GAP */}
        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <Eyebrow tone="red">The gap</Eyebrow>
            <SectionHeading>
              The problem is not that people care. The problem is when caring stops at the symbol.
            </SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              There is a real distance between saying you support something and doing something a real person can feel.
              Beyond The Yellow exists to close that distance.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                "Slapping a yellow ribbon magnet on the back of your truck — and never calling the veteran you served with.",
                "Adding the support overlay to your profile picture — then doing nothing to actually impact the community you claim to care about.",
                "Sharing the '22 a day' post — then scrolling past the friend who just said he isn't doing okay.",
                "Wearing the cause t-shirt to the event — and vanishing when someone actually asks for help.",
                "Ranting about the issue on social media — but never lifting a finger for a real person affected by it.",
                "Saying all the right words in public — then ghosting the person who needed you in private.",
                "Reposting the awareness graphic when it trends — and going silent when the moment passes and real work begins.",
                "Telling everyone how much you care — while the person two doors down hasn't had a real conversation in weeks.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-foreground"
                >
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-base">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              This is not a shame wall. It's a mirror. Most of us have been on both sides of it.
            </p>
          </div>
        </section>

        {/* 4. REAL-SUPPORT TEST */}
        <section id="bty-real-support-test" className="relative border-b border-border py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <Eyebrow>The real-support test</Eyebrow>
            <p className="mt-6 text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              If your support stopped tomorrow, would anyone be{" "}
              <span className="text-accent">worse off</span>?{" "}
              <span className="block md:inline">Would they even know?</span>
            </p>
            <div className="mx-auto mt-10 max-w-xl rounded-xl border border-border bg-card p-6 text-left">
              <p className="text-lg font-semibold text-foreground">It does not have to be huge.</p>
              <p className="mt-1 text-lg font-semibold text-[hsl(var(--gold-accent))]">It does have to be real.</p>
            </div>
          </div>
        </section>


        {/* 6. WHO BELONGS HERE */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <Eyebrow>Who belongs here</Eyebrow>
            <SectionHeading>The action decides. Not the label.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Veterans, families, clinicians, nonprofits, small businesses, community leaders, teachers, mentors,
              creators, first responders, faith communities, neighbors — anyone doing work someone would actually miss
              if it stopped.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { icon: Users, title: "People", body: "Individuals showing up for other individuals, week after week." },
                { icon: Handshake, title: "Organizations", body: "Groups building services, access, and infrastructure that help." },
                { icon: Megaphone, title: "Creators", body: "Voices using their platform to move real resources to real people." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
                  <c.icon className="h-6 w-6 text-[hsl(var(--gold-accent))]" />
                  <h3 className="mt-3 text-lg font-bold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. WHAT COUNTS AS REAL ACTION */}
        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <Eyebrow tone="navy">Real action</Eyebrow>
            <SectionHeading>Real action leaves a mark.</SectionHeading>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              This is not a legal qualification checklist. It's the pattern we keep seeing in people going Beyond The
              Yellow.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {[
                "Direct help to someone in front of you",
                "Services delivered, not just announced",
                "Meaningful time and resources on the line",
                "Infrastructure that keeps working after the post",
                "Access created where there was none",
                "Mentoring, hiring, and pulling people up",
                "Connecting people to real care",
                "Funding tools and access, not vanity",
                "Consistent, boring, repeatable volunteering",
                "Useful education, not performance",
                "Solving one specific problem well",
                "Systems that keep helping tomorrow",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-accent))]" />
                  <span className="text-base text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* 10. OCS INTEGRATION */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <Eyebrow tone="navy">A live example</Eyebrow>
            <SectionHeading>Operation Claims Success is ValorWell going Beyond The Yellow.</SectionHeading>
            <div className="mt-6 max-w-3xl space-y-4 text-lg text-muted-foreground">
              <p>
                OCS is real action: building a care-first alternative to predatory veteran documentation models
                through real care, pathway infrastructure, ethical documentation when clinically appropriate, and
                honest education.
              </p>
              <p>
                It's one of the clearest examples of what going Beyond The Yellow looks like when the people running
                the movement are also the ones doing the work. OCS is not the definition of the movement — it's
                proof it can be done.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/operation-claims-success"
                onClick={() => track("bty_ocs_click")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))]"
              >
                Explore Operation Claims Success <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 11. GUEST VALUE */}
        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <Eyebrow>DO YOU GO BEYOND THE YELLOW?</Eyebrow>
            <SectionHeading>ValorWell Wants to Showcase your BTY story</SectionHeading>
            <div className="mt-8 space-y-5 text-lg text-muted-foreground">
              <p>
                If you're out here doing the work — running the mutual aid group, building the community page, hosting the small podcast, showing up for people who need it — you already know how invisible that work can feel. Regardless of what community you are serving, we want to show the world what you are doing with your conviction and consistency.
              </p>
              <p>
                Beyond The Yellow exists because we believe that work matters, and we believe the people doing it deserve to be seen by someone who actually gets it. The veteran and healthcare space is what we know. So that's our BTY space. But we don't want to stop there. Beyond The Yellow is bigger than ValorWell. It's a chance to bring back the importance of personal action to the world.
              </p>
              <p>
                If you're moving past symbols into real action — in any neighborhood, for any cause, with any community — you belong here. We want to hear from the founders, organizers, creators, and connectors who are going Beyond The Yellow wherever they are.
              </p>
            </div>
          </div>
        </section>

        {/* 12. STORY / NOMINATION FORM */}
        <section id={FORM_ANCHOR} className="border-b border-border py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <Eyebrow tone="navy">Keep the movement moving</Eyebrow>
            <SectionHeading>Keep the Movement Moving</SectionHeading>
            <p className="mt-4 text-lg text-muted-foreground">
              Pick the lane that fits and the fields will follow.
            </p>
            <div className="mt-8">
              <StoryForm initialLane={initialLane} />
            </div>
          </div>
        </section>


        {/* 15. FAQ */}
        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <Eyebrow>FAQ</Eyebrow>
            <SectionHeading>Straight answers.</SectionHeading>
            <div className="mt-8">
              <Faq />
            </div>
          </div>
        </section>

        {/* 16. FINAL CTA */}
        <section className="relative overflow-hidden bg-[hsl(var(--navy))] py-24 text-white md:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[hsl(var(--gold-accent))]"
          />
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              If you are doing more than talking, share the story.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  track("bty_final_story");
                  scrollToId(FORM_ANCHOR);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3 text-sm font-semibold text-[hsl(var(--navy))] hover:opacity-90"
              >
                Share Your Beyond The Yellow Story <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => goToFormWithLane("nominate", "bty_final_nominate")}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Nominate Someone Doing Real Work
              </button>
              <Link
                to="/watch"
                onClick={() => track("bty_final_watch")}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Play className="h-4 w-4" /> Watch Beyond The Yellow
              </Link>
              <DonateButton
                source="bty-final"
                size="lg"
                withIcon
                className="bg-[hsl(var(--gold-accent))] text-[hsl(var(--navy))] hover:brightness-95"
              >
                Fuel the Mission
              </DonateButton>
            </div>
            <p className="mt-10 text-xl font-semibold md:text-2xl">
              Support is not a symbol. <span className="text-[hsl(var(--gold-accent))]">Support is behavior.</span>
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {/* Sticky mobile CTA */}
      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
          <button
            onClick={() => {
              track("bty_sticky_story");
              scrollToId(FORM_ANCHOR);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--navy))]"
          >
            Share Your Story <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
