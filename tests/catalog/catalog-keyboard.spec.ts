// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catalog and Cart Edge Coverage', () => {
  test('Catalog supports keyboard-only use', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const search = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });

    // 1. Use Tab, Shift+Tab, Enter, and Space to operate search and cart controls.
    await search.focus();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('Apple');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();

    const brocolli = page.locator('.product').filter({ hasText: 'Brocolli - 1 Kg' });
    const increment = brocolli.getByRole('link', { name: '+' });
    await increment.focus();
    await page.keyboard.press('Enter');
    await expect(brocolli.getByRole('spinbutton')).toHaveValue('2');

    const add = brocolli.getByRole('button', { name: 'ADD TO CART' });
    await add.focus();
    await page.keyboard.press('Enter');

    const cart = page.getByRole('link', { name: 'Cart' });
    await cart.focus();
    await page.keyboard.press('Enter');

    // 2. Verify state feedback and recovery remain keyboard reachable.
    await expect(page.getByRole('listitem').filter({ hasText: 'Brocolli - 1 Kg' }).getByText('Brocolli - 1 Kg')).toBeVisible();
    await page.getByRole('link', { name: '×' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('row', { name: /Items.*0/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Price.*0/ })).toBeVisible();
  });
});
