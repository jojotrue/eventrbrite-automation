
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
    // expect: Neighborhood tabs or filters are present (e.g., Downtown Denver, North Denver)
    await expect(homePage.neighborhoodTablist).toBeVisible({ timeout: 10000 });

    // Wait for tabs to be rendered
    await homePage.page.waitForTimeout(500);

    const tabCount = await homePage.getNeighborhoodTabCount();
    expect(tabCount).toBeGreaterThan(0);

    // Verify specific neighborhood tabs are present
    const downtownDenverTab = await homePage.getNeighborhoodTab('Downtown Denver');
    const northDenverTab = await homePage.getNeighborhoodTab('North Denver');
    
    // Verify tab exists before checking visibility
    await expect(downtownDenverTab).toHaveCount(1, { timeout: 10000 });
    await expect(downtownDenverTab).toBeVisible({ timeout: 10000 });
    
    await expect(northDenverTab).toHaveCount(1, { timeout: 10000 });
    await expect(northDenverTab).toBeVisible({ timeout: 10000 });
  });
});
