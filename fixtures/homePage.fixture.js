
const { test: base, expect } = require('@playwright/test');
const HomePage = require("../pages/homePage.js");

const test = base.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto('/');
        await use(homePage);
    }
});

module.exports = { test, expect };