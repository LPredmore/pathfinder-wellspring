import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve((request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  console.warn("[retired-endpoint] create-mission-partner request rejected");
  return new Response(
    JSON.stringify({ error: "This endpoint has been retired." }),
    { status: 410, headers },
  );
});
