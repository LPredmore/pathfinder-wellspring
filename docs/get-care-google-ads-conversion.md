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
- the current page URL
- the signup source

It must never contain a name, email address, phone number, intake answer, or
other user-provided value.

A standard `form_submit` event is emitted at the same confirmed-success point
for Google tag diagnostics and general form reporting. It is not the
recommended conversion-selection signal because other forms can legitimately
use the same standard event name.

## Google destinations

The verified active Google Ads tag is:

```text
AW-16798905432
```

The sitewide Google tag must load this ID and configure it once. The retired
`AW-11339741081` destination must not be restored.

## Google Ads action

Create or select a website conversion with these settings:

- Category: **Submit lead form**
- Source: **Google tag** or the linked Google Analytics property receiving the event
- Event: **client_signup_success**
- Count: **One**
- Optimization: **Primary** only for campaigns intended to acquire new clients
- Attribution: **Data-driven**, when available

Do not use a page-load rule for `/get-care`. A page visit is not a completed
signup. Do not select the generic `form_submit` event as the authoritative
conversion when `client_signup_success` is available.

The previous action named `Submit lead form (Page load
www.valorwell.org/get-care)` must be removed from account-default goals or made
secondary so page visits cannot be counted as leads.

## Sensitive-category requirement

This conversion relates to a mental-health care signup. Enhanced conversions
and any user-provided-data collection must be explicitly disabled for this
conversion action. Standard conversion measurement may remain enabled.

## Production verification

After publishing the current `main` branch through Lovable's Cloudflare
integration:

1. Start Tag Assistant from the intended Google Ads conversion action.
2. Open `/get-care` and submit one controlled successful signup.
3. Confirm `client_signup_success` is sent to the current Google destinations.
4. Confirm the event appears only after the backend response succeeds.
5. Confirm the payload contains no submitted identity or contact values.
6. Repeat a failed signup and confirm no `client_signup_success` event appears.
7. Confirm the conversion action is not triggered by merely loading `/get-care`.

Google Ads reporting and status can update later than the Tag Assistant event;
Tag Assistant is the immediate browser-level verification source.
