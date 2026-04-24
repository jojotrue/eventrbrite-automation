
class HomePage {
  constructor(page) {
    this.page = page;

    // Main Navigation
    this.findEventsLink = page.getByRole('link', { name: 'Find Events' });

    // Search & Location
    this.searchInput = page.getByRole('searchbox', { name: /search events/i });
    this.searchButton = page.getByRole('button', { name: /search button/i });
    this.locationInput = page.getByTestId('header-search').getByRole('combobox', { name: 'autocomplete' });

    // Events Listing Page
    this.eventListingHeading = page.locator('h1').first();

    // Neighborhood Navigation
    this.neighborhoodHeading = page.getByRole('heading', { name: 'Explore by neighborhood' });
    this.neighborhoodTablist = page.getByRole('tablist', { name: 'neighbourhood-tabs' });
    this.neighborhoodTabs = this.neighborhoodTablist.getByRole('tab');

    // Breadcrumb Navigation
    this.breadcrumbNav = page.getByRole('navigation', { name: 'breadcrumbs' });
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async setLocation(location) {
    await this.locationInput.fill(location);
  }

  async clickFindEvents() {
    await this.findEventsLink.click();
  }

  getNeighborhoodTab(name) {
    return this.page.getByRole('tab', { name });
  }

  async getNeighborhoodTabCount() {
    return await this.neighborhoodTabs.count();
  }
}

module.exports = HomePage;
