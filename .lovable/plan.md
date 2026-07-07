## Delete orphaned page files

Remove these files (none are imported by App.tsx, Footer, or sitemap — safe to delete):

**Root `src/pages/`:**
- Therapy.tsx, UrgentHelp.tsx, Videos.tsx, FundAccessToCare.tsx, Funders.tsx, GetStarted.tsx, HowItWorks.tsx, Index.tsx, MissionOnePager.tsx, MonthlySupporters.tsx, OperationClaimsSuccess.tsx (the old stub — the active page is `OperationClaimsSuccessPage.tsx`), OurModel.tsx, Partners.tsx, SponsorCare.tsx, Sponsors.tsx, Therapists.tsx

**`src/pages/media/`:**
- MediaOverview.tsx, YouTubePodcast.tsx
- Then remove the now-empty `src/pages/media/` directory

**Keep** (per your instruction): `FAQ.tsx`, `Support.tsx` — leave orphaned in the codebase, no route wired.

## Wire the 10 authority pages under `/authority/*` in App.tsx

Add these routes (all files already exist at `src/pages/authority/...`):

| Route | Component |
|---|---|
| `/authority/resources` | Resources |
| `/authority/family-systems` | FamilySystems |
| `/authority/military-family-therapy` | MilitaryFamilyTherapy |
| `/authority/veteran-mental-health-care` | VeteranMentalHealthCare |
| `/authority/va-community-care-mental-health` | VACommunityCareMentalHealth |
| `/authority/resources/champva` | ResourcesChampva |
| `/authority/resources/documentation` | ResourcesDocumentation |
| `/authority/resources/family-systems` | ResourcesFamilySystems |
| `/authority/resources/va-community-care` | ResourcesVACommunityCare |
| `/authority/resources/veteran-mental-health` | ResourcesVeteranMentalHealth |

Update the existing legacy redirects in App.tsx so old flat paths forward to the new `/authority/*` equivalents instead of `/`, `/veterans`, or `/families`:
- `/resources` → `/authority/resources`
- `/veteran-mental-health-care` → `/authority/veteran-mental-health-care`
- `/va-community-care-mental-health` → `/authority/va-community-care-mental-health`
- `/military-family-therapy` → `/authority/military-family-therapy`
- `/family-systems` → `/authority/family-systems`

## Not touched

- No changes to the internal `canonical` / `breadcrumbs` strings inside each authority page (they still say `/resources`, `/champva-mental-health`, etc.). Say the word if you also want those rewritten to match the new `/authority/*` URLs — it's a separate content pass.
- No changes to `public/sitemap.xml`.
- No changes to `Footer.tsx`.