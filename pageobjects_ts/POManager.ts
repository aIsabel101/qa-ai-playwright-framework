import{LoginPage} from "./LoginPage";
import { DashboardPage } from"./DashboardPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { CartPage } from "./CartPage";
import { Page } from "@playwright/test";

export class POManager
{
    loginPage:LoginPage;
dashboardPage:DashboardPage;
cartPage:CartPage;
ordersReviewPage:OrdersReviewPage;
orderHistoryPage:OrderHistoryPage;
page:Page;

    constructor(page:any)
    {
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
        this.cartPage= new CartPage(this.page);
        this.ordersReviewPage= new OrdersReviewPage(this.page);
        this.orderHistoryPage= new OrderHistoryPage(this.page);
    }
    getLoginPage(){
        return this.loginPage;
    }
    
    getCartPage(){
        return this.cartPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
getOrdersReviewPage(){
    return this.ordersReviewPage;
}
    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
}
module.exports={POManager};