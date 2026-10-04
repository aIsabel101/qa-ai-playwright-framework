class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, userpassword) {
        await this.userName.type(username);
        await this.userPassword.type(userpassword);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };