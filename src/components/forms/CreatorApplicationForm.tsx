import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2, Plus, Trash2 } from "lucide-react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
] as const;

const PLATFORMS = [
  "TikTok",
  "Instagram",
  "YouTube",
  "LinkedIn",
  "Facebook",
  "X (Twitter)",
  "Podcast",
  "Other",
] as const;

const VETERAN_CONNECTION_OPTIONS = [
  "I'm a veteran",
  "Military spouse/family",
  "I work with veterans professionally",
  "I support veterans but no direct connection",
  "Prefer not to say",
] as const;

const COMFORT_LEVELS = [
  "Very comfortable",
  "Somewhat comfortable",
  "Not very comfortable, but I'm willing to learn",
] as const;

const FUNDRAISING_GOALS = [
  "5 sessions ($375)",
  "10 sessions ($750)",
  "25 sessions ($1,875)",
  "50 sessions ($3,750)",
  "100 sessions ($7,500+)",
  "Not sure yet",
] as const;

const socialProfileSchema = z.object({
  platform: z.string().min(1, "Select a platform"),
  handle: z.string().trim().min(1, "Handle or URL is required").max(500),
  followers: z.coerce.number().min(0, "Must be 0 or more"),
});

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  state: z.string().min(1, "Select your state"),
  socialProfiles: z.array(socialProfileSchema).min(1, "Add at least one social profile"),
  motivation: z.string().trim().min(1, "This field is required").max(5000),
  veteranConnection: z.string().optional(),
  comfortLevel: z.string().min(1, "Select your comfort level"),
  fundraisingGoal: z.string().min(1, "Select a fundraising goal"),
  additionalInfo: z.string().trim().max(5000).optional(),
  acceptedRules: z.literal(true, { errorMap: () => ({ message: "You must accept the official rules to continue" }) }),
});

type FormData = z.infer<typeof formSchema>;

const STEP_TITLES = [
  "Basic Information",
  "Social Profiles",
  "Fit & Motivation",
  "Fundraising Readiness",
  "Official Rules / Prize Terms",
];

const STEP_FIELDS: (keyof FormData | string)[][] = [
  ["firstName", "lastName", "email", "state"],
  ["socialProfiles"],
  ["motivation"],
  ["comfortLevel", "fundraisingGoal"],
  ["acceptedRules"],
];

interface CreatorApplicationFormProps {
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonClassName?: string;
}

