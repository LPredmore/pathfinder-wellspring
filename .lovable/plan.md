
# /clinicians — Full Gary Vee Pass

## The honest diagnosis (why it feels "off")

The page is smart, well-written, and morally serious — but it reads like a *manifesto*, not a *movement*. Gary would call it: "You're telling me why you're honest. You're not making me feel like I'm about to miss something." Specifically:

1. **Hero over-qualifies.** The first thing a burned-out clinician sees is friction and warnings. That's differentiating, but it's the *second* beat, not the first. The hero should punch them in the chest with "you're not crazy, this is what you've been waiting for" before the disclaimers start.
2. **No proof of build.** You keep saying "we built something different" but never *show* it. Clinicians reading this have been lied to by every EHR demo since 2012. Words won't do it — they need to see the machine.
3. **Zero FOMO surface.** There's no "founding cohort," no "we're building this now with the people who show up early," no visible momentum. Every section is steady-state. Movements have a *now*.
4. **The middle sags.** Autonomy → Fit → Your Role → Practical Terms is four consecutive text-heavy sections in the same rhythm. The eye tires. No pattern break.
5. **Final CTA is soft.** "See If You Fit ValorWell" sounds like a personality quiz. The moment should feel like stepping across a line.

## What I'm changing

### 1. Rewrite the hero (punch first, qualify second)
- New H1 direction: *"You didn't lose the calling. They buried it under paperwork."*
- Subhead reframed around recognition + invitation, not warnings.
- Warnings/friction move to a smaller "Before you keep reading" strip *below* the hero — same honesty, better sequence.
- Add a single visible momentum line under the CTA (e.g., "Founding clinician cohort — onboarding now").

### 2. NEW section: "Something Is Being Built. You Can Be Early." (the FOMO beat)
Placed right after the hero strip, before Reality Check. Uses your line verbatim as the spine:

> ValorWell is building the greatest space available for clinicians to have the autonomy they've always wanted with the administrative support they've never had. We're changing how mental healthcare gets delivered — starting with the veteran community, then everywhere else.

Three-column "early vs. late" contrast:
- **Now** — Shape the EHR, shape the culture, shape who gets hired next.
- **Soon** — Join a system that's already been shaped by someone else.
- **Later** — Watch this from the outside and wish you'd raised your hand in 2026.

No fake scarcity, no fake numbers. Just the truth that early movers get to build the thing.

### 3. NEW section: "The EHR We Actually Built For Ourselves"
Full-width dark section, feels like a product page dropped into a manifesto. Six feature cards, each written in clinician language, not vendor language:

1. **AI notes that speak human first.** Type in plain language after session — "client came in dysregulated, we worked on grounding, homework was..." — the system converts it into a fully compliant, clinically appropriate note. You edit. You don't author from scratch.
2. **Notes that already know the plan.** Every daily note surfaces the treatment goals and interventions inline. No second tab. No hunting.
3. **Two-way secure calendar sync.** Your real calendar and ValorWell stay in lockstep — both directions, always current, without leaking PHI.
4. **Auto-scheduling inside your guardrails.** You set the rules once — age, presenting concerns, hours, cap. Patients self-book within them. You stop being a receptionist.
5. **Telehealth built in, not bolted on.** Video, waiting room, session, and chart on one screen. No third-party link, no "can you see my screen?"
6. **Availability you actually control.** Turn the tap up or down any week. No begging. No guilt calls from a scheduler.

Closing line: *"We didn't buy an EHR. We built the one clinicians kept describing in exit interviews."*

Includes a small "What's shipping next" teaser row (2–3 items) to reinforce the "you're early" story — I'll leave those bullets as clearly editable placeholders for you to fill.

### 4. Tighten the middle (pattern breaks)
- **Autonomy Needs Infrastructure** — condense the four cards' copy (some are running long/rambly right now — e.g., the "your availability is yours" card trails off mid-sentence).
- **Fit** — trim each bullet to ≤7 words for punch.
- **Your Role In The Build** — collapse the 6-step vertical arrow chain to a tighter 4-step horizontal flow so it reads as momentum, not a poem.
- **Practical Terms** — no structural change, just re-order so *Pay* and *You set availability* are the first two rows (lead with what they want to know).

### 5. Sharpen the final CTA
- New H2: *"Stop reading. Start something."*
- Primary CTA copy: **"Raise Your Hand"** (matches the section id, honest, active).
- Secondary CTA kept as Operation Claims Success.
- Keep the "clinicians who still give a damn" line — it's the best sentence on the page.

## What I'm NOT touching

- The `TherapistApplicationForm` and its Supabase wiring — untouched.
- Route structure, `/therapists` compatibility, Header, Layout, or any other page.
- Design tokens / color system — reusing existing `--cl-*` variables so the new sections feel native, not bolted on.
- No new dependencies.

## Technical notes

- All edits confined to `src/pages/Clinicians.tsx`.
- Two new sections added inline as local subcomponents (Movement/FOMO + EHR Showcase) — no new files needed, keeps the page self-contained like it already is.
- EHR section uses a responsive 6-card grid (`md:grid-cols-2 lg:grid-cols-3`) with the same border/eyebrow language as existing sections so it reads as part of the whole, not a pasted product page.
- FOMO section uses a 3-column contrast grid with the ember accent used sparingly (it's currently underused as a signal color — leaning on it here gives the "now" column real weight).
- No animation library added; subtle CSS transitions only.

## Open question (won't block — I'll use safe defaults)

For the EHR "what's shipping next" teaser, I'll drop in 2 clearly-marked placeholder bullets (e.g., "// TODO: roadmap item") so you can swap in what you actually want to tease without me inventing roadmap you haven't committed to.
