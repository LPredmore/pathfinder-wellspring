## Delete Selected Refusal Points from Operation Claims Success Page

### Summary
Remove two selected list items from the "Our Refusal" section on `/operation-claims-success`.

### Selected Items to Delete
1. "We will not sell a guaranteed VA outcome."
2. "We will not promise access or authorization we do not control."

### Implementation
- Edit `src/pages/OperationClaimsSuccessPage.tsx`.
- Remove the two corresponding strings from the `refusalPoints` array (currently the 1st and 4th entries).
- Verify the page compiles.

No other pages, routes, or functional infrastructure will be changed.