import { expect, Locator, Page } from '@playwright/test';

export async function expectVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

export async function expectEmptyCart(page: Page): Promise<void> {
  await expect(page.getByText('You cart is empty!')).toBeVisible();
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const contentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(contentWidth).toBeLessThanOrEqual(viewportWidth);
}
