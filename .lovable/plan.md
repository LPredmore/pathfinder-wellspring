

## Add Google Ads Conversion Tracking

### Overview

Update the therapist application form to fire a Google Ads conversion event when a form is successfully submitted. This allows Google Ads to track conversions even though it cannot detect the JavaScript-rendered form.

### Change

**File:** `src/components/forms/TherapistApplicationForm.tsx`

Update the `onSubmit` function to include the Google Ads conversion event alongside the existing Google Analytics event:

```typescript
// Fire Google Analytics event (existing)
if (window.gtag) {
  window.gtag("event", "form_submit", {
    event_category: "therapist_application",
    event_label: "application_submitted",
  });

  // Fire Google Ads conversion event (new)
  window.gtag("event", "conversion", {
    send_to: "AW-16798905432/6RqRCJ2PnfMbENjoq8o-",
  });
}
```

### How It Works

1. User fills out and submits the therapist application form
2. Form data saves to Supabase
3. On success, the code fires:
   - A Google Analytics event for GA4 tracking
   - A Google Ads conversion event with your specific conversion ID and label
4. Google Ads registers this as a conversion for your campaign

### Verification

After implementation, you can verify it's working by:
1. Submitting a test application
2. Checking Google Ads > Goals > Conversions to see the conversion registered
3. Using Google Tag Assistant browser extension to see the conversion event fire

