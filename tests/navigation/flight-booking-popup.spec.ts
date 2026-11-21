// New coverage: exercises FlightPage ("Flight Booking"), which previously had
// zero test coverage. The link opens an unrelated external practice site in a
// new tab, so we only assert the popup/navigation contract, not that site's content.
import { test, expect } from '../fixtures/test-fixtures';
import { FlightPage } from '../pages/flight.page';
import { tagTestCase, attachScreenshot, attachValue, Severity } from '../utils/allure-report';

test.describe('Navigation', () => {
  test.setTimeout(90_000);

  test('Flight Booking opens the dropdowns-practise site in a new tab', async ({
    storefront,
    flight,
    page,
  }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Navigation',
      story: 'Flight Booking popup',
      severity: Severity.MINOR,
      tags: ['navigation', 'flight-booking'],
    });

    let flightOnPopup: FlightPage;
    let popupPage!: import('@playwright/test').Page;

    await test.step('Open Flight Booking and capture the popup tab', async () => {
      const popupPromise = page.waitForEvent('popup');
      flightOnPopup = await flight.openFrom(page);
      popupPage = await popupPromise;
      await popupPage.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify the popup navigated to the Flight Booking practice site', async () => {
      expect(flightOnPopup).toBeInstanceOf(FlightPage);
      await expect(popupPage).toHaveURL(/dropdownsPractise/);
      await expect(popupPage.locator('#buttons').getByRole('link', { name: 'Flights' })).toBeVisible();
      await attachValue('Flight Booking popup URL', popupPage.url());
      await attachScreenshot(popupPage, 'Flight Booking practice site');
    });
  });
});
