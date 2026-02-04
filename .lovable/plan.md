

## Add Google Analytics Tag (G-H5X3D2DGKB)

### Current State

The `index.html` already has a Google tag setup with:
- Google Ads: `AW-11339741081`
- Google Analytics 4: `G-TZMBM6V5DW`

Since this is a single-page application (SPA), the `index.html` file is loaded once and serves all pages. The existing gtag setup already initializes the `dataLayer` and loads the gtag.js script.

### Implementation

Add the new tracking ID `G-H5X3D2DGKB` to the existing gtag configuration. This is the correct approach because:

1. Only one gtag.js script load is needed (the script handles multiple property IDs)
2. The `dataLayer` is already initialized
3. Adding another `gtag('config', 'ID')` call registers the additional property

### Change

**File: `index.html`**

Add a single line to the existing script block:

```text
gtag('config', 'AW-11339741081');
gtag('config', 'G-TZMBM6V5DW');
gtag('config', 'G-H5X3D2DGKB');  // <-- Add this line
```

This ensures all pageviews and events are sent to all three tracking properties (Google Ads and both GA4 properties).

