// This file remains the legacy Website Supabase client for media, donations,
// publishing, and the existing influencer/admin portal. Public intake inserts
// are routed to Billing Hub so no new clinician, OCS, or BTY leads are written
// to Therapist CRM.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const LEGACY_SUPABASE_URL = "https://asjhkidpuhqodryczuth.supabase.co";
const LEGACY_SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzamhraWRwdWhxb2RyeWN6dXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNzIzNDYsImV4cCI6MjA4NTg0ODM0Nn0.kb_iP02Fu-NNJtemRnLh7DhwaAybUEMUYQFaFWNxDOA";

const BILLING_HUB_URL = "https://ahqauomkgflopxgnlndd.supabase.co";
const BILLING_HUB_PUBLISHABLE_KEY = "sb_publishable_VVcb2HRrfnMm-T1Y0i7Gtw_qLhuPMYT";

const legacySupabase = createClient<Database>(
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

const submissionKey = () =>
  globalThis.crypto?.randomUUID?.() ??
  `website-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const firstRow = (rows: unknown) =>
  Array.isArray(rows) ? (rows[0] ?? {}) : (rows ?? {});

const intakeRpcByTable: Record<string, string> = {
  therapist_applications: "submit_website_clinician_application",
  ocs_inquiries: "submit_website_ocs_inquiry",
  bty_submissions: "submit_website_bty_submission",
};

/**
 * Compatibility router for existing form components.
 *
 * Only INSERT calls for the three legacy intake tables are intercepted.
 * SELECT/UPDATE/DELETE operations continue to use Therapist CRM until the
 * remaining admin, campaign, media, donation, and portal systems are migrated.
 */
export const supabase = new Proxy(legacySupabase, {
  get(target, property, receiver) {
    if (property !== "from") {
      const value = Reflect.get(target, property, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    }

    return (table: string) => {
      const legacyBuilder = target.from(table as never);
      const rpcName = intakeRpcByTable[table];

      if (!rpcName) return legacyBuilder;

      return new Proxy(legacyBuilder, {
        get(builderTarget, builderProperty) {
          if (builderProperty === "insert") {
            return async (rows: unknown) => {
              const payload = firstRow(rows) as Record<string, unknown>;
              const { data, error } = await billingHubSupabase.rpc(rpcName, {
                p_payload: {
                  submission_key: submissionKey(),
                  ...payload,
                  source_page:
                    payload.source_page ??
                    (table === "therapist_applications"
                      ? "/clinicians"
                      : table === "ocs_inquiries"
                        ? "/operation-claims-success"
                        : "/beyondtheyellow"),
                  user_agent:
                    payload.user_agent ??
                    (typeof navigator !== "undefined" ? navigator.userAgent : null),
                },
              });
              return { data, error };
            };
          }

          const value = Reflect.get(builderTarget, builderProperty, builderTarget);
          return typeof value === "function" ? value.bind(builderTarget) : value;
        },
      });
    };
  },
}) as typeof legacySupabase;
