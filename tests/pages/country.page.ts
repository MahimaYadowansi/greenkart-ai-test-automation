import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CountryPage extends BasePage {
  readonly country: Locator;
  readonly terms: Locator;
  readonly proceed: Locator;

  constructor(page: Page) {
    super(page);
    this.country = page.locator('select');
    this.terms = page.getByRole('checkbox');
    this.proceed = page.getByRole('button', { name: 'Proceed' });
  }

  async selectCountry(country: string): Promise<void> {
    await this.country.selectOption({ label: country });
  }

  async acceptTerms(): Promise<void> {
    await this.terms.check();
  }

  async proceedOrder(): Promise<void> {
    await this.proceed.click();
  }

  async expectTermsRequired(): Promise<void> {
    await expect(this.page.getByText('Please accept Terms & Conditions - Required')).toBeVisible();
  }
}
