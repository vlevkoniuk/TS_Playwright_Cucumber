@AutomationteststoreSiteTesting
Feature: As a test task I am implementing those 2 stories

    @SearchReturnsResults @debug
    Scenario: automationteststore.com page and try searching smth
        Given automationteststore.com website is opened
        When I am entering search text "eye" in "Skincare" category
        Then Search results should contain items with "eye" entries

    @AbleToShopSomething
    Scenario Outline: Go to the automationteststore.com page and try shopping smth
        Given automationteststore.com website is opened
        When I am selecting "<category>" and "<subcategory>"
        When I am clicking to any available for shopping item
        When I am navigating to the cart
        Then Item should become available in basket
        Examples:
            | category                     | subcategory   |
            | Books                        | Paperback     |
            | Apparel & accessories        | T-shirts     |