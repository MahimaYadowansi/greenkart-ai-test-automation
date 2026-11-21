// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { tagTestCase, attachScreenshot, attachValue, Severity } from '../utils/allure-report';

 test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Quantity boundaries and duplicate cart actions remain stable', async ({ page }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Catalog & Cart',
      story: 'Quantity boundaries and duplicate actions',
      severity: Severity.NORMAL,
      tags: ['catalog', 'cart', 'edge-case'],
    });

    const brocolli = page.locator('.product').filter({ hasText: 'Brocolli - 1 Kg' });

    await test.step('Open the storefront', async () => {
      await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
      await attachScreenshot(page, 'Storefront loaded');
    });

    await test.step('Decrement quantity below the minimum twice and verify it floors at 1', async () => {
      await brocolli.getByRole('link', { name: '–' }).click();
      await brocolli.getByRole('link', { name: '–' }).click();
      await expect(brocolli.getByRole('spinbutton')).toHaveValue('1');
    });

    await test.step('Double-click increment and verify quantity reaches 3', async () => {
      await brocolli.getByRole('link', { name: '+' }).dblclick();
      await expect(brocolli.getByRole('spinbutton')).toHaveValue('3');
      await attachValue('Brocolli quantity', '3');
    });

    await test.step('Double-click Add to Cart and open the cart', async () => {
      await brocolli.getByRole('button', { name: 'ADD TO CART' }).dblclick();
      await page.getByRole('link', { name: 'Cart' }).click();
    });

    await test.step('Verify Brocolli line totals reflect the duplicate add-to-cart (6 Nos, ₹720)', async () => {
      await expect(page.getByRole('listitem').filter({ hasText: 'Brocolli - 1 Kg' }).getByText('Brocolli - 1 Kg')).toBeVisible();
      const cartList = page.getByRole('list');
      await expect(cartList).toContainText('Brocolli - 1 Kg');
      await expect(cartList).toContainText(/6 Nos\./);
      await expect(cartList).toContainText(/720/);
      await attachValue('Expected cart line', 'Brocolli - 1 Kg | 6 Nos. | ₹720');
      await attachScreenshot(page, 'Cart after duplicate add-to-cart');
    });
  });
});
