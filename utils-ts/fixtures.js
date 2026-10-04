const base = require('@playwright/test');
const { request} = require('@playwright/test');
const { APIUtils } = require('./APIUtils.js');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }]};


exports.customTest = base.test.extend({
        authenticatePage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").type("anshika@gmail.com");
            await page.locator("#userPassword").fill("Iamking@000");
            await page.locator("[value='Login']").click();
            await page.waitForLoadState('networkidle');
            await use(page);
            await context.close();
        },
        createOrder: async ({}, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayLoad);
            const response = await apiUtils.createOrder(orderPayLoad);
            await use(response);
            await apiContext.dispose();
        },
        testDataForOrder:{
            productName: 'ADIDAS ORIGINAL'
        }
    });

    

