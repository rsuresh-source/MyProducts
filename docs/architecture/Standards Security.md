# Architecture Document - Part 3: Standards & Security

## 1. Coding Standards
* **Language & Typing:** 100% strict TypeScript. No usage of `any` types; all API responses, Redux state slices, and component props must be explicitly typed.
* **State Hooks:** Component state must strictly use `useAppSelector` and `useAppDispatch` (pre-typed Redux hooks) rather than native `useDispatch`/`useSelector`.
* **Component Paradigm:** Functional components utilizing React Hooks. Class components are strictly prohibited.
* **File Naming Conventions:**
  * Views & Components: `PascalCase.tsx` (e.g., `LoginScreen.tsx`, `ProductCard.tsx`)
  * Slices & Utils: `camelCase.ts` (e.g., `authSlice.ts`, `currencyFormatter.ts`)
* **Linting & Formatting:** Adherence to ESLint standards and Prettier formatting for consistent indentation (2 spaces).

---

## 2. Security
* **Authentication Token Handling:** JWT tokens received from `https://dummyjson.com/auth/login` are stored securely using device storage and injected dynamically via Axios network interceptors.
* **Sensitive Data Masking:** User credentials such as passwords are masked by default on UI layers with explicit user-triggered unmasking.
* **Transport Layer Security (TLS):** All outbound network communications strictly use HTTPS.