# Healthcare Common UI Components

This directory contains the highly reusable, foundational UI components for the Healthcare SaaS application.

## Design Philosophy
We utilize **Ant Design** under the hood for accessibility and robust functionality, but we wrap EVERY component with **styled-components** to inject our precise `warmTheme.js` design tokens. 

> **Never use default Ant Design components directly in feature modules.** Always import them from `@/components/common` to guarantee visual consistency.

---

## Available Components

### `Button`
Supports variants seamlessly mapped to the brand colors.
```jsx
import { Button } from '../../components/common';

<Button variant="primary" loading={isSubmitting}>Save Patient</Button>
<Button variant="default">Cancel</Button>
<Button variant="danger">Delete Record</Button>
```

### `Input`
Provides text, search, and password inputs tailored to the theme's border radius and focus glow.
```jsx
import { Input } from '../../components/common';

<Input type="text" placeholder="Patient Name" />
<Input type="password" placeholder="••••••" />
<Input type="search" placeholder="Search records..." />
```

### `Card`
Floating SaaS-style containers with optional shadow disabling.
```jsx
import { Card } from '../../components/common';

<Card title="Patient Vitals" noShadow={false}>
  <p>Heart Rate: 80bpm</p>
</Card>
```

### `Table`
Wrapped Ant Table with custom header colors, hover states, and automated `EmptyState` injection when `dataSource` is empty.
```jsx
import { Table } from '../../components/common';

<Table columns={columns} dataSource={data} emptyText="No invoices found." />
```

### `FormInput`
Wrapper connecting our custom `Input` and `Select` to Ant Design's `Form.Item` for seamless validation and styling.
```jsx
import { FormInput } from '../../components/common';

<FormInput label="Email" name="email" type="email" rules={[{ required: true }]} />
<FormInput label="Role" name="role" type="select" options={[{label: 'Admin', value: 1}]} />
```

### States (`Loader`, `EmptyState`, `ErrorState`)
Standardized feedback UI.
```jsx
import { Loader, EmptyState, ErrorState } from '../../components/common';

if (loading) return <Loader />;
if (error) return <ErrorState message="API connection lost" onRetry={refetch} />;
if (!data.length) return <EmptyState message="No appointments scheduled" />;
```

## Maintenance Rules
1. Do not hardcode colors in these components. Always use `${({ theme }) => theme.colors...}`.
2. If Ant Design updates its DOM structure, update the `&&` styled-component selectors here.
