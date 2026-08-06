import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Mail, ShieldCheck, X } from "lucide-react";
import GetCare from "./GetCare";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  billingHubSupabase,
  createWebsiteSubmissionKey,
} from "@/integrations/supabase/client";

const CLIENT_PORTAL_URL = "https://client.valorwell.org/auth";
const CLIENT_PORTAL_HOSTS = new Set([
  "client.valorwell.org",
  "clients.valorwell.org",
]);

interface SignupFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
}

const initialForm: SignupFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
};

function emitSignupTag(submissionId: string) {
  if (typeof window === "undefined") return;
  const taggedWindow = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  taggedWindow.dataLayer = taggedWindow.dataLayer ?? [];
  taggedWindow.dataLayer.push({
    event: "client_signup_success",
    submission_id: submissionId,
    signup_source: "valorwell_get_care",
  });

  taggedWindow.gtag?.("event", "client_signup_success", {
    event_id: submissionId,
    signup_source: "valorwell_get_care",
    transport_type: "beacon",
  });
}

export default function GetCareWithSignup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<SignupFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submissionId = useMemo(() => createWebsiteSubmissionKey(), [open]);

  useEffect(() => {
    const interceptPortalSignup = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      try {
        const destination = new URL(anchor.href, window.location.href);
        if (!CLIENT_PORTAL_HOSTS.has(destination.hostname)) return;
        event.preventDefault();
        setError(null);
        setOpen(true);
      } catch {
        // Leave malformed or non-HTTP links to the browser.
      }
    };

    document.addEventListener("click", interceptPortalSignup);
    return () => document.removeEventListener("click", interceptPortalSignup);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, submitting]);

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSubmitted(false);
    setError(null);
    setForm(initialForm);
  };

  const updateField = (field: keyof SignupFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    try {
      const { data, error: functionError } = await billingHubSupabase.functions
        .invoke("register-client-website", {
          body: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            website: form.website,
            submissionId,
          },
        });

      if (functionError) throw functionError;
      if (!data?.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "We could not create your account. Please try again.",
        );
      }

      emitSignupTag(submissionId);
      setSubmitted(true);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "We could not create your account. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <GetCare />

      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 min-h-12 rounded-full bg-[color:var(--cl-ember)] px-6 font-bold text-[color:var(--cl-canvas)] shadow-2xl hover:bg-[color:var(--cl-ember)]/90"
      >
        Start CHAMPVA Intake
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="client-signup-title"
        >
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8">
            <button
              type="button"
              onClick={closeModal}
              disabled={submitting}
              aria-label="Close signup"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Mail className="h-8 w-8 text-emerald-700" aria-hidden="true" />
                </div>
                <h2
                  id="client-signup-title"
                  className="mt-5 text-3xl font-bold text-slate-950"
                >
                  Check your email to continue
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
                  We sent secure account-access instructions to the email address
                  you provided. Open that message, choose your password, and then
                  continue your registration in the ValorWell client portal.
                </p>
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-left text-sm text-emerald-950">
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    <p>
                      The email contains a one-time secure link. ValorWell will not
                      email you a reusable password.
                    </p>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button type="button" onClick={closeModal} variant="outline">
                    Return to Get Care
                  </Button>
                  <Button asChild>
                    <a href={CLIENT_PORTAL_URL}>Go to Client Login</a>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
                  Secure initial signup
                </p>
                <h2
                  id="client-signup-title"
                  className="mt-3 pr-10 text-3xl font-bold text-slate-950"
                >
                  Create your ValorWell client account
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Complete this brief first step here. We will email you a secure
                  one-time link so you can choose a password and continue the full
                  intake inside the client portal.
                </p>

                <form onSubmit={submitSignup} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="signup-first-name">First name</Label>
                      <Input
                        id="signup-first-name"
                        autoComplete="given-name"
                        required
                        maxLength={80}
                        value={form.firstName}
                        onChange={(event) =>
                          updateField("firstName", event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-last-name">Last name</Label>
                      <Input
                        id="signup-last-name"
                        autoComplete="family-name"
                        required
                        maxLength={80}
                        value={form.lastName}
                        onChange={(event) =>
                          updateField("lastName", event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      maxLength={40}
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                    />
                  </div>

                  <div
                    className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <Label htmlFor="signup-website">Website</Label>
                    <Input
                      id="signup-website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(event) =>
                        updateField("website", event.target.value)
                      }
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                    >
                      {error}
                    </div>
                  )}

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                      <p>
                        Submitting creates only your account. The rest of your
                        registration and intake remains inside the secure client
                        portal.
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="min-h-12 w-full bg-[color:var(--cl-ember)] font-bold text-[color:var(--cl-canvas)] hover:bg-[color:var(--cl-ember)]/90"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Creating your account...
                      </>
                    ) : (
                      "Create Account and Email Instructions"
                    )}
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-slate-500">
                    By continuing, you agree that ValorWell may use this contact
                    information to create your client account and send account-access
                    instructions. Care remains subject to eligibility, licensure,
                    availability, capacity, and clinical fit.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
