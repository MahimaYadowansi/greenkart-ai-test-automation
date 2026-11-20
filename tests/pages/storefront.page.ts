import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class StorefrontPage extends BasePage {
  readonly search: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    super(page);
    this.search = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
    this.cart = page.getByRole('link', { name: 'Cart' });
  }

  async open(): Promise<void> {
    await this.goto();
  }

  product(name: string): Locator {
    return this.page.locator('.product').filter({ hasText: name });
  }

  async searchFor(value: string): Promise<void> {
    await this.search.fill(value);
  }

  async clearSearch(): Promise<void> {
    await this.search.fill('');
  }

  async setQuantity(productName: string, quantity: number): Promise<void> {
    await this.product(productName).getByRole('spinbutton').fill(String(quantity));
  }

  async addToCart(productName: string): Promise<void> {
    await this.product(productName).getByRole('button', { name: 'ADD TO CART' }).click();
  }

  async openCart(): Promise<void> {
    await this.cart.click();
  }

  async removeFirstCartItem(): Promise<void> {
    await this.page.getByRole('link', { name: '×' }).first().click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
  }
}
