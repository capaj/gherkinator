Feature: test feature from https://github.com/CalviContinousDelivery/NewAutoTests/blob/db7f9fb04da47f890ddde260bea6cdf2ca6531f2/UnitTestProject1/MyFeature.feature

  @Category1
  Scenario Outline: Add two numbers
    Given Enter <Number1> and <Number2>
    When Click on Add button
    Then result is <Result>

  Examples:
    | Number1 | Number2 | Result |
    | 6       | 2       | 8      |

  @Category1
  Scenario Outline: Subtract two numbers
    Given Enter <Number1> and <Number2>
    When Click on Subtract button
    Then result is <Result>

  Examples:
    | Number1 | Number2 | Result |
    | 6       | 2       | 4      |


  @Category2
  Scenario Outline: Multipy two numbers
    Given Enter <Number1> and <Number2>
    When Click on Multiply button
    Then result is <Result>

  Examples:
    | Number1 | Number2 | Result  |
    | 6       | 2       | 12      |