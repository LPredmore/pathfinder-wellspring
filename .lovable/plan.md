

## Add Login Button with Client/Clinician Options

### Overview

Add a "Login" button next to the existing "Get Started" button in the header. When clicked, it displays a dropdown with two options that open external login portals in new tabs.

---

### Changes to `src/components/layout/Header.tsx`

**Desktop Navigation (after the Get Started button):**
- Add a new `DropdownMenu` component with a "Login" trigger button
- Style it as an outline variant to differentiate from the primary "Get Started" button
- Include two dropdown items:
  - "Login as Client" - opens `https://client.valorwell.org` in a new tab
  - "Login as Clinician" - opens `https://emr.valorwell.org` in a new tab

**Mobile Navigation:**
- Add a similar Login dropdown or expandable section below the "Get Started" button
- Maintains consistency with the mobile services accordion pattern

---

### Implementation Details

**Desktop (lines 91-95):**
```tsx
{/* CTA Buttons */}
<Button asChild>
  <Link to="/get-started">Get Started</Link>
</Button>

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Login</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem asChild>
      <a 
        href="https://client.valorwell.org" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Login as Client
      </a>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <a 
        href="https://emr.valorwell.org" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Login as Clinician
      </a>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Mobile (after line 171):**
- Add a Login button with dropdown functionality
- Uses same pattern as the Services accordion for consistency

---

### Visual Result

| Location | Before | After |
|----------|--------|-------|
| Desktop Header | `[Get Started]` | `[Get Started] [Login ▼]` |
| Mobile Menu | `[Get Started]` | `[Get Started]` + `[Login ▼]` |

---

### Files Changed

| File | Changes |
|------|---------|
| `src/components/layout/Header.tsx` | Add Login dropdown to desktop nav (after Get Started), add Login section to mobile menu |

