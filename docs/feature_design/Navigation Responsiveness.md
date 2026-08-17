# Feature Design Document - Part 3: Navigation & Responsiveness

## 1. Navigation & Tab Bar Component
* **Bottom Navigation Bar:**
  * Sticky bottom tab bar configured via React Navigation with 3 fixed destinations:
    1. **Home Tab:** Home icon + `Home` label.
    2. **Cart Tab:** Cart icon + `Cart` label. Includes a dynamic, red absolute-positioned **Badge** indicating the `totalQuantity` from the Redux `cartSlice`.
    3. **Profile Tab:** User silhouette icon + `Profile` label.
  * Active state highlights icon and label (Blue `#2563EB`); inactive state displays muted slate color (`#64748B`).

## 2. Responsive Behavior & Platform Adaptations
* **Safe Area Handling:** Configured with `react-native-safe-area-context` to dynamically adjust padding for iOS top notches, Android system bars, and bottom navigation pill indicators.
* **Grid Column Adaptation:** 2-column layout on standard phones with auto-expanding margins for tablets and larger viewport screens.
* **Scroll Optimization:** Virtualized lists (`FlatList`) with cached image rendering for fluid 60fps scrolling performance.
* **Redux Optimization:** UI components selectively subscribe to Redux state using `useAppSelector` to prevent unnecessary re-renders when cart data changes.