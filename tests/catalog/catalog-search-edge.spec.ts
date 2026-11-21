// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/test-fixtures';
import { tagTestCase, attachScreenshot, attachValue, Severity } from '../utils/allure-report';

test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Search handles exact, partial, case, whitespace, and no-match input', async ({ storefront, page }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Catalog & Cart',
      story: 'Search edge cases',
      severity: Severity.NORMAL,
      tags: ['catalog', 'search', 'edge-case'],
    });

    await test.step('Open the storefront', async () => {
      await storefront.open();
    });

    await test.step('Exact match returns the product', async () => {
      await storefront.searchFor('Apple');
      await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
      await attachValue('Search term', 'Apple');
    });

    await test.step('Partial, lowercase match returns the product', async () => {
      await storefront.searchFor('app');
      await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
    });

    await test.step('Uppercase match returns the product (case-insensitive)', async () => {
      await storefront.searchFor('APPLE');
      await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
    });

    await test.step('Leading/trailing whitespace does not match', async () => {
      await storefront.searchFor('  Apple  ');
      await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).not.toBeVisible();
      await attachScreenshot(page, 'No match for padded search term');
    });

    await test.step('Unknown term shows the no-results message', async () => {
      await storefront.searchFor('xyz');
      await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();
    });

    await test.step('Whitespace-only term shows the no-results message', async () => {
      await storefront.searchFor('     ');
      await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();
    });

    await test.step('Script-injection input is treated as plain text and not executed', async () => {
      await storefront.searchFor('<img src=x onerror=alert(1)>');
      await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();
      await expect(page.locator('img[onerror]')).not.toBeVisible();
      await attachValue('XSS payload tried', '<img src=x onerror=alert(1)>');
    });

    await test.step('Clearing the search restores the full catalog', async () => {
      await storefront.clearSearch();
      await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();
      await attachScreenshot(page, 'Full catalog restored');
    });
  });
});
