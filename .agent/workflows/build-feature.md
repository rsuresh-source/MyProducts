---
description: 
---

# Spec-Driven Development (SDD) Workflow

**Description:** Executes the end-to-end SDD process for a new app feature, strictly adhering to the Feature-Based Architecture and Redux Toolkit (RTK) state management paradigm.

---

## Step 1: Feature Specification
Ask the user which feature they want to build (e.g., Login, Home List, Detail Screen, Cart). Analyze the `Task` and `Architecture` documentation files to define the required Redux state slices, payload interfaces, and API endpoints. Present a brief summary of the implementation plan and wait for user confirmation.

## Step 2: HTML Prototyping
Invoke the `sdd-prototyper` skill. Generate the static HTML/CSS/JS prototype for the requested feature. Instruct the user to open the HTML file locally in their browser. **CRITICAL:** Wait for the user to reply with "Approved" or request UI changes before writing any React Native code.

## Step 3: Implement API & Redux Slices
Once the prototype is approved, create the designated feature module directory (e.g., `/src/features/products`). Write the network fetch calls using Axios wrapped in RTK `createAsyncThunk` (e.g., `productAPI.ts`). Implement the Redux slice (e.g., `productSlice.ts`) to manage the `pending`, `fulfilled`, and `rejected` states. Register the new reducer in the global store (`/src/store/store.ts`).

## Step 4: Implement React Native UI
Translate the approved HTML prototype into React Native functional components within the feature directory (e.g., `HomeScreen.tsx`). Bind the UI to the global state strictly using `useAppSelector` and `useAppDispatch`. Implement any required routing using React Navigation. Place any shared or reusable UI elements in `/src/components`.

## Step 5: Testing & Documentation
Prompt the user to test the newly implemented feature in their Expo Go app or device simulator. Upon successful verification, update the `README.md` and any relevant documentation to mark the feature as complete.