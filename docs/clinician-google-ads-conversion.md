# Clinician Google Ads conversion

## Canonical destination

Successful clinician-interest registrations belong to the ValorWell Google Ads account `AW-11339741081`.

The conversion action label is account- and action-specific. Configure the complete value supplied by Google Ads as a Vite build variable:

```text
VITE_GOOGLE_ADS_CLINICIAN_CONVERSION_SEND_TO=AW-11339741081/<CONVERSION_LABEL>
```

Do not reuse a conversion label from another Ads account. The website rejects missing, malformed, account-only, and noncanonical destinations.

## Trigger boundary

The conversion is emitted only after the Billing Hub `register-clinician-interest` function returns `ok: true`. Validation failures and backend failures do not record a lead.

A successful registration emits:

1. `form_submit` for analytics continuity.
2. `conversion` to the configured Google Ads conversion action.

The website submission key is passed as `transaction_id` so retries of the same accepted submission can be deduplicated by Google Ads.

## Deployment

Set `VITE_GOOGLE_ADS_CLINICIAN_CONVERSION_SEND_TO` in the production build environment before publishing the website. This value is a public Google Ads identifier, not a secret.

After deployment:

1. Open Google Tag Assistant for `valorwell.org`.
2. Submit the form at `/clinicians` with a valid test address.
3. Confirm the Billing Hub registration succeeds and the thank-you state appears.
4. Select `AW-11339741081` in Tag Assistant.
5. Confirm a `Conversion` hit is listed with the exact configured `send_to` destination.
6. Confirm no clinician conversion is sent to `AW-16798905432`.

## Failure behavior

If the variable is absent or invalid, the successful form event remains available to analytics, but the website deliberately does not send an Ads conversion to an uncertain destination. This prevents silent attribution to a retired or unrelated Ads account.
