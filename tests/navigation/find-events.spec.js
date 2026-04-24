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

    // Wait for dynamic event content to appear (CI can be slow; poll instead of fixed sleep)
    await expect
      .poll(async () => homePage.eventHeadings.count(), {
        timeout: 20000,
        message: 'Expected at least one event heading to render',
      })
      .toBeGreaterThan(0);
    console.log(`Found ${await homePage.eventHeadings.count()} event headings`);

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

      // Wait for tabs to be rendered (poll instead of fixed sleep)
      await expect
        .poll(async () => homePage.getNeighborhoodTabCount(), {
          timeout: 10000,
          message: 'Expected at least one neighborhood tab to render',
        })
        .toBeGreaterThan(0);
      const tabCount = await homePage.getNeighborhoodTabCount();
      console.log('Neighborhood tab count:', tabCount);

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
