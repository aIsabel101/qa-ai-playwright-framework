 Feature: Ecommerce validations
 @Validations
 @foo
  Scenario Outline: Placing the Order
  Given a login to the page Ecommerc2 application with "<username>" and "<password>"
  Then verify Error message is displayed

Examples:
|username|password|
|anshika@gmail.com|Iamking@000|
|rahulshetty@gmail.com|Iamking@000|