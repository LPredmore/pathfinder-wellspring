import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";
import {
  trackCreatorApplicationConversion,
  trackHomeEvent,
} from "@/lib/tracking";

type VeteranConnection =
  | "veteran"
  | "family_member"
  | "military_connected"
  | "serves_veterans"
  | "none"
  | "prefer_not_to_say";

export type CreatorInterestFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  veteranConnection: VeteranConnection | "";
  conversationSummary: string;
  workLink: string;
  acknowledgment: boolean;
};

const initialState = (): CreatorInterestFormState => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  veteranConnection: "",
  conversationSummary: "",
  workLink: "",
  acknowledgment: false,
});

const PUBLIC_EMAIL_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const PUBLIC_PAYLOAD_CLIENT_LIMIT_BYTES = 14_000;

function optionalHttpsUrl(value: string): boolean {
  if (!value.trim()) return true;
  try {
    return new URL(value.trim()).protocol === "https:";
  } catch {
    return false;
  }
}

export function validateCreatorInterestForm(form: CreatorInterestFormState) {
  const errors: Record<string, string> = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!PUBLIC_EMAIL_PATTERN.test(form.email.trim().toLowerCase())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.veteranConnection) {
    errors.veteranConnection = "Choose the option that best describes your connection.";
  }
  if (form.conversationSummary.trim().length < 10) {
    errors.conversationSummary = "Tell us a little more about the conversation you would bring.";
  }
  if (!optionalHttpsUrl(form.workLink)) {
    errors.workLink = "Enter a valid HTTPS link.";
  }
  if (!form.acknowledgment) {
    errors.acknowledgment = "Please confirm before submitting.";
  }
  return errors;
}

export function buildCreatorInterestPayload(
  form: CreatorInterestFormState,
  submissionKey: string = createWebsiteSubmissionKey(),
) {
  return {
    submission_key: submissionKey,
    first_name: form.firstName.trim(),
    last_name: form.lastName.trim(),
    email: form.email.trim().toLowerCase(),
    ...(form.phone.trim() && { phone: form.phone.trim() }),
    veteran_connection: form.veteranConnection,
    conversation_summary: form.conversationSummary.trim(),
    ...(form.workLink.trim() && { work_link: form.workLink.trim() }),
    recording_ready: form.acknowledgment,
    consent: form.acknowledgment,
    source_page: "/beyondtheyellow",
    user_agent: typeof navigator === "undefined" ? null : navigator.userAgent.slice(0, 500),
  };
}

const inputClass =
  "mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30";
const errorClass = "mt-1 text-sm text-destructive";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  maxLength = 255,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label} {required && <span aria-hidden className="text-destructive">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      {error && <p id={`${id}-error`} className={errorClass}>{error}</p>}
    </div>
  );
}

type InitialLane = "share-story";

