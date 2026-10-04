const { test, expect } = require('@playwright/test');
const { log } = require('node:console');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { POManager } = require('../pageobjects/POManager');
const { CartPage } = require('../pageobjects/CartPage');
const {customtest}= require('../utils/test-base');
//Json->Sring->Js object
const dataSet= JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

for(const data of dataSet)
{
test(`@Web Client App Login for ${data.productName}`, async ({ page }) => {
  const poManager = new POManager(page);

  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.userpassword);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(data.productName);
  await cartPage.checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("Bol", "Bolivia");
  const orderId = await ordersReviewPage.submitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToOrders();
  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();


});
}
customtest(`@Web Client App Login123 `, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);

  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.userpassword);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("Bol", "Bolivia");
  const orderId = await ordersReviewPage.submitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToOrders();
  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();


});



