// New coverage: exercises OffersPage ("Top Deals"), which previously had zero
// test coverage, including its search-filter behavior.
import { test, expect } from '../fixtures/test-fixtures';
import { tagTestCase, attachScreenshot, attachJson, Severity } from '../utils/allure-report';

test.describe('Navigation', () => {
  test.setTimeout(90_000);

  test('Top Deals opens the offers popup and search filters the table', async ({
    storefront,
    offers,
    page,
  }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Navigation',
      story: 'Top Deals offers popup',
      severity: Severity.MINOR,
      tags: ['navigation', 'offers'],
    });

    let offersOnPopup: Awaited<ReturnType<typeof offers.openFrom>>;

    await test.step('Open Top Deals and verify the offers table is visible', async () => {
      offersOnPopup = await offers.openFrom(page);
      await expect(offersOnPopup.table).toBeVisible();
      const rows = await offersOnPopup.table.getByRole('row').allTextContents();
      await attachJson('Offers table (unfiltered)', rows);
    });

    await test.step('Search for a single item and verify the table filters down', async () => {
      await offersOnPopup.searchDeals('Tomato');
      await expect(offersOnPopup.table.getByRole('row')).toHaveCount(2);
      await expect(offersOnPopup.table).toContainText('Tomato');
      await attachScreenshot(offersOnPopup.table.page(), 'Offers filtered to Tomato');
    });
  });
});
