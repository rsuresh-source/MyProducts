# README

## 1. Project Overview
**myProducts** is a cross-platform mobile application developed using **React Native (Expo)** and **TypeScript**, powered by the **DummyJSON REST API** (`https://dummyjson.com/`). 

The application is built following a strict **Spec-Driven Development (SDD)** workflow and is architected using a **Feature-Based Modular Architecture** coupled with **Redux Toolkit (RTK)** for state management. It features five core interactive flows:
* **Authentication:** Secure user login with credential validation, quick demo auto-fill helper (`emilys` / `emilyspass`), and session persistence.
* **Product Catalog (Home Tab):** Responsive 2-column product grid with category badges, rating indicators, discounted pricing tags, and quick logout access.
* **Product Detail Screen:** In-depth product inspector showcasing full-resolution hero imagery, detailed descriptions, category/brand metadata, and an interactive "Add to Cart" sticky footer.
* **Shopping Cart (Cart Tab):** Local Redux state management allowing users to view items added to their cart, adjust quantities, calculate totals, and remove items.
* **User Profile (Profile Tab):** Authenticated account overview displaying user avatar, name, handle, email, masked password with toggleable visibility, and session termination (Log Out).
* **Navigation:** Bottom Tab Navigation switching seamlessly between Home, Cart, and Profile, with nested stack navigation for Product Details.

---

## 2. Setup Guide

### Prerequisites
Make sure the following tools are installed on your local development machine:
* **Node.js:** `v18.x` or `v20.x` LTS recommended
* **Package Manager:** `npm` (included with Node.js) or `yarn`
* **Git:** Installed and configured
* **Mobile Testing:**
  * Physical Device: Install the **Expo Go** app from the iOS App Store or Google Play Store.
  * Virtual Device: Android Studio (Android Emulator) or Xcode (iOS Simulator on macOS).

### Installation
1. Clone the repository to your local directory:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd my-products-app

   Install all required project dependencies:
   npm install
   # or
   yarn install


## 3. Build & Run Instructions

### Starting the Metro Bundler
To launch the Expo development server:
npx expo start
* **Running on Devices / Emulators**
  * Physical Device (Expo Go): Scan the generated QR code in your terminal using your phone camera (iOS) or the Expo Go app (Android).
  * Android Emulator: Press a in the terminal after starting Metro, or execute:
    npm run android
  * iOS Simulator (macOS only): Press i in the terminal after starting Metro, or execute:
    npm run ios
  * Web Browser Preview: Press w in the terminal, or execute:
    npm run web


## 4. Folder Structure

### The repository is structured following a strict separation of documentation, UX prototypes, and Feature-layered source code:

├── docs/                               # Complete Spec-Driven Documentation Suite
│   ├── Task_Document_Part_1...         # Scope, requirements, and acceptance criteria
│   ├── Architecture_Document_Part_1... # Feature-Based architecture, Redux, and components
│   ├── Engineering_Document_Part_1...  # Libraries, build config, and API integrations
│   └── Feature_Design_Part_1...        # Wireframes, screen layouts, and component specs
├── prototype/                          # Static HTML/CSS UX & UI Interactive Prototypes
│   ├── login.html
│   ├── home.html
│   ├── cart.html
│   ├── detail.html
│   ├── profile.html
│   └── styles.css
└── src/                                # React Native Application Source Code
    ├── components/                     # Shared/Global UI components (AppButton, InputField)
    ├── constants/                      # Colors, typography tokens, layout metrics
    ├── features/                       # Domain-driven feature modules
    │   ├── auth/                       # LoginScreen, authSlice, authAPI
    │   ├── products/                   # HomeScreen, DetailScreen, productSlice, productAPI
    │   ├── cart/                       # CartScreen, cartSlice
    │   └── profile/                    # ProfileScreen
    ├── navigation/                     # Navigation containers, Stack & Bottom Tab navigators
    │   ├── AppNavigator.tsx
    │   ├── AuthNavigator.tsx
    │   └── MainTabs.tsx
    ├── store/                          # Redux setup (store.ts, hooks.ts)
    └── utils/                          # Helper formatters (currency, discounts, validators)


## 5. Tech Stack

* Framework: React Native with Expo SDK
* Language: TypeScript (Strict typing)
* State Management: Redux Toolkit (RTK) & react-redux
* Navigation: React Navigation (@react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs)
* Networking & HTTP: Axios wrapped in RTK createAsyncThunk
* Local Storage & Persistence: @react-native-async-storage/async-storage
* Icons & Vector Graphics: @expo/vector-icons (Ionicons / Feather)
* API Backend: DummyJSON REST API (https://dummyjson.com/)

## 6. Development Workflow & AI Agents

### The project strictly adheres to the Spec-Driven Development (SDD) lifecycle using AI Agents equipped with specific skill plugins:

* Huashu Design / Open Design: Enforces strict UI tokens and generates Static HTML/CSS UX prototypes.
* Grill Me: Audits the Feature-Based architecture to ensure strict domain decoupling.
* Pony Tail: Ensures React Native code is highly optimized, DRY, and modular.
* Cavemen: Keeps code documentation and syntax token-efficient and concise.
* Graphify: Visualizes Redux state flows and component hierarchies.

+-------------------------------------------------------------------------------+
| 1. Specification Phase                                                        |
|    - Define Task, Architecture, Engineering, and Design specifications.       |
+-------------------------------------------------------------------------------+
                                       │
                                       ▼
+-------------------------------------------------------------------------------+
| 2. Prototyping & UX Validation (Huashu Design)                                |
|    - Build interactive Static HTML/CSS prototype in `/prototype` folder.      |
|    - Validate UI layouts, responsive behavior, and user flows.                |
+-------------------------------------------------------------------------------+
                                       │
                                       ▼
+-------------------------------------------------------------------------------+
| 3. Prototype Review & Approval                                                |
|    - Review prototype deliverables before initiating React Native coding.     |
+-------------------------------------------------------------------------------+
                                       │
                                       ▼
+-------------------------------------------------------------------------------+
| 4. Feature-Based & Redux Implementation (Pony Tail & Grill Me)                |
|    - Configure Global Store (`/src/store`) and domain features (`/features`). |
|    - Implement Redux Slices (State) and Async Thunks (API integrations).      |
|    - Build presentational Views bound to `useAppSelector`/`useAppDispatch`.   |
+-------------------------------------------------------------------------------+
                                       │
                                       ▼
+-------------------------------------------------------------------------------+
| 5. Testing & Documentation Synchronization                                    |
|    - Validate edge cases, network failures, auth flows, and UI constraints.   |
|    - Update documentation suite with final architecture and snapshots.        |
+-------------------------------------------------------------------------------+