/* ================================================================
   myProducts — SDD Step 2 Prototype Controller
   Vanilla JS, zero external dependencies.

   This file simulates the Redux Toolkit (RTK) async thunk lifecycle
   (pending → fulfilled / rejected) that will drive the real React
   Native app in Step 3/4. Each function maps to a specific Redux
   slice action or thunk defined in the Feature Engineering docs.

   STRUCTURE:
   1.  Mock Data (simulates DummyJSON API responses)
   2.  Application State (prototype stand-in for Redux store)
   3.  DOM References (element selectors)
   4.  Navigation & Screen Routing
   5.  Login Flow (simulates authSlice loginUser thunk)
   6.  Home Catalog (simulates productSlice.fetchProducts)
   7.  Product Detail (simulates productSlice.fetchProductById)
   8.  Cart Flow (cartSlice: addToCart / updateQuantity / removeFromCart)
   9.  Profile (password toggle + logout)
   10. Utilities (toast + image fallback)
   11. Initialization
   ================================================================ */


/* ================================================================
   1. MOCK DATA (simulates DummyJSON API responses)
   Product objects mirror the DummyJSON Product schema so field
   names match what the real RTK thunks will return in Step 3.
   ================================================================ */

// CDN helper: builds thumbnail URLs with URL-safe product names
const CDN = 'https://cdn.dummyjson.com/products/images';
const thumb = (category, name) =>
  `${CDN}/${category}/${encodeURIComponent(name)}/thumbnail.png`;

// Product catalog (mirrors GET /products?limit=30 response shape)
const PRODUCTS = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    brand: 'Essence',
    category: 'beauty',
    price: 9.99,
    rating: 4.94,
    ratingCount: 94,
    discountPercentage: 7.17,
    description: 'Volumizing, lengthening mascara with a long-lasting, cruelty-free formula.',
    thumbnail: thumb('beauty', 'Essence Mascara Lash Princess')
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    brand: 'Clinique',
    category: 'beauty',
    price: 19.99,
    rating: 3.28,
    ratingCount: 78,
    discountPercentage: 5.82,
    description: 'Versatile eyeshadow shades with a built-in mirror for on-the-go application.',
    thumbnail: thumb('beauty', 'Eyeshadow Palette with Mirror')
  },
  {
    id: 3,
    title: 'Powder Canister',
    brand: 'Velvet Touch',
    category: 'beauty',
    price: 14.99,
    rating: 3.82,
    ratingCount: 52,
    discountPercentage: 6.85,
    description: 'Finely milled setting powder that controls shine for a smooth matte finish.',
    thumbnail: thumb('beauty', 'Powder Canister')
  },
  {
    id: 4,
    title: 'Red Lipstick',
    brand: 'Vov Beauty',
    category: 'beauty',
    price: 12.99,
    rating: 2.51,
    ratingCount: 36,
    discountPercentage: 5.53,
    description: 'Classic bold red with a creamy, pigmented formula for rich comfortable wear.',
    thumbnail: thumb('beauty', 'Red Lipstick')
  },
  {
    id: 5,
    title: 'Red Nail Polish',
    brand: 'Vov Beauty',
    category: 'beauty',
    price: 8.99,
    rating: 3.91,
    ratingCount: 44,
    discountPercentage: 8.4,
    description: 'Glossy quick-drying red for vibrant, chip-resistant polished nails.',
    thumbnail: thumb('beauty', 'Red Nail Polish')
  },
  {
    id: 6,
    title: 'Calvin Klein CK One',
    brand: 'Calvin Klein',
    category: 'fragrances',
    price: 49.99,
    rating: 4.69,
    ratingCount: 120,
    discountPercentage: 6.78,
    description: 'Classic unisex fragrance with a fresh, clean scent for everyday wear.',
    thumbnail: thumb('fragrances', 'Calvin Klein CK One')
  },
  {
    id: 7,
    title: 'Chanel Coco Noir Eau De',
    brand: 'Chanel',
    category: 'fragrances',
    price: 129.99,
    rating: 2.76,
    ratingCount: 65,
    discountPercentage: 5.35,
    description: 'Elegant and mysterious blend of grapefruit, rose and vanilla for evening wear.',
    thumbnail: thumb('fragrances', 'Chanel Coco Noir Eau De')
  },
  {
    id: 8,
    title: 'Twinny Lipstick',
    brand: 'Twinny',
    category: 'beauty',
    price: 9.99,
    rating: 3.92,
    ratingCount: 88,
    discountPercentage: 6.45,
    description: 'Glossy vibrant lipstick with a comfortable, hydrating everyday formula.',
    thumbnail: thumb('beauty', 'Twinny Lipstick')
  }
];