export function UnifiedBtyForm({ initialLane: _initialLane }: { initialLane?: InitialLane }) {
  void _initialLane;
  const [form, setForm] = useState<CreatorInterestFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionKey] = useState(() => createWebsiteSubmissionKey());

  const update = <K extends keyof CreatorInterestFormState>(
    key: K,
    value: CreatorInterestFormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateCreatorInterestForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    const payload = buildCreatorInterestPayload(form, submissionKey);
    if (new TextEncoder().encode(JSON.stringify(payload)).byteLength > PUBLIC_PAYLOAD_CLIENT_LIMIT_BYTES) {
      setErrors({ payload: "The application is too large to submit." });
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("loading");
    const { error } = await billingHubSupabase.rpc("submit_website_bty_guest_application", {
      p_payload: payload,
    });

    if (error) {
      setStatus("error");
      return;
    }

    trackHomeEvent("bty_guest_application_submit", { page: "beyond-the-yellow" });
    trackCreatorApplicationConversion();
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--navy))]">
          <Check className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Thanks. We received your guest application.</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          ValorWell will review it and contact you if the conversation appears to fit Beyond The Yellow.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-7 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8">
      <div>
        <h3 className="text-2xl font-bold text-foreground">Apply to Be a Guest on Beyond The Yellow</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This short application should take about two minutes. Tell us who you are, what you are doing, and what you would want to discuss. You do not need a large following or a polished media pitch.
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <p>Please review the highlighted fields and try again.</p>
          {errors.payload && <p className="mt-1 font-medium">{errors.payload}</p>}
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          We could not submit the application right now. Please try again later.
        </div>
      )}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="col-span-full text-lg font-semibold text-foreground">Contact information</legend>
        <Field id="guest-first-name" label="First name" required value={form.firstName} error={errors.firstName} onChange={(value) => update("firstName", value)} maxLength={100} />
        <Field id="guest-last-name" label="Last name" required value={form.lastName} error={errors.lastName} onChange={(value) => update("lastName", value)} maxLength={100} />
        <Field id="guest-email" label="Email address" type="email" required value={form.email} error={errors.email} onChange={(value) => update("email", value)} maxLength={254} />
        <Field id="guest-phone" label="Phone number (optional)" type="tel" value={form.phone} onChange={(value) => update("phone", value)} maxLength={40} />
      </fieldset>

      <div>
        <label htmlFor="guest-veteran-connection" className="block text-sm font-medium text-foreground">
          What is your connection to the veteran or military-family community? <span aria-hidden className="text-destructive">*</span>
        </label>
        <select
          id="guest-veteran-connection"
          required
          value={form.veteranConnection}
          aria-invalid={Boolean(errors.veteranConnection)}
          aria-describedby={errors.veteranConnection ? "guest-veteran-connection-error" : undefined}
          onChange={(event) => update("veteranConnection", event.target.value as CreatorInterestFormState["veteranConnection"])}
          className={inputClass}
        >
          <option value="">Select one</option>
          <option value="veteran">I am a veteran</option>
          <option value="family_member">I am a military or veteran family member</option>
          <option value="military_connected">I am active duty, Guard, Reserve, a caregiver, or otherwise military-connected</option>
          <option value="serves_veterans">My work serves or affects veterans or military families</option>
          <option value="none">I do not have a direct military connection</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select>
        {errors.veteranConnection && <p id="guest-veteran-connection-error" className={errorClass}>{errors.veteranConnection}</p>}
      </div>

      <div>
        <label htmlFor="guest-conversation-summary" className="block text-sm font-medium text-foreground">
          What are you doing, who does it help, and what would you want to discuss? <span aria-hidden className="text-destructive">*</span>
        </label>
        <textarea
          id="guest-conversation-summary"
          required
          rows={5}
          minLength={10}
          maxLength={3000}
          value={form.conversationSummary}
          aria-invalid={Boolean(errors.conversationSummary)}
          aria-describedby="guest-conversation-summary-help"
          onChange={(event) => update("conversationSummary", event.target.value)}
          className={inputClass}
        />
        <p id="guest-conversation-summary-help" className="mt-1 text-xs text-muted-foreground">
          A few sentences are enough. Tell us about the work, project, organization, experience, or idea behind the conversation.
        </p>
        {errors.conversationSummary && <p className={errorClass}>{errors.conversationSummary}</p>}
      </div>

      <div>
        <Field
          id="guest-work-link"
          label="Link to your work, organization, website, or social profile (optional)"
          type="url"
          value={form.workLink}
          error={errors.workLink}
          onChange={(value) => update("workLink", value)}
          maxLength={500}
        />
        <p className="mt-1 text-xs text-muted-foreground">One useful HTTPS link is enough. Follower count is not required.</p>
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-foreground">
        <input
          type="checkbox"
          required
          checked={form.acknowledgment}
          aria-invalid={Boolean(errors.acknowledgment)}
          aria-describedby={errors.acknowledgment ? "guest-acknowledgment-error" : undefined}
          onChange={(event) => update("acknowledgment", event.target.checked)}
          className="mt-0.5 h-4 w-4"
        />
        <span>
          I am comfortable being contacted about a prerecorded remote video conversation. I understand that applying does not guarantee an invitation, recording, publication, endorsement, partnership, clinical service, or VA-related outcome. <span aria-hidden className="text-destructive">*</span>
        </span>
      </label>
      {errors.acknowledgment && <p id="guest-acknowledgment-error" className={errorClass}>{errors.acknowledgment}</p>}

      <p className="text-xs text-muted-foreground">
        Please do not include medical records, Social Security numbers, VA claim evidence, or other sensitive information.
      </p>

      <button type="submit" disabled={status === "loading"} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</> : <>Apply to be a guest <ArrowRight className="h-4 w-4" aria-hidden /></>}
      </button>
    </form>
  );
}
