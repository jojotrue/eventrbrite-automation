# Eventbrite Homepage Comprehensive Test Plan

## Application Overview

This test plan covers comprehensive testing of the Eventbrite.com homepage, including navigation functionality, search capabilities, filtering options, custom event browsing, and form validation for error handling. Tests focus on user interactions like searching for events, filtering by category and location, navigating between sections, and validating error messages. This excludes login/signup account creation to avoid external site spam.

## Test Scenarios

### 1. Navigation & Exploration

**Seed:** `tests/eventbrite.seed.spec.js`

#### 1.1. Navigate to Music category from homepage

**File:** `tests/navigation/music-category.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The homepage loads successfully with category listing visible
  2. Click on the 'Music' category link
    - expect: User is navigated to the Music events page
    - expect: The page title or heading indicates 'Music Events'
    - expect: Events related to music are displayed in the results
  3. Verify the breadcrumb navigation shows the correct path
    - expect: Breadcrumb shows: Home > Music or similar navigation trail

#### 1.2. Navigate to Nightlife category

**File:** `tests/navigation/nightlife-category.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The homepage loads successfully
  2. Click on the 'Nightlife' category link
    - expect: User is navigated to Nightlife events page
    - expect: Nightlife-related events are displayed
  3. Verify that the category filter reflects the selection
    - expect: The current category is visually indicated as active or selected

#### 1.3. Navigate to Performing & Visual Arts category

**File:** `tests/navigation/arts-category.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The homepage is fully loaded
  2. Click on 'Performing & Visual Arts' category
    - expect: User navigates to arts events page
    - expect: Arts and cultural events are displayed in the listing
  3. Verify the page has returned event results
    - expect: At least one event is visible in the results area

#### 1.4. Navigate to Business category

**File:** `tests/navigation/business-category.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: Homepage is loaded with all categories visible
  2. Click on 'Business' category
    - expect: User is taken to Business events page
    - expect: Business-related events are shown
  3. Verify the page heading or title reflects Business category
    - expect: Page title or main heading contains 'Business' or similar term

#### 1.5. Navigate to Food & Drink category

**File:** `tests/navigation/food-drink-category.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: All categories are visible on the page
  2. Click on 'Food & Drink' category link
    - expect: User navigates to Food & Drink events page
    - expect: Food and drink-related events are displayed
  3. Verify results list is populated with events
    - expect: Multiple events are visible with event titles, dates, and locations

#### 1.6. Click Eventbrite logo to return home

**File:** `tests/navigation/logo-navigation.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The Eventbrite logo is visible in the top-left of the header
  2. Click on the Eventbrite logo
    - expect: User remains on or is redirected to the homepage
    - expect: The page URL is the Eventbrite homepage

#### 1.7. Navigate via Find Events link

**File:** `tests/navigation/find-events.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The 'Find Events' link is visible in the main navigation
  2. Click on 'Find Events' link
    - expect: User is navigated to the events listing page
    - expect: The location-based event listing is displayed
  3. Verify the page displays browsing options by neighborhood
    - expect: Neighborhood tabs or filters are present (e.g., Downtown Denver, North Denver)

### 2. Search & Location Functionality

**Seed:** `tests/eventbrite.seed.spec.js`

#### 2.1. Search for events by keyword

**File:** `tests/search/search-by-keyword.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The search input field is visible at the top of the page
  2. Click on the search input and type a keyword (e.g., 'music')
    - expect: The text 'music' is entered into the search field
  3. Click the search button or press Enter
    - expect: The page navigates to search results
    - expect: Events matching the keyword 'music' are displayed
  4. Verify the results list contains relevant events
    - expect: Event titles contain or relate to the searched keyword
    - expect: At least one event is visible in the results

#### 2.2. Search with location change