// Authenticated demo user (mirrors POST /auth/login "emilys" response)
const DEMO_USER = {
  username: 'emilys',
  password: 'emilyspass',
  firstName: 'Emily',
  lastName: 'Johnson',
  email: 'emily.johnson@x.dummyjson.com',
  gender: 'Female',
  image: 'https://dummyjson.com/icon/emilys/128'
};

// Pre-populated cart lines: { product, quantity }
// Matches the wireframe showing 2 items in the cart on first load
const INITIAL_CART = [
  { product: PRODUCTS.find(p => p.id === 1), quantity: 1 },
  { product: PRODUCTS.find(p => p.id === 4), quantity: 1 }
];


/* ================================================================
   2. APPLICATION STATE (prototype stand-in for Redux store)
   In the real app, this state tree is managed by configureStore
   with authSlice, productSlice, and cartSlice reducers.

   Mapping to Redux slices:
   - isAuthenticated, user → authSlice state
   - selectedProduct → productSlice.activeProduct
   - activeTab → navigation state (React Navigation)
   - cartItems, totalQuantity, totalPrice → cartSlice state
   - passwordVisible → local UI state (ProfileScreen)
   ================================================================ */
const state = {
  isAuthenticated: false,
  user: null,
  selectedProduct: null,
  activeTab: 'home',
  cartItems: [],
  passwordVisible: false
};


/* ================================================================
   3. DOM REFERENCES
   Centralized element selectors (equivalent to useRef hooks in
   the React Native components).
   ================================================================ */
const $ = (id) => document.getElementById(id);

// Screen sections (each maps to a React Navigation screen)
const screenLogin   = $('screen-login');
const screenHome    = $('screen-home');
const screenDetail  = $('screen-detail');
const screenCart    = $('screen-cart');
const screenProfile = $('screen-profile');

// Tab bar and badge
const tabBar    = $('tab-bar');
const cartBadge = $('cart-badge');
const toast     = $('toast');

// Login form elements
const loginForm   = $('login-form');
const usernameEl  = $('username-input');
const passwordEl  = $('password-input');
const usernameErr = $('username-error');
const passwordErr = $('password-error');
const loginBtn    = $('login-btn');

// Home product grid container
const productsGrid = $('products-grid');


/* ================================================================
   4. NAVIGATION & SCREEN ROUTING
   Simulates React Navigation's navigation.navigate() and
   navigation.goBack() by toggling .active class on screen sections.
   ================================================================ */

/**
 * navigateTo(screenId) — Shows one screen, hides all others.
 * Maps to: navigation.navigate(screenName) in React Navigation.
 * @param {string} screenId - The DOM id of the screen to display
 */
function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s =>
    s.classList.remove('active'));
  $(screenId).classList.add('active');
}

/**
 * switchTab(tab) — Bottom tab switching (Home ↔ Cart ↔ Profile).
 * Maps to: navigation.navigate('MainTabs', { screen: tab }).
 * Also refreshes cart data when entering the Cart tab.
 * @param {string} tab - 'home' | 'cart' | 'profile'
 */
function switchTab(tab) {
  state.activeTab = tab;

  // Update active tab visual state
  document.querySelectorAll('.tab-item').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab));

  // Route to the correct screen
  const screenMap = {
    home: 'screen-home',
    cart: 'screen-cart',
    profile: 'screen-profile'
  };
  navigateTo(screenMap[tab]);

  // Refresh cart rendering when entering Cart tab (re-render totals)
  if (tab === 'cart') renderCart();
}

/**
 * goBack() — Returns from Detail screen to Home tab.
 * Maps to: navigation.goBack() in the HomeStackNavigator.
 */
function goBack() { switchTab('home'); }


/* ================================================================
   5. LOGIN FLOW (simulates authSlice loginUser thunk)
   Simulates the RTK async thunk lifecycle:
   - pending:  disable button, show spinner
   - fulfilled: hydrate auth state, reveal tabs, navigate to Home
   - rejected:  show inline error, stay on Login
   ================================================================ */

// Simulated network delay (pending state of the RTK async thunk)
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * validateLogin() — Client-side form validation.
 * Mirrors Redux rejected-state fallback UI for invalid inputs.
 * @returns {boolean} true if both fields pass validation
 */
