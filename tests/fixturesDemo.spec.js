const {expect} = require('@playwright/test');
const {customTest} = require('../utils/fixtures.js');

customTest('Fixtures demo', async({authenticatePage, createOrder, testDataForOrder})=>

{
    await authenticatePage.goto("https://rahulshettyacademy.com/client");
    await authenticatePage.locator("button[routerlink*='myorders']").click();
    await authenticatePage.locator("tbody").waitFor();
    //login, creato order , if the order is review history0.
    await expect(authenticatePage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
});