**File:** `tests/search/search-with-location.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The location selector dropdown shows the current location (e.g., Denver)
  2. Click on the location selector and change to a different city (e.g., 'New York' or 'Austin')
    - expect: The location dropdown opens with city options
    - expect: A new city is selectable from the list
  3. Select the new location
    - expect: The location field updates to show the new city
  4. Enter a search keyword and click search
    - expect: Results are displayed for events in the new location
    - expect: The event locations shown match the selected city

#### 2.3. Search with empty keyword field

**File:** `tests/search/search-empty.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The search input field is visible and empty
  2. Ensure both search keyword and location are set (location has default)
    - expect: The search field is empty
    - expect: The location field has a default location like 'Denver'
  3. Click the search button without entering a keyword
    - expect: The page either shows all events for that location or displays an error message
    - expect: Navigation occurs or results are shown based on location alone

#### 2.4. Search field accepts multiple characters

**File:** `tests/search/search-multiple-chars.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage
    - expect: The search input is focused and ready for input
  2. Type a multi-word search term (e.g., 'rock concert festival')
    - expect: All typed characters are visible in the search field
    - expect: No characters are truncated or lost
  3. Click search
    - expect: Results matching the full search phrase are attempted
    - expect: The application handles multi-word searches appropriately

#### 2.5. Autocomplete location suggestions

**File:** `tests/search/location-autocomplete.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage and clicks the location field
    - expect: The location field is active and ready for input
  2. Type partial city name (e.g., 'San')
    - expect: Autocomplete suggestions appear showing matching cities like 'San Francisco', 'San Diego', etc.
  3. Select a suggested city from the dropdown
    - expect: The location field is updated with the selected city
    - expect: The selection is confirmed

### 3. Filtering & Browsing Options

**Seed:** `tests/eventbrite.seed.spec.js`

#### 3.1. Browse events by All tab

**File:** `tests/filtering/browse-all-tab.spec.ts`

**Steps:**
  1. User is on the events listing page
    - expect: Multiple browsing tabs are visible (All, For you, Today, This weekend)
  2. Verify the 'All' tab is selected by default or click it
    - expect: The 'All' tab is highlighted or marked as active
    - expect: All events in the location are displayed
  3. Verify events are listed without category filters applied
    - expect: Mixed event types are visible (music, nightlife, arts, food, etc.)

#### 3.2. Browse events by For You tab

**File:** `tests/filtering/browse-for-you-tab.spec.ts`

**Steps:**
  1. User is on the events listing page with browsing tabs visible
    - expect: The 'For you' tab is available
  2. Click on the 'For you' tab
    - expect: The tab becomes active/highlighted
    - expect: Events are filtered based on personalized recommendations (if logged in) or default recommendations (if not)
  3. Verify event list updates to show personalized or curated events
    - expect: Different events may be displayed compared to the 'All' tab

#### 3.3. Browse events by Today tab

**File:** `tests/filtering/browse-today-tab.spec.ts`

**Steps:**
  1. User is on the events listing page
    - expect: The browsing tabs are visible
  2. Click on the 'Today' tab
    - expect: The 'Today' tab becomes active
    - expect: Events happening today in the selected location are displayed
  3. Verify all events have today's date in their schedule
    - expect: Each event shows a date matching the current date
    - expect: Times are displayed for each event

#### 3.4. Browse events by This Weekend tab

**File:** `tests/filtering/browse-weekend-tab.spec.ts`

**Steps:**
  1. User is on the events listing page
    - expect: The browsing tabs are visible
  2. Click on 'This weekend' tab
    - expect: The tab becomes active
    - expect: Events scheduled for the coming weekend are displayed
  3. Verify events are limited to weekend dates
    - expect: All events shown have dates falling on Saturday or Sunday
    - expect: The event dates are within the upcoming weekend range

#### 3.5. Explore by neighborhood tabs

**File:** `tests/filtering/neighborhood-tabs.spec.ts`

