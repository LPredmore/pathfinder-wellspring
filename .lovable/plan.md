
## Goal

Make every unscoped page (Privacy, Contact, FAQ, Support, Donate, Watch, NotFound, authority/*, PageShell, shared sections) match the Home page palette by promoting Home's "Field Dispatch" tokens to the global defaults. Switch all text to Arial. Do not touch pages that were built with their own scoped palette.

## Pages left alone (intentionally distinct)

- Operation Claims Success — evergreen/gold editorial (hardcoded hex)
- Clinicians, Get Care, Partner — `.clinicians-theme` wrapper (same family as Home, harmless to keep)
- Beyond The Yellow — gold-accent overlay on the base palette

These already share the same base green/paper/rust identity as Home. Nothing changes visually for them.

## Changes

### 1. `src/index.css` — replace the `:root` patriotic tokens with the Field Dispatch palette

Swap the light-mode values to Home's scoped palette so every default-token page (Privacy, Contact, FAQ, etc.) picks them up automatically:

```
--background: 43 40% 93%     /* #F4F1E8 paper */
--foreground: 145 9% 15%     /* #1F2A24 ink */
--card / popover: same paper/ink
--primary: 145 15% 27%       /* #3B5147 evergreen */
--primary-foreground: 43 40% 93%
--secondary / muted: 44 33% 88%   /* #EAE5D6 paper-2 */
--muted-foreground: 145 9% 35%
--accent: 9 51% 46%          /* #B24A3A rust */
--accent-foreground: 43 40% 93%
--border / input: 145 9% 80%
--ring: 145 15% 27%
--section-alt / hero-gradient-*: paper / paper-2
--trust-bg: 44 33% 88%
```

Also update dark-mode values to a green-forward dark equivalent (deep ink bg, evergreen primary, muted rust accent) so dark mode stays coherent.

Keep the legacy `--navy`, `--patriot-red`, `--sky-blue`, `--gold-accent` variables defined but retune them to fit the new palette (navy → evergreen, patriot-red → rust, sky-blue → paper-2, gold stays). This keeps any lingering `text-navy` / `bg-patriot-red` utility classes on shared components rendering in-palette instead of breaking.

Delete the `.clinicians-theme` block at the bottom of `index.css` (its values now equal the globals; the Trebuchet override is gone in step 3).

### 2. `tailwind.config.ts` — switch font stack to Arial

```
fontFamily: {
  sans:    ["Arial", "Helvetica", "sans-serif"],
  heading: ["Arial", "Helvetica", "sans-serif"],
  display: ["Arial", "Helvetica", "sans-serif"],
}
```

### 3. Remove Trebuchet MS overrides

- `src/pages/HomePage.tsx` — delete the two `font-family: "Trebuchet MS"…` lines inside the `.home-theme` inline `<style>` block (lines ~165 and ~169). Leave the palette scoping alone for now (harmless duplicate of globals; can be removed later).
- `src/pages/MissionPage.tsx` — same edit (lines ~147 and ~150).
- `src/index.css` — the `.clinicians-theme` deletion in step 1 also removes its Trebuchet overrides.

### 4. Verify

- `/privacy`, `/contact`, `/faq`, `/support`, `/donate`, `/watch`, `/404`, `/authority/*` — background is paper, text is dark ink, headings/buttons/links use evergreen, accents are rust. Font is Arial.
- Home, Mission — visually unchanged (scoped palette matches globals; font now Arial instead of Trebuchet).
- OCS, Clinicians, Get Care, Partner, BTY — visually unchanged (they hardcode their own colors; only the font changes to Arial).
- Type-check passes.

## Not doing

- Not touching OCS / Clinicians / Get Care / Partner / BTY color code.
- Not rewriting shared components' color classes — they'll auto-adopt the new tokens.
- Not removing the `.home-theme` scoped block from HomePage in this pass (safe cleanup for a later turn).
