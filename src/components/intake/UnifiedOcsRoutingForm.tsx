import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { billingHubSupabase } from "@/integrations/supabase/client";
import { trackHomeEvent } from "@/lib/tracking";

const lanes = [
  { value: "veteran", label: "Veteran seeking help with a mental-health claim or appeal" },
  { value: "provider_recruiting", label: "ValorWell or VACCN-connected clinician interested in accepting veterans" },
  { value: "partnership_support", label: "Organization, supporter, creator, sponsor, or connector" },
  { value: "general", label: "I want to help, but I am not sure where I fit" },
] as const;

type Lane = (typeof lanes)[number]["value"];

type FormState = {
  lane: Lane | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  organizationKind: string;
  roleTitle: string;
  website: string;
  socialLink: string;
  relationshipTypes: string[];
  veteranAffiliated: boolean;
  relationshipToVeteran: string;
  state: string;
  claimStage: string;
  currentCare: string;
  licenseType: string;
  licensedStates: string;
  telehealthExperience: string;
  providerPath: string;
  vaccnStatus: string;
  details: string;
  consent: boolean;
};

const initialState: FormState = {
  lane: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  organizationKind: "",
  roleTitle: "",
  website: "",
  socialLink: "",
  relationshipTypes: [],
  veteranAffiliated: false,
  relationshipToVeteran: "",
  state: "",
  claimStage: "",
  currentCare: "",
  licenseType: "",
  licensedStates: "",
  telehealthExperience: "",
  providerPath: "",
  vaccnStatus: "",
  details: "",
  consent: false,
};

const relationshipOptions = [
  ["veteran_organization", "Veteran-affiliated organization"],
  ["community_organization", "Community organization"],
  ["employer", "Employer"],
  ["church", "Church or faith community"],
  ["nonprofit", "Nonprofit"],
  ["supporter", "Supporter"],
  ["sponsor", "Sponsor"],
  ["funder", "Funder"],
  ["creator", "Creator or influencer"],
  ["media_outlet", "Media outlet"],
  ["podcaster", "Podcaster"],
  ["storyteller", "Storyteller"],
  ["connector", "Connector or introduction source"],
] as const;

const inputClass =
  "mt-1 w-full rounded-md border border-[#3B5147]/25 bg-white px-3 py-2 text-sm text-[#111814] focus:border-[#3B5147] focus:outline-none focus:ring-2 focus:ring-[#3B5147]/30";

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
  const id = `ocs_${label.replace(/\W+/g, "_").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#111814]">
        {label} {required && <span className="text-[#B24A3A]">*</span>}
      </label>
      <input id={id} type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const id = `ocs_${label.replace(/\W+/g, "_").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#111814]">
        {label} {required && <span className="text-[#B24A3A]">*</span>}
      </label>
      <select id={id} required={required} className={inputClass} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select...</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}

