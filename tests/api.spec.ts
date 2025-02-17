import { test, expect } from '@playwright/test';

test('access hello api endpoint', async ({ request }) => {
    const hello = await request.get(`/api/hello`)
    expect(await hello.json()).toEqual(expect.objectContaining({
        message: 'Hello from the backend!' ,
    }))
});

test('pull nick information', async ({ request }) => {
    const nickInfo = await request.get(`/api/info`)
    await expect(nickInfo).toBeOK()
    expect(nickInfo.ok()).toBeTruthy()
    expect(await nickInfo.json()).toEqual(expect.objectContaining({
        name: 'Nick Nguyen',
        experiences: [
            'Automation Engineer',
            'Backend Engineer',
            'Web developer',
            'QA Software Engineer',
            'Data Analyst'
        ],
        companies: expect.arrayContaining(['IBM'])
    }))
});

test('get all Nick projects', async ({ request }) => {
    const projects = await request.get(`/api/projects`)
    expect(projects.ok()).toBeTruthy()
    expect(await projects.json()).toEqual(expect.objectContaining({
        p1: 'Personal site',
        p2: 'Playwright Automation Testing',
        p3: 'Selenium Automation Testing',
        p4: 'API Testing with Python Pytest'
    }))
})