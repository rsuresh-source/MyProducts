---
trigger: always_on
---

# Agent Rules (Feature-Based & Redux Toolkit)

You are an expert React Native developer and mobile software architect acting inside an autonomous AI agent environment (Google Antigravity). You must strictly adhere to the following rules, constraints, and coding standards.

---

## 1. Core Development Methodology (SDD)
* **Spec-Driven Development (SDD):** You must strictly follow the SDD lifecycle before writing mobile application code.
* **Huashu Design Prototyping:** A static HTML/CSS prototype in `/prototype` representing UI layout, navigation, and validation must be reviewed and approved prior to React Native implementation. 
* **Structured Execution:** Do not perform direct, unguided implementations. Break down tasks into structured artifacts.

---

## 2. Core Tech Stack
* **Framework:** React Native with Expo (Managed Workflow)
* **Language:** TypeScript with 100% strict typing (no `any` types allowed)
* **API Base URL:** `https://dummyjson.com/`
* **Navigation:** React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`)
* **State Management:** Redux Toolkit (RTK) and `react-redux`
* **HTTP Client:** `axios` wrapped in RTK `createAsyncThunk`
* **Storage:** `@react-native-async-storage/async-storage`

---

## 3. Architectural Constraints (Feature-Based)
You must strictly enforce a **Feature-Based Architecture**. Code is grouped by domain, not by technical role. Apply the **Grill Me** plugin principles to ensure strict decoupling.

### 3.1 Features (`/src/features/`)
* Each feature module (`auth`, `products`, `cart`, `profile`) must encapsulate its own UI screens, Redux slices, and API clients.
* Features must not tightly couple UI elements to other features. Shared UI must live in `/src/components/`.

### 3.2 State Management (`/src/store/`)
* **Global Store:** All global state, including fetched API data, must reside in Redux Toolkit slices. 
* **Hooks:** strictly use typed hooks (`useAppDispatch` and `useAppSelector`). Never use raw `useDispatch`.
* **Async Logic:** All Axios HTTP calls must be executed via `createAsyncThunk` to map network lifecycles (`pending`, `fulfilled`, `rejected`) directly into Redux state.
* *(Graphify Plugin Note: Visualize the flow from Thunk -> Reducer -> Selector during implementation).*

---

## 4. App Screen & Navigation Rules

### 4.1 Root & Tab Navigation
* Dynamically swap navigation trees based on the `authSlice` state (`isAuthenticated`).
* **Bottom Tabs:** Home (Catalog), Cart (with dynamic item count badge), Profile (Account).

### 4.2 Login Screen
* Input fields for Username and Password.
* Helper trigger: `⚡ Auto-fill demo credentials (emilys)`.
* Dispatch `loginUser` RTK thunk on submit. On `fulfilled`, save token to `AsyncStorage`.

### 4.3 Home Catalog Screen
* Dispatch `fetchProducts` thunk on mount.
* Render a 2-column `FlatList` grid with product thumbnails, titles, prices, ratings, and discount badges.
* Support pull-to-refresh and navigate to Detail Screen on press.

### 4.4 Product Detail Screen
* Display hero image, title, category, pricing, and description.
* Sticky bottom bar with Total Price and `Add to Cart` CTA.
* Tapping `Add to Cart` must dispatch the `addToCart` action to the `cartSlice`.

### 4.5 Shopping Cart Screen
* Read `cartItems` and `totalPrice` from `cartSlice` via `useAppSelector`.
* Render a `FlatList` of cart items with Title, Price, Quantity, and a `Remove` action.
* Sticky bottom bar with `Checkout` CTA and calculated order total.

### 4.6 Profile Screen
* Read authenticated user details (avatar, name, email, etc.) directly from the `authSlice`.
* Display a red `Log Out` button that dispatches a global logout action, wiping Redux state and `AsyncStorage`.

---

## 5. Coding Standards & Agent Skills
* **Pony Tail Efficiency:** Write highly optimized, modular, and DRY React Native functional components. Use `StyleSheet.create` (no inline styles).
* **Cavemen Conciseness:** Keep code, comments, and logic strictly concise and token-efficient. Do not over-explain; let the code's structure speak for itself.
* **Strict TypeScript:** Define interfaces for all Redux states, API payloads, and component props.
* **Error Resilience:** Map 400/401 HTTP errors to Redux `rejected` states and display user-friendly fallback UI.