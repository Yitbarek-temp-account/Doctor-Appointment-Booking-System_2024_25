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

  test("check if if Login page is loaded", async ({ page }) => {
    const loginLink = page.getByRole("link", { name: "Login" });
    await loginLink.click();
    await expect(page.getByRole("button", {name: "Login"})).toBeVisible;
  });


test('Singup page is loaded', async ({ page }) => {
  const loginLink = page.getByText("login");
  await loginLink.click();
  
  const registerLink = page.getByText("signup");
  await registerLink.click();

  await expect(page.getByLabel("First Name")).toBeVisible;
  
});

