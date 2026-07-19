import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const LICENSE_TYPES = [
  "Psychologist",
  "Professional Counselor",
  "Clinical Social Worker",
  "Mental Health Counselor",
  "Marriage & Family Therapist",
] as const;

const REFERRAL_SOURCES = [
  "Friend",
  "Online Search",
  "LinkedIn",
  "Social Media",
  "Email",
  "Online Job Posting",
] as const;

const WEEKLY_HOURS_OPTIONS = [
  "1-5 sessions per week",
  "6-10 sessions per week",
  "11-20 sessions per week",
  "20+ sessions per week",
] as const;

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20),
  licensedStates: z.array(z.string()).min(1, "Select at least one state"),
  licenseType: z.enum(LICENSE_TYPES, {
    required_error: "Select a license type",
  }),
  referralSource: z.enum(REFERRAL_SOURCES, {
    required_error: "Select how you heard about us",
  }),
  telehealthExperience: z.boolean({ required_error: "Select yes or no" }),
  motivation: z.string().trim().min(10, "Please provide more detail").max(2000),
  weeklyHours: z.enum(WEEKLY_HOURS_OPTIONS, {
    required_error: "Select your availability",
  }),
});

type FormData = z.infer<typeof formSchema>;

// gtag type declared in vite-env.d.ts

export function TherapistApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensedStates: [],
    },
  });

  const licensedStates = watch("licensedStates");
  const licenseType = watch("licenseType");
  const referralSource = watch("referralSource");
  const telehealthExperience = watch("telehealthExperience");
  const weeklyHours = watch("weeklyHours");

  const toggleState = (state: string) => {
    const current = licensedStates || [];
    if (current.includes(state)) {
      setValue(
        "licensedStates",
        current.filter((item) => item !== state),
        { shouldValidate: true },
      );
    } else {
      setValue("licensedStates", [...current, state], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    const { error } = await billingHubSupabase.rpc(
      "submit_website_clinician_application",
      {
        p_payload: {
          submission_key: createWebsiteSubmissionKey(),
          first_name: data.firstName.trim(),
          last_name: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone.trim(),
          licensed_states: data.licensedStates,
          license_type: data.licenseType,
          referral_source: data.referralSource,
          telehealth_experience: data.telehealthExperience,
          motivation: data.motivation.trim(),
          weekly_hours: data.weeklyHours,
          source_page: "/clinicians",
          user_agent:
            typeof navigator === "undefined" ? null : navigator.userAgent,
        },
      },
    );

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

    if (window.gtag) {
      window.gtag("event", "form_submit", {
        event_category: "therapist_application",
        event_label: "application_submitted",
      });

      window.gtag("event", "conversion", {
        send_to: "AW-16798905432/6RqRCJ2PnfMbENjoq8o-",
      });
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-2xl bg-white/95 backdrop-blur-sm">
        <CardContent className="py-12 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h3 className="mb-2 text-2xl font-bold text-foreground">
            Application Received!
          </h3>
          <p className="text-muted-foreground">
            Thank you for your interest in working with ValorWell. We&apos;ll
            review your application and be in touch soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Apply to Join the Clinician Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8 rounded-lg border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-canvas)] p-5">
          <h3 className="text-lg font-bold text-[color:var(--cl-ink)]">
            Choose the participation path that fits
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="border-l-4 border-[color:var(--cl-ember)] bg-white p-4">
              <p className="font-semibold text-[color:var(--cl-evergreen)]">
                Join ValorWell
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--cl-ink)]/75">
                Work as a telehealth-first 1099 clinician. ValorWell handles
                billing workflows and currently pays $75 per completed session,
                weekly.
              </p>
            </div>
            <div className="border-l-4 border-[color:var(--cl-evergreen)] bg-white p-4">
              <p className="font-semibold text-[color:var(--cl-evergreen)]">
                Accept OCS referrals through your practice
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--cl-ink)]/75">
                For independently licensed clinicians who already participate in
                VACCN, maintain their own practice, and handle their own VA
                billing.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--cl-ink)]/70">
            Tell us which path interests you in the application. Outside
            referral providers follow ValorWell documentation standards and
            complete a proper assessment before supporting any DBQ or Nexus
            opinion.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              Personal Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-sm text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-sm text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Preferred Email *</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" {...register("phone")} />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              Professional Information
            </h3>

            <div className="space-y-2">
              <Label>What state(s) are you licensed in? *</Label>
              <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded-md border p-3 sm:grid-cols-3 md:grid-cols-4">
                {US_STATES.map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox
                      id={`state-${state}`}
                      checked={licensedStates?.includes(state)}
                      onCheckedChange={() => toggleState(state)}
                    />
                    <Label
                      htmlFor={`state-${state}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {state}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.licensedStates && (
                <p className="text-sm text-destructive">
                  {errors.licensedStates.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>License Type *</Label>
              <RadioGroup
                value={licenseType}
                onValueChange={(value) =>
                  setValue(
                    "licenseType",
                    value as (typeof LICENSE_TYPES)[number],
                    {
                      shouldValidate: true,
                    },
                  )
                }
              >
                {LICENSE_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`license-${type}`} />
                    <Label
                      htmlFor={`license-${type}`}
                      className="cursor-pointer font-normal"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.licenseType && (
                <p className="text-sm text-destructive">
                  {errors.licenseType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Do you have telehealth experience? *</Label>
              <RadioGroup
                value={
                  telehealthExperience === undefined
                    ? undefined
                    : telehealthExperience
                      ? "yes"
                      : "no"
                }
                onValueChange={(value) =>
                  setValue("telehealthExperience", value === "yes", {
                    shouldValidate: true,
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="telehealth-yes" />
                  <Label
                    htmlFor="telehealth-yes"
                    className="cursor-pointer font-normal"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="telehealth-no" />
                  <Label
                    htmlFor="telehealth-no"
                    className="cursor-pointer font-normal"
                  >
                    No
                  </Label>
                </div>
              </RadioGroup>
              {errors.telehealthExperience && (
                <p className="text-sm text-destructive">
                  {errors.telehealthExperience.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              Additional Information
            </h3>

            <div className="space-y-2">
              <Label>How did you hear about ValorWell? *</Label>
              <Select
                value={referralSource}
                onValueChange={(value) =>
                  setValue(
                    "referralSource",
                    value as (typeof REFERRAL_SOURCES)[number],
                    { shouldValidate: true },
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {REFERRAL_SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.referralSource && (
                <p className="text-sm text-destructive">
                  {errors.referralSource.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">
                What are you looking for, and which clinician path interests
                you? *
              </Label>
              <Textarea
                id="motivation"
                {...register("motivation")}
                placeholder="Tell us whether you want to join ValorWell, accept OCS referrals through your own VACCN-connected practice, or explore either path. Include your current VACCN status, the populations you serve, and what you want from the opportunity."
                className="min-h-[140px]"
              />
              {errors.motivation && (
                <p className="text-sm text-destructive">
                  {errors.motivation.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                How many sessions per week would you like to make available? *
              </Label>
              <Select
                value={weeklyHours}
                onValueChange={(value) =>
                  setValue(
                    "weeklyHours",
                    value as (typeof WEEKLY_HOURS_OPTIONS)[number],
                    { shouldValidate: true },
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  {WEEKLY_HOURS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.weeklyHours && (
                <p className="text-sm text-destructive">
                  {errors.weeklyHours.message}
                </p>
              )}
            </div>
          </div>

          {submitError && (
            <p className="text-center text-sm text-destructive">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
