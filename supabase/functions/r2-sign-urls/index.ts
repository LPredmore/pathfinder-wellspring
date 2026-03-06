import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * AWS Signature V4 – minimal implementation for S3-compatible GET pre-signing.
 * Works with Cloudflare R2.
 */

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256(
  key: ArrayBuffer | Uint8Array,
  message: string
): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key instanceof ArrayBuffer ? key : key.buffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(message));
}

async function sha256Hex(data: string): Promise<string> {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data)
  );
  return toHex(hash);
}

async function getSigningKey(
  secretKey: string,
  dateStamp: string,
  region: string,
  service: string
): Promise<ArrayBuffer> {
  let key: ArrayBuffer = await hmacSha256(
    new TextEncoder().encode("AWS4" + secretKey),
    dateStamp
  );
  key = await hmacSha256(key, region);
  key = await hmacSha256(key, service);
  key = await hmacSha256(key, "aws4_request");
  return key;
}

interface SignParams {
  endpoint: string; // e.g. https://xxxx.r2.cloudflarestorage.com
  bucket: string;
  key: string; // object key inside the bucket
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
  expiresIn?: number; // seconds, default 3600
}

async function presignGetUrl(params: SignParams): Promise<string> {
  const {
    endpoint,
    bucket,
    key,
    accessKeyId,
    secretAccessKey,
    region = "auto",
    expiresIn = 3600,
  } = params;

  const now = new Date();
  const dateStamp = now.toISOString().replace(/[-:]/g, "").slice(0, 8);
  const amzDate = dateStamp + "T" + now.toISOString().replace(/[-:]/g, "").slice(9, 15) + "Z";
  const credentialScope = `${dateStamp}/${region}/s3/aws4_request`;
  const credential = `${accessKeyId}/${credentialScope}`;

  // Encode the object key (but NOT the leading slash)
  const encodedKey = key
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");

  const canonicalUri = `/${bucket}/${encodedKey}`;

  const queryParams = new URLSearchParams({
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": credential,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(expiresIn),
    "X-Amz-SignedHeaders": "host",
  });
  // URLSearchParams sorts aren't guaranteed – we need canonical (sorted) order
  queryParams.sort();
  const canonicalQueryString = queryParams.toString();

  const host = endpoint.replace(/^https?:\/\//, "");
  const canonicalHeaders = `host:${host}\n`;
  const signedHeaders = "host";

  const payloadHash = "UNSIGNED-PAYLOAD";

  const canonicalRequest = [
    "GET",
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const canonicalRequestHash = await sha256Hex(canonicalRequest);

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    canonicalRequestHash,
  ].join("\n");

  const signingKey = await getSigningKey(secretAccessKey, dateStamp, region, "s3");
  const signature = toHex(await hmacSha256(signingKey, stringToSign));

  return `${endpoint}${canonicalUri}?${canonicalQueryString}&X-Amz-Signature=${signature}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paths } = (await req.json()) as { paths: string[] };

    if (!Array.isArray(paths) || paths.length === 0) {
      return new Response(
        JSON.stringify({ error: "paths array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const endpoint = Deno.env.get("R2_ENDPOINT")!;
    const bucket = Deno.env.get("R2_BUCKET_NAME")!;
    const accessKeyId = Deno.env.get("R2_ACCESS_KEY_ID")!;
    const secretAccessKey = Deno.env.get("R2_SECRET_ACCESS_KEY")!;

    const signed: Record<string, string> = {};

    await Promise.all(
      paths.map(async (p) => {
        const url = await presignGetUrl({
          endpoint,
          bucket,
          key: p,
          accessKeyId,
          secretAccessKey,
          expiresIn: 3600,
        });
        signed[p] = url;
      })
    );

    return new Response(JSON.stringify({ signed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("r2-sign-urls error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
