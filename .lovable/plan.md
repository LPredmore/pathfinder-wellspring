

## Fix: Duplicate React Instances Error

### What's Happening

The error `Cannot read properties of null (reading 'useEffect')` indicates that multiple copies of React are present in the bundle. When different libraries (like `@tanstack/react-query`) use their own bundled copy of React instead of the shared one, hooks fail because React's internal state is not shared between instances.

### Solution

Add a `dedupe` configuration to `vite.config.ts` that tells Vite to resolve all React-related imports to a single location, even if multiple versions exist in `node_modules`.

### Change

**File: `vite.config.ts`**

Add a `dedupe` array to the `resolve` configuration:

```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  dedupe: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-query"],
},
```

This ensures all packages share the same React instance, preventing the hooks error.

