import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class TermsPage extends BasePage {
  readonly home: Locator;

  constructor(page: Page) {
    super(page);
    this.home = page.getByRole('link', { name: 'Home' });
  }

  async openTerms(page: Page): Promise<void> {
    await page.getByRole('link', { name: 'Terms & Conditions' }).click();
  }

  async returnHome(): Promise<void> {
    await this.home.click();
  }
}