export function UnifiedOcsRoutingForm() {
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

    setStatus("loading");
    setErrorMessage("");

    const licensedStates = form.licensedStates.split(",").map((value) => value.trim()).filter(Boolean);
    const veteranAffiliation =
      form.relationshipToVeteran === "Veteran"
        ? "veteran"
        : ["Family member", "Caregiver"].includes(form.relationshipToVeteran)
          ? "family_member"
          : form.relationshipToVeteran === "Active duty"
            ? "military_connected"
            : undefined;

    const { error } = await billingHubSupabase.rpc("submit_website_ocs_inquiry", {
      p_payload: {
        submission_key: crypto.randomUUID(),
        lane: form.lane,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        organization: form.organization.trim() || null,
        organization_kind: form.organizationKind || null,
        role_title: form.roleTitle.trim() || null,
        website: form.website.trim() || null,
        social_link: form.socialLink.trim() || null,
        relationship_types: form.relationshipTypes,
        veteran_affiliated: form.veteranAffiliated,
        veteran_affiliation: veteranAffiliation,
        state: form.state.trim() || null,
        license_type: form.licenseType.trim() || null,
        licensed_states: licensedStates,
        referral_source: "Operation Claims Success",
        telehealth_experience: ["Extensive", "Some"].includes(form.telehealthExperience),
        motivation: form.details.trim() || null,
        responses: {
          relationship: form.relationshipToVeteran,
          claim_stage: form.claimStage,
          current_mental_health_care: form.currentCare,
          telehealth_experience: form.telehealthExperience,
          provider_path: form.providerPath,
          vaccn_status: form.vaccnStatus,
          details: form.details,
        },
        consent: form.consent,
        source_page: "/operation-claims-success",
        user_agent: navigator.userAgent,
      },
    });

    if (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    trackHomeEvent("ocs_form_submit", { page: "operation-claims-success", lane: form.lane });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#3B5147]/20 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3B5147] text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-[#111814]">Your information has been received.</h3>
        <p className="mx-auto mt-3 max-w-xl text-[#111814]/70">
          ValorWell will review your state, situation, and selected path and reach out within 48 hours with the appropriate next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8 rounded-2xl border border-[#3B5147]/20 bg-white p-6 shadow-sm md:p-8">
      <fieldset>
        <legend className="text-lg font-semibold text-[#111814]">1. Choose the closest path</legend>
        <p className="mt-1 text-sm text-[#111814]/70">
          This is a routing form, not a clinical intake. Do not include medical records, VA claim files, diagnoses, Social Security numbers, or detailed trauma information.
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {lanes.map((lane) => (
            <label key={lane.value} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${form.lane === lane.value ? "border-[#3B5147] bg-[#3B5147]/5" : "border-[#3B5147]/20 bg-white hover:border-[#3B5147]/50"}`}>
              <input type="radio" name="ocs-lane" value={lane.value} checked={form.lane === lane.value} onChange={() => update("lane", lane.value)} className="mt-1 accent-[#3B5147]" />
              <span>{lane.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {form.lane && (
        <>
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="col-span-full text-lg font-semibold text-[#111814]">2. Contact details</legend>
            <Field label="First name" required value={form.firstName} onChange={(value) => update("firstName", value)} />
            <Field label="Last name" required value={form.lastName} onChange={(value) => update("lastName", value)} />
            <Field label="Email" type="email" required value={form.email} onChange={(value) => update("email", value)} />
            <Field label="Phone (optional)" type="tel" value={form.phone} onChange={(value) => update("phone", value)} />
          </fieldset>

          {form.lane === "veteran" && (
            <fieldset className="grid gap-4 md:grid-cols-2">
              <legend className="col-span-full text-lg font-semibold text-[#111814]">3. Help us check your current path</legend>
              <SelectField label="Relationship to the veteran" required value={form.relationshipToVeteran} options={["Veteran", "Active duty", "Family member", "Caregiver", "Other"]} onChange={(value) => update("relationshipToVeteran", value)} />
              <Field label="Veteran's state" required value={form.state} onChange={(value) => update("state", value)} />
              <SelectField label="Current claim or appeal stage" value={form.claimStage} options={["Considering a new claim", "Preparing an original claim", "Requesting an increased rating", "Exploring a secondary condition", "Responding to a denial", "Appeal in progress", "Not sure"]} onChange={(value) => update("claimStage", value)} />
              <SelectField label="Current mental-health care" value={form.currentCare} options={["No current care", "Receiving care through the VA", "Receiving care outside the VA", "Previously received care", "Not sure"]} onChange={(value) => update("currentCare", value)} />
            </fieldset>
          )}

          {form.lane === "provider_recruiting" && (
            <fieldset className="grid gap-4 md:grid-cols-2">
              <legend className="col-span-full text-lg font-semibold text-[#111814]">3. Clinical and VACCN background</legend>
              <Field label="License type" required value={form.licenseType} onChange={(value) => update("licenseType", value)} />
              <Field label="Licensed states (comma separated)" required value={form.licensedStates} onChange={(value) => update("licensedStates", value)} />
              <SelectField label="How would you like to participate?" value={form.providerPath} options={["Join ValorWell", "Accept referrals as an outside VACCN provider", "Open to either path"]} onChange={(value) => update("providerPath", value)} />
              <SelectField label="Current VACCN status" value={form.vaccnStatus} options={["Already connected to VACCN", "Registration in progress", "Not currently connected", "Not sure"]} onChange={(value) => update("vaccnStatus", value)} />
              <SelectField label="Telehealth experience" value={form.telehealthExperience} options={["Extensive", "Some", "Limited", "None yet"]} onChange={(value) => update("telehealthExperience", value)} />
            </fieldset>
          )}

          {form.lane === "partnership_support" && (
            <fieldset className="space-y-5 rounded-lg border border-[#3B5147]/20 bg-[#F4F1E8]/50 p-4">
              <legend className="px-1 text-lg font-semibold text-[#111814]">3. Relationship classification</legend>
              <p className="text-sm text-[#111814]/70">Select every description that applies.</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {relationshipOptions.map(([value, label]) => (
                  <label key={value} className="flex items-start gap-2 rounded-md border border-[#3B5147]/15 bg-white p-3 text-sm">
                    <input type="checkbox" checked={form.relationshipTypes.includes(value)} onChange={() => toggleRelationship(value)} className="mt-0.5 h-4 w-4 accent-[#3B5147]" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Organization (optional)" value={form.organization} onChange={(value) => update("organization", value)} />
                <Field label="Role / title (optional)" value={form.roleTitle} onChange={(value) => update("roleTitle", value)} />
                <Field label="Website (optional)" value={form.website} onChange={(value) => update("website", value)} />
                <Field label="Social link (optional)" value={form.socialLink} onChange={(value) => update("socialLink", value)} />
                <SelectField label="Primary organization type" value={form.organizationKind} options={["Veteran organization", "Community organization", "Employer", "Church or faith community", "Nonprofit", "Media or podcast", "Other"]} onChange={(value) => update("organizationKind", value)} />
                <label className="flex items-center gap-3 rounded-md border border-[#3B5147]/15 bg-white p-3 text-sm">
                  <input type="checkbox" checked={form.veteranAffiliated} onChange={(event) => update("veteranAffiliated", event.target.checked)} className="h-4 w-4 accent-[#3B5147]" />
                  Veteran or military-family affiliated
                </label>
              </div>
            </fieldset>
          )}

          <div>
            <label htmlFor="ocs_details" className="block text-sm font-medium text-[#111814]">
              {form.lane === "veteran"
                ? "Briefly tell us what you need help understanding"
                : form.lane === "provider_recruiting"
                  ? "Tell us about your practice and interest in serving veterans"
                  : form.lane === "partnership_support"
                    ? "What are you hoping to build, support, share, fund, or introduce?"
                    : "Anything else ValorWell should know?"}
            </label>
            <textarea id="ocs_details" rows={4} value={form.details} onChange={(event) => update("details", event.target.value)} className={inputClass} />
          </div>

          <label className="flex items-start gap-3 text-sm text-[#111814]">
            <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required className="mt-1 h-4 w-4 accent-[#3B5147]" />
            <span>I understand this submission does not guarantee immediate clinical care, VA authorization, documentation, partnership, or any VA outcome.</span>
          </label>

          {status === "error" && <div role="alert" className="rounded-md border border-[#B24A3A]/40 bg-[#B24A3A]/5 p-3 text-sm text-[#B24A3A]">{errorMessage}</div>}

          <button type="submit" disabled={status === "loading" || !form.consent} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#3B5147] px-6 py-3 text-base font-semibold text-white hover:bg-[#2f4239] disabled:opacity-60 md:w-auto">
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Send to ValorWell
          </button>
        </>
      )}
    </form>
  );
}
