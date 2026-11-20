# GreenKart Expanded Selenium Practice Test Plan

## Application Overview

Detailed risk-based test plan for the GreenKart Selenium Practice storefront.

## Test Scenarios

### 1. Catalog and Cart Edge Coverage

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search handles exact, partial, case, whitespace, and no-match input

**File:** `tests/catalog/catalog-search-edge.spec.ts`

**Steps:**
  1. Enter Apple, app, APPLE, and Apple with leading/trailing whitespace.
    - expect: Results consistently match Apple and unrelated products stay hidden.
    - expect: Cart state and totals remain unchanged.
  2. Enter xyz, repeated spaces, or HTML-like text.
    - expect: No matching products are rendered and a clear no-results state appears.
    - expect: The input is not executed or rendered as markup.
    - expect: Clearing search restores the full catalog.

#### 1.2. Quantity boundaries and duplicate cart actions remain stable

**File:** `tests/catalog/cart-boundaries.spec.ts`

**Steps:**
  1. At quantity 1, decrement repeatedly and then increment rapidly.
    - expect: Quantity never becomes negative or zero.
    - expect: It reconciles with the cart line and never creates duplicate rows.
  2. Double-click Add to Cart several times.
    - expect: The app produces a stable cart line and a correct line quantity or clearly identifies repeated additions.
    - expect: Header count, popover, and checkout totals reconcile.

#### 1.3. Mixed-cart removal and empty-cart recovery

**File:** `tests/catalog/cart-mixed-removal.spec.ts`

**Steps:**
  1. Add Brocolli quantity 2, Tomato quantity 3, and Mushroom quantity 1.
    - expect: Cart amount equals 240 + 48 + 75 = 363.
    - expect: Each line displays the correct quantity and line total.
  2. Remove every item, including repeat attempts after the cart is empty.
    - expect: Cart total reaches 0 items and ₹0.
    - expect: No stale rows or stale totals remain.
    - expect: Empty-cart feedback is visible and allows a return to shopping.

#### 1.4. Catalog and cart are usable at responsive sizes

**File:** `tests/catalog/responsive-catalog.spec.ts`

**Steps:**
  1. Repeat search, quantity, Add to Cart, popover, and removal at desktop, tablet, and narrow mobile widths.
    - expect: No control overlaps or disappears.
    - expect: Text and cart controls fit without unintended horizontal page scrolling.
    - expect: The flow remains operable by touch and pointer.
  2. At a narrow width, open the cart and remove its last item.
    - expect: The popover fits within the viewport and remains dismissible.
    - expect: The empty state and checkout controls fit without overlap.

#### 1.5. Catalog supports keyboard-only use

**File:** `tests/catalog/catalog-keyboard.spec.ts`

**Steps:**
  1. Use Tab and Shift+Tab to reach search, steppers, Add to Cart, and Cart.
    - expect: Focus follows a logical order and has a visible indicator.
    - expect: Enter or Space activates controls and the browser exposes meaningful state feedback.
  2. Move through no-results and empty-cart states using only the keyboard.
    - expect: Recovery controls are reachable and no keyboard trap occurs.
    - expect: Search clearing and cart dismissal work without pointer input.

#### 1.6. Catalog and cart remain stable under rapid navigation

**File:** `tests/catalog/catalog-race.spec.ts`

**Steps:**
  1. Rapidly add, remove, open, close, and reopen the cart while search results change.
    - expect: The final summary is consistent with visible cart rows.
    - expect: No stale popover, negative amount, or duplicate line appears.
  2. Press browser Back and Forward while the storefront cart is populated.
    - expect: Navigation never creates or submits an order.
    - expect: Cart state remains consistent or resets predictably with an explanation.

### 2. Checkout and Order Edge Coverage

**Seed:** `tests/seed.spec.ts`

#### 2.1. Promo code negative and boundary inputs

**File:** `tests/checkout/promo-edge.spec.ts`

**Steps:**
  1. For a 360 rupee basket, apply empty, whitespace, invalid, and repeated valid codes.
    - expect: Empty and invalid submissions show a clear result and leave the 360 rupee total unchanged.
    - expect: A valid code applies 10% and a final total of 324 once.
    - expect: Repeated application does not compound the discount or corrupt totals.
  2. Apply the valid code using mixed letter case if the UI is case-sensitive or insensitive.
    - expect: Behavior follows one documented rule consistently.
    - expect: No partial or negative discount is shown.

#### 2.2. Promo and basket edit maintain consistent totals

**File:** `tests/checkout/promo-edit.spec.ts`

**Steps:**
  1. Apply the valid promo, return to the storefront, add another product, and return to checkout.
    - expect: Basket line items and amounts agree before and after navigation.
    - expect: The promo is retained or clearly removed, but the discount and final total are never inconsistent.
  2. Remove the last discounted item and retry checkout.
    - expect: The 0 rupee state is not representable as a valid paid order.
    - expect: The UI blocks order placement or clearly identifies the empty basket defect.

#### 2.3. Country and terms validation combinations

**File:** `tests/checkout/checkout-validation-matrix.spec.ts`

**Steps:**
  1. Test missing country and missing terms, country only, terms only, and both valid.
    - expect: Only the both-valid combination enables a successful order.
    - expect: Invalid combinations keep the user on the country step and show clear applicable feedback.
    - expect: No order confirmation appears during validation failures.
  2. Select a country, leave the page, use browser Back, and restore the checkout state.
    - expect: No accidental order is placed.
    - expect: Returned state is consistent or requires the shopper to reconfirm country and terms.

