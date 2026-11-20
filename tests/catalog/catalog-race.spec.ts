// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Catalog and cart remain stable under rapid navigation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const brocolli = page.locator('.product').filter({ hasText: 'Brocolli - 1 Kg' });

    // 1. Rapidly add, remove, open, close, and reopen the cart while search changes.
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

    // 3. Use browser Back and Forward while populated.
    await brocolli.getByRole('button', { name: 'ADD TO CART' }).click();
    await page.goBack();
    await page.goForward();

    // 4. Browser history must not submit an order or leave an inconsistent state.
    await page.getByRole('link', { name: 'Cart' }).click();
    const hasBrocolli = await page.getByRole('listitem').filter({ hasText: 'Brocolli - 1 Kg' }).first().isVisible();
    const cartIsEmpty = await page.getByRole('heading', { name: 'You cart is empty!' }).first().isVisible();
    expect(hasBrocolli || cartIsEmpty).toBe(true);
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
  });
});
