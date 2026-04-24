
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

    // Wait for dynamic event content to appear (CI can be slow; poll instead of fixed sleep)
    await expect
      .poll(async () => homePage.eventHeadings.count(), {
        timeout: 20000,
        message: 'Expected at least one event heading to render',
      })
      .toBeGreaterThan(0);
    console.log(`Found ${await homePage.eventHeadings.count()} event headings`);

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
      // Wait for tabs to be rendered (poll instead of fixed sleep)
      await expect
        .poll(async () => homePage.getNeighborhoodTabCount(), {
          timeout: 10000,
          message: 'Expected at least one neighborhood tab to render',
        })
        .toBeGreaterThan(0);

      // Verify specific neighborhood tabs are present
      const northDenverTab = homePage.getNeighborhoodTab('North Denver');
      const colfaxTab = homePage.getNeighborhoodTab('Colfax');
      
      await expect(northDenverTab).toHaveCount(1, { timeout: 10000 });
      await expect(northDenverTab).toBeVisible({ timeout: 10000 });
      
      await expect(colfaxTab).toHaveCount(1, { timeout: 10000 });
      await expect(colfaxTab).toBeVisible({ timeout: 10000 });
    } else {
      console.log('Neighborhood section not found - page may have different structure');
      // Just verify we have some events present (poll for dynamic content)
      await expect
        .poll(async () => homePage.eventHeadings.count(), {
          timeout: 20000,
          message: 'Expected at least one event heading to render in fallback',
        })
        .toBeGreaterThan(0);
      console.log(`Found ${await homePage.eventHeadings.count()} event headings in fallback`);
    }
  });
});
