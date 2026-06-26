# Healthcare Management System Frontend Architecture

## 1. Project Goal

## Healthcare Management System Frontend

Goal:

Build a scalable, secure, multi-tenant healthcare SaaS dashboard.

Users:

- Admin
- Doctor
- Nurse
- Receptionist
- Pharmacist
- Patient


Main Focus:

- Security
- Performance
- Maintainability
- Scalability
- Consistent UI
- Clean architecture


---

# 2. Tech Stack

Core:

- React.js
- Redux Toolkit
- Redux Saga
- React Router
- Axios
- styled-components
- React Hook Form


UI:

Primary UI Library:

- Ant Design


Supported UI Libraries:

- Semantic UI React
- Material UI


Rules:

- Do not mix UI libraries randomly.
- Use Ant Design for enterprise components.
- Wrap UI library components when required.
- Follow theme tokens.


---

# 3. Application Architecture


The application follows a modular architecture.


Every business feature must be isolated.


Modules contain:

- Redux state
- API layer
- Hooks
- Components
- Pages


Do not put business logic directly inside components.


---

# 4. Folder Structure


src/

```
src
│
├── app
│   ├── store.js
│   ├── rootReducer.js
│   ├── rootSaga.js
│   └── sagaMiddleware.js
│
├── config
│   ├── environment.js
│   ├── tenantConfig.js
│   └── apiEndpoints.js
│
├── services
│   ├── axiosClient.js
│   ├── apiService.js
│   ├── tokenService.js
│   └── encryptionService.js
│
├── modules
│
│   ├── auth
│   │   ├── authSlice.js
│   │   ├── authSaga.js
│   │   ├── authAPI.js
│   │   └── hooks
│   │       └── useAuth.js
│
│   ├── tenant
│   │   ├── tenantSlice.js
│   │   ├── tenantSaga.js
│   │   ├── tenantAPI.js
│   │   └── hooks
│   │       └── useTenant.js
│
│   ├── patients
│   │   ├── patientSlice.js
│   │   ├── patientSaga.js
│   │   ├── patientAPI.js
│   │   └── hooks
│   │       └── usePatients.js
│
│   ├── appointments
│   │   ├── appointmentSlice.js
│   │   ├── appointmentSaga.js
│   │   ├── appointmentAPI.js
│   │   └── hooks
│   │       └── useAppointments.js
│
│   └── other modules
│
│
├── components
│
│   ├── common
│   │   ├── Button
│   │   ├── Input
│   │   ├── Card
│   │   ├── Table
│   │   ├── Modal
│   │   └── Loader
│
│   ├── layout
│   │   ├── Header
│   │   ├── Sidebar
│   │   ├── Footer
│   │   └── DashboardLayout
│
├── pages
│
├── routes
│   ├── AppRouter.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleBasedRoute.jsx
│
├── themes
│   ├── darkTheme.js
│   ├── warmTheme.js
│   └── GlobalStyles.js
│
├── hooks
│
├── utils
│
└── assets
```


---

# 5. Module Structure Rule


Every module must contain:


```
moduleName/

moduleSlice.js

moduleSaga.js

moduleAPI.js

selectors.js

hooks/

components/

pages/
```


Example:


```
patients/

patientSlice.js

patientSaga.js

patientAPI.js

hooks/usePatients.js

components/PatientCard.jsx

pages/PatientList.jsx
```


---

# 6. Redux Saga Flow


All server communication uses Redux Saga.


Flow:


```
Component

↓

Custom Hook

↓

dispatch()

↓

Slice Action

↓

Saga

↓

API Service

↓

Backend

↓

Saga Response

↓

Slice Update

↓

UI Update
```


Rules:

- No API calls inside components.
- No axios inside components.
- No fetch inside components.


---

# 7. Axios API Architecture


All API requests must use:


```
services/axiosClient.js
```


Responsibilities:


- Base URL
- JWT token injection
- Refresh token
- CSRF token
- Tenant headers
- Error handling


Never use:


```js
axios.get()
axios.post()
```


inside:

- Components
- Pages
- Hooks


---

# 8. Authentication Module


Features:


- Login
- Logout
- Token validation
- Refresh token
- Session restore
- Auto logout


Flow:


```
Login Page

↓

authSaga

↓

Backend Login API

↓

Store Token

↓

Save User Role

↓

Redirect
```


---

# 9. Role Based Access Control


Supported Roles:


- ADMIN
- DOCTOR
- NURSE
- RECEPTIONIST
- PHARMACIST
- PATIENT


Protected routes must use:


```
ProtectedRoute

RoleBasedRoute
```


Role access:


Admin:

- Staff management
- Billing
- Settings


Doctor:

- Patients
- Appointments
- Prescriptions


Nurse:

- Patients
- Appointments


Patient:

- Own data only


---

# 10. Multi Tenant System


Tenant flow:


```
Domain

↓

Tenant Detection

↓

Tenant API

↓

tenantSlice

↓

Theme Load
```


Tenant controls:


- Logo
- Colors
- Branding
- Theme


---

# 11. Theme System


Use:


```
styled-components ThemeProvider
```


Theme files:


```
themes/

darkTheme.js

warmTheme.js
```


All styling must use:


```
theme.colors

theme.spacing

theme.radius

theme.typography

theme.shadow
```


Never hardcode:


```css
color:red;
background:#fff;
```


---

# 12. UI Component Rules


Reusable components:


```
components/common
```


Contains:


- Button
- Input
- Card
- Table
- Modal
- Loader


Do not directly use Ant Design components inside modules.


Example:


Wrong:

```js
import { Button } from "antd"
```


Correct:


```js
import Button from components/common/Button
```


---

# 13. UI Library Rules


Primary:


Ant Design


Use for:


- Table
- Form
- Modal
- Select
- DatePicker
- Pagination
- Layout


Rules:


- Do not use default Ant colors.
- Apply theme tokens.
- Keep reusable wrappers.
- Avoid duplicate components.


---

# 14. Responsive Rules


Desktop:

1440px


Tablet:

768px


Mobile:

390px


Use:


- Flex
- Grid
- Responsive breakpoints


Every module must support:


Desktop

Tablet

Mobile


---

# 15. Security Rules


Frontend security:


- CSRF protection
- Token rotation
- Refresh token
- Idle logout
- Role protection
- Secure requests


Security module:


```
modules/security
```


---

# 16. Module Completion Checklist


Every module requires:


✓ UI Page

✓ Redux Slice

✓ Saga

✓ API Service

✓ Custom Hook

✓ Loading State

✓ Error State

✓ Empty State

✓ Permission Check

✓ Responsive UI


---

# 17. AI Development Rules


When generating code:


1. Follow existing folder structure.

2. Do not create unnecessary files.

3. Do not install new libraries.

4. Reuse existing components.

5. Use theme variables.

6. Do not hardcode colors.

7. Use Redux flow.

8. Do not call API directly.

9. Check existing code first.

10. Keep components reusable.


---

# Final Goal


This architecture supports:


✓ Healthcare SaaS Platform

✓ Multi Tenant System

✓ Secure Authentication

✓ Redux Saga Architecture

✓ Role Based Access

✓ Scalable Modules

✓ Production Level UI

✓ Maintainable Codebase