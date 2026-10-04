const {expect} = require('@playwright/test');
const {customtest} = require('../utils/authenticatedPage.js');

customtest("Assignment - Test Fixtures", async ({authenticatedPage, createEvent}) => {
    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(authenticatedPage.getByText(createEvent.title)).toBeVisible();

});
