# Eventbrite Test Automation Framework

![Playwright Tests](https://github.com/jojotrue/eventbrite-automation/actions/workflows/playwright.yml/badge.svg)

A Playwright-based end-to-end test automation framework for [Eventbrite.com](https://www.eventbrite.com), built using the Page Object Model (POM) pattern with custom fixtures. This project covers navigation, search, and event discovery workflows, with additional test coverage actively being added.

> **Note:** This framework was developed using an AI-assisted authoring workflow powered by Claude Playwright agents — a deliberate choice to demonstrate modern QA engineering practices that leverage AI tooling for faster, higher-quality test generation.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Design Patterns](#key-design-patterns)
  - [Page Object Model](#page-object-model)
  - [Custom Fixtures](#custom-fixtures)
- [Test Coverage](#test-coverage)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Roadmap](#roadmap)

---

## Tech Stack

- **[Playwright](https://playwright.dev/)** — cross-browser end-to-end testing
- **JavaScript (CommonJS / ESM)** — test and page object authoring
- **HTML Reporter** — built-in Playwright HTML test reports
- **Trace Viewer** — automatic trace capture on first retry for debugging

---

## Project Structure

```
eventbrite/
├── .github/
│   └── agents/                        # Claude AI agent configs
│       ├── playwright-test-generator.agent.md
│       ├── playwright-test-healer.agent.md
│       └── playwright-test-planner.agent.md
├── fixtures/
│   └── homePage.fixture.js            # Custom Playwright fixture (extends base test)
├── pages/
│   └── homePage.js                    # Page Object Model for the Eventbrite homepage
├── specs/
│   ├── eventbrite.test.plan.md        # Human-readable test plan
│   └── README.md
├── tests/
│   ├── navigation/
│   │   ├── find-events.spec.js
│   │   └── music-category.spec.js
│   ├── search/
│   │   └── search-by-keyword.spec.js
│   └── eventbrite.seed.spec.js        # Seed spec for scaffolding new tests
├── playwright.config.js
├── package.json
└── .gitignore
```

---

## Key Design Patterns

### Page Object Model

The `HomePage` class in `pages/homePage.js` encapsulates all selectors and interactions for the Eventbrite homepage and its downstream pages (search results, category pages, login). This keeps test logic clean and selectors centralized — changes to the UI only require updates in one place.

The POM covers:

- **Main navigation** — Find Events, Create Events, Log In, Sign Up, Help Center
- **Search & location** — keyword search input, location combobox, search submission
- **Category browsing** — Music, Nightlife, Performing Arts, Food & Drink, Business, and more — scoped to the `icon-category-browse` container to avoid strict mode violations
- **Browse tabs** — All, For You, Today, This Weekend
- **Neighborhood navigation** — tablist-based neighborhood filtering with dynamic tab count support
- **Event results** — event card locators, heading counts, event lookup by name
- **Login form** — email, password, continue/sign-in flow, password visibility toggle, error alerts
- **Breadcrumb navigation** — with graceful fallback for text-only (non-link) breadcrumb items

```js
// Example: Using the POM in a test
const { test, expect } = require('../fixtures/homePage.fixture');

test('user can search for a music event', async ({ homePage, page }) => {
  await homePage.searchForEvent('jazz festival', 'New York');
  await expect(page).toHaveURL(/search/);
});
```

### Custom Fixtures

`fixtures/homePage.fixture.js` extends Playwright's base `test` object to automatically instantiate the `HomePage` POM and navigate to the homepage before each test. This eliminates boilerplate setup from every spec file and ensures a consistent starting state.

```js
const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto('/');
    await use(homePage);
  }
});
```

All spec files import from the fixture instead of `@playwright/test` directly, giving every test immediate access to the fully initialized page object.

---

## Test Coverage

| Area | Tests |
|---|---|
| Navigation | Find Events link, category navigation (Music, etc.) |
| Search | Keyword search, search results validation |
| Event Discovery | Category pages, breadcrumbs, event card listings |
| *(Planned)* | Additional categories, neighborhood filtering, login flows |

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/eventbrite-automation.git
cd eventbrite-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/navigation/find-events.spec.js

# Run tests with the HTML reporter open after the run
npx playwright test --reporter=html

# Open the last HTML report
npx playwright show-report

# Run in headed mode (watch the browser)
npx playwright test --headed

# Run in UI mode (interactive test explorer)
npx playwright test --ui
```

---

## Configuration

Configuration lives in `playwright.config.js`. Key settings:

| Setting | Value |
|---|---|
| Base URL | `https://www.eventbrite.com/` |
| Browser | Chromium (Desktop Chrome) |
| Parallelism | Fully parallel locally; single worker on CI |
| Retries | 0 locally; 2 on CI |
| Trace | Captured on first retry |
| Reporter | HTML |

Firefox and WebKit projects are scaffolded and commented out — ready to enable for cross-browser coverage.

---

## AI-Assisted Authoring

This framework uses a three-agent Claude workflow for test development:

| Agent | Role |
|---|---|
| `playwright-test-planner` | Analyzes features and generates a structured test plan |
| `playwright-test-generator` | Authors spec files from the plan using the existing POM and fixtures |
| `playwright-test-healer` | Detects and repairs broken selectors or flaky tests |

This workflow accelerates test authoring while keeping the engineer in control of architecture, patterns, and review. The agents operate within the conventions established by the POM and fixture layer — they don't replace engineering judgment, they amplify it.

---

## CI/CD

Tests run automatically on every pull request to `main` via GitHub Actions.

The workflow:
1. Installs Node.js 20 and dependencies via `npm ci`
2. Installs Chromium with system dependencies
3. Runs the full Playwright test suite
4. Uploads the HTML report as a downloadable artifact (retained 30 days)
5. Posts a pass/fail comment directly to the PR with a link to the report
6. Fails the build if any tests fail

The workflow file lives at `.github/workflows/playwright.yml`.

---

## Roadmap

- [ ] Expand navigation test coverage across all category pages
- [ ] Add neighborhood tab filtering tests
- [ ] Add login flow tests (valid, invalid credentials, error states)
- [ ] Enable Firefox and WebKit cross-browser projects
- [x] Integrate GitHub Actions CI workflow
- [ ] Add visual regression testing

---

## Author

Built by [jojotrue](https://github.com/jojotrue) — QA Engineer  

