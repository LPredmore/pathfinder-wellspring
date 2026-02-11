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
  "10 sessions ($500)",
  "25 sessions ($1,250)",
  "50 sessions ($2,500)",
  "100 sessions ($5,000+)",
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
  willingToShare: z.enum(["yes", "no"], { required_error: "Select yes or no" }),
  comfortLevel: z.string().min(1, "Select your comfort level"),
  fundraisingGoal: z.string().min(1, "Select a fundraising goal"),
  additionalInfo: z.string().trim().max(5000).optional(),
});

type FormData = z.infer<typeof formSchema>;

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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialProfiles: [{ platform: "", handle: "", followers: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialProfiles",
  });

  const state = watch("state");
  const willingToShare = watch("willingToShare");
  const comfortLevel = watch("comfortLevel");
  const fundraisingGoal = watch("fundraisingGoal");
  const veteranConnection = watch("veteranConnection");

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

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
      willing_to_share: data.willingToShare === "yes",
      comfort_level: data.comfortLevel,
      fundraising_goal: data.fundraisingGoal,
      additional_info: data.additionalInfo || null,
    } as any);

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

    setIsSubmitted(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitError(null);
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
              <DialogTitle className="text-2xl text-center">Creator Challenge Application</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Section 1 — Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Basic Information</h3>
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

              {/* Section 2 — Social Profiles */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Social Profiles</h3>
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

              {/* Section 3 — Fit and Motivation */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Fit &amp; Motivation</h3>
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

              {/* Section 4 — Fundraising Readiness */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Fundraising Readiness</h3>

                <div className="space-y-2">
                  <Label>Are you willing to share your fundraiser link at least 2 times during the 30-day challenge? *</Label>
                  <RadioGroup
                    value={willingToShare}
                    onValueChange={(v) => setValue("willingToShare", v as "yes" | "no", { shouldValidate: true })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="wts-yes" />
                      <Label htmlFor="wts-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="wts-no" />
                      <Label htmlFor="wts-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.willingToShare && <p className="text-sm text-destructive">{errors.willingToShare.message}</p>}
                </div>

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

              {submitError && <p className="text-sm text-destructive text-center">{submitError}</p>}

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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
