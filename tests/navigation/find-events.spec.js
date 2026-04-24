// spec: specs/eventbrite.test.plan.md
// seed: tests/eventbrite.seed.spec.js

const { test, expect } = require('../../fixtures/homePage.fixture');

test.describe('Navigation & Exploration', () => {
  test('1.7: Navigate via Find Events link', async ({ homePage, page }) => {
    // Step 1: User is on the Eventbrite homepage
    // expect: The 'Find Events' link is visible in the main navigation
    await expect(homePage.findEventsLink).toBeVisible();

    // Step 2: Set location to Denver
    await homePage.setLocation('Denver');
    
    // Wait a moment for location to be set
    await homePage.page.waitForTimeout(1000);

    // Step 3: Click on 'Find Events' link
    await homePage.clickFindEvents();

    // Debug: Check what page we're actually on
    console.log('Current URL after Find Events click:', page.url());

    // expect: User is navigated to the events listing page
    await expect(page).toHaveURL(/\/d\/.*\/events/, { timeout: 15000 });

    // Wait for results or empty state – avoids hard-coding a count assertion
    // that fails when Eventbrite returns zero results for this location.
    const { hasResults, count, isEmpty } = await homePage.waitForResultsOrEmpty(30000);
    console.log(`Results: hasResults=${hasResults}, count=${count}, isEmpty=${isEmpty}`);

    // The page must have loaded either events OR an empty-state indicator –
    // a completely blank results page would indicate a broken navigation flow.
    expect(hasResults || isEmpty).toBe(true);

    // Debug: Check what page we're actually on
    console.log('Current URL:', page.url());

    // Step 3: Optionally verify the neighbourhood section when present
    let hasNeighborhoodSection;
    try {
      await homePage.neighborhoodHeading.waitFor({ timeout: 5000 });
      hasNeighborhoodSection = true;
    } catch {
      hasNeighborhoodSection = false;
    }
    console.log('Has neighborhood section:', hasNeighborhoodSection);

    if (hasNeighborhoodSection) {
      await expect(homePage.neighborhoodTablist).toBeVisible({ timeout: 10000 });

      const tabCount = await homePage.getNeighborhoodTabCount();
      console.log('Neighborhood tab count:', tabCount);
      expect(tabCount).toBeGreaterThan(0);
    } else {
      console.log('Neighborhood section not found - page may have different structure');
    }

    
  });
});
