// spec: specs/eventbrite.test.plan.md
// seed: tests/eventbrite.seed.spec.js

const { test, expect } = require('../../fixtures/homePage.fixture');

test.describe('Navigation & Exploration', () => {
  test('1.7: Navigate via Find Events link', async ({ homePage, page }) => {
    // Step 1: User is on the Eventbrite homepage
    // expect: The 'Find Events' link is visible in the main navigation
    await expect(homePage.findEventsLink).toBeVisible();

    // Step 2: Click on 'Find Events' link
    await homePage.clickFindEvents();

    // expect: User is navigated to the events listing page
    await expect(page).toHaveURL(/\/d\/.*\/events/);

    // expect: The location-based event listing is displayed
    await expect(homePage.eventListingHeading).toBeVisible();

    // Step 3: Verify the page displays browsing options by neighborhood
    // expect: Neighborhood section heading is visible
    await expect(homePage.neighborhoodSectionHeading).toBeVisible({ timeout: 15000 });

    // expect: Neighborhood tablist is visible and populated
    await expect(homePage.neighborhoodTablist).toBeVisible({ timeout: 15000 });

    // Wait for tabs to be rendered
    await homePage.page.waitForTimeout(500);

    const tabCount = await homePage.getNeighborhoodTabCount();
    expect(tabCount).toBeGreaterThan(0);

    // Verify specific neighborhood tabs are present
    const fivePointsTab = homePage.getNeighborhoodTab('Five Points');
    const applewoodTab = homePage.getNeighborhoodTab('Applewood');

    await expect(fivePointsTab).toHaveCount(1, { timeout: 15000 });
    await expect(fivePointsTab).toBeVisible({ timeout: 15000 });

    await expect(applewoodTab).toHaveCount(1, { timeout: 15000 });
    await expect(applewoodTab).toBeVisible({ timeout: 15000 });
  });
});
