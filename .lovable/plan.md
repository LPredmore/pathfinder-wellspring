

## Save Support Sessions Form Submissions to Supabase

### Overview

Create a new Supabase table to store Support Sessions inquiries from the `/get-started` page. This ensures all potential client leads are captured for follow-up.

---

### 1. Database Table: `support_session_inquiries`

Create a new table to store form submissions with the following structure:

```sql
CREATE TABLE public.support_session_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  state text NOT NULL,
  seeking_care text NOT NULL,
  service_type text NOT NULL DEFAULT 'support-sessions',
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_session_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (same pattern as therapist_applications)
CREATE POLICY "Allow anonymous inserts"
ON public.support_session_inquiries
FOR INSERT
TO anon
WITH CHECK (true);
```

**Columns:**
| Column | Type | Purpose |
|--------|------|---------|
| `id` | uuid | Primary key |
| `first_name` | text | Client's first name |
| `last_name` | text | Client's last name |
| `email` | text | Contact email |
| `phone` | text | Optional phone number |
| `state` | text | US state for matching |
| `seeking_care` | text | Who needs care (veteran, family, etc.) |
| `service_type` | text | Always "support-sessions" |
| `status` | text | Tracking status (new, contacted, scheduled) |
| `created_at` | timestamp | Submission timestamp |

---

### 2. Update GetStarted.tsx Form Submission

Modify the `handleSubmit` function to save to Supabase:

```typescript
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Inside component:
const { toast } = useToast();
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const { error } = await supabase
    .from("support_session_inquiries")
    .insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone || null,
      state: formData.state,
      seeking_care: formData.seekingCare,
      service_type: selectedService,
    });

  setIsSubmitting(false);

  if (error) {
    toast({
      title: "Something went wrong",
      description: "Please try again or contact support@valorwell.org",
      variant: "destructive",
    });
    return;
  }

  setSubmitted(true);
};
```

Also update the submit button to show loading state:

```typescript
<Button
  type="submit"
  className="w-full"
  disabled={!isFormValid || isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</Button>
```

---

### 3. File Changes Summary

| File | Changes |
|------|---------|
| Database migration | Create `support_session_inquiries` table with RLS |
| `src/pages/GetStarted.tsx` | Add Supabase insert, loading state, error handling |

---

### Technical Notes

- Uses the same RLS pattern as `therapist_applications` (anonymous insert only, no select/update/delete for public)
- Data is accessible via Supabase dashboard for staff to review and follow up
- The `status` field allows future tracking of inquiry progress
- Error handling shows a toast notification if submission fails
- Loading state prevents double-submissions

