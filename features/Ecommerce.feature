Feature: Ecommerce validations
    @Regression
    Scenario: Placing the Order
        Given a login to the page Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "ZARA COAT 3" to Cart
        Then Verify that "ZARA COAT 3" is displayed in the Cart
        When Enter valid and place the order
        Then verify order is present on orderHistory

    @Validations
    Scenario Outline: Placing the Order
        Given a login to the page Ecommerc2 application with "<username>" and "<password>"
        Then verify Error message is displayed
        Examples:
            | username              | password    |
            | anshika@gmail.com     | Iamking@000 |
            | rahulshetty@gmail.com | Iamking@000 |