# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPO.spec.js >> @Web Client App Login for Adidas Originals
- Location: tests\ClientAppPO.spec.js:13:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | class CartPage {
  3  |     constructor(page) {
  4  |       this.page = page;
  5  |     this.cartProducts = page.locator("div li").first();
  6  |     this.productsText = page.locator(".card-body b");
  7  |     this.cart =  page.locator("[routerlink*='cart']");
  8  |     this.orders = page.locator("button[routerlink*='myorders']");
  9  |     this.checkoutButton = page.locator("text=Checkout");
  10 |         
  11 |     }
  12 |     async verifyProductIsDisplayed(productName) {
> 13 |         await this.cartProducts.waitFor();
     |                                 ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  14 |     const bool =await this.getProductLocator(productName).isVisible();
  15 |     expect(bool).toBeTruthy();
  16 |     }
  17 |     async checkout() {
  18 |         await this.checkoutButton.click();
  19 |     }
  20 |     getProductLocator(productName) {
  21 |         return  this.page.locator("h3:has-text('"+productName+"')");
  22 |     }
  23 | }
  24 | module.exports = {CartPage};
```