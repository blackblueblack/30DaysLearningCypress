Feature: Website Header - Product search field 

  Header: Verify if autocomplete drop-down list for search input field is selectable
  
  Scenario: Selecting element from autocomplete drop-down
    Given I open practiceautomation site
    When I type product name in search input field
    Then I can click element on autocomplete drop-down
    And I am redirected to procut site 
    