export function CreatorApplicationForm({
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName,
}: CreatorApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [rowId, setRowId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialProfiles: [{ platform: "", handle: "", followers: 0 }],
      acceptedRules: false as any,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialProfiles",
  });

  const state = watch("state");
  const comfortLevel = watch("comfortLevel");
  const fundraisingGoal = watch("fundraisingGoal");
  const veteranConnection = watch("veteranConnection");

  const saveStepData = async (step: number) => {
    const data = getValues();

    if (step === 0 && !rowId) {
      // Insert new partial row
      const { data: inserted, error } = await supabase
        .from("creator_applications" as any)
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          state: data.state,
          status: "partial",
        } as any)
        .select("id")
        .single();

      if (error || !inserted) {
        setSubmitError("Could not save progress. Please try again.");
        return false;
      }
      setRowId((inserted as any).id);
      return true;
    }

    if (!rowId) return true;

    let updatePayload: Record<string, any> = {};

    if (step === 0) {
      updatePayload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        state: data.state,
      };
    } else if (step === 1) {
      updatePayload = {
        social_profiles: data.socialProfiles.map((sp) => ({
          platform: sp.platform,
          handle: sp.handle,
          followers: sp.followers,
        })),
      };
    } else if (step === 2) {
      updatePayload = {
        motivation: data.motivation,
        veteran_connection: data.veteranConnection || null,
      };
    } else if (step === 3) {
      updatePayload = {
        comfort_level: data.comfortLevel,
        fundraising_goal: data.fundraisingGoal,
        additional_info: data.additionalInfo || null,
      };
    }

    const { error } = await supabase
      .from("creator_applications" as any)
      .update(updatePayload as any)
      .eq("id", rowId);

    if (error) {
      setSubmitError("Could not save progress. Please try again.");
      return false;
    }
    setSubmitError(null);
    return true;
  };

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep] as any;
    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;

    const saved = await saveStepData(currentStep);
    if (saved) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    const finalPayload: Record<string, any> = {
      comfort_level: data.comfortLevel,
      fundraising_goal: data.fundraisingGoal,
      additional_info: data.additionalInfo || null,
      accepted_rules: true,
      status: "new",
    };

    if (rowId) {
      const { error } = await supabase
        .from("creator_applications" as any)
        .update(finalPayload as any)
        .eq("id", rowId);

      if (error) {
        setSubmitError("Something went wrong. Please try again.");
        return;
      }
    } else {
      // Fallback: full insert if somehow no rowId
      const socialProfilesJson = data.socialProfiles.map((sp) => ({
        platform: sp.platform,
        handle: sp.handle,
        followers: sp.followers,
      }));

      const { error } = await supabase.from("creator_applications" as any).insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        state: data.state,
        social_profiles: socialProfilesJson,
        motivation: data.motivation,
        veteran_connection: data.veteranConnection || null,
        comfort_level: data.comfortLevel,
        fundraising_goal: data.fundraisingGoal,
        additional_info: data.additionalInfo || null,
      } as any);

      if (error) {
        setSubmitError("Something went wrong. Please try again.");
        return;
      }
    }

    setIsSubmitted(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitError(null);
        setCurrentStep(0);
        setRowId(null);
        reset();
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={buttonClassName}>
          Apply to Compete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="py-12 text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Application Received!</h3>
            <p className="text-muted-foreground">
              Thank you for applying to the Creator Challenge. We'll review your application and be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">{STEP_TITLES[currentStep]}</DialogTitle>
            </DialogHeader>

            {/* Progress */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground text-center">Step {currentStep + 1} of 5</p>
              <Progress value={((currentStep + 1) / 5) * 100} className="h-2" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1 — Basic Info */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ca-firstName">First Name *</Label>
                      <Input id="ca-firstName" {...register("firstName")} />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ca-lastName">Last Name *</Label>
                      <Input id="ca-lastName" {...register("lastName")} />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ca-email">Email *</Label>
                      <Input id="ca-email" type="email" {...register("email")} />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>State *</Label>
                      <Select value={state} onValueChange={(v) => setValue("state", v, { shouldValidate: true })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Social Profiles */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="rounded-md border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Platform {index + 1}</span>
                        {fields.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label>Platform *</Label>
                          <Select
                            value={watch(`socialProfiles.${index}.platform`)}
                            onValueChange={(v) => setValue(`socialProfiles.${index}.platform`, v, { shouldValidate: true })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {PLATFORMS.map((p) => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.socialProfiles?.[index]?.platform && (
                            <p className="text-xs text-destructive">{errors.socialProfiles[index]?.platform?.message}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <Label>Handle / URL *</Label>
                          <Input {...register(`socialProfiles.${index}.handle`)} placeholder="@handle or URL" />
                          {errors.socialProfiles?.[index]?.handle && (
                            <p className="text-xs text-destructive">{errors.socialProfiles[index]?.handle?.message}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <Label>Followers *</Label>
                          <Input type="number" {...register(`socialProfiles.${index}.followers`)} placeholder="0" />
                          {errors.socialProfiles?.[index]?.followers && (
                            <p className="text-xs text-destructive">{errors.socialProfiles[index]?.followers?.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ platform: "", handle: "", followers: 0 })}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add a social platform
                  </Button>
                  {errors.socialProfiles?.root && (
                    <p className="text-sm text-destructive">{errors.socialProfiles.root.message}</p>
                  )}
                </div>
              )}

              {/* Step 3 — Fit & Motivation */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ca-motivation">Why do you want to be involved? *</Label>
                    <Textarea
                      id="ca-motivation"
                      {...register("motivation")}
                      placeholder="What about veterans' mental health or this mission matters to you?"
                      className="min-h-[100px]"
                    />
                    {errors.motivation && <p className="text-sm text-destructive">{errors.motivation.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Do you have a personal connection to veterans or military communities?</Label>
                    <RadioGroup
                      value={veteranConnection}
                      onValueChange={(v) => setValue("veteranConnection", v)}
                    >
                      {VETERAN_CONNECTION_OPTIONS.map((opt) => (
                        <div key={opt} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt} id={`vc-${opt}`} />
                          <Label htmlFor={`vc-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 4 — Fundraising Readiness */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>How comfortable are you asking your audience to donate to a cause? *</Label>
                    <RadioGroup
                      value={comfortLevel}
                      onValueChange={(v) => setValue("comfortLevel", v, { shouldValidate: true })}
                    >
                      {COMFORT_LEVELS.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <RadioGroupItem value={level} id={`cl-${level}`} />
                          <Label htmlFor={`cl-${level}`} className="font-normal cursor-pointer">{level}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.comfortLevel && <p className="text-sm text-destructive">{errors.comfortLevel.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>What fundraising goal feels realistic for you in 30 days? *</Label>
                    <RadioGroup
                      value={fundraisingGoal}
                      onValueChange={(v) => setValue("fundraisingGoal", v, { shouldValidate: true })}
                    >
                      {FUNDRAISING_GOALS.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <RadioGroupItem value={goal} id={`fg-${goal}`} />
                          <Label htmlFor={`fg-${goal}`} className="font-normal cursor-pointer">{goal}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.fundraisingGoal && <p className="text-sm text-destructive">{errors.fundraisingGoal.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ca-additionalInfo">Anything else you want us to know?</Label>
                    <Textarea
                      id="ca-additionalInfo"
                      {...register("additionalInfo")}
                      placeholder="Optional"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              )}

              {/* Step 5 — Official Rules / Prize Terms */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Official Rules — Creator Challenge: Sponsor a Veteran</h3>
                  <div className="max-h-[40vh] overflow-y-auto rounded-md border p-4 space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="font-bold text-foreground">Eligibility</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>Participation is subject to approval by ValorWell.</li>
                        <li>Creators must follow platform policies and represent the campaign accurately.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Competition Period</p>
                      <p className="mt-1">Start: March 1, 2026 — End: March 31, 2026</p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">How Winner Is Determined</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>Winner = eligible creator with the highest net funds raised by the deadline.</li>
                        <li>Net funds = total donations minus refunds/chargebacks.</li>
                        <li>ValorWell may disqualify participants for fraud, misrepresentation, harassment, or attempts to manipulate totals.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Minimum to Qualify for Prize</p>
                      <p className="mt-1">To qualify for the grand prize, creators must raise at least $1,875 (25 sessions) during the competition period.</p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Prize Provider</p>
                      <p className="mt-1">Prize is fulfilled by LuxGive. Winner redeems and schedules directly with LuxGive.</p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Prize Terms Summary (Riviera Maya Magic)</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>4 nights / 2 guests, Puerto Morelos (Riviera Maya), Mexico.</li>
                        <li>12 months to confirm travel; subject to availability/blackout dates.</li>
                        <li>Max occupancy two adults; lead guest must be 25+.</li>
                        <li>Hotel taxes at checkout; airfare/transport not included.</li>
                        <li>Non-transferable; reservations final once confirmed.</li>
                      </ul>
                    </div>
                    <p className="italic">Full terms appear on the winner certificate.</p>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="ca-acceptedRules"
                      checked={watch("acceptedRules") === true}
                      onCheckedChange={(checked) => setValue("acceptedRules", checked === true ? true : false as any, { shouldValidate: true })}
                    />
                    <Label htmlFor="ca-acceptedRules" className="font-normal cursor-pointer leading-snug">
                      I have read and agree to the Official Rules and Prize Terms *
                    </Label>
                  </div>
                  {errors.acceptedRules && <p className="text-sm text-destructive">{errors.acceptedRules.message}</p>}
                </div>
              )}

              {submitError && <p className="text-sm text-destructive text-center">{submitError}</p>}

              {/* Navigation */}
              <div className="flex justify-between">
                {currentStep > 0 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                {currentStep < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
