# Architecture Document - Part 1: Core Structure

## 1. Application Architecture: Feature-Based & Redux Toolkit
The application strictly adopts a **Feature-Based Architecture** coupled with **Redux Toolkit (RTK)** for state management. This pattern organizes code by business domain rather than technical role, scaling efficiently and decoupling the UI from API logic.

+-------------------------------------------------------------------------+
|                                  VIEW                                   |
|   (React Native Screens: LoginScreen, HomeScreen, CartScreen, etc.)     |
+-------------------------------------------------------------------------+
                                    │ ▲
     Dispatches RTK Actions/Thunks  │ │ Observes State (useAppSelector)
                                    ▼ │
+-------------------------------------------------------------------------+
|                               REDUX STORE                               |
|        (authSlice, productSlice, cartSlice, API Async Thunks)           |
+-------------------------------------------------------------------------+
                                    │ ▲
               Executes HTTP Calls  │ │ Returns JSON / Error payloads
                                    ▼ │
+-------------------------------------------------------------------------+
|                              API & SERVICES                             |
|          (Axios Interceptors, DummyJSON API, AsyncStorage)              |
+-------------------------------------------------------------------------+

* **Features:** Independent modules (Auth, Products, Cart, Profile) containing their own UI components, Redux slices, and API clients.
* **Store:** A centralized Redux store that combines all feature reducers into a single source of truth.
* **View:** Pure presentational React Native components that consume global state via useAppSelector and trigger state changes via useAppDispatch.

## 2. Folder Structure
The source code is modularized by domain features under /src:

/src
├── /components         # Shared, domain-agnostic UI (AppButton, ProductCard, Badges)
├── /constants          # App constants, design tokens, color palettes, typography scales
├── /features           # Domain-driven feature modules
│   ├── /auth           
│   │   ├── LoginScreen.tsx
│   │   ├── authSlice.ts
│   │   └── authAPI.ts
│   ├── /products       
│   │   ├── HomeScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── productSlice.ts
│   │   └── productAPI.ts
│   ├── /cart           
│   │   ├── CartScreen.tsx
│   │   └── cartSlice.ts
│   └── /profile        
│       └── ProfileScreen.tsx
├── /navigation         # AppNavigator, AuthStack, MainTabs
├── /store              # Redux setup (store.ts, hooks.ts)
└── /utils              # Helper utilities, formatters, validators


## 3. Component Hierarchy

<App>
 └── <SafeAreaProvider>
      └── <Provider store="{store}">  (Redux Global State)
           └── <NavigationContainer>
                │
                ├── [Unauthenticated Stack]
                │    └── <AuthStackNavigator>
                │         └── <LoginScreen/>
                │
                └── [Authenticated Stack]
                     └── <MainTabNavigator> (Bottom Tabs)
                          │
                          ├── <HomeTab (HomeStackNavigator)>
                          │    ├── <HomeScreen/> (Product Grid)
                          │    └── <ProductDetailScreen/> (Details & Add to Cart)
                          │
                          ├── <CartTab>
                          │    └── <CartScreen/> (Item List & Checkout Summary)
                          │
                          └── <ProfileTab>
                               └── <ProfileScreen/> (User Info & Logout)