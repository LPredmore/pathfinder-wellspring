# Get Care Google Ads conversion contract

This contract is intentionally event-based. URL and page-load rules are not an
acceptable substitute for confirmed signup completion.

## Authoritative signal

A completed website signup is represented by the event:

```text
client_signup_success
```

The event fires only after `register-client-website` returns `{ ok: true }`.
It is not fired when the visitor opens the modal, starts the form, clicks the
submit button, fails browser validation, or receives a backend error.

The event contains only:

- the generated website submission ID
- stable form metadata
- the page origin and pathname
- the signup source

The page destination excludes the URL query string and fragment. The event must
not contain submitted form values or other user-provided values.

A standard `form_submit` event is emitted at the same confirmed-success point
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
  toward completed client signups
- Attribution: **Data-driven**, when available

Do not create a codeless form-submission rule for `/get-care`. The browser form
uses an asynchronous registration request, so a generic form detector can
observe a submission attempt before the backend confirms success. The explicit
`client_signup_success` event is the authoritative completed-signup signal.

The previous action named `Submit lead form (Page load
www.valorwell.org/get-care)` must be removed from account-default goals or made
secondary so page visits cannot be counted as leads.

## Sensitive-category requirement

This conversion relates to a care signup. Enhanced conversions and any
user-provided-data collection must be explicitly disabled for this conversion
action. Standard conversion measurement may remain enabled.

## Production verification

After publishing the current `main` branch through Lovable's Cloudflare
integration:

1. Start Tag Assistant on `/get-care`.
2. Submit one controlled successful signup.
3. Confirm `client_signup_success` is sent to `G-H5X3D2DGKB` and the connected
   Google destinations.
4. Confirm the event appears only after the backend response succeeds.
5. Confirm the payload contains no submitted values, query string, or fragment.
6. Repeat a failed signup and confirm no `client_signup_success` event appears.
7. Confirm merely loading `/get-care` does not record a conversion.
8. In Google Analytics, confirm the event is received and mark it as a key event
   if the Google Ads import workflow requires that status.
9. In Google Ads, select the existing `client_signup_success` event under the
   **Submit lead form** category and confirm the action is configured as **One**.

Google Ads and Google Analytics status indicators can update later than the Tag
Assistant event. Tag Assistant is the immediate browser-level verification
source.
