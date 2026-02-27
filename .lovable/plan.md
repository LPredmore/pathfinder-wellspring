

## Add "Preferred Display Name" Field to Step 1

### Overview
Add an optional "Preferred Display Name" text field to Step 1 (Basic Information) of the creator application form, saving it to the existing `pref_name` column in the `creator_applications` table.

### Changes (single file)

**File: `src/components/forms/CreatorApplicationForm.tsx`**

1. **Zod schema** (line ~78): Add `prefName: z.string().trim().max(100).optional()` field.

2. **STEP_FIELDS** (line ~102): Add `"prefName"` to the step 0 array so it validates with the rest of Basic Info.

3. **Step 0 save payloads**: Include `pref_name: data.prefName || null` in both:
   - The initial insert (line ~161)
   - The step 0 update payload (line ~184)

4. **Final fallback insert** (line ~264): Include `pref_name: data.prefName || null`.

5. **Step 1 UI** (after the Last Name field, around line ~341): Add a new full-width field:
   - Label: "Preferred Display Name"
   - Helper text: "How would you like your name shown publicly? (optional)"
   - No asterisk (it's optional)

### No database changes needed
The `pref_name` column already exists as a nullable text column in `creator_applications`.
