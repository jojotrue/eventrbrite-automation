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

    // Debug: Check URL again after navigation
    console.log('Final URL:', page.url());

    // expect: The location-based event listing is displayed
    await expect(homePage.eventListingHeading).toBeVisible({ timeout: 15000 });

    // Debug: Check what page we're actually on
    console.log('Current URL:', page.url());

    // Step 3: Verify we're on the events page with content loading
    // Check if neighborhood section exists (it may be optional)
    const hasNeighborhoodSection = await homePage.neighborhoodHeading.count() > 0;
    console.log('Has neighborhood section:', hasNeighborhoodSection);
    
    if (hasNeighborhoodSection) {
      // Wait for neighborhood tabs to load
      await expect(homePage.neighborhoodTablist).toBeVisible({ timeout: 10000 });

      // Wait for tabs to be rendered
      await homePage.page.waitForTimeout(2000);

      const tabCount = await homePage.getNeighborhoodTabCount();
      console.log('Neighborhood tab count:', tabCount);
      expect(tabCount).toBeGreaterThan(0);

      // Debug: Log available tabs
      const allTabs = await homePage.neighborhoodTabs.allTextContents();
      console.log('Available tabs:', allTabs);

      // Verify specific neighborhood tabs are present
      const downtownDenverTab = homePage.getNeighborhoodTab('Downtown Denver');
      
      // Verify tab exists before checking visibility
      await expect(downtownDenverTab).toHaveCount(1, { timeout: 10000 });
      await expect(downtownDenverTab).toBeVisible({ timeout: 10000 });
    } else {
      console.log('Neighborhood section not found - page may have different structure');
      // Just verify we have some events showing instead
      await expect(homePage.eventCards.first()).toBeVisible({ timeout: 10000 });
    }
    
    
  });
});
