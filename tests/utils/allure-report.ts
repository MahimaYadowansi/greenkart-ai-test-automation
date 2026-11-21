import * as allure from 'allure-js-commons';
import { ContentType, Severity } from 'allure-js-commons';
import type { Page } from '@playwright/test';

export { allure, ContentType, Severity };

/**
 * Standard labels so every test case is filterable by epic/feature/story/severity
 * in the Allure "Behaviors" and "Categories" views.
 */
export async function tagTestCase(meta: {
  epic: string;
  feature: string;
  story: string;
  severity?: Severity;
  owner?: string;
  tags?: string[];
}): Promise<void> {
  await allure.epic(meta.epic);
  await allure.feature(meta.feature);
  await allure.story(meta.story);
  await allure.severity(meta.severity ?? Severity.NORMAL);
  await allure.owner(meta.owner ?? 'QA Automation Team');
  if (meta.tags?.length) {
    await allure.tags(...meta.tags);
  }
}

export async function attachScreenshot(page: Page, name: string): Promise<void> {
  const buffer = await page.screenshot({ fullPage: true });
  await allure.attachment(name, buffer, ContentType.PNG);
}

export async function attachValue(name: string, value: string): Promise<void> {
  await allure.attachment(name, value, ContentType.TEXT);
}

export async function attachJson(name: string, data: unknown): Promise<void> {
  await allure.attachment(name, JSON.stringify(data, null, 2), ContentType.JSON);
}

export async function attachPageUrl(page: Page, label = 'Current URL'): Promise<void> {
  await attachValue(label, page.url());
}
