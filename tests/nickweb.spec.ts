import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://nicknguyense-web-automation-api-testing.onrender.com/');
});

test.describe('Welcome Page', () => {
    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Nick Nguyen/);
      });

    test('welcome page loaded', async ({ page }) => {
        // Check page elements are displayed using different methods
        await expect(page.getByRole('button', { name: 'Nick Nguyen' })).toBeEnabled()
        await expect(page.getByText('Hello, Welcome to my page!')).toBeVisible()
        await expect(page.locator('#topOfPage > div > div:nth-child(2)').first()).toBeVisible()

        // Create LinkedIn button locator
        const linkedinProfile = page.getByRole('link', { name: 'My LinkedIn Profile' })
        await expect(linkedinProfile).toBeVisible()
        await expect(linkedinProfile).toBeEnabled()
    });

    test('get contact link', async ({ page }) => {
        // Click the get started link.
        await page.getByRole('link', { name: 'Contact' }).click();
        
        // Expects page to have a link to my Linkedin profile
        await expect(page.getByRole('link', { name: 'Linkedin' })).toBeVisible()
        // Expects page to have a heading with the email address.
        await expect(page.getByRole('heading', { name: 'nicknguyen0506@gmail.com' })).toBeVisible();
      });
})

