const { test, expect } = require('@playwright/test');
const { log } = require('node:console');
function futureDateValue(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date.toISOString().slice(0, 16);
}
test('Create a new brand e2e', async ({ page }) => {
  const email = "ana.sarzosa@eventhub.com";
  const password = "Password1!";
  const BASE_URL = "https://eventhub.rahulshettyacademy.com"
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator('#login-btn').click();
  await expect(page.getByText("Browse Events →")).toBeVisible();
  //Step2
  await page.goto(`${BASE_URL}/admin/events`);

  const eventTitle = `EventHub ${Date.now()}`;

  await page.locator('#event-title-input').fill(eventTitle);
  await page.locator('#admin-event-form textarea');
  await page.getByLabel('City').fill("Bolivia");
  await page.getByLabel('Venue').fill("Sacba");
  await page.getByLabel('Event Date & Time').fill(futureDateValue());
  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats').fill('50');
  await page.locator('#add-event-btn').click();
  await expect(page.getByText("Event Created")).toBeVisible();
  console.log(`Created event: "${eventTitle}"`);
  //Step3
  await page.goto(`${BASE_URL}/events`);
  const cards = await page.getByTestId('event-card');
  await expect(cards.first()).toBeVisible();

  const cardCreated = cards.filter({ hasText: eventTitle }).first();
  await expect(cardCreated).toBeVisible({ timeout: 5000 });

  const seatsBeforeBooking = parseInt(await cardCreated.getByText('seat').first().innerText());
  //Step4
  await cardCreated.getByTestId('book-now-btn').click();
  //Step5
  const ticketCount = page.locator('#ticket-count');
  await expect(ticketCount).toHaveText('1');
  await page.getByLabel('Full Name').fill("Ana test");
  await page.locator('#customer-email').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('+59154545194');
  await page.locator('.confirm-booking-btn').click();
  //Step6
  const bookingRefElement = await page.locator('.booking-ref').first();
  await expect(bookingRefElement).toBeVisible();

  const bookingReference = (await bookingRefElement.innerText()).trim();
  expect(bookingReference.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());
  console.log(`Booking confirmed. Ref: ${bookingReference}`);
  //Step7
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  const allBooking = await page.locator('#booking-card')
  await expect(allBooking.first()).toBeVisible();
  const bookingCard = allBooking.filter({ has: page.locator('.booking-ref', { hasText: bookingReference }) });
  await expect(bookingCard).toBeVisible();
  await expect(bookingCard).toContainText(eventTitle);
  //Step8
  await page.goto(`${BASE_URL}/events`);
  await expect(cards.first()).toBeVisible();
  const cardUpdated = cards.filter({ hasText: eventTitle }).first();
  await expect(cardUpdated).toBeVisible();
  const seatsAfterBooking = parseInt(await cardUpdated.getByText('seat').first().innerText());
  console.log(`Seats after booking: ${seatsAfterBooking}`);
  await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
///ALT+shift+F
///Shift+Alt+A Toggle block comment
});

