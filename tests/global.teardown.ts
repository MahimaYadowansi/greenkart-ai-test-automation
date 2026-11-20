import { rm } from 'node:fs/promises';

export default async function globalTeardown(): Promise<void> {
  await rm('test-results/.last-run.json', { force: true });
}
