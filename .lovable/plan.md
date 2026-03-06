

## Plan: Create Auth Entries for Current Competitors

### Context
There are 13 competitors in `current_competitors`, all linked to `influencers` rows. All have `user_id = null` on their influencer records, and the `profiles` table is empty (we just cleaned it). We need to create auth users, profiles, user_roles, and link everything back.

### Approach: New Edge Function

Create a one-time-use edge function `backfill-competitor-auth` that, when called by an admin:

1. Fetches all `current_competitors` joined with `influencers` to get email, name, and influencer IDs
2. For each competitor:
   - Generates a random password
   - Creates an `auth.users` entry via `supabase.auth.admin.createUser()`
   - Inserts a `profiles` row (id = new user id, email, password)
   - Inserts a `user_roles` row (user_id, role = 'influencer')
   - Updates the `influencers` row to set `user_id` to the new auth user id
3. Returns a summary of successes and failures

### Why an Edge Function?
- Creating auth users requires `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- This mirrors the existing `create-mission-partner` function's pattern
- Can be triggered once from the browser or via curl, then deleted

### Technical Details

- **New file**: `supabase/functions/backfill-competitor-auth/index.ts`
- Uses the same password generation utility as `create-mission-partner`
- Processes all 13 users in a loop, collecting results
- No welcome email sent (these are existing users being backfilled)
- After running successfully, the function can be deleted

### No Database Schema Changes
All required tables and columns already exist. The only data changes are INSERT into `profiles`, `user_roles`, and UPDATE on `influencers.user_id` — all done server-side via service role.

