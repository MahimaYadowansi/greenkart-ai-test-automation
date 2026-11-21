// New coverage: exercises TermsPage, which previously had zero test coverage.
// The "Terms & Conditions" link only appears on the country/checkout step and
// opens a popup tab, so we capture that popup and wrap it in a TermsPage.
import { test, expect } from '../fixtures/test-fixtures';
import { TermsPage } from '../pages/terms.page';
import { products } from '../utils/test-data';
import { tagTestCase, attachScreenshot, attachValue, Severity } from '../utils/allure-report';

test.describe('Navigation', () => {
  test.setTimeout(60_000);

  test('Terms & Conditions link opens the policy page and returns Home', async ({
    storefront,
    checkout,
    terms,
    page,
  }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Navigation',
      story: 'Terms & Conditions',
      severity: Severity.MINOR,
      tags: ['navigation', 'terms-and-conditions'],
    });

    await test.step('Reach the country/checkout step where the Terms link lives', async () => {
      await storefront.addToCart(products.mushroom);
      await storefront.openCart();
      await storefront.proceedToCheckout();
      await checkout.placeOrderFromCheckout();
      await expect(page.getByText('Choose Country')).toBeVisible();
    });

    let popupPage!: import('@playwright/test').Page;

    await test.step('Open Terms & Conditions and verify the policy popup', async () => {
      const popupPromise = page.waitForEvent('popup');
      await terms.openTerms(page);
      popupPage = await popupPromise;
      await popupPage.waitForLoadState('domcontentloaded');
      await attachValue('Terms popup URL', popupPage.url());
      await attachScreenshot(popupPage, 'Terms & Conditions popup');
    });

    await test.step('Return Home from the Terms & Conditions popup', async () => {
      const termsOnPopup = new TermsPage(popupPage);
      await expect(termsOnPopup.home).toBeVisible();
      await termsOnPopup.returnHome();
      await attachScreenshot(popupPage, 'Back on Home after Terms & Conditions');
    });
  });
});
