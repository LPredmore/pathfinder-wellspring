# Creator, promoter, and community-interest workflow

Billing Hub is canonical for creator, promoter, storyteller, supporter, connector,
funding, Beyond The Yellow, and general community-interest submissions. These
records are relationship contacts and outreach prospects, not Auth users.

## Public flow

`/beyondtheyellow` renders `UnifiedBtyForm` for a visitor's own creator/community
interest and preserves the nomination lane through `BtyNominationForm`. The
anonymous browser calls only the constrained Billing Hub RPCs
`submit_website_creator_interest(jsonb)` and
`submit_website_bty_nomination(jsonb)`.

The browser never:

- inserts directly into relationship tables;
- creates a user account;
- accepts or stores a password;
- uploads an avatar through this workflow;
- uses a compatibility client or second Supabase project; or
- receives a service-role key.

Each accepted submission writes a raw `website_submissions` event and creates or
merges the canonical relationship contact, interest profile, roles, and social
profiles. Historical import provenance may remain in existing database rows, but
new website submissions use the current website source designation.

Each deliberate submission receives a fresh `submission_key`; retries reuse the
same key until the server acknowledges success. Billing Hub normalizes email,
preserves raw history, reuses an unambiguous contact, preserves prior nonblank
values, and prevents duplicate roles and social accounts. Contact lifecycle
decisions remain staff actions.

## Field map

| Website control | RPC field | Canonical purpose |
| --- | --- | --- |
| First/last/preferred name | `first_name`, `last_name`, `preferred_name` | Relationship identity |
| Email, phone, state | `email`, `phone`, `state` | Contact and normalized deduplication |
| Veteran affiliation and connection | `veteran_affiliation`, `veteran_connection` | Filterable affiliation and optional background |
| Why interested | `motivation` | Interest-profile motivation |
| How they want to participate | `participation` | Structured participation narrative |
| Interest choices | `relationship_types` | Existing active contact-role codes |
| Story willingness | `willing_to_share` | Interest-profile sharing preference |
| Comfort level | `comfort_level` | Public, private, behind-the-scenes, flexible, or undecided preference |
| Personal mission | `personal_mission` | Interest-profile mission |
| Fundraising goal | `fundraising_goal` | Optional funding context |
| Additional information | `additional_info` | Optional staff context |
| Contact consent | `consent` | Required contact permission |
| Social rows | `social_profiles[]` | Platform, handle, URL, and optional integer follower count |

The submitted role codes are active canonical relationship codes. Empty optional
values are omitted. Competition, avatar, password, Auth, and obsolete user
identifiers are intentionally excluded.

## Security model

- The browser contains only the Billing Hub publishable key.
- Anonymous access is limited to dedicated validated RPCs or approved website
  support functions.
- Relationship tables and raw submissions are not directly readable or writable
  by anonymous callers.
- Inputs are allowlisted and size-limited, consent is required, errors are safe,
  and idempotency/rate controls are enforced server-side.
- Conversion events contain only the event name and public page identifier; form
  contents are not written to analytics logs.
- The public workflow does not alter Auth, `profile_id`, staff images, provider
  records, or storage policies.
- Staff queue and detail operations belong to the authenticated Billing Hub CRM
  and its tenant-scoped policies.

## Configuration and ownership

The website uses one Supabase backend: Billing Hub. Both exported browser clients
in `src/integrations/supabase/client.ts` derive from the same
`VITE_SUPABASE_URL` and publishable key. One client may persist an authenticated
session; the public-submission client intentionally does not. Neither is a
fallback or compatibility route.

The website repository owns only narrowly scoped public website support
functions listed in `supabase/config.toml`. It owns no database migrations.
Relationship schema, CRM operations, communication workflows, and lifecycle
management belong to the canonical Billing Hub backend and CRM repository.

## Completed cutover

- `/influencer` redirects to `/beyondtheyellow`.
- The former portal, creator login, password flow, source CRUD, compatibility
  proxy, and website admin route are removed.
- Retired creator-interest and bulk-welcome function source is absent from the
  website repository.
- The website's Supabase configuration identifies Billing Hub.
- CI rejects any second Supabase project, compatibility client, retired function
  directory, or website-owned database migration.

Clinician, OCS, BTY, donation, and other public submissions route to Billing Hub
through their approved RPCs or Edge Functions.

## Operations

New submissions enter Billing Hub as unreviewed inbound interest. Staff reviews
them in the creator/community-interest queue, assigns an owner, selects an
appropriate outreach or review state, records a next action and due date, and
adds interactions using the canonical relationship model. A form submission
alone does not imply partner, engaged, sponsor, or contacted status.

## Verification

Run:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

The repository validation workflow also runs the retired-project whole-tree
audit before installing dependencies. Production verification should cover a
new anonymous submission, a repeat normalized-email submission, zero and
multiple social rows, validation failure, queue/detail rendering, staff updates,
and Auth non-interference. Use synthetic data and retain or remove it according
to established policy.

## Safe rollback

A frontend rollback must use a revision that still targets Billing Hub and passes
the current retired-project audit. Do not restore a compatibility client, second
Supabase project, password-creating workflow, removed admin route, or retired
function implementation.

To pause intake safely:

1. Disable or withdraw the public form entry point.
2. Revoke anonymous execution of the specific intake RPC or disable the approved
   website function, as applicable.
3. Preserve canonical relationship records, raw submissions, and audit history.
4. Re-enable only after the current Billing Hub implementation passes security
   review and end-to-end verification.
