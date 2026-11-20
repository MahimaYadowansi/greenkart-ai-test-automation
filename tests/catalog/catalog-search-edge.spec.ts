// spec: specs/selenium-practise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/test-fixtures';

test.describe('Catalog and Cart Edge Coverage', () => {
  test.setTimeout(60_000);
  test('Search handles exact, partial, case, whitespace, and no-match input', async ({ storefront, page }) => {
    await storefront.open();

    await storefront.searchFor('Apple');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

    await storefront.searchFor('app');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

    await storefront.searchFor('APPLE');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

    await storefront.searchFor('  Apple  ');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).not.toBeVisible();

    await storefront.searchFor('xyz');
    await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();

    await storefront.searchFor('     ');
    await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();

    await storefront.searchFor('<img src=x onerror=alert(1)>');
    await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();
    await expect(page.locator('img[onerror]')).not.toBeVisible();

    await storefront.clearSearch();
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();
  });
});
