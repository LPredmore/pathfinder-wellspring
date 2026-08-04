import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";
import { trackClinicianInterestRegistered } from "@/lib/clinicianConversionTracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(100),
  lastName: z.string().trim().min(1, "Last name is required.").max(100),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(255),
  communicationConsent: z
    .boolean()
    .refine((value) => value, "Communication consent is required."),
  company: z.string().max(200).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ClinicianInterestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      communicationConsent: false,
      company: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const submissionKey = createWebsiteSubmissionKey();

    const { data: response, error } = await billingHubSupabase.functions.invoke(
      "register-clinician-interest",
      {
        body: {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          communicationConsent: data.communicationConsent,
          company: data.company?.trim() ?? "",
          submissionKey,
        },
      },
    );

    if (error || response?.ok !== true) {
      setSubmitError(
        response?.message ??
          "We could not register your interest right now. Please try again.",
      );
      return;
    }

    trackClinicianInterestRegistered(submissionKey);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="border border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-canvas)]/5 p-8 text-center md:p-12"
      >
        <CheckCircle2
          className="mx-auto h-14 w-14 text-[color:var(--cl-ember)]"
          aria-hidden="true"
        />
        <h3 className="mt-6 text-2xl font-bold leading-tight text-[color:var(--cl-canvas)] md:text-3xl">
          Thank you for expressing interest in joining the growing ValorWell
          clinician movement.
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[color:var(--cl-canvas)]/75 md:text-lg">
          Check your email for the next steps and access to continue learning
          about ValorWell.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-canvas)]/5 p-6 md:p-9"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="clinician-first-name" className="text-[color:var(--cl-canvas)]">
            First name
          </Label>
          <Input
            id="clinician-first-name"
            autoComplete="given-name"
            className="mt-2 border-[color:var(--cl-canvas)]/30 bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]"
            aria-invalid={Boolean(errors.firstName)}
            {...register("firstName")}
          />
          {errors.firstName ? (
            <p className="mt-2 text-sm text-[color:var(--cl-ember)]">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="clinician-last-name" className="text-[color:var(--cl-canvas)]">
            Last name
          </Label>
          <Input
            id="clinician-last-name"
            autoComplete="family-name"
            className="mt-2 border-[color:var(--cl-canvas)]/30 bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]"
            aria-invalid={Boolean(errors.lastName)}
            {...register("lastName")}
          />
          {errors.lastName ? (
            <p className="mt-2 text-sm text-[color:var(--cl-ember)]">
              {errors.lastName.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="clinician-email" className="text-[color:var(--cl-canvas)]">
          Email
        </Label>
        <Input
          id="clinician-email"
          type="email"
          autoComplete="email"
          className="mt-2 border-[color:var(--cl-canvas)]/30 bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-2 text-sm text-[color:var(--cl-ember)]">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <Label htmlFor="clinician-company">Company</Label>
        <Input
          id="clinician-company"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[color:var(--cl-canvas)]/80">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--cl-ember)]"
            aria-invalid={Boolean(errors.communicationConsent)}
            {...register("communicationConsent")}
          />
          <span>
            I agree to receive clinician onboarding and recruiting communications
            from ValorWell.
          </span>
        </label>
        {errors.communicationConsent ? (
          <p className="mt-2 text-sm text-[color:var(--cl-ember)]">
            {errors.communicationConsent.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p
          role="alert"
          className="mt-6 border border-[color:var(--cl-ember)]/50 bg-[color:var(--cl-ember)]/10 p-4 text-sm text-[color:var(--cl-canvas)]"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 min-h-12 w-full rounded-none bg-[color:var(--cl-ember)] px-7 text-sm font-bold uppercase tracking-wide text-white hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Creating access…
          </>
        ) : (
          "Start My Onboarding"
        )}
      </Button>

      <p className="mt-5 text-xs leading-relaxed text-[color:var(--cl-canvas)]/60">
        This interest step is for independently licensed clinicians. Registering
        interest does not guarantee acceptance, referrals, or caseload volume.
      </p>
    </form>
  );
}
