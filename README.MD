Playwright_Automation_Exercise
# Playwright Automation Exercise

Small suite of Playwright end-to-end tests written in TypeScript.

Author: Damien Snee

## Overview

This repository contains Playwright tests that demonstrate a Page Object Model (POM) structure and the use of fixtures. 

## Prerequisites

- Node.js installed (LTS recommended). Download: https://nodejs.org/
- Git (to clone the repository)

## Getting started

1. Clone the repository:
In a terminal, navigate to a location to clone the project to.

	 `git clone https://github.com/damiensnee75/Playwright_Automation_Exercise.git`
2. Navigate to the root of the project directory (**\Playwright_Automation_Exercise):

	`cd Playwright_Automation_Exercise`

3. Install dependencies:

	`npm install`

## Running tests

- Run all tests (headless):

	`npx playwright test`

- Run tests in headed mode (visible browser):

	`npx playwright test --headed`

- Run a single test file (example):

	`npx playwright test tests/register.spec.ts`

- Open Playwright Test Runner UI for a specific file (interactive):

	`npx playwright test tests/register.spec.ts --ui`

Tests are configured to run on Chrome, Firefox and Webkit browsers. This can be changed in playwright.config.ts.

<ins>**NOTE:**</ins> Tests have been written for validation that has not yet been implemented. These tests currently fail. As these are tests for functionality that has not yet been delivered, they would be expected to fail. In register.spec.ts, these failing tests could be marked test.fail. They would still run but fail, but because they would be expected to fail they would be marked as passed in test results.

## Reporting

This project generates the standard Playwright output report. After running the tests, failures will automatically show the report in a browser. If all tests pass, the report can be seen using this command from the project root: 
`npx playwright show-report`
Video has been configured to be captured and retained in the event of failure. The video is embedded in the output report, on the failed test page.

## Project structure

- `tests/` - test files (example: `register.spec.ts`).
- `pom/` - Page Object Model classes used by tests (each file maps to a page/action set).
- `test-data/` - static test data.
- `test-results/` - captured results and error-context artefacts from previous runs.
- `playwright.config.ts` - Playwright configuration file allowing central control of e.g projects, reporters, browsers, viewports, environments.

Notes on design:
- The project follows the Page Object Model. Page classes encapsulate locators and common interactions. Test files orchestrate page interactions and assertions.

## Hooks and test organisation

The example registration flow uses `test.describe` to group tests by purpose. All tests use a shared fixture: `registerPage`, which is automatically set up and torn down for each test. Using this fixture allows access to all locators and methods on the page object, within the test, by using the `registerPage.` prefix.

## Future improvements

- Expand coverage to the rest of the registration process.
- Give a baseUrl for each environment the tests would be required to run on, in playwright.config.ts. This would allow the environment to be specified from the command line.
- Create scripts in package.json to facilitate easy running in any environment.
- Consider alternative reporting such as allure-playwright.
- Implement automated accessibility testing using Axe for Playwright.
- Consider test tagging to enable flexible execution of tests by their tag, e.g @smoke.

