export type TestEnvironment = 'qa' | 'staging' | 'production';

export const environment = {
  name: (process.env.TEST_ENV ?? 'production') as TestEnvironment,
  baseUrl: process.env.BASE_URL ?? 'https://rahulshettyacademy.com/seleniumPractise/#/',
  traceMode: (process.env.TRACE_MODE ?? 'on-first-retry') as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
  screenshotMode: (process.env.SCREENSHOT_MODE ?? 'only-on-failure') as 'off' | 'only-on-failure' | 'on',
  videoMode: (process.env.VIDEO_MODE ?? 'retain-on-failure') as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
  workers: process.env.WORKERS ? Number(process.env.WORKERS) : undefined,
};
