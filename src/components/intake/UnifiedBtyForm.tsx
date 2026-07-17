import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { billingHubSupabase } from "@/integrations/supabase/client";
import { trackHomeEvent } from "@/lib/tracking";

const lanes = [
  { value: "share-story", label: "Share my own BTY story" },
  { value: "nominate", label: "Nominate someone else" },
  { value: "promote-valorwell", label: "Help promote or participate in BTY" },
] as const;

type Lane = (typeof lanes)[number]["value"];

const relationshipOptions = [
  ["supporter", "Supporter"],
  ["sponsor", "Sponsor"],
  ["funder", "Funder"],
  ["creator", "Creator or influencer"],
  ["media_outlet", "Media outlet"],
  ["podcaster", "Podcaster"],
  ["storyteller", "Storyteller"],
  ["connector", "Connector or introduction source"],
  ["veteran_organization", "Veteran-affiliated organization"],
  ["community_organization", "Community organization"],
  ["nonprofit", "Nonprofit"],
] as const;

type FormState = {
  lane: Lane | "";
  nominationType: "individual" | "organization" | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  organizationKind: string;
  roleTitle: string;
  website: string;
  socialLink: string;
  subjectName: string;
  action: string;
  support: string;
  withOrganization: boolean;
  relationshipTypes: string[];
  veteranAffiliated: boolean;
  subjectVeteranAffiliated: boolean;
  consent: boolean;
};

const initialState: FormState = {
  lane: "",
  nominationType: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  organizationKind: "",
  roleTitle: "",
  website: "",
  socialLink: "",
  subjectName: "",
  action: "",
  support: "",
  withOrganization: false,
  relationshipTypes: [],
  veteranAffiliated: false,
  subjectVeteranAffiliated: false,
  consent: false,
};

