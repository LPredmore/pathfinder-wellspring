import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Plus, Trash2 } from "lucide-react";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";
import {
  trackCreatorApplicationConversion,
  trackHomeEvent,
} from "@/lib/tracking";

export const CREATOR_INTEREST_ROLE_OPTIONS = [
  ["creator", "Creator or influencer"],
  ["bty_promoter", "Be a BTY Guest"],
  ["funder", "Fundraising or funding interest"],
  ["general_mission_interest", "Community, collaboration, or other mission interest"],
] as const;

export const COMFORT_OPTIONS = [
  ["public_story", "Comfortable sharing publicly"],
  ["private_conversation", "Prefer a private conversation"],
  ["behind_the_scenes", "Prefer helping behind the scenes"],
  ["flexible", "Flexible based on the opportunity"],
  ["not_sure", "Not sure yet"],
] as const;

const PLATFORM_OPTIONS = [
  "Bluesky",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Patreon",
  "Reddit",
  "TikTok",
  "Twitch",
  "X",
  "YouTube",
  "Podcast",
  "Website",
  "Other",
] as const;

const STATE_OPTIONS = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "DC", "PR", "GU", "VI", "AS", "MP", "AE", "AA", "AP",
] as const;

type RoleCode = (typeof CREATOR_INTEREST_ROLE_OPTIONS)[number][0];
type ComfortCode = (typeof COMFORT_OPTIONS)[number][0];

export type SocialDraft = {
  id: string;
  platform: string;
  handle: string;
  profileUrl: string;
  followerCount: string;
};

export type CreatorInterestFormState = {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  phone: string;
  state: string;
  veteranAffiliation: "unknown" | "veteran" | "family_member" | "military_connected" | "none";
  veteranConnection: string;
  motivation: string;
  participationPreferences: string;
  willingToShare: "yes" | "no" | "not_sure" | "";
  comfortLevel: ComfortCode | "";
  personalMission: string;
  fundraisingGoal: string;
  additionalInformation: string;
  roleCodes: RoleCode[];
  socials: SocialDraft[];
  consent: boolean;
};

const newSocial = (): SocialDraft => ({
  id: createWebsiteSubmissionKey(),
  platform: "",
  handle: "",
  profileUrl: "",
  followerCount: "",
});

const initialState = (): CreatorInterestFormState => ({
  firstName: "",
  lastName: "",
  preferredName: "",
  email: "",
  phone: "",
  state: "",
  veteranAffiliation: "unknown",
  veteranConnection: "",
  motivation: "",
  participationPreferences: "",
  willingToShare: "",
  comfortLevel: "",
  personalMission: "",
  fundraisingGoal: "",
  additionalInformation: "",
  roleCodes: [],
  socials: [],
  consent: false,
});

const trimOrUndefined = (value: string) => value.trim() || undefined;
const PUBLIC_EMAIL_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const PUBLIC_PAYLOAD_CLIENT_LIMIT_BYTES = 30_000;

export function validateCreatorInterestForm(form: CreatorInterestFormState) {
  const errors: Record<string, string> = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!PUBLIC_EMAIL_PATTERN.test(form.email.trim().toLowerCase())) errors.email = "Enter a valid email address.";
  if (!form.state) errors.state = "State is required.";
  if (form.motivation.trim().length < 10) errors.motivation = "Please tell us a little more about your interest.";
  if (form.participationPreferences.trim().length < 10) errors.participationPreferences = "Please describe how you would like to participate.";
  if (form.roleCodes.length === 0) errors.roleCodes = "Select at least one interest.";
  if (!form.willingToShare) errors.willingToShare = "Choose a story-sharing preference.";
  if (!form.comfortLevel) errors.comfortLevel = "Choose a participation comfort level.";
  if (!form.consent) errors.consent = "Consent is required before we can contact you.";
  if (form.socials.length > 10) errors.socials = "Add no more than 10 social profiles.";

  form.socials.forEach((social, index) => {
    const prefix = `socials.${index}`;
    if (!social.platform) errors[`${prefix}.platform`] = "Choose a platform.";
    if (!social.handle.trim() && !social.profileUrl.trim()) {
      errors[`${prefix}.account`] = "Enter a handle or profile URL.";
    }
    if (social.profileUrl.trim()) {
      try {
        const url = new URL(social.profileUrl.trim());
        if (url.protocol !== "https:") throw new Error("invalid protocol");
      } catch {
        errors[`${prefix}.profileUrl`] = "Enter a valid HTTPS URL.";
      }
    }
    if (social.followerCount.trim()) {
      const followers = Number(social.followerCount);
      if (!Number.isInteger(followers) || followers < 0 || followers > 2_147_483_647) {
        errors[`${prefix}.followerCount`] = "Follower count must be a whole number from 0 to 2,147,483,647.";
      }
    }
  });

  return errors;
}

