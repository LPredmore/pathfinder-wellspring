## Goal
Add a "Login" button with a dropdown menu to the top-right of the site header, positioned to the right of the existing "Find Care" button. The dropdown should offer two external links:
- **Client** → https://client.valorwell.org
- **Clinician** → https://emr.valorwell.org

## Implementation
1. **Modify `src/components/layout/Header.tsx`**
   - Add a new "Login" dropdown button inside the desktop nav flex container, placed after the "Find Care" button (top-right).
   - Use the existing `ChevronDown` icon and dropdown markup pattern already present in the header (the "Get Involved" dropdown) for visual and behavioral consistency.
   - The dropdown items will be external `<a>` links (not `<Link>`) pointing to the two URLs above, opening in the same tab.
   - Ensure the dropdown closes on navigation, outside clicks, and Escape key — following the same behavior as the existing "Get Involved" dropdown.
   - Add corresponding mobile support so the Login dropdown is accessible in the mobile hamburger menu.

## Out of Scope
- No backend changes.
- No authentication logic — these are simple external link redirects.
- No changes to other header items or navigation structure.
