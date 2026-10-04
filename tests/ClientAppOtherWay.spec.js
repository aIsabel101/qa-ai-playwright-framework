const {test, expect} =require('@playwright/test');
const { log } = require('node:console');

test.skip('First Academy', async ({page})=>
{
  const productName= 'ZARA COAT 3';
  const products= page.locator(".card-body");
  const email= "anshika@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole('button', {name:"Login"}).click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  
  await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name:"Add to Cart"}).click();
  await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button", {name:"Checkout"}).click();
   await page.getByPlaceholder("Select Country").pressSequentially("bol");
   await page.getByRole("button", {name:"Bolivia"}).click();
   await page.getByText("PLACE ORDER").click();

   await expect(page.getByText(" Thankyou for the order. ")).toBeVisible;  
} );


test('Second Playwright test', async ({page})=> {
  
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
    
});
