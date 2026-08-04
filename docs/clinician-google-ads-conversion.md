# Clinician Google Ads conversion

## Verified destination

Google Ads issued the following event destination for the `Therapist Application Submitted` conversion action:

```text
AW-16798905432/XWcdCMz27tscENjoq8o-
```

This identifier is public configuration, not a secret. The website keeps it in source control so the production build cannot omit the conversion through a missing environment variable.

The shared Google tag in `index.html` already configures the required Ads account:

```js
gtag("config", "AW-16798905432");
```

Do not add another Google tag loader or paste the conversion snippet into `index.html`. The website is a React single-page application, and placing the snippet in the document head would record conversions on ordinary page loads rather than on successful applications.

## Trigger boundary

The conversion is emitted only after the Billing Hub `register-clinician-interest` function returns `ok: true`. Validation failures and backend failures do not record a lead.

A successful registration emits:

1. `form_submit` for analytics continuity.
2. `conversion` to `AW-16798905432/XWcdCMz27tscENjoq8o-`.

The website submission key is passed as `transaction_id` so retries of the same accepted submission can be deduplicated by Google Ads.

## Enhanced conversions

Enhanced conversions remain managed through the existing Google tag. The conversion event in this implementation supplies the required action trigger; the existing Google tag is responsible for any configured enhanced-conversion user-data handling.

## Deployment and verification

After merging and publishing the website:

1. Open Google Tag Assistant for `valorwell.org`.
2. Navigate to `/clinicians`.
3. Submit the form with a valid test address.
4. Confirm the Billing Hub registration succeeds and the thank-you state appears.
5. Select `AW-16798905432` in Tag Assistant.
6. Confirm a `Conversion` hit is listed with `send_to` equal to `AW-16798905432/XWcdCMz27tscENjoq8o-`.
7. Confirm the conversion does not fire merely from loading `/clinicians` or from a failed submission.

## Google Ads configuration

The repository event should be paired with the manually coded `Therapist Application Submitted` conversion action. Any older URL-based conversion that counts a visit to `/clinicians` should remain secondary or be removed from account-default goals to prevent ordinary page visits from being treated as submitted applications.
