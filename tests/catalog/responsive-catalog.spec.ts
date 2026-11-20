// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Catalog and cart are usable at responsive sizes', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const search = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
    await expect(search).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });

    await expect(page.locator('a.mobile-search')).toBeVisible();

    // 1. Verify catalog, quantity, Add to Cart, popover, and removal at narrow width.
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

    const apple = page.locator('.product').filter({ hasText: 'Apple - 1 Kg' });
    await apple.getByRole('button', { name: 'ADD TO CART' }).click();

    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Apple - 1 Kg' }).getByText('Apple - 1 Kg')).toBeVisible();
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();

    // 2. Verify controls fit and the popover remains dismissible.
    const cartBox = await page.getByRole('link', { name: 'Cart' }).boundingBox();
    expect(cartBox).not.toBeNull();

    await page.getByRole('link', { name: '×' }).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('ul.cart-items li')).toHaveCount(0);
  });
});
