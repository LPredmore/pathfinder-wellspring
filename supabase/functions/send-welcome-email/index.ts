import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, first_name, last_name, email, password } = await req.json();

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.log("RESEND_API_KEY not configured, skipping welcome email.");
      return new Response(JSON.stringify({ skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Read template from site_config
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: configRows } = await supabaseAdmin
      .from("site_config")
      .select("key, value")
      .in("key", ["welcome_email_subject", "welcome_email_body"]);

    const configMap: Record<string, string> = {};
    for (const row of configRows ?? []) {
      configMap[row.key] = row.value;
    }

    const subjectTemplate = configMap["welcome_email_subject"];
    const bodyTemplate = configMap["welcome_email_body"];

    if (!subjectTemplate || !bodyTemplate) {
      console.log("No email template configured, skipping welcome email.");
      return new Response(JSON.stringify({ skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Replace placeholders
    const replacePlaceholders = (template: string) =>
      template
        .replace(/\{\{first_name\}\}/g, first_name ?? "")
        .replace(/\{\{last_name\}\}/g, last_name ?? "")
        .replace(/\{\{email\}\}/g, email ?? "")
        .replace(/\{\{password\}\}/g, password ?? "");

    const subject = replacePlaceholders(subjectTemplate);
    const html = replacePlaceholders(bodyTemplate);

    // Send via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ValorWell <no-reply@valorwell.com>",
        to: [to],
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("Resend API error:", resendRes.status, errBody);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendData = await resendRes.json();
    console.log("Welcome email sent:", resendData.id);

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error in send-welcome-email:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
