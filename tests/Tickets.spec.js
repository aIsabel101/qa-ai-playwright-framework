const { test, expect, request } = require('@playwright/test');
const { log } = require('node:console');
const { timeout } = require('../playwright.config');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const email = "ana.sarzosa@eventhub.com";
const password = "Password1!";

async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}
test('Single ticket booking is eligible for refund', async ({ page }) => {

  await login(page);
  await page.goto(`${BASE_URL}/events`);
  await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  await page.getByLabel('Full Name').fill('Aa Test');
  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('+59177775555');
  await page.locator('.confirm-booking-btn').click();
  await page.pause;
  ///NAvigate to booking detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();
  //Step4
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const evenTittle = await page.locator('h1').innerText();
  await expect(bookingRef.charAt(0)).toBe(evenTittle.charAt(0));
  //Step5
  await page.locator('#check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
  await page.locator('#refund-result').click();
  //Step6
  const result = await page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Eligible for refund');
  await expect(result).toContainText('Single-ticket bookings qualify for a full refund');

});
test('Group ticket booking is NOT eligible for refund', async ({ page }) => {
  await login(page);
  await page.goto(`${BASE_URL}/events`);

  await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();
  await page.getByLabel('Full Name').fill('Group Test');
  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('+59177775555');
  await page.locator('.confirm-booking-btn').click();

  ///NAvigate to booking detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();
  //Step4
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const evenTittle = await page.locator('h1').innerText();
  await expect(bookingRef.charAt(0)).toBe(evenTittle.charAt(0));
  await page.getByText('button:has-test("View Details")');
  const refund = await page.locator('#check-refund-btn').click();
  const resultRefund = await page.locator('#refund-result')
  await expect(resultRefund).toContainText("Not eligible for refund.");
  await expect(resultRefund).toContainText('Group bookings (3 tickets) are non-refundable');
})

