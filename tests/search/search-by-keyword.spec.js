// spec: specs/eventbrite.test.plan.md
// seed: tests/eventbrite.seed.spec.js

const { test, expect } = require('../../fixtures/homePage.fixture');

test.describe('Search & Location Functionality', () => {
  test('Search for events by keyword', async ({ homePage }) => {
    // 1. User is on the Eventbrite homepage
    await expect(homePage.searchInput).toBeVisible();

    // 2. Type a keyword into the search input
    await homePage.searchInput.click();
    await homePage.searchInput.fill('music');
    await expect(homePage.searchInput).toHaveValue('music');

    // 3. Submit the search
    await homePage.searchButton.click();

    // 4. Verify URL navigated to a music results page
    await expect(homePage.page).toHaveURL(/music/, { timeout: 15000 });

    // 5. Verify a page heading is visible
    await expect(homePage.eventListingHeading).toBeVisible({ timeout: 10000 });

    // 6. Verify breadcrumb navigation if present (Eventbrite may omit it in some variants)
    const breadcrumbCount = await homePage.breadcrumbNav.count();
    if (breadcrumbCount > 0) {
      await expect(homePage.breadcrumbNav).toBeVisible({ timeout: 10000 });
      const breadcrumbLinks = homePage.breadcrumbNav.getByRole('link');
      expect(await breadcrumbLinks.count()).toBeGreaterThan(0);
    }

    // 7. Verify the search input still contains the keyword
    await expect(homePage.searchInput).toHaveValue('music');
  });
});
