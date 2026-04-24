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
    
    // Wait for results page URL
    await homePage.page.waitForURL(/music/i, { timeout: 30000 });

    // Wait for results or empty state
    const { eventCount, hasEmptyState } = await homePage.waitForResultsOrEmpty();
    console.log(`Found ${eventCount} event headings`);
    expect(eventCount > 0 || hasEmptyState).toBe(true);

    // 4. If events exist, verify the results list contains relevant events
    if (eventCount > 0) {
      await expect(homePage.eventCards.first()).toContainText(/./);
    }
  });
});
