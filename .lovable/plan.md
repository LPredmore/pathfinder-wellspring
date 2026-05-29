# /pendulo restructure

Rebuild `src/pages/Pendulo.tsx` so it reads as Pendulo's primary promo page (Google Ads Grant landing), with ValorWell as the partner host. The offer moves to the bottom; the science of hypnosis becomes the main story.

## New page order (top → bottom)

1. **ValorWell partner banner** (slim, top of page, above hero)
   - Small ValorWell wordmark + "Proud partner" label.
   - Copy (paraphrased from user's brief):
     > ValorWell is all about bridging the gap between need and availability in mental health care. Pendulo built an incredible solution that brings the proven benefits of hypnosis into your home — the right blend of accessibility and professional quality. We may not be the best fit for everyone, and we'd rather point you toward something that works than block you from it. The results of hypnosis are undeniable. See for yourself.
   - Subtle styling so it reads as a sponsorship note, not the hero.

2. **Hero — Pendulo first**
   - Pendulo wordmark + tagline: *"Hypnosis isn't a trick. It's the most effective therapy most people have never tried."*
   - Sub: personalized AI hypnosis you can do from your headphones, anywhere.
   - Primary CTA: **Try Pendulo Free** → `https://pendulo-hypno.com/` (tracked).
   - Secondary: "See the research" anchor to stats section.
   - No promo code here.

3. **"Three approaches. One clear winner." stats section** (ported from Pendulo's Science page)
   - 3 cards: Psychoanalysis 38% / 600 sessions, Behavior Therapy 72% / 22 sessions, Hypnosis 93% / 6 sessions (highlighted).
   - Framed as facts/data, not anti-therapy: intro line — *"Researchers compared the three most-studied therapy approaches across 1,018 outcome studies. Here's what they found."*
   - Citation: Barrios, A.A. meta-analysis.

4. **"In plain English" — Faster / Deeper / Stickier** (3 cards, from Pendulo Science page).

5. **What hypnosis has been shown to help with** — tag cloud: anxiety, sleep, pain, smoking, weight, confidence, focus, phobias, stress, public speaking, habits, self-talk.

6. **How Pendulo works** — 4-step grid (goal → AI script → 10–30 min session → track shift).

7. **Myth-busters FAQ** — 4 items from Pendulo's Science page (control, hypnotizability, safety, "why haven't I heard about this").

8. **Sources** — 3 external links (Sharon Dyke, Doc Hypnosis, Kate Semeniuk) + Barrios footnote, matches Pendulo's own sourcing.

9. **ValorWell partner offer (moved to bottom)**
   - Card: *"A small thank-you from ValorWell"*
   - Brief recap: ValorWell partnered with Pendulo to unlock an exclusive discount.
   - Big number: **50% off your first year**, copy-to-clipboard code chip `VALORWELL`.
   - Bullets: 7-day free trial, cancel anytime, billed by Pendulo, code entered at checkout.
   - CTA: **Claim 50% off** → pendulo URL (tracked).

10. **Final CTA + disclosure footnote**
    - One-line *"Pendulo is an independent company. ValorWell does not own, operate, or clinically supervise Pendulo."*
    - Final button to Pendulo.

## Tone rules
- Lead with hypnosis benefits and data; never disparage therapy. Use lines like *"Modern behavior therapy is a huge step up from older approaches — and hypnosis goes one step further on speed and durability."*
- Drop earlier "Therapy is where the real work happens / Pendulo is for the in-between" framing — that subordinated Pendulo. Replace with neutral *"Pendulo is a wellness tool, not a diagnosis or treatment. If you're in crisis, contact emergency services."* in the footnote area only.

## SEO
- Title: `Pendulo — AI Hypnosis That Works Faster and Lasts Longer`
- Description: `Personalized AI hypnosis sessions backed by decades of clinical research. Try Pendulo free — ValorWell members get 50% off the first year.`

## Visual
- Keep the existing indigo/violet palette, semantic tokens, `Layout` + `SEO` wrappers.
- Stats cards mirror Pendulo's gradient + "The winner" badge on the hypnosis card.
- ValorWell banner uses a muted `bg-flag-sky/40` strip so it reads as partner chrome, not Pendulo brand.

## Out of scope
- No footer/header link changes (still direct URL only).
- No new images imported from the Pendulo project (only PWA icons exist there; we'll stick to wordmarks + lucide icons).
- No analytics changes beyond reusing `trackAppOutboundClick`.
- No edits to other pages.

## Technical notes
- Single-file rewrite of `src/pages/Pendulo.tsx` (~300 lines).
- Keep `CodeChip` helper, used only in the bottom offer + final CTA.
- Constants: `pendulioUrl = "https://pendulo-hypno.com/"`, `PROMO_CODE = "VALORWELL"`.
- Stats + myths content copied from Pendulo's `Science.jsx` and lightly reworded to fit ValorWell's tone (drop "Big Pharma" line; keep the "quietly outperforming for decades" framing softened).
