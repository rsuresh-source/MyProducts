# Feature Design Document - Part 1: UI Wireframes

## 1. Shopping Flow (Home, Detail, Cart)

+--------------------------------------------------------------------------------+
| 1. HOME SCREEN       | 2. DETAIL SCREEN     | 3. CART SCREEN                   |
+--------------------------------------------------------------------------------+
| Explore Products     | [<- Back] Essence... | My Cart                          |
| Hello, Emily [Logout]|                      | 2 Items                          |
| +--------+ +--------+| +------------------+ | +------------------------------+ |
| |[Badge] | |[Badge] || |   [Hero Image]   | | | [Img] Essence Mascara  $9.99 | |
| | Image  | | Image  || +------------------+ | |       Qty: 1      [Remove]   | |
| | Title  | | Title  || ESSENCE     *2.6/5.0 | +------------------------------+ |
| | *2.6   | | *2.9   || Essence Mascara...   | +------------------------------+ |
| | $9.99  | | $19.99 || $9.99   [Save 10%]   | | [Img] Red Lipstick    $12.99 | |
| +--------+ +--------+| Description:         | |       Qty: 1      [Remove]   | |
|                      | Volumizing lashes... | +------------------------------+ |
|                      | -------------------  | ------------------------------ |
|                      | Total: $9.99 [Add]   | Total: $22.98       [Checkout] |
| [Home] [Cart] [Prof] | [Home] [Cart] [Prof] | [Home] [Cart(2)]       [Prof]  |
+--------------------------------------------------------------------------------+

## 2. User Flow (Login & Profile)

+---------------------------------------------------+
| 4. LOGIN SCREEN      | 5. PROFILE SCREEN          |
+---------------------------------------------------+
|  +---------------+   | My Profile                 |
|  | [ mP Logo ]   |   | Manage account info        |
|  +---------------+   | +------------------------+ |
|    myProducts        | |       ((Avatar))       | |
|  Welcome back!       | |     Emily Johnson      | |
|                      | |        @emilys         | |
| +------------------+ | +------------------------+ |
| | Sign In          | | Account Details          |
| | Username [     ] | | [Icon] Username          |
| | Password [     ] | | [Icon] Email             |
| | ⚡ Auto-fill demo | | [Icon] Password   [Show] |
| | [   Sign In    ] | | [Icon] Gender            |
| +------------------+ |                            |
|                      | [    Log Out (Red)     ]   |
|                      | [Home]  [Cart]  [Profile]  |
+---------------------------------------------------+