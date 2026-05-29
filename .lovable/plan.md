## Plan: /pendulo landing page

A standalone landing page for the Pendulo AI Hypnosis app, framed as a separate partner company offering an exclusive 50%-off-first-year deal to ValorWell clients with code **VALORWELL**.

### 1. Route + file
- Add `src/pages/Pendulo.tsx`.
- Register `<Route path="/pendulo" element={<Pendulo />} />` in `src/App.tsx`.
- No footer/header link added — direct URL only, same treatment as NinjaDo/BrightDeed/SkillsQuest.

### 2. Page structure (uses existing `<Layout>` + `<SEO>` + shadcn primitives)

**SEO**
- Title: `Pendulo — AI Hypnosis for Real Change | Partner Offer for ValorWell Clients`
- Description: `Pendulo is a personalized AI hypnosis app. ValorWell clients get 50% off the first year with code VALORWELL.`

**Hero**
- Small "Partner offer" eyebrow + Pendulo wordmark/name.
- H1: *"Rewire the part of you that talks back."*
- Sub: Pendulo is a separate company building personalized AI hypnosis sessions — and they've opened an exclusive door for the ValorWell community.
- Prominent code badge: `Use code VALORWELL — 50% off your first year`.
- Primary CTA button: **Try Pendulo (50% off)** → `https://pendulo-hypno.com/` (new tab, tracked via `trackAppOutboundClick`).
- Fine print: *7-day free trial. Cancel any time. Code applied at checkout.*

**Partner disclosure strip**
- One-liner box: *Pendulo is an independent company. ValorWell does not own, operate, or clinically supervise Pendulo. We're sharing this because clients have asked for tools that complement the work they're already doing in therapy.*

**Why hypnosis (emotional, pro-hypnosis, never anti-therapy)**
- Lead-in: *Therapy is where the real work happens. Hypnosis is one of the most underrated tools you can bring with you between sessions.*
- 3–4 emotional benefit cards (icons from lucide-react): 
  - *Speaks the language your subconscious actually listens to* — talking gets you insight; hypnosis helps the insight stick.
  - *Quiet for the loudest part of your mind* — for the loop that won't shut off at 2am.
  - *Practice on your own time* — 10–30 min sessions, headphones, anywhere.
  - *Built for the goals therapy uncovers* — sleep, focus, cravings, anxious patterns, confidence.
- One supporting line citing the research framing from Pendulo's own site (meta-analysis, Ericksonian foundation) — no comparative slam against therapy.

**How Pendulo works** (4 steps, mirrors steps grid pattern used on other app pages)
- Tell it your goal → AI hypnotist writes your script → Listen 10–30 min → Track the shift over weeks.

**The ValorWell partner offer (the big sell)**
- Card with: *Exclusive for ValorWell clients*
- Big number: **50% off your first year**
- Code chip with copy-to-clipboard button: `VALORWELL`
- Bullet list: 7-day free trial, cancel anytime, code applied at checkout on Pendulo's site, paid directly to Pendulo (not ValorWell).
- CTA: **Claim your 50% off** → pendulo URL (tracked).

**Good fits for Pendulo** (tag chips)
- Sleep, focus, cravings, performance anxiety, stuck thought loops, public speaking, motivation, habit change, calming the inner critic.

**Not a replacement section** (one short, warm block)
- *Pendulo is a wellness tool — it isn't therapy, it doesn't diagnose, and it doesn't replace clinical care. If you're a ValorWell client, keep your sessions. Pendulo is for the in-between.*

**FAQ** (Accordion)
- Is Pendulo part of ValorWell? → No, separate company; partnership only.
- How do I get the discount? → Enter `VALORWELL` at checkout on Pendulo's site; 50% off the first year applied automatically.
- Is this therapy? → No, wellness tool; doesn't replace clinical care.
- What if I'm already in therapy with ValorWell? → Great — Pendulo is designed to complement, not replace, the work you're doing.
- Who do I contact for billing/support? → Pendulo directly; ValorWell can't manage your Pendulo account.
- Is my data shared with ValorWell? → No, Pendulo handles all account/audio data per their own privacy policy.

**Final CTA**
- H2: *Bring something powerful home from your next session.*
- Repeat code chip + **Try Pendulo with VALORWELL** button.

### 3. Visual treatment
- Use site's standard `Layout`, semantic tokens, `bg-flag-sky` + `bg-white/70` overlay pattern consistent with other app pages.
- Accent color leans into a calm indigo/violet feel (Pendulo's `#6B9DFF` theme) via Tailwind's existing semantic tokens (e.g. `bg-primary` + tinted card backgrounds) — no new HSL tokens added.
- Hero spacing follows the site standard `py-10 md:py-14`.
- One primary CTA color throughout (per CTA placement memory).

### 4. Out of scope
- No header nav entry, no footer entry.
- No Pendulo logo asset import (none available in Pendulo project). Page uses wordmark text "Pendulo" with serif styling instead.
- No analytics changes beyond reusing `trackAppOutboundClick` for outbound clicks.
- No changes to NinjaDo, SkillsQuest, BrightDeed, CoreFeel, VibeTales pages.

### Technical notes
- New file: `src/pages/Pendulo.tsx` (~250 lines, structure mirrors `CoreFeel.tsx`).
- One small inline `CopyCodeButton` helper inside the file using `navigator.clipboard.writeText("VALORWELL")` + a sonner toast.
- Outbound URL constant: `const pendulioUrl = "https://pendulo-hypno.com/";`
- `useEffect` page_view ping mirroring other app pages.
