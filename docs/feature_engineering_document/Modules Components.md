# Feature Engineering - Part 1: Modules & Components

## 1. Feature-Based Architecture
The presentation and business logic layers are grouped by domain into distinct feature modules.

```text
/src
├── /components              # Shared/Global UI components
│   ├── AppButton.tsx        # Standard primary/destructive button
│   ├── InputField.tsx       # Styled text input with validation
│   ├── ProductCard.tsx      # 2-column grid card for catalog
│   ├── PriceBadge.tsx       # Discount percentage pill
│   └── LoadingView.tsx      # Skeleton placeholder / spinner
│
└── /features                # Domain-specific modules
    ├── /auth
    │   ├── LoginScreen.tsx  # Credential form & auto-fill CTA
    │   ├── authSlice.ts     # RTK slice for session state
    │   └── authAPI.ts       # Axios calls for authentication
    │
    ├── /products
    │   ├── HomeScreen.tsx   # 2-column catalog grid
    │   ├── DetailScreen.tsx # Product inspector & Add to Cart
    │   ├── productSlice.ts  # RTK slice for catalog data
    │   └── productAPI.ts    # Axios calls for products
    │
    ├── /cart
    │   ├── CartScreen.tsx   # Item list & checkout summary
    │   └── cartSlice.ts     # RTK slice for local cart state
    │
    └── /profile
        └── ProfileScreen.tsx # Avatar, account details, Logout action