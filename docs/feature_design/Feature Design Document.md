### File 2: `Feature_Design_Part_2_Screen_Details.md`
This file breaks down the exact UI components, text styles, and actions required on every individual screen.

```markdown
# Feature Design Document - Part 2: Screen Details

## 1. Login Screen (`LoginScreen`)
* **Header / Branding:**
  * Square dark icon badge with blue `mP` monogram branding.
  * Primary title: `myProducts` (28px Bold).
  * Subtitle: `Welcome back! Log in to continue.` (14px Slate 500).
* **Card Container:**
  * Floating white card (`#FFFFFF`) with 24px border radius and soft elevation shadow.
  * Section Header: `Sign In` (20px Bold).
* **Input Fields:**
  * Username & Password text inputs with light gray border (`#E2E8F0`), 12px corner radius, and placeholder labels (`Enter username (e.g. emilys)`).
  * Interactive link: `⚡ Auto-fill demo credentials (emilys)` in blue accent text.
* **Primary Action:**
  * Full-width dark navy button (`#0F172A`) labeled `Sign In`.

## 2. Home Screen (`HomeScreen`)
* **Header Bar:**
  * Top greeting: `Explore Products` (24px Bold) with dynamic subheader `Hello, [Name]`.
  * Top Right Action: Secondary outline button `Logout`.
* **Product Grid:**
  * 2-column responsive `FlatList` grid.
* **Product Card Component:**
  * White card with rounded corners (16px) and subtle border/shadow.
  * Top Left Floating Badge: Dark navy category pill (e.g., `Beauty`, `Fragrances`).
  * Center: Product thumbnail image on clean light gray backdrop.
  * Details: Product Title (2 lines max, 15px Bold), Star rating with review count, Price (`$9.99` in 16px Bold), and Discount tag (`-10%` in green pill).

## 3. Detail Screen (`DetailScreen`)
* **Top Navigation Bar:**
  * Left aligned pill button `← Back` and truncated product title header.
* **Hero Section:**
  * Full-width product hero image showcase.
  * Floating category tag badge (e.g., `BEAUTY`).
* **Product Information:**
  * Brand uppercase subheader (`ESSENCE`) paired with gold rating badge (`★ 2.6 / 5.0`).
  * Product Title: Large 22px Bold.
  * Pricing: Main price `$9.99` with green discount highlight tag `Save 10%`.
* **Description Section:**
  * Section header `Description` followed by detailed multi-line body text.
* **Sticky Action Footer:**
  * Bottom floating bar with `Total Price` display and prominent `Add to Cart` CTA button (`#0F172A`).

## 4. Cart Screen (`CartScreen`)
* **Header:**
  * Title `My Cart` with a sub-caption showing the total number of items.
* **Cart List (`FlatList`):**
  * **List Item:** Displays the product thumbnail on the left. On the right: Product Title, Unit Price, and Quantity multiplier.
  * **Item Action:** A clear `Remove` text button or trash icon (`#EF4444`) to delete the item from the Redux store.
  * **Empty State:** If the cart is empty, display a placeholder illustration and a "Start Shopping" button.
* **Order Summary Footer:**
  * Sticky bottom floating bar displaying the dynamically calculated `Total: $XX.XX`.
  * Prominent `Checkout` CTA button (`#0F172A`).

## 5. Profile Screen (`ProfileScreen`)
* **Header:**
  * Title `My Profile` with sub-caption `Manage your account information`.
* **User Profile Card:**
  * Large circular avatar frame with user illustration/photo.
  * Full name: `Emily Johnson` (20px Bold).
  * Handle: `@emilys` (14px Slate 500).
* **Account Details Grouped List:**
  * Rounded container enclosing structured row items with icon tiles:
    * **Username:** `emilys`
    * **Email Address:** `emily.johnson@x.dummyjson.com`
    * **Password:** Masked dots `••••••••` with inline `Show`/`Hide` interactive toggle button.
    * **Gender:** `Female`
* **Logout Button:**
  * Full-width high-visibility red action button (`#EF4444`) labeled `Log Out`.