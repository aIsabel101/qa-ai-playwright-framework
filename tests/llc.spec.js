import {test, expect} from '@playwright/test';
import { timeout } from '../playwright.config';

test('Playwright Special Locators', async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});

test('Playwright Time out by test', async ({page}) =>{
    test.setTimeout(60000);
    const slowExpect=expect.configure({timeout:9000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click(); //10 secs
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //5 sec default timeour fo assertions
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();     
    await page.getByRole("link",{name: 'Shop'}).click({timeout:15000});
    await expect(page.locator(".my-4").first()).toHaveText("Shop")
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    
});