---
name: sdd-prototyper
description: Generates an interactive static HTML/CSS/JS mobile viewport prototype for UX/UI validation. Enforces Huashu Design standards prior to React Native implementation, fulfilling mandatory Spec-Driven Development (SDD) requirements.
---
# Skill: SDD HTML Prototyping

## Goal
To generate an interactive, zero-dependency HTML/CSS/JS prototype rendered inside a mobile viewport frame. This allows full validation of screen layouts, responsive behavior, form validations, API simulation, and navigation transitions (including the Shopping Cart flow) before writing React Native code.

---

## When to Use This Skill
* At the beginning of the Spec-Driven Development lifecycle before implementing any React Native component.
* When creating or updating the UI/UX flows for:
  * **Login Screen** (Credential forms, demo auto-fill, error validation).
  * **Home Screen** (2-column product catalog grid, category tags, rating badges, discount pills).
  * **Product Detail Screen** (Hero gallery, specifications, sticky bottom price & Add to Cart CTA).
  * **Cart Screen** (Item list, quantity adjustments, total price calculation, Checkout CTA).
  * **Profile Screen** (User avatar, account details, password mask/unmask, logout action).
  * **Bottom Tab Navigation** (Home $\leftrightarrow$ Cart $\leftrightarrow$ Profile tab switching).

---

## Step-by-Step Instructions

### 1. Requirements & Spec Review
* Consult the `Feature_Design` and `Architecture` documentation files for layout specifications, color tokens, and interactive flows.

### 2. Directory & Asset Setup
* Create or update the `/prototype` folder in the repository root.
* Structure prototype files cleanly (e.g., `index.html`, `styles.css`, and `app.js` or self-contained HTML screens).

### 3. Mobile Viewport & Styling Guidelines
* Enclose the prototype in a centered mobile device frame (`max-width: 412px`, `min-height: 840px`, rounded corners, subtle drop-shadow border).
* Apply exact color design tokens (Huashu Design):
  * Canvas background: `#F8FAFC` (Slate 50)
  * Surfaces / Cards: `#FFFFFF` (Pure White)
  * Dark Navy buttons & headers: `#0F172A`
  * Accent / Active Tabs: `#2563EB` (Blue)
  * Discount green badges: `#DCFCE7` / `#15803D`
  * Amber rating badges: `#FEF3C7` / `#F59E0B`
  * Destructive alerts / Red logout button: `#EF4444`

### 4. Interactive JavaScript Simulation
* **Login Validation:** Validate inputs on submission; simulate network delay with `setTimeout`; show inline validation errors or trigger transition to the main app view.
* **Demo Quick-Fill:** Implement the `⚡ Auto-fill demo credentials` trigger to populate username (`emilys`) and password (`emilyspass`).
* **Navigation & Tab Switching:** Enable interactive clicking between the **Home**, **Cart**, and **Profile** bottom tabs.
* **Detail Navigation:** Allow clicking any product card on the Home grid to view the Detail Screen with a functional `← Back` button.
* **Cart Flow:** Clicking "Add to Cart" must visually update a notification badge on the Cart tab. The Cart screen must show a mocked list of items and a sticky total price footer.
* **Password Toggle:** Implement the `Show`/`Hide` button on the Profile screen to toggle password masking.
* **Logout Flow:** Reset authentication state and return to the Login screen upon clicking `Log Out`.

### 5. Deliverable & Review Gate
* Present the generated HTML prototype path to the user.
* Prompt the user to inspect the prototype in their web browser.
* **Mandatory SDD Rule:** Explicitly request user approval and do NOT proceed to React Native coding until approval is confirmed.

---

## Constraints
* **Zero External Dependencies:** Use standard vanilla HTML5, CSS3, and modern JavaScript. Do not use external frontend frameworks (e.g., React, Vue, Tailwind) inside the prototype.
* **Spec Compliance:** Prototype layouts and colors must match the design tokens defined in the documentation suite.
* **Strict Gatekeeping:** Never initialize `npx create-expo-app` or write React Native `.tsx` components until the HTML prototype is fully approved by the user.