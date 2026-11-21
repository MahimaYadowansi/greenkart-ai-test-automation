// New coverage: exercises CheckoutPage end-to-end so the Allure report has a
// dedicated "Checkout" feature with step-by-step detail (promo, country, terms, order).
import { test, expect } from '../fixtures/test-fixtures';
import { products, promoCodes, countries } from '../utils/test-data';
import { tagTestCase, attachScreenshot, attachValue, Severity } from '../utils/allure-report';

test.describe('Checkout Flow', () => {
  test.setTimeout(60_000);

  test('Customer can apply a promo code and place an order successfully', async ({
    storefront,
    checkout,
    page,
  }) => {
    await tagTestCase({
      epic: 'GreenKart E-Commerce',
      feature: 'Checkout',
      story: 'Happy path order placement',
      severity: Severity.CRITICAL,
      tags: ['checkout', 'promo-code', 'smoke'],
    });

    await test.step('Add a product to the cart and proceed to checkout', async () => {
      await storefront.setQuantity(products.brocolli, 1);
      await storefront.addToCart(products.brocolli);
      await storefront.openCart();
      await storefront.proceedToCheckout();
      await attachScreenshot(page, 'Checkout page opened');
    });

    await test.step('Apply a valid promo code and verify the discount is reflected', async () => {
      await checkout.applyPromoCode(promoCodes.valid);
      await expect(page.getByText('Code applied')).toBeVisible({ timeout: 15_000 });
      await expect(page.getByText(/Discount\s*:\s*10%/)).toBeVisible();
      await attachValue('Promo code used', promoCodes.valid);
      await attachScreenshot(page, 'Discount applied');
    });

    await test.step('Place the order', async () => {
      await checkout.placeOrderFromCheckout();
      await expect(page.getByText('Choose Country')).toBeVisible();
    });

    await test.step('Select a delivery country and accept Terms & Conditions', async () => {
      await checkout.selectCountry(countries.canada);
      await checkout.acceptTerms();
      await attachValue('Delivery country', countries.canada);
    });

    await test.step('Proceed and verify the order confirmation', async () => {
      await checkout.proceedOrder();
      await checkout.expectSuccess();
      await attachScreenshot(page, 'Order confirmation');
    });
  });
});
