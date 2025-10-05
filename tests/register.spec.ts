import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pom/register';
import { fieldLengthStrings, invalidCharacterStrings, invalidPasswordsAndErrors } from '../test-data/inputStrings';
type MyFixtures = { registerPage: RegisterPage };

const test = base.extend<MyFixtures>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
})

test.describe('Details page field validation tests', () => {
  test('Ensure page heading and field labels are visible', async ({ registerPage }) => {
    await registerPage.validateHeading();
    await registerPage.validateDetailsTabActive();
    // Confirm all field labels and inputs are visible and no error messages are shown
    await registerPage.confirmYourNameFieldVisible();
    await registerPage.confirmCompanyNameFieldVisible();
    await registerPage.confirmCompanyTypeDropdownVisible();
    await registerPage.whatTypeOfCompanyLabel.isHidden();
    await registerPage.whatTypeOfCompanyInput.isHidden();
    await registerPage.confirmUserEmailFieldVisible();
    await registerPage.confirmPasswordRequirementsHeadingVisible();
    await registerPage.confirmPasswordFieldVisible();
    await registerPage.confirmConfirmPasswordVisible();
    await registerPage.confirmAcceptTandCsVisible();
    await registerPage.confirmLoginHereLinkVisible();
    await registerPage.confirmNextButtonVisible();
  });

  test('Ensure validation triggers on empty mandatory fields', async ({ registerPage }) => {
    // Click Next button without entering any data
    await registerPage.nextButton.click();
    // Confirm validation messages are visible for mandatory fields
    await expect(registerPage.yourNameErrorText).toBeVisible();
    await expect(registerPage.companyNameErrorText).toBeVisible();
    await expect(registerPage.userEmailErrorText).toBeVisible();
    await expect(registerPage.passwordErrorText).toBeVisible();
    await expect(registerPage.confirmPasswordErrorText).toBeVisible();
    await expect(registerPage.acceptTandCsErrorText).toBeVisible();
  });

  // tests that are expected to fail can be marked test.fail for functionality yet to be implemented
  // but could be confusing for this exercise

  // would need to know the exact max length
  test('VALIDATION NOT IMPLEMENTED: Ensure max field length validation of user name', async ({ registerPage }) => {
    // Enter 256 characters in Your Name field and click Next
    await registerPage.yourNameInput.fill(fieldLengthStrings.length256);
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.yourNameInvalidText).toBeVisible();
    // Clear the field and enter 255 characters, then click Next
    await registerPage.yourNameInput.clear();
    await registerPage.yourNameInput.fill(fieldLengthStrings.length255);
    await registerPage.nextButton.click();
    // Confirm no validation message is visible for Your Name field
    await expect(registerPage.yourNameInvalidText).not.toBeVisible();
  });;

  // would need to know the special characters considered invalid
  test('VALIDATION NOT IMPLEMENTED: Ensure special character validation of user name', async ({ registerPage }) => {
    // Enter special characters in Your Name field and click Next
    await registerPage.yourNameInput.fill(invalidCharacterStrings.specialChars);
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.yourNameInvalidText).toBeVisible();
  });

  // would need to know the exact max length 
  test('VALIDATION NOT IMPLEMENTED: Ensure max field length of company name', async ({ registerPage }) => {
    // Enter 256 characters in Your Name field and click Next
    await registerPage.companyNameInput.fill(fieldLengthStrings.length256);
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.companyNameInvalidText).toBeVisible();
    await registerPage.companyNameInput.clear();
    // Enter special characters in Your Name field and click Next
    await registerPage.companyNameInput.fill(invalidCharacterStrings.specialChars);
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.companyNameInvalidText).not.toBeVisible();
  });

  // would need to know the special characters considered invalid
  test('VALIDATION NOT IMPLEMENTED: Ensure special character validation of company name', async ({ registerPage }) => {
    // Enter special characters in Your Name field and click Next
    await registerPage.companyNameInput.fill(invalidCharacterStrings.specialChars);
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.companyNameInvalidText).toBeVisible();
  });

  test('Ensure Company Type dropdown entries are correct and Other displays What type of company field', async ({ registerPage, page }) => {
    // Click Company Type dropdown and confirm all expected options are present
    await registerPage.companyTypeDropdown.click();
    await expect(registerPage.companyTypeOptions).toHaveCount(3);
    await expect(registerPage.companyTypeOptions.nth(0)).toHaveText('Retailer');
    await expect(registerPage.companyTypeOptions.nth(1)).toHaveText('Agency');
    await expect(registerPage.companyTypeOptions.nth(2)).toHaveText('Other');
    // mouse click does not work as expected - resorted to keyboard navigation
    await registerPage.companyTypeDropdown.press('ArrowDown');
    await registerPage.companyTypeDropdown.press('Enter');
    expect(await registerPage.companyTypeDropdown.inputValue()).toBe('agency');
    await registerPage.companyTypeDropdown.click();
    await registerPage.companyTypeDropdown.press('ArrowDown');
    await registerPage.companyTypeDropdown.press('ArrowDown');
    await registerPage.companyTypeDropdown.press('Enter');
    expect(await registerPage.companyTypeDropdown.inputValue()).toBe('other');
    await expect(registerPage.whatTypeOfCompanyLabel).toBeVisible();
    await expect(registerPage.whatTypeOfCompanyInput).toBeVisible();
  });

  // there appear to be additional rules around email format validation that are
  // not documented but did not reach an overall field length limit
  test('NOT IMPLEMENTED: Ensure max field length of user email', async ({ registerPage }) => {
    // Enter 256 characters in Your Name field and click Next
    await registerPage.userEmailInput.fill('a'.repeat(256) + '@test.com');
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.userEmailInvalidText).toBeVisible();
    await registerPage.userEmailInput.clear();
    await registerPage.userEmailInput.fill('a'.repeat(15) + '@test.com');
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.userEmailInvalidText).not.toBeVisible();
  });

  test('Ensure special character validation of user email', async ({ registerPage }) => {
    // Enter special characters in Your Name field and click Next
    await registerPage.userEmailInput.fill(`${invalidCharacterStrings.specialChars}@test.com`);
    await registerPage.nextButton.click();
    // Confirm validation message is visible for Your Name field
    await expect(registerPage.userEmailInvalidText).toBeVisible();
  });

  test('Ensure email validation rules are enforced', async ({ registerPage }) => {
    // Enter invalid email formats and confirm validation message is shown
    const invalidEmails = ['plainaddress', '@missingusername.com', 'username@.com', 'username@com', 'username@domain..com'];
    for (const email of invalidEmails) {
      await registerPage.userEmailInput.fill(email);
      await registerPage.nextButton.click();
      await expect(registerPage.userEmailInvalidText).toBeVisible();
      await registerPage.userEmailInput.clear();
    };
    // Enter a valid email and confirm no validation message is shown
    await registerPage.userEmailInput.fill(`${Date.now()}@testmail.com`);
    await registerPage.nextButton.click();
    await expect(registerPage.userEmailErrorText).not.toBeVisible();
    await expect(registerPage.userEmailInvalidText).not.toBeVisible();
  });

  test('Ensure password complexity rules are enforced', async ({ registerPage, page }) => {
    // Enter passwords that do not meet complexity requirements and confirm validation message is shown
    const invalidPasswords = invalidPasswordsAndErrors;
    for (const item of invalidPasswords) {
      await registerPage.passwordInput.fill(item.password);
      await registerPage.nextButton.click();
      await expect(page.getByText(item.error)).toBeVisible();
      await registerPage.passwordInput.clear();
    };
    // Enter a valid password and confirm no validation message is shown
    await registerPage.passwordInput.fill('Valid1234!');
    await registerPage.nextButton.click();
    await expect(registerPage.passwordErrorText).not.toBeVisible();
    for (const item of invalidPasswords) {
      await expect(page.getByText(item.error)).not.toBeVisible();
    };
  });

  test('Ensure confirm password matching rule is enforced', async ({ registerPage, page }) => {
    // Enter valid password and valid confirm password that do not match
    await registerPage.passwordInput.fill('Valid1234!');
    await registerPage.confirmPasswordInput.fill('Mismatch1!');
    await registerPage.nextButton.click();
    await expect(registerPage.passwordMismatchText).toBeVisible();
    await registerPage.confirmPasswordInput.clear();
    
    // Enter a matching confirm password and ensure no validation message is shown
    await registerPage.confirmPasswordInput.fill('Valid1234!');
    await registerPage.nextButton.click();
    await expect(registerPage.confirmPasswordErrorText).not.toBeVisible();
  });

  test('Ensure navigation to next page is prevented while validation errors exist on any fields', async ({ registerPage }) => {
    // await registerPage.yourNameInput.fill(fieldLengthStrings.length256);
    await registerPage.companyNameInput.fill('Valid company');
    await registerPage.userEmailInput.fill(`${Date.now()}@testmail.com`);
    await registerPage.passwordInput.fill('Valid1234!');
    await registerPage.confirmPasswordInput.fill('Valid1234!');
    await registerPage.acceptTandCsCheckbox.check();
    await registerPage.nextButton.click();
    await registerPage.validateDetailsTabActive();
    await registerPage.yourNameInput.fill('Valid name');
    await registerPage.companyNameInput.clear();
    await registerPage.validateDetailsTabActive();
    await registerPage.companyNameInput.fill('Valid company');
    await registerPage.userEmailInput.clear();
    await registerPage.nextButton.click();
    await registerPage.validateDetailsTabActive();
    await registerPage.userEmailInput.fill(`${Date.now()}@testmail.com`);
    await registerPage.passwordInput.clear();
    await registerPage.nextButton.click();
    await registerPage.validateDetailsTabActive();
    await registerPage.passwordInput.fill('Valid1234!');
    await registerPage.confirmPasswordInput.clear();
    await registerPage.nextButton.click();
    await registerPage.validateDetailsTabActive();
    await registerPage.confirmPasswordInput.fill('Valid1234!');
    await registerPage.acceptTandCsCheckbox.uncheck();
    await registerPage.nextButton.click();
    await registerPage.validateDetailsTabActive();
  });
});

test.describe('Happy path details page form completion', () => {
  test('Ensure user can complete details form and navigate to next page', async ({ registerPage, page }) => {
    // Fill form with valid data for all fields
    await registerPage.yourNameInput.fill('Test User');
    await registerPage.companyNameInput.fill('Test Company');
    await registerPage.companyTypeDropdown.selectOption('Agency');
    await registerPage.userEmailInput.fill(`${Date.now()}@testmail.com`);
    await registerPage.passwordInput.fill('Valid1234!');
    await registerPage.confirmPasswordInput.fill('Valid1234!');
    await registerPage.acceptTandCsCheckbox.check();
    await registerPage.nextButton.click();
    // Confirm navigation to the next page by checking for a unique element on that page
    await expect(page.getByRole('heading', { name: 'Upload feeds' })).toBeVisible();
  });   
});