function validateLogin() {
  let valid = true;
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();

  // Username validation: required, min 3 chars
  const usernameInvalid = !username || username.length < 3;
  usernameEl.classList.toggle('invalid', usernameInvalid);
  usernameErr.style.display = usernameInvalid ? 'block' : 'none';
  usernameErr.textContent = !username
    ? 'Username is required'
    : 'Username must be at least 3 characters';

  // Password validation: required, min 4 chars
  const passwordInvalid = !password || password.length < 4;
  passwordEl.classList.toggle('invalid', passwordInvalid);
  passwordErr.style.display = passwordInvalid ? 'block' : 'none';
  passwordErr.textContent = !password
    ? 'Password is required'
    : 'Password must be at least 4 characters';

  if (usernameInvalid) valid = false;
  if (passwordInvalid) valid = false;
  return valid;
}

/**
 * clearFieldError(input, errEl) — Clears inline validation errors.
 * Called after auto-fill or user typing to reset field state.
 */
function clearFieldError(input, errEl) {
  input.classList.remove('invalid');
  errEl.style.display = 'none';
}

// Form submit handler: simulates POST /auth/login dispatch
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateLogin()) return;

  // --- PENDING STATE: disable button + show spinner ---
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span class="spinner"></span> Signing in...';

  // Simulate network round-trip latency
  await delay(900);

  // --- REJECTED STATE: invalid credentials → inline error ---
  if (usernameEl.value.trim() !== DEMO_USER.username ||
      passwordEl.value.trim() !== DEMO_USER.password) {
    usernameErr.style.display = 'block';
    usernameErr.textContent = 'Invalid username or password';
    usernameEl.classList.add('invalid');
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
    return;
  }

  // --- FULFILLED STATE: hydrate "authSlice", enter main app ---
  state.isAuthenticated = true;
  state.user = DEMO_USER;
  // Deep clone initial cart (fresh mock store on each login)
  state.cartItems = JSON.parse(JSON.stringify(INITIAL_CART));
  state.passwordVisible = false;

  // Populate Profile screen with user data (from authSlice.user)
  $('home-user-name').textContent = DEMO_USER.firstName;
  $('profile-name').textContent =
    `${DEMO_USER.firstName} ${DEMO_USER.lastName}`;
  $('profile-handle').textContent = `@${DEMO_USER.username}`;
  $('profile-avatar').src = DEMO_USER.image;
  $('profile-username').textContent = DEMO_USER.username;
  $('profile-email').textContent = DEMO_USER.email;
  $('profile-gender').textContent = DEMO_USER.gender;
  $('profile-password').value = DEMO_USER.password;

  // Reset button state
  loginBtn.disabled = false;
  loginBtn.textContent = 'Sign In';

  // Reveal tab bar and navigate to Home
  tabBar.classList.remove('hidden');
  updateCartBadge();
  switchTab('home');
});

/**
 * fillDemoCreds() — Auto-fills emilys / emilyspass into form fields.
 * Maps to: Demo Quick-Fill CTA in LoginScreen.tsx
 */
function fillDemoCreds() {
  usernameEl.value = DEMO_USER.username;
  passwordEl.value = DEMO_USER.password;
  clearFieldError(usernameEl, usernameErr);
  clearFieldError(passwordEl, passwordErr);
}

// Clear inline errors on input (real-time validation feedback)
usernameEl.addEventListener('input', () =>
  clearFieldError(usernameEl, usernameErr));
passwordEl.addEventListener('input', () =>
  clearFieldError(passwordEl, passwordErr));


/* ================================================================
   6. HOME CATALOG (simulates productSlice.fetchProducts)
   Renders the 2-column product grid from mock data.
   In the real app, this data comes from the Redux store after
   fetchProducts.fulfilled dispatches the API response.
   ================================================================ */

/**
 * renderProducts() — Builds the product card grid HTML.
 * Maps to: <FlatList> in HomeScreen.tsx rendering <ProductCard>.
 * Each card is clickable and navigates to the Detail screen.
 */
function renderProducts() {
  productsGrid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card" onclick="openDetail(${p.id})">
      <div class="product-thumb-wrap">
        <span class="product-badge">${p.category}</span>
        <img class="product-thumb" src="${p.thumbnail}" alt="${p.title}"
             loading="lazy" onerror="handleImgError(this)">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <div class="product-meta">
          <span class="rating-badge">
            <span class="rating-stars">★</span> ${p.rating}
          </span>
          <span class="product-price">$${p.price.toFixed(2)}</span>
        </div>
        <span class="discount-pill">-${Math.round(p.discountPercentage)}%</span>
      </div>
    </article>
  `).join('');
}


/* ================================================================
   7. PRODUCT DETAIL (simulates productSlice.fetchProductById)
   Populates the detail screen with a single product's data.
   In the real app, fetchProductById thunk fetches from
   GET /products/{id} and stores the result in productSlice.activeProduct.
   ================================================================ */

/**
 * openDetail(id) — Opens the Detail screen for a specific product.
 * Maps to: navigation.navigate('DetailScreen', { productId: id })
 * @param {number} id - The product ID to display
 */
function openDetail(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  state.selectedProduct = product;

  // Populate all detail screen elements
  $('detail-nav-title').textContent = product.title;
  $('detail-hero').src = product.thumbnail;
  $('detail-category').textContent = product.category.toUpperCase();
  $('detail-brand').textContent = product.brand.toUpperCase();
  $('detail-rating').textContent = product.rating;
  $('detail-title').textContent = product.title;
  $('detail-price').textContent = `$${product.price.toFixed(2)}`;
  $('detail-save').textContent = `Save ${Math.round(product.discountPercentage)}%`;
  $('detail-desc').textContent = product.description;
  $('buy-total').textContent = `$${product.price.toFixed(2)}`;

  // Reset Add to Cart button text
  $('add-cart-btn').textContent = 'Add to Cart';

  // Navigate to detail screen (stack push)
  navigateTo('screen-detail');
}

/**
 * handleAddToCart() — Adds the current product to the cart.
 * Maps to: dispatch(addToCart(product)) in cartSlice.
 * Provides visual feedback (button state change + toast notification).
 */
function handleAddToCart() {
  const product = state.selectedProduct;
  if (!product) return;

  // cartSlice.addToCart: increment quantity or add new line
  const line = state.cartItems.find(i => i.product.id === product.id);
  if (line) {
    line.quantity += 1;
  } else {
    state.cartItems.push({ product, quantity: 1 });
  }

  // Update badge count and show feedback
  updateCartBadge();
  showToast('✓ Added to cart');

  // Brief "Added ✓" button state change (1.4s)
  const btn = $('add-cart-btn');
  btn.textContent = 'Added ✓';
  setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1400);
}


/* ================================================================
   8. CART FLOW (cartSlice: addToCart / updateQuantity / removeFromCart)
   Manages the shopping cart: rendering items, adjusting quantities,
   calculating totals, and handling the empty state edge case.
   ================================================================ */

/**
 * updateCartBadge() — Updates the red cart badge count.
 * Maps to: cartSlice.totalQuantity selector in the tab bar.
 * Hides the badge when total quantity is 0.
 */
function updateCartBadge() {
  const totalQty = state.cartItems.reduce((sum, i) => sum + i.quantity, 0);
  cartBadge.textContent = totalQty;
  cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';
}

/**
 * computeCartTotal() — Calculates the cart total price.
 * Maps to: cartSlice.totalPrice selector.
 * @returns {number} Sum of (price × quantity) for all cart items
 */
function computeCartTotal() {
  return state.cartItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity, 0);
}

/**
 * renderCart() — Renders the full cart view.
 * Maps to: <FlatList> in CartScreen.tsx rendering cart item rows.
 * Handles the empty state edge case (no items in cart).
 */
function renderCart() {
  const countEl  = $('cart-count');
  const totalEl  = $('cart-total');
  const listEl   = $('cart-list');
  const emptyEl  = $('cart-empty');
  const footerEl = $('cart-footer');

  // Update header count and footer total
  const totalQty = state.cartItems.reduce(
    (sum, i) => sum + i.quantity, 0);
  countEl.textContent = totalQty;
  totalEl.textContent = `$${computeCartTotal().toFixed(2)}`;

  // Render cart item rows
  listEl.innerHTML = state.cartItems.map(i => `
    <div class="cart-item">
      <img class="cart-thumb" src="${i.product.thumbnail}"
           alt="${i.product.title}" onerror="handleImgError(this)">
      <div class="cart-info">
        <h3 class="cart-name">${i.product.title}</h3>
        <span class="cart-unit">$${i.product.price.toFixed(2)} each</span>
        <div class="cart-actions">
          <div class="qty-row">
            <button class="qty-btn"
                    onclick="changeQty(${i.product.id}, -1)">−</button>
            <span class="qty-value">${i.quantity}</span>
            <button class="qty-btn"
                    onclick="changeQty(${i.product.id}, 1)">+</button>
          </div>
          <button class="remove-btn"
                  onclick="removeFromCart(${i.product.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  // Toggle empty-state vs list + footer (edge case: empty cart)
  const isEmpty = state.cartItems.length === 0;
  listEl.classList.toggle('hidden', isEmpty);
  footerEl.classList.toggle('hidden', isEmpty);
  emptyEl.classList.toggle('hidden', !isEmpty);
}

/**
 * changeQty(id, delta) — Adjusts item quantity by delta.
 * Maps to: dispatch(updateQuantity({ id, delta })) in cartSlice.
 * Removes the item entirely when quantity drops to 0 or below.
 * @param {number} id    - Product ID
 * @param {number} delta - Quantity change (+1 or -1)
 */
function changeQty(id, delta) {
  const line = state.cartItems.find(i => i.product.id === id);
  if (!line) return;
  line.quantity += delta;
  if (line.quantity <= 0) {
    state.cartItems = state.cartItems.filter(i => i.product.id !== id);
  }
  updateCartBadge();
  renderCart();
}

/**
 * removeFromCart(id) — Removes an item from the cart entirely.
 * Maps to: dispatch(removeFromCart(id)) in cartSlice.
 * @param {number} id - Product ID to remove
 */
function removeFromCart(id) {
  state.cartItems = state.cartItems.filter(i => i.product.id !== id);
  updateCartBadge();
  renderCart();
}

/**
 * checkout() — Checkout CTA handler (out of scope for Step 2).
 * In a future step, this would navigate to a CheckoutScreen.
 */
function checkout() {
  showToast('Checkout coming in a later step');
}


/* ================================================================
   9. PROFILE (password toggle + logout)
   Handles user account display interactions.
   ================================================================ */

/**
 * togglePassword() — Masks/unmasks the password field.
 * Maps to: password visibility toggle in ProfileScreen.tsx.
 * Swaps between Show/Hide button text and password/text input type.
 */
function togglePassword() {
  const input = $('profile-password');
  state.passwordVisible = !state.passwordVisible;
  input.type = state.passwordVisible ? 'text' : 'password';
  input.closest('.password-field')
       .querySelector('.toggle-password')
       .textContent = state.passwordVisible ? 'Hide' : 'Show';
}

/**
 * logout() — Global session termination.
 * Maps to: dispatch(logout()) in authSlice, which also triggers
 * AsyncStorage.multiRemove to purge @auth_token and @user_profile.
 * Resets all state and returns to the Login screen.
 */
function logout() {
  // Reset auth state (authSlice → initial state)
  state.isAuthenticated = false;
  state.user = null;
  state.selectedProduct = null;

  // Reset cart state (cartSlice → initial state)
  state.cartItems = [];

  // Reset navigation state
  state.activeTab = 'home';
  state.passwordVisible = false;

  // Hide tab bar and navigate back to Login
  tabBar.classList.add('hidden');
  updateCartBadge();
  navigateTo('screen-login');

  // Reset login form and clear any validation errors
  loginForm.reset();
  clearFieldError(usernameEl, usernameErr);
  clearFieldError(passwordEl, passwordErr);
}


/* ================================================================
   10. UTILITIES (toast + image fallback)
   Shared helper functions used across multiple screens.
   ================================================================ */

// Toast timer reference (for debouncing rapid notifications)
let toastTimer;

/**
 * showToast(message) — Displays a transient pill-shaped notification.
 * Auto-dismisses after 1800ms.
 * @param {string} message - The text to display in the toast
 */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

/**
 * handleImgError(img) — Image load failure fallback.
 * Replaces broken images with a light-gray SVG placeholder
 * displaying the "mP" monogram (edge case handling per Task Doc §2).
 * @param {HTMLImageElement} img - The image element that failed to load
 */
function handleImgError(img) {
  img.onerror = null; // prevent infinite loop if fallback also fails
  img.src = 'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect width="200" height="200" fill="#E2E8F0"/>
        <text x="100" y="112" font-size="28" text-anchor="middle"
              fill="#94A3B8">mP</text>
      </svg>`
    );
}


/* ================================================================
   11. INITIALIZATION
   Entry point: sets initial screen state, renders product grid,
   and initializes the cart badge count.
   ================================================================ */
navigateTo('screen-login');  // Start on Login screen (unauthenticated)
updateCartBadge();           // Initialize badge to 0
renderProducts();            // Pre-render the product grid
