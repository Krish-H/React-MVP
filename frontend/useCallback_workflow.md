# useCallback Workflow Guide

This document explains the workflow and reasoning behind using `useCallback` in our React application, specifically focusing on our custom Redux hooks.

## What is `useCallback`?
`useCallback` is a React Hook that lets you cache a function definition between re-renders. It returns a memoized version of the callback that only changes if one of the dependencies has changed.

## Why Do We Use It?
In our architecture, we use custom hooks (e.g., `usePatients`, `useAuth`) to abstract Redux logic away from our UI components. These hooks return functions that dispatch Redux actions.

If we don't use `useCallback`, React creates a **brand new function reference** every time the custom hook is executed (which happens on every render of the consuming component). If these functions are passed down as props to child components (like buttons or tables), those child components will needlessly re-render because React thinks the prop has changed.

## Step-by-Step Workflow

1. **Initial Render:**
   - A component calls `usePatients()`.
   - React executes `useCallback` inside the hook.
   - The function `fetchPatients` is created and cached in memory.

2. **State Change / Re-render:**
   - Redux state updates (e.g., `listLoading` becomes `true`).
   - The component re-renders and calls `usePatients()` again.
   - React encounters `useCallback` and checks the dependency array (`[dispatch]`).

3. **Dependency Check:**
   - Has `dispatch` changed? **No** (Redux dispatch never changes).
   - React **skips** recreating the function.
   - React returns the exact same function reference from Step 1.

4. **Child Component Evaluation:**
   - The component passes `fetchPatients` as a prop to `<PatientTable refresh={fetchPatients} />`.
   - `<PatientTable />` compares its old props to new props.
   - Since the function reference is identical, the table skips unnecessary re-renders.

## Real Codebase Example

**File:** `src/modules/patients/hooks/usePatients.js`

```javascript
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPatientsRequest } from '../patientSlice';

export const usePatients = () => {
  const dispatch = useDispatch();

  // If this was an inline arrow function, it would be recreated every render.
  // By using useCallback, `fetchPatients` keeps the same memory address.
  const fetchPatients = useCallback(() => {
    dispatch(fetchPatientsRequest());
  }, [dispatch]);

  return {
    fetchPatients
  };
};
```

## Workflow Diagram

```text
React Render Cycle
│
▼
Component calls usePatients()
│
▼
React evaluates useCallback(fn, deps)
│
├────────► Are dependencies (dispatch) the same as last render?
│
├──► [YES] ──► Return cached function reference ──► Child components don't re-render
│
└──► [NO]  ──► Create new function reference ────► Child components re-render
```
