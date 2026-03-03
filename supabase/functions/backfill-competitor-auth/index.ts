import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generatePassword(length = 16): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch all current_competitors joined with influencers
    const { data: competitors, error: fetchError } = await supabaseAdmin
      .from("current_competitors")
      .select("id, influencer_id, influencers(id, email, first_name, last_name, user_id)")
      ;

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return new Response(JSON.stringify({ error: "Failed to fetch competitors", detail: fetchError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: { email: string; success: boolean; error?: string }[] = [];

    for (const comp of competitors || []) {
      const inf = comp.influencers as any;
      if (!inf) {
        results.push({ email: "unknown", success: false, error: "No linked influencer" });
        continue;
      }

      // Skip if already has a user_id
      if (inf.user_id) {
        results.push({ email: inf.email, success: false, error: "Already has user_id" });
        continue;
      }

      const password = generatePassword(16);

      // 1. Create auth user
      const { data: authData, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
          email: inf.email,
          password,
          email_confirm: true,
        });

      if (authError) {
        console.error(`Auth error for ${inf.email}:`, authError);
        results.push({ email: inf.email, success: false, error: authError.message });
        continue;
      }

      const userId = authData.user!.id;

      // 2. Insert profiles row
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({ id: userId, email: inf.email, password });

      if (profileError) {
        console.error(`Profile error for ${inf.email}:`, profileError);
        await supabaseAdmin.auth.admin.deleteUser(userId);
        results.push({ email: inf.email, success: false, error: `Profile: ${profileError.message}` });
        continue;
      }

      // 3. Insert user_roles row
      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: userId, role: "influencer" });

      if (roleError) {
        console.error(`Role error for ${inf.email}:`, roleError);
        await supabaseAdmin.auth.admin.deleteUser(userId);
        results.push({ email: inf.email, success: false, error: `Role: ${roleError.message}` });
        continue;
      }

      // 4. Update influencers row with user_id
      const { error: updateError } = await supabaseAdmin
        .from("influencers")
        .update({ user_id: userId })
        .eq("id", inf.id);

      if (updateError) {
        console.error(`Update error for ${inf.email}:`, updateError);
        results.push({ email: inf.email, success: false, error: `Update influencer: ${updateError.message}` });
        continue;
      }

      results.push({ email: inf.email, success: true });
    }

    const successes = results.filter((r) => r.success).length;
    const failures = results.filter((r) => !r.success).length;

    return new Response(
      JSON.stringify({ summary: { total: results.length, successes, failures }, results }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
