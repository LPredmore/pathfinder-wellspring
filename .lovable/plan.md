## Plan: Adjust CoreFeel positioning + add footer link

### 1. Add CoreFeel to footer Resources
In `src/components/layout/Footer.tsx`, append to the `resources` array:
```ts
{ name: "CoreFeel", href: "/corefeel" },
```
No links added for NinjaDo, SkillsQuest, BrightDeed, or VibeTales — their pages remain direct-URL only.

### 2. Reframe CoreFeel page copy (`src/pages/CoreFeel.tsx`)
Shift the messaging from "for kids" to "for everyone — kids and adults," with the angle: building mental habits is a practice; most adults were never taught to work *with* their Worry Voice rather than suppress it.

Changes:

- **SEO title/description**: 
  - Title: `CoreFeel — Understand Your Mind, Emotions & Worry Voice | ValorWell`
  - Description: `CoreFeel is a guided practice for understanding how your mind, feelings, and needs connect — built for kids, teens, and adults. Free from ValorWell.`

- **Hero**:
  - H1: `Build a healthier relationship with your mind.`
  - Subhead: rewrite to emphasize that thoughts → feelings → needs → responses is a cycle everyone (kids and adults) benefits from understanding; CoreFeel is the guided practice for it.

- **"The problem" section**: replace the kids-only framing with copy explaining that most people — including adults — were taught to *suppress or control* the Worry Voice rather than work alongside it. Practicing with the right tool builds the habit.

- **How it works**: keep the 5 steps; rephrase the descriptions in second person ("you / your") so it reads for any user, with a brief note that the same flow works when a parent walks through it with a child.

- **"Not just a mood tracker"**: keep, but generalize wording away from "kids."

- **Best for tags**: replace tween/teen-specific tags with universal ones, e.g.: `Worry thoughts`, `Emotional awareness`, `Building mental habits`, `Working with your Worry Voice`, `Big reactions`, `Social stress`, `Shame and embarrassment`, `Frustration tolerance`, `Reflection after conflict`, `Parent-child conversations`, `CBT-informed skill practice`.

- **"Parent benefits" section**: rename to **"What CoreFeel gives you"** and rewrite the four cards to address any user (less guessing about your own reactions, better conversations with people in your life, more emotional vocabulary, more self-awareness over time). Add one short line noting it's also great to use with a child.

- **FAQ**: update questions/answers to cover both adults and kids:
  - "Who is CoreFeel for?" → everyone; especially useful for anyone who was never taught to work with their inner Worry Voice.
  - Keep the "Is it therapy?" and "What is a Worry Voice?" items.
  - Replace the parent-specific Q with one about building a daily/weekly habit of reflection.
  - Keep one Q about using it with a child.

- **Final CTA**: H2 → `Practice understanding your mind — one moment at a time.` Keep the Open CoreFeel button + web app link.

### 3. Out of scope
- No changes to NinjaDo, SkillsQuest, BrightDeed, VibeTales pages or their discoverability.
- No visual redesign of CoreFeel — same warm rose/amber palette, same section structure, same spacing.
