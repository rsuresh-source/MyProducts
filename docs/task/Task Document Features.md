# Task Document - Part 2: Functional Requirements

## 1. Authentication & Login Flow
* **Credential Input:** Provide input fields for `username` and `password` with clear placeholders and validation rules.
* **Demo Quick-Fill:** Provide an interactive one-tap helper (`⚡ Auto-fill demo credentials`) to populate valid test credentials (`emilys` / `emilyspass`).
* **API Authentication:** Dispatch RTK Async Thunk to submit credentials to `POST https://dummyjson.com/auth/login`.
* **State & Persistence:** 
  * Display a loading indicator during the Redux `pending` state.
  * Store auth token and user profile data in local persistent storage (`AsyncStorage`) upon the `fulfilled` state.
  * Display inline error messages on invalid credentials or server errors (`rejected` state).
  * Automatically navigate to the Main App interface on success.

## 2. Navigation & Routing
* **Root Navigation:** Manage dynamic switching between the Unauthenticated Stack (`LoginScreen`) and Authenticated Stack (`MainTabNavigator`) based on the Redux Auth slice state.
* **Bottom Tab Navigation:** Persistent bottom tab bar with three tabs:
  1. **Home:** Displays the product exploration grid and acts as the entry point to product details.
  2. **Cart:** Displays the active shopping cart, item list, and order total (includes a badge icon indicating the number of items).
  3. **Profile:** Displays account details and the logout action.
* **Stack Navigation:** Stack-based routing from the Home product grid into the `DetailScreen`, maintaining a visible `← Back` top navigation action.

## 3. Product Discovery (Home Screen)
* **Data Fetching:** Dispatch Redux thunk to fetch products via `GET https://dummyjson.com/products`.
* **Header & Identity:** Display personalized greeting (`Hello, [User's First Name]`) mapped from the Redux store, alongside an explicit quick-logout button.
* **Grid Display:** Render a 2-column responsive `FlatList` containing:
  * Category badge indicator (e.g., `Beauty`, `Fragrances`).
  * Product thumbnail image.
  * Title (multi-line truncated).
  * Brand and star rating breakdown.
  * Price and green discount percentage tag (e.g., `-10%`).
* **User Interaction:** Tapping any product card triggers navigation to the `DetailScreen`, passing the product `id`.

## 4. Product Detail Screen
* **Detail Data Fetching:** Retrieve specific product details via `GET https://dummyjson.com/products/{id}` using the route parameter.
* **Visual Presentation:**
  * Full-size hero product image.
  * Category badge and brand name.
  * Star rating badge (e.g., `★ 2.6 / 5.0`).
  * Product title, formatted price, and savings pill tag (`Save 10%`).
  * Detailed product description section.
* **Bottom Action Bar:** Sticky bottom bar displaying total price calculation and an `Add to Cart` call-to-action button.
* **Cart Integration:** Tapping `Add to Cart` dispatches an RTK action (`addToCart`) to push the product data and quantity into the global `cartSlice`.

## 5. Shopping Cart Screen
* **Cart UI:** A dedicated `FlatList` displaying all items added from the `DetailScreen`.
* **Item Details:** Each cart item displays the product thumbnail, title, unit price, quantity, and a "Remove" button.
* **Order Summary:** A sticky bottom bar showing the dynamically calculated Total Price (sum of all items) and a "Checkout" CTA button.

## 6. Profile & Account Screen
* **User Info Retrieval:** Retrieve stored authenticated user details directly from the Redux Auth slice.
* **UI Structure:**
  * Circular avatar image tile.
  * Full user name and handle (`@username`).
  * Grouped detail card displaying: Username, Email Address, Password (masked with toggleable `Show`/`Hide` functionality), and Gender.
* **Session Termination:** Prominent red `Log Out` button that dispatches a global Redux logout action, wiping stored tokens and resetting the root navigation state.