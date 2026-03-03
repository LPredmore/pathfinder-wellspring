

## Diagnosis

Your Resend dashboard shows the verified domain is `valorwell.org`. However, in `supabase/functions/send-welcome-email/index.ts` line 68, the sender is hardcoded as:

```
from: "ValorWell <no-reply@valorwell.com>"
```

Resend returns a 403 because `valorwell.com` is not verified — only `valorwell.org` is. The fix is a one-line change: update the `from` address to use `valorwell.org`.

## Change

**File: `supabase/functions/send-welcome-email/index.ts`**
- Change `from: "ValorWell <no-reply@valorwell.com>"` to `from: "ValorWell <no-reply@valorwell.org>"`

Then redeploy the edge function.

