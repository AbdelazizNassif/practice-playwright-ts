import { test, expect,  type Page } from '@playwright/test';
import { PlaywrightDevPage } from '../pages/playwright-dev-page';

test.describe('runs in parallel with other describes', () => {

test.describe.configure({ mode: 'serial' });

let page: Page;
let playwrightDev: PlaywrightDevPage;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  playwrightDev = new PlaywrightDevPage(page);
});

test('getting started should contain table of contents', async ({ }) => {
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    `How to install Playwright`,
    `What's installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web-first assertions, fixtures and locators`,
    `Run single or multiple tests; headed mode`,
    `Generate tests with Codegen`,
    `View a trace of your tests`
  ]);
  await page.waitForTimeout(5000); // Waits for 5 seconds

});

test('should show Page Object Model article', async ({ }) => {
  playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
  await page.waitForTimeout(5000); // Waits for 5 seconds

});

});