#### 2.4. Successful order confirmation and reset

**File:** `tests/checkout/order-confirmation-edge.spec.ts`

**Steps:**
  1. Place a valid order, wait for redirect, and return through browser history.
    - expect: Only one success confirmation is shown and no duplicate order is submitted.
    - expect: The cart resets to 0 items and ₹0 after successful placement.
    - expect: The confirmation offers working Home navigation.
  2. Rapidly double-click Proceed.
    - expect: At most one success confirmation and one cart reset occur.
    - expect: The second click cannot create a duplicate or expose stale checkout state.

#### 2.5. Empty direct-route checkout cannot place an order

**File:** `tests/checkout/direct-empty-route.spec.ts`

**Steps:**
  1. From a fresh session, directly open known cart, checkout, country, and confirmation-style routes.
    - expect: Direct route access cannot place an empty order.
    - expect: The app redirects to shopping or presents a clear empty-basket message.
    - expect: A defect is reported if the known empty-cart route reaches country selection.
  2. Remove the last item and click browser Back or Place Order.
    - expect: No confirmation or false success state appears.
    - expect: Visible feedback explains that at least one item is required.

#### 2.6. Checkout remains stable under reload and browser controls

**File:** `tests/checkout/checkout-resilience.spec.ts`

**Steps:**
  1. Reload during promo application and checkout, then use browser Back and Forward.
    - expect: No negative, duplicated, or stale total remains.
    - expect: Reload does not create an order or bypass terms validation.
    - expect: A loading or recovery state resolves predictably.
  2. Rapidly submit Apply and Proceed in mixed combinations.
    - expect: Only one discount application and one order submission are accepted.
    - expect: No stale validation message replaces a current state.

#### 2.7. Checkout is responsive and keyboard accessible

**File:** `tests/checkout/checkout-accessibility.spec.ts`

**Steps:**
  1. Complete the checkout and country form at desktop, tablet, and narrow mobile widths using keyboard and pointer.
    - expect: Promo, Apply, Place Order, country, terms, and Proceed are visible and operable.
    - expect: Validation messages fit and are announced to assistive technology.
    - expect: No control overlaps or requires off-screen pointer use.

### 3. Top Deals and Reliability Coverage

**Seed:** `tests/seed.spec.ts`

#### 3.1. Top Deals pagination and sort boundaries

**File:** `tests/offers/offers-boundaries.spec.ts`

**Steps:**
  1. Set page size to 5 and 10, paginate to the first and final page, then repeat sorting and searching.
    - expect: Only valid pages are reachable and boundary controls disable or disappear correctly.
    - expect: Row count, sorting, and pagination remain consistent with the active filter.
    - expect: Search has no stale rows from the previous page or sort.
  2. Search for Mango, then a no-match value, then clear search.
    - expect: Mango and no-match states reflect the table data correctly.
    - expect: Clearing restores rows in the active sort and page context.

#### 3.2. Delivery date calendar boundaries

**File:** `tests/offers/delivery-date-edge.spec.ts`

**Steps:**
  1. Enter valid past, present, future, leap-day, and invalid calendar dates.
    - expect: Valid dates retain the expected mm/dd/yyyy format.
    - expect: February 29 is rejected in a non-leap year or clearly marked invalid.
    - expect: Invalid input is not silently normalized into a different valid date.
  2. Use adjacent date controls at month and year boundaries.
    - expect: Day, month, and year update predictably.
    - expect: Table rows and navigation are unchanged.

#### 3.3. Navigation and secondary tabs remain predictable

**File:** `tests/navigation/navigation-tabs.spec.ts`

**Steps:**
  1. Open Top Deals and Flight Booking, switch tabs, use browser Back and Forward, and close secondary tabs.
    - expect: Each link reaches its intended destination.
    - expect: Closing a secondary tab leaves the originating storefront usable.
    - expect: Cart state is not accidentally submitted or cleared by tab navigation.
  2. Open Terms and Conditions, use Home, and repeat browser history navigation.
    - expect: Policy navigation never places an order.
    - expect: Home returns to a consistent storefront state.

#### 3.4. Real-world weekly grocery journey

**File:** `tests/e2e/weekly-basket.spec.ts`

**Steps:**
  1. Search for and add ten grocery items, change quantities, remove two items, apply the valid promo, and place an order.
    - expect: Each cart and checkout amount reconciles with its product quantities and prices.
    - expect: The promo applies once at 10%.
    - expect: The valid country and terms flow completes and resets the cart.

#### 3.5. Session refresh and recovery

**File:** `tests/reliability/session-refresh.spec.ts`

**Steps:**
  1. Build a cart, refresh, then slow or block network requests during search or checkout.
    - expect: No stale success is shown after a refresh.
    - expect: The app recovers or provides understandable loading or error feedback.
    - expect: No partial total or duplicate order is created.

#### 3.6. Console, network, and broken-image health

**File:** `tests/reliability/page-health.spec.ts`

**Steps:**
  1. Use catalog, cart, checkout, Top Deals, and policy routes while capturing console, network, and image failures.
    - expect: Any failed core request or broken image is recorded as a defect.
    - expect: Third-party noise is distinguished from app-critical failures.
    - expect: Core navigation remains accessible or provides a recoverable fallback.
