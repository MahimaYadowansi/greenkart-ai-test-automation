import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class OffersPage extends BasePage {
  readonly search: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    super(page);
    this.search = page.getByRole('searchbox');
    this.table = page.getByRole('table');
  }

  async openFrom(page: Page): Promise<OffersPage> {
    const popup = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Top Deals' }).click();
    const newPage = await popup;
    await newPage.waitForLoadState('domcontentloaded');
    return new OffersPage(newPage);
  }

  async searchDeals(value: string): Promise<void> {
    await this.search.fill(value);
  }
}
