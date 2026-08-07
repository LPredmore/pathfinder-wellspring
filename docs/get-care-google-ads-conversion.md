# Get Care Google Ads conversion

Get Care uses the shared sitewide form tracking contract. See
[Sitewide Google form tracking](sitewide-google-form-tracking.md).

A newly created website client account emits:

- `form_submit`
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

Do not paste a Google Ads event snippet into the Get Care form. Create or import
the specific conversion from the existing `client_signup_success` event. Use the
standard `form_submit` event only when the intended conversion is every
successful public form on the site.

The conversion event contains stable form metadata and the page origin/pathname.
It does not contain submitted values, query strings, fragments, or `user_data`.
