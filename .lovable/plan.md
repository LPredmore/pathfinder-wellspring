

## Multi-Step Creator Application Form + Fix Blank Screen

### 1. Fix the Blank Screen Error

The "Cannot read properties of null (reading 'useRef')" error on `TooltipProvider` is caused by duplicate React instances being loaded. The fix is to add `@radix-ui/react-tooltip` to the `dedupe` array in `vite.config.ts`.

**File: `vite.config.ts`**
- Add `"@radix-ui/react-tooltip"` to the existing `dedupe` array

---

### 2. Convert Form to Multi-Step with Progress Bar

**File: `src/components/forms/CreatorApplicationForm.tsx`**

Refactor the single scrollable form into a 4-step wizard:

- Add a `currentStep` state variable (0-3)
- Display a progress bar at the top showing "Step {currentStep + 1} of 4" using the existing `Progress` component from `@/components/ui/progress`
- Conditionally render only the fields for the current step:
  - **Step 1 (Basic Info)**: First Name, Last Name, Email, State
  - **Step 2 (Social Profiles)**: Repeating social platform entries
  - **Step 3 (Fit & Motivation)**: Motivation textarea, veteran connection radio
  - **Step 4 (Fundraising Readiness)**: Willing to share, comfort level, fundraising goal, additional info
- Add navigation buttons at the bottom:
  - "Back" button (hidden on Step 1)
  - "Next" button on Steps 1-3 (validates current step fields before advancing)
  - "Submit Application" button on Step 4
- Per-step validation: use `trigger()` from react-hook-form to validate only the fields on the current step before allowing "Next"
- Reset `currentStep` to 0 when the dialog closes

### Technical Details

**Step validation mapping:**
- Step 0: `["firstName", "lastName", "email", "state"]`
- Step 1: `["socialProfiles"]`
- Step 2: `["motivation"]` (veteranConnection is optional)
- Step 3: `["willingToShare", "comfortLevel", "fundraisingGoal"]`

**Progress bar:** Uses the existing `<Progress>` component with `value={(currentStep + 1) / 4 * 100}` and a text label "Step X of 4" above it.

**Dialog header:** The `DialogTitle` will update to show the current section name (e.g., "Basic Information", "Social Profiles", "Fit & Motivation", "Fundraising Readiness").

