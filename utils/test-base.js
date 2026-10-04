const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "anshika@gmail.com",
            userpassword: "Iamking@000",
            productName: "ZARA COAT 3"
        }
    }
)