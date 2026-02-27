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
  acceptedRules: z.literal(true, { errorMap: () => ({ message: "You must accept the participation agreement to continue" }) }),
});

type FormData = z.infer<typeof formSchema>;

const STEP_TITLES = [
  "Basic Information",
  "Social Profiles",
  "Fit & Motivation",
  "Fundraising Readiness",
  "Participation Agreement",
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

              {/* Step 5 — Participation Agreement */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground">ValorWell Ambassador Challenge — Ambassador Participation Agreement</h3>
                  <div className="max-h-[40vh] overflow-y-auto rounded-md border p-4 space-y-4 text-sm text-muted-foreground">

                    <p>This Ambassador Participation Agreement ("Agreement") is entered into by and between ValorWell, Inc. ("ValorWell," "we," or "us") and the individual ("Ambassador" or "you") who submits an application and is accepted into the ValorWell Ambassador Challenge ("Program").</p>
                    <p>By submitting your application and checking the acceptance box, you acknowledge that you have read, understood, and agree to be bound by this Agreement in its entirety.</p>

                    {/* 1. Purpose */}
                    <div>
                      <p className="font-bold text-foreground">1. Purpose of the Program</p>
                      <p className="mt-1">The ValorWell Ambassador Challenge is a cause-driven social media campaign designed to raise awareness and funding for veteran mental health services. Ambassadors use their platforms to encourage donations that directly fund therapy sessions for veterans and military families through ValorWell's licensed provider network.</p>
                    </div>

                    {/* 2. Term */}
                    <div>
                      <p className="font-bold text-foreground">2. Term</p>
                      <p className="mt-1">The Program runs for a defined period ("Challenge Period") announced by ValorWell prior to launch. ValorWell reserves the right to modify, extend, or end the Challenge Period at its sole discretion.</p>
                    </div>

                    {/* 3. Program Structure */}
                    <div>
                      <p className="font-bold text-foreground">3. Program Structure and Division Assignment</p>
                      <p className="font-bold mt-2">3.1 Division Assignment</p>
                      <p className="mt-1">Upon acceptance, each Ambassador will be placed into one of three divisions based on their combined social media following at the time of application:</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li><strong>Division 1:</strong> Under 10,000 followers</li>
                        <li><strong>Division 2:</strong> 10,000–99,999 followers</li>
                        <li><strong>Division 3:</strong> 100,000+ followers</li>
                      </ul>
                      <p className="mt-1">Division placement is determined solely by ValorWell and is final.</p>
                      <p className="font-bold mt-2">3.2 Follower Verification</p>
                      <p className="mt-1">ValorWell reserves the right to verify follower counts using third-party tools or manual review. Inflated, purchased, or bot-generated followers may result in reassignment or removal from the Program.</p>
                    </div>

                    {/* 4. Ambassador Responsibilities */}
                    <div>
                      <p className="font-bold text-foreground">4. Ambassador Responsibilities</p>
                      <p className="font-bold mt-2">4.1 Minimum Content Requirements</p>
                      <p className="mt-1">Each Ambassador agrees to create and publish a minimum of two (2) pieces of original content related to the campaign during the Challenge Period. Content may include but is not limited to videos, posts, reels, stories, or livestreams.</p>
                      <p className="font-bold mt-2">4.2 No Unauthorized Representations</p>
                      <p className="mt-1">Ambassadors may not represent themselves as employees, agents, or official spokespersons of ValorWell. You may identify yourself as a "ValorWell Ambassador" or "Ambassador for the ValorWell Ambassador Challenge" only in connection with the Program.</p>
                    </div>

                    {/* 5. Required Messaging */}
                    <div>
                      <p className="font-bold text-foreground">5. Required Messaging and Prohibited Claims</p>
                      <p className="font-bold mt-2">5.1 Core Campaign Framing</p>
                      <p className="mt-1">All Ambassador content must align with the following message:</p>
                      <p className="mt-1 italic">"Donations fund therapy sessions for veterans and military families through ValorWell's licensed provider network."</p>
                      <p className="font-bold mt-2">5.2 Prohibited Claims</p>
                      <p className="mt-1">Ambassadors must not:</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>Guarantee that any specific individual will receive therapy</li>
                        <li>State or imply that therapy is "free" without context</li>
                        <li>Make medical, clinical, or diagnostic claims</li>
                        <li>Misrepresent ValorWell's services, mission, or partnerships</li>
                        <li>Use emotionally manipulative, misleading, or exploitative language</li>
                      </ul>
                      <p className="font-bold mt-2">5.3 Required Disclosures</p>
                      <p className="mt-1">You must clearly disclose your participation in the Program in accordance with FTC endorsement guidelines. Suggested disclosures include:</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>#Ad or #Sponsored</li>
                        <li>"I'm a ValorWell Ambassador participating in a fundraising challenge."</li>
                      </ul>
                    </div>

                    {/* 6. Compensation */}
                    <div>
                      <p className="font-bold text-foreground">6. Compensation and Payouts</p>
                      <p className="font-bold mt-2">6.1 Session Funding Unit</p>
                      <p className="mt-1">For purposes of this Program, one (1) therapy session is valued at Seventy-Five Dollars ($75.00) ("Session Funding Unit"). All donation tracking, milestone thresholds, and compensation calculations are based on this rate.</p>
                      <p className="font-bold mt-2">6.2 Activation Threshold</p>
                      <p className="mt-1">No compensation is earned until an Ambassador's verified fundraising total meets or exceeds $750.00 (equivalent to 10 Session Funding Units) in Net Cleared Donations during the Challenge Period ("Activation Threshold"). Ambassadors who do not meet this threshold are not eligible for any payout.</p>
                      <p className="font-bold mt-2">6.3 Net Cleared Donations</p>
                      <p className="mt-1">"Net Cleared Donations" means total donations attributed to an Ambassador's unique referral link, minus refunds, chargebacks, and processing fees.</p>
                      <p className="font-bold mt-2">6.4 Base Compensation</p>
                      <p className="mt-1">Upon meeting the Activation Threshold, the Ambassador receives a flat rate of $10.00 per Session Funding Unit raised, calculated as:</p>
                      <p className="mt-1 font-medium">Payout = (Net Cleared Donations ÷ $75.00) × $10.00</p>
                      <p className="font-bold mt-2">6.5 Division Winner Bonus</p>
                      <p className="mt-1">The Ambassador with the highest Net Cleared Donations in each Division during the Challenge Period will receive a bonus prize determined and announced by ValorWell prior to the start of the Challenge Period. In the event of a tie, the prize will be split equally among tied Ambassadors.</p>
                      <p className="font-bold mt-2">6.6 Milestone Rewards</p>
                      <p className="mt-1">ValorWell may offer additional milestone-based rewards (e.g., bonus payouts, branded merchandise, or experience-based prizes) at various fundraising levels. These milestones, if any, will be published before the Challenge Period begins and are subject to change at ValorWell's discretion.</p>
                      <p className="font-bold mt-2">6.7 Permanent Ambassador Status</p>
                      <p className="mt-1">Ambassadors who meet the Activation Threshold and remain in good standing may be offered ongoing "Permanent Ambassador" status at ValorWell's sole discretion. Permanent Ambassadors may receive continued referral compensation outside of the Challenge Period under separately communicated terms.</p>
                      <p className="font-bold mt-2">6.8 Payment Processing</p>
                      <p className="mt-1">All payouts will be processed within forty-five (45) days following the end of the Challenge Period. Payments will be issued via a method determined by ValorWell (e.g., ACH, PayPal, or check). You are responsible for providing accurate payment information.</p>
                      <p className="font-bold mt-2">6.9 Taxes</p>
                      <p className="mt-1">You are solely responsible for all applicable federal, state, and local taxes on any compensation received. Ambassadors earning $600 or more in a calendar year will receive an IRS Form 1099. ValorWell does not withhold taxes on your behalf.</p>
                    </div>

                    {/* 7. Content License */}
                    <div>
                      <p className="font-bold text-foreground">7. Content License, Name, Image, and Publicity Rights</p>
                      <p className="font-bold mt-2">7.1 Content License</p>
                      <p className="mt-1">By participating in the Program, you grant ValorWell a non-exclusive, royalty-free, worldwide, perpetual license to use, reproduce, edit, and distribute any content you create in connection with the Program across ValorWell's marketing channels (including social media, website, email, and advertising).</p>
                      <p className="font-bold mt-2">7.2 Name, Image, and Likeness</p>
                      <p className="mt-1">You grant ValorWell permission to use your name, likeness, photograph, voice, and biographical information in connection with the promotion of the Program and ValorWell's mission. This right survives the end of the Challenge Period.</p>
                    </div>

                    {/* 8. Brand Use */}
                    <div>
                      <p className="font-bold text-foreground">8. Brand Use and Conduct</p>
                      <p className="font-bold mt-2">8.1 Brand Guidelines</p>
                      <p className="mt-1">Ambassadors may use ValorWell's name, logo, and approved branding assets only as directed. You may not alter logos, create derivative marks, or use branding in ways that imply endorsement of unrelated products or causes.</p>
                      <p className="font-bold mt-2">8.2 Code of Conduct</p>
                      <p className="mt-1">Ambassadors are expected to conduct themselves in a manner consistent with ValorWell's values. ValorWell may remove any Ambassador whose public behavior, content, or statements are deemed harmful, discriminatory, dishonest, or otherwise inconsistent with the Program's mission.</p>
                    </div>

                    {/* 9. Removal */}
                    <div>
                      <p className="font-bold text-foreground">9. Removal, Disqualification, and Termination</p>
                      <p className="font-bold mt-2">9.1 By ValorWell</p>
                      <p className="mt-1">ValorWell may remove or disqualify any Ambassador at any time, with or without cause, including but not limited to:</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>Violation of this Agreement</li>
                        <li>Fraudulent activity or manipulation of donation totals</li>
                        <li>Conduct that reflects poorly on ValorWell or the veteran community</li>
                        <li>Failure to meet minimum content requirements</li>
                      </ul>
                      <p className="font-bold mt-2">9.2 By Ambassador</p>
                      <p className="mt-1">You may withdraw from the Program at any time by notifying ValorWell in writing. Withdrawal forfeits eligibility for any unpaid compensation or prizes.</p>
                      <p className="font-bold mt-2">9.3 Effect of Termination</p>
                      <p className="mt-1">Upon removal or withdrawal, you must cease all use of ValorWell branding, remove or archive campaign content if requested, and discontinue use of your referral link. Sections 6 (to the extent compensation has been earned), 7, 13, and 14 survive termination.</p>
                    </div>

                    {/* 10. Independent Relationship */}
                    <div>
                      <p className="font-bold text-foreground">10. Independent Relationship</p>
                      <p className="mt-1">You are an independent participant, not an employee, contractor, or agent of ValorWell. Nothing in this Agreement creates an employment, partnership, or joint venture relationship. You are not entitled to benefits, insurance, or protections afforded to ValorWell employees.</p>
                    </div>

                    {/* 11. Representations */}
                    <div>
                      <p className="font-bold text-foreground">11. Representations and Compliance</p>
                      <p className="mt-1">By entering into this Agreement, you represent that:</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>You are at least 18 years of age</li>
                        <li>All information provided in your application is truthful and accurate</li>
                        <li>You will comply with all applicable laws, rules, and regulations, including FTC disclosure requirements</li>
                        <li>You have the legal authority to enter into this Agreement</li>
                      </ul>
                    </div>

                    {/* 12. Limitation of Expectations */}
                    <div>
                      <p className="font-bold text-foreground">12. Limitation of Expectations and No Guarantees</p>
                      <p className="mt-1">ValorWell makes no guarantees regarding the amount of donations any Ambassador will generate, the visibility of any content, or the success of the Program. Participation does not guarantee compensation, prizes, or continued involvement with ValorWell.</p>
                    </div>

                    {/* 13. Confidentiality */}
                    <div>
                      <p className="font-bold text-foreground">13. Confidentiality and Internal Information</p>
                      <p className="mt-1">You agree not to disclose any non-public information shared by ValorWell during your participation, including internal strategies, donation data of other Ambassadors, unreleased campaign plans, or proprietary tools and systems.</p>
                    </div>

                    {/* 14. Limitation of Liability */}
                    <div>
                      <p className="font-bold text-foreground">14. Limitation of Liability</p>
                      <p className="mt-1">To the fullest extent permitted by law, ValorWell shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the Program. ValorWell's total liability under this Agreement shall not exceed the total compensation earned by the Ambassador during the applicable Challenge Period.</p>
                    </div>

                    {/* 15. Governing Law */}
                    <div>
                      <p className="font-bold text-foreground">15. Governing Law and Dispute Handling</p>
                      <p className="mt-1">This Agreement shall be governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes shall be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration in Austin, Texas, under the rules of the American Arbitration Association.</p>
                    </div>

                    {/* 16. General Terms */}
                    <div>
                      <p className="font-bold text-foreground">16. General Terms</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>This Agreement constitutes the entire agreement between the parties regarding the Program and supersedes all prior agreements or understandings.</li>
                        <li>ValorWell may amend this Agreement at any time by providing written notice. Continued participation after notice constitutes acceptance of the updated terms.</li>
                        <li>If any provision is found to be unenforceable, the remaining provisions shall remain in full force and effect.</li>
                        <li>Failure by ValorWell to enforce any provision does not constitute a waiver of that provision.</li>
                      </ul>
                    </div>

                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="ca-acceptedRules"
                      checked={watch("acceptedRules") === true}
                      onCheckedChange={(checked) => setValue("acceptedRules", checked === true ? true : false as any, { shouldValidate: true })}
                    />
                    <Label htmlFor="ca-acceptedRules" className="font-normal cursor-pointer leading-snug">
                      I have read and agree to the Ambassador Participation Agreement *
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
