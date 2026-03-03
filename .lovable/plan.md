

## Fix Step 4 Auto-Skip and Make Veteran Connection Required

Two issues to address:

### 1. Make `veteranConnection` mandatory
In `src/components/forms/CreatorApplicationForm.tsx`, change the zod schema from `z.string().optional()` to `z.string().min(1, "Please select an option")`.

### 2. Prevent the auto-submit bug
The "Next" button on Step 2 and the "Submit" button on Step 3 occupy the same position in the JSX tree. React reuses the DOM element, so a click on "Next" can fire as a form submit when the button type swaps instantly.

Fix: add a `key` prop to both buttons (`key="next"` and `key="submit"`) so React treats them as distinct elements and recreates the DOM node on step change.

### Files changed
- `src/components/forms/CreatorApplicationForm.tsx` — two small edits (schema + button keys)

