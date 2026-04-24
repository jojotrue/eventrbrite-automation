# Copilot Instructions for Eventbrite Automation

## Project Overview

This is a **Playwright-based end-to-end test automation framework** for [Eventbrite.com](https://www.eventbrite.com). It uses the **Page Object Model (POM)** pattern with custom fixtures and targets Chromium in CI. Tests are authored in JavaScript (CommonJS).

## Tech Stack

- **[Playwright](https://playwright.dev/)** `^1.58` — cross-browser E2E testing
- **JavaScript (CommonJS)** — all source files use `require`/`module.exports`
- **Node.js 20** — minimum version
- **GitHub Actions** — CI via `.github/workflows/playwright.yml`

## Project Structure

```
├── .github/
│   ├── agents/                         # Claude AI agent configs (do not modify)
│   │   ├── playwright-test-generator.agent.md
│   │   ├── playwright-test-healer.agent.md
│   │   └── playwright-test-planner.agent.md
│   ├── copilot-instructions.md         # This file
│   └── workflows/
│       └── playwright.yml              # CI workflow
├── fixtures/
│   └── homePage.fixture.js             # Extends Playwright base test with HomePage POM
├── pages/
│   └── homePage.js                     # Page Object Model for Eventbrite homepage
├── specs/
│   ├── eventbrite.test.plan.md         # Human-readable test plan (source of truth for coverage)
│   └── README.md
├── tests/
│   ├── navigation/                     # Navigation & exploration tests
│   ├── search/                         # Search & location tests
│   └── eventbrite.seed.spec.js         # Minimal seed spec for scaffolding new tests
├── playwright.config.js
└── package.json
```

## Key Design Patterns

### 1. Page Object Model (POM)

All selectors and page interactions live in `pages/homePage.js`. Never hardcode locators inside spec files — always add them to the POM first.

- Use `page.getByRole(...)` and `page.getByTestId(...)` (accessibility-first locators) before falling back to `page.locator(...)`.
- Scope locators to containers (e.g., `page.getByTestId('icon-category-browse')`) to avoid Playwright strict-mode violations when the same element appears multiple times.
- Group locators in the `constructor` and methods in clearly labeled sections (Navigation, Search, Category Navigation, etc.).

```js
// pages/homePage.js pattern
class HomePage {
  constructor(page) {
    this.page = page;
    // locators defined here...
  }
  // methods grouped by feature area
}
module.exports = HomePage;
```

### 2. Custom Fixtures

All spec files import `test` and `expect` from `fixtures/homePage.fixture.js` — never directly from `@playwright/test`.

The fixture auto-initialises `HomePage` and navigates to the homepage before each test.

```js
const { test, expect } = require('../../fixtures/homePage.fixture');
```

### 3. Test File Conventions

- Place new specs under the appropriate subdirectory of `tests/` (`navigation/`, `search/`, etc.).
- Use `.spec.js` extension for all test files.
- Wrap tests in `test.describe(...)` blocks with a meaningful group name.
- Reference the seed spec (`tests/eventbrite.seed.spec.js`) as a minimal starting template.
- Add a comment header referencing the spec and seed file at the top of each spec:

```js
// spec: specs/eventbrite.test.plan.md
// seed: tests/eventbrite.seed.spec.js
```

## Running Tests

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps chromium

# Run all tests
npx playwright test

# Run a specific file
npx playwright test tests/navigation/find-events.spec.js

# Run in headed mode
npx playwright test --headed

# Open the HTML report after a run
npx playwright show-report
```

## Adding New Tests

1. Check `specs/eventbrite.test.plan.md` for the test plan and pick an unimplemented scenario.
2. Add any new selectors or interactions to `pages/homePage.js`.
3. Create a new spec file in the appropriate `tests/` subdirectory using the POM fixture pattern.
4. Run the new spec file to verify it passes locally.

## CI Configuration

- All tests run on every push to `main`/`master` and on every PR.
- CI uses a single Chromium worker (`workers: 1`) with 2 retries.
- HTML reports are uploaded as GitHub Actions artifacts (retained 30 days).
- A pass/fail comment is posted to the PR automatically.

## Code Style

- Use **CommonJS** (`require`/`module.exports`) — not ESM (`import`/`export`) — for all files in `fixtures/`, `pages/`, and `tests/`.
- Keep assertions close to the action being tested.
- Use `await expect(...).toBeVisible()` and similar Playwright assertion helpers rather than manual boolean checks.
- Prefer `page.getByRole(...)` over CSS selectors for resilience.
- Do not use `page.waitForTimeout(...)` unless strictly necessary for flaky third-party page behaviour; prefer `waitFor` or Playwright's auto-waiting assertions instead.
