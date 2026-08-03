import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Billing Hub configuration: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are required.",
  );
}

/**
 * Authenticated website client. Billing Hub is the website's only Supabase
 * project; no legacy-project fallback or compatibility routing is permitted.
 */
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);

/**
 * Sessionless client for anonymous public website submissions. It uses the
 * same Billing Hub project while intentionally avoiding persisted auth state.
 */
export const billingHubSupabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);

export const createWebsiteSubmissionKey = () =>
  globalThis.crypto?.randomUUID?.() ??
  `website-${Date.now()}-${Math.random().toString(36).slice(2)}`;
