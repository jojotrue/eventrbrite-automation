
class HomePage {
  constructor(page) {
    this.page = page;

    // Main Navigation
    this.homeLink = page.getByRole('link', { name: /eventbrite/i }).first();
    this.findEventsLink = page.getByRole('link', { name: 'Find Events' });
    this.createEventsLink = page.getByRole('link', { name: 'Create Events' });
    this.helpCenterButton = page.getByRole('button', { name: 'Help Center' });
    this.findMyTicketsLink = page.getByRole('link', { name: 'Find my tickets' });
    this.logInLink = page.getByRole('link', { name: 'Log In' });
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });

    // Search & Location
    this.searchInput = page.getByRole('searchbox', { name: /search events/i });
    this.searchButton = page.getByRole('button', { name: /search button/i });
    this.locationInput = page.getByRole('combobox', { name: /autocomplete|choose a location/i });

    // Category Links - Scoped to icon-category-browse container to avoid strict mode violations
    const categoryContainer = page.getByTestId('icon-category-browse');
    this.musicCategory = categoryContainer.getByRole('link', { name: 'Music' });
    this.nightlifeCategory = categoryContainer.getByRole('link', { name: 'Nightlife' });
    this.performingArtsCategory = categoryContainer.getByRole('link', { name: 'Performing & Visual Arts' });
    this.holidaysCategory = categoryContainer.getByRole('link', { name: 'Holidays' });
    this.datingCategory = categoryContainer.getByRole('link', { name: 'Dating' });
    this.hobbiesCategory = categoryContainer.getByRole('link', { name: 'Hobbies' });
    this.businessCategory = categoryContainer.getByRole('link', { name: 'Business' });
    this.foodDrinkCategory = categoryContainer.getByRole('link', { name: 'Food & Drink' });

    // Events Listing Page - Headings & Neighborhood Navigation
    this.eventListingHeading = page.locator('h1');
    this.neighborhoodTablist = page.getByRole('tablist', { name: 'neighbourhood-tabs' });
    this.neighborhoodTabs = this.neighborhoodTablist.getByRole('tab');

    // Browse Tabs
    this.allTab = page.getByRole('tab', { name: 'All' });
    this.forYouTab = page.getByRole('tab', { name: 'For you' });
    this.todayTab = page.getByRole('tab', { name: 'Today' });
    this.thisWeekendTab = page.getByRole('tab', { name: 'This weekend' });

    // Form Fields - Login Page
    this.emailField = page.getByRole('textbox', { name: /email/i });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.passwordField = page.getByRole('textbox', { name: /password/i });
    this.signInButton = page.getByRole('button', { name: /sign in/i });
    this.showPasswordButton = page.getByRole('button', { name: /show password/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });

    // Error & Alert Messages
    this.alertMessage = page.getByRole('alert');
    this.errorAlert = page.locator('[role="alert"]');

    // Event Results
    this.eventCards = page.locator('li').filter({ has: page.locator('h3') });
    this.eventHeadings = page.locator('h3');

    // Navigation - Breadcrumbs & Category Pages
    this.breadcrumbNav = page.getByRole('navigation', { name: 'breadcrumbs' });
    this.categoryHeading = page.locator('h1, h2');
  }

  // ============================================================================
  // Navigation Methods
  // ============================================================================

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  async goToHomepage() {
    await this.goto('/');
  }

  async clickFindEvents() {
    await this.findEventsLink.click();
  }

  async clickCreateEvents() {
    await this.createEventsLink.click();
  }

  async clickHome() {
    await this.homeLink.click();
  }

  async navigateToLoginPage() {
    await this.logInLink.click();
  }

  // ============================================================================
  // Search Methods
  // ============================================================================

  async searchForEvent(searchTerm, location = null) {
    await this.searchInput.fill(searchTerm);
    if (location) {
      await this.locationInput.fill(location);
    }
    await this.searchButton.click();
  }

  async setLocation(location) {
    await this.locationInput.fill(location);
  }

  // ============================================================================
  // Category Navigation Methods
  // ============================================================================

  // Get a category link by name (dynamic lookup)
  getCategoryLink(categoryName) {
    return this.page.getByRole('link', { name: categoryName });
  }

  async selectCategory(categoryName) {
    const category = this.getCategoryLink(categoryName);
    await category.click();
  }

  async clickMusicCategory() {
    await this.musicCategory.click();
  }

  async clickNightlifeCategory() {
    await this.nightlifeCategory.click();
  }

  async clickArtsCategory() {
    await this.performingArtsCategory.click();
  }

  async clickBusinessCategory() {
    await this.businessCategory.click();
  }

  async clickFoodDrinkCategory() {
    await this.foodDrinkCategory.click();
  }

  // ============================================================================
  // Browse Tab Methods
  // ============================================================================

  async selectAllTab() {
    await this.allTab.click();
  }

  async selectForYouTab() {
    await this.forYouTab.click();
  }

  async selectTodayTab() {
    await this.todayTab.click();
  }

  async selectThisWeekendTab() {
    await this.thisWeekendTab.click();
  }

  // Get a browse tab by name (dynamic lookup)
  getBrowseTab(tabName) {
    return this.page.getByRole('tab', { name: tabName });
  }

  async selectBrowseTab(tabName) {
    const tab = this.getBrowseTab(tabName);
    await tab.click();
  }

  // ============================================================================
  // Neighborhood Navigation Methods
  // ============================================================================

  // Get a neighborhood tab by name (dynamic lookup)
