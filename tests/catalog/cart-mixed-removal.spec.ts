// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { tagTestCase, attachScreenshot, attachValue, Severity } from '../utils/allure-report';

test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(90_000);
  test('Mixed-cart removal and empty-cart recovery', async ({ page }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Catalog & Cart',
      story: 'Mixed-cart removal and empty-cart recovery',
      severity: Severity.NORMAL,
      tags: ['catalog', 'cart', 'edge-case'],
    });

    const brocolli = page.locator('.product').filter({ hasText: 'Brocolli - 1 Kg' });
    const tomato = page.locator('.product').filter({ hasText: 'Tomato - 1 Kg' });
    const mushroom = page.locator('.product').filter({ hasText: 'Mushroom - 1 Kg' });

    await test.step('Open the storefront', async () => {
      await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    });

    // 1. Add Brocolli quantity 2, Tomato quantity 3, and Mushroom quantity 1.
    await test.step('Add Brocolli (qty 2), Tomato (qty 3), and Mushroom (qty 1) to the cart', async () => {
      await brocolli.getByRole('link', { name: '+' }).click();
      await expect(brocolli.getByRole('spinbutton')).toHaveValue('2');

      await tomato.getByRole('link', { name: '+' }).click();
      await tomato.getByRole('link', { name: '+' }).click();
      await expect(tomato.getByRole('spinbutton')).toHaveValue('3');

      await mushroom.getByRole('spinbutton').fill('1');
      await expect(mushroom.getByRole('spinbutton')).toHaveValue('1');

      await brocolli.getByRole('button', { name: 'ADD TO CART' }).click();
      await tomato.getByRole('button', { name: 'ADD TO CART' }).click();
      await mushroom.getByRole('button', { name: 'ADD TO CART' }).click();

      await page.getByRole('link', { name: 'Cart' }).click();
      await attachScreenshot(page, 'Cart with Brocolli, Tomato, and Mushroom');
    });

    // 2. Verify amount and each line total.
    await test.step('Verify each line total (Brocolli, Tomato, Mushroom)', async () => {
      await expect(page.getByRole('listitem').filter({ hasText: 'Brocolli - 1 Kg' }).getByText('Brocolli - 1 Kg')).toBeVisible();
      const cartList = page.getByRole('list');
      await expect(cartList).toContainText('Brocolli - 1 Kg');
      await expect(cartList).toContainText(/3 Nos\./);
      await expect(cartList).toContainText(/360/);

      await expect(cartList).toContainText('Tomato - 1 Kg');
      await expect(cartList).toContainText(/3 Nos\./);
      await expect(cartList).toContainText(/16/);

      await expect(cartList).toContainText('Mushroom - 1 Kg');
      await expect(cartList).toContainText(/1 No\./);
      await expect(cartList).toContainText(/75/);

      await attachValue(
        'Expected cart lines',
        'Brocolli - 1 Kg | 3 Nos. | ₹360\nTomato - 1 Kg | 3 Nos. | contains "16"\nMushroom - 1 Kg | 1 No. | ₹75',
      );
    });

    // 3. Remove every item and repeat attempts after empty.
    await test.step('Remove every item from the cart, repeating attempts after it is empty', async () => {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        const removeLink = page.getByRole('link', { name: '×' }).first();
        if (!(await removeLink.isVisible())) break;
        await removeLink.click();
      }
    });

    // 4. Verify 0 items and ₹0, no stale rows, and visible empty-cart recovery.
    await test.step('Verify the cart shows 0 items, ₹0, and no stale rows', async () => {
      await expect(page.getByRole('row', { name: /Items.*0/ })).toBeVisible();
      await expect(page.getByRole('row', { name: /Price.*0/ })).toBeVisible();
      await expect(page.locator('ul.cart-items li')).toHaveCount(0);
      await attachScreenshot(page, 'Cart empty after removing every item');
    });
  });
});
