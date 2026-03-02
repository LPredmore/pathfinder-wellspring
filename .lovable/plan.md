

## Replace Leaderboard Placeholders with Live Zeffy Leaderboard

### What Changes

Replace the two "Coming Soon" placeholder cards (Hero Division / Elite Division) on lines 218-228 with a single, prominent "Current Challenge" leaderboard section that embeds the Zeffy leaderboard iframe.

### File Changed

**`src/pages/Competitions.tsx`** -- one edit region (lines 218-228)

### Layout

The two placeholder cards get replaced with a single full-width `Card` that:

- Has a bold heading: "Current Challenge" with a `Trophy` icon
- Contains the Zeffy leaderboard iframe embedded responsively
- Uses a primary border (`border-2 border-primary`) to make it visually prominent and match the "Become a Mission Partner" card above
- The iframe container uses `relative overflow-hidden w-full` with `padding-top: 240px` (matching the provided embed code) so it scales properly

### Technical Details

The embed markup translated to React/JSX:

```tsx
<Card className="border-2 border-primary">
  <CardHeader className="text-center">
    <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
    <CardTitle className="text-2xl">Current Challenge</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="relative overflow-hidden w-full" style={{ paddingTop: "240px" }}>
      <iframe
        title="Donation form powered by Zeffy"
        className="absolute inset-0 w-full h-full border-0"
        src="https://www.zeffy.com/embed/leaderboard/creator-challenge-sponsor-a-veteran"
        allowTransparency
      />
    </div>
  </CardContent>
</Card>
```

- `Trophy` icon is already imported
- No new dependencies or components needed
- Single edit replacing lines 218-228
