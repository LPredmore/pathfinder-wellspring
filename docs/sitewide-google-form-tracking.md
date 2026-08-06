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

## Required Google account configuration

Use the verified Google Ads customer account:

```text
ValorWell Foundation
691-549-0774
```

The Google Analytics property receiving measurement ID `G-H5X3D2DGKB` must be
linked to that customer account, and Google Ads auto-tagging must be enabled.

Disable automatic **Form interactions** collection in the Analytics web stream
or Google tag automatic-event settings. The application deliberately sends its
own `form_submit` only after confirmed success. Leaving automatic form detection
on can create an additional attempt-level `form_submit` before an asynchronous
React form has actually succeeded.

## Creating Google Ads conversions without more website code

Do not choose **Set up manually using code** for these forms. That path creates a
new conversion label and requires another event snippet.

Instead:

1. Produce one controlled successful submission so the event appears in Google
   Analytics.
2. Mark the desired event as a key event if Google has not already done so.
3. In Google Ads customer `691-549-0774`, create a website conversion using the
   linked Google Analytics property and select the existing event.

For a conversion representing all successful public forms, select
`form_submit`. For a conversion representing one specific form, select that
form's stable event from the table above.

No repository or deployment change is required when another Google Ads
conversion is created from one of these existing events.

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