getNeighborhoodTab(name) {
    return this.neighborhoodTablist.getByRole('tab', { name });
  }

  async selectNeighborhood(neighborhood) {
    const tab = this.getNeighborhoodTab(neighborhood);
    await tab.click();
  }

  async getNeighborhoodTabCount() {
    return await this.neighborhoodTabs.count();
  }

  // ============================================================================
  // Form Methods - Login
  // ============================================================================

  async enterEmail(email) {
    await this.emailField.fill(email);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async togglePasswordVisibility() {
    await this.showPasswordButton.click();
  }

  async submitLogin(email, password) {
    await this.enterEmail(email);
    await this.clickContinue();
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  // ============================================================================
  // Utility Methods - Event Lookup
  // ============================================================================

  async getErrorMessage() {
    return await this.errorAlert.textContent();
  }

  async getEventCount() {
    return await this.eventCards.count();
  }

  // Get an event link by name (dynamic lookup)
  getEventByName(eventName) {
    return this.page.getByRole('link', { name: new RegExp(eventName, 'i') });
  }

  async clickEventByName(eventName) {
    const event = this.getEventByName(eventName);
    await event.click();
  }

  // ============================================================================
  // Verification Methods for Navigation & Category Pages
  // ============================================================================

  async verifyBreadcrumbNavVisible() {
    return this.breadcrumbNav;
  }

  async getBreadcrumbLinks() {
    return this.breadcrumbNav.getByRole('link');
  }

  // Get a category heading by name (dynamic lookup)
  getCategoryHeading(categoryName) {
    return this.categoryHeading.filter({ hasText: new RegExp(categoryName, 'i') });
  }

  getEventHeading(index = 0) {
    return this.eventHeadings.nth(index);
  }

  async verifyEventListHasHeadings() {
    return (await this.eventHeadings.count()) > 0;
  }

  // Get a category breadcrumb link by name (dynamic lookup)
  // Falls back to text-only breadcrumb if link not found
  async getCategoryBreadcrumbLink(categoryName) {
    const linkInBreadcrumb = this.breadcrumbNav.getByRole('link', { name: new RegExp(categoryName, 'i') });

    const linkCount = await linkInBreadcrumb.count();
    if (linkCount > 0) {
      return linkInBreadcrumb;
    }

    // Fall back to finding the breadcrumb list item with text content
    return this.breadcrumbNav.locator('li').filter({ hasText: new RegExp(categoryName, 'i') });
  }
}

module.exports = HomePage;
