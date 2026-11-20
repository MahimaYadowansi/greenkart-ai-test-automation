import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class FlightPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openFrom(page: Page): Promise<FlightPage> {
    const popup = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Flight Booking' }).click();
    const newPage = await popup;
    await newPage.waitForLoadState('domcontentloaded');
    return new FlightPage(newPage);
  }
}
