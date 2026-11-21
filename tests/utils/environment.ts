export type TestEnvironment = 'qa' | 'staging' | 'production';

// Same practice-site URL for every environment today — swap these in once
// real qa/staging endpoints exist. BASE_URL still overrides any of them.
const baseUrlByEnvironment: Record<TestEnvironment, string> = {
  qa: 'https://rahulshettyacademy.com/seleniumPractise/#/',
  staging: 'https://rahulshettyacademy.com/seleniumPractise/#/',
  production: 'https://rahulshettyacademy.com/seleniumPractise/#/',
};

const name = (process.env.TEST_ENV ?? 'production') as TestEnvironment;

export const environment = {
  name,
  baseUrl: process.env.BASE_URL ?? baseUrlByEnvironment[name],
  traceMode: (process.env.TRACE_MODE ?? 'on-first-retry') as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
  screenshotMode: (process.env.SCREENSHOT_MODE ?? 'only-on-failure') as 'off' | 'only-on-failure' | 'on',
  videoMode: (process.env.VIDEO_MODE ?? 'retain-on-failure') as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
  workers: process.env.WORKERS ? Number(process.env.WORKERS) : undefined,
};
