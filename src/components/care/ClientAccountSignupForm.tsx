import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";

const CLIENT_PORTAL_URL = "https://client.valorwell.org/auth";

const signupSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name.").max(80),
  lastName: z.string().trim().min(1, "Enter your last name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30, "Enter a valid phone number."),
  website: z.string().max(0).optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

function maskEmail(email: string) {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email;
  const visible = localPart.slice(0, Math.min(2, localPart.length));
  return `${visible}${"•".repeat(Math.max(3, localPart.length - visible.length))}@${domain}`;
}

export function ClientAccountSignupForm() {
  const submissionIdRef = useRef(createWebsiteSubmissionKey());
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      website: "",
    },
  });

  const submit = async (values: SignupFormValues) => {
    setServerError("");

    const normalizedEmail = values.email.trim().toLowerCase();
    const { data, error } = await billingHubSupabase.functions.invoke(
      "register-client-website",
      {
        body: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: normalizedEmail,
          phone: values.phone.trim(),
          submissionId: submissionIdRef.current,
          website: values.website ?? "",
          sourcePage: "/get-care",
        },
      },
    );

    if (error || !data?.ok) {
      setServerError(
        "We could not create or access your account right now. Please try again. If the problem continues, email info@valorwell.org.",
      );
      return;
    }

    setSubmittedEmail(normalizedEmail);
  };

  if (submittedEmail) {
    return (
      <div
        id="client-signup"
        aria-live="polite"
        className="mt-8 border border-[color:var(--cl-evergreen)]/25 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2
            className="mt-1 h-7 w-7 shrink-0 text-[color:var(--cl-evergreen)]"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
              Check your email
            </p>
            <h4 className="mt-2 text-2xl font-bold">
              Your ValorWell account is ready for activation.
            </h4>
            <p className="mt-3 max-w-2xl leading-relaxed text-[color:var(--cl-ink)]/75">
              We sent secure account-access instructions to {maskEmail(submittedEmail)}.
              Open that message, choose your password, and then continue the existing
              client registration process in the ValorWell portal.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--cl-ink)]/60">
              The activation link is time-limited and can only be used once. Check your
              spam or promotions folder if the message does not appear within a few
              minutes.
            </p>
            <a
              href={CLIENT_PORTAL_URL}
              className="mt-6 inline-flex min-h-11 items-center gap-2 border border-[color:var(--cl-evergreen)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-evergreen)] hover:bg-[color:var(--cl-evergreen)] hover:text-white"
            >
              Already activated? Sign in
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="client-signup"
      className="mt-8 scroll-mt-28 border border-[color:var(--cl-ink)]/15 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-3 border-b border-[color:var(--cl-ink)]/10 pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
            Create your client account
          </p>
          <h4 className="mt-3 text-2xl font-bold md:text-3xl">
            Start here, then finish registration securely in the client portal.
          </h4>
          <p className="mt-3 max-w-2xl leading-relaxed text-[color:var(--cl-ink)]/72">
            Enter only the basic information needed to create your account. We will
            email a one-time activation link so you can choose your own password and
            continue.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[color:var(--cl-evergreen)]">
          <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          Secure activation
        </div>
      </div>

      <form onSubmit={handleSubmit(submit)} className="mt-7 space-y-5" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="client-signup-first-name">First name</Label>
            <Input
              id="client-signup-first-name"
              autoComplete="given-name"
              className="mt-2"
              aria-invalid={Boolean(errors.firstName)}
              {...register("firstName")}
            />
            {errors.firstName ? (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {errors.firstName.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="client-signup-last-name">Last name</Label>
            <Input
              id="client-signup-last-name"
              autoComplete="family-name"
              className="mt-2"
              aria-invalid={Boolean(errors.lastName)}
              {...register("lastName")}
            />
            {errors.lastName ? (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {errors.lastName.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="client-signup-email">Email</Label>
            <Input
              id="client-signup-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className="mt-2"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email ? (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="client-signup-phone">Phone</Label>
            <Input
              id="client-signup-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="mt-2"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {errors.phone.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <Label htmlFor="client-signup-website">Website</Label>
          <Input
            id="client-signup-website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {serverError ? (
          <div
            className="border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            role="alert"
          >
            {serverError}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-[color:var(--cl-ink)]/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--cl-ink)]/58">
            By continuing, you are requesting a ValorWell client account. This is not
            an appointment confirmation and does not guarantee coverage, clinician
            availability, placement, or clinical fit. See our{" "}
            <a href="/privacy" className="underline underline-offset-2">
              privacy policy
            </a>
            .
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-h-12 shrink-0 gap-2 bg-[color:var(--cl-ember)] px-6 text-[color:var(--cl-canvas)] hover:bg-[color:var(--cl-evergreen)]"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Mail className="h-4 w-4" aria-hidden="true" />
            )}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
