// spec: specs/eventbrite.test.plan.md
// seed: tests/eventbrite.seed.spec.js

const { test, expect } = require('../../fixtures/homePage.fixture');

test.describe('Search & Location Functionality', () => {
  test('Search for events by keyword', async ({ homePage }) => {
    // 1. User is on the Eventbrite homepage
    const searchInput = homePage.searchInput;
    await expect(searchInput).toBeVisible();

    // 2. Click on the search input and type a keyword (e.g., 'music')
    await searchInput.click();
    await searchInput.fill('music');
    await expect(searchInput).toHaveValue('music');

    // 3. Click the search button or press Enter
    await homePage.searchButton.click();
    
    // Wait for results to load
    await homePage.page.waitForURL('**/music/**', { timeout: 15000 });
    await homePage.page.waitForLoadState('domcontentloaded');
    
    // Poll until at least one event heading appears (dynamic content; avoid fixed sleep)
    await expect
      .poll(async () => homePage.eventHeadings.count(), {
        timeout: 20000,
        message: 'Expected at least one event heading to render',
      })
      .toBeGreaterThan(0);
    console.log(`Found ${await homePage.eventHeadings.count()} event headings`);

    // 4. Verify the results list contains relevant events
    // Poll for event containers (avoids incorrect await expect(number) pattern)
    await expect
      .poll(async () => homePage.eventContainers.count(), {
        timeout: 20000,
        message: 'Expected at least one event container to render',
      })
      .toBeGreaterThan(0);

    // Verify event card contains text/title
    await expect(homePage.eventCards.first()).toContainText(/./);
  });
});
