# HealthManager SaaS - Complete Architecture & Workflow Guide

Welcome to the team! This document serves as the comprehensive technical onboarding guide for the HealthManager SaaS application. It traces the exact implementations of our core workflows across both the React Frontend and PHP-MVP Backend.

---

## 1. React Performance Optimizations

Our frontend architecture relies heavily on React's memoization features to prevent unnecessary reconciliation in large DOM trees (like Dashboards and Patient Tables).

### 1.1 `useCallback`
**Why we use it:** To prevent functions from being recreated on every render. If a function is recreated, any child component that receives it as a prop will also re-render.
**What happens without it:** Infinite re-render loops in `useEffect` hooks, and sluggish UI performance when typing in forms.

- **File:** `src/modules/patients/hooks/usePatients.js`
  - **Function:** `fetchPatients()`
  - **Reason:** Abstracts Redux dispatching. Without `useCallback`, any component calling `usePatients()` would receive a new function reference every render, forcing downstream `<PatientTable>` components to needlessly re-render.
  - **Dependency Array:** `[dispatch]`

- **File:** `src/modules/auth/hooks/useAuth.js`
  - **Function:** `login()`, `logout()`
  - **Reason:** Prevents the authentication action wrappers from changing identity, securing the `AuthLayout` and `Header` components from unnecessary reconciliation.
  - **Dependency Array:** `[dispatch]`

- *(Note: `useCallback` is applied across all 9 custom module hooks, wrapping every Redux dispatch action).*

### 1.2 `useMemo`
**Why we use it:** To cache the results of expensive calculations or to preserve the referential equality of object structures returned by custom hooks.
**What happens without it:** If a custom hook returns a new object literal (e.g., `return { state, actions }`), React's shallow comparison fails, forcing full re-renders of the consumer component.

- **File:** `src/modules/staff/hooks/useStaff.js` (and all other hooks)
  - **What is memoized:** The entire exported object containing Redux state and callback functions.
  - **Reason:** To ensure referential equality. If the underlying `staff` slice doesn't change, the returned object remains the same, preventing `<DashboardLayout>` and `<StaffList>` from re-rendering.
  - **Performance Improvement:** High. Eliminates cascading render cycles when unrelated Redux slices update.

### 1.3 `React.memo`
**Why we use it:** To skip rendering a component if its incoming props have not changed.
**How React compares props:** It performs a shallow comparison of primitive types (strings, booleans) and references (objects, arrays).

**Render Flow:**
`Parent renders` -> `React compares props` -> `Same?` -> `Skip render`

- **File:** `src/pages/Patients/components/PatientForm.jsx`
  - **Why wrapped:** It contains dozens of heavy form fields. When typing in unrelated parent components, we don't want this heavy tree to reconcile.
  - **Good candidate?** Yes, because its props (`initialValues`, `onSubmit`) rarely change identity.

- **File:** `src/modules/dashboard/components/StatsCard.jsx`
  - **Why wrapped:** A pure presentational component displaying primitive values (`title`, `trend`).
  - **Good candidate?** Yes. If the Dashboard parent re-renders due to a local filter state change, the unchanged Stat Cards skip rendering entirely.

---

## 2. Authentication Workflow

### 2.1 Registration Workflow
1. **Frontend:** User submits the `<Register />` form.
2. **Redux:** Calls `loginRequest` (or `registerRequest`) via `useAuth()`.
3. **Saga:** `authSaga.js` intercepts the action and calls `apiService`.
4. **API:** `axiosClient.js` initiates a POST to `/api/register`.
5. **Backend Route:** `api.php` routes to `AuthController@register`.
6. **Controller:** Validates email/password length.
7. **Service:** `AuthService.php` hashes the password and creates the user entity.
8. **Repository:** `UserRepository.php` executes the SQL insert.
9. **Database:** MySQL saves the record.
10. **Response:** 201 Created returned.
11. **Redux:** `loginSuccess` dispatched.
12. **UI:** Redirects to `/dashboard`.

### 2.2 Login Workflow
- **Validation:** Email and password checked in `AuthController`.
- **Service:** `AuthService` validates the hash.
- **JWT Creation:** Generates a short-lived Access Token.
- **Refresh Token:** Generates a long-lived Refresh Token and sets it in an **HttpOnly, Secure cookie**.
- **CSRF:** Generates a new CSRF token to prevent session riding.
- **Axios:** The response interceptor stores the Access Token in memory/localStorage via `tokenService.js`.

