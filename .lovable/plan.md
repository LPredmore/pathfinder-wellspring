

## Admin Dashboard Implementation Plan

### Problem Summary

The admin user logs in via "Login as Mission Partner," gets sent to `/influencer`, and that page queries the `influencers` table for a row matching their `user_id`. Admins don't have an influencer profile, so the page shows "No Profile Found." There is no `/admin` route, no `AdminDashboard` page, and no role-checking logic anywhere in the app.

### Architecture Decision: Separate Admin Page, Not a Mode Toggle

The admin dashboard will be a **standalone page** at `/admin` rather than a conditional mode within `InfluencerPortal`. This is the correct decision for three reasons:

1. **Separation of concerns.** The influencer portal is a self-service view scoped to one user's own data. The admin view is a management tool that operates across all users. Mixing them creates a tangle of conditional rendering and dual data-fetching logic.
2. **Security clarity.** A dedicated page with its own role gate makes the access boundary explicit and auditable. There's no risk of an influencer accidentally seeing admin UI due to a rendering bug.
3. **Maintainability.** The admin page will grow (bulk actions, filters, status changes). Keeping it separate avoids bloating the influencer portal.

### Implementation Steps

#### 1. Role-aware login redirect (`InfluencerLoginDialog.tsx`)

After successful `signIn`, query `user_roles` for the authenticated user before navigating. If the user has the `admin` role, navigate to `/admin`. Otherwise, navigate to `/influencer`.

```text
signIn() → success → query user_roles where user_id = auth.uid()
  → has 'admin' role? → navigate("/admin")
  → otherwise        → navigate("/influencer")
```

This is a single async query added between the `signIn` call and the `navigate` call. The `user_roles` table already has an RLS policy allowing users to read their own roles.

#### 2. Role-aware header dropdown (`Header.tsx`)

When the user is authenticated, query `user_roles` once (via `useEffect`) to check if they're an admin. Store in local state (`isAdmin`).

- If admin: show "Admin Dashboard" link → `/admin` (instead of or in addition to "View Profile")
- If not admin: show "View Profile" → `/influencer` (current behavior)

Same change in the mobile menu section.

#### 3. New page: `AdminDashboard.tsx`

**Role gate:** On mount, query `user_roles` for the current user. If they lack the `admin` role, redirect to `/`. This is a client-side guard; the RLS policies are the real security boundary.

**List view (default state):**
- Fetch all rows from `influencers` with a separate fetch for `influencer_platforms`
- Join platforms to influencers client-side by `influencer_id`
- Render a table: Avatar, Display Name, First/Last Name, Email, State, Status, Platform count
- Search input filters by name/email
- Status filter dropdown (all / new / reviewing / approved / etc.)
- Clickable rows open the detail view

**Detail/edit view (selected influencer):**
- Reuse the same card-based layout pattern from `InfluencerPortal` (avatar, header fields, personal mission, veteran connection, platforms)
- Admin can edit: `pref_name`, `first_name`, `last_name`, `email` (influencers table only — no auth email change), `state`, `personal_mission`, `veteran_connection`, `status`, `is_competing`
- Admin can add/remove/edit social platforms
- Admin can upload a new avatar (same storage bucket logic)
- Back button returns to the list
- All updates go through the existing RLS policies (admin UPDATE policies already applied)

#### 4. Route registration (`App.tsx`)

Add: `<Route path="/admin" element={<AdminDashboard />} />`

#### 5. Auth context — add a `useIsAdmin` hook

Create a small reusable hook (e.g., in `src/hooks/useIsAdmin.ts`) that queries `user_roles` and returns `{ isAdmin: boolean, loading: boolean }`. This avoids duplicating the role query in the login dialog, header, and admin page. The hook caches the result in state and only re-queries when the user changes.

### File Changes

| File | Change |
|------|--------|
| `src/hooks/useIsAdmin.ts` | New — reusable hook querying `user_roles` for admin role |
| `src/pages/AdminDashboard.tsx` | New — full admin management page with list + detail views |
| `src/App.tsx` | Add `/admin` route |
| `src/components/InfluencerLoginDialog.tsx` | After login, check role → redirect to `/admin` or `/influencer` |
| `src/components/layout/Header.tsx` | Use `useIsAdmin` to conditionally show admin vs influencer links |

### No Database Changes Needed

The RLS policies from the previous migration already cover admin read/update on `influencers` and full CRUD on `influencer_platforms`. The `user_roles` SELECT policy already allows users to read their own roles and admins to read all roles. No new migration is required.

