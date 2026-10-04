import{test as baseTest} from '@playwright/test';

   
       interface testDataForOrder {
    username: string;
    userpassword: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:testDataForOrder}>(
    {
        
        testDataForOrder: {
            username: "anshika@gmail.com",
            userpassword: "Iamking@000",
            productName: "ZARA COAT 3"
        }
    }
)