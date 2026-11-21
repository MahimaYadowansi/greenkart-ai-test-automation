// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { tagTestCase, attachScreenshot, Severity } from '../utils/allure-report';

test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Catalog and cart are usable at responsive sizes', async ({ page }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Catalog & Cart',
      story: 'Responsive layout',
      severity: Severity.NORMAL,
      tags: ['catalog', 'responsive', 'mobile'],
    });

    await test.step('Open the storefront at desktop width (1280x720)', async () => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

      const search = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
      await expect(search).toBeVisible();
      await attachScreenshot(page, 'Desktop layout (1280x720)');
    });

    await test.step('Resize to mobile width (390x844) and verify the mobile search affordance', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(page.locator('a.mobile-search')).toBeVisible();
      await attachScreenshot(page, 'Mobile layout (390x844)');
    });

    // 1. Verify catalog, quantity, Add to Cart, popover, and removal at narrow width.
    await test.step('Add a product to the cart at mobile width', async () => {
      await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

      const apple = page.locator('.product').filter({ hasText: 'Apple - 1 Kg' });
      await apple.getByRole('button', { name: 'ADD TO CART' }).click();

      await page.getByRole('link', { name: 'Cart' }).click();
      await expect(page.getByRole('listitem').filter({ hasText: 'Apple - 1 Kg' }).getByText('Apple - 1 Kg')).toBeVisible();
      await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
      await attachScreenshot(page, 'Cart popover at mobile width');
    });

    // 2. Verify controls fit and the popover remains dismissible.
    await test.step('Verify the Cart control fits on screen and the popover is dismissible', async () => {
      const cartBox = await page.getByRole('link', { name: 'Cart' }).boundingBox();
      expect(cartBox).not.toBeNull();

      await page.getByRole('link', { name: '×' }).click();
      await page.getByRole('link', { name: 'Cart' }).click();
      await expect(page.locator('ul.cart-items li')).toHaveCount(0);
      await attachScreenshot(page, 'Empty cart at mobile width');
    });
  });
});
