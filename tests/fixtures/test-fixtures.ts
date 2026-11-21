import { test as base, expect } from '@playwright/test';
import { environment } from '../utils/environment';
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
      const screenshotPath = testInfo.outputPath(`failure-${testInfo.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Also surface the failure screenshot and the failing URL directly on the
      // Allure test case, not just as a file under test-results/.
      await testInfo.attach('Failure screenshot', { path: screenshotPath, contentType: 'image/png' });
      await testInfo.attach('Failure URL', { body: page.url(), contentType: 'text/plain' });
    }
  }, { auto: true }],

  storefront: async ({ page }, use) => {
    await page.goto(environment.baseUrl);
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
