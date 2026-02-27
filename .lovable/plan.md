

## Full Bento Rebuild of /beyondtheyellow — "$75 Mission" Rebrand

### Overview
Complete rewrite of `src/pages/Competitions.tsx` into a modular bento-grid layout with the "$75 Mission" framing and "Mission Partner" language replacing "Ambassador" throughout. The flag background stays as a subtle, faded presence (increased overlay opacity). The `CreatorApplicationForm` button label and confirmation copy also get updated.

### Files Changed

**1. `src/pages/Competitions.tsx` — Full rewrite**

**2. `src/components/forms/CreatorApplicationForm.tsx` — Label updates only**

---

### Section-by-Section Breakdown (Bento Layout)

The page moves from stacked full-width sections to a modular grid system. Each "tile" is a bordered card with generous padding, clean typography, and strong visual hierarchy. The overall container uses `container-wide` with sections organized in CSS grid patterns.

**Background**: Keep `flagSkyBackground` import but increase overlay to `bg-white/85` (more subtle than current `bg-white/70`).

---

**1. Hero Tile (full width)**
- Headline: "The $75 Mission"
- Subheadline: "We don't do ribbons. We buy results. One hour at a time."
- Supporting line: "$75 funds exactly one hour of clinical therapy for a veteran or military family member."
- Primary CTA: `<CreatorApplicationForm>` (button now reads "Become a Mission Partner")
- Secondary CTA: anchor to #how-it-works
- Trust note: "Creator Growth Grants processed through HomeFromCollege."
- Clean hero-gradient, no heavy flag imagery

**2. Bento Grid — Mission Control (2-column on desktop, stacked on mobile)**

Top row (2 tiles side by side on desktop):

- **Tile A: Live Session Counter** (large, dominant)
  - Giant placeholder number (e.g., "---")
  - Label: "Hours of Therapy Secured"
  - Subtext: "Every $75 moves this counter. This is not a donation page. It is a scoreboard."
  - Styled as a large stat card with primary accent border

- **Tile B: Waitlist Counter** (large, matching)
  - Giant placeholder number (e.g., "---")
  - Label: "Veterans Still Waiting"
  - Subtext: "Every session funded moves someone off this list."
  - Styled with accent/destructive color accent to convey urgency

Second row (3 tiles):

- **Tile C: Become a Mission Partner** (spans 2 columns on desktop)
  - Title: "Become a Mission Partner"
  - Body: Apply, get a tracked link, compete in your division, secure hours of therapy.
  - Bullets: private tracked link, division placement, milestone unlocks, Creator Growth Grant eligibility after 5 sessions, Permanent Partner status at 25 sessions
  - CTA: `<CreatorApplicationForm>`
  - Visually dominant with primary border

- **Tile D: Secure a Session** (1 column)
  - Body: "$75 = 1 hour. Fund a session directly."
  - CTA: links to valorwell.org/donate
  - Smaller, secondary treatment

Third row (2 tiles):

- **Tile E: Hero Division Leaderboard** placeholder
  - Label: "Hero Division (Under 10K)"
  - Value: "Coming Soon"

- **Tile F: Elite Division Leaderboard** placeholder
  - Label: "Elite Division (10K+)"
  - Value: "Coming Soon"

**3. "What This Really Is" Section (full width)**
- Uses `ContentSection` variant="alt"
- Title: "What The $75 Mission Really Is"
- Rewritten copy: creator-driven, measurable, not awareness, real treatment. Replaces "Ambassador Challenge" with "The $75 Mission." Uses "Mission Partners" language.

**4. How It Works (4 steps)**
- Uses existing `StepsSection` component
- Steps updated with Mission Partner language:
  1. Apply -- platform details and audience info
  2. Get Verified -- follower review, division assignment
  3. Get Your Tracked Link -- private link to track hours secured
  4. Start Securing Hours -- share, compete, unlock milestones
- Division note below (Hero under 10K, Elite 10K+)

**5. Milestones (bento grid of 5 tiles)**
- Title: "Milestones That Matter"
- 5 milestone cards in responsive grid (same structure as before but with updated language):
  - 5 Hours Secured: Creator Growth Grant Unlocked
  - 10 Hours Secured: Recognition + Momentum Spotlight
  - 25 Hours Secured: Permanent Mission Partner Status
  - 50 Hours Secured: Elite Recognition Feature
  - 100 Hours Secured: Champion-Level Impact
- Styled as progression badges with left border accent

**6. Why Mission Partners Join (3 tiles in a row)**
- Updated from "Why Ambassadors Join"
- Card 1: "Create Real Impact" -- securing therapy hours people need
- Card 2: "Build Credibility" -- measurable, mission-driven partnership
- Card 3: "Earn a Creator Growth Grant" -- not commission, a professional investment in your channel after threshold

**7. Permanent Partner Status (full width, alt background)**
- Title: "What Permanent Partner Status Means"
- Copy: At 25 hours secured, unlock lasting partnership and ongoing Creator Growth Grant tied to the supporter base you built.
- Trust note: "All Growth Grants processed through HomeFromCollege."

**8. FAQ (accordion, applicant-first)**
- 8 items, fully rewritten with new language:
  - "Who is this for?" -- Creators, advocates, community-driven people
  - "Do I need a huge following?" -- No, division-based
  - "How do I get selected?" -- Platform review
  - "When does my Creator Growth Grant activate?" -- After 5 hours secured
  - "What is Permanent Partner Status?" -- 25 hours threshold
  - "How do Growth Grant payments work?" -- Processed through HomeFromCollege
  - "Can I help without competing?" -- Yes, fund sessions directly
  - "What am I not allowed to claim?" -- No promises, no medical advice

**9. Final CTA (full width)**
- Title: "Join The $75 Mission"
- Body: Turn your platform into secured therapy hours.
- Primary CTA: `<CreatorApplicationForm>` ("Become a Mission Partner")
- Secondary CTA: "Secure a Session" linking to donate
- Trust note: "Applications reviewed manually. Approved partners receive onboarding and a tracked link."

---

### CreatorApplicationForm Updates (`src/components/forms/CreatorApplicationForm.tsx`)

- Button label: "Apply to Compete" changes to "Become a Mission Partner"
- Success message: "Creator Challenge" changes to "$75 Mission"
- Dialog title references updated from "Ambassador" to "Mission Partner"
- Agreement label: "Ambassador Participation Agreement" changes to "Mission Partner Agreement"
- These are ~4 small string replacements in the existing file

---

### SEO Updates
- Title: "The $75 Mission | Beyond the Yellow"
- Description: "Join The $75 Mission as a ValorWell Mission Partner. Help secure real therapy hours for veterans and military families -- $75 at a time."

### What Does NOT Change
- Layout, Header, Footer components
- Form logic, validation, database writes
- Routing (`/beyondtheyellow`)
- Other pages
- No new component files created

### Technical Notes
- All bento tiles use existing `Card` components with Tailwind grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3` patterns)
- Waitlist and session counters are placeholder UI ready for future Supabase queries
- Flag background stays with `bg-white/85` overlay for subtlety
- All sections keep `relative z-10` for layering over background

