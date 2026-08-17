# Engineering Document - Part 1: Tech Stack & Dependencies

## 1. React Native Libraries
The project leverages the React Native and Expo ecosystem with strictly typed dependencies:

* **Core Framework:**
  * `react`: `^18.2.0`
  * `react-native`: `~0.74.x` (or latest stable Expo SDK runtime)
  * `expo`: `~51.x.x`
  * `typescript`: `~5.3.x`
* **Navigation:**
  * `@react-navigation/native`: `^6.1.x`
  * `@react-navigation/native-stack`: `^6.9.x`
  * `@react-navigation/bottom-tabs`: `^6.5.x`
  * `react-native-screens`: `~3.31.x`
  * `react-native-safe-area-context`: `4.10.x`
* **State Management (Redux):**
  * `@reduxjs/toolkit`: `^2.2.x`
  * `react-redux`: `^9.1.x`
* **Networking & HTTP:**
  * `axios`: `^1.7.x` (Configured with request/response interceptors)
* **Local Persistence & Storage:**
  * `@react-native-async-storage/async-storage`: `1.23.x`
* **UI, Icons & Layout:**
  * `@expo/vector-icons`: `^14.0.x` (Ionicons / Feather icons)