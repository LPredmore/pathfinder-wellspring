# Get Care Google Ads conversion contract

This contract is intentionally event-based. URL and page-load rules are not an
acceptable substitute for confirmed signup completion.

## Authoritative signal

A new website client account is represented by the event:

```text
client_signup_success
```

The event fires only when `register-client-website` explicitly returns:

```json
{ "conversionEligible": true }
```

Billing Hub sets that field to `true` only when the canonical `register-client`
function actually provisions a new account. It is `false` for:

- an already-existing account
- a repeated request suppressed by the website throttle
- a honeypot or bot submission
- a validation or provisioning failure

If the new account is created but the access-email request fails, the response
uses `ok: false` and `conversionEligible: true`. The one legitimate new-account
lead is still recorded while the website displays the access-email error.

The event is not fired when the visitor opens the modal, starts the form, clicks
the submit button, fails browser validation, or receives an ineligible generic
success response. If the backend omits `conversionEligible`, the website fails
closed and does not record a conversion.

The event contains only:

- the generated website submission ID
- stable form metadata
- the page origin and pathname
- the signup source

The page destination excludes the URL query string and fragment. The event must
not contain submitted form values or other user-provided values.

A standard `form_submit` event is emitted at the same conversion-eligible point
for Google tag diagnostics and general form reporting. It is not the
conversion-selection signal because other forms can legitimately use the same
standard event name.

## Canonical Google destinations

The canonical sitewide Google tag supplied for the current Google Ads setup is:

```text
G-H5X3D2DGKB
```

The verified active Google Ads destination is:

```text
AW-16798905432
```

The site must load `G-H5X3D2DGKB` once and configure `AW-16798905432` in the
same tag block. The retired destinations `G-TZMBM6V5DW` and `AW-11339741081`
must not be restored.

## Google Ads action

Create or select exactly one website conversion with these settings:

- Category: **Submit lead form**
- Data source: the linked Google Analytics property receiving `G-H5X3D2DGKB`
- Existing event: **client_signup_success**
- Count: **One**
- Optimization: **Primary** for the client-acquisition campaigns that should bid
  toward newly created client accounts
- Attribution: **Data-driven**, when available

Do not create a codeless form-submission rule for `/get-care`. The browser form
uses an asynchronous registration request, so a generic form detector can
observe a submission attempt before the backend confirms a new account. The
explicit `client_signup_success` event is the authoritative new-account signal.

The previous action named `Submit lead form (Page load
www.valorwell.org/get-care)` must be removed from account-default goals or made
secondary so page visits cannot be counted as leads.

## Sensitive-category requirement

This conversion relates to a care signup. Enhanced conversions and any
user-provided-data collection must be explicitly disabled for this conversion
action. Standard conversion measurement may remain enabled.

## Production verification

After deploying the Billing Hub function and publishing the corresponding
website `main` branch through Cloudflare:

1. Start Tag Assistant on `/get-care`.
2. Submit one controlled signup using an email address that has never existed in
   Billing Hub.
3. Confirm `client_signup_success` is sent to `G-H5X3D2DGKB` and the connected
   Google destinations.
4. Submit the same email again and confirm no new `client_signup_success` event
   appears.
5. Confirm the event payload contains no submitted values, query string, or
   fragment.
6. Confirm a failed or honeypot submission produces no conversion event.
7. Confirm merely loading `/get-care` does not record a conversion.
8. In Google Analytics, confirm the event is received and mark it as a key event
   if the Google Ads import workflow requires that status.
9. In Google Ads, select the existing `client_signup_success` event under the
   **Submit lead form** category and confirm the action is configured as **One**.

Google Ads and Google Analytics status indicators can update later than the Tag
Assistant event. Tag Assistant is the immediate browser-level verification
source.
