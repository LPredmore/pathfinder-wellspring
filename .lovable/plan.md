Update the homepage hero video placeholder to use the provided YouTube Short.

## What will change
- File: `src/pages/HomePage.tsx`
- Constant: `HERO_SHORT_VIDEO_ID` currently `""`
- New value: `"OugB8UujBfw"` extracted from `https://youtube.com/shorts/OugB8UujBfw?feature=share`

## Why this works
The `ClickToLoadYouTubeShort` component already accepts a `videoId` prop and renders the thumbnail + player. The empty constant is the only thing preventing the video from displaying.

## Verification
- Build the project to confirm no new errors.
- Check the homepage preview to ensure the hero Short loads its thumbnail and plays on click.

No other pages, copy, design, or behavior will change.