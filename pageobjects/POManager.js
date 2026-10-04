const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { CartPage } = require("./CartPage");

class POManager
{
    constructor(page)
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