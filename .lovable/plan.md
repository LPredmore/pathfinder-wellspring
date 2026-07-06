
# OCS Page — Battle Cry Rewrite (from "The Clinical Standard" down)

Everything above section 6 stays untouched. From section 6 through section 13 (lines ~1076–1405), we collapse the current 8 overlapping sections into a tighter, harder-hitting **5-beat battle cry** that reads like Gary Vee laid it out on a whiteboard: one idea per beat, each beat earns the next, ending on the ask.

Nothing changes structurally in components — same `<Eyebrow>`, `<SectionHeading>`, `<Guardrail>`, card grids, CTA buttons, tracking events, anchors (`#buildout`, `#ethics`, `BETTER_PATH_ANCHOR`), and color system are reused. This is a copy + section-consolidation pass, not a redesign.

---

## The new flow (replaces current sections 6–12)

### Beat 1 — "Step 1: Access. Period." *(replaces section 6 "Care First" + section 9 "Community Care Buildout")*

The opening punch. Not "clinical standard" throat-clearing — the actual problem stated in plain English:

- Thousands of veterans try to get mental healthcare through the VA every year.
- A huge number get turned away. The VA doesn't have enough clinicians. Most VA staff don't fully understand Community Care themselves.
- ValorWell is building a **nationwide network of quality virtual providers in every state** who can absorb the overflow.
- **Step 1 is access. Everything else is downstream of that.**

Keeps the `#buildout` anchor on this section. Reuses the 4-card `buildoutAreas` grid to show *how* the network gets built (registration, regional requirements, provider onboarding, etc.). Keeps the existing Guardrail about not controlling VA authorization.

Retire: "We would rather build the boring system correctly than sell the exciting promise early" — replaced with something like *"No veteran should be told 'we're full' when help exists in another state and a screen away."*

---

### Beat 2 — "Step 2: Start with what's real. Not with a target number."

The honest-ratings differentiator. This is where we separate from every other claims outfit without naming names:

- Most companies start with the goal ("let's get you to 100%") and reverse-engineer conditions to hit it.
- **We start with the conditions you actually have** — including the ones you may not be thinking about — and we help you understand what you legitimately qualify for.
- Small difference on paper. Huge difference in your life. It's the difference between a rating that holds and a **clawback letter three years from now** for pay you were never entitled to.

Use a simple two-column contrast (reuse the existing "What OCS builds / What OCS refuses" pattern from section 8, restyled): *"Target-first rating mills" vs. *"Condition-first honest assessment."* Retires section 8 as its own beat and folds its content here where it earns its place.

---

### Beat 3 — "Step 3: Care first. Documentation second. Appeals we win."

The clinical + documentation + appeals story as one continuous punch. This is the payoff section and should feel like it:

- Our clinicians get **elite training and tools** to produce the documentation a veteran actually needs.
- **We don't charge extra for the Nexus letter.** We don't hand one out because you asked.
- We start with care. After a few sessions, if the clinician determines the issue is service-connected, the documentation follows — grounded in the real clinical relationship, not a one-visit transaction.
- **Then we keep treating you.** If the VA denies based on their one-time C&P eval, we produce follow-up documentation backed by an actual continuum of care and we go to appeal.
- We win those appeals nearly every time. And **the whole thing runs on the VA's dime — zero cost to the veteran.**

Absorbs sections 7 ("Better Path" steps) and 10 ("Ethical Documentation"). Reuse `betterPathSteps` and `ethicalPrinciples` where they still fit, but pruned so the beat reads as one argument, not two overlapping ones. Keeps both existing Guardrails consolidated into one at the end of the beat.

Tone note: the "shove their one-time assessment" line gets translated into publishable defiance — something like *"A one-visit VA evaluator does not get to override months of real clinical care. We will bring the receipts every single time."*

---

### Beat 4 — "We have been getting ready for this fight for years." *(replaces section 11's opening frame and adds the 'who's coming for us' beat)*

The "we're built for the counter-attack" moment. This beat did not exist in the current page and is the biggest addition:

- We've spent years in the background learning VA billing, documentation, and Community Care processes.
- We knew going public would put a target on us. **Entire industries profit from this system staying confusing.**
- If we succeed, they lose. They are going to come for us. We are ready.

Short section. High-contrast (probably the dark `bg-[#3B5147]` treatment currently used by section 13). One pull quote, no cards. This is the emotional turn before the ask.

---

### Beat 5 — "What we need from you." *(replaces sections 11 "Clinicians" + 12 "Organizations" as one unified ask)*

The close. Two clean asks, no menu of six vague pathways:

1. **Clinicians** — every state we staff is another state where veterans stop getting turned away. Keeps the `clinicianValues` grid and both existing CTAs (`/clinicians`, "Talk to ValorWell").
2. **Supporters & amplifiers** — the faster this message spreads, the fewer veterans get preyed on before we reach them. Keeps the `leveragePaths` grid but tightens the intro copy from six "Maybe you…" lines to one sharp sentence. Keeps existing "Join the Mission" and "Make an Introduction" CTAs.

All existing `track()` events and `goToForm()` handlers stay wired exactly as they are.

---

### Section 13 (Beyond The Yellow close) — stays, minor tightening only

Keeps the existing dark BTY closer as-is structurally. Light copy tightening only so it doesn't repeat Beat 4's "we build, we don't just post ribbons" language now that Beat 4 exists upstream.

---

## What gets deleted

- The "Nexus-related documentation is not the enemy / letter-first business model is" framing from section 6 — the new Beat 3 says this more directly through *action* (we don't charge for it, we don't hand it out on request, we back it with continuum of care).
- Section 8's standalone "What OCS actually is" meta-explainer — the 5-beat flow *is* what OCS is. We don't need a section explaining the sections.
- The six "Maybe you…" lines in section 12 — replaced with one sentence.
- Repetition of "we are anti-transactional documentation," "we do not control the outcome," etc. — said once, cleanly, in Beat 3's Guardrail.

## What gets preserved verbatim (non-negotiable)

- All Guardrail disclaimers about not guaranteeing Nexus Letters / ratings / service connection / Community Care authorization / claim decisions. These get consolidated but every legal-safety phrase stays intact.
- All anchors: `BETTER_PATH_ANCHOR`, `#buildout`, `#ethics`, `#partners`.
- All `track()` event names and `goToForm()` calls.
- All existing routes and CTAs (`/clinicians`, `/beyondtheyellow`, form lanes).

---

## Technical notes

- Single-file edit: `src/pages/OperationClaimsSuccessPage.tsx`, lines ~1076–1405.
- Data arrays at the top of the file (`betterPathSteps`, `ocsBuilds`, `ocsRefuses`, `buildoutAreas`, `ethicalPrinciples`, `clinicianValues`, `leveragePaths`) get their **content** rewritten to match the new beats, but the array shapes and consuming JSX stay the same — no prop/type changes.
- No new components, no new dependencies, no routing changes, no tracking-event renames.
- After the edit: read the file back and run a typecheck to confirm nothing broke.

## Out of scope

- Everything above line 1075 (hero through section 5) — user explicitly said don't touch it.
- Any visual redesign, new imagery, or color changes.
- Any backend / data changes.
