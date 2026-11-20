import { test as base, expect } from '@playwright/test';
import { StorefrontPage } from '../pages/storefront.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CountryPage } from '../pages/country.page';
import { TermsPage } from '../pages/terms.page';
import { OffersPage } from '../pages/offers.page';
import { FlightPage } from '../pages/flight.page';

export type TestFixtures = {
  lifecycleCleanup: void;
  storefront: StorefrontPage;
  checkout: CheckoutPage;
  country: CountryPage;
  terms: TermsPage;
  offers: OffersPage;
  flight: FlightPage;
};

export const test = base.extend<TestFixtures>({
  lifecycleCleanup: [async ({ page }, use, testInfo) => {
    await use();

    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: testInfo.outputPath(`failure-${testInfo.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`),
        fullPage: true,
      });
    }
  }, { auto: true }],

  storefront: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL ?? 'https://rahulshettyacademy.com/seleniumPractise/#/');
    await use(new StorefrontPage(page));
  },

  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  country: async ({ page }, use) => {
    await use(new CountryPage(page));
  },

  terms: async ({ page }, use) => {
    await use(new TermsPage(page));
  },

  offers: async ({ page }, use) => {
    await use(new OffersPage(page));
  },

  flight: async ({ page }, use) => {
    await use(new FlightPage(page));
  },
});

export { expect };
