import {test, expect} from '@playwright/test';

test.describe.configure({mode:'serial'});
test('Playwright Special Locators', async ({page}) =>{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 //await page.goBack("http://google.com");
 //await page.goForward("https://rahulshettyacademy.com/AutomationPractice/");
 await expect(page.locator("#displayed-text")).toBeVisible();
 await page.locator("#hide-textbox").click();
 //await page.pause();
 await expect(page.locator("#displayed-text")).toBeHidden();
 page.on('dialog',dialog => dialog.accept());
 await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const iframe= await page.frameLocator("#courses-iframe");
  await iframe.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck=await iframe.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
});
test('Screenshot & Visual comparasion', async ({page}) =>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});
 await page.locator("#hide-textbox").click();
await page.screenshot({path: 'screenshot.png'})
 await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Visual', async ({page}) =>{
  await page.goto("https://www.google.com/");
  expect (await page.screenshot()).toMatchSnapshot('landing.png')
});