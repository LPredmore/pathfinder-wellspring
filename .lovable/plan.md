## Goal

Consolidate the two bottom sections of `/beyondtheyellow` into a single form section titled "Keep the Movement Moving," reduce the lane picker to 3 clear intents, add conditional sub-flows per lane, and replace the disclaimer with a contact-consent acknowledgement.

## 1. Section consolidation

In `src/pages/BeyondTheYellowPage.tsx`:

- Remove the separate "Watch / Follow / Share / Nominate" section (currently lines 816–868) entirely — including the `Play`, `Share2`, `UserPlus` icon usage there.
- Rename the form section (currently "Send it in" / "If you are doing more than talking, share the story."):
  - Eyebrow: `Keep the movement moving`
  - Heading: `Keep the Movement Moving`
  - Keep the short supporting paragraph (light rewrite to fit the new title, e.g. "Pick the lane that fits and the fields will follow.").

## 2. Lane picker — reduce to 3 options

Replace the current 10-item `lanes` array with exactly:

1. `share-story` — "Share My BTY Story"
2. `nominate` — "Nominate Someone Else to BTY"
3. `promote-valorwell` — "Promote ValorWell"

Update `LaneValue`, tracking `tag`/`event` values, and the fieldset heading stays "What brings you here?".

## 3. Conditional form flows

Rework `StoryForm` so the fields shown depend on the selected lane. All flows continue to write to the existing `bty_submissions` table (reuse existing columns; put anything that doesn't map cleanly into `responses` JSON, and put the lane's sub-type — e.g. `nomination_type: "individual" | "organization"` — into `responses` as well).

### 3a. Share My BTY Story

Fields:
- First name, Last name, Email, Phone (optional)
- Textarea: "What real action are you doing? Who is measurably better off?"
- Checkbox: "I am working as part of an organization"
  - When checked, reveal a required text input: "Name of the organization you're with" (stored in `organization`).

### 3b. Nominate Someone Else to BTY

First show a required selectable control (radio buttons / segmented buttons, not free text):
- Individual
- Organization

Then reveal the matching sub-form:

**Individual (mirrors current "Make an introduction" flow, plus a social link):**
- Who are you nominating? (subject_name)
- Your first name, last name, email, phone (optional)
- Best social / video link for the nominee (new — stored in `social_link`)
- Textarea: "What real action are they doing? Who is measurably better off?"

**Organization (mirrors current "Veteran-serving organization" flow, reordered):**
Field order, top to bottom:
1. Organization name
2. Website / social media link (single input; store website in `website`, or fall back to `social_link` if it's clearly a social URL — simplest: one "Website or social link" input into `website`)
3. Point of contact block: First name, Last name, Role/Title, Email, Phone
4. Textarea: "What real action are they doing? Who is measurably better off?"

### 3c. Promote ValorWell (current "Partner" form)

Fields:
- First name, Last name, Email, Phone (optional)
- Organization, Role/Title
- Website, Best social / video link
- Textarea: "What real action are you doing? Who is measurably better off?"
- Textarea: "How do you want to help the movement travel farther?"

## 4. Consent block

Remove the existing disclaimer text ("I understand submitting this form does not guarantee being featured, partnership, sponsorship, clinical care, documentation, funding, endorsement, or any outcome.").

Replace with a single required checkbox whose label reads roughly:

> I'm okay with ValorWell contacting me using the info I've provided. If I'm nominating someone else, I confirm that person or organization is okay with being contacted this way.

Keep it wired to `form.consent` and the submit-disabled logic.

## 5. Cleanup

- Prune unused icon imports (`Play`, `Share2`, `UserPlus`, `Handshake`, `Megaphone` if no longer referenced) after the section removal.
- Any `goToFormWithLane("nominate", ...)` or similar calls elsewhere on the page that referenced removed lanes should be pointed at the new `nominate` lane value (same string, so likely no change) or removed if they targeted deleted lanes (`sponsor`, `partner`, etc.).
- Verify with `tsgo` after edits.

## Technical notes

- No DB schema change required — `bty_submissions` already has `subject_name`, `organization`, `social_link`, `website`, `role_title`, `responses` JSON, `consent`, and `tags`. New sub-type flag goes into `responses` (`responses.nomination_type`, `responses.with_organization`).
- Tracking events preserved by reusing `bty_form_submit`, `bty_lane_selected`, `bty_form_step_complete`, and adding lane-specific events like `bty_share_story_submit`, `bty_nomination_submit`, `bty_promote_valorwell_submit`.
- Nothing outside `BeyondTheYellowPage.tsx` needs to change.