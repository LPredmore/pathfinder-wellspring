import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
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
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
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
  "30+ hours a week",
  "20-30 hours a week",
  "10-20 hours a week",
  "Whenever I find time",
] as const;

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20),
  licensedStates: z.array(z.string()).min(1, "Select at least one state"),
  licenseType: z.enum(LICENSE_TYPES, { required_error: "Select a license type" }),
  referralSource: z.enum(REFERRAL_SOURCES, { required_error: "Select how you heard about us" }),
  telehealthExperience: z.boolean({ required_error: "Select yes or no" }),
  motivation: z.string().trim().min(10, "Please provide more detail").max(2000),
  weeklyHours: z.enum(WEEKLY_HOURS_OPTIONS, { required_error: "Select your availability" }),
});

type FormData = z.infer<typeof formSchema>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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
      setValue("licensedStates", current.filter((s) => s !== state), { shouldValidate: true });
    } else {
      setValue("licensedStates", [...current, state], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    
    const { error } = await supabase.from("therapist_applications").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      licensed_states: data.licensedStates,
      license_type: data.licenseType,
      referral_source: data.referralSource,
      telehealth_experience: data.telehealthExperience,
      motivation: data.motivation,
      weekly_hours: data.weeklyHours,
    });

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

    // Fire Google Analytics and Google Ads conversion events
    if (window.gtag) {
      window.gtag("event", "form_submit", {
        event_category: "therapist_application",
        event_label: "application_submitted",
      });

      // Fire Google Ads conversion event
      window.gtag("event", "conversion", {
        send_to: "AW-16798905432/6RqRCJ2PnfMbENjoq8o-",
      });
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Application Received!
          </h3>
          <p className="text-muted-foreground">
            Thank you for your interest in joining ValorWell. We'll review your
            application and be in touch soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Join Our Team</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Preferred Email *</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" {...register("phone")} />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Professional Information</h3>
            
            {/* Licensed States */}
            <div className="space-y-2">
              <Label>What state(s) are you licensed in? *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                {US_STATES.map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox
                      id={`state-${state}`}
                      checked={licensedStates?.includes(state)}
                      onCheckedChange={() => toggleState(state)}
                    />
                    <Label
                      htmlFor={`state-${state}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {state}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.licensedStates && (
                <p className="text-sm text-destructive">{errors.licensedStates.message}</p>
              )}
            </div>

            {/* License Type */}
            <div className="space-y-2">
              <Label>License Type *</Label>
              <RadioGroup
                value={licenseType}
                onValueChange={(value) => setValue("licenseType", value as typeof LICENSE_TYPES[number], { shouldValidate: true })}
              >
                {LICENSE_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`license-${type}`} />
                    <Label htmlFor={`license-${type}`} className="font-normal cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.licenseType && (
                <p className="text-sm text-destructive">{errors.licenseType.message}</p>
              )}
            </div>

            {/* Telehealth Experience */}
            <div className="space-y-2">
              <Label>Do you have telehealth experience? *</Label>
              <RadioGroup
                value={telehealthExperience === undefined ? undefined : telehealthExperience ? "yes" : "no"}
                onValueChange={(value) => setValue("telehealthExperience", value === "yes", { shouldValidate: true })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="telehealth-yes" />
                  <Label htmlFor="telehealth-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="telehealth-no" />
                  <Label htmlFor="telehealth-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
              {errors.telehealthExperience && (
                <p className="text-sm text-destructive">{errors.telehealthExperience.message}</p>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Additional Information</h3>

            {/* Referral Source */}
            <div className="space-y-2">
              <Label>How did you hear about ValorWell? *</Label>
              <Select
                value={referralSource}
                onValueChange={(value) => setValue("referralSource", value as typeof REFERRAL_SOURCES[number], { shouldValidate: true })}
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
                <p className="text-sm text-destructive">{errors.referralSource.message}</p>
              )}
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to work with ValorWell? *</Label>
              <Textarea
                id="motivation"
                {...register("motivation")}
                placeholder="Tell us about your interest in working with veterans and military families..."
                className="min-h-[120px]"
              />
              {errors.motivation && (
                <p className="text-sm text-destructive">{errors.motivation.message}</p>
              )}
            </div>

            {/* Weekly Hours */}
            <div className="space-y-2">
              <Label>How many hours per week can you commit? *</Label>
              <Select
                value={weeklyHours}
                onValueChange={(value) => setValue("weeklyHours", value as typeof WEEKLY_HOURS_OPTIONS[number], { shouldValidate: true })}
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
                <p className="text-sm text-destructive">{errors.weeklyHours.message}</p>
              )}
            </div>
          </div>

          {submitError && (
            <p className="text-sm text-destructive text-center">{submitError}</p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
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
