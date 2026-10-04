const base = require('@playwright/test');
const { request } = require('@playwright/test');
const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com';
const credentials = { email: "ana@eventhub.com", password: "Password1!" };


exports.customtest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(LOGIN_URL);
        await page.getByPlaceholder("you@email.com").fill(credentials.email);
        await page.getByLabel("Password").fill(credentials.password);
        await page.locator('#login-btn').click();
        await page.waitForLoadState('networkidle');
        await use(page);
        await context.close();
    },

    createEvent: async ({}, use) => {
        const apiContext = await request.newContext({ baseURL: API_URL });
        const loginResponse = await apiContext.post('/api/auth/login', { data: credentials });
        const loginBo = await loginResponse.json();
        const token = loginBo.token;
        const eventPayload = {

            title: `Automation Test Event ${Date.now()}`,
            description: 'A premier technology conference.',
            category: 'Conference',
            venue: 'Bangalore International Centre',
            city: 'Bangalore',
            eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            price: 1500,
            totalSeats: 500,
            imageUrl: 'https://example.com/banner.jpg',
        };
        const createResponse= await apiContext.post('/api/events', {
            data: eventPayload,
            headers: {Authorization: `Bearer ${token}`},
        });
        const body = await createResponse.json();
        const event = body.data;
        await use(event);
        await apiContext.delete(`/api/events/${event.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        await apiContext.dispose();
    },
});