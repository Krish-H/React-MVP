# React.memo Workflow Guide

This document explains the workflow and reasoning behind using `React.memo` in our React application, focusing on optimizing our heavy UI components.

## What is `React.memo`?
`React.memo` is a Higher-Order Component (HOC). It wraps a React component and tells React to memorize the rendered output. If the parent component re-renders, React will skip re-rendering the wrapped component as long as its incoming props have not changed.

## Why Do We Use It?
By default, when a parent component re-renders, React recursively re-renders all of its children. In heavy enterprise applications, this is a massive waste of CPU cycles. 

For example, if a user is typing in a search bar on the Dashboard, the Dashboard re-renders on every keystroke. Without `React.memo`, every single `StatsCard` and `RecentActivity` widget would also re-render on every keystroke, causing the browser to lag. `React.memo` acts as a shield, protecting pure presentational components from unrelated updates.

## Step-by-Step Workflow

1. **Parent Re-renders:**
   - The parent `<Dashboard />` component state changes (e.g., a filter is applied).
   - React starts the reconciliation phase and begins to re-render the Dashboard.

2. **React Reaches the Memoized Child:**
   - React encounters `<StatsCard title="Revenue" value="$10,000" />`.
   - Because `StatsCard` is wrapped in `React.memo`, React pauses.

3. **Shallow Prop Comparison:**
   - React compares the *old* props to the *new* props using shallow equality (`===`).
   - `oldProps.title === newProps.title`
   - `oldProps.value === newProps.value`

4. **Render Decision:**
   - If **all** props are identical, React skips rendering `<StatsCard />` entirely and reuses the previous DOM output.
   - If **any** prop has changed, React re-evaluates the component and updates the DOM.

## Real Codebase Example

**File:** `src/modules/dashboard/components/StatsCard.jsx`

```javascript
import React from 'react';

// StatsCard is wrapped in React.memo. 
// It will only re-render if 'title', 'value', 'icon', 'color', or 'trend' changes.
const StatsCard = React.memo(({ title, value, icon, color, trend }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
      <span>{trend}</span>
    </div>
  );
});

export default StatsCard;
```

**File:** `src/pages/Patients/components/PatientForm.jsx`
*We also apply this to massive forms so they don't lag when parent layout states change.*

## Workflow Diagram

```text
Parent Component State Updates
│
▼
Parent Re-renders
│
▼
React encounters <React.memo(ChildComponent) />
│
▼
Performs shallow comparison (oldProps === newProps)
│
├────────► Are props identical?
│
├──► [YES] ──► Skip Render Phase ──► Reuse existing DOM nodes (High Performance)
│
└──► [NO]  ──► Execute Render Phase ──► Update DOM
```
