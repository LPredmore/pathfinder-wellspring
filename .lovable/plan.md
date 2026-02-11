

## Add "Official Rules / Prize Terms" Step to Creator Application

### Overview

Add a 5th step to the existing 4-step Creator Application wizard that displays the official rules and prize terms, with a required checkbox the applicant must check before submitting.

### Changes

**File: `src/components/forms/CreatorApplicationForm.tsx`**

1. **Add `Checkbox` import** from `@/components/ui/checkbox`

2. **Add `acceptedRules` field to the Zod schema**
   - `acceptedRules: z.literal(true, { errorMap: () => ({ message: "You must accept the official rules to continue" }) })`

3. **Update `STEP_TITLES`** from 4 items to 5:
   - Add `"Official Rules / Prize Terms"` as the 5th entry

4. **Update `STEP_FIELDS`** from 4 entries to 5:
   - Add `["acceptedRules"]` as the 5th entry

5. **Update all "of 4" references to "of 5"**:
   - Progress text: `Step {currentStep + 1} of 5`
   - Progress bar: `((currentStep + 1) / 5) * 100`
   - Navigation: `currentStep < 4` (was `< 3`) for showing Next vs Submit
   - The `currentStep === 3` step (Fundraising Readiness) stays unchanged

6. **Add new Step 5 section** (`currentStep === 4`) containing:
   - H3 title: "Official Rules -- Creator Challenge: Sponsor a Veteran"
   - Scrollable container (`max-h-[40vh] overflow-y-auto`) with all the rules content organized with bold sub-headings:
     - **Eligibility** -- two bullet points
     - **Competition Period** -- March 1-31, 2026
     - **How Winner Is Determined** -- three bullet points
     - **Minimum to Qualify for Prize** -- $1,250 / 25 sessions
     - **Prize Provider** -- LuxGive
     - **Prize Terms Summary (Riviera Maya Magic)** -- bullet list of all terms
     - "Full terms appear on the winner certificate."
   - Required checkbox using the `Checkbox` component with label: "I have read and agree to the Official Rules and Prize Terms *"
   - Validation error message below if unchecked

7. **Update `saveStepData`** -- add `else if (step === 3)` to save Step 4 (Fundraising Readiness) data before advancing to Step 5. Currently Step 4 data is only saved on final submit; with a new step in between, it needs to be persisted when clicking Next.

8. **Update `onSubmit` payload** -- add `accepted_rules: true` to the final update/insert payloads (records that the applicant agreed).

9. **Update `defaultValues`** -- add `acceptedRules: false as any` (since the field expects `true` literal, false will fail validation as intended).

### No database migration needed

The `accepted_rules` boolean will be included in the update payload using the existing `as any` cast pattern. If the column doesn't exist in the table yet, it will be silently ignored by Supabase -- no error. The rules content is purely client-side display.

### Technical Summary

| Aspect | Detail |
|--------|--------|
| Files modified | `src/components/forms/CreatorApplicationForm.tsx` only |
| New dependencies | None (Checkbox component already exists) |
| Database changes | None required |
| Step count | 4 --> 5 |