const inputClass =
  "mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-[hsl(var(--navy))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--navy))]/30";

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = `bty_${label.replace(/\W+/g, "_").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input id={id} type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    </div>
  );
}

export function UnifiedBtyForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleRelationship = (value: string) =>
    update(
      "relationshipTypes",
      form.relationshipTypes.includes(value)
        ? form.relationshipTypes.filter((item) => item !== value)
        : [...form.relationshipTypes, value],
    );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.lane || !form.consent) return;
    if (form.lane === "nominate" && !form.nominationType) return;

    setStatus("loading");
    setErrorMessage("");

    const { error } = await billingHubSupabase.rpc("submit_website_bty_submission", {
      p_payload: {
        submission_key: crypto.randomUUID(),
        lane: form.lane,
        first_name: form.firstName.trim() || null,
        last_name: form.lastName.trim() || null,
        email: form.email.trim().toLowerCase() || null,
        phone: form.phone.trim() || null,
        organization: form.organization.trim() || null,
        organization_kind: form.organizationKind || null,
        role_title: form.roleTitle.trim() || null,
        website: form.website.trim() || null,
        social_link: form.socialLink.trim() || null,
        subject_name: form.subjectName.trim() || null,
        subject_type: form.nominationType || null,
        relationship_types: form.relationshipTypes,
        veteran_affiliated: form.veteranAffiliated,
        subject_veteran_affiliated: form.subjectVeteranAffiliated,
        responses: {
          nomination_type: form.nominationType,
          with_organization: form.withOrganization ? "yes" : "no",
          action: form.action,
          support: form.support,
        },
        tags: ["bty-lead", form.lane],
        consent: form.consent,
        source_page: "/beyondtheyellow",
        user_agent: navigator.userAgent,
      },
    });

    if (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    trackHomeEvent("bty_form_submit", { page: "beyond-the-yellow", lane: form.lane });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--navy))]">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Thanks. We received it.</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          ValorWell will review the submission, its relationship classifications, and the next step that makes sense.
        </p>
      </div>
    );
  }

  const showContactFields =
    form.lane === "share-story" ||
    form.lane === "promote-valorwell" ||
    (form.lane === "nominate" && Boolean(form.nominationType));
  const showRelationshipClassification =
    form.lane === "promote-valorwell" ||
    (form.lane === "share-story" && form.withOrganization);

  return (
    <form onSubmit={submit} className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      <fieldset>
        <legend className="text-lg font-semibold text-foreground">What brings you here?</legend>
        <p className="mt-1 text-sm text-muted-foreground">The three BTY lanes remain consistent. The fields below capture the distinctions that control follow-up.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {lanes.map((lane) => (
            <label
              key={lane.value}
              className={`cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                form.lane === lane.value
                  ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/15"
                  : "border-border bg-background hover:border-[hsl(var(--navy))] hover:bg-muted"
              }`}
            >
              <input
                type="radio"
                name="bty-lane"
                className="sr-only"
                checked={form.lane === lane.value}
                onChange={() => update("lane", lane.value)}
              />
              {lane.label}
            </label>
          ))}
        </div>
      </fieldset>

      {form.lane === "nominate" && (
        <fieldset>
          <legend className="text-sm font-medium text-foreground">Are you nominating an individual or an organization?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(["individual", "organization"] as const).map((value) => (
              <label
                key={value}
                className={`cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium capitalize ${
                  form.nominationType === value
                    ? "border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))]/15"
                    : "border-border bg-background"
                }`}
              >
                <input type="radio" className="sr-only" checked={form.nominationType === value} onChange={() => update("nominationType", value)} />
                {value}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {showContactFields && (
        <>
          {form.lane === "nominate" && (
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-foreground">Who are you nominating?</legend>
              <Field
                label={form.nominationType === "organization" ? "Organization name" : "Individual name"}
                required
                value={form.subjectName}
                onChange={(value) => update("subjectName", value)}
              />
              <Field
                label={form.nominationType === "organization" ? "Website or social link" : "Best social or video link"}
                type="url"
                value={form.nominationType === "organization" ? form.website : form.socialLink}
                onChange={(value) => update(form.nominationType === "organization" ? "website" : "socialLink", value)}
              />
              {form.nominationType === "organization" && (
                <label className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
                  <input
                    type="checkbox"
                    checked={form.subjectVeteranAffiliated}
                    onChange={(event) => update("subjectVeteranAffiliated", event.target.checked)}
                    className="h-4 w-4"
                  />
                  The nominated organization is veteran or military-family affiliated
                </label>
              )}
            </fieldset>
          )}

          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="col-span-full text-lg font-semibold text-foreground">
              {form.lane === "nominate" ? "Your contact information" : "Your contact information"}
            </legend>
            <Field label="First name" required value={form.firstName} onChange={(value) => update("firstName", value)} />
            <Field label="Last name" required value={form.lastName} onChange={(value) => update("lastName", value)} />
            <Field label="Email" type="email" required value={form.email} onChange={(value) => update("email", value)} />
            <Field label="Phone (optional)" type="tel" value={form.phone} onChange={(value) => update("phone", value)} />
          </fieldset>

          {form.lane === "share-story" && (
            <label className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
              <input type="checkbox" checked={form.withOrganization} onChange={(event) => update("withOrganization", event.target.checked)} className="h-4 w-4" />
              I am sharing this story as part of an organization
            </label>
          )}

          {(form.lane === "promote-valorwell" || form.withOrganization) && (
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="col-span-full text-lg font-semibold text-foreground">Organization details</legend>
              <Field label="Organization (optional)" value={form.organization} onChange={(value) => update("organization", value)} />
              <Field label="Role or title (optional)" value={form.roleTitle} onChange={(value) => update("roleTitle", value)} />
              <Field label="Website (optional)" type="url" value={form.website} onChange={(value) => update("website", value)} />
              <Field label="Social or video link (optional)" type="url" value={form.socialLink} onChange={(value) => update("socialLink", value)} />
            </fieldset>
          )}

          <div>
            <label htmlFor="bty_action" className="block text-sm font-medium text-foreground">
              {form.lane === "share-story"
                ? "What real action are you doing, and who is measurably better off?"
                : form.lane === "nominate"
                  ? "What real action are they doing, and who is measurably better off?"
                  : "What real action, audience, or support are you bringing?"}
            </label>
            <textarea id="bty_action" required rows={5} value={form.action} onChange={(event) => update("action", event.target.value)} className={inputClass} />
          </div>

          {showRelationshipClassification && (
            <fieldset className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
              <legend className="px-1 text-sm font-semibold text-foreground">Relationship classification</legend>
              <p className="text-xs text-muted-foreground">Select every description that applies. These become roles on one unified contact or organization record.</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {relationshipOptions.map(([value, label]) => (
                  <label key={value} className="flex items-start gap-2 rounded-md border border-border bg-background p-3 text-sm">
                    <input type="checkbox" checked={form.relationshipTypes.includes(value)} onChange={() => toggleRelationship(value)} className="mt-0.5 h-4 w-4" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground">Primary organization type</label>
                  <select className={inputClass} value={form.organizationKind} onChange={(event) => update("organizationKind", event.target.value)}>
                    <option value="">Select...</option>
                    <option value="veteran_organization">Veteran organization</option>
                    <option value="community_organization">Community organization</option>
                    <option value="nonprofit">Nonprofit</option>
                    <option value="media">Media or podcast</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 rounded-md border border-border bg-background p-3 text-sm">
                  <input type="checkbox" checked={form.veteranAffiliated} onChange={(event) => update("veteranAffiliated", event.target.checked)} className="h-4 w-4" />
                  Veteran or military-family affiliated
                </label>
              </div>
            </fieldset>
          )}

          {form.lane === "promote-valorwell" && (
            <div>
              <label htmlFor="bty_support" className="block text-sm font-medium text-foreground">How do you want to help the movement travel farther?</label>
              <textarea id="bty_support" rows={3} value={form.support} onChange={(event) => update("support", event.target.value)} className={inputClass} />
            </div>
          )}

          <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
            <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required className="mt-1 h-4 w-4" />
            <span>I am okay with ValorWell contacting me using the information provided. A submission does not guarantee selection, participation, or a feature.</span>
          </label>

          {status === "error" && <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{errorMessage}</div>}

          <button
            type="submit"
            disabled={status === "loading" || !form.consent}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-base font-semibold text-white hover:bg-[hsl(var(--navy-light))] disabled:opacity-60 md:w-auto"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Send to Beyond The Yellow
          </button>
        </>
      )}
    </form>
  );
}
