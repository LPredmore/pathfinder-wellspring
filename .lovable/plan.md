# Donate Button Placement Plan — "Gary Vee" Attention-First Approach

Gary's rule: **put the ask where attention is highest, and don't be shy about it — but earn it with story first.** On ValorWell, attention concentrates around Operation Claims Success (OCS) and Beyond The Yellow. Donate placement should ride that attention, not sit hidden in a footer.

All Donate CTAs route to `/donate`, which already redirects to `https://givebutter.com/valorwellhelp` (with UTM/gclid pass-through via the `donate-go` edge function). We reuse that — no new routing logic.

## Where to place Donate (ranked by leverage)

### 1. Persistent header "Donate" button (highest leverage)
- Add a **Donate** button in the primary nav, styled as a solid accent CTA (visually distinct from the outlined "Find Care" and "Login" buttons).
- Present on desktop nav and inside the mobile menu.
- This is the single biggest lever — every page view becomes a donate impression without being pushy.

### 2. Operation Claims Success page — mission-spine ask
- Add a prominent inline Donate CTA block on `/operation-claims-success`, placed after the mission narrative (not above it — earn the ask).
- Copy frames the donation as **fueling OCS directly**, not generic "support us."
- Secondary sticky/inline CTA further down the page for long-scroll readers.

### 3. Homepage — one contextual Donate moment
- Add a single Donate CTA band on `/` positioned after the OCS/mission section, styled as a `CTABlock` with mission language. One ask, not multiple.

### 4. Footer — always-available quiet ask
- Add a "Donate" link under the **Get Involved** footer column so it's discoverable from every page without competing with the header CTA.

### 5. Beyond The Yellow — soft secondary ask
- Add a single lightweight Donate link/button on `/beyondtheyellow`, framed as "fuel the movement." BTY's primary CTA stays story submission; donate is secondary.

### 6. Partner page — Donate as the low-friction option
- On `/partner`, add a Donate CTA alongside existing partnership paths so visitors who aren't ready for a bigger commitment have a one-click option.

**Deliberately NOT adding Donate to:** `/get-care`, `/clinicians`, `/contact`, `/authority/*` (SEO/care intent pages — mixing donate asks here hurts conversion on their primary purpose).

## Implementation approach

- **One shared component**: `src/components/DonateButton.tsx` — a `<Link to="/donate">` wrapper accepting `variant` (`solid` | `outline` | `link`), `size`, and an optional `source` prop that appends `?utm_source=<source>` so we can see which placement converts in Givebutter/GA.
- **Header**: edit `src/components/layout/Header.tsx` to add `<DonateButton variant="solid" source="header" />` between "Find Care" and "Login" (desktop + mobile menu).
- **Footer**: edit `src/components/layout/Footer.tsx` — add Donate link to the "Get Involved" group with `source=footer`.
- **OCS page**: edit `src/pages/OperationClaimsSuccessPage.tsx` to insert a `CTABlock`-style Donate section mid-page and a second inline CTA near the bottom (`source=ocs-mid`, `source=ocs-bottom`).
- **Homepage**: edit `src/pages/HomePage.tsx` — one Donate `CTABlock` after the OCS section (`source=home`).
- **BTY page**: edit `src/pages/BeyondTheYellowPage.tsx` — one secondary Donate link near the end (`source=bty`).
- **Partner page**: edit `src/pages/Partner.tsx` — add Donate option to the existing partner CTAs (`source=partner`).
- **Routing**: no changes. `/donate` already exists and redirects correctly.
- **Tracking**: the existing `donate-go` edge function already forwards `utm_source`, so per-placement attribution flows into Givebutter automatically once we pass the `source` prop.

## Copy direction (short, mission-first)

- Header button: **Donate**
- Homepage / OCS CTA: **"Fund the fight for veteran claims. Every dollar moves Operation Claims Success forward."** Button: **Donate to OCS**
- BTY CTA: **"Keep Beyond The Yellow loud."** Button: **Donate**
- Footer: **Donate**

## Open questions before build

1. Should the header Donate button say **"Donate"** or **"Donate to OCS"** (more specific = higher intent, but longer)?
2. Confirm you want Donate on the homepage — some founders prefer to keep the homepage purely mission/story and put the ask only on OCS. Include it or skip it?
3. Any placements above you want to cut or add (e.g., `/mission`)?
