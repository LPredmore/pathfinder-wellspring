import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";
import { trackHomeEvent } from "@/lib/tracking";

type NominationType = "individual" | "organization";
type VeteranConnection = "yes" | "no" | "unknown";

type NominationState = {
  nominationType: NominationType;
  organizationName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleTitle: string;
  subjectLink: string;
  veteranConnection: VeteranConnection | "";
  reason: string;
  consent: boolean;
};

const initialState = (): NominationState => ({
  nominationType: "individual",
  organizationName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  roleTitle: "",
  subjectLink: "",
  veteranConnection: "",
  reason: "",
  consent: false,
});

const inputClass =
  "mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30";
const PUBLIC_EMAIL_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const NOMINATION_PAYLOAD_CLIENT_LIMIT_BYTES = 14_000;

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
    setError("");
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.nominationType === "organization" && !form.organizationName.trim()) {
      setError("Enter the organization name.");
      return;
    }
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError(
        form.nominationType === "organization"
          ? "Enter the contact person's first and last name."
          : "Enter the nominated person's first and last name.",
      );
      return;
    }
    if (!PUBLIC_EMAIL_PATTERN.test(form.email.trim().toLowerCase()) || form.email.trim().length > 254) {
      setError("Enter a valid email address.");
      return;
    }
    if (!form.veteranConnection) {
      setError("Choose whether the nominee is connected to veterans or military families.");
      return;
    }
    if (form.reason.trim().length < 10) {
      setError("Tell us a little more about why they should be considered.");
      return;
    }
    if (!optionalHttpsUrl(form.subjectLink)) {
      setError("Use a valid HTTPS website or social link.");
      return;
    }
    if (!form.consent) {
      setError("Please confirm the acknowledgment before submitting.");
      return;
    }

    const payload = {
      submission_key: submissionKey,
      nomination_type: form.nominationType,
      ...(form.nominationType === "organization" && {
        organization_name: form.organizationName.trim(),
      }),
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      ...(form.phone.trim() && { phone: form.phone.trim() }),
      ...(form.nominationType === "organization" && form.roleTitle.trim() && {
        role_title: form.roleTitle.trim(),
      }),
      ...(form.subjectLink.trim() && { subject_link: form.subjectLink.trim() }),
      veteran_connection: form.veteranConnection,
      reason: form.reason.trim(),
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
      "submit_website_bty_contact_nomination",
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
          ValorWell will review the person or organization and contact them if the conversation appears to fit Beyond The Yellow.
        </p>
      </div>
    );
  }

  const isOrganization = form.nominationType === "organization";

  return (
    <form className="space-y-7 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" onSubmit={submit} noValidate>
      <div>
        <h3 className="text-2xl font-bold text-foreground">Nominate a Beyond The Yellow Guest</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Know a person or organization doing meaningful work? Share enough information for us to understand what they do and contact them about a possible conversation.
        </p>
      </div>

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

      {isOrganization && (
        <div>
          <label htmlFor="nominee-organization-name" className="block text-sm font-medium text-foreground">
            Organization name <span aria-hidden className="text-destructive">*</span>
          </label>
          <input
            id="nominee-organization-name"
            className={inputClass}
            required
            maxLength={200}
            value={form.organizationName}
            onChange={(event) => update("organizationName", event.target.value)}
          />
        </div>
      )}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="col-span-full text-lg font-semibold text-foreground">
          {isOrganization ? "Contact person for the organization" : "Nominated person's contact information"}
        </legend>
        <div>
          <label htmlFor="nominee-first" className="block text-sm font-medium text-foreground">
            {isOrganization ? "Contact person's first name" : "Their first name"} <span aria-hidden className="text-destructive">*</span>
          </label>
          <input id="nominee-first" className={inputClass} required maxLength={100} value={form.firstName} onChange={(event) => update("firstName", event.target.value)} />
        </div>
        <div>
          <label htmlFor="nominee-last" className="block text-sm font-medium text-foreground">
            {isOrganization ? "Contact person's last name" : "Their last name"} <span aria-hidden className="text-destructive">*</span>
          </label>
          <input id="nominee-last" className={inputClass} required maxLength={100} value={form.lastName} onChange={(event) => update("lastName", event.target.value)} />
        </div>
        <div>
          <label htmlFor="nominee-email" className="block text-sm font-medium text-foreground">
            {isOrganization ? "Contact person's email address" : "Their email address"} <span aria-hidden className="text-destructive">*</span>
          </label>
          <input id="nominee-email" type="email" className={inputClass} required maxLength={254} value={form.email} onChange={(event) => update("email", event.target.value)} />
        </div>
        <div>
          <label htmlFor="nominee-phone" className="block text-sm font-medium text-foreground">
            {isOrganization ? "Contact person's phone number" : "Their phone number"} <span className="text-muted-foreground">(optional)</span>
          </label>
          <input id="nominee-phone" type="tel" className={inputClass} maxLength={50} value={form.phone} onChange={(event) => update("phone", event.target.value)} />
        </div>
        {isOrganization && (
          <div className="sm:col-span-2">
            <label htmlFor="nominee-role" className="block text-sm font-medium text-foreground">
              Contact person's role or title <span className="text-muted-foreground">(optional)</span>
            </label>
            <input id="nominee-role" className={inputClass} maxLength={150} value={form.roleTitle} onChange={(event) => update("roleTitle", event.target.value)} />
          </div>
        )}
      </fieldset>

      <div>
        <label htmlFor="nominee-link" className="block text-sm font-medium text-foreground">
          {isOrganization ? "Organization website or social profile" : "Website, social profile, or link showing their work"} <span className="text-muted-foreground">(optional, HTTPS)</span>
        </label>
        <input id="nominee-link" type="url" className={inputClass} maxLength={500} placeholder="https://" value={form.subjectLink} onChange={(event) => update("subjectLink", event.target.value)} />
      </div>

      <div>
        <label htmlFor="nominee-veteran-connection" className="block text-sm font-medium text-foreground">
          {isOrganization
            ? "Is the organization connected to veterans or military families?"
            : "Is this person connected to veterans or military families?"} <span aria-hidden className="text-destructive">*</span>
        </label>
        <select
          id="nominee-veteran-connection"
          required
          value={form.veteranConnection}
          onChange={(event) => update("veteranConnection", event.target.value as NominationState["veteranConnection"])}
          className={inputClass}
        >
          <option value="">Select one</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unknown">Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="nomination-reason" className="block text-sm font-medium text-foreground">
          Why should {isOrganization ? "this organization" : "this person"} be considered for Beyond The Yellow? <span aria-hidden className="text-destructive">*</span>
        </label>
        <textarea id="nomination-reason" className={inputClass} required rows={5} minLength={10} maxLength={3000} value={form.reason} onChange={(event) => update("reason", event.target.value)} />
        <p className="mt-1 text-xs text-muted-foreground">
          Tell us what they are doing, who it helps, and why they could contribute to a useful conversation. Do not include medical records, Social Security numbers, VA file numbers, or clinical or claim evidence.
        </p>
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-foreground">
        <input
          className="mt-0.5 h-4 w-4"
          type="checkbox"
          required
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          aria-invalid={Boolean(error && !form.consent)}
          aria-describedby={`nomination-consent-help${error && !form.consent ? " nomination-error" : ""}`}
        />
        <span id="nomination-consent-help">
          I am providing this information in good faith so ValorWell may contact the nominated person or organization about Beyond The Yellow. I understand that submitting a nomination does not guarantee an invitation, recording, endorsement, partnership, clinical service, or VA-related outcome.
        </span>
      </label>

      {error && <p id="nomination-error" className="text-sm font-medium text-destructive" role="alert">{error}</p>}
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "loading"}>
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : "Submit nomination"}
      </button>
    </form>
  );
}
