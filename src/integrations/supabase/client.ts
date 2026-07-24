// The Website still uses the legacy project for unrelated media, donations,
// publishing, and site configuration. Public intake forms call Billing Hub
// RPCs explicitly; no browser-side compatibility routing or direct intake-table
// writes remain here.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const LEGACY_SUPABASE_URL = "https://asjhkidpuhqodryczuth.supabase.co";
const LEGACY_SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzamhraWRwdWhxb2RyeWN6dXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNzIzNDYsImV4cCI6MjA4NTg0ODM0Nn0.kb_iP02Fu-NNJtemRnLh7DhwaAybUEMUYQFaFWNxDOA";

const BILLING_HUB_URL = import.meta.env.VITE_SUPABASE_URL;
const BILLING_HUB_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(
  LEGACY_SUPABASE_URL,
  LEGACY_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);

export const billingHubSupabase = createClient(
  BILLING_HUB_URL,
  BILLING_HUB_PUBLISHABLE_KEY,
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
