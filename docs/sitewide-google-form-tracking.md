# Sitewide Google form tracking

## Purpose

ValorWell uses one website-level form tracking contract. Creating a new Google
Ads conversion for an already registered form must not require another website
conversion snippet or another hardcoded Ads conversion label.

The shared Google tag remains installed once in `index.html`. Every successful
public form submission emits:

1. the standard event `form_submit`
2. one stable event unique to that form

Both events use the configured Google destinations. Neither event contains form
field values, names, email addresses, phone numbers, query strings, fragments,
or `user_data`.

## Registered forms

| Form | Path | Stable HTML id | Stable event |
| --- | --- | --- | --- |
| Client account signup | `/get-care` | `valorwell-get-care-signup` | `client_signup_success` |
| Clinician interest | `/clinicians` | `valorwell-clinician-interest` | `vw_form_submit_clinician` |
| Overflow referral practice | `/clinicians` | `valorwell-overflow-referral` | `vw_form_submit_overflow` |
| BTY guest application | `/beyondtheyellow` | `valorwell-bty-guest-application` | `vw_form_submit_bty_guest` |
| BTY nomination | `/beyondtheyellow` | `valorwell-bty-nomination` | `vw_form_submit_bty_nomination` |
| OCS routing | `/operation-claims-success` | `valorwell-ocs-routing` | `vw_form_submit_ocs` |

`SitewideFormTrackingManager` assigns the same IDs and names to forms rendered
later inside dialogs, conditional sections, or collapsible panels.

## Success boundary

The standard event is emitted only after the application confirms success, not
merely because a visitor clicked a submit button.

- Get Care requires `conversionEligible === true` from Billing Hub.
- Clinician interest requires `response.ok === true`.
- BTY, OCS, and overflow referral forms require successful RPC completion.
- Client-side validation and backend failures do not emit `form_submit`.

## Creating Google Ads conversions

For a conversion representing all successful public forms, use the existing
`form_submit` event.

For a conversion representing one specific form, use that form's stable event
from the table above. The website does not need a new event snippet or conversion
label when the Google Ads action is created.

Do not paste Google Ads event snippets into form components. Do not add another
Google tag loader. Do not use page-load conversions as substitutes for a
successful form submission.

## Verification

After production publish:

1. Open Tag Assistant on the relevant page.
2. Confirm the form has the stable HTML id and name from the table.
3. Submit successfully and confirm exactly one `form_submit` and one stable
   per-form event.
4. Trigger a validation or backend failure and confirm neither success event.
5. Confirm the event payload contains no submitted field values.
6. Confirm the event appears in Google Analytics before creating or importing a
   Google Ads conversion from it.
