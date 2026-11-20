// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

 test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Quantity boundaries and duplicate cart actions remain stable', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const brocolli = page.locator('.product').filter({ hasText: 'Brocolli - 1 Kg' });

    await brocolli.getByRole('link', { name: '–' }).click();
    await brocolli.getByRole('link', { name: '–' }).click();
    await expect(brocolli.getByRole('spinbutton')).toHaveValue('1');

    await brocolli.getByRole('link', { name: '+' }).dblclick();
    await expect(brocolli.getByRole('spinbutton')).toHaveValue('3');

    await brocolli.getByRole('button', { name: 'ADD TO CART' }).dblclick();
    await page.getByRole('link', { name: 'Cart' }).click();

    await expect(page.getByRole('listitem').filter({ hasText: 'Brocolli - 1 Kg' }).getByText('Brocolli - 1 Kg')).toBeVisible();
    const cartList = page.getByRole('list');
    await expect(cartList).toContainText('Brocolli - 1 Kg');
    await expect(cartList).toContainText(/6 Nos\./);
    await expect(cartList).toContainText(/720/);
  });
});
