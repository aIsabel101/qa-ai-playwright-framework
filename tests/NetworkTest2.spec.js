const { test, expect } = require('@playwright/test')


test('Security test request intercept ', async ({ page }) => {
  const email = "anshika@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole('button', { name: "Login" }).click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aa487dfe7cd69710f121000' }))
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
  await expect(page.locator("p").last().toHaveText("You are not authorize to view this order"));
})