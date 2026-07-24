import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

const BodySchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  communicationConsent: z.literal(true),
  company: z.string().max(200).optional().default(""),
  submissionKey: z.string().max(200).optional().default(""),
});

const TENANT_ID = "00000000-0000-0000-0000-000000000001";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ ok: false, message: "Method not allowed" }),
      { status: 405, headers: jsonHeaders },
    );
  }

  try {
    const raw = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Invalid submission.",
          errors: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: jsonHeaders },
      );
    }

    const {
      firstName,
      lastName,
      email,
      communicationConsent,
      company,
      submissionKey,
    } = parsed.data;

    // Honeypot: silently succeed on bot submissions.
    if (company && company.trim().length > 0) {
      return new Response(
        JSON.stringify({ ok: true, lifecycle: "invite_sent" }),
        { status: 200, headers: jsonHeaders },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) {
      throw new Error("Supabase environment not configured");
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const normalizedEmail = email.toLowerCase();
    const sourceKey =
      submissionKey && submissionKey.length > 0
        ? submissionKey
        : `clinician-interest-${normalizedEmail}-${Date.now()}`;

    const { error: insertError } = await admin
      .from("website_submissions")
      .insert({
        tenant_id: TENANT_ID,
        submission_type: "clinician_application",
        normalized_lane: "provider_recruiting",
        source_system: "website",
        source_record_key: sourceKey,
        consent: communicationConsent,
        source_page: req.headers.get("referer") ?? null,
        user_agent: req.headers.get("user-agent") ?? null,
        payload: {
          first_name: firstName,
          last_name: lastName,
          email: normalizedEmail,
          source: "clinician_interest_form",
        },
      });

    if (insertError) {
      // Treat duplicate submission_key as success (idempotent double-submit).
      const msg = insertError.message ?? "";
      if (insertError.code === "23505" || /duplicate key/i.test(msg)) {
        return new Response(
          JSON.stringify({ ok: true, lifecycle: "invite_sent" }),
          { status: 200, headers: jsonHeaders },
        );
      }
      console.error("register-clinician-interest insert failed:", {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
      });
      return new Response(
        JSON.stringify({
          ok: false,
          message: "We could not save your interest. Please try again.",
        }),
        { status: 500, headers: jsonHeaders },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, lifecycle: "invite_sent" }),
      { status: 200, headers: jsonHeaders },
    );
  } catch (err) {
    console.error("register-clinician-interest failed:", err);
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ ok: false, message }),
      { status: 500, headers: jsonHeaders },
    );
  }
});
