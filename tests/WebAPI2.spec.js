const {test, expect} =require('@playwright/test');
const { log } = require('node:console');
let webContext;

test.beforeAll(async ({browser})=>
{
  const context = await browser.newContext();
  const page= await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").type("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path: 'state.json'});
  webContext = await browser.newContext({storageState: 'state.json'});
});

test ('Client App login', async ({})=>
{
  const email = "anshika@gmail.com";
  const productName= 'ZARA COAT 3';
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products= await page.locator(".card-body");
  const tittles= await page.locator(".card-body b").allTextContents();
  console.log(tittles);
  const count= await products.count();
  for ( let i =0; i<count; ++i)
  {
     if (await products.nth(i).locator("b").textContent()=== productName)
     {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
     }
  }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").pressSequentially("Bol", {delay:100});
   const dropdown=page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i =0; i<optionsCount; ++i)
   {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " Bolivia")
      {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   await page.locator("button[routerlink*='myorders']").click();
   const rows= page.locator("tbody tr");
   await page.locator("tbody").waitFor();
   for (let i=0; i< await rows.count(); ++i)
   {
      const rowOrderId= await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails= await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
  

});

test ('@API Test case2', async ({})=>
{
  const email = "";
  const productName= 'ZARA COAT 3';
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products= await page.locator(".card-body");
  const tittles= await page.locator(".card-body b").allTextContents();
  console.log(tittles);
  
})