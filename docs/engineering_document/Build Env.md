# Engineering Document - Part 2: Build & Environment

## 1. Build Configuration
* **App Config (`app.json` / `app.config.ts`):**
  * `name`: `myProducts`
  * `slug`: `my-products-app`
  * `version`: `1.0.0`
  * `orientation`: `portrait`
  * `userInterfaceStyle`: `light`
  * `assetBundlePatterns`: `["**/*"]`
  * `ios.supportsTablet`: `true`
  * `android.adaptiveIcon`: Configured for standard background color and foreground icon.

* **TypeScript Config (`tsconfig.json`):**
  * Architecture aliases updated for Feature-Based modularity.
  * `compilerOptions.strict`: `true`
  * `compilerOptions.baseUrl`: `"."`
  * `compilerOptions.paths`:
    * `@features/*`: `["src/features/*"]`
    * `@components/*`: `["src/components/*"]`
    * `@store/*`: `["src/store/*"]`
    * `@utils/*`: `["src/utils/*"]`
    * `@constants/*`: `["src/constants/*"]`

## 2. Environment Setup & Workflow
* **Prerequisites:**
  * Node.js (v18.x or v20.x LTS)
  * npm or yarn package manager
  * Expo Go mobile app installed on physical device or Android Studio Emulator / Xcode Simulator.
* **Initialization & Scripts:**
  * Install dependencies: `npm install`
  * Start Metro Bundler: `npx expo start`
  * Run on Android: `npx expo start --android`
  * Run on iOS: `npx expo start --ios`
* **Environment Variables (`.env`):**
  * `EXPO_PUBLIC_API_BASE_URL=https://dummyjson.com`