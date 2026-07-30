# Make the `/donate` cross-domain handoff explicit

## Verified diagnosis

- `/donate` ultimately sends visitors from ValorWell to `https://givebutter.com/valorwellhelp`.
- Google Tag Assistant therefore correctly reports that the visitor is going to a different domain; callback timing cannot make Givebutter part of `valorwell.org`.
- The current implementation automatically performs that navigation after the conversion callback or fallback timeout, so Tag Assistant will disconnect even when the ValorWell conversion request succeeds.

## Implementation

1. Stop automatically navigating away from `/donate` after the destination and attribution request are ready.
2. Keep the visitor on a branded, tagged ValorWell handoff page with one clear **Continue to secure donation** button.
3. Fire the Google Ads donation conversion from that button and navigate to Givebutter only after Google's callback, retaining a bounded fallback for blocked or unavailable tags.
4. Preserve the existing `donate-go` request and all `gclid`, `gbraid`, `wbraid`, and UTM attribution handling.
5. Prevent duplicate conversion sends from repeated clicks while the handoff is in progress.

## Verification

- Confirm `/donate` remains on `valorwell.org` until the visitor clicks the button.
- Confirm one donation conversion request completes before navigation to Givebutter.
- Confirm the failed-edge-function and blocked-tag paths still reach Givebutter after a click.
- Confirm attribution parameters remain preserved.

## Important limitation

The final navigation will still be cross-domain because Givebutter owns the donation page. This change makes that transition intentional and observable; it cannot cause Tag Assistant to remain connected after leaving ValorWell.