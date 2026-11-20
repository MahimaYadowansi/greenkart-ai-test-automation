import { mkdir } from 'node:fs/promises';

export default async function globalSetup(): Promise<void> {
  await mkdir('test-results/screenshots', { recursive: true });
  await mkdir('test-results/traces', { recursive: true });
  await mkdir('allure-results', { recursive: true });
}
