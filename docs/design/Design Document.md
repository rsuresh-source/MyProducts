# Design Document

## 1. Aesthetics & Design Tokens
* **Design Philosophy:** Clean, modern, high-contrast light theme with rounded cards, subtle drop shadows, and clear visual hierarchy.
* **Aesthetics:** Minimalist white surfaces on cool light-slate canvas (`#F8FAFC`), emphasized with bold dark navy typography and high-contrast primary buttons.
* **Design Tokens:**
  * **Primary Brand / Action:** `#0F172A` (Navy/Slate 900)
  * **Primary Accent / Links:** `#2563EB` (Blue 600)
  * **Surface / Card Background:** `#FFFFFF` (Pure White)
  * **Screen Background:** `#F8FAFC` (Slate 50)
  * **Borders / Outlines:** `#E2E8F0` (Slate 200)
  * **Text Primary:** `#0F172A` (Slate 900)
  * **Text Secondary / Muted:** `#64748B` (Slate 500)
  * **Success / Discount Tag:** `#DCFCE7` (Light Mint Green bg) / `#15803D` (Dark Green text)
  * **Warning / Star Rating:** `#F59E0B` (Amber Gold) / `#FEF3C7` (Light Amber badge)
  * **Destructive / Alerts / Cart Badge:** `#EF4444` (Red 500)

## 2. Typography Hierarchy
* **App & Screen Headers (H1):** 24px - 28px, Extra Bold (800), Sans-serif (SF Pro / Roboto).
* **Card Titles / Subheaders (H2):** 16px - 18px, Bold (700).
* **Price Emphasis:** 20px - 24px, Extra Bold (800).
* **Body Regular:** 14px, Regular (400) / Semi-Bold (600), Line height 20px.
* **Badges & Microcopy:** 11px - 12px, Bold (700), Uppercase tracking.

## 3. Form Validation & Feedback
* **Client-side Validation:** Real-time checking for non-empty fields and length limits prior to API dispatch.
* **Error Indicators:** Inline red border highlight (`#EF4444`) on invalid fields with explicit contextual error text beneath.
* **Demo Auto-fill:** Quick helper CTA (`⚡ Auto-fill demo credentials`) to populate valid test credentials (`emilys` / `emilyspass`).
* **Loading Feedback:** Activity spinner replaces button text during network requests; disabled states prevent duplicate submissions.
* **Cart Feedback:** Tapping "Add to Cart" provides immediate visual feedback (e.g., brief button state change or toast notification) and updates the Cart Tab badge.

## 4. User Experience & Functional Interactions
* **Global Authentication State:** Persistent session handling. Auto-redirects between unauthenticated (Login) and authenticated (Main Tabs) states based on Redux store logic.
* **Persistent Bottom Navigation:** Fixed bottom tab bar switching seamlessly between three core destinations:
  1. **Home:** Product catalog.
  2. **Cart:** Displays active order with a dynamic red notification badge indicating total items.
  3. **Profile:** Account management.
* **Navigation Flow:** 
  * Stack-based product inspection from **Home Screen** $\to$ **Detail Screen** with dedicated `← Back` top navigation bar.
  * Direct one-tap **Logout** action from Profile with immediate state revocation returning to Login.
* **Shopping Cart UX:** 
  * Swipe or tap-to-remove interactions for items in the Cart.
  * Sticky bottom action bar on both the Detail Screen ("Add to Cart") and Cart Screen ("Checkout") to keep primary conversion actions constantly accessible.
* **Security UX:** Password mask/unmask toggle (`Show`/`Hide`) for user verification.
* **Responsive Touch Feedback:** Native ripple effect on Android, `activeOpacity={0.7}` on iOS for cards, tags, and action buttons.