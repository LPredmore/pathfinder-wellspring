# Clinician Google Ads conversion

Clinician-interest submissions now use the shared sitewide form tracking
contract. See [Sitewide Google form tracking](sitewide-google-form-tracking.md).

A successful clinician-interest registration emits:

- `form_submit`
- `vw_form_submit_clinician`

The form has the stable HTML identity:

```text
id: valorwell-clinician-interest
name: valorwell_clinician_interest
```

The events fire only after `register-clinician-interest` returns `ok: true`.
Validation and backend failures do not emit a successful-form event.

Do not add a Google Ads event snippet or hardcoded conversion label to the
clinician form. Create or import the Google Ads conversion from the existing
`vw_form_submit_clinician` event. Use `form_submit` only when the intended
conversion is every successful public form on the site.