**Steps:**
  1. User is on the 'Find Events' page or events listing page for a city
    - expect: Neighborhood tabs are visible (e.g., Downtown Denver, North Denver, Colfax)
  2. Click on a different neighborhood tab (e.g., 'North Denver')
    - expect: The tab becomes active/selected
    - expect: Events in that neighborhood are displayed
  3. Verify the events location matches the selected neighborhood
    - expect: Event venue names or addresses reflect the chosen neighborhood

#### 3.6. Category cards display and interact

**File:** `tests/filtering/category-cards.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage showing category cards
    - expect: Multiple category card links are visible (Music, Nightlife, Arts, etc.)
    - expect: Each card has an image and category name
  2. Hover over a category card
    - expect: The card may show hover effects (shadow, scale, opacity change)
  3. Click on any category card
    - expect: User is navigated to the category-specific events listing
    - expect: Events for that category are displayed

### 4. Form Validation & Error Handling

**Seed:** `tests/eventbrite.seed.spec.js`

#### 4.1. Login form - missing email validation error

**File:** `tests/validation/login-missing-email.spec.ts`

**Steps:**
  1. User navigates to the Eventbrite login page via Log In button
    - expect: The login form is displayed with an Email input field
    - expect: The Email field is empty and focused
  2. Click the 'Continue' button without entering an email address
    - expect: The form does NOT submit
    - expect: An error message appears below or near the Email field
  3. Verify the error message text
    - expect: The error message clearly states 'Please enter an email to proceed' or similar validation message
    - expect: The message is displayed in an alert or error state style
  4. Verify the email field is still focused or highlighted with an error state
    - expect: The input field is visually marked as having an error (red border, background, or icon)

#### 4.2. Login form - missing password validation error

**File:** `tests/validation/login-missing-password.spec.ts`

**Steps:**
  1. User navigates to the login page and enters a valid email (e.g., 'test@example.com')
    - expect: The Email field contains a valid email address
  2. Click 'Continue' button
    - expect: The page advances to the password entry step
  3. On the password entry page, click 'Sign in' without entering a password
    - expect: The form submission is prevented
    - expect: An error or validation message appears
  4. Verify the password field shows an error state or message
    - expect: The password field is highlighted with an error indicator
    - expect: An error message is displayed, such as 'Password is required' or similar
  5. Verify the user is not logged in and remains on the password page
    - expect: Page URL does not change to a logged-in dashboard
    - expect: The password field remains visible and empty or with user's input

#### 4.3. Search with invalid characters handling

**File:** `tests/validation/search-special-characters.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage with the search field visible
    - expect: The search input field is accessible and empty
  2. Enter special characters or symbols in the search field (e.g., '@#$%^&*()')
    - expect: The special characters are typed into the search field
  3. Click the search button
    - expect: The application either escapes special characters and searches, or displays no results
    - expect: The application does not crash or show an error (graceful handling)
  4. Verify the application handles the search gracefully
    - expect: Results are displayed or a 'no results' message appears
    - expect: No JavaScript errors occur

#### 4.4. Location field with empty input handling

**File:** `tests/validation/location-empty.spec.ts`

**Steps:**
  1. User is on the Eventbrite homepage with the location field visible
    - expect: The location field shows a default location or is empty
  2. Clear the location field completely by selecting all and deleting
    - expect: The location field is now empty
  3. Click in the search field and enter a keyword, then click search
    - expect: The application either uses a default location or shows results globally
    - expect: No error message blocks the user from searching

#### 4.5. Form field radio button or checkbox behavior

**File:** `tests/validation/form-field-interactions.spec.ts`

**Steps:**
  1. User is on a page with any form elements (e.g., reCAPTCHA on login, checkboxes, radio buttons if present)
    - expect: Interactive form elements are visible and accessible
  2. Interact with checkboxes or radio buttons by clicking on them
    - expect: The element becomes checked/selected when clicked
    - expect: The visual state updates to show the selection
  3. Click again to deselect if applicable
    - expect: The element becomes unchecked/deselected
    - expect: The visual state updates appropriately
