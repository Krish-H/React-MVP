# useMemo Workflow Guide

This document explains the workflow and reasoning behind using `useMemo` in our React application, specifically focusing on how we structure the return values of our custom Redux hooks.

## What is `useMemo`?
`useMemo` is a React Hook that lets you cache the result of a calculation (or an object reference) between re-renders. It only recalculates the value if one of its dependencies has changed.

## Why Do We Use It?
In our application, custom hooks like `useDashboard` or `useBilling` return an object containing both state (e.g., `loading`, `error`, `data`) and actions (e.g., `fetchData`). 

In JavaScript, `{}` !== `{}`. Every time you create an object literal, it gets a new memory address. If our custom hook returns an unmemoized object, any component using that hook receives a "new" object on every render. If that object is used in `useEffect` dependency arrays or passed to memoized child components, it will destroy React's performance by triggering endless renders.

## Step-by-Step Workflow

1. **Initial Render:**
   - `<DashboardLayout />` calls `useAuth()`.
   - The hook retrieves the user state from Redux.
   - React executes `useMemo` at the bottom of the hook.
   - React caches the returned object: `{ user, loading, logout }`.

2. **Unrelated State Change:**
   - The user opens a mobile menu in `<DashboardLayout />` (local state change).
   - `<DashboardLayout />` re-renders and calls `useAuth()` again.

3. **Dependency Check:**
   - React checks the dependencies array passed to `useMemo` (e.g., `[user, loading, logout]`).
   - Have any of these specific variables changed? **No**.
   
4. **Cache Retrieval:**
   - Because the dependencies are identical, React does **not** create a new object.
   - It returns the exact same object reference from the cache.
   - Any `useEffect` hooks relying on the auth object will correctly skip execution.

## Real Codebase Example

**File:** `src/modules/auth/hooks/useAuth.js`

```javascript
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  
  const logout = useCallback(() => { /* ... */ }, [dispatch]);

  // Without useMemo, this return block creates a new object every render.
  // With useMemo, the object reference is stable until user or logout changes.
  return useMemo(() => ({
    user,
    logout
  }), [user, logout]);
};
```

## Workflow Diagram

```text
React Render Cycle
│
▼
Component calls custom hook
│
▼
Hook collects Redux state and useCallback functions
│
▼
React evaluates useMemo(() => ({ ... }), deps)
│
├────────► Have any dependencies changed?
│
├──► [YES] ──► Construct new object literal ──► React detects prop changes ──► Re-render
│
└──► [NO]  ──► Return cached object literal ──► React detects identical props ──► Skip Re-render
```
