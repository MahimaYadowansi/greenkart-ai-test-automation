import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly promoInput: Locator;
  readonly applyPromo: Locator;
  readonly placeOrder: Locator;

  constructor(page: Page) {
    super(page);
    this.promoInput = page.getByPlaceholder('Enter promo code');
    this.applyPromo = page.getByRole('button', { name: 'Apply' });
    this.placeOrder = page.getByRole('button', { name: 'Place Order' });
  }

  async applyPromoCode(code: string): Promise<void> {
    await this.promoInput.fill(code);
    await this.applyPromo.click();
  }

  async placeOrderFromCheckout(): Promise<void> {
    await this.placeOrder.click();
  }

  async selectCountry(country: string): Promise<void> {
    await this.page.locator('select').selectOption({ label: country });
  }

  async acceptTerms(): Promise<void> {
    await this.page.getByRole('checkbox').check();
  }

  async proceedOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Proceed' }).click();
  }

  async expectSuccess(): Promise<void> {
    await expect(this.page.getByText('Thank you, your order has been placed successfully')).toBeVisible();
  }
}
