# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog\cart-mixed-removal.spec.ts >> Catalog and Cart Edge Coverage >> Mixed-cart removal and empty-cart recovery
- Location: tests\catalog\cart-mixed-removal.spec.ts:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator:  getByText('Brocolli - 1 Kg').last()
Expected: visible
Received: hidden

Call log:
  - Expect "toBeVisible" getByText('Brocolli - 1 Kg').last() with timeout 5000ms
  - waiting for getByText('Brocolli - 1 Kg').last()
    5 × locator resolved to <p class="product-name">Brocolli - 1 Kg</p>
      - unexpected value "hidden"
  - Test timeout of 30000ms exceeded.

```

```yaml
- banner:
  - text: GREENKART
  - searchbox "Search for Vegetables and Fruits"
  - button
  - link "🎯 I’ll help you prepare for your next QA job — Explore the QA Career Accelerator.":
    - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - link "Top Deals":
    - /url: "#/offers"
  - link "Flight Booking":
    - /url: https://rahulshettyacademy.com/dropdownsPractise/
  - table:
    - rowgroup:
      - 'row "Items : 3"':
        - cell "Items"
        - cell ":"
        - cell "3":
          - strong: "3"
      - 'row "Price : 483"':
        - cell "Price"
        - cell ":"
        - cell "483":
          - strong: "483"
  - link "Cart":
    - /url: "#"
    - img "Cart"
  - list:
    - listitem:
      - img
      - paragraph: Brocolli - 1 Kg
      - paragraph: ₹ 120
      - paragraph: 3 Nos.
      - paragraph: ₹ 360
      - link "×":
        - /url: "#"
    - listitem:
      - img
      - paragraph: Tomato - 1 Kg
      - paragraph: ₹ 16
      - paragraph: 3 Nos.
      - paragraph: ₹ 48
      - link "×":
        - /url: "#"
    - listitem:
      - img
      - paragraph: Mushroom - 1 Kg
      - paragraph: ₹ 75
      - paragraph: 1 No.
      - paragraph: ₹ 75
      - link "×":
        - /url: "#"
  - button "PROCEED TO CHECKOUT"
- img "Brocolli - 1 Kg"
- heading "Brocolli - 1 Kg" [level=4]
- paragraph: ₹ 120
- link "–":
  - /url: "#"
- spinbutton: "2"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Cauliflower - 1 Kg"
- heading "Cauliflower - 1 Kg" [level=4]
- paragraph: ₹ 60
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Cucumber - 1 Kg"
- heading "Cucumber - 1 Kg" [level=4]
- paragraph: ₹ 48
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Beetroot - 1 Kg"
- heading "Beetroot - 1 Kg" [level=4]
- paragraph: ₹ 32
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Carrot - 1 Kg"
- heading "Carrot - 1 Kg" [level=4]
- paragraph: ₹ 56
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Tomato - 1 Kg"
- heading "Tomato - 1 Kg" [level=4]
- paragraph: ₹ 16
- link "–":
  - /url: "#"
- spinbutton: "3"
- link "+":
  - /url: "#"
- button "✔ ADDED"
- img "Beans - 1 Kg"
- heading "Beans - 1 Kg" [level=4]
- paragraph: ₹ 82
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Brinjal - 1 Kg"
- heading "Brinjal - 1 Kg" [level=4]
- paragraph: ₹ 35
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Capsicum"
- heading "Capsicum" [level=4]
- paragraph: ₹ 60
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Mushroom - 1 Kg"
- heading "Mushroom - 1 Kg" [level=4]
- paragraph: ₹ 75
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "✔ ADDED"
- img "Potato - 1 Kg"
- heading "Potato - 1 Kg" [level=4]
- paragraph: ₹ 22
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Pumpkin - 1 Kg"
- heading "Pumpkin - 1 Kg" [level=4]
- paragraph: ₹ 48
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Corn - 1 Kg"
- heading "Corn - 1 Kg" [level=4]
- paragraph: ₹ 75
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Onion - 1 Kg"
- heading "Onion - 1 Kg" [level=4]
- paragraph: ₹ 16
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Apple - 1 Kg"
- heading "Apple - 1 Kg" [level=4]
- paragraph: ₹ 72
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Banana - 1 Kg"
- heading "Banana - 1 Kg" [level=4]
- paragraph: ₹ 45
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Grapes - 1 Kg"
- heading "Grapes - 1 Kg" [level=4]
- paragraph: ₹ 60
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Mango - 1 Kg"
- heading "Mango - 1 Kg" [level=4]
- paragraph: ₹ 75
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Musk Melon - 1 Kg"
- heading "Musk Melon - 1 Kg" [level=4]
- paragraph: ₹ 36
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Orange - 1 Kg"
- heading "Orange - 1 Kg" [level=4]
- paragraph: ₹ 75
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Pears - 1 Kg"
- heading "Pears - 1 Kg" [level=4]
- paragraph: ₹ 69
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Pomegranate - 1 Kg"
- heading "Pomegranate - 1 Kg" [level=4]
- paragraph: ₹ 95
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Raspberry - 1/4 Kg"
- heading "Raspberry - 1/4 Kg" [level=4]
- paragraph: ₹ 160
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Strawberry - 1/4 Kg"
- heading "Strawberry - 1/4 Kg" [level=4]
- paragraph: ₹ 180
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Water Melon - 1 Kg"
- heading "Water Melon - 1 Kg" [level=4]
- paragraph: ₹ 28
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Almonds - 1/4 Kg"
- heading "Almonds - 1/4 Kg" [level=4]
- paragraph: ₹ 200
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Pista - 1/4 Kg"
- heading "Pista - 1/4 Kg" [level=4]
- paragraph: ₹ 190
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Nuts Mixture - 1 Kg"
- heading "Nuts Mixture - 1 Kg" [level=4]
- paragraph: ₹ 950
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Cashews - 1 Kg"
- heading "Cashews - 1 Kg" [level=4]
- paragraph: ₹ 650
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- img "Walnuts - 1/4 Kg"
- heading "Walnuts - 1/4 Kg" [level=4]
- paragraph: ₹ 170
- link "–":
  - /url: "#"
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
- contentinfo:
  - paragraph:
    - text: © 2019
    - strong: GreenKart
    - text: "- buy veg and fruits online"