### 2.3 Logout Workflow
- **Frontend:** Clears `tokenService` (Access Token) and `csrfService` (CSRF Token) in `authSaga.js`.
- **Backend:** `AuthController@logout` unsets session variables and clears the HttpOnly Refresh Token cookie by setting its expiration to the past.
- **Redux:** Dispatches `logoutSuccess` to clear the `authSlice`.
- **Navigation:** Forces `window.location.href = '/login'`.

---

## 3. Access Token Workflow

**Step-by-step Flow:**
`User logs in` -> `Backend creates JWT` -> `Frontend tokenService stores token` -> `Axios Interceptor attaches Authorization: Bearer <token>` -> `PHP API Router` -> `AuthMiddleware` -> `JWT::verifyToken()` -> `Controller logic` -> `JSON Response`

- **Expiration:** Tokens are short-lived (e.g., 15-60 mins).
- **Validation:** `AuthMiddleware.php` intercepts the request, extracts the Bearer token, and cryptographically verifies the signature. If invalid/expired, it throws a 401.

---

## 4. Refresh Token Workflow

**Step-by-step Flow:**
`Access token expires` -> `Axios requests data` -> `401 Unauthorized returned` -> `Axios Response Interceptor pauses original request` -> `POST /refresh (with HttpOnly Cookie)` -> `Backend verifies refresh token` -> `New Access Token returned` -> `Frontend stores new token` -> `Interceptor retries original request seamlessly`

- **Why a Refresh Token?** To keep Access Tokens short-lived (security) while keeping users logged in (UX).
- **Why in a Cookie?** HttpOnly cookies cannot be read by JavaScript, completely neutralizing XSS (Cross-Site Scripting) attacks attempting to steal long-lived session keys.
- **Retry Mechanism:** `axiosClient.js` uses an `_retry` flag to prevent infinite loops if the refresh token itself is expired.

---

## 5. CSRF Workflow

**Step-by-step Flow:**
`Page Loads` -> `authSaga fetches /api/csrf-token` -> `csrfService stores token locally` -> `Axios Request Interceptor attaches X-CSRF-TOKEN to POST/PUT/DELETE` -> `CsrfMiddleware validates header against session/body` -> `Allows request`

- **Why:** Protects against Cross-Site Request Forgery, where a malicious site forces the user's browser to execute state-changing actions.
- **Where:** Checked natively via `App\Middleware\CsrfMiddleware.php`.
- **Exception:** Skipped for `GET` and `OPTIONS` requests as they are strictly non-mutating.

---

## 6. Protected Route Workflow

**Step-by-step Flow:**
`User opens /dashboard` -> `ProtectedRoute.jsx mounts` -> `Reads state.auth.isAuthenticated` -> `Validates token presence` -> `RoleBasedRoute.jsx mounts` -> `Checks state.auth.user.role_id` -> `Renders <DashboardLayout> OR redirects to /unauthorized`

- **Files:** `src/routes/ProtectedRoute.jsx`, `src/routes/RoleBasedRoute.jsx`, `src/routes/AppRouter.jsx`.

---

## 7. API Request Lifecycle (Patient Form Example)

**The complete journey of data:**
`PatientForm Submit` -> `dispatch(addPatientRequest(data))` -> `patientSaga` -> `apiService.post()` -> `axiosClient (encrypts payload)` -> `Axios Request Interceptor (adds Bearer + CSRF)` -> `PHP api.php` -> `AuthMiddleware & CsrfMiddleware` -> `PatientController` -> `PatientService` -> `PatientRepository` -> `MySQL Insert` -> `JSON Response` -> `patientSaga catches success` -> `dispatch(addPatientSuccess)` -> `patientSlice reducer updates state` -> `useSelector triggers React` -> `UI updates table`.

---

## 8. Offline Queue Workflow

Our application is "Offline-First" utilizing AES Encryption and IndexedDB.

**Offline Flow:**
`Internet disconnects` -> `Saga dispatches API call` -> `withOfflineQueue wrapper catches Network Error` -> `queueCrypto.js encrypts payload (AES)` -> `queueStorage.js saves to IndexedDB` -> `UI shows "Saved offline" via Antd Message`

