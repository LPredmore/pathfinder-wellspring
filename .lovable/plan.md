

## Auto-Compute Division and Default Display Name

### Changes to `src/components/forms/CreatorApplicationForm.tsx`

**1. Auto-compute `division` from social profiles**

In the `onSubmit` function (and the fallback full-insert path), compute the division before saving:
- Check all `socialProfiles` entries — if ANY has `followers >= 10000`, set `division = "Elite"`
- Otherwise, set `division = "Hero"`
- Include `division` in the final update/insert payload

Also include `division` in the Step 1 social profiles save (`saveStepData` step 1) so the value is captured as early as possible. Since social profiles are saved at step 1, the division logic will run there AND again at final submit to ensure it reflects the latest data.

**2. Default `pref_name` to full name**

In both the Step 0 save (`saveStepData` step 0) and the final submit fallback insert, change:
- `pref_name: data.prefName || null` to `pref_name: data.prefName || \`${data.firstName} ${data.lastName}\``

This ensures that if the user leaves the preferred display name blank, their first and last name are saved instead.

### Technical Details

Both changes are string-level edits within the existing `saveStepData` and `onSubmit` functions. No new components, no schema changes, no database migrations needed — the `division` and `pref_name` columns already exist on `creator_applications`.

**Division computation helper** (added near the top of the component or inline):
```typescript
const computeDivision = (profiles: { followers: number }[]) =>
  profiles.some((p) => p.followers >= 10000) ? "Elite" : "Hero";
```

**Touched code locations:**
- `saveStepData` step 0: default `pref_name`
- `saveStepData` step 1: add `division` to the update payload
- `onSubmit` (rowId path): add `division` to final payload
- `onSubmit` (fallback insert path): add `division` and default `pref_name`

