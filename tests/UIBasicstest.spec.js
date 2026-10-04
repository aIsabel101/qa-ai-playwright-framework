const {test, expect} =require('@playwright/test');
const { text } = require('node:stream/consumers');

test('First Context Playwright test', async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    page.route('**/*.{jpg,png,jpeg}', route=>route.abort());
    const userName=page.locator('#username');
    const signIn=page.locator('#signInBtn');
    const cardTittles=page.locator(".car-body a");
    page.on('request', request=>console.log(request.url()));
    page.on('response', response=>console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css
    await page.locator('#username').fill("AnaSarzosa");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type-fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
   // console.log(cardTittles.first().textContent());
   // console.log(cardTittles.nth(1).textContent());
    const allTittles= await cardTittles.allTextContents();
    console.log(allTittles);
});


test('Second Playwright test', async ({page})=> {
  
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
    
});

test('@Web UI Controls', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName=page.locator('#username');
        const signIn=page.locator('#signInBtn');
        const documentLink=page.locator("[href*='documents-request']");
        const dropdown=page.locator('select.form-control');
        await dropdown.selectOption("consult");
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        await page.locator("#terms").last().click();
        await expect(page.locator("#terms").last()).toBeChecked();
        await page.locator("#terms").uncheck();
        expect (await page.locator("#terms").isChecked().toBeFalsy);
        await expect(documentLink).toHaveAttribute("class", "blinkingText")
       // await page.pause();

    });
test('Child window Context Playwright test', async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();    
    const userName=page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink=page.locator("[href*='documents-request']");

    const [page2]= await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
])
    const text = await page2.locator(".red").textContent();
    const arrayText= text.split("@");
    const domain= arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").type(domain);
    console.log(await page.locator("#username").inputValue());

});