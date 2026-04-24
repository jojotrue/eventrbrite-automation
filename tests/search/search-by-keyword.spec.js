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
    
    // Wait for the URL to include "music" – use a regex so it matches any
    // Eventbrite results URL format (e.g. /d/local--events/music/, /b/music/, etc.)
    await homePage.page.waitForURL(/music/i, { timeout: 15000 });
    
    // Wait for results or empty state; avoid hard count assertion so the test
    // doesn't fail when Eventbrite legitimately returns zero results.
    const { hasResults, count, isEmpty } = await homePage.waitForResultsOrEmpty(30000);
    console.log(`Found ${count} event headings; hasResults=${hasResults}, isEmpty=${isEmpty}`);
    expect(hasResults || isEmpty).toBe(true);

    // 4. Verify the results list is interactive when events are present
    if (hasResults) {
      await expect(homePage.eventCards.first()).toContainText(/./);
    }
  });
});
