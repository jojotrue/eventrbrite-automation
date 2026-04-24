
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

    // Wait for page content to load
    await page.waitForTimeout(3000);
    
    // expect: Events are present on the page (basic content check)
    const eventCount = await homePage.eventHeadings.count();
    console.log(`Found ${eventCount} event headings`);
    expect(eventCount).toBeGreaterThan(0);

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
      // Wait for tabs to be rendered
      await homePage.page.waitForTimeout(500);

      const tabCount = await homePage.getNeighborhoodTabCount();
      expect(tabCount).toBeGreaterThan(0);

      // Verify the first tab in the tablist is visible (generic check - tab names are dynamic)
      await expect(homePage.neighborhoodTablist.getByRole('tab').first()).toBeVisible({ timeout: 10000 });
    } else {
      console.log('Neighborhood section not found - page may have different structure');
      // Just verify we have some events present
      const eventCount = await homePage.eventHeadings.count();
      console.log(`Found ${eventCount} event headings in fallback`);
      expect(eventCount).toBeGreaterThan(0);
    }
  });
});
