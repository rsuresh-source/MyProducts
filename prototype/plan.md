# myProducts — SDD Step 2 Prototype Plan

This document is the blueprint for the static HTML mockup in this directory
(`index.html`, `styles.css`, `app.js`). It describes the goals, DOM structure,
styling approach, and interaction logic so the prototype can be reviewed and
later re-implemented in React Native (Step 3/4).

## 1. Prototype Goals

The mockup validates three things before any native code is written:

1. **Layout & Flow** — The full user journey fits a single-screen mobile
   prototype: Login → Home catalog → Product Detail → Cart → Profile →
   Logout. Every screen is reachable and behaves like the final app.
2. **Huashu Design Tokens** — The visual language is locked down through CSS
   custom properties (see §3) so the exact colors, radii, and shadows can be
   ported 1:1 into React Native `constants/colors.ts` later.
3. **Navigation & State** — Tab switching, screen routing, and Redux-style
   state transitions are simulated with vanilla JS to prove the navigation
   model (Auth Stack vs. Main Tabs + Detail push) before committing to
   React Navigation.

It has **zero external dependencies** (system font stack, vanilla CSS/JS,
inline SVG icons) so it runs anywhere without a build step.

## 2. DOM Structure & Views

The page is a single HTML body with one fixed-height `<section>` per screen.
No page reloads occur — routing is done by toggling the `.active` class.

```
body
├── .device-shell            # Mobile frame sim (max-width 412px, 840px tall)
│   ├── .status-bar          # iOS-style dynamic island chrome (always on top)
│   ├── .app-viewport        # Routing container (position: relative, overflow hidden)
│   │   ├── #screen-login    # Auth screen (default active)
│   │   ├── #screen-home     # Main tab: catalog grid
│   │   ├── #screen-detail   # Pushed screen: product detail (not a tab)
│   │   ├── #screen-cart     # Main tab: shopping cart
│   │   └── #screen-profile  # Main tab: account + logout
│   ├── #tab-bar .hidden     # Bottom nav, 3 tabs (Home/Cart/Profile)
│   │   ├── .tab-item[data-tab="home"]
│   │   ├── .tab-item[data-tab="cart"] + #cart-badge
│   │   └── .tab-item[data-tab="profile"]
│   └── #toast               # Transient notification pill
└── .prototype-notice        # Reviewer instructions (outside the device frame)
```

### View-by-view breakdown

**`#screen-login` (AuthContainer)**
- `.brand-header`: navy `mP` monogram tile + "myProducts" wordmark + subtitle.
- `.login-card`: floating white card containing `#login-form` with Username /
  Password inputs, each with an `.error-text` slot, an auto-fill demo link,
  and the primary Sign In button.

**`#screen-home` (Main App Container — Home tab)**
- `.home-header`: sticky header with "Explore Products" title, personalized
  greeting (`#home-user-name`), and an outline Logout button.
- `#products-grid`: 2-column grid, populated dynamically by `app.js`

**`#screen-detail` (stack-pushed screen)**
- `.detail-nav`: sticky back button + truncated product title.
- `.detail-hero-wrap`: full-width hero image with floating category badge.
- `.detail-body`: brand row + rating badge, title, price line + savings pill,
  description.
- `.buy-bar`: sticky bottom bar with Total price and Add to Cart CTA.

**`#screen-cart` (Cart tab)**
- `.page-header`: "My Cart" + item count (`#cart-count`).
- `#cart-list`: dynamically rendered cart line items.
- `#cart-empty`: empty-state placeholder (SVG bag, message, "Start Shopping").
- `#cart-footer`: sticky Total + Checkout button.

**`#screen-profile` (Profile tab)**
- `.profile-card`: circular avatar, full name, `@handle`.
- `.details-card`: grouped rows for Username, Email, Password (masked, with
  Show/Hide toggle), and Gender.
- `.logout-btn`: red destructive logout.

**`#tab-bar`** — fixed 3-tab bottom navigation. Items use `data-tab` attributes
(`home` / `cart` / `profile`). Cart tab carries `#cart-badge`, a red
absolute-positioned count pill.

## 3. Styling Strategy

- **Approach:** A single `styles.css` organized in 12 numbered sections:
  tokens → reset → device frame → viewport/routing → shared components →
  per-screen sections (login, home, detail, cart, profile) → tab bar → notice.
