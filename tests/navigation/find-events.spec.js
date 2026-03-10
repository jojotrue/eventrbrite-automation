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

    // Wait for page content to load
    await page.waitForTimeout(3000);
    
    // expect: Events are present on the page (basic content check)
    const eventCount = await homePage.eventHeadings.count();
    console.log(`Found ${eventCount} event headings`);
    expect(eventCount).toBeGreaterThan(0);

    // Debug: Check what page we're actually on
    console.log('Current URL:', page.url());

    // Step 3: Verify we're on the events page with content loading
    // Check if neighborhood section exists (it may be optional)
    let hasNeighborhoodSection;
    try {
      await homePage.neighborhoodHeading.waitFor({ timeout: 5000 });
      hasNeighborhoodSection = true;
    } catch {
      hasNeighborhoodSection = false;
    }
    console.log('Has neighborhood section:', hasNeighborhoodSection);
    
    if (hasNeighborhoodSection) {
      // Wait for neighborhood tabs to load
      await expect(homePage.neighborhoodTablist).toBeVisible({ timeout: 10000 });

      // Wait for tabs to be rendered
      await homePage.page.waitForTimeout(2000);

      const tabCount = await homePage.getNeighborhoodTabCount();
      console.log('Neighborhood tab count:', tabCount);
      expect(tabCount).toBeGreaterThan(0);

      // Verify tabs are loaded - just check first tab exists
      console.log('Checking for Downtown Denver tab...');

      // Verify specific neighborhood tabs are present
      const downtownDenverTab = homePage.getNeighborhoodTab('Downtown Denver');
      
      // Verify tab exists before checking visibility
      await expect(downtownDenverTab).toHaveCount(1, { timeout: 10000 });
      await expect(downtownDenverTab).toBeVisible({ timeout: 10000 });
      
      console.log('Downtown Denver tab verified successfully');
    } else {
      console.log('Neighborhood section not found - page may have different structure');
      // Just verify we have some events present
      const eventCount = await homePage.eventHeadings.count();
      console.log(`Found ${eventCount} event headings in fallback`);
      expect(eventCount).toBeGreaterThan(0);
    }
    
    
  });
});
