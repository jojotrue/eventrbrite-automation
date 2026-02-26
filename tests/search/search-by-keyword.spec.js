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
    await expect(homePage.eventCards.first()).toBeVisible();

    // 4. Verify the results list contains relevant events
    const eventCards = homePage.eventCards;
    const eventCount = await eventCards.count();
    await expect(eventCount).toBeGreaterThan(0);

    // Verify event card contains text/title
    await expect(homePage.eventCards.first()).toContainText(/./);
  });
});