**Online Flow:**
`Internet restores` -> `offlineSaga detects 'online' window event` -> `Reads IndexedDB` -> `queueCrypto.js decrypts` -> `Retries API calls silently` -> `Dispatches fetch list actions to refresh UI`.

---

## 9. Redux Workflow

`Component` -> `dispatch(ActionCreator)` -> `Slice Reducer (sets loading state)` -> `Watcher Saga` -> `Worker Saga` -> `API Call` -> `Success Action Dispatched` -> `Slice Reducer (updates state data)` -> `useSelector/Custom Hook` -> `React Reconciliation`.

---

## 10. Folder Architecture

### Frontend (React)
- `/modules`: Contains domain-specific logic (Slices, Sagas, Selectors, Custom Hooks). Keeps Redux logic close to feature domains.
- `/pages`: Route-level UI components and feature-specific components.
- `/components`: Highly reusable UI elements (Buttons, Layouts, common Forms).
- `/services`: API abstractions (`apiService`, `axiosClient`, `encryptionService`).

### Backend (PHP)
- `/app/Controllers`: Handles HTTP Request parsing and Response formatting. No business logic.
- `/app/Services`: The core business logic layer. Orchestrates repositories.
- `/app/Repositories`: Data access layer. Writes and executes raw SQL/PDO statements.
- `/app/Middleware`: Request pipeline filters (Auth, CSRF, Tenants).

---

## 11. Sequence Diagrams

### Auth & Refresh Flow
```text
React               Axios Interceptor          PHP Backend           Database
  │                         │                       │                    │
  ▼                         ▼                       ▼                    ▼
 login() ─────────────────► POST /login ──────────► AuthController       │
  │                         │                       │                    │
  │                         │                       ├──► AuthService ──► Verify Hash
  │                         │                       │                    │
  ◄─── Access & CSRF ───────◄─── Access/CSRF/Cookie─◄─── Tokens Created  │
  │                         │                       │                    │
 fetch() ─────────────────► GET /data (Bearer) ───► AuthMiddleware       │
  │                         │                       │                    │
  │                         ◄─── 401 Expired ───────◄─── JWT Invalid     │
  │                         │                       │                    │
  │   [Interceptor pause] ──► POST /refresh ──────► AuthController       │
  │                         │                       │                    │
  │   [Resumes original] ───► GET /data (New Bearer)► Controller ────────► Fetch
  ◄─── Data ────────────────◄─── 200 OK ────────────◄─── Response        │
```

---

## 12. File References

### Frontend Core Files
- `src/modules/auth/authSaga.js`
- `src/modules/auth/authSlice.js`
- `src/services/axiosClient.js`
- `src/services/apiService.js`
- `src/utils/queueStorage.js` (Offline DB)
- `src/utils/queueCrypto.js` (Offline Security)
- `src/modules/offline/offlineSaga.js` (Sync Engine)

### Backend Core Files
- `app/Controllers/AuthController.php`
- `app/Services/AuthService.php`
- `app/Repositories/UserRepository.php`
- `app/Middleware/AuthMiddleware.php`
- `app/Middleware/CsrfMiddleware.php`
- `app/Config/Database.php`

---

## 13. Explaining WHY

### Why Redux Saga?
Instead of Thunks, Sagas use ES6 Generators to handle side effects. This allows us to easily handle complex async flows like the `withOfflineQueue` wrapper, debouncing, and catching errors elegantly without dirtying our React components.

### Why Repository & Service Patterns?
- **Services** hold business rules (e.g., "A patient cannot book two appointments at the same time").
- **Repositories** handle SQL. 
This decoupling means if we switch from MySQL to PostgreSQL, we only change Repositories. Controllers remain completely unaware of how data is saved.

### Why JWT (JSON Web Tokens)?
JWTs allow the backend to remain strictly stateless. The server doesn't need to query a `sessions` table on every request; the token cryptographically proves the user's identity.

### Why HttpOnly Cookies for Refresh Tokens?
JavaScript (`document.cookie`) cannot read HttpOnly cookies. If a hacker successfully executes an XSS attack on the frontend, they can steal the Access Token (which expires quickly), but they cannot steal the Refresh Token.

### Why CSRF Tokens for APIs?
Since the Refresh Token is in a cookie, the browser automatically sends it with every request to the backend. A malicious site could trick the browser into sending a POST request to our API. The `X-CSRF-TOKEN` header (which the malicious site cannot read) proves the request originated from our actual frontend application.