export function buildCreatorInterestPayload(
  form: CreatorInterestFormState,
  submissionKey: string = createWebsiteSubmissionKey(),
) {
  const willingToShare =
    form.willingToShare === "yes" ? true : form.willingToShare === "no" ? false : null;

  return {
    submission_key: submissionKey,
    first_name: form.firstName.trim(),
    last_name: form.lastName.trim(),
    ...(trimOrUndefined(form.preferredName) && { preferred_name: form.preferredName.trim() }),
    email: form.email.trim().toLowerCase(),
    ...(trimOrUndefined(form.phone) && { phone: form.phone.trim() }),
    state: form.state,
    veteran_affiliation: form.veteranAffiliation,
    ...(trimOrUndefined(form.veteranConnection) && { veteran_connection: form.veteranConnection.trim() }),
    motivation: form.motivation.trim(),
    participation: form.participationPreferences.trim(),
    relationship_types: [...form.roleCodes],
    willing_to_share: willingToShare,
    comfort_level: form.comfortLevel,
    ...(trimOrUndefined(form.personalMission) && { personal_mission: form.personalMission.trim() }),
    ...(trimOrUndefined(form.fundraisingGoal) && { fundraising_goal: form.fundraisingGoal.trim() }),
    ...(trimOrUndefined(form.additionalInformation) && { additional_info: form.additionalInformation.trim() }),
    consent: form.consent,
    social_profiles: form.socials.map((social) => ({
      platform: social.platform,
      ...(trimOrUndefined(social.handle) && { handle: social.handle.trim() }),
      ...(trimOrUndefined(social.profileUrl) && { profile_url: social.profileUrl.trim() }),
      ...(social.followerCount.trim() && { follower_count: Number(social.followerCount) }),
    })),
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
  min?: number;
  max?: number;
};

function Field({ id, label, value, onChange, error, type = "text", required = false, maxLength = 255, min, max }: FieldProps) {
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
        min={min}
        max={max}
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

function TextAreaField({ id, label, value, onChange, error, required = false, maxLength = 3000 }: Omit<FieldProps, "type">) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label} {required && <span aria-hidden className="text-destructive">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        rows={4}
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

export function UnifiedBtyForm({ initialLane }: { initialLane?: InitialLane }) {
  const seededState = useMemo(() => {
    const state = initialState();
    if (initialLane === "share-story") state.roleCodes = ["bty_promoter"];
    return state;
  }, [initialLane]);
  const [form, setForm] = useState<CreatorInterestFormState>(seededState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionKey] = useState(() => createWebsiteSubmissionKey());

  useEffect(() => {
    const preset: RoleCode[] = initialLane === "share-story" ? ["bty_promoter"] : [];
    if (preset.length === 0) return;
    setForm((current) => ({
      ...current,
      roleCodes: Array.from(new Set([...current.roleCodes, ...preset])),
    }));
  }, [initialLane]);

  const update = <K extends keyof CreatorInterestFormState>(key: K, value: CreatorInterestFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const toggleRole = (role: RoleCode) =>
    update(
      "roleCodes",
      form.roleCodes.includes(role)
        ? form.roleCodes.filter((value) => value !== role)
        : [...form.roleCodes, role],
    );

  const updateSocial = (id: string, key: keyof Omit<SocialDraft, "id">, value: string) =>
    update("socials", form.socials.map((social) => social.id === id ? { ...social, [key]: value } : social));

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
      setErrors({ payload: "The form is too large to submit." });
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("loading");
    const { error } = await billingHubSupabase.rpc("submit_website_creator_interest", {
      p_payload: payload,
    });

    if (error) {
      setStatus("error");
      return;
    }

    trackHomeEvent("creator_interest_submit", { page: "beyond-the-yellow" });
    trackCreatorApplicationConversion();
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--navy))]">
          <Check className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Thanks. We received your interest.</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          A ValorWell team member will review it and follow up when there is a useful next step.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8">
      <div>
        <h3 className="text-2xl font-bold text-foreground">Beyond The Yellow guest interest</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This form does not create an account. Share only what ValorWell needs to understand how you would like to participate.
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
          We could not submit the form right now. Please try again later.
        </div>
      )}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="col-span-full text-lg font-semibold text-foreground">Contact information</legend>
        <Field id="interest-first-name" label="First name" required value={form.firstName} error={errors.firstName} onChange={(value) => update("firstName", value)} maxLength={100} />
        <Field id="interest-last-name" label="Last name" required value={form.lastName} error={errors.lastName} onChange={(value) => update("lastName", value)} maxLength={100} />
        <Field id="interest-preferred-name" label="Preferred name" value={form.preferredName} onChange={(value) => update("preferredName", value)} maxLength={100} />
        <Field id="interest-email" label="Email" type="email" required value={form.email} error={errors.email} onChange={(value) => update("email", value)} maxLength={254} />
        <Field id="interest-phone" label="Phone (optional)" type="tel" value={form.phone} onChange={(value) => update("phone", value)} maxLength={40} />
        <div>
          <label htmlFor="interest-state" className="block text-sm font-medium text-foreground">State <span aria-hidden className="text-destructive">*</span></label>
          <select id="interest-state" required value={form.state} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? "interest-state-error" : undefined} onChange={(event) => update("state", event.target.value)} className={inputClass}>
            <option value="">Select state or territory</option>
            {STATE_OPTIONS.map((state) => <option key={state} value={state}>{state}</option>)}
          </select>
          {errors.state && <p id="interest-state-error" className={errorClass}>{errors.state}</p>}
        </div>
      </fieldset>

      <fieldset className="space-y-4" aria-describedby={errors.roleCodes ? "interest-roles-error" : undefined}>
        <legend className="text-lg font-semibold text-foreground">How would you like to participate?</legend>
        <p className="text-sm text-muted-foreground">Select every option that applies. These choices help route follow-up; they do not create a partnership or account.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CREATOR_INTEREST_ROLE_OPTIONS.map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-background p-3 text-sm">
              <input type="checkbox" checked={form.roleCodes.includes(value)} onChange={() => toggleRole(value)} className="mt-0.5 h-4 w-4" />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.roleCodes && <p id="interest-roles-error" className={errorClass}>{errors.roleCodes}</p>}
      </fieldset>

      <div className="grid gap-5">
        <div>
          <label htmlFor="interest-veteran-affiliation" className="block text-sm font-medium text-foreground">Veteran or military-family affiliation</label>
          <select id="interest-veteran-affiliation" value={form.veteranAffiliation} onChange={(event) => update("veteranAffiliation", event.target.value as CreatorInterestFormState["veteranAffiliation"])} className={inputClass}>
            <option value="unknown">Prefer not to say or not sure</option>
            <option value="veteran">Veteran</option>
            <option value="family_member">Military or veteran family member</option>
            <option value="military_connected">Active duty, Guard, Reserve, caregiver, or otherwise military-connected</option>
            <option value="none">No direct affiliation</option>
          </select>
        </div>
        <TextAreaField id="interest-veteran-connection" label="Veteran or military-family connection (optional)" value={form.veteranConnection} onChange={(value) => update("veteranConnection", value)} maxLength={1000} />
        <TextAreaField id="interest-motivation" label="Why are you interested in ValorWell or Beyond The Yellow?" required value={form.motivation} error={errors.motivation} onChange={(value) => update("motivation", value)} maxLength={4000} />
        <TextAreaField id="interest-participation" label="How would you like to participate or help?" required value={form.participationPreferences} error={errors.participationPreferences} onChange={(value) => update("participationPreferences", value)} maxLength={4000} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="interest-willing-to-share" className="block text-sm font-medium text-foreground">Are you willing to share your story? <span aria-hidden className="text-destructive">*</span></label>
          <select id="interest-willing-to-share" required value={form.willingToShare} aria-invalid={Boolean(errors.willingToShare)} aria-describedby={errors.willingToShare ? "interest-willing-to-share-error" : undefined} onChange={(event) => update("willingToShare", event.target.value as CreatorInterestFormState["willingToShare"])} className={inputClass}>
            <option value="">Select one</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not_sure">Not sure yet</option>
          </select>
          {errors.willingToShare && <p id="interest-willing-to-share-error" className={errorClass}>{errors.willingToShare}</p>}
        </div>
        <div>
          <label htmlFor="interest-comfort" className="block text-sm font-medium text-foreground">Participation comfort level <span aria-hidden className="text-destructive">*</span></label>
          <select id="interest-comfort" required value={form.comfortLevel} aria-invalid={Boolean(errors.comfortLevel)} aria-describedby={errors.comfortLevel ? "interest-comfort-error" : undefined} onChange={(event) => update("comfortLevel", event.target.value as CreatorInterestFormState["comfortLevel"])} className={inputClass}>
            <option value="">Select one</option>
            {COMFORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          {errors.comfortLevel && <p id="interest-comfort-error" className={errorClass}>{errors.comfortLevel}</p>}
        </div>
      </div>

      <div className="grid gap-5">
        <TextAreaField id="interest-mission" label="Personal mission (optional)" value={form.personalMission} onChange={(value) => update("personalMission", value)} maxLength={4000} />
        <TextAreaField id="interest-fundraising" label="Fundraising interest or goal (optional)" value={form.fundraisingGoal} onChange={(value) => update("fundraisingGoal", value)} maxLength={1000} />
        <TextAreaField id="interest-additional" label="Anything else we should know? (optional)" value={form.additionalInformation} onChange={(value) => update("additionalInformation", value)} maxLength={8000} />
        <p className="text-sm text-muted-foreground">Please do not include medical records, Social Security numbers, VA claim evidence, or other sensitive documents.</p>
      </div>

      <fieldset className="space-y-4 rounded-lg border border-border bg-muted/20 p-4 sm:p-5" aria-describedby={errors.socials ? "interest-socials-error" : undefined}>
        <legend className="px-1 text-lg font-semibold text-foreground">Social profiles (optional)</legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Add up to 10 useful profiles. Follower count is optional.</p>
          </div>
          <button type="button" disabled={form.socials.length >= 10} onClick={() => update("socials", [...form.socials, newSocial()])} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60">
            <Plus className="h-4 w-4" aria-hidden /> Add social profile
          </button>
        </div>
        {errors.socials && <p id="interest-socials-error" className={errorClass}>{errors.socials}</p>}
        {form.socials.map((social, index) => (
          <div key={social.id} className="rounded-md border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">Social profile {index + 1}</p>
              <button type="button" aria-label={`Remove social profile ${index + 1}`} onClick={() => update("socials", form.socials.filter((item) => item.id !== social.id))} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`social-platform-${social.id}`} className="block text-sm font-medium text-foreground">Platform <span aria-hidden className="text-destructive">*</span></label>
                <select id={`social-platform-${social.id}`} value={social.platform} aria-invalid={Boolean(errors[`socials.${index}.platform`])} aria-describedby={errors[`socials.${index}.platform`] ? `social-platform-${social.id}-error` : undefined} onChange={(event) => updateSocial(social.id, "platform", event.target.value)} className={inputClass}>
                  <option value="">Select platform</option>
                  {PLATFORM_OPTIONS.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
                </select>
                {errors[`socials.${index}.platform`] && <p id={`social-platform-${social.id}-error`} className={errorClass}>{errors[`socials.${index}.platform`]}</p>}
              </div>
              <Field id={`social-handle-${social.id}`} label="Handle or username" value={social.handle} onChange={(value) => updateSocial(social.id, "handle", value)} maxLength={200} />
              <Field id={`social-url-${social.id}`} label="Profile URL" type="url" value={social.profileUrl} error={errors[`socials.${index}.profileUrl`] ?? errors[`socials.${index}.account`]} onChange={(value) => updateSocial(social.id, "profileUrl", value)} maxLength={500} />
              <Field id={`social-followers-${social.id}`} label="Follower count" type="number" value={social.followerCount} error={errors[`socials.${index}.followerCount`]} onChange={(value) => updateSocial(social.id, "followerCount", value)} min={0} max={2147483647} />
            </div>
          </div>
        ))}
      </fieldset>

      <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-foreground">
        <input type="checkbox" required checked={form.consent} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "interest-consent-error" : undefined} onChange={(event) => update("consent", event.target.checked)} className="mt-0.5 h-4 w-4" />
        <span>I consent to ValorWell contacting me about this interest submission. <span aria-hidden className="text-destructive">*</span></span>
      </label>
      {errors.consent && <p id="interest-consent-error" className={errorClass}>{errors.consent}</p>}

      <button type="submit" disabled={status === "loading"} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--navy-light))] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</> : <>Send my interest <ArrowRight className="h-4 w-4" aria-hidden /></>}
      </button>
    </form>
  );
}
