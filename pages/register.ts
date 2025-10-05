import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly url: string;
    readonly heading: Locator;
    readonly detailsTabHeading: Locator;
    readonly yourNameLabel: Locator;
    readonly yourNameInput: Locator;
    readonly yourNameErrorText: Locator;
    readonly yourNameInvalidText: Locator;
    readonly companyNameLabel: Locator;
    readonly companyNameInput: Locator;
    readonly companyNameErrorText: Locator;
    readonly companyNameInvalidText: Locator;
    readonly companyTypeLabel: Locator;
    readonly companyTypeDropdown: Locator;
    readonly companyTypeOptions: Locator;
    readonly whatTypeOfCompanyLabel: Locator;
    readonly whatTypeOfCompanyInput: Locator;
    readonly whatTypeOfCompanyErrorText: Locator;
    readonly userEmailLabel: Locator;
    readonly userEmailInput: Locator;
    readonly userEmailErrorText: Locator;
    readonly userEmailInvalidText: Locator;
    readonly passwordRequirementsHeading: Locator;
    readonly passwordLabel: Locator;
    readonly passwordInput: Locator;
    readonly passwordErrorText: Locator;
    readonly confirmPasswordLabel: Locator;
    readonly confirmPasswordInput: Locator;
    readonly confirmPasswordErrorText: Locator;
    readonly acceptTandCsLabel: Locator;
    readonly acceptTandCsCheckbox: Locator;
    readonly acceptTandCsErrorText: Locator;
    readonly loginHereLink: Locator;
    readonly nextButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.url = 'https://shoptimised.co/register';

        this.heading = page.getByRole('heading', { name: 'Register for Shoptimised...' });
        this.detailsTabHeading = page.getByText('Enter your details below', { exact: true });
        //Your Name locators
        this.yourNameLabel = page.getByText('Your Name: * Required');
        this.yourNameInput = page.getByRole('textbox', { name: 'Your Name: * Required' });
        this.yourNameErrorText = page.getByText('Your Name is required');
        this.yourNameInvalidText = page.getByText('XXXXXXXX');  // placeholder for any future invalid text
        //Company Name locators
        this.companyNameLabel = page.getByText('Company Name: * Required');
        this.companyNameInput = page.getByRole('textbox', { name: 'Company Name: * Required' });
        this.companyNameErrorText = page.getByText('Company Name is required');
        this.companyNameInvalidText = page.getByText('XXXXXXXX');  // placeholder for any future invalid text
        //Company Type locators
        this.companyTypeLabel = page.getByText('Company Type:');
        this.companyTypeDropdown = page.locator('#userCompanyType');
        this.companyTypeOptions = this.companyTypeDropdown.getByRole('option');
        //What type of company locators
        this.whatTypeOfCompanyLabel = page.getByText('What type of Company are you?');
        this.whatTypeOfCompanyInput = page.locator('#userCompanyTypeOther');
        this.whatTypeOfCompanyErrorText = page.getByText('Please add some information about your Company');
        //User Email locators
        this.userEmailLabel = page.getByText('User Email: * Required');
        this.userEmailInput = page.getByRole('textbox', { name: 'User Email: * Required' });
        this.userEmailErrorText = page.getByText('Email Address is incorrect or missing');
        this.userEmailInvalidText = page.getByText('Email Address is invalid');
        //Password locators
        this.passwordRequirementsHeading = page.getByRole('heading', { name: 'Password Requirements' });
        this.passwordLabel = page.getByText('Password: * Required', { exact: true });
        this.passwordInput = page.getByRole('textbox', { name: 'Password: * Required', exact: true });
        this.passwordErrorText = page.getByText('Password is Required');
        //Confirm Password locators
        this.confirmPasswordLabel = page.getByText('Confirm Password: * Required');
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password: * Required' });
        this.confirmPasswordErrorText = page.getByText('Password Confirmation is Required');
        //Accept T&Cs locators
        this.acceptTandCsLabel = page.getByText('I accept the Terms &');
        this.acceptTandCsCheckbox = page.getByText('I accept the Terms &').getByRole('checkbox');
        this.acceptTandCsErrorText = page.getByText('Terms and Conditions must be accepted before proceeding');
        
        this.loginHereLink = page.getByRole('link', { name: 'here' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
    }
  
    async goto() {
        await this.page.goto(this.url);
    }

    async validateHeading() {
        await expect(this.heading).toBeVisible();
    }

    async validateDetailsTabActive() {
        await expect(this.detailsTabHeading).toBeVisible();
    }
    
    async confirmYourNameFieldVisible() { 
        await expect(this.yourNameLabel).toBeVisible();
        await expect(this.yourNameInput).toBeVisible();
        await expect(this.yourNameErrorText).not.toBeVisible();
    }

    async confirmCompanyNameFieldVisible() {
        await expect(this.companyNameLabel).toBeVisible();
        await expect(this.companyNameInput).toBeVisible();
        await expect(this.companyNameErrorText).not.toBeVisible();
    }

    async confirmCompanyTypeDropdownVisible() {
        await expect(this.companyTypeLabel).toBeVisible();
        await expect(this.companyTypeDropdown).toBeVisible();
    }

    async confirmUserEmailFieldVisible() {
        await expect(this.userEmailLabel).toBeVisible();
        await expect(this.userEmailInput).toBeVisible();
        await expect(this.userEmailErrorText).not.toBeVisible();
        await expect(this.userEmailInvalidText).not.toBeVisible();
    }

    async confirmPasswordRequirementsHeadingVisible() {
        await expect(this.passwordRequirementsHeading).toBeVisible();
    }

    async confirmPasswordFieldVisible() {
        await expect(this.passwordLabel).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.passwordErrorText).not.toBeVisible();
    }

    async confirmConfirmPasswordVisible() {
        await expect(this.confirmPasswordLabel).toBeVisible();
        await expect(this.confirmPasswordInput).toBeVisible();
        await expect(this.confirmPasswordErrorText).not.toBeVisible();
    }

    async confirmAcceptTandCsVisible() {
        await expect(this.acceptTandCsLabel).toBeVisible();
        await expect(this.acceptTandCsCheckbox).toBeVisible();
    }

    async confirmLoginHereLinkVisible() {
        await expect(this.loginHereLink).toBeVisible();
    }

    async confirmNextButtonVisible() {
        await expect(this.nextButton).toBeVisible();
    }
}