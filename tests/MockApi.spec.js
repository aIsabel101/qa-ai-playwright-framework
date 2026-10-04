const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';
const YAHOO_USER = {
    email: 'student@example.com',
    password: 'secret123'
};
const GMAIL_USER = {
    email: 'ana@eventhub.com',
    password: 'Password1!'
};

async function login(page, user) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder("you@email.com").fill(user.email);
    await page.getByLabel("Password").fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.goto(`${BASE_URL}/events`);
};
test('Gmail user is denied when yahoo user is boking', async ({ page, request }) => {

    const loginReq = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: YAHOO_USER.email,
            password: YAHOO_USER.password
        }
    });
    expect(loginReq.ok()).toBeTruthy();
    const { token } = await loginReq.json();

    //step2
    const events = await request.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    expect(events.ok()).toBeTruthy();
    const eventsData = await events.json();
    const eventId = eventsData.data[0].id;

    //Step3
    const createBooking = await request.post(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
            eventId,
            customerName: 'test',
            customerEmail: YAHOO_USER.email,
            customerPhone: '+591-9876543210',
            quantity: 1
        }
    });
    expect(createBooking.ok()).toBeTruthy();
    const yahooBookingId = (await createBooking.json()).data.id;
    console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);
    ///Step4 Call your loginAs(page, GMAIL_USER) helper
    await login(page, GMAIL_USER);
    //Step5  Navigate to Yahoo's booking URL as Gmail user
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });
    //STep6 Validate Access Denied
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

});



