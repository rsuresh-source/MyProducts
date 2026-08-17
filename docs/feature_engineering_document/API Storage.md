### File 3: `Feature_Engineering_Part_3_API_Storage.md`
This file documents the API endpoint mappings and how local data persistence (AsyncStorage) is tied to the Redux lifecycle.

```markdown
# Feature Engineering - Part 3: API & Storage

## 1. API Mapping & Endpoints

| Feature Module | Method | Endpoint | Request Payload | Response Mapping |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/login` | `{ username, password, expiresInMins: 60 }` | `LoginResponse` mapped to `authSlice` (`token`, `user`) |
| **Products (Home)** | `GET` | `/products?limit=30` | None | `ProductsResponse` mapped to `productSlice.items` |
| **Products (Detail)**| `GET` | `/products/{id}` | Route param `id` | `Product` mapped to `productSlice.activeProduct` |
| **Cart** | N/A | Local State Only | N/A | Managed synchronously in `cartSlice` |
| **Profile** | N/A | Redux Cache | N/A | Reads `user` object directly from `authSlice` |

## 2. Storage Implementation

* **Engine:** `@react-native-async-storage/async-storage`
* **Keys:**
  * `@auth_token`: JWT authentication token.
  * `@user_profile`: Serialized JSON string containing user details.

## 3. Session Lifecycle (Storage $\leftrightarrow$ Redux Sync)
1. **App Initialization:** App reads `@auth_token` and `@user_profile` from `AsyncStorage`. If valid, it pre-populates the `authSlice` and renders the `MainTabNavigator`.
2. **Login Success:** When `loginUser.fulfilled` is dispatched, the Redux middleware writes the returned token and user data to `AsyncStorage`.
3. **Logout:** When the `logout` action is dispatched from the Profile screen, Redux state is cleared, and `AsyncStorage.multiRemove` purges the keys, instantly reverting the UI to the `LoginScreen`.