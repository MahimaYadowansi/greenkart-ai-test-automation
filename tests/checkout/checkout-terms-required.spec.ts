// New coverage: exercises CountryPage's validation path so the Allure report
// has a case showing the "Terms & Conditions required" guard rail.
import { test, expect } from '../fixtures/test-fixtures';
import { products } from '../utils/test-data';
import { tagTestCase, attachScreenshot, Severity } from '../utils/allure-report';

test.describe('Checkout Flow', () => {
  test.setTimeout(60_000);

  test('Order cannot proceed without accepting Terms & Conditions', async ({
    storefront,
    checkout,
    country,
    page,
  }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Checkout',
      story: 'Terms & Conditions validation',
      severity: Severity.NORMAL,
      tags: ['checkout', 'validation', 'negative'],
    });

    await test.step('Add a product and reach the country/terms step', async () => {
      await storefront.addToCart(products.tomato);
      await storefront.openCart();
      await storefront.proceedToCheckout();
      await checkout.placeOrderFromCheckout();
      await expect(page.getByText('Choose Country')).toBeVisible();
    });

    await test.step('Select a country but leave Terms & Conditions unchecked', async () => {
      await country.selectCountry('India');
      await attachScreenshot(page, 'Country selected, terms not accepted');
    });

    await test.step('Attempt to proceed and verify the validation message', async () => {
      await country.proceedOrder();
      await country.expectTermsRequired();
      await attachScreenshot(page, 'Validation message shown');
    });
  });
});
