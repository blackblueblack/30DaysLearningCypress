Feature: Website Header - Product search field

Header: Verify if autocomplete drop-down list for search input field is selectable

  Scenario: Selecting element from autocomplete drop-down
    Given I open automationpractice site
    When I type product name in search input field
    Then I can click element on autocomplete drop-down
    And I am redirected to product site

  Scenario: Valid and invalid search input
    Given I submit valid or inalid product name
      | product |
      | Dress   |
      | skirt   |
      | XXX123%_@ |
      |  1234567890123456789012345789QWERTYqwertyzxcvbnmlkjhg hhjkkkkkk3456789|
      | ' ' |
