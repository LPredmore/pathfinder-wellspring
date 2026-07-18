import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";
import { trackHomeEvent } from "@/lib/tracking";

type NominationType = "individual" | "organization";

type NominationState = {
  nominationType: NominationType;
  subjectName: string;
  subjectLink: string;
  subjectVeteranAffiliated: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleTitle: string;
  action: string;
  consent: boolean;
};

const initialState = (): NominationState => ({
  nominationType: "individual",
  subjectName: "",
  subjectLink: "",
  subjectVeteranAffiliated: false,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  roleTitle: "",
  action: "",
  consent: false,
});

const inputClass =
  "mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30";
const PUBLIC_EMAIL_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const NOMINATION_PAYLOAD_CLIENT_LIMIT_BYTES = 12_000;

function optionalHttpsUrl(value: string): boolean {
  if (!value.trim()) return true;
  try {
    return new URL(value.trim()).protocol === "https:";
  } catch {
    return false;
  }
}

export function BtyNominationForm() {
  const [form, setForm] = useState(initialState);
  const [submissionKey, setSubmissionKey] = useState(createWebsiteSubmissionKey);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = <K extends keyof NominationState>(key: K, value: NominationState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim() || !form.subjectName.trim()) {
      setError("Complete the required name fields.");
      return;
    }
    if (!PUBLIC_EMAIL_PATTERN.test(form.email.trim().toLowerCase()) || form.email.trim().length > 254) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.action.trim().length < 10) {
      setError("Tell us a little more about the real work you are nominating.");
      return;
    }
    if (!optionalHttpsUrl(form.subjectLink)) {
      setError("Use a valid HTTPS website or social link.");
      return;
    }
    if (!form.consent) {
      setError("Consent is required before we can contact you.");
      return;
    }

    const subjectLink = form.subjectLink.trim() || undefined;
    const payload = {
      submission_key: submissionKey,
      nomination_type: form.nominationType,
      subject_name: form.subjectName.trim(),
      subject_link: subjectLink,
      subject_veteran_affiliated: form.subjectVeteranAffiliated,
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || undefined,
      role_title: form.roleTitle.trim() || undefined,
      action: form.action.trim(),
      consent: true,
      source_page: "/beyondtheyellow",
      user_agent: navigator.userAgent.slice(0, 500),
    };
    if (new TextEncoder().encode(JSON.stringify(payload)).byteLength > NOMINATION_PAYLOAD_CLIENT_LIMIT_BYTES) {
      setError("The nomination is too large to submit.");
      return;
    }

    setStatus("loading");
    const { error: submissionError } = await billingHubSupabase.rpc(
      "submit_website_bty_nomination",
      { p_payload: payload },
    );

    if (submissionError) {
      setStatus("error");
      setError("We could not send the nomination. Please try again in a moment.");
      return;
    }

    trackHomeEvent("bty_nomination_submit", {
      page: "beyond-the-yellow",
      nomination_type: form.nominationType,
    });
    setStatus("success");
    setSubmissionKey(createWebsiteSubmissionKey());
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm" role="status">
        <Check className="mx-auto h-10 w-10 text-[hsl(var(--gold-accent))]" />
        <h3 className="mt-4 text-2xl font-bold text-foreground">Thank you for the nomination.</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          ValorWell will review it and follow up if there is a fit.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-7 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" onSubmit={submit} noValidate>
      <fieldset>
        <legend className="text-lg font-semibold text-foreground">Who are you nominating?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(["individual", "organization"] as const).map((value) => (
            <label
              className={`cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium capitalize ${
                form.nominationType === value
                  ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/15"
                  : "border-border bg-background"
              }`}
              key={value}
            >
              <input
                type="radio"
                name="nomination-type"
                className="sr-only"
                checked={form.nominationType === value}
                onChange={() => update("nominationType", value)}
              />
              {value}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-foreground">Nominee details</legend>
        <div>
          <label htmlFor="nominee-name" className="block text-sm font-medium text-foreground">
            {form.nominationType === "organization" ? "Organization name" : "Individual name"}
          </label>
          <input id="nominee-name" className={inputClass} required maxLength={200} value={form.subjectName} onChange={(event) => update("subjectName", event.target.value)} />
        </div>
        <div>
          <label htmlFor="nominee-link" className="block text-sm font-medium text-foreground">
            Website, social, or video link <span className="text-muted-foreground">(optional, HTTPS)</span>
          </label>
          <input id="nominee-link" type="url" className={inputClass} maxLength={500} placeholder="https://" value={form.subjectLink} onChange={(event) => update("subjectLink", event.target.value)} />
        </div>
        <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-foreground">
          <input className="mt-0.5 h-4 w-4" type="checkbox" checked={form.subjectVeteranAffiliated} onChange={(event) => update("subjectVeteranAffiliated", event.target.checked)} />
          The nominee is veteran or military-family affiliated
        </label>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="col-span-full text-lg font-semibold text-foreground">Your contact information</legend>
        <div><label htmlFor="nominator-first" className="block text-sm font-medium text-foreground">First name</label><input id="nominator-first" className={inputClass} required maxLength={100} value={form.firstName} onChange={(event) => update("firstName", event.target.value)} /></div>
        <div><label htmlFor="nominator-last" className="block text-sm font-medium text-foreground">Last name</label><input id="nominator-last" className={inputClass} required maxLength={100} value={form.lastName} onChange={(event) => update("lastName", event.target.value)} /></div>
        <div><label htmlFor="nominator-email" className="block text-sm font-medium text-foreground">Email</label><input id="nominator-email" type="email" className={inputClass} required maxLength={254} value={form.email} onChange={(event) => update("email", event.target.value)} /></div>
        <div><label htmlFor="nominator-phone" className="block text-sm font-medium text-foreground">Phone <span className="text-muted-foreground">(optional)</span></label><input id="nominator-phone" type="tel" className={inputClass} maxLength={50} value={form.phone} onChange={(event) => update("phone", event.target.value)} /></div>
        {form.nominationType === "organization" && <div className="sm:col-span-2"><label htmlFor="nominator-role" className="block text-sm font-medium text-foreground">Your role or title <span className="text-muted-foreground">(optional)</span></label><input id="nominator-role" className={inputClass} maxLength={150} value={form.roleTitle} onChange={(event) => update("roleTitle", event.target.value)} /></div>}
      </fieldset>

      <div>
        <label htmlFor="nomination-action" className="block text-sm font-medium text-foreground">What real action are they doing, and who is measurably better off?</label>
        <textarea id="nomination-action" className={inputClass} required rows={5} minLength={10} maxLength={4000} value={form.action} onChange={(event) => update("action", event.target.value)} />
        <p className="mt-1 text-xs text-muted-foreground">Do not include medical records, Social Security numbers, VA file numbers, or clinical or claim evidence.</p>
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-foreground">
        <input className="mt-0.5 h-4 w-4" type="checkbox" required checked={form.consent} onChange={(event) => update("consent", event.target.checked)} aria-invalid={Boolean(error && !form.consent)} aria-describedby={`nomination-consent-help${error && !form.consent ? " nomination-error" : ""}`} />
        <span id="nomination-consent-help">I consent to ValorWell contacting me, and I confirm the nominated person or organization is okay being contacted this way. Submitting does not guarantee a feature, endorsement, clinical service, or VA outcome.</span>
      </label>

      {error && <p id="nomination-error" className="text-sm font-medium text-destructive" role="alert">{error}</p>}
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "loading"}>
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : "Submit nomination"}
      </button>
    </form>
  );
}
