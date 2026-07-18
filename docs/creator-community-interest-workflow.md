# Creator, promoter and community interest workflow

Billing Hub is canonical for creator, promoter, storyteller, supporter, connector, funding, Beyond The Yellow, and general community-interest submissions. These records are relationship contacts and outreach prospects, not Auth users.

## Public flow

`/beyondtheyellow` renders `UnifiedBtyForm` for a visitor's own creator/community interest and preserves the existing nomination lane through `BtyNominationForm`. The anonymous browser calls only the narrow Billing Hub RPCs `submit_website_creator_interest(jsonb)` and `submit_website_bty_nomination(jsonb)`. It never inserts directly into a table, creates an account, accepts a password, uploads an avatar, or uses a source-project session. The older broad BTY RPC is not used by these forms.

The function writes one raw `website_submissions` event per accepted submission and creates or merges the canonical relationship contact, interest profile, roles, and social profiles. Live records use source `valorwell_website_interest`; historical records retain source `therapist_crm_interest_migration`.

Each deliberate new submission gets a fresh `submission_key`; retries reuse the same key until the server acknowledges success. Billing Hub normalizes email, preserves raw history, reuses an unambiguous contact, preserves prior nonblank values, and prevents duplicate roles and social accounts. Contact lifecycle decisions remain staff actions.

## Field map

| Website control | RPC field | Canonical purpose |
| --- | --- | --- |
| First/last/preferred name | `first_name`, `last_name`, `preferred_name` | Relationship identity |
| Email, phone, state | `email`, `phone`, `state` | Contact and normalized deduplication |
| Veteran affiliation and connection | `veteran_affiliation`, `veteran_connection` | Filterable canonical affiliation plus optional background |
| Why interested | `motivation` | Interest-profile motivation |
| How they want to participate | `participation` | Structured participation narrative |
| Interest choices | `relationship_types` | Existing active contact-role codes |
| Story willingness | `willing_to_share` | Interest-profile sharing preference |
| Comfort level | `comfort_level` | `public_story`, `private_conversation`, `behind_the_scenes`, `flexible`, or `not_sure` |
| Personal mission | `personal_mission` | Interest-profile mission |
| Fundraising goal | `fundraising_goal` | Optional funding context |
| Additional information | `additional_info` | Optional staff context |
| Contact consent | `consent` | Required contact permission |
| Social rows | `social_profiles[]` | Platform, handle, URL, and optional integer follower count |

The only submitted role codes are active canonical codes: `creator`, `bty_promoter`, `storyteller`, `podcaster`, `connector`, `funder`, `supporter`, `general_mission_interest`, and `bty_story_submitter`.

Empty optional values are omitted. Competition, avatar, password, Auth, and legacy user identifiers are intentionally excluded.

## Security model

- The browser contains only publishable/anonymous keys, never a service-role key.
- Anonymous access is limited to the dedicated validated RPC; relationship tables and raw submissions are not directly readable or writable.
- The RPC uses a strict input whitelist, payload-size limits, fixed role and comfort catalogs, safe errors, a fixed source designation, and a rolling per-email intake limit after idempotent retry handling.
- Conversion events contain only the event name and public page identifier; form contents are not logged.
- The public workflow does not change Auth, `profile_id`, staff images, provider data, or storage policies.
- Staff queue and detail operations belong to the authenticated Billing Hub management application and its tenant-scoped policies.

## Configuration

This cutover adds no environment variable and no secret. The browser uses the existing Billing Hub publishable key; it must never receive a secret or service-role key. The source-project client remains only for unrelated media, donation, publishing, and authenticated Website `site_config` administration.

## Legacy cutover

The public `/influencer` URL redirects to `/beyondtheyellow`. The old portal, creator form, login dialog, source influencer CRUD, and browser compatibility proxy are removed. After the deployed Website is confirmed on both narrow RPCs, the broad legacy `submit_website_bty_submission` grant is retired from browser roles. The four interest-only Edge Functions return an auditable retirement response and require JWT verification. Therapist CRM remains active for unrelated Website dependencies.

The Website admin route retains authenticated source `site_config` editing only. Clinician and OCS forms call their existing Billing Hub RPCs explicitly.

## Operations

New submissions enter Billing Hub as unreviewed inbound interest. Staff reviews them in the `Creator, Promoter & Community Interest` queue, assigns an owner, selects evidence-based outreach/review states, records one next action and due date, and adds interactions using the canonical relationship model. A form submission alone does not imply partner, engaged, sponsor, or contacted status.

## Verification

Run:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Production verification must cover a new anonymous submission, a repeat normalized-email submission, zero and multiple social rows, validation failure, queue/detail rendering, staff updates, and Auth non-interference. Use synthetic data and retain or clean it according to established policy.

## Rollback

1. Redeploy Website commit `bca7c523d4cb871ef366f7d8712969bc1d7face5` to restore the pre-cutover frontend.
2. Redeploy prior versions of the four source Edge Functions only if the canonical Billing Hub workflow must be abandoned and product/security owners explicitly approve reactivating the Auth-creating legacy system: `create-mission-partner` v20, `send-welcome-email` v17, `backfill-competitor-auth` v12, and `send-bulk-welcome` v11. If that rollback also requires the broad BTY database RPC, use `retire_broad_bty_public_rpc_rollback.sql` only during the same approved rollback window.
3. Do not delete or roll back historical relationship records. Disable anonymous execution of the new RPC if intake must be paused.
4. Follow the Billing Hub migration's additive rollback instructions for its function, view, grants, and additive columns. Preserve raw submissions and audit history.
5. Reconcile Auth, staff, clinician contacts, submissions, and historical migration fingerprints after any rollback.

Rollback must never copy passwords, create legacy Auth users, populate relationship `profile_id`, delete source records, or modify staff/provider image storage.
