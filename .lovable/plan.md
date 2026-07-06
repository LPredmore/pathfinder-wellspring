## Plan: Rewrite the "For Guests" Section on /beyondtheyellow

### Goal
Replace the current card-based "For guests" section with an emotionally-driven, paragraph-forward layout that makes smaller creators and community organizations feel seen, valued, and eager to share their story — while clearly signaling that BTY is open to any community, not just veterans.

### What to Change
**File:** `src/pages/BeyondTheYellowPage.tsx` (lines 783–806)

**Remove:**
- The 4-card grid (Heart, Megaphone, Sparkles, Share2 cards)
- The "Why share your story?" heading
- All language about "creating shareable assets," "promote the work," and "reach new people" that reads like a feature list

**Replace with:**
A single centered text block using the existing `Eyebrow` + `SectionHeading` pattern, followed by 2–3 short, emotionally-charged paragraphs. No cards. No icons. No grid.

### Proposed Copy Direction
- **Eyebrow:** `For guests` (keep)
- **Headline:** Something like *"Your story deserves to be seen by people who get it."* — direct, personal, opportunity-framed.
- **Body paragraphs:**
  1. Open with the feeling of being a small creator or local organization doing real work that mostly goes unnoticed — the 3,000-follower founder, the neighborhood mutual aid group, the podcaster who just started. Validate that their work matters even if the audience is small.
  2. Frame BTY as the platform that notices them. Not a marketing channel. A place where someone who understands their mission shines a light on it. The visibility is the point.
  3. Explicitly broaden the scope: veteran communities are one place this happens, but "Beyond The Yellow" is anyone, in any community, who moves past symbols into real action. Make this unmistakable.

### Layout
- Centered text block, `max-w-3xl` or `max-w-4xl`
- Existing `Eyebrow` component + `SectionHeading` component
- 2–3 paragraphs below, `text-lg` or `text-xl`, generous line-height
- No cards, no icons, no grid, no CTA button in this section (the form section follows immediately below)
- Keep the existing section wrapper (`border-b`, `bg-[hsl(var(--section-alt))]`, `py-20 md:py-24`)

### Cleanup
- Remove unused imports (`Heart`, `Sparkles`, `Share2`) if they are no longer used elsewhere on the page after this change.

### Acceptance Criteria
- [ ] Section reads like an invitation to be recognized, not a pitch deck
- [ ] No card layout, no icons, no grid
- [ ] No language about "shareable assets," "promote," or marketing-tool framing
- [ ] Scope explicitly includes non-veteran communities
- [ ] Typechecker passes (`npx tsc --noEmit`)
