# Healthcare Management System - Frontend

This is the frontend application for the Healthcare Management System, a scalable, secure, and multi-tenant SaaS dashboard designed for various healthcare professionals including Admins, Doctors, Nurses, Receptionists, Pharmacists, and Patients.

## Tech Stack

- **Core**: React.js, React Router
- **State Management**: Redux Toolkit, Redux Saga
- **API & Networking**: Axios
- **Styling**: styled-components
- **UI Components**: Ant Design

## Architecture

The project follows a highly modular architecture where each business feature is isolated into its own module containing:
- Components & Pages
- Redux Slices & Sagas
- API Service Methods
- Custom Hooks

All asynchronous state and side effects are managed exclusively via **Redux Saga**. API communication is centralized through a customized Axios client (`axiosClient.js`) which handles token injection, automated refresh token workflows, and tenant headers. 

For comprehensive details on the project's architecture, folder structure, UI component guidelines, and security practices, please read the [ARCHITECTURE.md](./ARCHITECTURE.md) file.

## Getting Started

In the project directory, you can run:

### `npm install`

Installs all the required dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Security & Multi-Tenancy

- **Security**: The app utilizes strict Role-Based Access Control (RBAC), CSRF protection, token rotation/refresh, and idle-logout mechanisms.
- **Multi-Tenancy**: The platform dynamically detects the active tenant from the domain, subsequently fetching and applying tenant-specific configurations, themes, and logos.
