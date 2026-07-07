## The Move

Stop selling. Open the door. The page becomes a **"you're home"** moment — quiet, confident, unmistakably built for them. A CHAMPVA spouse/dependent lands here and within 5 seconds thinks: *"Wait. This actually exists. For me."*

That recognition is the entire conversion. Everything else gets out of the way.

---

## Structural Changes to `/get-care`

### 1. Cut the sales scaffolding
Remove sections that re-convince a pre-sold visitor:
- **Delete "Care First" section entirely** (the "You are a person before you are a claim" block). It's the most generic beat on the page — reads like every therapy site.
- **Delete the Recognition section's closing line** ("Have CHAMPVA? Start there. We will help make the next step clearer.") — redundant with the ledger.
- **Delete the "Nationwide mission · State-by-state · Growing fast" badge** — feels like a marketing chest-thump. The paragraph above it already says it, calmly.

### 2. Reduce CTAs from 4 → 2
Keep the CTA only in:
- **Hero** (primary door)
- **Final block** (the quiet close)

Remove "Start CHAMPVA Care" buttons from:
- CHAMPVA Clarity section
- Care Process section (the step list itself IS the CTA; the button is noise)

Fewer buttons = more confidence. A niche page with one door feels curated. Four doors feels desperate.

### 3. Rewrite the Hero for "Welcome Home"
Current hero works but leads with the problem ("You spend enough time navigating systems…"). Flip it so the *recognition* hits first.

New hero shape:
- Eyebrow: `CHAMPVA MENTAL HEALTH CARE`
- H1: **"If you have CHAMPVA, you're in the right place."**
- Sub: "Telehealth mental health care built around the benefit you already have. We bill CHAMPVA directly. We verify before care begins. You do not have to explain CHAMPVA to us."
- Micro line: "For spouses, dependents, and family members who have spent long enough figuring things out alone."
- One CTA. One secondary text link.

That third line — *"You do not have to explain CHAMPVA to us"* — is the whole page in one sentence. That's the Welcome Home.

### 4. Rewrite the Final block as "the open door"
Kill the current three-paragraph close. Replace with something that feels like a porch light, not a pitch:

```
Have CHAMPVA?

You're already in.

[ Start CHAMPVA Care → ]

We'll take it from here.
```

That's it. No reassurance stack. No "you already know enough." The page trusts them to walk through.

### 5. Add ONE missing signal: responsiveness
A CHAMPVA family has been ghosted before. Add a single quiet line under the CHAMPVA Clarity ledger:

> *"Every intake gets a real response. Not a directory. Not a dead end."*

No timeline promise (avoids overclaim), but it directly answers the unspoken fear.

### 6. Soften the Recognition section
Currently 4 quoted lines. Cut to **3** — the middle one ("I do not want to call ten therapists") is the sharpest; keep it. Kill "I need care for my child, teen, myself, or someone in my family" — the service section already covers ages. Redundancy dilutes the emotional punch.

### 7. Micro-copy pass (tone shift: "welcome," not "informing")
- CHAMPVA Clarity H2: "No insurance-logo wall. Here is what you actually want to know." → **"What you actually want to know."** (cut the negation — negations sell; statements welcome)
- Care Process H2: "Ready for care? Start in the ValorWell client portal." → **"One door. That's the whole thing."**
- Nationwide H2: "CHAMPVA families are nationwide. ValorWell is building the clinician network to meet them there." → **"CHAMPVA families are everywhere. We're growing to meet them."**

---

## Final Section Order (after cuts)

```
1. Crisis strip
2. Hero (rewritten — Welcome Home)
3. Recognition (3 lines instead of 4)
4. CHAMPVA Clarity (+ responsiveness line, no CTA)
5. Therapy Services
6. Care Process (no CTA button — the steps ARE the CTA)
7. Nationwide Growth (badge removed)
8. Coming Soon (TRICARE / VA Community Care raise-your-hand)
9. FAQ
10. Final block (rewritten — "You're already in.")
```

Net change: **10 sections → 9 sections, 4 CTAs → 2 CTAs**, tone shifts from *informing/reassuring* to *welcoming/trusting*.

---

## What Does NOT Change

- CHAMPVA-first positioning
- Direct billing clarity
- State-by-state honesty
- Portal URL: `https://clients.valorwell.org`
- Crisis strip
- Design system (Trebuchet, Evergreen, Warm Canvas, Ember)
- Coming Soon panels for TRICARE / VA Community Care
- SEO metadata

---

## Technical Notes

- Single-file edit: `src/pages/GetCare.tsx`
- No new components, no route changes, no backend
- `PrimaryCTA` component stays; just used fewer times