- **Layout primitives:**
  - Global `display: flex` for vertical page centering and the device shell
    column.
  - `.app-viewport` is `flex: 1`; each `.screen` is `position: absolute;
    inset: 0; display: none` and becomes a scrollable flex column only when
    `.active`.
  - Home grid uses **CSS Grid** (`repeat(2, 1fr)`) to simulate the FlatList
    catalog.
  - Sticky elements (`sticky` header/nav on Home & Detail, sticky bottom
    `buy-bar` / `cart-footer`) plus bottom padding on scrollable content to
    clear the fixed tab bar.
- **Huashu Design tokens** (`:root` custom properties, sourced from
  `docs/design/Design Document.md`):

| Token | Hex | Usage |
|---|---|---|
| `--color-canvas` | `#F8FAFC` (Slate 50) | Screen background |
| `--color-surface` | `#FFFFFF` | Cards, panels, tab bar |
| `--color-navy` | `#0F172A` (Slate 900) | Primary buttons, headers, badges |
| `--color-accent` | `#2563EB` (Blue 600) | Active tabs, links, focus ring |
| `--color-border` | `#E2E8F0` (Slate 200) | Input borders, card edges |
| `--color-text` | `#0F172A` (Slate 900) | Primary text |
| `--color-text-muted` | `#64748B` (Slate 500) | Secondary/inactive text |
| `--color-green-bg` / `--color-green-text` | `#DCFCE7` / `#15803D` | Discount pills |
| `--color-amber-bg` / `--color-amber-text` | `#FEF3C7` / `#F59E0B` | Rating badge |
| `--color-danger` | `#EF4444` (Red 500) | Logout, remove, cart badge |
| `--color-placeholder` | `#E2E8F0` | Broken-image fallback backdrop |

  Plus non-color tokens: `--font` (system stack), `--radius-card: 16px`,
  `--radius-field: 12px`, `--radius-btn: 14px`, and two shadow tokens
  (`--shadow-card`, `--shadow-flat`).

## 4. Interaction Logic

All behavior lives in `app.js`, a vanilla JS controller with **zero
dependencies**. It simulates the Redux Toolkit lifecycle (pending →
fulfilled/rejected) that will drive the React Native app.

- **State** — a single `state` object stands in for the Redux store:
  `isAuthenticated`, `user`, `selectedProduct`, `activeTab`, `cartItems`,
  `passwordVisible`. Mock data (`PRODUCTS`, `DEMO_USER`, `INITIAL_CART`)
  mirrors DummyJSON API shapes so field names match future thunks.
- **Screen routing**
  - `navigateTo(screenId)` removes `.active` from every `.screen` and adds it
    to the target (simulates `navigation.navigate`).
  - `switchTab(tab)` sets `state.activeTab`, toggles `.active` on `.tab-item`
    via `data-tab`, routes to the mapped screen, and re-renders the cart when
    entering the Cart tab.
  - `goBack()` returns Detail → Home (simulates `navigation.goBack()`).
- **Login** — submit handler runs `validateLogin()` (required / min-length
  rules with inline `.invalid` + `.error-text` feedback), then simulates the
  thunk: `pending` (button disabled + spinner for 900ms) → `rejected`
  (bad creds show "Invalid username or password") or `fulfilled` (hydrates
  user/cart state, populates Profile fields, reveals the tab bar, navigates
  Home). `fillDemoCreds()` auto-fills `emilys` / `emilyspass`; input events
  clear field errors.
- **Catalog & detail** — `renderProducts()` builds the 2-column card grid;
  `openDetail(id)` looks up the product, fills every detail element, and
  pushes Detail. `handleAddToCart()` increments quantity or adds a new line,
  updates the badge, shows a toast, and briefly flips the button to
  "Added ✓".
- **Cart** — `updateCartBadge()` recomputes `totalQuantity` and hides the
  badge when 0; `computeCartTotal()` sums `price × quantity`;
  `renderCart()` re-renders line items and toggles the empty-state vs.
  list + footer; `changeQty(id, delta)` adjusts quantity (removing the line at
  0); `removeFromCart(id)` filters it out; `checkout()` is stubbed with a
  toast.
- **Profile & session** — `togglePassword()` swaps the password input between
  `text`/`password` and the button label Show/Hide. `logout()` resets all
  state, hides the tab bar, clears the form, and returns to Login.
- **Utilities** — `showToast()` shows a transient pill (auto-dismiss 1800ms,
  debounced); `handleImgError()` swaps broken images for an inline SVG `mP`
  placeholder.
- **Initialization** — on load: route to Login, initialize the badge to 0,
  and pre-render the product grid.