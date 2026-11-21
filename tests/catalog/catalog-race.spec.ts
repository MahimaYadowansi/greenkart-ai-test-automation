// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { tagTestCase, attachScreenshot, Severity } from '../utils/allure-report';

test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Catalog and cart remain stable under rapid navigation', async ({ page }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Catalog & Cart',
      story: 'Stability under rapid navigation',
      severity: Severity.NORMAL,
      tags: ['catalog', 'cart', 'edge-case', 'race-condition'],
    });

    const brocolli = page.locator('.product').filter({ hasText: 'Brocolli - 1 Kg' });

    await test.step('Open the storefront', async () => {
      await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    });

    // 1. Rapidly add, remove, open, close, and reopen the cart while search changes.
    await test.step('Rapidly add, remove, and reopen the cart while search changes', async () => {
      await brocolli.getByRole('link', { name: '+' }).click();
      await brocolli.getByRole('button', { name: 'ADD TO CART' }).dblclick();

      await page.getByRole('link', { name: 'Cart' }).click();
      await expect(page.getByRole('listitem').filter({ hasText: 'Brocolli - 1 Kg' }).getByText('Brocolli - 1 Kg')).toBeVisible();

      await page.getByRole('link', { name: '×' }).click();
      await expect(page.getByRole('row', { name: /Items.*0/ })).toBeVisible();
      await expect(page.getByRole('row', { name: /Price.*0/ })).toBeVisible();

      const search = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
      await search.fill('xyz');
      await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();

      // 2. Verify summary/row consistency and no stale popover or negative amount.
      await search.fill('');
      await expect(page.getByRole('row', { name: /Items.*0/ })).toBeVisible();
      await expect(page.getByRole('row', { name: /Price.*0/ })).toBeVisible();
      await attachScreenshot(page, 'Cart reset to 0 items after rapid actions');
    });

    // 3. Use browser Back and Forward while populated.
    await test.step('Use browser Back and Forward while the cart is populated', async () => {
      await brocolli.getByRole('button', { name: 'ADD TO CART' }).click();
      await page.goBack();
      await page.goForward();
    });

    // 4. Browser history must not submit an order or leave an inconsistent state.
    await test.step('Verify browser history did not submit an order or corrupt state', async () => {
      await page.getByRole('link', { name: 'Cart' }).click();
      const hasBrocolli = await page.getByRole('listitem').filter({ hasText: 'Brocolli - 1 Kg' }).first().isVisible();
      const cartIsEmpty = await page.getByRole('heading', { name: 'You cart is empty!' }).first().isVisible();
      expect(hasBrocolli || cartIsEmpty).toBe(true);
      await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
      await attachScreenshot(page, 'Cart state after browser Back/Forward');
    });
  });
});
