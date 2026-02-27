

## Redesign /beyondtheyellow as a Creator-First Ambassador Recruitment Page

### Overview
Complete rewrite of `src/pages/Competitions.tsx` to shift from a donor-first fundraising page to a creator-first ambassador recruitment landing page. The page will prioritize ambassador signups, explain the campaign mechanics clearly, and make donor options secondary. Visual direction shifts away from heavy flag backgrounds and resort imagery toward a cleaner, more modern, mission-driven aesthetic.

### What Changes

**Single file rewrite: `src/pages/Competitions.tsx`**

All resort image imports are removed. The flag-sky background wrapper is removed (no more full-page patriotic overlay). The page uses the existing `Layout` component with clean white/neutral sections.

---

### Section-by-Section Breakdown

**1. Hero Section**
- Headline: "Become a ValorWell Ambassador"
- Subheadline: "Help fund therapy sessions for veterans and military families -- and turn your platform into measurable impact."
- Supporting badge: "$75 funds 1 therapy session"
- Trust line: "This is not just awareness. It is real funding for real treatment."
- Primary CTA: `<CreatorApplicationForm>` (Apply to Compete button)
- Secondary CTA: anchor link scrolling to "How It Works" section
- Small note: "If accepted, ambassador payouts are processed through HomeFromCollege."
- Clean hero-gradient background, no flag image

**2. Participation Options (redesigned hierarchy)**
- Section title: "Choose Your Path"
- Ambassador card: larger, spans full width on mobile, visually dominant with primary color accent border
  - Title: "Become an Ambassador"
  - Bullets: private donation link, division placement, milestone recognition, commission eligibility after 5 sessions, Permanent Ambassador at 25 sessions
  - CTA: `<CreatorApplicationForm>`
- Two smaller secondary cards side by side below:
  - "Support an Ambassador" -- button shows toast (leaderboard not live yet)
  - "Fund a Session Directly" -- links to valorwell.org/donate

**3. What This Campaign Really Is**
- Uses `ContentSection` component with `variant="alt"`
- Rewritten copy emphasizing: creator-driven, measurable, not awareness, real treatment, lasting impact

**4. How It Works (expanded to 4 steps)**
- Uses `StepsSection` component with updated `steps` array:
  1. Apply -- platform details and audience info
  2. Get Verified -- follower review, division assignment
  3. Get Your Private Link -- tracked donation link
  4. Start Funding Sessions -- share, compete, unlock milestones
- Division note below: Hero Division (under 10k), Elite Division (10k+), locked once assigned

**5. Milestones That Matter (replaces old Eligibility & Milestones)**
- 5 milestone cards in a responsive grid using existing Card components
- Each card: session count, unlock description, icon
  - 5 Sessions: Commission Unlocked (Unlock icon)
  - 10 Sessions: Recognition + Momentum Spotlight (Star icon)
  - 25 Sessions: Permanent Ambassador Status (Award icon)
  - 50 Sessions: Elite Recognition Feature (Trophy icon)
  - 100 Sessions: Champion-Level Impact (Target icon)
- Cards styled as progression badges with subtle left border accent

**6. Why Ambassadors Join (replaces Prize section)**
- 3 cards in a grid:
  - "Create Real Impact" -- you're funding sessions people need
  - "Build Credibility" -- measurable, mission-driven, real
  - "Earn Ongoing Upside" -- commission tied to impact after threshold
- No resort imagery, no vacation references

**7. Permanent Ambassador Status (new section)**
- `ContentSection` with `variant="alt"`
- Explains 25-session threshold, lasting relationship, ongoing earnings on future qualified donations
- Trust note: "All payouts, if earned, are processed through HomeFromCollege."

**8. Live Momentum (new section)**
- Section title: "Live Momentum"
- 3 placeholder stat cards:
  - Total Sessions Funded (placeholder: "---")
  - Hero Division Leader (placeholder: "Coming Soon")
  - Elite Division Leader (placeholder: "Coming Soon")
- Styled as bordered cards with centered content
- Ready for future backend integration

**9. FAQ (rebuilt, applicant-first)**
- 8 new FAQ items:
  1. Who is this for?
  2. Do I need a huge following to apply?
  3. How do I get selected?
  4. When does commission start?
  5. What is Permanent Ambassador Status?
  6. How do payments work?
  7. Can I still help if I don't want to compete?
  8. What am I not allowed to claim?
- Uses existing `FAQSection` component

**10. Final CTA (ambassador-first)**
- Title: "Apply to Become a ValorWell Ambassador"
- Body: mission-driven copy about turning influence into impact
- Primary CTA: `<CreatorApplicationForm>`
- Secondary CTA: "Support a Session" linking to donate page
- Small text: "Applications are reviewed manually. Approved ambassadors receive onboarding and a private donation link."

---

### SEO Updates
- Title: "Become a ValorWell Ambassador | Beyond the Yellow"
- Description updated to reflect ambassador recruitment focus

### What Does NOT Change
- `CreatorApplicationForm` component (unchanged, already updated)
- `Layout`, `Footer`, `Header` components
- All other pages (`Support.tsx`, `Advocates.tsx`, etc.)
- No new components created -- everything built inline in `Competitions.tsx` using existing UI primitives (Card, Button, Accordion via FAQSection, StepsSection, ContentSection)
- Routing remains `/beyondtheyellow`

### Icons Used (from lucide-react, already installed)
- Unlock, Star, Award, Trophy, Target, Heart, Zap, Shield, Users, TrendingUp, ArrowRight

### Technical Notes
- Resort image imports removed (files stay in `/assets` but are no longer referenced from this page)
- `flagSkyBackground` import removed
- `handleSupportCreator` toast message updated to reflect leaderboard status
- `trackDonateConversion` kept for donor links
- All sections use standard Tailwind classes and existing utility classes (`section-padding`, `container-wide`, `container-narrow`, `section-alt`, `hero-gradient`)

