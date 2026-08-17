### File 2: `Feature_Engineering_Part_2_State_Redux.md`
This file defines the Redux Toolkit slices (replacing the old ViewModels) and maps out the unidirectional data flow.

```markdown
# Feature Engineering - Part 2: Redux & State Flow

## 1. Redux Slices (State Management)
Global state and business logic are managed entirely via Redux Toolkit slices.

* **`authSlice.ts`**
  * **State:** `user`, `token`, `isLoading`, `errorMessage`
  * **Thunks/Actions:** `loginUser` (Async), `logout` (Sync)
* **`productSlice.ts`**
  * **State:** `items: Product[]`, `activeProduct: Product | null`, `isLoading`
  * **Thunks/Actions:** `fetchProducts` (Async), `fetchProductById` (Async)
* **`cartSlice.ts`**
  * **State:** `cartItems[]` (Product + quantity), `totalQuantity`, `totalPrice`
  * **Actions (Sync):** `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`

## 2. State Flow (Redux Dispatch Cycle)

```text
[ User Interaction: Tap "Add to Cart" / Submit Login ]
                          │
                          ▼
       [ View Component (e.g., DetailScreen.tsx) ]
                          │
      (Dispatches Action: dispatch(addToCart(product)))
                          ▼
      [ RTK Thunk / Action Creator (e.g., cartSlice) ]
                          │
  (If Async: Triggers Axios API Call via feature API file)
                          ▼
[ RTK Reducer (Handles pending, fulfilled, rejected cases) ]
                          │
     (Updates immutable state tree in the Global Store)
                          ▼
    [ View Component Observes State via useAppSelector ]
                          │
                          ▼
         [ UI Re-renders with Updated Data / Badges ]