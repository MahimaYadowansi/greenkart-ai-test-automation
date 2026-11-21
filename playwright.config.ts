
import { defineConfig, devices } from '@playwright/test';
import { environment } from './tests/utils/environment';
import * as os from 'node:os';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,

  
  /* Fail the build on CI if you accidentally left test.only in the source code. */

  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : environment.workers,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['html', {
    outputFolder: 'playwright-report',
    open: 'never',
  }],
  [
    'allure-playwright',
    {
      resultsDir: 'allure-results',

      detail: true,

      suiteTitle: true,

      environmentInfo: {
        Project: 'Playwright Automation Project',
        Application: 'E-Commerce Application-GreenKart',
        Environment: process.env.TEST_ENV || 'QA',
        Base_URL: environment.baseUrl,

        Automation_Tool: 'Playwright',
        Programming_Language: 'TypeScript',
        Framework: 'Playwright Test',

        Browser: 'Chromium',
        Operating_System: os.platform(),
        OS_Version: os.release(),

        Node_Version: process.version,
        Architecture: os.arch(),

        Execution_Type: process.env.CI
          ? 'CI/CD Pipeline'
          : 'Local Execution',

        Build_Number: process.env.BUILD_NUMBER || 'Local-Build-001',
        QA_Team: 'QA Automation Team',
      },

      globalLabels: [
        { name: 'project', value: 'Playwright Automation' },
        { name: 'team', value: 'QA Automation' },
        { name: 'framework', value: 'Playwright' },
        { name: 'language', value: 'TypeScript' },
      ],

      links: {
        issue: {
          nameTemplate: 'Jira Issue #%s',
          urlTemplate: 'https://your-company.atlassian.net/browse/%s',
        },
        tms: {
          nameTemplate: 'Test Case #%s',
          urlTemplate: 'https://your-tms-tool.com/cases/%s',
        },
      },

      categories: [
        {
          name: 'Product Defects',
          messageRegex: '.*Expected.*received.*',
          matchedStatuses: ['failed'],
        },
        {
          name: 'Automation Issues',
          messageRegex: '(?i).*(timeout|strict mode violation).*',
          matchedStatuses: ['failed', 'broken'],
        },
        {
          name: 'Environment Issues',
          messageRegex: '.*(ECONNREFUSED|ENOTFOUND).*',
          matchedStatuses: ['failed', 'broken'],
        },
        {
          name: 'Assertion Failures',
          messageRegex: '.*AssertionError.*',
          matchedStatuses: ['failed'],
        },
      ],
    },
  ]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. Set via TEST_ENV=qa|staging|production or override with BASE_URL. */
    baseURL: environment.baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: environment.traceMode,
    screenshot: environment.screenshotMode,
    video: environment.videoMode,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
