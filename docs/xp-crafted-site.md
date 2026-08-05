# XP Crafted website

## Purpose

`xpcrafted.valorwell.org` is a standalone, family-supervised landing page for XP Crafted, a 10-year-old artist's handmade gamer-art project.

The page is intentionally isolated from the main ValorWell navigation and application shell. When the browser hostname is exactly `xpcrafted.valorwell.org`, `src/App.tsx` renders the XP Crafted page directly. The same page is available at `/xpcrafted` on the primary site for review before the subdomain is connected.

## Payments

The first version uses a Venmo business profile rather than a custom checkout or database.

Set the following Vite environment variable in the production publishing environment:

```text
VITE_XP_CRAFTED_VENMO_URL=https://venmo.com/u/<business-profile-username>
```

An optional Facebook page or group link can also be configured:

```text
VITE_XP_CRAFTED_FACEBOOK_URL=https://www.facebook.com/<page-or-group>
```

Until the Venmo URL is set, the public payment card clearly states that the online payment link is being connected and does not send visitors to an invented or unverified account.

## Domain activation

1. Merge and publish the website through the existing ValorWell Lovable project.
2. Verify the preview route at `https://valorwell.org/xpcrafted`.
3. In the Lovable project, connect `xpcrafted.valorwell.org` as an additional custom domain.
4. Complete the DNS record requested by Lovable in the authoritative Cloudflare zone for `valorwell.org`.
5. Verify that `https://xpcrafted.valorwell.org` renders the XP Crafted page and that the main `https://valorwell.org` routes remain unchanged.

## Data and infrastructure

- No Supabase tables, functions, storage buckets, or secrets are required.
- No child contact information is collected or displayed.
- Payment fulfillment remains family-supervised and is handled through the configured Venmo business profile.
- The page links to Paws 4 Autism / PAWSable Life for mission context but does not claim an official partnership.

## Validation

Before production activation:

- Run `npm run typecheck`.
- Run `npm run build`.
- Review desktop and mobile rendering at `/xpcrafted`.
- Confirm the exact Venmo business profile before setting the environment variable.
- Make a small live payment and verify that it lands in the intended business profile before publicly sharing the site.
