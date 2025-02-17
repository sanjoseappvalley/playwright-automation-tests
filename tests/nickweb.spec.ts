import { test, expect, type Page } from '@playwright/test';
import { beforeEach } from 'node:test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://nicknguyense-web-automation-api-testing.onrender.com/')
});

test.describe('Welcome Page', () => {
    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Nick Nguyen/)
      });

    test('welcome page loaded', async ({ page }) => {
        // Check page elements are displayed using different methods
        await expect(page.getByRole('button', { name: 'Nick Nguyen' })).toBeEnabled()
        await expect(page.getByText('Hello, Welcome to my page!')).toBeVisible()

        // Create profile image locator
        const nickImage = page.locator('#topOfPage > div > div:nth-child(2)').first()
        await expect(nickImage).toBeVisible()
        await expect(nickImage).toBeInViewport()

        // Create LinkedIn button locator
        const linkedinProfile = page.getByRole('link', { name: 'My LinkedIn Profile' })
        await expect(linkedinProfile).toBeVisible()
        await expect(linkedinProfile).toBeEnabled()

        // Test multiple elements
        await expect(page.getByText('Featured Projects')).toBeVisible()
        await expect(page.locator('#topOfPage div').filter({ hasText: 'My Former Branding Page in' }).nth(1)).toBeVisible()
        await expect(page.getByRole('button', { name: 'My journey' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Github' })).toBeVisible()
    });

    test('Contact button shows a information modal', async ({ page }) => {
        await page.getByRole('button', { name: 'Contact' }).click()

        await expect(page.getByRole('dialog')).toBeVisible()
        await expect(page.getByText('nicknguyen0506@gmail.com')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeEnabled()
    })
})

test.describe('Contact page', () => {
    test('get contact link', async ({ page }) => {
        // Click the Contact link and navigate to Contact page
        await page.getByRole('link', { name: 'Contact' }).click()
        
        // Expects a thank you welcome
        await expect(page.getByRole('heading', { name: 'Hey! Thank you for visiting' })).toBeVisible()
        // Expects page to have a link to my Linkedin profile
        await expect(page.getByRole('link', { name: 'Linkedin' })).toBeVisible()
        // Expects page to have a heading with the email address.
        await expect(page.getByRole('heading', { name: 'nicknguyen0506@gmail.com' })).toBeVisible();
    });
})

test.describe('Learn More page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Learn More About Me' }).click()
    })
    test('get learn more link', async ({ page }) => {
        // Check for heading and images displayed
        await expect(page.getByText('Choose me as the perfect')).toBeVisible()
        await expect(page.getByRole('img').nth(1)).toBeVisible()
        await expect(page.getByRole('img').nth(1)).toBeVisible()
        await expect(page.getByRole('link', { name: 'Contact Now' })).toBeEnabled()
    })

    test('reasons', async ({ page }) => {
        // Click on Reason 1
        await page.getByRole('tab', { name: 'Reason 1' }).click()
        await expect(page.getByRole('tabpanel', { name: 'Reason' })).toBeVisible()

        // Reason 2
        await page.getByRole('tab', { name: 'Reason 2' }).click()
        await expect(page.getByRole('tabpanel', { name: 'Reason' })).toBeVisible()

        // Reason 3
        await page.getByRole('tab', { name: 'Reason 3' }).click()
        await expect(page.getByRole('tabpanel', { name: 'Reason' })).toBeVisible()
    })

    test('navigate back to home page', async ({ page }) => {
        navigateToHome(page)
        await expect(page.getByText('Hello, Welcome to my page!')).toBeVisible()
    })
})

test.describe('Project page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByRole('link', { name: 'Projects' }).click()
    })
    test('get project link', async ({ page }) => {
        await expect(page.getByText('PROJECTS', { exact: true })).toBeVisible()
        await expect(page.getByRole('tab', { name: 'Active' })).toBeEnabled()
    })

    test('navigate back to home page', async ({ page }) => {
        navigateToHome(page)
        await expect(page.getByText('Hello, Welcome to my page!')).toBeVisible()
    })
})

async function navigateToHome(page: Page) {
    // be able to click on Home link from current page
    await page.getByText('Home').click()
}