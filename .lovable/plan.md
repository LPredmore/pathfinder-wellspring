

## Admin Influencer Management Dashboard

### Overview
Create an admin dashboard at `/admin` that lets admin users view all influencer profiles in a sortable table, click into any profile, and edit all their information — using the same editing UI patterns already in the Influencer Portal.

### Routing & Auth Flow

**Login redirect logic**: Update `InfluencerLoginDialog` to check the user's role after login. If they have the `admin` role (via `user_roles` table), redirect to `/admin` instead of `/influencer`. Similarly, update the Header "My Portal" dropdown to show "Admin Dashboard" link for admins.

**New route**: `/admin` → `AdminDashboard` page

**Role check**: Query `user_roles` table on the admin page to verify the logged-in user has the `admin` role. Redirect non-admins away.

### Database Changes (Migration)

Add RLS policies so admins can update influencer data directly:

```sql
-- Admin can update influencers
CREATE POLICY "Admins can update influencers"
ON public.influencers FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin can manage all influencer platforms
CREATE POLICY "Admins can insert influencer platforms"
ON public.influencer_platforms FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update influencer platforms"
ON public.influencer_platforms FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete influencer platforms"
ON public.influencer_platforms FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
```

### New Page: `src/pages/AdminDashboard.tsx`

**List View** (default):
- Fetches all influencers with their platforms
- Displays a table with columns: Avatar, Name, Email, State, Status, Division, Platforms count
- Sortable by status (filter dropdown), name, state
- Search/filter bar for quick lookup
- Click a row to open that influencer's detail/edit view

**Detail/Edit View** (inline or separate panel):
- When an influencer is selected, show their full profile in an editable form — reusing the same card-based layout as the Influencer Portal
- Admin can edit: avatar (upload), display name, first name, last name, email, state, personal mission, veteran connection, status, is_competing flag
- Admin can manage their social platforms (add/remove/edit)
- Note: admin edits to email will NOT update auth email (only the influencers table), since admins shouldn't change another user's auth credentials
- Back button to return to the list

### File Changes

| File | Change |
|------|--------|
| `src/pages/AdminDashboard.tsx` | New file — list + detail views |
| `src/App.tsx` | Add `/admin` route |
| `src/components/InfluencerLoginDialog.tsx` | After login, check role and redirect to `/admin` or `/influencer` |
| `src/components/layout/Header.tsx` | Show "Admin Dashboard" link in My Portal dropdown for admin users |
| Migration SQL | Add admin RLS policies on `influencers` and `influencer_platforms` |

### Header Portal Dropdown (for admins)

Add a state check: after auth, query `user_roles` for the current user. If admin, show "Admin Dashboard" link pointing to `/admin` instead of (or in addition to) "View Profile".

