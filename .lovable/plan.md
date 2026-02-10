

## Competitions Page Updates + Footer Link

### 1. Remove two FAQ items
Remove "Is my donation tax-deductible?" and "What is Zeffy's optional checkout tip?" from the `faqItems` array, leaving 4 FAQ entries.

### 2. Update "Where does the money go?" answer
Change to: "Donations fund mental health therapy sessions for veterans through the Bridge Program. Every dollar goes to pay for actual therapy sessions for a veteran in need. This is what makes us different."

### 3. Remove "(provided through LuxGive)" from Prize section
Change the prize text to: "The top fundraiser wins a romantic resort vacation package in Mexico. Full prize details and terms are provided on the application page."

### 4. Update "Sponsor a Session" and "Become a Monthly Sponsor" links
All three buttons (card footer + final CTA) currently linking to `#sponsor-session` will link to `https://valorwell.org/donate` instead, opening in a new tab.

### 5. "Support a Creator" buttons show toast notification
Both "Support a Creator" buttons (card + final CTA) will become regular buttons (not links) that trigger a Sonner toast: "Competition starts on March 1, 2026". Import `toast` from `sonner`.

### 6. Add "Competition" link to footer
Add a new entry `{ name: "Competition", href: "/competitions" }` to the `getInvolved` array in `Footer.tsx`, with a `Trophy` icon.

### 7. Add resort prize images
Copy all 5 uploaded images to `src/assets/` and add a visually striking image gallery in the Prize section — a full-width hero-style showcase with a large featured image and smaller thumbnails below, placed right after the prize description text.

---

### Technical Details

**Files modified:**
| File | Changes |
|------|---------|
| `src/pages/Competitions.tsx` | Remove 2 FAQ items, update FAQ answer, update prize text, update button links, add toast for "Support a Creator", add image gallery in Prize section |
| `src/components/layout/Footer.tsx` | Add "Competition" link with Trophy icon to Get Involved column |

**New assets (copied from uploads):**
- `src/assets/resort-beach.png`
- `src/assets/resort-dinner.png`
- `src/assets/resort-pool-sunset.png`
- `src/assets/resort-pool-day.png`
- `src/assets/resort-infinity.png`

