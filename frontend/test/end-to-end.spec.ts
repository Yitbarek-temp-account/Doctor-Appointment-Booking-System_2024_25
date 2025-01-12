import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/Project-Hub/frontend/public/index.html');
});

test('Home page loaded', async ({ page }) => {
  await expect(page).toHaveTitle("Document");
});

test('Has Navbar', async ({ page }) => {

  await expect(page.getByText("Logo")).toBeVisible();

});

test('Has Footer', async ({ page }) => {
  
    await expect(page.getByText("Linkden")).toBeVisible();
});

test('Has Login', async ({ page }) => {
  
  await expect(page.getByText("Login")).toBeVisible();
});

test('Login page will visible when the Login button is touched', async ({ page }) => {
  const loginLink = page.getByText("Login");
  await loginLink.click();
  await expect(page.getByRole("button")).toBeVisible();
})

test('Register page is navigated when the signup link is touched', async ({ page }) => {
  const loginLink = page.getByText("Login");
  await loginLink.click();

  const registerLink = page.getByText("signup");
  await registerLink.click();
  await expect(page.getByLabel("Confrim Password")).toBeVisible();
})

test('Succsfully register a user', async ({ page }) => {
  const loginLink = page.getByText("Login");
  await loginLink.click();
  
  const registerLink = page.getByText("signup");
  await registerLink.click();

  const firstNameInput = page.getByLabel("First Name");
  const lastNameInput = page.getByLabel("Last Name");
  const emailInput = page.getByLabel("Email");
  const phoneNoInput = page.getByLabel("Phone Number");
  const passwordInput = page.getByLabel("Only Password");
  const confirmPasswordInput = page.getByLabel("Confrim Password");
  const submitButton = page.getByRole("button");

  await firstNameInput.fill("John");
  await lastNameInput.fill("Doe");
  await emailInput.fill(generateRandomEmail());
  await phoneNoInput.fill("08123456789");
  await passwordInput.fill("password");
  await confirmPasswordInput.fill("password");
  await submitButton.click();
  
});

test("check if if about us page is loaded", async ({ page }) => {
  const aboutUsLink = page.getByText("About Us");
  await aboutUsLink.click();
  await expect(page).toHaveTitle("About Us Page");
});

test("check if if Contact us page is loaded", async ({ page }) => {
  const contactUsLink = page.getByRole("link", { name: "Contact Us" });
  await contactUsLink.click();
  await expect(page).toHaveTitle("Contact Us Page");
});

function generateRandomEmail(): string {
  const randomString = Math.random().toString(36).substring(7);
  const domain = 'gmail.com'; // Change this to your desired domain

  return `${randomString}@${domain}`;
}