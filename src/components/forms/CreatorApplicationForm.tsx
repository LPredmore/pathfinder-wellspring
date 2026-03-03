import { useState, useRef } from "react";
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
import { CheckCircle, Loader2, Plus, Trash2, Upload } from "lucide-react";

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
  prefName: z.string().trim().max(100).optional(),
  personalMission: z.string().trim().min(1, "This field is required").max(2000),
  veteranConnection: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEP_TITLES = [
  "Welcome",
  "Social Profiles",
  "Your Profile & Mission",
  "Veteran Connection",
];

const STEP_FIELDS: (keyof FormData | string)[][] = [
  ["firstName", "lastName", "email", "state"],
  ["socialProfiles"],
  ["personalMission"],
  ["veteranConnection"],
];

interface CreatorApplicationFormProps {
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonClassName?: string;
  buttonText?: string;
}

export function CreatorApplicationForm({
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName,
  buttonText = "Apply to Compete",
}: CreatorApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [rowId, setRowId] = useState<string | null>(null);
  const [isStepLoading, setIsStepLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialProfiles",
  });

  const state = watch("state");
  const veteranConnection = watch("veteranConnection");

  const callEdgeFunction = async (data: { first_name: string; last_name: string; email: string; state: string }) => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/create-mission-partner`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to create account");
    }
    return result;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("Photo must be under 5MB");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setSubmitError(null);
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !rowId) return null;
    const ext = avatarFile.name.split(".").pop() || "jpg";
    const path = `${rowId}/photo.${ext}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(path, avatarFile, { upsert: true });
    if (error) {
      console.error("Avatar upload error:", error);
      return null;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep] as any;
    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;

    setIsStepLoading(true);
    setSubmitError(null);

    try {
      if (currentStep === 0 && !rowId) {
        // Call edge function to create auth account + application row
        const data = getValues();
        const result = await callEdgeFunction({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          state: data.state,
        });
        setRowId(result.id);
      } else if (currentStep === 1 && rowId) {
        // Save social profiles
        const data = getValues();
        const profiles = data.socialProfiles.map((sp) => ({
          platform: sp.platform,
          handle: sp.handle,
          followers: sp.followers,
        }));
        const { error } = await supabase
          .from("creator_applications" as any)
          .update({ social_profiles: profiles } as any)
          .eq("id", rowId);
        if (error) throw new Error("Could not save social profiles");
      }

      setCurrentStep((s) => s + 1);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsStepLoading(false);
    }
  };

  const handleBack = () => {
    setSubmitError(null);
    setCurrentStep((s) => s - 1);
  };

  const onSubmit = async (data: FormData) => {
    if (!rowId) return;
    setSubmitError(null);

    try {
      // Upload avatar if present
      let avatarUrl: string | null = null;
      if (avatarFile) {
        avatarUrl = await uploadAvatar();
      }

      // Final update
      const updatePayload: Record<string, any> = {
        pref_name: data.prefName || `${data.firstName} ${data.lastName}`,
        personal_mission: data.personalMission,
        veteran_connection: data.veteranConnection || null,
        status: "new",
      };
      if (avatarUrl) {
        updatePayload.avatar_url = avatarUrl;
      }

      const { error } = await supabase
        .from("creator_applications" as any)
        .update(updatePayload as any)
        .eq("id", rowId);

      if (error) throw new Error("Could not submit application");

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitError(null);
        setCurrentStep(0);
        setRowId(null);
        setAvatarFile(null);
        setAvatarPreview(null);
        reset();
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={buttonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="py-12 text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Application Received!</h3>
            <p className="text-muted-foreground">
              Thank you for applying to compete in Beyond the Yellow. We'll review your application and be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">{STEP_TITLES[currentStep]}</DialogTitle>
            </DialogHeader>

            {/* Progress */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground text-center">Step {currentStep + 1} of 4</p>
              <Progress value={((currentStep + 1) / 4) * 100} className="h-2" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1 — Welcome + Basic Info */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-center">
                    <p className="text-foreground font-medium">
                      Thank you for your eagerness to be part of Beyond the Yellow! 💛
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We're excited to learn more about you. Let's start with the basics.
                    </p>
                  </div>
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
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-foreground text-sm">
                      ValorWell is as committed to supporting you as you are to supporting us. We will promote your social media profiles while you are competing for us. Please list them all below.
                    </p>
                  </div>
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

              {/* Step 3 — Profile & Mission */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  {/* Avatar upload */}
                  <div className="space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex items-center gap-4">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Preview"
                          className="h-20 w-20 rounded-full object-cover border-2 border-primary/30"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {avatarPreview ? "Change Photo" : "Upload Photo"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, or WebP. Max 5MB.</p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>

                  {/* Display name */}
                  <div className="space-y-2">
                    <Label htmlFor="ca-prefName">Competition Display Name</Label>
                    <Input id="ca-prefName" {...register("prefName")} placeholder="e.g. Johnny V" />
                    <p className="text-xs text-muted-foreground">How would you like your name shown publicly? (optional — defaults to your full name)</p>
                  </div>

                  {/* Personal mission */}
                  <div className="space-y-2">
                    <Label htmlFor="ca-personalMission">Why do you want to be part of Beyond the Yellow? *</Label>
                    <Textarea
                      id="ca-personalMission"
                      {...register("personalMission")}
                      placeholder="Tell us what drives you to support veterans' mental health..."
                      className="min-h-[120px]"
                    />
                    {errors.personalMission && <p className="text-sm text-destructive">{errors.personalMission.message}</p>}
                  </div>
                </div>
              )}

              {/* Step 4 — Veteran Connection */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Do you have a personal connection to veterans or military communities?</Label>
                    <RadioGroup
                      value={veteranConnection}
                      onValueChange={(v) => setValue("veteranConnection", v)}
                    >
                      {VETERAN_CONNECTION_OPTIONS.map((opt) => (
                        <div key={opt} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt} id={`vc-${opt}`} />
                          <Label htmlFor={`vc-${opt}`} className="cursor-pointer font-normal">{opt}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Error display */}
              {submitError && (
                <div className="rounded-md bg-destructive/10 border border-destructive/30 p-3">
                  <p className="text-sm text-destructive">{submitError}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-2">
                {currentStep > 0 ? (
                  <Button type="button" variant="outline" onClick={handleBack} disabled={isStepLoading || isSubmitting}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext} disabled={isStepLoading}>
                    {isStepLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-1" /> Saving…
                      </>
                    ) : (
                      "Next"
                    )}
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-1" /> Submitting…
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
