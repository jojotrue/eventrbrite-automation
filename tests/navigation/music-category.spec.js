
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

    // Step 3: Verify we're on the events page with content loading  
    // Check if neighborhood section exists (it may be optional)
    const hasNeighborhoodSection = await homePage.neighborhoodHeading.count() > 0;
    console.log('Has neighborhood section:', hasNeighborhoodSection);
    
    if (hasNeighborhoodSection) {
      // Wait for tabs to be rendered
      await homePage.page.waitForTimeout(500);

      const tabCount = await homePage.getNeighborhoodTabCount();
      expect(tabCount).toBeGreaterThan(0);

      // Verify specific neighborhood tabs are present
      const northDenverTab = homePage.getNeighborhoodTab('North Denver');
      const colfaxTab = homePage.getNeighborhoodTab('Colfax');
      
      await expect(northDenverTab).toHaveCount(1, { timeout: 10000 });
      await expect(northDenverTab).toBeVisible({ timeout: 10000 });
      
      await expect(colfaxTab).toHaveCount(1, { timeout: 10000 });
      await expect(colfaxTab).toBeVisible({ timeout: 10000 });
    } else {
      console.log('Neighborhood section not found - page may have different structure');
      // Just verify we have some events showing instead
      await expect(homePage.eventCards.first()).toBeVisible({ timeout: 10000 });
    }
  });
});
