import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get all competitors with their profile passwords
    const { data: competitors, error: fetchError } = await supabaseAdmin
      .from("current_competitors")
      .select("influencer_id, influencers(first_name, last_name, email, user_id)");

    if (fetchError) {
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fnUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-welcome-email`;
    const results: { email: string; success: boolean; error?: string }[] = [];

    for (const comp of competitors || []) {
      const inf = comp.influencers as any;
      if (!inf || !inf.user_id) {
        results.push({ email: "unknown", success: false, error: "No linked influencer/user" });
        continue;
      }

      // Get password from profiles
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("password")
        .eq("id", inf.user_id)
        .single();

      try {
        const res = await fetch(fnUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({
            to: inf.email,
            first_name: inf.first_name,
            last_name: inf.last_name,
            email: inf.email,
            password: profile?.password || "(not available)",
          }),
        });

        if (res.ok) {
          results.push({ email: inf.email, success: true });
        } else {
          const body = await res.text();
          results.push({ email: inf.email, success: false, error: body });
        }
      } catch (err) {
        results.push({ email: inf.email, success: false, error: String(err) });
      }
    }

    const successes = results.filter((r) => r.success).length;
    const failures = results.filter((r) => !r.success).length;

    return new Response(
      JSON.stringify({ summary: { total: results.length, successes, failures }, results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
