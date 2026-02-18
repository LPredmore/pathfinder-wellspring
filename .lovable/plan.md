

## Comprehensive Privacy Policy Page for Google OAuth Verification

### Overview

Replace the placeholder Privacy Policy page with a full, structured privacy policy that satisfies Google's API Services User Data Policy requirements. This will cover general site data practices, PHI/medical records, and a dedicated Google API section addressing every point Google flagged.

### What Changes

**Single file modified: `src/pages/Privacy.tsx`**

Replace the placeholder paragraph with a complete privacy policy containing these sections:

### Privacy Policy Content Outline

**1. Introduction / Effective Date**
- ValorWell is a mental health services company serving veterans, military families, and clinicians.
- Contact: info@valorwell.org

**2. Information We Collect**
- Account and profile information (name, email, credentials)
- Protected Health Information (PHI) for clients receiving therapy services
- Usage data and analytics (Google Analytics, Google Ads conversion tracking)

**3. Google User Data (dedicated section -- required by Google)**
- **Data Accessed**: Via OAuth, ValorWell accesses clinician Google Calendar data using the following scopes:
  - `calendar.events` -- read/write calendar events for appointment syncing
  - `calendar.calendarlist.readonly` -- read calendar list to select which calendar to sync
  - `calendar.events.freebusy` -- read free/busy status for scheduling availability
- **Data Usage**: Google Calendar data is used solely to sync clinician appointments between the ValorWell EHR platform and the clinician's Google Calendar. No other purpose.
- **Data Sharing**: Google user data is NOT shared with any third parties. Data flows directly between Google's API and the ValorWell application.
- **Data Storage and Protection**: Calendar sync data is stored in a Supabase-hosted database secured with row-level security, encrypted at rest and in transit (TLS/HTTPS). Access is restricted to authenticated clinicians viewing their own data.
- **Data Retention and Deletion**: Google Calendar sync data is retained only while a clinician is actively employed/contracted with ValorWell. Upon separation, their synced calendar data is deleted. Clinicians may also request deletion at any time by contacting info@valorwell.org.
- **Compliance**: ValorWell's use of Google user data adheres to the Google API Services User Data Policy, including the Limited Use requirements.

**4. Protected Health Information (PHI)**
- PHI is collected and handled in compliance with HIPAA.
- Retention: PHI is retained for 10 years after the last date of activity on a client's account, per medical recordkeeping requirements.
- Clients may request deletion of their data by contacting info@valorwell.org, subject to legal retention obligations.

**5. How We Use Information**
- Providing and improving mental health services
- Scheduling and calendar synchronization for clinicians
- Analytics and conversion tracking (Google Analytics, Google Ads)
- Communication about services

**6. Data Sharing**
- We do not sell user data.
- We do not share Google user data with third parties.
- We may share de-identified, aggregated analytics data.
- We may disclose information as required by law.

**7. Data Security**
- Encryption in transit (TLS/HTTPS) and at rest
- Row-level security on database
- Access controls and authentication

**8. Your Rights**
- Request access to your data
- Request deletion of your data (subject to legal retention requirements)
- Contact info@valorwell.org for any data requests

**9. Changes to This Policy**
- We may update this policy; changes posted on this page with updated effective date.

**10. Contact**
- Email: info@valorwell.org

### Technical Details

- The page will use the same `Layout`, `Hero`, and `SEO` components as the current placeholder.
- Content will be structured with HTML heading tags (`h2`, `h3`) and paragraphs inside the existing `prose` container for consistent styling.
- The effective date will be set to the current date (February 18, 2026).
- No new dependencies or components needed.

### What This Solves

Google's rejection cited three issues:
1. **Missing data collection/storage/usage disclosures** -- Addressed by the full policy, especially the dedicated Google User Data section.
2. **Demo video not showing OAuth consent screen** -- This is something you'll need to record separately (not a code change). Record a screencast showing: open ValorWell EHR, click "Connect Google Calendar", see the Google OAuth consent screen, grant permissions, return to app.
3. After publishing these changes, reply to Google's email with the updated privacy policy URL (https://valorwell.org/privacy) and your demo video link.

