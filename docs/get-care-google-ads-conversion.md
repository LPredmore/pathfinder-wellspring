# Get Care Google Ads conversion

Get Care uses the shared sitewide form tracking contract. See
[Sitewide Google form tracking](sitewide-google-form-tracking.md).

A newly created website client account emits:

- `vw_form_success`
- `client_signup_success`

The form has the stable HTML identity:

```text
id: valorwell-get-care-signup
name: valorwell_get_care_signup
```

## Authoritative success boundary

The events fire only when `register-client-website` returns:

```json
{ "conversionEligible": true }
```

Billing Hub sets that field to `true` only when a new account is provisioned. It
is false for an existing account, a throttled repeat, a honeypot submission, and
a validation or provisioning failure. If the field is missing, the website fails
closed and emits no successful-form event.

## Google Ads

The "Sign-up (1)" conversion action `AW-16798905432/e1LYCMH0ud0cENjoq8o-` is
fired in code from the confirmed-success boundary in
`src/lib/clientSignupConversionTracking.ts`, deduplicated by `submissionId`.

It was created in the Ads UI as a page-load conversion, but the confirmation
renders in place without a URL change, so the event snippet is fired directly
at success instead of being pasted into a thank-you page. Do not add the
snippet to the page markup as well — that would double count.


The conversion event contains stable form metadata and the page origin/pathname.
It does not contain submitted values, query strings, fragments, or `user_data`.
