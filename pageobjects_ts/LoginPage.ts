import { test,expect, Locator, Page } from '@playwright/test';
export class LoginPage {
page:Page;
signInbutton:Locator;
userName:Locator;
userPassword:Locator;

    constructor(page:Page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username:string, userpassword:string) {
        await this.userName.type(username);
        await this.userPassword.type(userpassword);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };