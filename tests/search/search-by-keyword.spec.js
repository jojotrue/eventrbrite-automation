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

    // 5. Verify the page h1 heading reflects the music search/category
    await expect(homePage.eventListingHeading).toBeVisible({ timeout: 10000 });
    await expect(homePage.eventListingHeading).toContainText(/music/i);

    // 6. Verify breadcrumb navigation is present and shows a path
    await expect(homePage.breadcrumbNav).toBeVisible({ timeout: 10000 });
    const breadcrumbLinks = homePage.breadcrumbNav.getByRole('link');
    const breadcrumbCount = await breadcrumbLinks.count();
    expect(breadcrumbCount).toBeGreaterThan(0);

    // 7. Verify the search input still contains the keyword
    await expect(homePage.searchInput).toHaveValue('music');
  });
});
