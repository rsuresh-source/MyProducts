### File 2: `Architecture_Document_Part_2_Data_Network.md`

```markdown
# Architecture Document - Part 2: State, API & Storage

## 1. State Management
* **Global Store:** Configured via `configureStore` from Redux Toolkit.
* **Auth Slice (`authSlice.ts`):** Manages `user`, `token`, `isAuthenticated`, and loading/error states for the login flow.
* **Products Slice (`productSlice.ts`):** Manages the fetched product catalog, active product details, and network status.
* **Cart Slice (`cartSlice.ts`):** Synchronously manages local shopping cart state (`cartItems[]`, `totalQuantity`, `totalPrice`).

---

## 2. API Architecture
* **Base URL:** `https://dummyjson.com`
* **HTTP Client:** Axios instance wrapped inside Redux Toolkit's `createAsyncThunk` for automatic dispatching of `pending`, `fulfilled`, and `rejected` states.
* **Endpoint Mapping:**
  * **Authentication:** `POST /auth/login` (Payload: `{ username, password, expiresInMins }`)
  * **Fetch Products List:** `GET /products?limit=30`
  * **Fetch Product Detail:** `GET /products/{id}`
* **Response Handling:** Responses are intercepted by Axios, validated, and directly mapped into the Redux store's state arrays/objects.

---

## 3. Storage Management
* **Storage Engine:** Uses `@react-native-async-storage/async-storage` for asynchronous key-value persistence.
* **Storage Schema:**
  * `@auth_token`: String JWT token returned from the authentication endpoint.
  * `@user_profile`: JSON-serialized object containing user details.
* **Session Lifecycle (Tied to Redux):**
  * **On Launch:** Read keys to re-hydrate the Redux store and auto-authenticate returning users.
  * **On Login:** Write token and user data to storage upon a `loginUser.fulfilled` Redux action.
  * **On Logout:** Remove all keys (`AsyncStorage.multiRemove`) upon a `logout` Redux action, which resets state and triggers route reversion to the `LoginScreen`.