```

# Test source

```ts
  1  | // spec: specs/selenium-practise-test-plan.md
  2  | // seed: tests/seed.spec.ts
  3  | 
  4  | import { test, expect } from '@playwright/test';
  5  | 
  6  | test.describe('Catalog and Cart Edge Coverage', () => {
  7  |   test('Mixed-cart removal and empty-cart recovery', async ({ page }) => {
  8  |     await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  9  | 
  10 |     const brocolli = page.locator('.product').filter({ hasText: 'Brocolli - 1 Kg' });
  11 |     const tomato = page.locator('.product').filter({ hasText: 'Tomato - 1 Kg' });
  12 |     const mushroom = page.locator('.product').filter({ hasText: 'Mushroom - 1 Kg' });
  13 | 
  14 |     // 1. Add Brocolli quantity 2, Tomato quantity 3, and Mushroom quantity 1.
  15 |     await brocolli.getByRole('spinbutton').fill('2');
  16 |     await tomato.getByRole('spinbutton').fill('3');
  17 |     await mushroom.getByRole('spinbutton').fill('1');
  18 | 
  19 |     await brocolli.getByRole('button', { name: 'ADD TO CART' }).click();
  20 |     await tomato.getByRole('button', { name: 'ADD TO CART' }).click();
  21 |     await mushroom.getByRole('button', { name: 'ADD TO CART' }).click();
  22 | 
  23 |     await page.getByRole('link', { name: 'Cart' }).click();
  24 | 
  25 |     // 2. Verify amount and each line total.
> 26 |     await expect(page.getByText('Brocolli - 1 Kg').last()).toBeVisible();
     |                                                            ^ Error: expect(locator).toBeVisible() failed
  27 |     await expect(page.getByText('2 Nos.')).toBeVisible();
  28 |     await expect(page.getByText('₹ 240')).toBeVisible();
  29 | 
  30 |     await expect(page.getByText('Tomato - 1 Kg').last()).toBeVisible();
  31 |     await expect(page.getByText('3 Nos.')).toBeVisible();
  32 |     await expect(page.getByText('₹ 48')).toBeVisible();
  33 | 
  34 |     await expect(page.getByText('Mushroom - 1 Kg').last()).toBeVisible();
  35 |     await expect(page.getByText('1 Nos.')).toBeVisible();
  36 |     await expect(page.getByText('₹ 75')).toBeVisible();
  37 | 
  38 |     // 3. Remove every item and repeat attempts after empty.
  39 |     let removeLinks = page.getByRole('link', { name: '×' });
  40 |     while (await removeLinks.count()) {
  41 |       await removeLinks.first().click();
  42 |     }
  43 | 
  44 |     // 4. Verify 0 items and ₹0, no stale rows, and visible empty-cart recovery.
  45 |     await expect(page.getByText('You cart is empty!')).toBeVisible();
  46 |     await expect(page.getByText('Mushroom - 1 Kg')).not.toBeVisible();
  47 |     await expect(page.getByText('₹ 363')).not.toBeVisible();
  48 |   });
  49 | });
  50 | 
```