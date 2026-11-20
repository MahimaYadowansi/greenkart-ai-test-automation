# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog\responsive-catalog.spec.ts >> Catalog and Cart Edge Coverage >> Catalog and cart are usable at responsive sizes
- Location: tests\catalog\responsive-catalog.spec.ts:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('searchbox', { name: 'Search for Vegetables and Fruits' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }) with timeout 5000ms
  - waiting for getByRole('searchbox', { name: 'Search for Vegetables and Fruits' })

```

```yaml
- banner:
  - text: GREENKART
  - link "search":
    - /url: "#"
    - img "search"
  - link "🎯 I’ll help you prepare for your next QA job — Explore the QA Career Accelerator.":
    - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - link "Top Deals":
    - /url: "#/offers"
  - link "Flight Booking":
    - /url: https://rahulshettyacademy.com/dropdownsPractise/
  - link "Cart":
    - /url: "#"
    - img "Cart"
- img "Brocolli - 1 Kg"
- heading "Brocolli - 1 Kg" [level=4]
- paragraph: ₹ 120
- link "–":
  - /url: "#"
- spinbutton: "1"
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
- spinbutton: "1"
- link "+":
  - /url: "#"
- button "ADD TO CART"
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
- button "ADD TO CART"
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
  7  |   test('Catalog and cart are usable at responsive sizes', async ({ page }) => {
  8  |     await page.setViewportSize({ width: 1280, height: 720 });
  9  |     await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  10 | 
  11 |     const search = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
  12 |     await expect(search).toBeVisible();
  13 | 
  14 |     await page.setViewportSize({ width: 390, height: 844 });
> 15 |     await expect(search).toBeVisible();
     |                          ^ Error: expect(locator).toBeVisible() failed
  16 | 
  17 |     // 1. Repeat search, quantity, Add to Cart, popover, and removal at narrow width.
  18 |     await search.fill('Apple');
  19 |     await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
  20 | 
  21 |     const apple = page.locator('.product').filter({ hasText: 'Apple - 1 Kg' });
  22 |     await apple.getByRole('button', { name: 'ADD TO CART' }).click();
  23 | 
  24 |     await page.getByRole('link', { name: 'Cart' }).click();
  25 |     await expect(page.getByText('Apple - 1 Kg').last()).toBeVisible();
  26 |     await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
  27 | 
  28 |     // 2. Verify controls fit and the popover remains dismissible.
  29 |     const cartBox = await page.getByRole('link', { name: 'Cart' }).boundingBox();
  30 |     expect(cartBox).not.toBeNull();
  31 | 
  32 |     await page.getByRole('link', { name: '×' }).click();
  33 |     await page.getByRole('link', { name: 'Cart' }).click();
  34 |     await expect(page.getByText('You cart is empty!')).toBeVisible();
  35 |   });
  36 | });
  37 | 
```