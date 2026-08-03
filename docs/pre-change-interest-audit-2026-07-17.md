# Creator and community interest pre-change audit

Recorded read-only on 2026-07-17 before the Website cutover.

## Historical migration reconciliation

| Check | Verified value |
| --- | ---: |
| Source influencers | 53 |
| Source influencer platforms | 69 |
| Source current competitors | 5 |
| Source avatar objects | 31 |
| Billing Hub migrated contacts | 53 |
| Billing Hub interest profiles | 53 |
| Billing Hub historical submissions | 53 |
| Billing Hub creator roles | 53 |
| Billing Hub social profiles | 69 |
| Linked relationship avatars | 30 |
| Preserved orphan avatars | 1 |
| Migrated contacts with `profile_id` | 0 |
| Migrated emails matching Billing Hub Auth | 0 |
| Separate historical clinician contacts | 34 |
| Staff records | 18 |
| Staff/provider image URLs | 9 |
| Staff images in `relationship-avatars` | 0 |

The historical source is `legacy_relationship_import`; the migration key is `legacy-relationship-import-2026-07-17`. The completed transfer must not be replayed unless a verified mismatch is found.

## Website dependency audit

Before cutover, `/influencer`, `InfluencerPortal`, `AdminDashboard`, `CreatorApplicationForm`, and `InfluencerLoginDialog` read or wrote the source `influencers`, `influencer_platforms`, `sm_platforms`, and `avatars` systems. A browser-side compatibility proxy also translated legacy intake-table inserts.

The approved public reuse point is `/beyondtheyellow`. Unrelated source-project media, donation, publishing, site-configuration, and campaign integrations remain outside this migration.

Four interest-only Edge Functions were identified for retirement: `create-mission-partner`, `send-welcome-email`, `backfill-competitor-auth`, and `send-bulk-welcome`.
