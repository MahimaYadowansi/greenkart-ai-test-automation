# GreenKart Test Automation (Built with Playwright Agents)

This project contains automated tests for the **GreenKart** shopping website
(`https://rahulshettyacademy.com/seleniumPractise/#/`). It covers the product
catalog, cart, checkout, country/terms validation, top deals, and more.

What makes this project special: the tests were not written by hand one by
one. They were created using **Playwright's AI agents** — a planner, a
generator, and a healer — working together inside this editor.

---

## How this project was built (using Playwright Agents)

Playwright now ships with three special AI agents that can explore a website
and write real test code for it. All three agents run on the
**Claude Sonnet 4.6** model and talk to the site through the
**Playwright Test MCP server** (`npx playwright run-test-mcp-server`,
configured in [.vscode/mcp.json](.vscode/mcp.json)). Their job descriptions
live in [.github/agents](.github/agents).

### 1. Planner (`playwright-test-planner`)
This agent opens the website itself, clicks around, and explores every page
(catalog, cart, checkout, top deals, flight booking, terms page, etc.). Based
on what it sees, it writes a **test plan** — a plain-English list of test
scenarios, including normal cases and tricky edge cases (empty cart, invalid
promo code, boundary quantities, etc.).

The plan it produced is saved here:
[specs/selenium-practise-test-plan.md](specs/selenium-practise-test-plan.md)

### 2. Generator (`playwright-test-generator`)
This agent reads one scenario at a time from the test plan and actually
**performs the steps in a real browser** (clicking, typing, checking text) to
make sure the steps work. Once it confirms the steps work, it converts them
into a real Playwright test file (`.spec.ts`) and saves it under the
[tests/](tests) folder.

This is why the test files read like a clear story — each line of code has a
comment above it taken straight from the test plan step.

### 3. Healer (`playwright-test-healer`)
Tests can break over time (a button text changes, timing changes, etc.). The
healer agent runs the test suite, finds any test that fails, opens the
browser again to see what actually happened, figures out why it broke, and
**edits the test code to fix it** — then reruns it to confirm the fix worked.
If a test genuinely cannot be fixed, it is marked `test.fixme()` with a
comment explaining why, instead of being deleted.

**In short:** Planner explores and plans → Generator builds working tests →
Healer keeps them passing. This planner/generator/healer loop is what let one
person produce a large, reliable test suite quickly, instead of writing and
re-writing every test by hand.

---

## What each file/folder contains

```
├── .github/agents/                 Job descriptions for the 3 Playwright agents
├── .vscode/mcp.json                 Connects this editor to the Playwright Test MCP server
├── specs/
│   ├── README.md                    Note saying this folder is for test plans
│   └── selenium-practise-test-plan.md   The full test plan written by the Planner agent
├── tests/
│   ├── seed.spec.ts                 Empty starting point used as a base/seed for new tests
│   ├── global.setup.ts              Creates folders needed for screenshots/traces/allure results
│   ├── global.teardown.ts           Cleans up a leftover file after the run finishes
│   ├── fixtures/
│   │   └── test-fixtures.ts         Shared test setup: opens the site, creates Page Object
│   │                                instances, and auto-takes a screenshot if a test fails
│   ├── pages/                       Page Object Model — one file per page of the site
│   │   ├── base.page.ts             Shared helpers (go to a page, check URL, screenshot)
│   │   ├── storefront.page.ts       The main product/catalog + cart page
│   │   ├── checkout.page.ts         Cart review + promo code + place order page
│   │   ├── country.page.ts          Country selection step during checkout
│   │   ├── terms.page.ts            Terms and Conditions page
│   │   ├── offers.page.ts           "Top Deals" page (table, pagination, sorting)
│   │   └── flight.page.ts           Flight Booking page (linked from the header)
│   ├── utils/
│   │   ├── test-data.ts             Reusable product names, promo codes, countries
│   │   ├── assertions.ts            Reusable checks (e.g. "cart is empty", "no page overflow")
│   │   └── environment.ts           Reads environment variables (base URL, trace/video modes)
│   ├── config/
│   │   ├── test-env.qa.ts           Settings for the QA environment
│   │   ├── test-env.staging.ts      Settings for the Staging environment
│   │   └── test-env.production.ts   Settings for the Production environment
│   └── catalog/                     Generated test specs for catalog & cart scenarios
│       ├── catalog-search-edge.spec.ts        Search box edge cases
│       ├── cart-quantity-boundaries.spec.ts   Quantity +/- limits, duplicate add-to-cart clicks
│       ├── cart-mixed-removal.spec.ts         Adding multiple items and removing them all
│       ├── responsive-catalog.spec.ts         Behaviour at desktop/tablet/mobile widths
│       ├── catalog-keyboard.spec.ts           Keyboard-only navigation and accessibility
│       └── catalog-race.spec.ts               Rapid clicking / browser back-forward stability
├── playwright.config.ts             Main Playwright configuration (see below)
├── package.json                     Project scripts and dependencies
├── allure-results/ & allure-report/ Raw and generated Allure test reports
└── playwright-report/               Generated Playwright HTML report
```

---

## How parallel execution is achieved

Playwright can run many tests at the same time using multiple **workers**
(separate browser processes), instead of running one test after another.

In [playwright.config.ts](playwright.config.ts):
- `fullyParallel: true` — every test file, and every test inside a file, is
  allowed to run in parallel with the others.
- `workers: process.env.CI ? 1 : undefined` — on a normal machine, Playwright
  automatically picks the number of workers based on your CPU cores (full
  parallel speed). On a CI server, it is limited to 1 worker at a time to keep
  CI runs stable and predictable.

Because each test uses its own fresh browser page (via the `storefront`,
`checkout`, etc. fixtures) and doesn't share state with other tests, they are
safe to run side-by-side without interfering with each other.

---

## Reporting

Two kinds of reports are generated after every test run:

1. **Playwright HTML Report** — a built-in report with pass/fail status,
   screenshots on failure, and traces you can step through.
   - Config: `['html', { open: 'Always' }]` in `playwright.config.ts`
   - Output folder: [playwright-report/](playwright-report)
   - Open it with: `npx playwright show-report`

2. **Allure Report** — a more detailed, graphical report with history,
   trends, categories of failures, and attachments.
   - Config: `['allure-playwright', { open: 'Always' }]` in `playwright.config.ts`
   - Raw results: [allure-results/](allure-results)
   - Generated report: [allure-report/](allure-report)
   - Generate it with: `npm run allure:generate`
   - Open it with: `npm run allure:open`

On top of these, `trace: 'retain-on-failure-and-retries'` and
`screenshot: 'only-on-failure'` are turned on, so every failing test also
keeps a step-by-step trace and a screenshot for debugging — without slowing
down or bloating the report for tests that pass.

---

## Model used

All three Playwright agents (Planner, Generator, Healer) are configured to
run on **Claude Sonnet 4.6**, as set in the `model:` field of each agent file
inside [.github/agents](.github/agents).

---

## Running the tests

```bash
# install dependencies
npm install

# run all tests
npm test

# generate and open the Allure report
npm run allure:generate
npm run allure:open
```
