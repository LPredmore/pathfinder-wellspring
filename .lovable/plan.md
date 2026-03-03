

## Influencer Portal: Login + Profile Page

### What We're Building

1. **"Login as Mission Partner"** option added to the Login dropdown in the Header (desktop + mobile)
2. **A login dialog** that authenticates against Supabase Auth using email + password
3. **An `/influencer` route** — a protected profile portal that displays the logged-in influencer's data from the `influencers` and `influencer_platforms` tables
4. **Auth state management** — a lightweight auth context so the Header can show logout when authenticated, and the `/influencer` route can redirect unauthenticated users

### Architecture Decision

Use a **React context provider** (`AuthProvider`) wrapping the app that listens to `supabase.auth.onAuthStateChange`. This is the standard Supabase + React pattern. No new dependencies needed — `@supabase/supabase-js` already handles session persistence and token refresh.

The login UI will be a **Dialog** (modal) triggered from the Header dropdown, not a separate `/login` page. This keeps the public site navigation clean — the influencer portal is a secondary feature, not the primary user journey.

The `/influencer` page queries `influencers` where `user_id = auth.uid()`, then fetches their `influencer_platforms` rows. If no session exists, redirect to `/` and open the login dialog.

### Files to Create

| File | Purpose |
|---|---|
| `src/contexts/AuthContext.tsx` | Auth provider + `useAuth()` hook. Wraps app in `App.tsx`. Exposes `session`, `user`, `signIn`, `signOut`. |
| `src/components/InfluencerLoginDialog.tsx` | Modal with email + password fields. Calls `supabase.auth.signInWithPassword()`. On success, navigates to `/influencer`. |
| `src/pages/InfluencerPortal.tsx` | Protected page at `/influencer`. Fetches and displays influencer profile + platforms. Redirects to `/` if unauthenticated. |

### Files to Modify

| File | Change |
|---|---|
| `src/App.tsx` | Wrap with `AuthProvider`. Add `/influencer` route. |
| `src/components/layout/Header.tsx` | Add "Login as Mission Partner" to both desktop and mobile Login dropdowns. When clicked, opens `InfluencerLoginDialog`. When authenticated, replace Login button with user name + Logout. |

### Auth Context Shape

```typescript
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}
```

### Influencer Portal Page

Queries:
1. `supabase.from("influencers").select("*").eq("user_id", user.id).single()` — profile data
2. `supabase.from("influencer_platforms").select("*").eq("influencer_id", influencer.id)` — platform list

Displays: name, email, state, division, personal mission, avatar, veteran connection, and a list of their social platforms with icons.

### RLS Consideration

The `influencers` table currently has a public SELECT policy (`USING (true)`). This is fine for the `/challenge` page but means any authenticated user could technically read any influencer's row. The portal queries filter by `user_id = auth.uid()` in the application layer, which is sufficient for now. If you want row-level enforcement later, you'd add a policy like `USING (user_id = auth.uid())` as a restrictive policy for authenticated users — but that would break the public `/challenge` page SELECT unless you split policies by role. No schema change needed for this feature.

### No Database Changes Required

The `influencers.user_id` column and all required tables already exist from the previous migration.

